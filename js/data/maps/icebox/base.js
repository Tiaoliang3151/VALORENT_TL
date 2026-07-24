// ==========================================
// 地图基础数据（非英雄）：icebox
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-24T20:30:23+08:00
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_ICEBOX__BASE = {
  "mapId": "icebox",
  "sites": [
    {
      "id": "A",
      "x": 18,
      "y": 55,
      "label": "A 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "B",
      "x": 82,
      "y": 48,
      "label": "B 部署区",
      "tags": [],
      "fontSize": 24
    }
  ],
  "siteFontSize": 11,
  "locationFontSize": 9,
  "wallbangs": [
    {
      "id": "icebox_wb1",
      "name": "A Belt穿点",
      "x": 12,
      "y": 48,
      "desc": "A Belt 区域可穿透，打击 A 点入口防守方",
      "tags": []
    },
    {
      "id": "icebox_wb2",
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
      "y": 55,
      "type": "site"
    },
    {
      "name": "B区部署区",
      "x": 82,
      "y": 48,
      "type": "site"
    },
    {
      "name": "A区大道",
      "x": 12,
      "y": 48,
      "type": "route"
    },
    {
      "name": "A区高台",
      "x": 22,
      "y": 42,
      "type": "room"
    },
    {
      "name": "A区传送带",
      "x": 15,
      "y": 62,
      "type": "route"
    },
    {
      "name": "B区大道",
      "x": 88,
      "y": 55,
      "type": "route"
    },
    {
      "name": "B区高台",
      "x": 82,
      "y": 38,
      "type": "room"
    },
    {
      "name": "B区传送带",
      "x": 85,
      "y": 62,
      "type": "route"
    },
    {
      "name": "中路",
      "x": 50,
      "y": 48,
      "type": "area"
    },
    {
      "name": "A区绳梯",
      "x": 25,
      "y": 52,
      "type": "route"
    },
    {
      "name": "B区绳梯",
      "x": 75,
      "y": 52,
      "type": "route"
    }
  ],
  "attackSmokes": [
    {
      "id": "icebox_atk_a_main",
      "type": "ball",
      "name": "A大道烟",
      "site": "A",
      "x": 12,
      "y": 48,
      "radius": 7,
      "desc": "封锁 A 大道入口视野，掩护进攻方进入 A 点",
      "tags": ["进攻方"]
    },
    {
      "id": "icebox_atk_a_high",
      "type": "ball",
      "name": "A高台烟",
      "site": "A",
      "x": 22,
      "y": 42,
      "radius": 6,
      "desc": "封锁 A 高台，防止防守方从上方压制",
      "tags": ["进攻方"]
    },
    {
      "id": "icebox_atk_a_belt",
      "type": "ball",
      "name": "A传送带烟",
      "site": "A",
      "x": 15,
      "y": 62,
      "radius": 6,
      "desc": "封锁 A 传送带区域，掩护侧翼进攻",
      "tags": ["进攻方"]
    },
    {
      "id": "icebox_atk_b_main",
      "type": "ball",
      "name": "B大道烟",
      "site": "B",
      "x": 88,
      "y": 55,
      "radius": 7,
      "desc": "封锁 B 大道入口视野，掩护进攻方进入 B 点",
      "tags": ["进攻方"]
    },
    {
      "id": "icebox_atk_b_high",
      "type": "ball",
      "name": "B高台烟",
      "site": "B",
      "x": 82,
      "y": 38,
      "radius": 6,
      "desc": "封锁 B 高台，防止防守方从上方压制",
      "tags": ["进攻方"]
    },
    {
      "id": "icebox_atk_b_belt",
      "type": "ball",
      "name": "B传送带烟",
      "site": "B",
      "x": 85,
      "y": 62,
      "radius": 6,
      "desc": "封锁 B 传送带区域，掩护侧翼进攻",
      "tags": ["进攻方"]
    },
    {
      "id": "icebox_atk_mid",
      "type": "ball",
      "name": "中路烟",
      "site": "A",
      "x": 50,
      "y": 48,
      "radius": 6,
      "desc": "封锁中路视野，争夺中路控制权",
      "tags": ["进攻方"]
    }
  ],
  "defendSmokes": [
    {
      "id": "icebox_def_a_main",
      "type": "ball",
      "name": "A大道烟",
      "site": "A",
      "x": 12,
      "y": 48,
      "radius": 7,
      "desc": "封锁 A 大道入口，阻挡进攻方 A 大压",
      "tags": ["防守方"]
    },
    {
      "id": "icebox_def_a_high",
      "type": "ball",
      "name": "A高台烟",
      "site": "A",
      "x": 22,
      "y": 42,
      "radius": 6,
      "desc": "封锁 A 高台，保护 A 点上方",
      "tags": ["防守方"]
    },
    {
      "id": "icebox_def_a_belt",
      "type": "ball",
      "name": "A传送带烟",
      "site": "A",
      "x": 15,
      "y": 62,
      "radius": 6,
      "desc": "封锁 A 传送带，保护 A 点侧翼",
      "tags": ["防守方"]
    },
    {
      "id": "icebox_def_b_main",
      "type": "ball",
      "name": "B大道烟",
      "site": "B",
      "x": 88,
      "y": 55,
      "radius": 7,
      "desc": "封锁 B 大道入口，阻挡进攻方 B 大压",
      "tags": ["防守方"]
    },
    {
      "id": "icebox_def_b_high",
      "type": "ball",
      "name": "B高台烟",
      "site": "B",
      "x": 82,
      "y": 38,
      "radius": 6,
      "desc": "封锁 B 高台，保护 B 点上方",
      "tags": ["防守方"]
    },
    {
      "id": "icebox_def_b_belt",
      "type": "ball",
      "name": "B传送带烟",
      "site": "B",
      "x": 85,
      "y": 62,
      "radius": 6,
      "desc": "封锁 B 传送带，保护 B 点侧翼",
      "tags": ["防守方"]
    },
    {
      "id": "icebox_def_mid",
      "type": "ball",
      "name": "中路烟",
      "site": "A",
      "x": 50,
      "y": 48,
      "radius": 6,
      "desc": "封锁中路视野，阻止进攻方中路前压",
      "tags": ["防守方"]
    }
  ]
};
