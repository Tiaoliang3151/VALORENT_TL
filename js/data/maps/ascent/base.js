// ==========================================
// 地图基础数据（非英雄）：ascent
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-24T20:30:23+08:00
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_ASCENT__BASE = {
  "mapId": "ascent",
  "sites": [
    {
      "id": "A",
      "x": 15,
      "y": 62,
      "label": "A 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "B",
      "x": 85,
      "y": 52,
      "label": "B 部署区",
      "tags": [],
      "fontSize": 24
    }
  ],
  "siteFontSize": 11,
  "locationFontSize": 9,
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
      "x": 50,
      "y": 10,
      "type": "spawn"
    },
    {
      "name": "攻方重生点",
      "x": 50,
      "y": 90,
      "type": "spawn"
    },
    {
      "name": "A区部署区",
      "x": 15,
      "y": 62,
      "type": "site"
    },
    {
      "name": "B区部署区",
      "x": 85,
      "y": 52,
      "type": "site"
    },
    {
      "name": "A区大道",
      "x": 12,
      "y": 48,
      "type": "route"
    },
    {
      "name": "A区天堂",
      "x": 15,
      "y": 42,
      "type": "room"
    },
    {
      "name": "A区连接",
      "x": 32,
      "y": 55,
      "type": "route"
    },
    {
      "name": "B区大道",
      "x": 88,
      "y": 62,
      "type": "route"
    },
    {
      "name": "B区市场",
      "x": 72,
      "y": 58,
      "type": "area"
    },
    {
      "name": "B区窗口",
      "x": 85,
      "y": 45,
      "type": "route"
    },
    {
      "name": "中路",
      "x": 50,
      "y": 42,
      "type": "area"
    },
    {
      "name": "中路市场",
      "x": 50,
      "y": 52,
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
      "x": 90,
      "y": 52,
      "type": "area"
    }
  ],
  "attackSmokes": [
    {
      "id": "ascent_atk_a_main",
      "type": "ball",
      "name": "A大道烟",
      "site": "A",
      "x": 18,
      "y": 55,
      "radius": 7,
      "desc": "封锁 A 大道入口视野，掩护进攻方进入 A 点",
      "tags": ["进攻方"]
    },
    {
      "id": "ascent_atk_a_heaven",
      "type": "ball",
      "name": "A天堂烟",
      "site": "A",
      "x": 15,
      "y": 42,
      "radius": 6,
      "desc": "封锁 A 天堂高台，防止防守方从高处架枪",
      "tags": ["进攻方"]
    },
    {
      "id": "ascent_atk_a_link",
      "type": "ball",
      "name": "A连接烟",
      "site": "A",
      "x": 32,
      "y": 55,
      "radius": 6,
      "desc": "封锁 A 连接，防止中路防守方支援 A 点",
      "tags": ["进攻方"]
    },
    {
      "id": "ascent_atk_a_main_line",
      "type": "line",
      "name": "A大道线烟",
      "site": "A",
      "x": 16,
      "y": 52,
      "length": 14,
      "angle": 90,
      "desc": "纵向封锁 A 大道，分割 A 点与 A 长",
      "tags": ["进攻方"]
    },
    {
      "id": "ascent_atk_b_main",
      "type": "ball",
      "name": "B大道烟",
      "site": "B",
      "x": 80,
      "y": 62,
      "radius": 7,
      "desc": "封锁 B 大道入口视野，掩护进攻方进入 B 点",
      "tags": ["进攻方"]
    },
    {
      "id": "ascent_atk_b_market",
      "type": "ball",
      "name": "B市场烟",
      "site": "B",
      "x": 72,
      "y": 58,
      "radius": 6,
      "desc": "封锁 B 市场区域，防止防守方侧翼架枪",
      "tags": ["进攻方"]
    },
    {
      "id": "ascent_atk_b_window",
      "type": "ball",
      "name": "B窗口烟",
      "site": "B",
      "x": 85,
      "y": 45,
      "radius": 6,
      "desc": "封锁 B 窗口高台视野，防止防守方从高处压制",
      "tags": ["进攻方"]
    },
    {
      "id": "ascent_atk_b_main_line",
      "type": "line",
      "name": "B大道线烟",
      "site": "B",
      "x": 82,
      "y": 58,
      "length": 14,
      "angle": 90,
      "desc": "纵向封锁 B 大道，分割 B 点与 B 长",
      "tags": ["进攻方"]
    },
    {
      "id": "ascent_atk_mid",
      "type": "ball",
      "name": "中路烟",
      "site": "A",
      "x": 50,
      "y": 42,
      "radius": 6,
      "desc": "封锁中路视野，争夺中路控制权",
      "tags": ["进攻方"]
    }
  ],
  "defendSmokes": [
    {
      "id": "ascent_def_a_main",
      "type": "ball",
      "name": "A大道烟",
      "site": "A",
      "x": 18,
      "y": 55,
      "radius": 7,
      "desc": "封锁 A 大道入口，阻挡进攻方 A 大压",
      "tags": ["防守方"]
    },
    {
      "id": "ascent_def_a_heaven",
      "type": "ball",
      "name": "A天堂烟",
      "site": "A",
      "x": 15,
      "y": 42,
      "radius": 6,
      "desc": "封锁 A 天堂高台，保护 A 点上方",
      "tags": ["防守方"]
    },
    {
      "id": "ascent_def_a_link",
      "type": "ball",
      "name": "A连接烟",
      "site": "A",
      "x": 32,
      "y": 55,
      "radius": 6,
      "desc": "封锁 A 连接，防止进攻方从中路转 A",
      "tags": ["防守方"]
    },
    {
      "id": "ascent_def_b_main",
      "type": "ball",
      "name": "B大道烟",
      "site": "B",
      "x": 80,
      "y": 62,
      "radius": 7,
      "desc": "封锁 B 大道入口，阻挡进攻方 B 大压",
      "tags": ["防守方"]
    },
    {
      "id": "ascent_def_b_market",
      "type": "ball",
      "name": "B市场烟",
      "site": "B",
      "x": 72,
      "y": 58,
      "radius": 6,
      "desc": "封锁 B 市场，保护 B 点侧翼",
      "tags": ["防守方"]
    },
    {
      "id": "ascent_def_b_window",
      "type": "ball",
      "name": "B窗口烟",
      "site": "B",
      "x": 85,
      "y": 45,
      "radius": 6,
      "desc": "封锁 B 窗口高台，保护 B 点上方",
      "tags": ["防守方"]
    },
    {
      "id": "ascent_def_mid",
      "type": "ball",
      "name": "中路烟",
      "site": "A",
      "x": 50,
      "y": 42,
      "radius": 6,
      "desc": "封锁中路视野，阻止进攻方中路前压",
      "tags": ["防守方"]
    }
  ]
};
