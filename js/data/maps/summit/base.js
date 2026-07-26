// ==========================================
// 地图基础数据（非英雄）：天枢云阙 (summit)
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-26T02:37:19.623Z
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_SUMMIT__BASE = {
  "mapId": "summit",
  "sites": [
    {
      "id": "A",
      "x": 5.1,
      "y": 54.3,
      "label": "A 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "B",
      "x": 82.4,
      "y": 69.4,
      "label": "B 部署区",
      "tags": [],
      "fontSize": 24
    }
  ],
  "siteFontSize": 11,
  "locationFontSize": 9,
  "attackSmokes": [
    {
      "id": "summit_atk_a_main",
      "type": "ball",
      "name": "A警家烟",
      "site": "A",
      "x": 3.3,
      "y": 70.9,
      "radius": 7,
      "desc": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "summit_atk_a_short",
      "type": "ball",
      "name": "A小道烟",
      "site": "A",
      "x": 35,
      "y": 72,
      "radius": 6,
      "desc": "封锁 A 小道，防止侧翼架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "summit_atk_b_main",
      "type": "ball",
      "name": "B高台烟",
      "site": "B",
      "x": 86.1,
      "y": 77.1,
      "radius": 7,
      "desc": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "summit_atk_b_short",
      "type": "ball",
      "name": "B小道烟",
      "site": "B",
      "x": 69.3,
      "y": 62.1,
      "radius": 6,
      "desc": "封锁 B 小道，防止侧翼架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "summit_atk_mid",
      "type": "ball",
      "name": "中路烟",
      "site": "A",
      "x": 51.5,
      "y": 66.1,
      "radius": 6,
      "desc": "封锁中路视野，争夺中路控制权",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785033006906",
      "x": 76,
      "y": 78.1,
      "type": "ball",
      "name": "B警家烟",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785033009007",
      "x": 79.7,
      "y": 72.2,
      "type": "ball",
      "name": "B隔断烟",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785033010636",
      "x": 79.2,
      "y": 60.4,
      "type": "ball",
      "name": "B隔断烟",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785033020958",
      "x": 30.6,
      "y": 65.8,
      "type": "ball",
      "name": "A小道烟",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785033029605",
      "x": 27.3,
      "y": 56.7,
      "type": "ball",
      "name": "A隔断烟",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785033030816",
      "x": 19.3,
      "y": 60,
      "type": "ball",
      "name": "A隔断烟",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785033033644",
      "x": 19.4,
      "y": 70.7,
      "type": "ball",
      "name": "A画架烟",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785033037503",
      "x": 8.2,
      "y": 65.2,
      "type": "ball",
      "name": "A包隔断烟",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785033254684",
      "type": "line",
      "name": "新线烟",
      "x": 78.3,
      "y": 40.8,
      "length": 41.5,
      "angle": 79.9,
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785033277693",
      "type": "line",
      "name": "新线烟",
      "x": 29.9,
      "y": 46.8,
      "length": 38,
      "angle": 142.5,
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    }
  ],
  "defendSmokes": [
    {
      "id": "summit_def_a_main",
      "type": "ball",
      "name": "A大道烟",
      "site": "A",
      "x": 18.6,
      "y": 44.9,
      "radius": 7,
      "desc": "封锁 A 大道入口，阻挡进攻方 A 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "summit_def_a_short",
      "type": "ball",
      "name": "A小道烟",
      "site": "A",
      "x": 36.5,
      "y": 56.3,
      "radius": 6,
      "desc": "封锁 A 小道，保护 A 点侧翼",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "summit_def_b_main",
      "type": "ball",
      "name": "B大道烟",
      "site": "B",
      "x": 87.9,
      "y": 53,
      "radius": 7,
      "desc": "封锁 B 大道入口，阻挡进攻方 B 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "summit_def_b_short",
      "type": "ball",
      "name": "青砖烟",
      "site": "B",
      "x": 60.9,
      "y": 38.6,
      "radius": 6,
      "desc": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "summit_def_mid",
      "type": "ball",
      "name": "中路烟",
      "site": "A",
      "x": 51.1,
      "y": 51.6,
      "radius": 6,
      "desc": "封锁中路视野，阻止进攻方中路前压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785032723433",
      "x": 75.6,
      "y": 45.8,
      "type": "ball",
      "name": "B前点单向烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785032739202",
      "x": 46.6,
      "y": 33.3,
      "type": "ball",
      "name": "中远烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785032756642",
      "x": 27.4,
      "y": 40.6,
      "type": "ball",
      "name": "A大单向烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785032839473",
      "type": "line",
      "name": "新线烟",
      "x": 6.6,
      "y": 53.1,
      "length": 50.5,
      "angle": -11.9,
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785032851205",
      "type": "line",
      "name": "新线烟",
      "x": 52,
      "y": 66.5,
      "length": 46.8,
      "angle": -150.8,
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785032864244",
      "type": "line",
      "name": "新线烟",
      "x": 52.6,
      "y": 65.3,
      "length": 46.2,
      "angle": -16.5,
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    }
  ],
  "wallbangs": [
    {
      "id": "summit_wb1",
      "name": "A Main穿点",
      "x": 10,
      "y": 58,
      "desc": "A Main 薄墙可穿透，打击 A 点入口防守方",
      "tags": []
    },
    {
      "id": "summit_wb2",
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
      "x": 48.3,
      "y": 89.6,
      "type": "spawn"
    },
    {
      "name": "攻方重生点",
      "x": 51.1,
      "y": 9.6,
      "type": "spawn"
    },
    {
      "name": "A区部署区",
      "x": 8.6,
      "y": 51.9,
      "type": "site"
    },
    {
      "name": "B区部署区",
      "x": 87.6,
      "y": 69.7,
      "type": "site"
    }
  ]
};
