// ==========================================
// 地图基础数据（非英雄）：隐世修所 (haven)
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：2026-07-24T11:21:10.968Z
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_HAVEN__BASE = {
  "mapId": "haven",
  "sites": [
    {
      "id": "A",
      "x": 11.1,
      "y": 61.3,
      "label": "A 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "B",
      "x": 49.9,
      "y": 58,
      "label": "B 部署区",
      "tags": [],
      "fontSize": 24
    },
    {
      "id": "C",
      "x": 85,
      "y": 61,
      "label": "C 部署区",
      "tags": [],
      "fontSize": 24
    }
  ],
  "siteFontSize": 11,
  "locationFontSize": 9,
  "attackSmokes": [
    {
      "id": "haven_atk_a_2f",
      "type": "ball",
      "name": "A二楼烟",
      "site": "A",
      "x": 13.2,
      "y": 69.8,
      "radius": 6,
      "desc": "封锁 A 二楼/三楼视野，防止被高处架枪",
      "tags": []
    },
    {
      "id": "haven_atk_a_ct",
      "type": "ball",
      "name": "A警家烟",
      "site": "A",
      "x": 22.3,
      "y": 70.4,
      "radius": 6,
      "desc": "封锁 A 警家回防路线，掩护进攻方进 A",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "haven_atk_ab_link",
      "type": "ball",
      "name": "AB连烟（A小道）",
      "site": "A",
      "x": 39.5,
      "y": 60.6,
      "radius": 6,
      "desc": "连接 A/B 区间，阻断敌方交叉支援",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "haven_atk_bc_link",
      "type": "ball",
      "name": "BC连烟（B后房/窗口）",
      "site": "B",
      "x": 60.3,
      "y": 63.6,
      "radius": 6,
      "desc": "连接 B/C 区间，阻断敌方从中区支援 B",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "haven_atk_c_ct",
      "type": "ball",
      "name": "C警家烟（C小道）",
      "site": "C",
      "x": 74.4,
      "y": 70.9,
      "radius": 6,
      "desc": "封锁 C 警家视野，掩护进 C",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "haven_atk_gar_win",
      "type": "ball",
      "name": "车库窗口烟",
      "site": "B",
      "x": 63,
      "y": 59,
      "radius": 5,
      "desc": "封锁 C 车库窗口口，防止被 C 车库口架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "haven_atk_garage",
      "type": "ball",
      "name": "车库烟（车库入口）",
      "site": "B",
      "x": 71.9,
      "y": 53.1,
      "radius": 6,
      "desc": "封锁 C 车库入口，掩护队友从中庭推进",
      "tags": [
        "进攻方"
      ]
    }
  ],
  "defendSmokes": [
    {
      "id": "haven_def_a_long",
      "type": "ball",
      "name": "A大烟（封锁A长）",
      "site": "A",
      "x": 13.7,
      "y": 51.4,
      "radius": 7,
      "desc": "封锁 A 区长道入口，阻挡进攻方 A 长压",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "haven_def_a_plant",
      "type": "ball",
      "name": "A下水道烟",
      "site": "A",
      "x": 25.8,
      "y": 52.1,
      "radius": 6,
      "desc": "封锁 A 区下水道，保护包点",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "haven_def_win",
      "type": "ball",
      "name": "窗口烟（中区窗口）",
      "site": "B",
      "x": 50.4,
      "y": 32.6,
      "radius": 5,
      "desc": "封锁中区窗口高台视野，防止进攻方窗口架枪 B 大",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "haven_def_b_mid",
      "type": "ball",
      "name": "B大烟（中庭封B入口）",
      "site": "B",
      "x": 50.6,
      "y": 49.9,
      "radius": 7,
      "desc": "封锁中区直看 B 大的入口，保护 B 点",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "haven_def_c_gar",
      "type": "ball",
      "name": "车库烟（封C车库）",
      "site": "C",
      "x": 63.3,
      "y": 42.7,
      "radius": 6,
      "desc": "封锁 C 车库入口，阻挡进攻方从车库进 C",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "haven_def_c_long",
      "type": "ball",
      "name": "C大烟（封锁C长）",
      "site": "C",
      "x": 84.2,
      "y": 46.4,
      "radius": 7,
      "desc": "封锁 C 区长道远端，阻挡进攻方从 C 大长驱直入",
      "tags": [
        "防守方"
      ]
    },
    {
      "id": "haven_def_c_plant",
      "type": "ball",
      "name": "C包隔断烟",
      "site": "C",
      "x": 85,
      "y": 59.3,
      "radius": 6,
      "desc": "封锁 C 区部署区，保护包点",
      "tags": [
        "防守方"
      ]
    }
  ],
  "wallbangs": [
    {
      "id": "haven_wb1",
      "name": "A Long穿点",
      "x": 64.6,
      "y": 4.9,
      "desc": "A Long薄墙可穿透，打击A Garden的防守方",
      "tags": []
    },
    {
      "id": "haven_wb2",
      "name": "C Long穿点",
      "x": 64.6,
      "y": 94.8,
      "desc": "C Long墙壁可穿透，打击C Cubby蹲守的防守方",
      "tags": []
    },
    {
      "id": "haven_wb3",
      "name": "Garage门穿点",
      "x": 28.9,
      "y": 49.9,
      "desc": "车库门HP为400，破坏后可穿透打击门后敌人",
      "tags": []
    },
    {
      "id": "haven_wb4",
      "name": "B Window穿点",
      "x": 62.2,
      "y": 43.4,
      "desc": "B Window木窗可穿透，打击中路架枪的防守方",
      "tags": []
    }
  ],
  "plantSpots": [
    {
      "id": "haven_pl1",
      "plantType": "safe",
      "name": "A安全包",
      "site": "A",
      "x": 67,
      "y": 13.5,
      "desc": "A点箱子后方安全下包，防守方难以从远处拆包",
      "advantage": "被A Heaven和A Long同时保护，拆包需近身",
      "risk": "防守方从Garden回防时可投掷技能逼退",
      "postPlant": "A Heaven高台架枪，覆盖包点",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "haven_pl2",
      "plantType": "open",
      "name": "A开放包",
      "site": "A",
      "x": 62.2,
      "y": 17.8,
      "desc": "A点中央开放区域下包，适合快速下包战术",
      "advantage": "下包速度快，防守方来不及回防",
      "risk": "拆包时可从多个角度覆盖，需强力守包",
      "postPlant": "A Long入口架枪 + Heaven覆盖",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "haven_pl3",
      "plantType": "special",
      "name": "A Garden特殊包",
      "site": "A",
      "x": 69.4,
      "y": 24.2,
      "desc": "靠近Garden的隐蔽下包点，出其不意",
      "advantage": "防守方容易忽略此位置",
      "risk": "Garden回防路线近，下包时易被发现",
      "postPlant": "封A Garden烟后架枪守包",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "haven_pl4",
      "plantType": "safe",
      "name": "B安全包",
      "site": "B",
      "x": 55.1,
      "y": 47.7,
      "desc": "B点箱体后方安全下包，中路可覆盖",
      "advantage": "被中庭和箱体保护，拆包困难",
      "risk": "防守方可从B窗口高台投掷技能",
      "postPlant": "中庭架枪 + B窗口覆盖",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "haven_pl5",
      "plantType": "open",
      "name": "B开放包",
      "site": "B",
      "x": 50.3,
      "y": 52,
      "desc": "B点中央开放下包，适合配合烟雾快速占点",
      "advantage": "配合烟雾可快速安全下包",
      "risk": "烟雾散后暴露在多个角度",
      "postPlant": "中庭+B大双方向架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "haven_pl6",
      "plantType": "safe",
      "name": "C安全包",
      "site": "C",
      "x": 67,
      "y": 86.3,
      "desc": "C点箱体后方安全下包，C Long可覆盖",
      "advantage": "被C Long和箱体保护，拆包极难",
      "risk": "防守方可从C Garage侧绕后",
      "postPlant": "C Long架枪 + 警家覆盖",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "haven_pl7",
      "plantType": "open",
      "name": "C开放包",
      "site": "C",
      "x": 62.2,
      "y": 82,
      "desc": "C点中央开放下包，适合快速执行",
      "advantage": "下包快，配合C Long烟雾效果好",
      "risk": "从C Heaven和C Cubby可同时覆盖",
      "postPlant": "C Long入口 + 警家方向架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "haven_pl8",
      "plantType": "special",
      "name": "C Cubby特殊包",
      "site": "C",
      "x": 57.5,
      "y": 88.4,
      "desc": "C Cubby角落隐蔽下包，出其不意",
      "advantage": "角落位置隐蔽，拆包时难以发现",
      "risk": "近距离防守方可快速清除",
      "postPlant": "封C Cubby烟后远距离架枪",
      "tags": [
        "进攻方"
      ]
    },
    {
      "id": "haven_pl9",
      "plantType": "second-floor",
      "name": "A Heaven二楼包",
      "site": "A",
      "x": 81.3,
      "y": 11.3,
      "desc": "A Heaven高台二楼下包，需要跳跃到达",
      "advantage": "拆包必须上二楼，时间极紧张",
      "risk": "下包过程中暴露在Heaven视野",
      "postPlant": "从Heaven下方架枪覆盖二楼包",
      "tags": [
        "进攻方"
      ]
    }
  ],
  "locations": [
    {
      "name": "守方重生点",
      "x": 42.7,
      "y": 84.1,
      "type": "spawn"
    },
    {
      "name": "B区后房",
      "x": 50.1,
      "y": 70.3,
      "type": "room"
    },
    {
      "name": "C区小道",
      "x": 67.2,
      "y": 70.6,
      "type": "route"
    },
    {
      "name": "AB小道",
      "x": 34.5,
      "y": 60.8,
      "type": "route"
    },
    {
      "name": "C区部署区",
      "x": 84.6,
      "y": 65.6,
      "type": "site"
    },
    {
      "name": "B区部署区",
      "x": 49.6,
      "y": 63.9,
      "type": "site"
    },
    {
      "name": "A区部署区",
      "x": 14.2,
      "y": 58.7,
      "type": "site"
    },
    {
      "name": "C区车库",
      "x": 63.3,
      "y": 49.9,
      "type": "room"
    },
    {
      "name": "C区车库入口",
      "x": 63,
      "y": 43.1,
      "type": "route"
    },
    {
      "name": "中区窗口",
      "x": 51.6,
      "y": 33,
      "type": "route"
    },
    {
      "name": "中区门",
      "x": 62.6,
      "y": 37.6,
      "type": "route"
    },
    {
      "name": "中区廊院",
      "x": 50.9,
      "y": 44.9,
      "type": "area"
    },
    {
      "name": "A区下水道",
      "x": 37.8,
      "y": 52,
      "type": "route",
      "fontSize": 10
    },
    {
      "name": "C区大厅",
      "x": 72.9,
      "y": 28,
      "type": "area"
    },
    {
      "name": "C区小房间",
      "x": 77.4,
      "y": 40,
      "type": "room"
    },
    {
      "name": "C区长道",
      "x": 84.1,
      "y": 32.3,
      "type": "route"
    },
    {
      "name": "A区大厅",
      "x": 38,
      "y": 38.4,
      "type": "area"
    },
    {
      "name": "A区长道",
      "x": 22.1,
      "y": 40.7,
      "type": "route"
    },
    {
      "name": "A区花园",
      "x": 39.9,
      "y": 25.3,
      "type": "area"
    },
    {
      "name": "C区窗口",
      "x": 63.1,
      "y": 58.4,
      "type": "route"
    },
    {
      "name": "C区小巷",
      "x": 71.1,
      "y": 53.2,
      "type": "route"
    },
    {
      "name": "攻方重生点",
      "x": 52.9,
      "y": 9,
      "type": "spawn"
    }
  ]
};
