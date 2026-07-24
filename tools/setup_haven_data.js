// 一次性布置 隐世修所 Haven 真实数据（根据两张进攻/防守烟位图）
// 写文件用固定模板拼接（不用通用正则，避免和 fix_base_js_variable_names 一样误匹配 if 里的 = 号）
const fs = require('fs');
const path = require('path');

const MAP_ID = 'haven';
const MAP_NAME_CN = '隐世修所';
const BASE_PATH = path.join(__dirname, '..', 'js', 'data', 'maps', MAP_ID, 'base.js');

// ======================== 1. A/B/C 点位位置（黄色部署区）
const SITES = [
  { id: "A", x: 82, y: 36, label: "A 部署区", tags: [] }, // 右上黄色部署区
  { id: "B", x: 47, y: 42, label: "B 部署区", tags: [] }, // 中上黄色 B 区
  { id: "C", x: 17, y: 40, label: "C 部署区", tags: [] }  // 左侧绿色 C 区
];

// ======================== 2. 常规烟位 14 个（进攻 7 + 防守 7）
const SMOKES = [
  // ====== 进攻方（图 1：7 张紫色标签进攻烟，底部攻方往上冲）
  { id: "haven_atk_a_2f",    type: "ball", name: "A二楼烟（A三楼）",   site: "A", x: 74, y: 33, radius: 6, desc: "封锁 A 二楼/三楼视野，防止被高处架枪",           tags: ["进攻方"] },
  { id: "haven_atk_a_ct",    type: "ball", name: "A警家烟",              site: "A", x: 67, y: 31, radius: 6, desc: "封锁 A 警家回防路线，掩护进攻方进 A",           tags: ["进攻方"] },
  { id: "haven_atk_ab_link", type: "ball", name: "AB连烟（A小道）",     site: "A", x: 57, y: 40, radius: 6, desc: "连接 A/B 区间，阻断敌方交叉支援",               tags: ["进攻方"] },
  { id: "haven_atk_bc_link", type: "ball", name: "BC连烟（B后房/窗口）", site: "B", x: 44, y: 34, radius: 6, desc: "连接 B/C 区间，阻断敌方从中区支援 B",           tags: ["进攻方"] },
  { id: "haven_atk_c_ct",    type: "ball", name: "C警家烟（C小道）",     site: "C", x: 28, y: 32, radius: 6, desc: "封锁 C 警家视野，掩护进 C",                     tags: ["进攻方"] },
  { id: "haven_atk_gar_win", type: "ball", name: "车库窗口烟",           site: "B", x: 27, y: 44, radius: 5, desc: "封锁 C 车库窗口口，防止被 C 车库口架枪",        tags: ["进攻方"] },
  { id: "haven_atk_garage",  type: "ball", name: "车库烟（车库入口）",   site: "B", x: 24, y: 50, radius: 6, desc: "封锁 C 车库入口，掩护队友从中庭推进",           tags: ["进攻方"] },

  // ====== 防守方（图 2：7 张防守烟，守方从顶部往下防守）
  { id: "haven_def_a_long",  type: "ball", name: "A大烟（封锁A长）",     site: "A", x: 54, y: 57, radius: 7, desc: "封锁 A 区长道入口，阻挡进攻方 A 长压",           tags: ["防守方"] },
  { id: "haven_def_a_plant", type: "ball", name: "A包隔断烟",            site: "A", x: 70, y: 53, radius: 6, desc: "封锁 A 区部署区，保护包点",                     tags: ["防守方"] },
  { id: "haven_def_win",     type: "ball", name: "窗口烟（中区窗口）",   site: "B", x: 51, y: 39, radius: 5, desc: "封锁中区窗口高台视野，防止进攻方窗口架枪 B 大",  tags: ["防守方"] },
  { id: "haven_def_b_mid",   type: "ball", name: "B大烟（中庭封B入口）", site: "B", x: 49, y: 54, radius: 7, desc: "封锁中区直看 B 大的入口，保护 B 点",              tags: ["防守方"] },
  { id: "haven_def_c_gar",   type: "ball", name: "车库烟（封C车库）",    site: "C", x: 62, y: 44, radius: 6, desc: "封锁 C 车库入口，阻挡进攻方从车库进 C",         tags: ["防守方"] },
  { id: "haven_def_c_long",  type: "ball", name: "C大烟（封锁C长）",     site: "C", x: 81, y: 50, radius: 7, desc: "封锁 C 区长道远端，阻挡进攻方从 C 大长驱直入",   tags: ["防守方"] },
  { id: "haven_def_c_plant", type: "ball", name: "C包隔断烟",            site: "C", x: 82, y: 59, radius: 6, desc: "封锁 C 区部署区，保护包点",                     tags: ["防守方"] }
];

// ======================== 3. 地名（中文名称 + 坐标，依据两张图上的"XX区/道/口/点"中文位）
const LOCATIONS = [
  // --- 顶部（守方侧）
  { name: "守方重生点",  x: 51, y: 24, type: "spawn" },
  { name: "B区后房",     x: 46, y: 33, type: "room" },
  { name: "C区小道",     x: 29, y: 33, type: "route" },
  { name: "A区小道",     x: 57, y: 42, type: "route" },

  // --- 部署区（sites 的文字标）
  { name: "C区部署区",   x: 19, y: 40, type: "site" },
  { name: "B区部署区",   x: 47, y: 42, type: "site" },
  { name: "A区部署区",   x: 79, y: 36, type: "site" },

  // --- 中部走廊、房间（进攻烟/防守烟中提到的）
  { name: "C区车库",     x: 61, y: 46, type: "room" },
  { name: "C区车库入口", x: 59, y: 50, type: "route" },
  { name: "中区窗口",    x: 50, y: 40, type: "route" },
  { name: "中区门",      x: 37, y: 55, type: "route" },
  { name: "中区廊院",    x: 46, y: 57, type: "area" },
  { name: "区下水道",    x: 57, y: 47, type: "route" },
  { name: "C区大厅",     x: 16, y: 66, type: "area" },
  { name: "C区小房间",   x: 90, y: 44, type: "room" },
  { name: "C区长道",     x: 82, y: 38, type: "route" },
  { name: "A区大厅",     x: 54, y: 49, type: "area" },
  { name: "A区长道",     x: 54, y: 55, type: "route" },
  { name: "A区花园",     x: 56, y: 66, type: "area" },
  { name: "C区窗口",     x: 65, y: 53, type: "route" },
  { name: "C区小巷",     x: 76, y: 53, type: "route" },

  // --- 底部（攻方侧）
  { name: "攻方重生点",  x: 50, y: 78, type: "spawn" }
];

// ======================== 4. 从原文件读对象（用 vm），拼上我们新增的 3 个数组，
//                         然后用 FIXED-TEMPLATE 写法输出（不用 replace(/=\{.../)
// ========================
const vm = require('vm');
const sand = { window: {} };
vm.createContext(sand);
vm.runInContext(fs.readFileSync(BASE_PATH, 'utf8'), sand, { filename: BASE_PATH });

// 拿 base 对象 —— 这里要兼容两种情况：
//   好的：window.__VAL_DATA__.MAP_DATA_HAVEN__BASE = {...}
//   坏的：上一次 setup_haven_data 误写后 window.__VAL_DATA__ 本身就是 base 对象
let base;
if (sand.window.__VAL_DATA__ && typeof sand.window.__VAL_DATA__.mapId === 'string') {
  base = sand.window.__VAL_DATA__;
} else {
  const KEY = Object.keys(sand.window.__VAL_DATA__ || {}).find(k => k.endsWith('__BASE'));
  base = sand.window.__VAL_DATA__[KEY];
}
if (!base) { console.error('❌ 解析 haven/base.js 失败'); process.exit(1); }

base.sites = SITES;
base.commonSmokes = SMOKES;
base.locations = LOCATIONS;
if (!base.siteFontSize)     base.siteFontSize = 11;
if (!base.locationFontSize) base.locationFontSize = 9;
if (!base.wallbangs)        base.wallbangs = [];
if (!base.plantSpots)       base.plantSpots = [];

const MAP_UP = 'HAVEN';
const JSON_STR = JSON.stringify(base, null, 2)
  .split('\n')
  .map((l, i) => i === 0 ? l : '  ' + l)
  .join('\n');

const finalContent =
`// ==========================================
// 地图基础数据（非英雄）：${MAP_NAME_CN} (${MAP_ID})
// 包含：AB 点 sites + 字号 / 常规烟位 commonSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_${MAP_UP}__BASE = ${JSON_STR};
`;
fs.writeFileSync(BASE_PATH, finalContent, 'utf8');

console.log('✅ 隐世修所 Haven 布置完成：');
console.log(`   sites (3): ${SITES.map(s => `${s.id}(${s.x},${s.y})`).join(', ')}`);
console.log(`   常规烟 (${SMOKES.length}): 进攻 ${SMOKES.filter(s => s.tags.includes('进攻方')).length} / 防守 ${SMOKES.filter(s => s.tags.includes('防守方')).length}`);
console.log(`   地名 (${LOCATIONS.length}) 个，全部中文命名`);
