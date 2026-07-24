// 一次性重构工具：
//   把 13 个 monolithic map_xxx.js（顶层 sites/commonSmokes/wallbangs/plantSpots/locations + LINEUPS）
//   重拆成：
//     js/data/maps/<mapId>/base.js             -> sites/字号 / commonSmokes / wallbangs / plantSpots / locations
//     js/data/maps/<mapId>/agents/<agentId>.js  -> LINEUPS[agentId] 每个英雄独立文件
//
// 同时生成：
//   - tools/_index_html_data_scripts.txt：index.html 里需要替换的 <script> 片段（338 个数据脚本）
//   - js/data/_index.js.new：新版 _index.js（核对后手动覆盖）
//
// 用法：node tools/restructure_to_per_map_agents.js

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA_OLD = path.join(ROOT, 'js', 'data');
const MAPS_DIR = path.join(DATA_OLD, 'maps');
const META_PATH = path.join(DATA_OLD, '_maps_meta.js');
const BASE_PATH = path.join(DATA_OLD, '_base.js');

// ---------- 1. 读 AGENTS 和 MAP_ORDER ----------
const sand = { window: {} };
vm.createContext(sand);
vm.runInContext(fs.readFileSync(BASE_PATH, 'utf8'), sand, { filename: BASE_PATH });
vm.runInContext(fs.readFileSync(META_PATH, 'utf8'), sand, { filename: META_PATH });

const AGENTS = sand.window.__VAL_DATA__.AGENTS;
const AGENT_IDS = AGENTS.map(a => a.id);
const AGENT_NAME_BY_ID = {};
AGENTS.forEach(a => { AGENT_NAME_BY_ID[a.id] = a.name; });

const MAP_ORDER = sand.window.__VAL_DATA__.MAP_ID_ORDER;
const MAP_NAME_BY_ID = {};
sand.window.__VAL_DATA__.MAPS_META.forEach(m => { MAP_NAME_BY_ID[m.id] = m.name; });
console.log(`[读取] AGENTS=${AGENT_IDS.length}, MAPS=${MAP_ORDER.length}`);

// ---------- 2. 加载所有旧 map_xxx.js 到 sandbox ----------
MAP_ORDER.forEach(id => {
  const f = path.join(DATA_OLD, 'map_' + id + '.js');
  if (fs.existsSync(f)) {
    vm.runInContext(fs.readFileSync(f, 'utf8'), sand, { filename: f });
  } else {
    console.log('  [WARN] 缺少旧文件，跳过:', path.basename(f));
  }
});

// ---------- 3. 工具函数 ----------
function ensureDir(p) { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }

function mapUpper(id) { return id.toUpperCase().replace(/[^A-Z0-9]/g, '_'); }

// ---------- 4. 拆文件 ----------
ensureDir(MAPS_DIR);
const allScripts = [];  // 338 个新脚本

MAP_ORDER.forEach(mapId => {
  const KEY = 'MAP_DATA_' + mapUpper(mapId);
  if (!(KEY in sand.window.__VAL_DATA__)) {
    console.log('  [SKIP] sandbox 中没找到', KEY);
    return;
  }
  const data = sand.window.__VAL_DATA__[KEY];
  const mapName = MAP_NAME_BY_ID[mapId] || mapId;

  const mapDir = path.join(MAPS_DIR, mapId);
  const agentsDir = path.join(mapDir, 'agents');
  ensureDir(mapDir);
  ensureDir(agentsDir);

  // 4a. base.js：地图层数据（非英雄）
  const base = { mapId: data.mapId };
  ['sites', 'siteFontSize', 'locationFontSize', 'commonSmokes', 'wallbangs', 'plantSpots', 'locations']
    .forEach(k => { if (k in data) base[k] = data[k]; });
  if (!('locations' in base)) base.locations = [];

  const baseContent =
`// ==========================================
// 地图基础数据（非英雄）：${mapName} (${mapId})
// 包含：AB 点 sites + 字号 / 常规烟位 commonSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.${KEY}__BASE = ${JSON.stringify(base, null, 2)};
`;
  fs.writeFileSync(path.join(mapDir, 'base.js'), baseContent, 'utf8');
  allScripts.push(`js/data/maps/${mapId}/base.js`);

  // 4b. 每个英雄一个文件
  const lineups = data.LINEUPS || {};
  let nonEmpty = 0;
  AGENT_IDS.forEach(agentId => {
    const arr = lineups[agentId] || [];
    if (arr.length) nonEmpty++;
    const agentName = AGENT_NAME_BY_ID[agentId] || agentId;
    const content =
`// ==========================================
// ${agentName}（${agentId}）在本地图的所有技能点位
// 所属地图：${mapName} (${mapId})
// 修改频率：高
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};
if (!window.__VAL_DATA__.${KEY}__AGENTS) window.__VAL_DATA__.${KEY}__AGENTS = {};

window.__VAL_DATA__.${KEY}__AGENTS['${agentId}'] = ${JSON.stringify(arr, null, 2)};
`;
    fs.writeFileSync(path.join(agentsDir, agentId + '.js'), content, 'utf8');
    allScripts.push(`js/data/maps/${mapId}/agents/${agentId}.js`);
  });

  console.log(`  [OK] ${mapId.padEnd(10)} ${mapName}  →  base.js  +  ${AGENT_IDS.length} 英雄文件（非空英雄点位：${nonEmpty}）`);
});

// ---------- 5. 生成 index.html 的 <script> 片段 ----------
const VERSION = '20260724c';
const scriptSnippet = allScripts
  .map(src => `  <script src="${src}?v=${VERSION}"></script>`)
  .join('\n');
fs.writeFileSync(path.join(__dirname, '_index_html_data_scripts.txt'), scriptSnippet, 'utf8');
console.log(`\n[生成] tools/_index_html_data_scripts.txt  共 ${allScripts.length} 个脚本（13 base + ${AGENT_IDS.length * MAP_ORDER.length} agents）`);

// ---------- 6. 生成新版 _index.js.new（核对后覆盖） ----------
const newIndexJs =
`// ==========================================
// 数据组装：从 maps/<mapId>/base.js + maps/<mapId>/agents/*.js 汇总为 window.APP_DATA
// ⚠️ 不要手动修改本文件
// ==========================================
(function () {
  var D = window.__VAL_DATA__;
  if (!D) throw new Error('请先按顺序加载 _base.js / _maps_meta.js / maps/**');

  function pick(obj, keys) { var o = {}; for (var i = 0; i < keys.length; i++) { var k = keys[i]; if (k in obj) o[k] = obj[k]; } return o; }
  function findMeta(mapId) { var m = D.MAPS_META.find(function (x) { return x.id === mapId; }); if (!m) throw new Error('MAPS_META miss: ' + mapId); return m; }
  function mapUpper(id) { return id.toUpperCase().replace(/[^A-Z0-9]/g, '_'); }

  var MAP_ID_ORDER = D.MAP_ID_ORDER;
  var AGENT_IDS = D.AGENTS.map(function (a) { return a.id; });

  var MAPS = [];
  var LINEUPS = {};

  for (var i = 0; i < MAP_ID_ORDER.length; i++) {
    var mapId = MAP_ID_ORDER[i];
    var UP = mapUpper(mapId);
    var BASE_KEY   = 'MAP_DATA_' + UP + '__BASE';
    var AGENTS_KEY = 'MAP_DATA_' + UP + '__AGENTS';
    var base = D[BASE_KEY];
    if (!base) { console.warn('[APP_DATA] 跳过缺少 base.js 的地图:', mapId); continue; }

    var mapObj = Object.assign({}, findMeta(mapId), { id: mapId },
      pick(base, ['sites', 'siteFontSize', 'locationFontSize', 'commonSmokes', 'wallbangs', 'plantSpots', 'locations'])
    );
    MAPS.push(mapObj);

    var agents = D[AGENTS_KEY] || {};
    LINEUPS[mapId] = {};
    for (var j = 0; j < AGENT_IDS.length; j++) {
      var aid = AGENT_IDS[j];
      LINEUPS[mapId][aid] = agents[aid] || [];
    }
  }

  window.APP_DATA = {
    ROLES: D.ROLES,
    AGENTS: D.AGENTS,
    MAPS: MAPS,
    LINEUPS: LINEUPS
  };

  delete window.__VAL_DATA__;
})();
`;
fs.writeFileSync(path.join(DATA_OLD, '_index.js.new'), newIndexJs, 'utf8');
console.log('[生成] js/data/_index.js.new（核对后覆盖 _index.js）');

console.log('\n🎉 拆分完成！接下来你需要：');
console.log('  1) 核对 js/data/_index.js.new 内容，确认无误后覆盖 js/data/_index.js');
console.log('  2) 打开 index.html，删除「旧的 13 个 map_xxx.js」那一段 <script>，用 tools/_index_html_data_scripts.txt 里的 338 行替换');
console.log('  3) 旧的 map_xxx.js 可以暂时保留（不加载就没事），等确认新结构跑通后可以删掉减小仓库');
console.log('  4) editor.js 导出/草稿逻辑之后按新结构重构（下一个步骤）');
console.log('  5) 浏览器：清草稿 + Ctrl+Shift+R 强制刷新');
