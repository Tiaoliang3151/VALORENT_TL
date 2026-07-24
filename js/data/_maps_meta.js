// ==========================================
// 地图元信息：名称、图片路径、描述（AB 点 sites + 字号已移到各 map_xxx.js 中）
// （不包含：commonSmokes / wallbangs / plantSpots / locations / LINEUPS 这些大数组）
// 修改频率：极低（仅新增地图 / 改中文名 / 换图片时才改）
// ⚠️ 方向约定：图片本身方向 = 显示方向 = 数据坐标方向（不再通过代码旋转）
//    如果地图方向不对，请直接旋转图片文件，不要改这里的任何字段
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAPS_META = [
  {
    id: "ascent",
    name: "亚海悬城",
    enName: "Ascent",
    image: "assets/maps/ascent_overview.png?v=20260724",
    splash: "assets/maps/splash/ascent_splash.png?v=20260724",
    description: "威尼斯地图，中路有可加固的铁门。经典三通道平衡地图。"
  },
  {
    id: "bind",
    name: "源工重镇",
    enName: "Bind",
    image: "assets/maps/bind_overview.png?v=20260724",
    splash: "assets/maps/splash/bind_splash.png?v=20260724",
    description: "两张据点地图，拥有传送门机制。封闭式近距离交战为主，控场者表现优秀。"
  },
  {
    id: "breeze",
    name: "微风岛屿",
    enName: "Breeze",
    image: "assets/maps/breeze_overview.png?v=20260724",
    splash: "assets/maps/splash/breeze_splash.png?v=20260724",
    description: "最大地图，拥有超长视线。适合狙击手和远程先锋，烟雾必不可少。"
  },
  {
    id: "corrode",
    name: "盐海矿镇",
    enName: "Corrode",
    image: "assets/maps/corrode_overview.png?v=20260724",
    splash: "assets/maps/splash/corrode_splash.png?v=20260724",
    description: "全新地图，独特的腐蚀主题场景。"
  },
  {
    id: "fracture",
    name: "裂变峡谷",
    enName: "Fracture",
    image: "assets/maps/fracture_overview.png?v=20260724",
    splash: "assets/maps/splash/fracture_splash.png?v=20260724",
    description: "进攻方从地图两侧出生，防守方在中间。拥有地下滑索，独特的双面进攻地图。"
  },
  {
    id: "haven",
    name: "隐世修所",
    enName: "Haven",
    image: "assets/maps/haven_overview.png?v=20260724",
    splash: "assets/maps/splash/haven_splash.png?v=20260724",
    description: "不丹延布的三据点地图。A点有Heaven塔楼、C点有超长视线，中路车库门可破坏。三据点布局让中路控制成为胜负关键。"
  },
  {
    id: "icebox",
    name: "森寒冬港",
    enName: "Icebox",
    image: "assets/maps/icebox_overview.png?v=20260724",
    splash: "assets/maps/splash/icebox_splash.png?v=20260724",
    description: "俄罗斯北极圈军事基地。两张据点地图，拥有升降梯和水平绳索，垂直空间极大。"
  },
  {
    id: "lotus",
    name: "莲华古城",
    enName: "Lotus",
    image: "assets/maps/lotus_overview.png?v=20260724",
    splash: "assets/maps/splash/lotus_splash.png?v=20260724",
    description: "三据点地图，拥有旋转门和可破坏墙壁。机制复杂，战术多样。"
  },
  {
    id: "pearl",
    name: "深海明珠",
    enName: "Pearl",
    image: "assets/maps/pearl_overview.png?v=20260724",
    splash: "assets/maps/splash/pearl_splash.png?v=20260724",
    description: "里斯本水下城市，经典三通道设计，无特殊机制。纯拼枪法和战术的地图。"
  },
  {
    id: "split",
    name: "霓虹町",
    enName: "Split",
    image: "assets/maps/split_overview.png?v=20260724",
    splash: "assets/maps/splash/split_splash.png?v=20260724",
    description: "垂直空间明显的地图，拥有绳索攀爬机制。防守方优势地图，需要大量技能配合进点。"
  },
  {
    id: "summit",
    name: "天枢云阙",
    enName: "Summit",
    image: "assets/maps/summit_overview.png?v=20260724",
    splash: "assets/maps/splash/summit_splash.png?v=20260724",
    description: "全新地图，雪山之巅的场景。"
  },
  {
    id: "sunset",
    name: "日落之城",
    enName: "Sunset",
    image: "assets/maps/sunset_overview.png?v=20260724",
    splash: "assets/maps/splash/sunset_splash.png?v=20260724",
    description: "洛杉矶日落大道。经典两张据点地图，中路有可加固的铁门，类似旧版 Haven。"
  },
  {
    id: "abyss",
    name: "幽邃地窟",
    enName: "Abyss",
    image: "assets/maps/abyss_overview.png?v=20260724",
    splash: "assets/maps/splash/abyss_splash.png?v=20260724",
    description: "马来西亚水域的全新地图。拥有独特的中路设计，垂直空间丰富。"
  }
];

// 方便 map_xxx.js 通过 id 找到索引
window.__VAL_DATA__.MAP_ID_ORDER = [
  "ascent",
  "bind",
  "breeze",
  "corrode",
  "fracture",
  "haven",
  "icebox",
  "lotus",
  "pearl",
  "split",
  "summit",
  "sunset",
  "abyss"
];
