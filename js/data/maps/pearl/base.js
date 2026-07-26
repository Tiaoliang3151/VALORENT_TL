// ==========================================
// 地图基础数据（非英雄）：深海明珠 (pearl)
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-26T02:11:02.564Z
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_PEARL__BASE = {
  "mapId": "pearl",
  "sites": [
    {
      "id": "A",
      "x": 12.4,
      "y": 65.4,
      "label": "A 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "B",
      "x": 81,
      "y": 61.7,
      "label": "B 部署区",
      "tags": [],
      "fontSize": 24
    }
  ],
  "siteFontSize": 11,
  "locationFontSize": 9,
  "attackSmokes": [
    {
      "id": "pearl_atk_a_main",
      "type": "ball",
      "name": "A包隔断",
      "site": "A",
      "x": 12.9,
      "y": 72.7,
      "radius": 7,
      "desc": "封锁 A 大道入口视野，掩护进攻方进入 A 点",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "pearl_atk_a_art",
      "type": "ball",
      "name": "A小烟",
      "site": "A",
      "x": 24.2,
      "y": 65,
      "radius": 6,
      "desc": "封锁 A Art 区域，防止侧翼架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "pearl_atk_b_main",
      "type": "ball",
      "name": "B大过点烟",
      "site": "B",
      "x": 88.6,
      "y": 29.5,
      "radius": 7,
      "desc": "封锁 B 大道入口视野，掩护进攻方进入 B 点",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "pearl_atk_b_tower",
      "type": "ball",
      "name": "B二楼烟",
      "site": "B",
      "x": 76.3,
      "y": 60.4,
      "radius": 6,
      "desc": "封锁 B 塔楼高台，防止防守方从上方压制",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "pearl_atk_b_art",
      "type": "ball",
      "name": "B小烟",
      "site": "B",
      "x": 75.8,
      "y": 51,
      "radius": 6,
      "desc": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "pearl_atk_mid",
      "type": "ball",
      "name": "A小过点烟",
      "site": "A",
      "x": 37,
      "y": 57,
      "radius": 6,
      "desc": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785031386693",
      "x": 71.4,
      "y": 64.4,
      "type": "ball",
      "name": "管道单向烟",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785031403611",
      "x": 54.6,
      "y": 56.9,
      "type": "ball",
      "name": "连接烟",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785031459304",
      "x": 23.1,
      "y": 74.7,
      "type": "ball",
      "name": "花店烟",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785031496901",
      "type": "line",
      "name": "新线烟",
      "x": 74.1,
      "y": 27.7,
      "length": 40.7,
      "angle": 91.6,
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785031507327",
      "type": "line",
      "name": "新线烟",
      "x": 21.9,
      "y": 41.8,
      "length": 48.3,
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
      "id": "pearl_def_a_main",
      "type": "ball",
      "name": "A大道烟",
      "site": "A",
      "x": 17,
      "y": 55.3,
      "radius": 7,
      "desc": "封锁 A 大道入口，阻挡进攻方 A 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "pearl_def_a_art",
      "type": "ball",
      "name": "A小烟",
      "site": "A",
      "x": 30.1,
      "y": 53.3,
      "radius": 6,
      "desc": "封锁 A Art 区域，保护 A 点侧翼",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "pearl_def_b_main",
      "type": "ball",
      "name": "B大道烟",
      "site": "B",
      "x": 90.4,
      "y": 54.7,
      "radius": 7,
      "desc": "封锁 B 大道入口，阻挡进攻方 B 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "pearl_def_b_tower",
      "type": "ball",
      "name": "B大前压烟",
      "site": "B",
      "x": 81,
      "y": 27.6,
      "radius": 6,
      "desc": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "pearl_def_b_art",
      "type": "ball",
      "name": "商店烟",
      "site": "B",
      "x": 57.3,
      "y": 36.1,
      "radius": 6,
      "desc": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785031691663",
      "x": 41.5,
      "y": 27.6,
      "type": "ball",
      "name": "中路窗口烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785031748282",
      "x": 48.7,
      "y": 44.6,
      "type": "ball",
      "name": "B小烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785031807361",
      "type": "line",
      "name": "新线烟",
      "x": 14.2,
      "y": 57.9,
      "length": 42.4,
      "angle": 341,
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785031850668",
      "type": "line",
      "name": "新线烟",
      "x": 74.4,
      "y": 53.3,
      "length": 25.4,
      "angle": -32.6,
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    }
  ],
  "wallbangs": [
    {
      "id": "pearl_wb1",
      "name": "A Main穿点",
      "x": 22,
      "y": 55,
      "desc": "A Main 墙壁可穿透，打击 A 点入口防守方",
      "tags": []
    },
    {
      "id": "pearl_wb2",
      "name": "B Tower穿点",
      "x": 88,
      "y": 42,
      "desc": "B Tower 区域可穿透，打击 B 点上方防守方",
      "tags": []
    }
  ],
  "locations": [
    {
      "name": "守方重生点",
      "x": 43.2,
      "y": 89.1,
      "type": "spawn"
    },
    {
      "name": "攻方重生点",
      "x": 46.9,
      "y": 10,
      "type": "spawn"
    },
    {
      "name": "A区部署区",
      "x": 15.7,
      "y": 63.7,
      "type": "site"
    },
    {
      "name": "B区部署区",
      "x": 81.4,
      "y": 58.4,
      "type": "site"
    }
  ]
};
