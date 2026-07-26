// ==========================================
// 地图基础数据（非英雄）：裂变峡谷 (fracture)
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-26T00:04:44.533Z
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_FRACTURE__BASE = {
  "mapId": "fracture",
  "sites": [
    {
      "id": "A",
      "x": 10.3,
      "y": 52.7,
      "label": "A 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "B",
      "x": 92.6,
      "y": 42.7,
      "label": "B 部署区",
      "tags": [],
      "fontSize": 24
    }
  ],
  "siteFontSize": 11,
  "locationFontSize": 9,
  "attackSmokes": [
    {
      "id": "fracture_atk_a_main",
      "type": "ball",
      "name": "A隔断",
      "site": "A",
      "x": 22.9,
      "y": 46.4,
      "radius": 7,
      "desc": "封锁 A 大道入口视野，掩护进攻方进入 A 点",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "fracture_atk_a_arcade",
      "type": "ball",
      "name": "A警家",
      "site": "A",
      "x": 33.7,
      "y": 49.1,
      "radius": 6,
      "desc": "封锁 A 商场区域，防止防守方侧翼架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "fracture_atk_a_rope",
      "type": "ball",
      "name": "高低差烟",
      "site": "A",
      "x": 21.4,
      "y": 55,
      "radius": 6,
      "desc": "封锁 A 绳索区域，掩护进攻方从侧翼进 A",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "fracture_atk_b_main",
      "type": "ball",
      "name": "A二楼烟",
      "site": "B",
      "x": 43.3,
      "y": 35.9,
      "radius": 7,
      "desc": "封锁 B 大道入口视野，掩护进攻方进入 B 点",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "fracture_atk_b_arcade",
      "type": "ball",
      "name": "B管道烟",
      "site": "B",
      "x": 76.3,
      "y": 40,
      "radius": 6,
      "desc": "封锁 B 拱廊通道，防止防守方侧翼支援",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "fracture_atk_b_rope",
      "type": "ball",
      "name": "B警家烟",
      "site": "B",
      "x": 71.6,
      "y": 51.6,
      "radius": 6,
      "desc": "封锁 B 绳索区域，掩护进攻方从侧翼进 B",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785024152725",
      "x": 34.1,
      "y": 44.2,
      "type": "ball",
      "name": "沙地烟",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785024156772",
      "x": 23,
      "y": 50.9,
      "type": "ball",
      "name": "A隔断",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785024231316",
      "type": "line",
      "name": "新线烟",
      "x": 54.9,
      "y": 79.4,
      "length": 47.1,
      "angle": 301.5,
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785024255168",
      "type": "line",
      "name": "新线烟",
      "x": 35.1,
      "y": 21.5,
      "length": 35.7,
      "angle": 120.8,
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    }
  ],
  "defendSmokes": [
    {
      "id": "fracture_def_a_main",
      "type": "ball",
      "name": "A大常规",
      "site": "A",
      "x": 16.4,
      "y": 37.7,
      "radius": 7,
      "desc": "封锁 A 大道入口，阻挡进攻方 A 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "fracture_def_a_arcade",
      "type": "ball",
      "name": "沙地烟",
      "site": "A",
      "x": 34.1,
      "y": 43.7,
      "radius": 6,
      "desc": "封锁 A 商场，保护 A 点侧翼",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "fracture_def_a_rope",
      "type": "ball",
      "name": "A绳索烟",
      "site": "A",
      "x": 21.6,
      "y": 55.3,
      "radius": 6,
      "desc": "封锁 A 绳索区域，阻止进攻方绕后",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "fracture_def_b_main",
      "type": "ball",
      "name": "B小前压烟",
      "site": "B",
      "x": 68.9,
      "y": 77.3,
      "radius": 7,
      "desc": "封锁 B 大道入口，阻挡进攻方 B 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "fracture_def_b_arcade",
      "type": "ball",
      "name": "B大常规",
      "site": "B",
      "x": 86.6,
      "y": 35.9,
      "radius": 6,
      "desc": "封锁 B 拱廊，保护 B 点侧翼",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "fracture_def_b_rope",
      "type": "ball",
      "name": "B小烟",
      "site": "B",
      "x": 68.7,
      "y": 61.1,
      "radius": 6,
      "desc": "封锁 B 绳索区域，阻止进攻方绕后",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785023695589",
      "x": 17.4,
      "y": 28.4,
      "type": "ball",
      "name": "A大常规",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785023719203",
      "x": 27.6,
      "y": 27.5,
      "type": "ball",
      "name": "沙地烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785023723535",
      "x": 33.1,
      "y": 24.3,
      "type": "ball",
      "name": "A厅烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785023729240",
      "x": 37.6,
      "y": 19.1,
      "type": "ball",
      "name": "A厅前压烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785023732596",
      "x": 64.2,
      "y": 17.3,
      "type": "ball",
      "name": "B大前压烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785023763142",
      "type": "line",
      "name": "新线烟",
      "x": 7.9,
      "y": 40.4,
      "length": 35.2,
      "angle": -10.5,
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785023783995",
      "type": "line",
      "name": "新线烟",
      "x": 63.4,
      "y": 53,
      "length": 34.6,
      "angle": 1.9,
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    }
  ],
  "wallbangs": [
    {
      "id": "fracture_wb1",
      "name": "A Main穿点",
      "x": 18,
      "y": 42,
      "desc": "A Main 墙壁可穿透，打击 A 点入口防守方",
      "tags": []
    },
    {
      "id": "fracture_wb2",
      "name": "B Arcade穿点",
      "x": 75,
      "y": 48,
      "desc": "B Arcade 区域可穿透，打击 B 点侧翼防守方",
      "tags": []
    }
  ],
  "locations": [
    {
      "name": "攻方重生点",
      "x": 50,
      "y": 14.4,
      "type": "spawn"
    },
    {
      "name": "守方重生点",
      "x": 49,
      "y": 56.2,
      "type": "spawn"
    },
    {
      "name": "A区部署区",
      "x": 13.3,
      "y": 44,
      "type": "site"
    },
    {
      "name": "B区部署区",
      "x": 90.7,
      "y": 47.6,
      "type": "site"
    },
    {
      "name": "中庭",
      "x": 49.1,
      "y": 58,
      "type": "area"
    }
  ]
};
