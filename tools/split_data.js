// ============================================================
// 自动拆分 data.js -> js/data/ 多文件结构
// 运行: node tools/split_data.js
// ============================================================
const fs = require('fs');
const path = require('path');

// ---- 1. 加载原始 data.js ----
global.window = {};
const srcCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'data.js'), 'utf8');
eval(srcCode);
const { ROLES, AGENTS, MAPS, LINEUPS } = window.APP_DATA;
console.log('✅ 加载 data.js 成功');
console.log(`   ROLES: ${Object.keys(ROLES).length}, AGENTS: ${AGENTS.length}, MAPS: ${MAPS.length}, LINEUPS maps: ${Object.keys(LINEUPS).length}`);

// ---- 2. 创建输出目录 ----
const OUT_DIR = path.join(__dirname, '..', 'js', 'data');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ---- 辅助函数：对象 -> 漂亮的 JS 源代码字符串（保持原风格：键不加引号、2 空格缩进）----
function stringifyJS(obj, indent = 0, keyAsIs = false) {
  const pad = '  '.repeat(indent);
  const pad1 = '  '.repeat(indent + 1);
  if (obj === null || obj === undefined) return String(obj);
  if (typeof obj === 'string') return JSON.stringify(obj);
  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    // 简短数组(全是标量且长度<=4)可以一行，否则多行
    const allPrim = obj.every(x => x === null || ['string','number','boolean'].includes(typeof x));
    if (allPrim && obj.length <= 4) {
      return '[' + obj.map(x => stringifyJS(x)).join(', ') + ']';
    }
    return '[\n' + obj.map(item => pad1 + stringifyJS(item, indent + 1)).join(',\n') + '\n' + pad + ']';
  }
  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    if (keys.length === 0) return '{}';
    const parts = keys.map(k => {
      const v = obj[k];
      const keyStr = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
      return `${pad1}${keyStr}: ${stringifyJS(v, indent + 1)}`;
    });
    return '{\n' + parts.join(',\n') + '\n' + pad + '}';
  }
  return String(obj);
}

// ---- 3. 生成 _base.js: ROLES + AGENTS ----
{
  const code =
`// ==========================================
// 基础数据：职业定义 + 特工/英雄列表
// 修改频率：极低（只有新英雄/新职业/技能名变更时才改）
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.ROLES = ${stringifyJS(ROLES)};

window.__VAL_DATA__.AGENTS = ${stringifyJS(AGENTS)};
`;
  fs.writeFileSync(path.join(OUT_DIR, '_base.js'), code, 'utf8');
  console.log(`✅ 写入 _base.js (${code.length.toLocaleString()} 字符)`);
}

// ---- 4. 生成 _maps_meta.js：13 张地图元信息（不含大数组）----
const META_KEYS = ['id', 'name', 'enName', 'rotate180', 'sites', 'image', 'splash', 'description'];
const mapsMeta = MAPS.map(m => {
  const o = {};
  META_KEYS.forEach(k => { if (k in m) o[k] = m[k]; });
  return o;
});
{
  // mapsMeta 同时要记录顺序，后面 _index.js 合并时按这个顺序
  const code =
`// ==========================================
// 地图元信息：名称、旋转、AB 点坐标、图片路径、描述
// （不包含：commonSmokes / wallbangs / plantSpots / locations / LINEUPS 这些大数组）
// 修改频率：低（新增地图 / 修改中文名 / 旋转开关时）
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAPS_META = ${stringifyJS(mapsMeta)};

// 方便 map_xxx.js 通过 id 找到索引
window.__VAL_DATA__.MAP_ID_ORDER = ${stringifyJS(mapsMeta.map(m => m.id))};
`;
  fs.writeFileSync(path.join(OUT_DIR, '_maps_meta.js'), code, 'utf8');
  console.log(`✅ 写入 _maps_meta.js (${code.length.toLocaleString()} 字符，${mapsMeta.length} 张地图)`);
}

// ---- 5. 生成 13 个 map_xxx.js ----
// 每张地图数据包含：commonSmokes + wallbangs + plantSpots + locations + 该地图的 LINEUPS
const MAP_EXTRA_KEYS = ['commonSmokes', 'wallbangs', 'plantSpots', 'locations'];
const mapFiles = [];
for (const m of MAPS) {
  const id = m.id;
  const data = {};
  for (const k of MAP_EXTRA_KEYS) if (k in m) data[k] = m[k];
  // 该地图的 LINEUPS
  const lineupsForMap = LINEUPS[id] || {};
  const code =
`// ==========================================
// 地图独立数据：${m.name} (${m.enName})
// 包含：通用烟雾 commonSmokes / 穿墙点 wallbangs / 下包点 plantSpots /
//       地点名称 locations / 该地图所有英雄阵容 LINEUPS
// 修改频率：高（这是你日常新增/修改数据的主要文件）
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_${id.toUpperCase().replace(/-/g, '_')} = {
  mapId: ${JSON.stringify(id)},
  ...${stringifyJS(data, 1)},
  LINEUPS: ${stringifyJS(lineupsForMap, 1)}
};
`;
  const filename = `map_${id}.js`;
  fs.writeFileSync(path.join(OUT_DIR, filename), code, 'utf8');
  const lineupCount = Object.values(lineupsForMap).reduce((s, arr) => s + arr.length, 0);
  console.log(`✅ 写入 ${filename} (${code.length.toLocaleString()} 字符，${lineupCount} 条阵容数据)`);
  mapFiles.push({ filename, id, varName: `MAP_DATA_${id.toUpperCase().replace(/-/g, '_')}` });
}

// ---- 6. 生成 _index.js：全部组装成 window.APP_DATA ----
{
  const assigns = mapFiles.map(f => {
    const v = `D.${f.varName}`;
    return `    Object.assign({}, D.MAPS_META[i++], { id: ${v}.mapId }, pick(${v}, ["commonSmokes", "wallbangs", "plantSpots", "locations"]))`;
  }).join(',\n');

  const lineupsEntries = mapFiles.map(f =>
    `    ${JSON.stringify(f.id)}: D.${f.varName}.LINEUPS`
  ).join(',\n');

  const code =
`// ==========================================
// 数据组装：把上面所有小文件合并成 window.APP_DATA
// ⚠️ 不要手动修改本文件！它是纯胶水代码
// ==========================================

(function () {
  const D = window.__VAL_DATA__;
  if (!D) { throw new Error('请先按顺序加载 _base.js / _maps_meta.js / map_*.js'); }

  function pick(obj, keys) {
    const o = {};
    for (const k of keys) if (k in obj) o[k] = obj[k];
    return o;
  }

  // 13 张地图：按 MAPS_META 顺序合并元信息 + 具体数据
  let i = 0;
  const MAPS = [
${assigns}
  ];

  const LINEUPS = {
${lineupsEntries}
  };

  window.APP_DATA = {
    ROLES: D.ROLES,
    AGENTS: D.AGENTS,
    MAPS,
    LINEUPS
  };

  // 清理临时全局变量
  delete window.__VAL_DATA__;
})();
`;
  fs.writeFileSync(path.join(OUT_DIR, '_index.js'), code, 'utf8');
  console.log(`✅ 写入 _index.js (${code.length.toLocaleString()} 字符)`);
}

console.log('\n🎉 拆分完成！所有文件都在 js/data/ 下');
console.log(`   共 ${2 + mapFiles.length + 1} 个文件：_base.js + _maps_meta.js + 13 个 map_*.js + _index.js`);
console.log('');
console.log('👉 下一步：修改 index.html，把原来的 <script src="js/data.js"> 替换成如下顺序的 16 个 script 标签：');
console.log('   1. js/data/_base.js');
console.log('   2. js/data/_maps_meta.js');
mapFiles.forEach((f, i) => console.log(`   ${i + 3}. js/data/${f.filename}`));
console.log(`   ${mapFiles.length + 3}. js/data/_index.js`);
