// 修复：reset_all_map_smokes_to_placeholder 的正则把 "window.__VAL_DATA__.MAP_DATA_XXX__BASE = {...}"
// 错误地覆盖成了 "if (!window.__VAL_DATA__) window.__VAL_DATA__ = {...}"（匹配到了 if 语句那行的 "="）
// 导致 13 张 base.js 的变量名和 if 前缀被破坏。
//
// 本工具会修复 13 张 base.js：
//   内容先读 JSON（内容本身是完整对象，只是没变量名）
//   重新输出正确的文件头 + "window.__VAL_DATA__.MAP_DATA_<MAPID_UPPER>__BASE = <完整序列化对象>;"
//
// 用法：node tools/fix_base_js_variable_names.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'js', 'data');

const sand = { window: {} };
vm.createContext(sand);
vm.runInContext(fs.readFileSync(path.join(DATA, '_base.js'), 'utf8'), sand, {filename: path.join(DATA, '_base.js')});
vm.runInContext(fs.readFileSync(path.join(DATA, '_maps_meta.js'), 'utf8'), sand, {filename: path.join(DATA, '_maps_meta.js')});
const MAP_ORDER = sand.window.__VAL_DATA__.MAP_ID_ORDER;
const MAP_NAME_BY_ID = {};
sand.window.__VAL_DATA__.MAPS_META.forEach(m => { MAP_NAME_BY_ID[m.id] = m.name; });

function mapUpper(id) { return id.toUpperCase().replace(/[^A-Z0-9]/g, '_'); }

MAP_ORDER.forEach(mapId => {
  const p = path.join(DATA, 'maps', mapId, 'base.js');
  if (!fs.existsSync(p)) { console.log('  [SKIP] 缺', mapId); return; }
  // 读整个文件，把它喂给 vm，但因为现在文件是 "if (!window.__VAL_DATA__) window.__VAL_DATA__ = {<obj>};"
  // vm 执行后 window.__VAL_DATA__ 本身就是那个 base 对象
  try {
    const s2 = { window: {} };
    vm.createContext(s2);
    vm.runInContext(fs.readFileSync(p, 'utf8'), s2, { filename: p });
    const obj = s2.window.__VAL_DATA__;
    if (!obj || typeof obj.mapId !== 'string') {
      throw new Error('对象结构不对，缺少 mapId 字段');
    }

    // 正确的文件头 + 序列化（保持 2 空格缩进，顶层整体 2 空格）
    const JSON_STR = JSON.stringify(obj, null, 2)
      .split('\n')
      .map((l, i) => i === 0 ? l : '  ' + l)
      .join('\n');

    const content =
`// ==========================================
// 地图基础数据（非英雄）：${MAP_NAME_BY_ID[mapId] || ''} (${mapId})
// 包含：AB 点 sites + 字号 / 常规烟位 commonSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_${mapUpper(mapId)}__BASE = ${JSON_STR};
`;
    fs.writeFileSync(p, content, 'utf8');
    console.log(`  [OK] ${mapId.padEnd(10)} → 变量名: MAP_DATA_${mapUpper(mapId)}__BASE (mapId=${obj.mapId}, sites=${(obj.sites||[]).map(s=>s.id).join('/') || 'none'})`);
  } catch (e) {
    console.error(`  [ERR] ${mapId}: ${e.message}`);
  }
});
console.log('\n✅ 13 张 base.js 结构修复完毕');
