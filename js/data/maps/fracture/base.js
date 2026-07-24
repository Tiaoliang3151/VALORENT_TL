// ==========================================
// 地图基础数据（非英雄）：fracture
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-24T20:30:23+08:00
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_FRACTURE__BASE = {
  "mapId": "fracture",
  "sites": [
    {
      "id": "A",
      "x": 12,
      "y": 52,
      "label": "A 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "B",
      "x": 88,
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
      "name": "左方重生点",
      "x": 8,
      "y": 52,
      "type": "spawn"
    },
    {
      "name": "右方重生点",
      "x": 92,
      "y": 52,
      "type": "spawn"
    },
    {
      "name": "守方重生点",
      "x": 50,
      "y": 50,
      "type": "spawn"
    },
    {
      "name": "A区部署区",
      "x": 12,
      "y": 52,
      "type": "site"
    },
    {
      "name": "B区部署区",
      "x": 88,
      "y": 52,
      "type": "site"
    },
    {
      "name": "A区大道",
      "x": 18,
      "y": 42,
      "type": "route"
    },
    {
      "name": "A区商场",
      "x": 32,
      "y": 52,
      "type": "area"
    },
    {
      "name": "A区绳索",
      "x": 25,
      "y": 58,
      "type": "route"
    },
    {
      "name": "B区大道",
      "x": 82,
      "y": 62,
      "type": "route"
    },
    {
      "name": "B区拱廊",
      "x": 75,
      "y": 48,
      "type": "route"
    },
    {
      "name": "B区绳索",
      "x": 72,
      "y": 58,
      "type": "route"
    },
    {
      "name": "中庭",
      "x": 50,
      "y": 52,
      "type": "area"
    }
  ],
  "attackSmokes": [
    {
      "id": "fracture_atk_a_main",
      "type": "ball",
      "name": "A大道烟",
      "site": "A",
      "x": 18,
      "y": 42,
      "radius": 7,
      "desc": "封锁 A 大道入口视野，掩护进攻方进入 A 点",
      "tags": ["进攻方"]
    },
    {
      "id": "fracture_atk_a_arcade",
      "type": "ball",
      "name": "A商场烟",
      "site": "A",
      "x": 32,
      "y": 52,
      "radius": 6,
      "desc": "封锁 A 商场区域，防止防守方侧翼架枪",
      "tags": ["进攻方"]
    },
    {
      "id": "fracture_atk_a_rope",
      "type": "ball",
      "name": "A绳索烟",
      "site": "A",
      "x": 25,
      "y": 58,
      "radius": 6,
      "desc": "封锁 A 绳索区域，掩护进攻方从侧翼进 A",
      "tags": ["进攻方"]
    },
    {
      "id": "fracture_atk_b_main",
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
      "id": "fracture_atk_b_arcade",
      "type": "ball",
      "name": "B拱廊烟",
      "site": "B",
      "x": 75,
      "y": 48,
      "radius": 6,
      "desc": "封锁 B 拱廊通道，防止防守方侧翼支援",
      "tags": ["进攻方"]
    },
    {
      "id": "fracture_atk_b_rope",
      "type": "ball",
      "name": "B绳索烟",
      "site": "B",
      "x": 72,
      "y": 58,
      "radius": 6,
      "desc": "封锁 B 绳索区域，掩护进攻方从侧翼进 B",
      "tags": ["进攻方"]
    }
  ],
  "defendSmokes": [
    {
      "id": "fracture_def_a_main",
      "type": "ball",
      "name": "A大道烟",
      "site": "A",
      "x": 18,
      "y": 42,
      "radius": 7,
      "desc": "封锁 A 大道入口，阻挡进攻方 A 大压",
      "tags": ["防守方"]
    },
    {
      "id": "fracture_def_a_arcade",
      "type": "ball",
      "name": "A商场烟",
      "site": "A",
      "x": 32,
      "y": 52,
      "radius": 6,
      "desc": "封锁 A 商场，保护 A 点侧翼",
      "tags": ["防守方"]
    },
    {
      "id": "fracture_def_a_rope",
      "type": "ball",
      "name": "A绳索烟",
      "site": "A",
      "x": 25,
      "y": 58,
      "radius": 6,
      "desc": "封锁 A 绳索区域，阻止进攻方绕后",
      "tags": ["防守方"]
    },
    {
      "id": "fracture_def_b_main",
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
      "id": "fracture_def_b_arcade",
      "type": "ball",
      "name": "B拱廊烟",
      "site": "B",
      "x": 75,
      "y": 48,
      "radius": 6,
      "desc": "封锁 B 拱廊，保护 B 点侧翼",
      "tags": ["防守方"]
    },
    {
      "id": "fracture_def_b_rope",
      "type": "ball",
      "name": "B绳索烟",
      "site": "B",
      "x": 72,
      "y": 58,
      "radius": 6,
      "desc": "封锁 B 绳索区域，阻止进攻方绕后",
      "tags": ["防守方"]
    }
  ]
};
