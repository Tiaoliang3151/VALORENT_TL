// ==========================================
// 地图基础数据（非英雄）：幽邃地窟 (abyss)
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-26T03:09:11.099Z
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_ABYSS__BASE = {
  "mapId": "abyss",
  "sites": [
    {
      "id": "A",
      "x": 4,
      "y": 57.7,
      "label": "A 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "B",
      "x": 88.4,
      "y": 59.4,
      "label": "B 部署区",
      "tags": [],
      "fontSize": 24
    }
  ],
  "siteFontSize": 11,
  "locationFontSize": 9,
  "attackSmokes": [
    {
      "id": "abyss_atk_a_main",
      "type": "ball",
      "name": "A警家烟",
      "site": "A",
      "x": 10.4,
      "y": 70.6,
      "radius": 7,
      "desc": "封锁 A 大道入口视野，掩护进攻方进入 A 点",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "abyss_atk_a_short",
      "type": "ball",
      "name": "A二楼烟",
      "site": "A",
      "x": 23.3,
      "y": 50,
      "radius": 6,
      "desc": "封锁 A 小道，防止侧翼架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "abyss_atk_b_main",
      "type": "ball",
      "name": "B二楼烟",
      "site": "B",
      "x": 79.9,
      "y": 71.3,
      "radius": 7,
      "desc": "封锁 B 大道入口视野，掩护进攻方进入 B 点",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "abyss_atk_b_short",
      "type": "ball",
      "name": "B警家烟",
      "site": "B",
      "x": 73.1,
      "y": 55.7,
      "radius": 6,
      "desc": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "abyss_atk_mid",
      "type": "ball",
      "name": "中路烟",
      "site": "A",
      "x": 51.3,
      "y": 68.4,
      "radius": 6,
      "desc": "封锁中路视野，争夺中路控制权",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785035229778",
      "x": 45.2,
      "y": 61.7,
      "type": "ball",
      "name": "中路烟",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785035236906",
      "x": 46.2,
      "y": 52.1,
      "type": "ball",
      "name": "中路单摸",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785035255081",
      "x": 6.7,
      "y": 58.1,
      "type": "ball",
      "name": "A包单向",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    }
  ],
  "defendSmokes": [
    {
      "id": "abyss_def_a_main",
      "type": "ball",
      "name": "A大道烟",
      "site": "A",
      "x": 11.8,
      "y": 41.2,
      "radius": 7,
      "desc": "封锁 A 大道入口，阻挡进攻方 A 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "abyss_def_a_short",
      "type": "ball",
      "name": "A大单向烟",
      "site": "A",
      "x": 15.5,
      "y": 39.6,
      "radius": 6,
      "desc": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "abyss_def_b_main",
      "type": "ball",
      "name": "B大道烟",
      "site": "B",
      "x": 86.4,
      "y": 46.9,
      "radius": 7,
      "desc": "封锁 B 大道入口，阻挡进攻方 B 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "abyss_def_b_short",
      "type": "ball",
      "name": "B箱单向烟",
      "site": "B",
      "x": 93.5,
      "y": 61.7,
      "radius": 6,
      "desc": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "abyss_def_mid",
      "type": "ball",
      "name": "中路高台烟",
      "site": "A",
      "x": 45,
      "y": 38,
      "radius": 6,
      "desc": "封锁中路视野，阻止进攻方中路前压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785034317591",
      "x": 54,
      "y": 50.6,
      "type": "ball",
      "name": "中路箱上单向烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785034342857",
      "x": 90.4,
      "y": 34.1,
      "type": "ball",
      "name": "窗口单向烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    }
  ],
  "wallbangs": [
    {
      "id": "abyss_wb1",
      "name": "A Main穿点",
      "x": 10,
      "y": 58,
      "desc": "A Main 薄墙可穿透，打击 A 点入口防守方",
      "tags": []
    },
    {
      "id": "abyss_wb2",
      "name": "B Main穿点",
      "x": 90,
      "y": 58,
      "desc": "B Main 薄墙可穿透，打击 B 点入口防守方",
      "tags": []
    }
  ],
  "locations": [
    {
      "name": "守方重生点",
      "x": 45,
      "y": 91.5,
      "type": "spawn"
    },
    {
      "name": "攻方重生点",
      "x": 42.5,
      "y": 10,
      "type": "spawn"
    },
    {
      "name": "A区部署区",
      "x": 9,
      "y": 61.1,
      "type": "site"
    },
    {
      "name": "B区部署区",
      "x": 89.7,
      "y": 63.7,
      "type": "site"
    }
  ]
};
