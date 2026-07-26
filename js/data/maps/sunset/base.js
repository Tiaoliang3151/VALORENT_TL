// ==========================================
// 地图基础数据（非英雄）：日落之城 (sunset)
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-26T02:46:40.334Z
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_SUNSET__BASE = {
  "mapId": "sunset",
  "sites": [
    {
      "id": "A",
      "x": 20.6,
      "y": 58.4,
      "label": "A 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "B",
      "x": 93.7,
      "y": 58.1,
      "label": "B 部署区",
      "tags": [],
      "fontSize": 24
    }
  ],
  "siteFontSize": 11,
  "locationFontSize": 9,
  "attackSmokes": [
    {
      "id": "sunset_atk_a_main",
      "type": "ball",
      "name": "A警家烟",
      "site": "A",
      "x": 18.7,
      "y": 78.1,
      "radius": 7,
      "desc": "封锁 A 大道入口视野，掩护进攻方进入 A 点",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "sunset_atk_a_market",
      "type": "ball",
      "name": "A小烟",
      "site": "A",
      "x": 30.3,
      "y": 68,
      "radius": 6,
      "desc": "封锁 A 市场区域，防止侧翼架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "sunset_atk_b_main",
      "type": "ball",
      "name": "B警家烟",
      "site": "B",
      "x": 82.9,
      "y": 68.6,
      "radius": 7,
      "desc": "封锁 B 大道入口视野，掩护进攻方进入 B 点",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "sunset_atk_b_market",
      "type": "ball",
      "name": "B市场烟",
      "site": "B",
      "x": 77.4,
      "y": 48.4,
      "radius": 6,
      "desc": "封锁 B 市场区域，防止侧翼架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "sunset_atk_mid",
      "type": "ball",
      "name": "中路烟",
      "site": "A",
      "x": 49.9,
      "y": 65.4,
      "radius": 6,
      "desc": "封锁中路视野，争夺中路控制权",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785033911604",
      "x": 73.4,
      "y": 62.4,
      "type": "ball",
      "name": "市场夹B烟",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785033930340",
      "x": 61.3,
      "y": 67.5,
      "type": "ball",
      "name": "中路夹A",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785033954239",
      "x": 38.9,
      "y": 71.2,
      "type": "ball",
      "name": "中路夹B",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    }
  ],
  "defendSmokes": [
    {
      "id": "sunset_def_a_main",
      "type": "ball",
      "name": "A大单向烟",
      "site": "A",
      "x": 28.3,
      "y": 52.9,
      "radius": 7,
      "desc": "封锁 A 大道入口，阻挡进攻方 A 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "sunset_def_a_market",
      "type": "ball",
      "name": "A厅单向烟",
      "site": "A",
      "x": 25.1,
      "y": 39.8,
      "radius": 6,
      "desc": "封锁 A 市场，保护 A 点侧翼",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "sunset_def_b_main",
      "type": "ball",
      "name": "B大道烟",
      "site": "B",
      "x": 89,
      "y": 41.4,
      "radius": 7,
      "desc": "封锁 B 大道入口，阻挡进攻方 B 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "sunset_def_b_market",
      "type": "ball",
      "name": "B市场烟",
      "site": "B",
      "x": 61.1,
      "y": 54.7,
      "radius": 6,
      "desc": "封锁 B 市场，保护 B 点侧翼",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "sunset_def_mid",
      "type": "ball",
      "name": "中路单向烟",
      "site": "A",
      "x": 53.4,
      "y": 52.5,
      "radius": 6,
      "desc": "封锁中路视野，阻止进攻方中路前压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785033631536",
      "x": 86,
      "y": 39.8,
      "type": "ball",
      "name": "B大单向烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785033673748",
      "x": 50.6,
      "y": 40.1,
      "type": "ball",
      "name": "中远烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785033689237",
      "x": 42.9,
      "y": 54.1,
      "type": "ball",
      "name": "红砖烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785033710284",
      "x": 9.1,
      "y": 68.9,
      "type": "ball",
      "name": "管道烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    }
  ],
  "wallbangs": [
    {
      "id": "sunset_wb1",
      "name": "A Main穿点",
      "x": 12,
      "y": 58,
      "desc": "A Main 薄墙可穿透，打击 A 点入口防守方",
      "tags": []
    },
    {
      "id": "sunset_wb2",
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
      "x": 48.8,
      "y": 90.1,
      "type": "spawn"
    },
    {
      "name": "攻方重生点",
      "x": 46,
      "y": 8.9,
      "type": "spawn"
    },
    {
      "name": "A区部署区",
      "x": 18.3,
      "y": 64.4,
      "type": "site"
    },
    {
      "name": "B区部署区",
      "x": 84,
      "y": 61.1,
      "type": "site"
    }
  ]
};
