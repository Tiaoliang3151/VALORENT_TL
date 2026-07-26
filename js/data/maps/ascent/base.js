// ==========================================
// 地图基础数据（非英雄）：亚海悬城 (ascent)
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-25T23:10:23.728Z
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_ASCENT__BASE = {
  "mapId": "ascent",
  "sites": [
    {
      "id": "A",
      "x": 15,
      "y": 65,
      "label": "A 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "B",
      "x": 82.1,
      "y": 68.6,
      "label": "B 部署区",
      "tags": [],
      "fontSize": 24
    }
  ],
  "siteFontSize": 11,
  "locationFontSize": 9,
  "attackSmokes": [
    {
      "id": "ascent_atk_a_main",
      "type": "ball",
      "name": "花园烟",
      "site": "A",
      "x": 28.2,
      "y": 66.3,
      "radius": 7,
      "desc": "封锁 A 大道入口视野，掩护进攻方进入 A 点",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "ascent_atk_a_heaven",
      "type": "ball",
      "name": "树屋烟",
      "site": "A",
      "x": 25.9,
      "y": 60.5,
      "radius": 6,
      "desc": "封锁 A 天堂高台，防止防守方从高处架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "ascent_atk_a_link",
      "type": "ball",
      "name": "A小烟",
      "site": "A",
      "x": 39.3,
      "y": 55.7,
      "radius": 6,
      "desc": "封锁 A 连接，防止中路防守方支援 A 点",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "ascent_atk_b_main",
      "type": "ball",
      "name": "B警家烟",
      "site": "B",
      "x": 65.7,
      "y": 82.4,
      "radius": 7,
      "desc": "封锁 B 大道入口视野，掩护进攻方进入 B 点",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "ascent_atk_b_market",
      "type": "ball",
      "name": "B市场烟",
      "site": "B",
      "x": 57.4,
      "y": 71,
      "radius": 6,
      "desc": "封锁 B 市场区域，防止防守方侧翼架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "ascent_atk_b_window",
      "type": "ball",
      "name": "中路警家烟",
      "site": "B",
      "x": 49.1,
      "y": 75.9,
      "radius": 6,
      "desc": "封锁 B 窗口高台视野，防止防守方从高处压制",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "ascent_atk_mid",
      "type": "ball",
      "name": "中路烟",
      "site": "A",
      "x": 49.6,
      "y": 59.3,
      "radius": 6,
      "desc": "封锁中路视野，争夺中路控制权",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785020431696",
      "x": 19.3,
      "y": 74.8,
      "type": "ball",
      "name": "A二楼烟",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    }
  ],
  "defendSmokes": [
    {
      "id": "ascent_def_a_main",
      "type": "ball",
      "name": "A大烟",
      "site": "A",
      "x": 14.7,
      "y": 53.4,
      "radius": 7,
      "desc": "稍微出去一点，防止涌入",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "ascent_def_a_heaven",
      "type": "ball",
      "name": "A大单向烟",
      "site": "A",
      "x": 24.9,
      "y": 48.9,
      "radius": 6,
      "desc": "封锁 A 天堂高台，保护 A 点上方",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "ascent_def_a_link",
      "type": "ball",
      "name": "中路隔断烟",
      "site": "A",
      "x": 49.3,
      "y": 64.4,
      "radius": 6,
      "desc": "封锁 A 连接，防止进攻方从中路转 A",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "ascent_def_b_main",
      "type": "ball",
      "name": "B大烟",
      "site": "B",
      "x": 65.8,
      "y": 60.5,
      "radius": 7,
      "desc": "封锁 B 大道入口，阻挡进攻方 B 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "ascent_def_b_window",
      "type": "ball",
      "name": "B小烟",
      "site": "B",
      "x": 58,
      "y": 47.7,
      "radius": 6,
      "desc": "封锁 B 窗口高台，保护 B 点上方",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "ascent_def_mid",
      "type": "ball",
      "name": "中路烟",
      "site": "A",
      "x": 42.2,
      "y": 33.9,
      "radius": 6,
      "desc": "封锁中路视野，阻止进攻方中路前压",
      "tags": [
        "防守方"
      ]
    }
  ],
  "wallbangs": [
    {
      "id": "ascent_wb1",
      "name": "A门穿点",
      "x": 22,
      "y": 55,
      "desc": "A门薄墙可穿透，打击A点角落防守方",
      "tags": []
    },
    {
      "id": "ascent_wb2",
      "name": "B窗穿点",
      "x": 82,
      "y": 48,
      "desc": "B窗口墙壁可穿透，打击B点内部防守方",
      "tags": []
    }
  ],
  "locations": [
    {
      "name": "守方重生点",
      "x": 43.4,
      "y": 90.2,
      "type": "spawn"
    },
    {
      "name": "攻方重生点",
      "x": 56.7,
      "y": 11,
      "type": "spawn"
    },
    {
      "name": "A区部署区",
      "x": 13,
      "y": 70.9,
      "type": "site"
    },
    {
      "name": "B区部署区",
      "x": 79.3,
      "y": 74.6,
      "type": "site"
    },
    {
      "name": "A区大道",
      "x": 20.1,
      "y": 51.7,
      "type": "route"
    },
    {
      "name": "B区大道",
      "x": 70.4,
      "y": 60.4,
      "type": "route"
    },
    {
      "name": "B区市场",
      "x": 55.7,
      "y": 70.1,
      "type": "area"
    },
    {
      "name": "A区三箱",
      "x": 12,
      "y": 58,
      "type": "area"
    },
    {
      "name": "B区后方",
      "x": 59.4,
      "y": 83.6,
      "type": "area"
    },
    {
      "name": "船屋",
      "x": 88.4,
      "y": 72.5,
      "type": "route"
    },
    {
      "name": "B三箱",
      "x": 76.7,
      "y": 71.6,
      "type": "route"
    }
  ]
};
