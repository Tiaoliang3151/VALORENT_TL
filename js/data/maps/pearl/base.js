// ==========================================
// 地图基础数据（非英雄）：pearl
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-24T20:30:23+08:00
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_PEARL__BASE = {
  "mapId": "pearl",
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
      "x": 18,
      "y": 48,
      "type": "route"
    },
    {
      "name": "A区Art",
      "x": 22,
      "y": 55,
      "type": "area"
    },
    {
      "name": "B区大道",
      "x": 82,
      "y": 62,
      "type": "route"
    },
    {
      "name": "B区塔楼",
      "x": 88,
      "y": 42,
      "type": "room"
    },
    {
      "name": "B区Art",
      "x": 78,
      "y": 48,
      "type": "area"
    },
    {
      "name": "中路连接",
      "x": 50,
      "y": 48,
      "type": "route"
    },
    {
      "name": "中厅",
      "x": 50,
      "y": 58,
      "type": "area"
    }
  ],
  "attackSmokes": [
    {
      "id": "pearl_atk_a_main",
      "type": "ball",
      "name": "A大道烟",
      "site": "A",
      "x": 18,
      "y": 48,
      "radius": 7,
      "desc": "封锁 A 大道入口视野，掩护进攻方进入 A 点",
      "tags": ["进攻方"]
    },
    {
      "id": "pearl_atk_a_art",
      "type": "ball",
      "name": "A Art烟",
      "site": "A",
      "x": 22,
      "y": 55,
      "radius": 6,
      "desc": "封锁 A Art 区域，防止侧翼架枪",
      "tags": ["进攻方"]
    },
    {
      "id": "pearl_atk_b_main",
      "type": "ball",
      "name": "B大道烟",
      "site": "B",
      "x": 82,
      "y": 62,
      "radius": 7,
      "desc": "封锁 B 大道入口视野，掩护进攻方进入 B 点",
      "tags": ["进攻方"]
    },
    {
      "id": "pearl_atk_b_tower",
      "type": "ball",
      "name": "B塔楼烟",
      "site": "B",
      "x": 88,
      "y": 42,
      "radius": 6,
      "desc": "封锁 B 塔楼高台，防止防守方从上方压制",
      "tags": ["进攻方"]
    },
    {
      "id": "pearl_atk_b_art",
      "type": "ball",
      "name": "B Art烟",
      "site": "B",
      "x": 78,
      "y": 48,
      "radius": 6,
      "desc": "封锁 B Art 区域，防止侧翼架枪",
      "tags": ["进攻方"]
    },
    {
      "id": "pearl_atk_mid",
      "type": "ball",
      "name": "中路连接烟",
      "site": "A",
      "x": 50,
      "y": 48,
      "radius": 6,
      "desc": "封锁中路连接，防止防守方中路转点",
      "tags": ["进攻方"]
    }
  ],
  "defendSmokes": [
    {
      "id": "pearl_def_a_main",
      "type": "ball",
      "name": "A大道烟",
      "site": "A",
      "x": 18,
      "y": 48,
      "radius": 7,
      "desc": "封锁 A 大道入口，阻挡进攻方 A 大压",
      "tags": ["防守方"]
    },
    {
      "id": "pearl_def_a_art",
      "type": "ball",
      "name": "A Art烟",
      "site": "A",
      "x": 22,
      "y": 55,
      "radius": 6,
      "desc": "封锁 A Art 区域，保护 A 点侧翼",
      "tags": ["防守方"]
    },
    {
      "id": "pearl_def_b_main",
      "type": "ball",
      "name": "B大道烟",
      "site": "B",
      "x": 82,
      "y": 62,
      "radius": 7,
      "desc": "封锁 B 大道入口，阻挡进攻方 B 大压",
      "tags": ["防守方"]
    },
    {
      "id": "pearl_def_b_tower",
      "type": "ball",
      "name": "B塔楼烟",
      "site": "B",
      "x": 88,
      "y": 42,
      "radius": 6,
      "desc": "封锁 B 塔楼高台，保护 B 点上方",
      "tags": ["防守方"]
    },
    {
      "id": "pearl_def_b_art",
      "type": "ball",
      "name": "B Art烟",
      "site": "B",
      "x": 78,
      "y": 48,
      "radius": 6,
      "desc": "封锁 B Art 区域，保护 B 点侧翼",
      "tags": ["防守方"]
    },
    {
      "id": "pearl_def_mid",
      "type": "ball",
      "name": "中路连接烟",
      "site": "A",
      "x": 50,
      "y": 48,
      "radius": 6,
      "desc": "封锁中路连接，阻止进攻方中路转点",
      "tags": ["防守方"]
    }
  ]
};
