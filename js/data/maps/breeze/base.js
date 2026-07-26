// ==========================================
// 地图基础数据（非英雄）：微风岛屿 (breeze)
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-25T23:40:07.628Z
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_BREEZE__BASE = {
  "mapId": "breeze",
  "sites": [
    {
      "id": "A",
      "x": 6.7,
      "y": 53.9,
      "label": "A 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "B",
      "x": 88.9,
      "y": 68.7,
      "label": "B 部署区",
      "tags": [],
      "fontSize": 24
    }
  ],
  "siteFontSize": 11,
  "locationFontSize": 9,
  "attackSmokes": [
    {
      "id": "breeze_atk_a_cave",
      "type": "ball",
      "name": "A包点烟",
      "site": "A",
      "x": 16.9,
      "y": 56,
      "radius": 7,
      "desc": "封锁 A Cave 出口视野，掩护进攻方进 A",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "breeze_atk_a_shop",
      "type": "ball",
      "name": "A包点烟",
      "site": "A",
      "x": 24.6,
      "y": 49,
      "radius": 6,
      "desc": "封锁 A Shop 区域，防止侧翼架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "breeze_atk_b_main",
      "type": "ball",
      "name": "B连接烟",
      "site": "B",
      "x": 69.9,
      "y": 70.6,
      "radius": 7,
      "desc": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "breeze_atk_b_elbow",
      "type": "ball",
      "name": "半墙单向烟",
      "site": "B",
      "x": 76.6,
      "y": 78.3,
      "radius": 6,
      "desc": "封锁 B Elbow 拐角，防止防守方近点架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "breeze_atk_mid",
      "type": "ball",
      "name": "中夹A烟",
      "site": "A",
      "x": 51.7,
      "y": 55,
      "radius": 8,
      "desc": "封锁中路超长走廊视野，防止被狙击",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785022155960",
      "x": 56.3,
      "y": 76.8,
      "type": "ball",
      "name": "中路窗口烟",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785022169822",
      "x": 39.4,
      "y": 52.8,
      "type": "ball",
      "name": "A夹B烟",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785022223448",
      "x": 72.4,
      "y": 44.1,
      "type": "line",
      "name": "B线烟",
      "length": 46,
      "angle": 84,
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785022316395",
      "x": 32,
      "y": 32.7,
      "type": "line",
      "name": "A线烟",
      "length": 42,
      "angle": 126,
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    }
  ],
  "defendSmokes": [
    {
      "id": "breeze_def_a_cave",
      "type": "ball",
      "name": "A大常规",
      "site": "A",
      "x": 14.7,
      "y": 38.6,
      "radius": 7,
      "desc": "封锁 A Cave 出口，阻挡进攻方从 Cave 出",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "breeze_def_a_shop",
      "type": "ball",
      "name": "A大前压",
      "site": "A",
      "x": 27.3,
      "y": 30.1,
      "radius": 6,
      "desc": "封锁 A Shop 区域，保护 A 点侧翼",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "breeze_def_b_main",
      "type": "ball",
      "name": "B大常规",
      "site": "B",
      "x": 86,
      "y": 56,
      "radius": 7,
      "desc": "封锁 B Main 入口，阻挡进攻方 B 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "breeze_def_b_elbow",
      "type": "ball",
      "name": "B小烟",
      "site": "B",
      "x": 65.1,
      "y": 59.1,
      "radius": 6,
      "desc": "封锁 B Elbow 拐角，保护 B 点近点",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "breeze_def_mid",
      "type": "ball",
      "name": "中门烟",
      "site": "A",
      "x": 33.8,
      "y": 54.1,
      "radius": 8,
      "desc": "封锁中路走廊，阻止进攻方中路前压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785022607879",
      "x": 49.8,
      "y": 51.7,
      "type": "ball",
      "name": "中路单向",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785022609048",
      "x": 69,
      "y": 71,
      "type": "ball",
      "name": "B连接烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785022739758",
      "type": "line",
      "name": "A连中",
      "x": 8.6,
      "y": 44.2,
      "length": 41.5,
      "angle": 9.9,
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785022788196",
      "type": "line",
      "name": "B连中高台",
      "x": 94.3,
      "y": 59,
      "length": 42.3,
      "angle": -166.3,
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    }
  ],
  "wallbangs": [
    {
      "id": "breeze_wb1",
      "name": "A Cave穿点",
      "x": 8,
      "y": 42,
      "desc": "A Cave 墙壁可穿透，打击 Cave 内防守方",
      "tags": []
    },
    {
      "id": "breeze_wb2",
      "name": "B Elbow穿点",
      "x": 78,
      "y": 70,
      "desc": "B Elbow 区域可穿透，打击拐角防守方",
      "tags": []
    }
  ],
  "locations": [
    {
      "name": "守方重生点",
      "x": 41.8,
      "y": 90.9,
      "type": "spawn"
    },
    {
      "name": "攻方重生点",
      "x": 55,
      "y": 10.7,
      "type": "spawn"
    },
    {
      "name": "A区部署区",
      "x": 12.2,
      "y": 52.7,
      "type": "site"
    },
    {
      "name": "B区部署区",
      "x": 86,
      "y": 73.7,
      "type": "site"
    }
  ]
};
