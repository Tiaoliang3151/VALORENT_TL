// ==========================================
// 地图基础数据（非英雄）：bind
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-24T20:30:23+08:00
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_BIND__BASE = {
  "mapId": "bind",
  "sites": [
    {
      "id": "A",
      "x": 28,
      "y": 68,
      "label": "A 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "B",
      "x": 72,
      "y": 55,
      "label": "B 部署区",
      "tags": [],
      "fontSize": 24
    }
  ],
  "siteFontSize": 11,
  "locationFontSize": 9,
  "wallbangs": [
    {
      "id": "bind_wb1",
      "name": "A门穿点",
      "x": 22,
      "y": 55,
      "desc": "A门外薄墙可穿透，打击A点角落防守方",
      "tags": []
    },
    {
      "id": "bind_wb2",
      "name": "B短穿墙",
      "x": 70,
      "y": 45,
      "desc": "B短通道墙壁可穿透，打击站点防守方",
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
      "x": 28,
      "y": 68,
      "type": "site"
    },
    {
      "name": "B区部署区",
      "x": 72,
      "y": 55,
      "type": "site"
    },
    {
      "name": "A区大道",
      "x": 22,
      "y": 55,
      "type": "route"
    },
    {
      "name": "A区钩道",
      "x": 20,
      "y": 42,
      "type": "route"
    },
    {
      "name": "B区短道",
      "x": 70,
      "y": 45,
      "type": "route"
    },
    {
      "name": "B区长道",
      "x": 85,
      "y": 52,
      "type": "route"
    },
    {
      "name": "A区传送门",
      "x": 18,
      "y": 42,
      "type": "room"
    },
    {
      "name": "B区传送门",
      "x": 88,
      "y": 55,
      "type": "room"
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
      "id": "bind_atk_a_main",
      "type": "ball",
      "name": "A大道烟",
      "site": "A",
      "x": 22,
      "y": 55,
      "radius": 7,
      "desc": "封锁 A 大道入口视野，掩护进攻方进入 A 点",
      "tags": ["进攻方"]
    },
    {
      "id": "bind_atk_a_hookah",
      "type": "ball",
      "name": "A钩道烟",
      "site": "A",
      "x": 20,
      "y": 42,
      "radius": 6,
      "desc": "封锁 A 钩道出口，隔离 A 点防守方",
      "tags": ["进攻方"]
    },
    {
      "id": "bind_atk_b_short",
      "type": "ball",
      "name": "B短道烟",
      "site": "B",
      "x": 70,
      "y": 45,
      "radius": 7,
      "desc": "分割 B 短道与 B 点，掩护进攻方进点",
      "tags": ["进攻方"]
    },
    {
      "id": "bind_atk_b_long",
      "type": "ball",
      "name": "B长道烟",
      "site": "B",
      "x": 85,
      "y": 52,
      "radius": 6,
      "desc": "封锁 B 长通道视野，阻止防守方远点架枪",
      "tags": ["进攻方"]
    },
    {
      "id": "bind_atk_mid",
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
      "id": "bind_def_a_main",
      "type": "ball",
      "name": "A大道烟",
      "site": "A",
      "x": 22,
      "y": 55,
      "radius": 7,
      "desc": "封锁 A 大道入口，阻挡进攻方 A 大压",
      "tags": ["防守方"]
    },
    {
      "id": "bind_def_a_hookah",
      "type": "ball",
      "name": "A钩道烟",
      "site": "A",
      "x": 20,
      "y": 42,
      "radius": 6,
      "desc": "封锁 A 钩道，阻止进攻方从钩道转 A",
      "tags": ["防守方"]
    },
    {
      "id": "bind_def_b_short",
      "type": "ball",
      "name": "B短道烟",
      "site": "B",
      "x": 70,
      "y": 45,
      "radius": 7,
      "desc": "封锁 B 短道，保护 B 点侧翼",
      "tags": ["防守方"]
    },
    {
      "id": "bind_def_b_long",
      "type": "ball",
      "name": "B长道烟",
      "site": "B",
      "x": 85,
      "y": 52,
      "radius": 6,
      "desc": "封锁 B 长通道，阻挡进攻方 B 大压",
      "tags": ["防守方"]
    },
    {
      "id": "bind_def_mid",
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
