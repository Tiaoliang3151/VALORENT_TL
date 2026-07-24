// ==========================================
// 地图基础数据（非英雄）：lotus
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-24T20:22:24+08:00
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_LOTUS__BASE = {
  "mapId": "lotus",
  "sites": [
    {
      "id": "A",
      "x": 18,
      "y": 48,
      "label": "A 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "B",
      "x": 50,
      "y": 48,
      "label": "B 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "C",
      "x": 82,
      "y": 42,
      "label": "C 部署区",
      "tags": [],
      "fontSize": 24
    }
  ],
  "siteFontSize": 11,
  "locationFontSize": 9,
  "wallbangs": [
    {
      "id": "lotus_wb1",
      "name": "A Link穿点",
      "x": 28,
      "y": 48,
      "desc": "A Link 可破坏墙壁可穿透，打击链接处防守方",
      "tags": []
    },
    {
      "id": "lotus_wb2",
      "name": "C Link穿点",
      "x": 72,
      "y": 48,
      "desc": "C Link 可破坏墙壁可穿透，打击链接处防守方",
      "tags": []
    }
  ],
  "locations": [
    {
      "name": "守方重生点",
      "x": 50,
      "y": 12,
      "type": "spawn"
    },
    {
      "name": "攻方重生点",
      "x": 50,
      "y": 88,
      "type": "spawn"
    },
    {
      "name": "A区部署区",
      "x": 18,
      "y": 48,
      "type": "site"
    },
    {
      "name": "B区部署区",
      "x": 50,
      "y": 48,
      "type": "site"
    },
    {
      "name": "C区部署区",
      "x": 82,
      "y": 42,
      "type": "site"
    },
    {
      "name": "A区大道",
      "x": 10,
      "y": 62,
      "type": "route"
    },
    {
      "name": "A区小道",
      "x": 25,
      "y": 45,
      "type": "route"
    },
    {
      "name": "A区树屋",
      "x": 12,
      "y": 42,
      "type": "room"
    },
    {
      "name": "A区碎石",
      "x": 22,
      "y": 40,
      "type": "area"
    },
    {
      "name": "A区二楼",
      "x": 15,
      "y": 38,
      "type": "room"
    },
    {
      "name": "B区大道",
      "x": 50,
      "y": 62,
      "type": "route"
    },
    {
      "name": "B区上层",
      "x": 52,
      "y": 38,
      "type": "room"
    },
    {
      "name": "C区大道",
      "x": 82,
      "y": 62,
      "type": "route"
    },
    {
      "name": "C区瀑布",
      "x": 88,
      "y": 58,
      "type": "area"
    },
    {
      "name": "C区通道门",
      "x": 75,
      "y": 48,
      "type": "route"
    },
    {
      "name": "C区碎石路",
      "x": 72,
      "y": 35,
      "type": "route"
    },
    {
      "name": "中路",
      "x": 50,
      "y": 35,
      "type": "area"
    },
    {
      "name": "A区旋转门",
      "x": 35,
      "y": 40,
      "type": "route"
    },
    {
      "name": "C区旋转门",
      "x": 65,
      "y": 40,
      "type": "route"
    }
  ],
  "attackSmokes": [
    {
      "id": "lotus_atk_a_crossing",
      "type": "ball",
      "name": "A大过点烟",
      "site": "A",
      "x": 8,
      "y": 65,
      "radius": 6,
      "desc": "封锁 A 大道的过点视野，掩护进攻方进入 A 区",
      "tags": ["进攻方"]
    },
    {
      "id": "lotus_atk_a_main_line",
      "type": "line",
      "name": "A常规线烟",
      "site": "A",
      "x": 12,
      "y": 58,
      "length": 14,
      "angle": 45,
      "desc": "沿 A 大道布设的线烟，封锁 A 长入口视野",
      "tags": ["进攻方"]
    },
    {
      "id": "lotus_atk_a_partition",
      "type": "ball",
      "name": "A大隔断烟",
      "site": "A",
      "x": 22,
      "y": 52,
      "radius": 6,
      "desc": "隔断 A 大道与 A 包点的视野，掩护推进",
      "tags": ["进攻方"]
    },
    {
      "id": "lotus_atk_a_height_oneway",
      "type": "ball",
      "name": "高低差单向烟",
      "site": "A",
      "x": 18,
      "y": 42,
      "radius": 5,
      "desc": "利用 A 区高低差布置单向烟，获取视野优势",
      "tags": ["进攻方"]
    },
    {
      "id": "lotus_atk_a_stairs",
      "type": "ball",
      "name": "台阶烟",
      "site": "A",
      "x": 25,
      "y": 42,
      "radius": 5,
      "desc": "封锁 A 区台阶区域视野，防止被高台架枪",
      "tags": ["进攻方"]
    },
    {
      "id": "lotus_atk_a_2f",
      "type": "ball",
      "name": "A二楼烟",
      "site": "A",
      "x": 15,
      "y": 38,
      "radius": 5,
      "desc": "封锁 A 区二楼/高台视野，防止被高处架枪",
      "tags": ["进攻方"]
    },
    {
      "id": "lotus_atk_ab_link",
      "type": "ball",
      "name": "AB连烟",
      "site": "A",
      "x": 35,
      "y": 45,
      "radius": 6,
      "desc": "连接 A 区与 B 区，阻断中路敌方交叉支援",
      "tags": ["进攻方"]
    },
    {
      "id": "lotus_atk_b_main_line",
      "type": "line",
      "name": "B常规线烟",
      "site": "B",
      "x": 50,
      "y": 60,
      "length": 14,
      "angle": 0,
      "desc": "横向封锁 B 大道入口，掩护进攻方进入 B 区",
      "tags": ["进攻方"]
    },
    {
      "id": "lotus_atk_b_2f",
      "type": "ball",
      "name": "B二楼烟",
      "site": "B",
      "x": 52,
      "y": 38,
      "radius": 5,
      "desc": "封锁 B 区上层/二楼视野，防止被高台架枪",
      "tags": ["进攻方"]
    },
    {
      "id": "lotus_atk_bc_link",
      "type": "ball",
      "name": "BC连烟",
      "site": "B",
      "x": 65,
      "y": 45,
      "radius": 6,
      "desc": "连接 B 区与 C 区，阻断中路敌方交叉支援",
      "tags": ["进攻方"]
    },
    {
      "id": "lotus_atk_c_main_line",
      "type": "line",
      "name": "C常规线烟",
      "site": "C",
      "x": 82,
      "y": 62,
      "length": 14,
      "angle": -45,
      "desc": "沿 C 大道布设的线烟，封锁 C 长入口视野",
      "tags": ["进攻方"]
    },
    {
      "id": "lotus_atk_c_waterfall",
      "type": "ball",
      "name": "瀑布烟",
      "site": "C",
      "x": 88,
      "y": 55,
      "radius": 6,
      "desc": "封锁 C 区瀑布区域视野，防止被侧翼架枪",
      "tags": ["进攻方"]
    },
    {
      "id": "lotus_atk_c_ct",
      "type": "ball",
      "name": "C警家烟",
      "site": "C",
      "x": 88,
      "y": 28,
      "radius": 6,
      "desc": "封锁 C 区警家回防路线，掩护进攻方进 C",
      "tags": ["进攻方"]
    }
  ],
  "defendSmokes": [
    {
      "id": "lotus_def_a_main",
      "type": "ball",
      "name": "A大烟",
      "site": "A",
      "x": 12,
      "y": 58,
      "radius": 7,
      "desc": "封锁 A 大道入口，阻挡进攻方 A 大压",
      "tags": ["防守方"]
    },
    {
      "id": "lotus_def_a_contest",
      "type": "ball",
      "name": "抢A大烟",
      "site": "A",
      "x": 18,
      "y": 52,
      "radius": 6,
      "desc": "前置烟抢 A 大道控制权，掩护防守方前压",
      "tags": ["防守方"]
    },
    {
      "id": "lotus_def_a_tree",
      "type": "ball",
      "name": "树屋烟",
      "site": "A",
      "x": 12,
      "y": 45,
      "radius": 5,
      "desc": "封锁 A 区树屋/高台视野，防止进攻方树上架枪",
      "tags": ["防守方"]
    },
    {
      "id": "lotus_def_a_rocks_oneway",
      "type": "ball",
      "name": "碎石单向烟",
      "site": "A",
      "x": 22,
      "y": 42,
      "radius": 5,
      "desc": "利用 A 区碎石布置单向烟，获取 A 包点视野",
      "tags": ["防守方"]
    },
    {
      "id": "lotus_def_a_partition",
      "type": "ball",
      "name": "A包隔断烟",
      "site": "A",
      "x": 18,
      "y": 48,
      "radius": 6,
      "desc": "隔断 A 包点，保护包点并阻挡进攻方推进",
      "tags": ["防守方"]
    },
    {
      "id": "lotus_def_ab_link",
      "type": "line",
      "name": "AB常规线烟",
      "site": "B",
      "x": 35,
      "y": 48,
      "length": 14,
      "angle": 90,
      "desc": "垂直封锁 A/B 链接，阻止进攻方转点",
      "tags": ["防守方"]
    },
    {
      "id": "lotus_def_b_main",
      "type": "ball",
      "name": "B大烟",
      "site": "B",
      "x": 50,
      "y": 58,
      "radius": 7,
      "desc": "封锁 B 大道入口，阻挡进攻方 B 大压",
      "tags": ["防守方"]
    },
    {
      "id": "lotus_def_c_main",
      "type": "ball",
      "name": "C大烟",
      "site": "C",
      "x": 78,
      "y": 30,
      "radius": 7,
      "desc": "封锁 C 大道入口，阻挡进攻方 C 大压",
      "tags": ["防守方"]
    },
    {
      "id": "lotus_def_c_oneway",
      "type": "ball",
      "name": "C大单向烟",
      "site": "C",
      "x": 72,
      "y": 32,
      "radius": 5,
      "desc": "利用 C 大道布置单向烟，获取 C 区视野优势",
      "tags": ["防守方"]
    },
    {
      "id": "lotus_def_c_site_oneway",
      "type": "ball",
      "name": "C包单向烟",
      "site": "C",
      "x": 88,
      "y": 42,
      "radius": 5,
      "desc": "利用 C 包点布置单向烟，获取包点视野优势",
      "tags": ["防守方"]
    },
    {
      "id": "lotus_def_c_partition",
      "type": "ball",
      "name": "C包隔断烟",
      "site": "C",
      "x": 82,
      "y": 45,
      "radius": 6,
      "desc": "隔断 C 包点，保护包点并阻挡进攻方推进",
      "tags": ["防守方"]
    }
  ]
};
