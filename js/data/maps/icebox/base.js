// ==========================================
// 地图基础数据（非英雄）：森寒冬港 (icebox)
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-26T00:40:49.912Z
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_ICEBOX__BASE = {
  "mapId": "icebox",
  "sites": [
    {
      "id": "A",
      "x": 15.6,
      "y": 74,
      "label": "A 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "B",
      "x": 80.2,
      "y": 54.7,
      "label": "B 部署区",
      "tags": [],
      "fontSize": 24
    }
  ],
  "siteFontSize": 11,
  "locationFontSize": 9,
  "attackSmokes": [
    {
      "id": "icebox_atk_a_main",
      "type": "ball",
      "name": "中二楼烟",
      "site": "A",
      "x": 46,
      "y": 69.1,
      "radius": 7,
      "desc": "封锁 A 大道入口视野，掩护进攻方进入 A 点",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "icebox_atk_a_high",
      "type": "ball",
      "name": "A二楼烟",
      "site": "A",
      "x": 22.6,
      "y": 80.5,
      "radius": 6,
      "desc": "封锁 A 高台，防止防守方从上方压制",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "icebox_atk_a_belt",
      "type": "ball",
      "name": "A警家烟",
      "site": "A",
      "x": 33.3,
      "y": 69.5,
      "radius": 6,
      "desc": "封锁 A 传送带区域，掩护侧翼进攻",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "icebox_atk_b_main",
      "type": "ball",
      "name": "B二楼烟",
      "site": "B",
      "x": 80.9,
      "y": 61.5,
      "radius": 7,
      "desc": "封锁 B 大道入口视野，掩护进攻方进入 B 点",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "icebox_atk_b_high",
      "type": "ball",
      "name": "B雪堆烟",
      "site": "B",
      "x": 72.3,
      "y": 58.2,
      "radius": 6,
      "desc": "封锁 B 高台，防止防守方从上方压制",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "icebox_atk_b_belt",
      "type": "ball",
      "name": "B警家烟",
      "site": "B",
      "x": 83.7,
      "y": 67.3,
      "radius": 6,
      "desc": "封锁 B 传送带区域，掩护侧翼进攻",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "icebox_atk_mid",
      "type": "ball",
      "name": "中路过点烟",
      "site": "A",
      "x": 49.2,
      "y": 53,
      "radius": 6,
      "desc": "封锁中路视野，争夺中路控制权",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785024958146",
      "type": "line",
      "name": "新线烟",
      "x": 56.6,
      "y": 33.9,
      "length": 46.7,
      "angle": 48.6,
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785025027427",
      "type": "line",
      "name": "新线烟",
      "x": 75.1,
      "y": 39.9,
      "length": 38.2,
      "angle": 79.2,
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785025075590",
      "type": "line",
      "name": "新线烟",
      "x": 28.7,
      "y": 40.5,
      "length": 37.7,
      "angle": 90.7,
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    }
  ],
  "defendSmokes": [
    {
      "id": "icebox_def_a_main",
      "type": "ball",
      "name": "A常规",
      "site": "A",
      "x": 17.8,
      "y": 58.4,
      "radius": 7,
      "desc": "封锁 A 大道入口，阻挡进攻方 A 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "icebox_def_b_main",
      "type": "ball",
      "name": "B黄箱烟",
      "site": "B",
      "x": 90,
      "y": 49.4,
      "radius": 7,
      "desc": "封锁 B 大道入口，阻挡进攻方 B 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "icebox_def_b_high",
      "type": "ball",
      "name": "B前点单向",
      "site": "B",
      "x": 78.5,
      "y": 45,
      "radius": 6,
      "desc": "封锁 B 高台，保护 B 点上方",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "icebox_def_b_belt",
      "type": "ball",
      "name": "B黄箱烟",
      "site": "B",
      "x": 81.1,
      "y": 49.4,
      "radius": 6,
      "desc": "封锁 B 传送带，保护 B 点侧翼",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785026422040",
      "type": "line",
      "name": "新线烟",
      "x": 36.4,
      "y": 66.9,
      "length": 30.2,
      "angle": -173.7,
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785026440435",
      "type": "line",
      "name": "新线烟",
      "x": 68.7,
      "y": 77.8,
      "length": 39,
      "angle": -73.2,
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    }
  ],
  "wallbangs": [
    {
      "id": "icebox_wb1",
      "name": "A Belt穿点",
      "x": 12,
      "y": 48,
      "desc": "A Belt 区域可穿透，打击 A 点入口防守方",
      "tags": []
    },
    {
      "id": "icebox_wb2",
      "name": "B Rafter穿点",
      "x": 82,
      "y": 42,
      "desc": "B Rafter 区域可穿透，打击 B 点上方防守方",
      "tags": []
    }
  ],
  "locations": [
    {
      "name": "守方重生点",
      "x": 44.7,
      "y": 90.7,
      "type": "spawn"
    },
    {
      "name": "攻方重生点",
      "x": 41,
      "y": 14.5,
      "type": "spawn"
    },
    {
      "name": "A区部署区",
      "x": 12.9,
      "y": 70.3,
      "type": "site"
    },
    {
      "name": "B区部署区",
      "x": 75.3,
      "y": 56.6,
      "type": "site"
    },
    {
      "name": "中路",
      "x": 50,
      "y": 48,
      "type": "area"
    }
  ]
};
