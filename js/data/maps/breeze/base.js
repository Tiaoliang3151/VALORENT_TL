// ==========================================
// 地图基础数据（非英雄）：breeze
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-24T20:30:23+08:00
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_BREEZE__BASE = {
  "mapId": "breeze",
  "sites": [
    {
      "id": "A",
      "x": 12,
      "y": 55,
      "label": "A 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "B",
      "x": 88,
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
      "id": "breeze_wb1",
      "name": "A Cave穿点",
      "x": 8,
      "y": 42,
      "desc": "A Cave 墙壁可穿透，打击 Cave 内防守方",
      "tags": []
    },
    {
      "id": "breeze_wb2",
      "name": "B Elbow穿点",
      "x": 78,
      "y": 70,
      "desc": "B Elbow 区域可穿透，打击拐角防守方",
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
      "y": 55,
      "type": "site"
    },
    {
      "name": "B区部署区",
      "x": 88,
      "y": 55,
      "type": "site"
    },
    {
      "name": "A区Cave",
      "x": 8,
      "y": 42,
      "type": "route"
    },
    {
      "name": "A区商店",
      "x": 22,
      "y": 52,
      "type": "area"
    },
    {
      "name": "A区大桥",
      "x": 15,
      "y": 62,
      "type": "route"
    },
    {
      "name": "B区Main",
      "x": 82,
      "y": 62,
      "type": "route"
    },
    {
      "name": "B区Elbow",
      "x": 78,
      "y": 70,
      "type": "route"
    },
    {
      "name": "B区大桥",
      "x": 85,
      "y": 48,
      "type": "route"
    },
    {
      "name": "中路",
      "x": 50,
      "y": 50,
      "type": "area"
    }
  ],
  "attackSmokes": [
    {
      "id": "breeze_atk_a_cave",
      "type": "ball",
      "name": "A Cave烟",
      "site": "A",
      "x": 8,
      "y": 42,
      "radius": 7,
      "desc": "封锁 A Cave 出口视野，掩护进攻方进 A",
      "tags": ["进攻方"]
    },
    {
      "id": "breeze_atk_a_shop",
      "type": "ball",
      "name": "A Shop烟",
      "site": "A",
      "x": 22,
      "y": 52,
      "radius": 6,
      "desc": "封锁 A Shop 区域，防止侧翼架枪",
      "tags": ["进攻方"]
    },
    {
      "id": "breeze_atk_b_main",
      "type": "ball",
      "name": "B Main烟",
      "site": "B",
      "x": 82,
      "y": 62,
      "radius": 7,
      "desc": "封锁 B Main 入口视野，掩护进攻方进 B",
      "tags": ["进攻方"]
    },
    {
      "id": "breeze_atk_b_elbow",
      "type": "ball",
      "name": "B Elbow烟",
      "site": "B",
      "x": 78,
      "y": 70,
      "radius": 6,
      "desc": "封锁 B Elbow 拐角，防止防守方近点架枪",
      "tags": ["进攻方"]
    },
    {
      "id": "breeze_atk_mid",
      "type": "ball",
      "name": "中路烟",
      "site": "A",
      "x": 50,
      "y": 50,
      "radius": 8,
      "desc": "封锁中路超长走廊视野，防止被狙击",
      "tags": ["进攻方"]
    }
  ],
  "defendSmokes": [
    {
      "id": "breeze_def_a_cave",
      "type": "ball",
      "name": "A Cave烟",
      "site": "A",
      "x": 8,
      "y": 42,
      "radius": 7,
      "desc": "封锁 A Cave 出口，阻挡进攻方从 Cave 出",
      "tags": ["防守方"]
    },
    {
      "id": "breeze_def_a_shop",
      "type": "ball",
      "name": "A Shop烟",
      "site": "A",
      "x": 22,
      "y": 52,
      "radius": 6,
      "desc": "封锁 A Shop 区域，保护 A 点侧翼",
      "tags": ["防守方"]
    },
    {
      "id": "breeze_def_b_main",
      "type": "ball",
      "name": "B Main烟",
      "site": "B",
      "x": 82,
      "y": 62,
      "radius": 7,
      "desc": "封锁 B Main 入口，阻挡进攻方 B 大压",
      "tags": ["防守方"]
    },
    {
      "id": "breeze_def_b_elbow",
      "type": "ball",
      "name": "B Elbow烟",
      "site": "B",
      "x": 78,
      "y": 70,
      "radius": 6,
      "desc": "封锁 B Elbow 拐角，保护 B 点近点",
      "tags": ["防守方"]
    },
    {
      "id": "breeze_def_mid",
      "type": "ball",
      "name": "中路烟",
      "site": "A",
      "x": 50,
      "y": 50,
      "radius": 8,
      "desc": "封锁中路走廊，阻止进攻方中路前压",
      "tags": ["防守方"]
    }
  ]
};
