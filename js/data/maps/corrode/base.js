// ==========================================
// 地图基础数据（非英雄）：corrode
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-24T20:30:23+08:00
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_CORRODE__BASE = {
  "mapId": "corrode",
  "sites": [
    {
      "id": "A",
      "x": 18,
      "y": 52,
      "label": "A 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "B",
      "x": 82,
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
      "x": 18,
      "y": 52,
      "type": "site"
    },
    {
      "name": "B区部署区",
      "x": 82,
      "y": 52,
      "type": "site"
    },
    {
      "name": "A区大道",
      "x": 12,
      "y": 58,
      "type": "route"
    },
    {
      "name": "A区小道",
      "x": 28,
      "y": 48,
      "type": "route"
    },
    {
      "name": "B区大道",
      "x": 88,
      "y": 58,
      "type": "route"
    },
    {
      "name": "B区小道",
      "x": 72,
      "y": 48,
      "type": "route"
    },
    {
      "name": "中路",
      "x": 50,
      "y": 42,
      "type": "area"
    }
  ],
  "attackSmokes": [
    {
      "id": "corrode_atk_a_main",
      "type": "ball",
      "name": "A大道烟",
      "site": "A",
      "x": 12,
      "y": 58,
      "radius": 7,
      "desc": "封锁 A 大道入口视野，掩护进攻方进入 A 点",
      "tags": ["进攻方"]
    },
    {
      "id": "corrode_atk_a_short",
      "type": "ball",
      "name": "A小道烟",
      "site": "A",
      "x": 28,
      "y": 48,
      "radius": 6,
      "desc": "封锁 A 小道，防止侧翼架枪",
      "tags": ["进攻方"]
    },
    {
      "id": "corrode_atk_b_main",
      "type": "ball",
      "name": "B大道烟",
      "site": "B",
      "x": 88,
      "y": 58,
      "radius": 7,
      "desc": "封锁 B 大道入口视野，掩护进攻方进入 B 点",
      "tags": ["进攻方"]
    },
    {
      "id": "corrode_atk_b_short",
      "type": "ball",
      "name": "B小道烟",
      "site": "B",
      "x": 72,
      "y": 48,
      "radius": 6,
      "desc": "封锁 B 小道，防止侧翼架枪",
      "tags": ["进攻方"]
    },
    {
      "id": "corrode_atk_mid",
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
      "id": "corrode_def_a_main",
      "type": "ball",
      "name": "A大道烟",
      "site": "A",
      "x": 12,
      "y": 58,
      "radius": 7,
      "desc": "封锁 A 大道入口，阻挡进攻方 A 大压",
      "tags": ["防守方"]
    },
    {
      "id": "corrode_def_a_short",
      "type": "ball",
      "name": "A小道烟",
      "site": "A",
      "x": 28,
      "y": 48,
      "radius": 6,
      "desc": "封锁 A 小道，保护 A 点侧翼",
      "tags": ["防守方"]
    },
    {
      "id": "corrode_def_b_main",
      "type": "ball",
      "name": "B大道烟",
      "site": "B",
      "x": 88,
      "y": 58,
      "radius": 7,
      "desc": "封锁 B 大道入口，阻挡进攻方 B 大压",
      "tags": ["防守方"]
    },
    {
      "id": "corrode_def_b_short",
      "type": "ball",
      "name": "B小道烟",
      "site": "B",
      "x": 72,
      "y": 48,
      "radius": 6,
      "desc": "封锁 B 小道，保护 B 点侧翼",
      "tags": ["防守方"]
    },
    {
      "id": "corrode_def_mid",
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
