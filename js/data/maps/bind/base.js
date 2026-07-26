// ==========================================
// 地图基础数据（非英雄）：源工重镇 (bind)
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-25T23:22:54.363Z
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_BIND__BASE = {
  "mapId": "bind",
  "sites": [
    {
      "id": "A",
      "x": 28.4,
      "y": 69,
      "label": "A 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "B",
      "x": 72.3,
      "y": 72.3,
      "label": "B 部署区",
      "tags": [],
      "fontSize": 24
    }
  ],
  "siteFontSize": 11,
  "locationFontSize": 9,
  "attackSmokes": [
    {
      "id": "bind_atk_a_main",
      "type": "ball",
      "name": "A二楼烟",
      "site": "A",
      "x": 22.9,
      "y": 74.6,
      "radius": 7,
      "desc": "封锁 A 大道入口视野，掩护进攻方进入 A 点",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "bind_atk_a_hookah",
      "type": "ball",
      "name": "浴室隔断烟",
      "site": "A",
      "x": 25.8,
      "y": 63.2,
      "radius": 6,
      "desc": "封锁 A 钩道出口，隔离 A 点防守方",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "bind_atk_b_short",
      "type": "ball",
      "name": "警家烟",
      "site": "B",
      "x": 66,
      "y": 80.3,
      "radius": 7,
      "desc": "分割 B 短道与 B 点，掩护进攻方进点",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "bind_atk_b_long",
      "type": "ball",
      "name": "管道烟",
      "site": "B",
      "x": 81.6,
      "y": 67.6,
      "radius": 6,
      "desc": "封锁 B 长通道视野，阻止防守方远点架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "bind_atk_mid",
      "type": "ball",
      "name": "箱上烟",
      "site": "A",
      "x": 33.6,
      "y": 66.6,
      "radius": 6,
      "desc": "封锁中路视野，争夺中路控制权",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "edit_1785021471089",
      "x": 27.7,
      "y": 68.4,
      "type": "ball",
      "name": "A包点隔断",
      "desc": "",
      "site": "",
      "tags": [
        "进攻方"
      ]
    }
  ],
  "defendSmokes": [
    {
      "id": "bind_def_a_main",
      "type": "ball",
      "name": "A单向烟",
      "site": "A",
      "x": 36.5,
      "y": 56,
      "radius": 7,
      "desc": "封锁 A 大道入口，阻挡进攻方 A 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "bind_def_a_hookah",
      "type": "ball",
      "name": "浴室烟",
      "site": "A",
      "x": 23.4,
      "y": 56.9,
      "radius": 6,
      "desc": "封锁 A 钩道，阻止进攻方从钩道转 A",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "bind_def_b_short",
      "type": "ball",
      "name": "B二楼烟",
      "site": "B",
      "x": 68.4,
      "y": 61,
      "radius": 7,
      "desc": "封锁 B 短道，保护 B 点侧翼",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "bind_def_b_long",
      "type": "ball",
      "name": "B前压烟",
      "site": "B",
      "x": 80.9,
      "y": 43.7,
      "radius": 6,
      "desc": "封锁 B 长通道，阻挡进攻方 B 大压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "bind_def_mid",
      "type": "ball",
      "name": "B前压烟",
      "site": "A",
      "x": 60.4,
      "y": 40.6,
      "radius": 6,
      "desc": "封锁中路视野，阻止进攻方中路前压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785021632702",
      "x": 37.5,
      "y": 48.9,
      "type": "ball",
      "name": "A前点烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "edit_1785021743543",
      "x": 75.6,
      "y": 58.3,
      "type": "ball",
      "name": "花园烟",
      "desc": "",
      "site": "",
      "tags": [
        "防守方"
      ]
    }
  ],
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
      "x": 71,
      "y": 67.9,
      "type": "site"
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
  ]
};
