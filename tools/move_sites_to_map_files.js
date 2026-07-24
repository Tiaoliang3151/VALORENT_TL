// 一次性工具：把 _maps_meta.js 里每张图的 sites/siteFontSize/locationFontSize
// 搬到对应 map_xxx.js 的顶层对象中，同时 _maps_meta.js 删除 sites 数组。
// 用法：node tools/move_sites_to_map_files.js

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'js', 'data');
const META_PATH = path.join(DATA_DIR, '_maps_meta.js');

// ---------- 1. 读取 meta，拿到每个 mapId 对应的 sites/fontSize ----------
const sandbox = { window: {}, document: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(META_PATH, 'utf8'), sandbox, { filename: META_PATH });

const META_BY_ID = {};
sandbox.window.__VAL_DATA__.MAPS_META.forEach(m => {
  META_BY_ID[m.id] = {
    sites: m.sites || [],
    siteFontSize: m.siteFontSize,
    locationFontSize: m.locationFontSize
  };
});
console.log('从 _maps_meta.js 读取到 map 数:', Object.keys(META_BY_ID).length);

// ---------- 2. 处理每个 map_xxx.js：在对象顶层插入 sites/fontSize ----------
const MAP_FILE_ORDER = sandbox.window.__VAL_DATA__.MAP_ID_ORDER;

MAP_FILE_ORDER.forEach(mapId => {
  const filePath = path.join(DATA_DIR, `map_${mapId}.js`);
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️  跳过（不存在）: ${path.basename(filePath)}`);
    return;
  }

  const info = META_BY_ID[mapId];
  if (!info) { console.log(`  ⚠️  meta 中未找到: ${mapId}`); return; }

  let src = fs.readFileSync(filePath, 'utf8');

  // 生成要插入的代码字符串
  const lines = [];
  lines.push('  sites: ' + JSON.stringify(info.sites, null, 2).split('\n').map((l, i) => i === 0 ? l : '  ' + l).join('\n'));
  if (info.siteFontSize)      lines.push('  siteFontSize: ' + info.siteFontSize + ',');
  if (info.locationFontSize)  lines.push('  locationFontSize: ' + info.locationFontSize + ',');
  // 上面第一行末尾我们手动加个逗号
  lines[0] = lines[0].replace(/(\s*)$/, ',') + '$1';
  // 更稳健：手动给每行尾部处理逗号（除了最后一行有自己的逗号）
  // 重写一下：
  const insertBlockArr = [];
  const sitesStr = JSON.stringify(info.sites, null, 2)
    .split('\n')
    .map((l, i) => i === 0 ? l : '  ' + l)   // 顶层缩进 2 因为 MAP_DATA_XXX = { mapId:... } 外面是 2 级
    .join('\n');
  insertBlockArr.push(`  sites: ${sitesStr},`);
  if (info.siteFontSize)      insertBlockArr.push(`  siteFontSize: ${info.siteFontSize},`);
  if (info.locationFontSize)  insertBlockArr.push(`  locationFontSize: ${info.locationFontSize},`);
  const insertBlock = insertBlockArr.join('\n') + '\n';

  // 在文件里找到 `mapId: "xxx",` 这一行，在它之后插入 insertBlock
  // mapId 行可能是双引号，最后可能带逗号也可能不带（紧跟换行或空格）
  const mapIdRe = new RegExp(`(mapId:\\s*"${mapId.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}"[^,\\n]*,?\\n)`);
  if (!mapIdRe.test(src)) {
    console.log(`  ❌ 找不到 mapId 行: ${mapId}`);
    return;
  }
  src = src.replace(mapIdRe, `$1${insertBlock}`);

  // 更新顶部注释，加入 sites/字号说明
  src = src.replace(
    /(\/\/ 包含：)(.+)/,
    `// 包含：AB 点 sites + 字号 / 通用烟雾 commonSmokes / 穿墙点 wallbangs / 下包点 plantSpots /`
  );

  fs.writeFileSync(filePath, src, 'utf8');
  console.log(`  ✅ 写入 ${path.basename(filePath)} (sites: ${info.sites.map(s=>s.id).join('/')}${info.siteFontSize?', siteFontSize:'+info.siteFontSize:''}${info.locationFontSize?', locFontSize:'+info.locationFontSize:''})`);
});

// ---------- 3. 处理 _maps_meta.js：删除每个对象里的 sites 数组 ----------
let metaSrc = fs.readFileSync(META_PATH, 'utf8');

// 用 regex 删除每个对象中 `    sites: [...],` 这一整段（可能多行）
// 策略：把 `    sites: [` 到匹配的 `    ],`（或 `    ]`）整块删掉
// 但 _maps_meta.js 中 sites 是每个 map 对象的第 5 个属性左右，格式是：
//   sites: [
//     {...},
//     {...}
//   ],
// 我们用小状态机逐行处理更稳妥
const metaLines = metaSrc.split('\n');
const newMetaLines = [];
let i = 0;
while (i < metaLines.length) {
  const line = metaLines[i];
  // 如果这一行包含 sites: [（且前后是 map 对象中的属性，而不是注释）
  // 注意：_maps_meta.js 里每个 sites 缩进大概是 4~6 个空格
  if (/^\s*sites:\s*\[/.test(line) && !line.trim().startsWith('//')) {
    // 找到匹配的 ]
    let bracketCount = (line.match(/\[/g) || []).length - (line.match(/\]/g) || []).length;
    // 如果这一行就是 sites: []（空数组一行写完），直接跳过
    if (bracketCount === 0) {
      // 如果这一行末尾带逗号，下一行开头不会空行有问题，直接跳
      i++;
      continue;
    }
    i++;
    while (i < metaLines.length && bracketCount > 0) {
      const l = metaLines[i];
      bracketCount += (l.match(/\[/g) || []).length - (l.match(/\]/g) || []).length;
      i++;
    }
    // 此时 i 已经在闭合 ] 之后那行，若闭合行最后一位是逗号，i 现在指向后面
    // 还要处理闭合行可能是 "    ],"，i 已经跳过去了，这里不需要做额外删除
    // 但如果 sites 段和下一个属性之间有多余空行，最多删一条空行
    while (i < metaLines.length && metaLines[i].trim() === '' && newMetaLines.length && newMetaLines[newMetaLines.length-1].trim() === '') {
      i++; // 避免产生两个空行
    }
    continue;
  }
  newMetaLines.push(line);
  i++;
}

// 更新顶部注释
let newMetaSrc = newMetaLines.join('\n');
newMetaSrc = newMetaSrc.replace(
  /(\/\/ 地图元信息：)(.+)/,
  '// 地图元信息：名称、图片路径、描述（AB 点 sites + 字号已移到各 map_xxx.js 中）'
);
newMetaSrc = newMetaSrc.replace(
  /(\/\/ 修改频率：)(.+)/,
  '// 修改频率：极低（仅新增地图 / 改中文名 / 换图片时才改）'
);

fs.writeFileSync(META_PATH, newMetaSrc, 'utf8');
console.log('\n✅ _maps_meta.js 已删除所有 sites 字段');

console.log('\n🎉 全部完成！现在每个 map_xxx.js 顶层自带 sites/fontSize，_maps_meta.js 只保留纯元信息。');
