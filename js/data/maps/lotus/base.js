// ==========================================
// 地图基础数据（非英雄）：莲华古城 (lotus)
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-26T00:54:25.121Z
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_LOTUS__BASE = {
  "mapId": "lotus",
  "sites": [
    {
      "id": "A",
      "x": 9,
      "y": 65.4,
      "label": "A 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "B",
      "x": 56.4,
      "y": 54.9,
      "label": "B 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "C",
      "x": 91.7,
      "y": 51.1,
      "label": "C 部署区",
      "tags": [],
      "fontSize": 24
    }
  ],
  "siteFontSize": 11,
  "locationFontSize": 9,
  "attackSmokes": [
    {
      "id": "lotus_atk_a_crossing",
      "type": "ball",
      "name": "A大过点烟",
      "site": "A",
      "x": 26,
      "y": 42.9,
      "radius": 6,
      "desc": "封锁 A 大道的过点视野，掩护进攻方进入 A 区",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "lotus_atk_a_main_line",
      "type": "line",
      "name": "A常规线烟",
      "site": "A",
      "x": 33.5,
      "y": 33,
      "length": 46,
      "angle": 109,
      "desc": "沿 A 大道布设的线烟，封锁 A 长入口视野",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "lotus_atk_a_partition",
      "type": "ball",
      "name": "A大隔断烟",
      "site": "A",
      "x": 25.3,
      "y": 58.1,
      "radius": 6,
      "desc": "隔断 A 大道与 A 包点的视野，掩护推进",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "lotus_atk_a_height_oneway",
      "type": "ball",
      "name": "高低差单向烟",
      "site": "A",
      "x": 9.9,
      "y": 72.9,
      "radius": 5,
      "desc": "利用 A 区高低差布置单向烟，获取视野优势",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "lotus_atk_a_stairs",
      "type": "ball",
      "name": "台阶烟",
      "site": "A",
      "x": 26.2,
      "y": 66.9,
      "radius": 5,
      "desc": "封锁 A 区台阶区域视野，防止被高台架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "lotus_atk_a_2f",
      "type": "ball",
      "name": "A二楼烟",
      "site": "A",
      "x": 20.2,
      "y": 72.2,
      "radius": 5,
      "desc": "封锁 A 区二楼/高台视野，防止被高处架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "lotus_atk_ab_link",
      "type": "ball",
      "name": "AB连烟",
      "site": "A",
      "x": 41.4,
      "y": 50.6,
      "radius": 6,
      "desc": "连接 A 区与 B 区，阻断中路敌方交叉支援",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "lotus_atk_b_main_line",
      "type": "line",
      "name": "B常规线烟",
      "site": "B",
      "x": 31.4,
      "y": 30.8,
      "length": 43,
      "angle": 60,
      "desc": "横向封锁 B 大道入口，掩护进攻方进入 B 区",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "lotus_atk_b_2f",
      "type": "ball",
      "name": "B二楼烟",
      "site": "B",
      "x": 47.9,
      "y": 63.4,
      "radius": 5,
      "desc": "封锁 B 区上层/二楼视野，防止被高台架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "lotus_atk_bc_link",
      "type": "ball",
      "name": "BC连烟",
      "site": "B",
      "x": 58.1,
      "y": 62.9,
      "radius": 6,
      "desc": "连接 B 区与 C 区，阻断中路敌方交叉支援",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "lotus_atk_c_main_line",
      "type": "line",
      "name": "C常规线烟",
      "site": "C",
      "x": 68.4,
      "y": 48.8,
      "length": 31,
      "angle": 38,
      "desc": "沿 C 大道布设的线烟，封锁 C 长入口视野",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "lotus_atk_c_waterfall",
      "type": "ball",
      "name": "瀑布烟",
      "site": "C",
      "x": 75.7,
      "y": 54.1,
      "radius": 6,
      "desc": "封锁 C 区瀑布区域视野，防止被侧翼架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "lotus_atk_c_ct",
      "type": "ball",
      "name": "C警家烟",
      "site": "C",
      "x": 86.9,
      "y": 65.3,
      "radius": 6,
      "desc": "封锁 C 区警家回防路线，掩护进攻方进 C",
      "tags": [
        "进攻方"
      ]
    }
  ],
  "defendSmokes": [
    {
      "id": "lotus_def_a_main",
      "type": "ball",
      "name": "A大烟",
      "site": "A",
      "x": 25.2,
      "y": 54.6,
      "radius": 7,
      "desc": "封锁 A 大道入口，阻挡进攻方 A 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "lotus_def_a_contest",
      "type": "ball",
      "name": "抢A大烟",
      "site": "A",
      "x": 31.2,
      "y": 36.4,
      "radius": 6,
      "desc": "前置烟抢 A 大道控制权，掩护防守方前压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "lotus_def_a_tree",
      "type": "ball",
      "name": "树屋烟",
      "site": "A",
      "x": 9.1,
      "y": 55,
      "radius": 5,
      "desc": "封锁 A 区树屋/高台视野，防止进攻方树上架枪",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "lotus_def_a_rocks_oneway",
      "type": "ball",
      "name": "碎石单向烟",
      "site": "A",
      "x": 17.4,
      "y": 39.7,
      "radius": 5,
      "desc": "利用 A 区碎石布置单向烟，获取 A 包点视野",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "lotus_def_a_partition",
      "type": "ball",
      "name": "A包隔断烟",
      "site": "A",
      "x": 18.6,
      "y": 64,
      "radius": 6,
      "desc": "隔断 A 包点，保护包点并阻挡进攻方推进",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "lotus_def_b_main",
      "type": "ball",
      "name": "B大烟",
      "site": "B",
      "x": 56.4,
      "y": 46.5,
      "radius": 7,
      "desc": "封锁 B 大道入口，阻挡进攻方 B 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "lotus_def_c_main",
      "type": "ball",
      "name": "C大烟",
      "site": "C",
      "x": 78.1,
      "y": 46,
      "radius": 7,
      "desc": "封锁 C 大道入口，阻挡进攻方 C 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "lotus_def_c_oneway",
      "type": "ball",
      "name": "C大单向烟",
      "site": "C",
      "x": 69.3,
      "y": 29.1,
      "radius": 5,
      "desc": "利用 C 大道布置单向烟，获取 C 区视野优势",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "lotus_def_c_site_oneway",
      "type": "ball",
      "name": "C包单向烟",
      "site": "C",
      "x": 90.1,
      "y": 46.7,
      "radius": 5,
      "desc": "利用 C 包点布置单向烟，获取包点视野优势",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "lotus_def_c_partition",
      "type": "ball",
      "name": "C包隔断烟",
      "site": "C",
      "x": 84.2,
      "y": 49.7,
      "radius": 6,
      "desc": "隔断 C 包点，保护包点并阻挡进攻方推进",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785026742699",
      "type": "line",
      "name": "新线烟",
      "x": 59.2,
      "y": 49.3,
      "length": 46,
      "angle": -179.4,
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785026793143",
      "type": "line",
      "name": "新线烟",
      "x": 42.9,
      "y": 52.1,
      "length": 40.2,
      "angle": -38.9,
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    }
  ],
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
      "x": 39.7,
      "y": 82.4,
      "type": "spawn"
    },
    {
      "name": "攻方重生点",
      "x": 47.6,
      "y": 15.4,
      "type": "spawn"
    },
    {
      "name": "A区部署区",
      "x": 13.4,
      "y": 68.9,
      "type": "site"
    },
    {
      "name": "B区部署区",
      "x": 51.1,
      "y": 55.1,
      "type": "site"
    },
    {
      "name": "C区部署区",
      "x": 87.4,
      "y": 53.9,
      "type": "site"
    }
  ]
};
