// ==========================================
// 地图基础数据（非英雄）：盐海矿镇 (corrode)
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-25T23:50:46.433Z
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_CORRODE__BASE = {
  "mapId": "corrode",
  "sites": [
    {
      "id": "A",
      "x": 18,
      "y": 59.6,
      "label": "A 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "B",
      "x": 76.9,
      "y": 59,
      "label": "B 部署区",
      "tags": [],
      "fontSize": 24
    }
  ],
  "siteFontSize": 11,
  "locationFontSize": 9,
  "attackSmokes": [
    {
      "id": "corrode_atk_a_main",
      "type": "ball",
      "name": "包点隔断",
      "site": "A",
      "x": 16.6,
      "y": 63.7,
      "radius": 7,
      "desc": "不走管道可以给",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "corrode_atk_a_short",
      "type": "ball",
      "name": "A小道烟",
      "site": "A",
      "x": 36.1,
      "y": 55.9,
      "radius": 6,
      "desc": "封锁 A 小道，防止侧翼架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "corrode_atk_b_main",
      "type": "ball",
      "name": "B警家烟",
      "site": "B",
      "x": 88.3,
      "y": 62.4,
      "radius": 7,
      "desc": "封锁 B 大道入口视野，掩护进攻方进入 B 点",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "corrode_atk_b_short",
      "type": "ball",
      "name": "B小道烟",
      "site": "B",
      "x": 66.3,
      "y": 61.4,
      "radius": 6,
      "desc": "封锁 B 小道，防止侧翼架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "corrode_atk_mid",
      "type": "ball",
      "name": "中路烟",
      "site": "A",
      "x": 53,
      "y": 50,
      "radius": 6,
      "desc": "封锁中路视野，争夺中路控制权",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785023225201",
      "x": 25.2,
      "y": 71.1,
      "type": "ball",
      "name": "A警家烟",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785023232144",
      "x": 73.8,
      "y": 69,
      "type": "ball",
      "name": "B二楼烟",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785023233722",
      "x": 73.6,
      "y": 59.9,
      "type": "ball",
      "name": "防拆包单向",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785023267386",
      "type": "line",
      "name": "新线烟",
      "x": 72.1,
      "y": 45.9,
      "length": 39,
      "angle": 82,
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785023294727",
      "type": "line",
      "name": "新线烟",
      "x": 27.7,
      "y": 42.2,
      "length": 34.2,
      "angle": 99,
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    }
  ],
  "defendSmokes": [
    {
      "id": "corrode_def_a_main",
      "type": "ball",
      "name": "A管道烟",
      "site": "A",
      "x": 11.4,
      "y": 66.9,
      "radius": 7,
      "desc": "封锁 A 大道入口，阻挡进攻方 A 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "corrode_def_a_short",
      "type": "ball",
      "name": "A大道烟",
      "site": "A",
      "x": 19.4,
      "y": 44.6,
      "radius": 6,
      "desc": "封锁 A 小道，保护 A 点侧翼",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "corrode_def_b_main",
      "type": "ball",
      "name": "B大道烟",
      "site": "B",
      "x": 80.9,
      "y": 49.9,
      "radius": 7,
      "desc": "封锁 B 大道入口，阻挡进攻方 B 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "corrode_def_b_short",
      "type": "ball",
      "name": "B小前压",
      "site": "B",
      "x": 70.3,
      "y": 47.7,
      "radius": 6,
      "desc": "封锁 B 小道，保护 B 点侧翼",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "corrode_def_mid",
      "type": "ball",
      "name": "中路烟",
      "site": "A",
      "x": 49,
      "y": 34.1,
      "radius": 6,
      "desc": "封锁中路视野，阻止进攻方中路前压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785023015266",
      "x": 36,
      "y": 55.7,
      "type": "ball",
      "name": "A小烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785023080157",
      "type": "line",
      "name": "新线烟",
      "x": 16.1,
      "y": 47.6,
      "length": 41.5,
      "angle": -16.4,
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785023103427",
      "type": "line",
      "name": "新线烟",
      "x": 83.7,
      "y": 53.1,
      "length": 40.7,
      "angle": -156.4,
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    }
  ],
  "wallbangs": [
    {
      "id": "corrode_wb1",
      "name": "A Main穿点",
      "x": 12,
      "y": 58,
      "desc": "A Main 薄墙可穿透，打击 A 点入口防守方",
      "tags": []
    },
    {
      "id": "corrode_wb2",
      "name": "B Main穿点",
      "x": 88,
      "y": 58,
      "desc": "B Main 薄墙可穿透，打击 B 点入口防守方",
      "tags": []
    }
  ],
  "locations": [
    {
      "name": "守方重生点",
      "x": 49.7,
      "y": 87.9,
      "type": "spawn"
    },
    {
      "name": "攻方重生点",
      "x": 50,
      "y": 9,
      "type": "spawn"
    },
    {
      "name": "A区部署区",
      "x": 19.6,
      "y": 57.4,
      "type": "site"
    },
    {
      "name": "B区部署区",
      "x": 76.4,
      "y": 56.7,
      "type": "site"
    },
    {
      "name": "中路",
      "x": 50,
      "y": 42,
      "type": "area"
    }
  ]
};
