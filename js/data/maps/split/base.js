// ==========================================
// 地图基础数据（非英雄）：split
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-24T20:30:23+08:00
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_SPLIT__BASE = {
  "mapId": "split",
  "sites": [
    {
      "id": "A",
      "x": 12,
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
      "x": 12,
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
      "x": 18,
      "y": 38,
      "type": "room"
    },
    {
      "name": "A区绳梯",
      "x": 25,
      "y": 48,
      "type": "route"
    },
    {
      "name": "B区大道",
      "x": 88,
      "y": 62,
      "type": "route"
    },
    {
      "name": "B区Rafter",
      "x": 82,
      "y": 42,
      "type": "room"
    },
    {
      "name": "B区绳梯",
      "x": 75,
      "y": 52,
      "type": "route"
    },
    {
      "name": "中路",
      "x": 50,
      "y": 48,
      "type": "area"
    },
    {
      "name": "中路上层",
      "x": 50,
      "y": 38,
      "type": "room"
    }
  ],
  "attackSmokes": [
    {
      "id": "split_atk_a_main",
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
      "id": "split_atk_a_heaven",
      "type": "ball",
      "name": "A天堂烟",
      "site": "A",
      "x": 18,
      "y": 38,
      "radius": 6,
      "desc": "封锁 A 天堂高台，防止防守方从上方压制",
      "tags": ["进攻方"]
    },
    {
      "id": "split_atk_b_main",
      "type": "ball",
      "name": "B大道烟",
      "site": "B",
      "x": 88,
      "y": 62,
      "radius": 7,
      "desc": "封锁 B 大道入口视野，掩护进攻方进入 B 点",
      "tags": ["进攻方"]
    },
    {
      "id": "split_atk_b_rafter",
      "type": "ball",
      "name": "B Rafter烟",
      "site": "B",
      "x": 82,
      "y": 42,
      "radius": 6,
      "desc": "封锁 B Rafter 高台，防止防守方从上方架枪",
      "tags": ["进攻方"]
    },
    {
      "id": "split_atk_mid",
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
      "id": "split_def_a_main",
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
      "id": "split_def_a_heaven",
      "type": "ball",
      "name": "A天堂烟",
      "site": "A",
      "x": 18,
      "y": 38,
      "radius": 6,
      "desc": "封锁 A 天堂高台，保护 A 点上方",
      "tags": ["防守方"]
    },
    {
      "id": "split_def_b_main",
      "type": "ball",
      "name": "B大道烟",
      "site": "B",
      "x": 88,
      "y": 62,
      "radius": 7,
      "desc": "封锁 B 大道入口，阻挡进攻方 B 大压",
      "tags": ["防守方"]
    },
    {
      "id": "split_def_b_rafter",
      "type": "ball",
      "name": "B Rafter烟",
      "site": "B",
      "x": 82,
      "y": 42,
      "radius": 6,
      "desc": "封锁 B Rafter 高台，保护 B 点上方",
      "tags": ["防守方"]
    },
    {
      "id": "split_def_mid",
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
