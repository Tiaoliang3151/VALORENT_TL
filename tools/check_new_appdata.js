// 用新结构校验数据完整性：加载 _base.js → _maps_meta.js → 13×26 新文件 → 跑一遍和 index 一样的合并逻辑
// 用法：node tools/check_new_appdata.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DIR = p => path.join(ROOT, p);
const sand = { window: {}, console };
vm.createContext(sand);

const load = p => vm.runInContext(fs.readFileSync(DIR(p), 'utf8'), sand, { filename: DIR(p) });

load('js/data/_base.js');
load('js/data/_maps_meta.js');
const MAP_ID_ORDER = sand.window.__VAL_DATA__.MAP_ID_ORDER;
const AGENT_IDS = sand.window.__VAL_DATA__.AGENTS.map(a => a.id);
console.log(`[base] ${MAP_ID_ORDER.length} maps × ${AGENT_IDS.length} agents`);

MAP_ID_ORDER.forEach(mapId => {
  load(`js/data/maps/${mapId}/base.js`);
  AGENT_IDS.forEach(aid => {
    load(`js/data/maps/${mapId}/agents/${aid}.js`);
  });
});

// 跑一遍 _index.js 里同样的合并逻辑
load('js/data/_index.js');

const APP = sand.window.APP_DATA;
if (!APP) { console.error('❌ APP_DATA undefined'); process.exit(1); }

console.log(`[装配] MAPS=${APP.MAPS.length}, AGENTS=${APP.AGENTS.length}`);
let totalLineups = 0, mapsOK = 0;
APP.MAPS.forEach(m => {
  const lu = APP.LINEUPS[m.id];
  const n = lu ? Object.keys(lu).filter(k => lu[k].length).length : 0;
  const tot = lu ? Object.values(lu).reduce((s,a)=>s+a.length,0) : 0;
  totalLineups += tot;
  mapsOK++;
  const sites = (m.sites||[]).map(s=>s.id).join('/');
  console.log(`  ${m.id.padEnd(10)} sites=[${sites}] 非空英雄=${String(n).padStart(2)} 总LINEUPS=${String(tot).padStart(4)}  ${m.name}`);
});

console.log(`\n✅ 全部 ${mapsOK} 张地图装配成功，总技能点位：${totalLineups}`);
