// ==========================================
// 地图基础数据（非英雄）：霓虹町 (split)
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-26T02:22:26.084Z
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_SPLIT__BASE = {
  "mapId": "split",
  "sites": [
    {
      "id": "A",
      "x": 7.9,
      "y": 70.4,
      "label": "A 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "B",
      "x": 79.6,
      "y": 66.6,
      "label": "B 部署区",
      "tags": [],
      "fontSize": 24
    }
  ],
  "siteFontSize": 11,
  "locationFontSize": 9,
  "attackSmokes": [
    {
      "id": "split_atk_a_main",
      "type": "ball",
      "name": "A警家烟",
      "site": "A",
      "x": 20.4,
      "y": 79,
      "radius": 7,
      "desc": "封锁 A 大道入口视野，掩护进攻方进入 A 点",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "split_atk_a_heaven",
      "type": "ball",
      "name": "A二楼烟",
      "site": "A",
      "x": 27.8,
      "y": 69.6,
      "radius": 6,
      "desc": "封锁 A 天堂高台，防止防守方从上方压制",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "split_atk_b_main",
      "type": "ball",
      "name": "B警家烟",
      "site": "B",
      "x": 80.4,
      "y": 74.2,
      "radius": 7,
      "desc": "封锁 B 大道入口视野，掩护进攻方进入 B 点",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "split_atk_b_rafter",
      "type": "ball",
      "name": "B二楼常规烟",
      "site": "B",
      "x": 70.9,
      "y": 59.4,
      "radius": 6,
      "desc": "封锁 B Rafter 高台，防止防守方从上方架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "split_atk_mid",
      "type": "ball",
      "name": "电梯房烟",
      "site": "A",
      "x": 51.6,
      "y": 59,
      "radius": 6,
      "desc": "封锁中路视野，争夺中路控制权",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785032485219",
      "x": 85.4,
      "y": 58.1,
      "type": "ball",
      "name": "B包点隔断",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785032513172",
      "x": 67.1,
      "y": 52.4,
      "type": "ball",
      "name": "B二楼连接烟",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    }
  ],
  "defendSmokes": [
    {
      "id": "split_def_a_main",
      "type": "ball",
      "name": "A一楼",
      "site": "A",
      "x": 21.3,
      "y": 56.2,
      "radius": 7,
      "desc": "封锁 A 大道入口，阻挡进攻方 A 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "split_def_a_heaven",
      "type": "ball",
      "name": "A常规",
      "site": "A",
      "x": 15.5,
      "y": 49.5,
      "radius": 6,
      "desc": "封锁 A 天堂高台，保护 A 点上方",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "split_def_b_main",
      "type": "ball",
      "name": "B大道烟",
      "site": "B",
      "x": 91.4,
      "y": 53,
      "radius": 7,
      "desc": "封锁 B 大道入口，阻挡进攻方 B 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "split_def_b_rafter",
      "type": "ball",
      "name": "B前点单向",
      "site": "B",
      "x": 81.7,
      "y": 40.4,
      "radius": 6,
      "desc": "封锁 B Rafter 高台，保护 B 点上方",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "split_def_mid",
      "type": "ball",
      "name": "中路烟",
      "site": "A",
      "x": 54.3,
      "y": 48.6,
      "radius": 6,
      "desc": "封锁中路视野，阻止进攻方中路前压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785032125622",
      "x": 13.9,
      "y": 42.3,
      "type": "ball",
      "name": "A前压烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785032144286",
      "x": 10,
      "y": 66.5,
      "type": "ball",
      "name": "回防单向烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785032164398",
      "x": 35,
      "y": 52.4,
      "type": "ball",
      "name": "A二楼烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785032166022",
      "x": 34.1,
      "y": 59.3,
      "type": "ball",
      "name": "A二楼烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785032205075",
      "x": 51.4,
      "y": 41.3,
      "type": "ball",
      "name": "下水道单向",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785032219693",
      "x": 60.3,
      "y": 39.3,
      "type": "ball",
      "name": "拉面馆单向",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785032235320",
      "x": 92.3,
      "y": 63.2,
      "type": "ball",
      "name": "包点隔断",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    }
  ],
  "wallbangs": [
    {
      "id": "split_wb1",
      "name": "A Heaven穿点",
      "x": 18,
      "y": 38,
      "desc": "A Heaven 墙壁可穿透，打击 A 点内部防守方",
      "tags": []
    },
    {
      "id": "split_wb2",
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
      "x": 52.6,
      "y": 88.7,
      "type": "spawn"
    },
    {
      "name": "攻方重生点",
      "x": 54.1,
      "y": 15,
      "type": "spawn"
    },
    {
      "name": "A区部署区",
      "x": 8.9,
      "y": 63,
      "type": "site"
    },
    {
      "name": "B区部署区",
      "x": 84.1,
      "y": 67.9,
      "type": "site"
    }
  ]
};
