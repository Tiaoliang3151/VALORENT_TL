// ==========================================
// 无畏契约战术查询 - 数据文件
// 修改此文件即可更新网站所有数据
// ==========================================

// ------------------------------------------
// 1. 职业定义
// ------------------------------------------
const ROLES = {
  controller: { name: "控场者", enName: "Controller", color: "#7b68ee", icon: "🛡️" },
  sentinel:   { name: "哨兵",   enName: "Sentinel",   color: "#00d4aa", icon: "🔒" },
  initiator:  { name: "先锋",   enName: "Initiator",  color: "#ffa500", icon: "📡" },
  duelist:    { name: "决斗者", enName: "Duelist",    color: "#ff4655", icon: "⚔️" }
};

// ------------------------------------------
// 2. 特工列表（共29名）
//    smokeType: "ball"=球烟, "line"=线烟, "both"=都有, "none"=无烟雾技能
// ------------------------------------------
const AGENTS = [
  // --- 控场者 ---
  { id: "brimstone", name: "炼狱",   enName: "Brimstone", role: "controller", smokeType: "ball",
    abilities: [
      { key: "C", name: "激励信标",   enName: "Stim Beacon" },
      { key: "Q", name: "燃烧弹",     enName: "Incendiary" },
      { key: "E", name: "空投烟雾",   enName: "Sky Smoke", isSmoke: true },
      { key: "X", name: "轨道打击",   enName: "Orbital Strike", isUlt: true }
    ]
  },
  { id: "viper", name: "蝰蛇", enName: "Viper", role: "controller", smokeType: "line",
    abilities: [
      { key: "C", name: "毒雾",       enName: "Poison Cloud", isSmoke: true },
      { key: "Q", name: "剧毒瘴气",   enName: "Toxic Screen",  isSmoke: true, smokeForm: "line" },
      { key: "E", name: "蝉雾",       enName: "Snake Bite" },
      { key: "X", name: "蝰蛇之巢",   enName: "Viper's Pit", isUlt: true }
    ]
  },
  { id: "omen", name: "幽影", enName: "Omen", role: "controller", smokeType: "ball",
    abilities: [
      { key: "C", name: "梦魇降临",   enName: "Shrouded Step" },
      { key: "Q", name: "暗影梦魇",   enName: "Paranoia" },
      { key: "E", name: "黑暗覆盖",   enName: "Dark Cover", isSmoke: true },
      { key: "X", name: "脱离现实",   enName: "From the Shadows", isUlt: true }
    ]
  },
  { id: "astra", name: "星礈", enName: "Astra", role: "controller", smokeType: "ball",
    abilities: [
      { key: "C", name: "引力井",     enName: "Gravity Well" },
      { key: "Q", name: "新星脉冲",   enName: "Nova Pulse" },
      { key: "E", name: "星云",       enName: "Nebula", isSmoke: true },
      { key: "X", name: "宇宙分界",   enName: "Cosmic Divide", isUlt: true }
    ]
  },
  { id: "harbor", name: "海神", enName: "Harbor", role: "controller", smokeType: "both",
    abilities: [
      { key: "C", name: "湾流",       enName: "Cove", isSmoke: true, smokeForm: "ball" },
      { key: "Q", name: "瀑布",       enName: "Cascade" },
      { key: "E", name: "高潮",       enName: "High Tide", isSmoke: true, smokeForm: "line" },
      { key: "X", name: "海啸",       enName: "Reckoning", isUlt: true }
    ]
  },
  { id: "clove", name: "蔻蕊", enName: "Clove", role: "controller", smokeType: "ball",
    abilities: [
      { key: "C", name: "拾取",       enName: "Pick-Me-Up" },
      { key: "Q", name: "干扰",       enName: "Meddle" },
      { key: "E", name: "诡计",       enName: "Ruse", isSmoke: true },
      { key: "X", name: "未死",       enName: "Not Dead Yet", isUlt: true }
    ]
  },
  { id: "miks", name: "米克斯", enName: "Miks", role: "controller", smokeType: "ball",
    abilities: [
      { key: "C", name: "技能C",      enName: "Ability C" },
      { key: "Q", name: "技能Q",      enName: "Ability Q" },
      { key: "E", name: "烟雾技能",   enName: "Smoke Ability", isSmoke: true },
      { key: "X", name: "终极技能",   enName: "Ultimate", isUlt: true }
    ]
  },

  // --- 哨兵 ---
  { id: "killjoy", name: "奇乐", enName: "Killjoy", role: "sentinel", smokeType: "none",
    abilities: [
      { key: "C", name: "纳米蜂群",   enName: "Nanoswarm" },
      { key: "Q", name: "警报机器人", enName: "Alarmbot" },
      { key: "E", name: "哨卫炮台",   enName: "Turret" },
      { key: "X", name: "锁定",       enName: "Lockdown", isUlt: true }
    ]
  },
  { id: "cypher", name: "赛菲尔", enName: "Cypher", role: "sentinel", smokeType: "none",
    abilities: [
      { key: "C", name: "陷阱线",     enName: "Trapwire" },
      { key: "Q", name: "网络牢笼",   enName: "Cyber Cage" },
      { key: "E", name: "监控摄像头", enName: "Spycam" },
      { key: "X", name: "神经窃取",   enName: "Neural Theft", isUlt: true }
    ]
  },
  { id: "sage", name: "贤者", enName: "Sage", role: "sentinel", smokeType: "none",
    abilities: [
      { key: "C", name: "屏障球",     enName: "Barrier Orb" },
      { key: "Q", name: "缓速球",     enName: "Slow Orb" },
      { key: "E", name: "治疗球",     enName: "Healing Orb" },
      { key: "X", name: "复活",       enName: "Resurrection", isUlt: true }
    ]
  },
  { id: "chamber", name: "钱伯", enName: "Chamber", role: "sentinel", smokeType: "none",
    abilities: [
      { key: "C", name: "印记",       enName: "Trademark" },
      { key: "Q", name: "猎人",       enName: "Headhunter" },
      { key: "E", name: "会合",       enName: "Rendezvous" },
      { key: "X", name: "火力全开",   enName: "Tour de Force", isUlt: true }
    ]
  },
  { id: "deadlock", name: "死锁", enName: "Deadlock", role: "sentinel", smokeType: "none",
    abilities: [
      { key: "C", name: "声波传感器", enName: "Sonic Sensor" },
      { key: "Q", name: "引力网",     enName: "GravNet" },
      { key: "E", name: "屏障网",     enName: "Barrier Mesh" },
      { key: "X", name: "湮灭",       enName: "Annihilation", isUlt: true }
    ]
  },
  { id: "vyse", name: "维斯", enName: "Vyse", role: "sentinel", smokeType: "none",
    abilities: [
      { key: "C", name: "荆棘",       enName: "Shear" },
      { key: "Q", name: "电弧玫瑰",   enName: "Arc Rose" },
      { key: "E", name: "铁丝网",     enName: "Razorvine" },
      { key: "X", name: "钢铁花园",   enName: "Steel Garden", isUlt: true }
    ]
  },
  { id: "veto", name: "维托", enName: "Veto", role: "sentinel", smokeType: "none",
    abilities: [
      { key: "C", name: "技能C",      enName: "Ability C" },
      { key: "Q", name: "技能Q",      enName: "Ability Q" },
      { key: "E", name: "技能E",      enName: "Ability E" },
      { key: "X", name: "终极技能",   enName: "Ultimate", isUlt: true }
    ]
  },

  // --- 先锋 ---
  { id: "sova", name: "猎枭", enName: "Sova", role: "initiator", smokeType: "none",
    abilities: [
      { key: "C", name: "猫头鹰无人机", enName: "Owl Drone" },
      { key: "Q", name: "震击箭",       enName: "Shock Bolt" },
      { key: "E", name: "侦察箭",       enName: "Recon Bolt" },
      { key: "X", name: "猎手之怒",     enName: "Hunter's Fury", isUlt: true }
    ]
  },
  { id: "breach", name: "布雷兹", enName: "Breach", role: "initiator", smokeType: "none",
    abilities: [
      { key: "C", name: "闪光点",     enName: "Flashpoint" },
      { key: "Q", name: "余震",       enName: "Aftershock" },
      { key: "E", name: "断层线",     enName: "Fault Line" },
      { key: "X", name: "滚动雷霆",   enName: "Rolling Thunder", isUlt: true }
    ]
  },
  { id: "skye", name: "斯凯", enName: "Skye", role: "initiator", smokeType: "none",
    abilities: [
      { key: "C", name: "先驱",       enName: "Trailblazer" },
      { key: "Q", name: "野宴",       enName: "Guiding Light" },
      { key: "E", name: "回响",       enName: "Regrowth" },
      { key: "X", name: "寻觅者",     enName: "Seekers", isUlt: true }
    ]
  },
  { id: "kayo", name: "KAY/O", enName: "KAY/O", role: "initiator", smokeType: "none",
    abilities: [
      { key: "C", name: "碎片",       enName: "Frag/ment" },
      { key: "Q", name: "闪光",       enName: "FLASH/drive" },
      { key: "E", name: "零点",       enName: "ZERO/point" },
      { key: "X", name: "命令",       enName: "NULL/cmd", isUlt: true }
    ]
  },
  { id: "fade", name: "菲德", enName: "Fade", role: "initiator", smokeType: "none",
    abilities: [
      { key: "C", name: "徘徊",       enName: "Prowler" },
      { key: "Q", name: "吞噬",       enName: "Seize" },
      { key: "E", name: "幽影",       enName: "Haunt" },
      { key: "X", name: "夜行",       enName: "Nightfall", isUlt: true }
    ]
  },
  { id: "gekko", name: "盖克", enName: "Gekko", role: "initiator", smokeType: "none",
    abilities: [
      { key: "C", name: "混乱",       enName: "Mosh Pit" },
      { key: "Q", name: "冲撞",       enName: "Dizzy" },
      { key: "E", name: "翅膀",       enName: "Wingman" },
      { key: "X", name: "飞奔",       enName: "Thrash", isUlt: true }
    ]
  },
  { id: "tejo", name: "泰乔", enName: "Tejo", role: "initiator", smokeType: "none",
    abilities: [
      { key: "C", name: "技能C",      enName: "Ability C" },
      { key: "Q", name: "技能Q",      enName: "Ability Q" },
      { key: "E", name: "技能E",      enName: "Ability E" },
      { key: "X", name: "终极技能",   enName: "Ultimate", isUlt: true }
    ]
  },

  // --- 决斗者 ---
  { id: "phoenix", name: "凤凰", enName: "Phoenix", role: "duelist", smokeType: "none",
    abilities: [
      { key: "C", name: "火焰",       enName: "Blaze" },
      { key: "Q", name: "曲线",       enName: "Curveball" },
      { key: "E", name: "火花",       enName: "Hot Hands" },
      { key: "X", name: "重来",       enName: "Run It Back", isUlt: true }
    ]
  },
  { id: "jett", name: "捷风", enName: "Jett", role: "duelist", smokeType: "none",
    abilities: [
      { key: "C", name: "涌动",       enName: "Cloudburst", isSmoke: true, smokeForm: "ball" },
      { key: "Q", name: "上升",       enName: "Updraft" },
      { key: "E", name: "飘移",       enName: "Tailwind" },
      { key: "X", name: "刀刃风暴",   enName: "Blade Storm", isUlt: true }
    ]
  },
  { id: "reyna", name: "蕾娜", enName: "Reyna", role: "duelist", smokeType: "none",
    abilities: [
      { key: "C", name: " Leer",      enName: "Leer" },
      { key: "Q", name: "吞噬",       enName: "Devour" },
      { key: "E", name: "消失",       enName: "Dismiss" },
      { key: "X", name: "女皇",       enName: "Empress", isUlt: true }
    ]
  },
  { id: "raze", name: "瑞兹", enName: "Raze", role: "duelist", smokeType: "none",
    abilities: [
      { key: "C", name: "爆破包",     enName: "Blast Pack" },
      { key: "Q", name: "爆破机器人", enName: "Boom Bot" },
      { key: "E", name: "漆弹",       enName: "Paint Shells" },
      { key: "X", name: "归巢火箭",   enName: "Showstopper", isUlt: true }
    ]
  },
  { id: "yoru", name: "夜露", enName: "Yoru", role: "duelist", smokeType: "none",
    abilities: [
      { key: "C", name: "欺诈",       enName: "Fakeout" },
      { key: "Q", name: "致盲",       enName: "Blindside" },
      { key: "E", name: "Gatecrash",  enName: "Gatecrash" },
      { key: "X", name: "空间抽取",   enName: "Dimensional Drift", isUlt: true }
    ]
  },
  { id: "neon", name: "霓虹", enName: "Neon", role: "duelist", smokeType: "none",
    abilities: [
      { key: "C", name: "继电器",     enName: "Relay Bolt" },
      { key: "Q", name: "电流",       enName: "Fast Lane" },
      { key: "E", name: "高速通道",   enName: "High Gear" },
      { key: "X", name: "超速",       enName: "Overdrive", isUlt: true }
    ]
  },
  { id: "iso", name: "伊索", enName: "Iso", role: "duelist", smokeType: "none",
    abilities: [
      { key: "C", name: "裂解",       enName: "Undercut" },
      { key: "Q", name: "双层",       enName: "Double Tap" },
      { key: "E", name: "轮廓",       enName: "Contingency" },
      { key: "X", name: "决斗",       enName: "Kill Contract", isUlt: true }
    ]
  },
  { id: "waylay", name: "韦蕾", enName: "Waylay", role: "duelist", smokeType: "none",
    abilities: [
      { key: "C", name: "技能C",      enName: "Ability C" },
      { key: "Q", name: "技能Q",      enName: "Ability Q" },
      { key: "E", name: "技能E",      enName: "Ability E" },
      { key: "X", name: "终极技能",   enName: "Ultimate", isUlt: true }
    ]
  }
];

// ------------------------------------------
// 3. 地图列表
//    sites: 据点位置 (x, y 为百分比坐标 0-100)
//    image: 地图图片路径，留空则用 SVG 占位图
//    commonSmokes: 常规烟位（非英雄特定）
//      type: "ball"=球烟, "line"=线烟
//      radius: 球烟半径（百分比，建议 5-8）
//      length: 线烟长度（百分比，建议 15-30）
//      angle: 线烟角度（度，0=水平向右，90=垂直向下）
//    wallbangs: 穿墙点位
//    plantSpots: 下包点位
//      plantType: "open"=开放包, "safe"=安全包, "special"=特殊包, "second-floor"=二楼包
//      advantage: 优势说明, risk: 风险说明, postPlant: 下包后站位
// ------------------------------------------
const MAPS = [
  {
    id: "bind",
    name: "微风岛屿",
    enName: "Bind",
    sites: [
      { id: "A", x: 25, y: 35, label: "A点" },
      { id: "B", x: 72, y: 65, label: "B点" }
    ],
    image: "",
    description: "两张据点地图，拥有传送门机制。封闭式近距离交战为主，控场者表现优秀。",
    commonSmokes: [
      { id: "bind_cs1", type: "ball", name: "A主道烟雾", site: "A", x: 32, y: 28, radius: 7, desc: "封住A主道视野，阻止防守方看到进攻路线", tags: ["进攻方"] },
      { id: "bind_cs2", type: "ball", name: "A点Hookah烟", site: "A", x: 20, y: 42, radius: 6, desc: "封住Hookah出口，隔离A点防守方", tags: [] },
      { id: "bind_cs3", type: "ball", name: "B短烟", site: "B", x: 65, y: 58, radius: 7, desc: "分割B短和B点，保护进攻方进点", tags: ["进攻方"] },
      { id: "bind_cs4", type: "ball", name: "B长烟", site: "B", x: 78, y: 72, radius: 6, desc: "封住B长通道视野", tags: [] }
    ],
    wallbangs: [
      { id: "bind_wb1", name: "A门穿点", x: 30, y: 22, desc: "A门外可穿透薄墙打击A点角落的防守方", tags: [] },
      { id: "bind_wb2", name: "B短穿墙", x: 62, y: 55, desc: "B短通道墙壁可穿透，打击站点防守方", tags: [] }
    ]
  },
  {
    id: "haven",
    name: "隐世修所",
    enName: "Haven",
    sites: [
      { id: "A", x: 64.6, y: 15.6, label: "A点", tags: [] },
      { id: "B", x: 52.7, y: 49.9, label: "B点(中)", tags: [] },
      { id: "C", x: 64.6, y: 84.1, label: "C点", tags: [] }
    ],
    image: "maps/haven_overview.png?v=20260721a",
    splash: "maps/haven_splash.jpg?v=20260721a",
    description: "不丹延布的三据点地图。A点有Heaven塔楼、C点有超长视线，中路车库门可破坏。三据点布局让中路控制成为胜负关键。",
    commonSmokes: [
      // A 点烟雾
      { id: "haven_cs1", type: "ball", name: "A Heaven烟", site: "A", x: 76.6, y: 12.4, radius: 6, desc: "封住A Heaven塔楼视野，阻止防守方从高处压制A点入口", tags: ["进攻方"] },
      { id: "haven_cs2", type: "ball", name: "A大烟", site: "A", x: 59.9, y: 7.0, radius: 7, desc: "封住A Long通道，保护进攻方从A长进点", tags: ["进攻方"] },
      { id: "haven_cs3", type: "line", name: "A包点隔断烟", site: "A", x: 64.6, y: 15.6, length: 18, angle: 180.0, desc: "在A包点内制造纵向隔断，分割包点空间，便于进攻方占点", tags: ["进攻方"] },
      { id: "haven_cs4", type: "ball", name: "A警家烟", site: "A", x: 74.2, y: 19.9, radius: 6, desc: "封住A警家回防路线，阻止防守方从CT回防A点", tags: ["进攻方"] },
      { id: "haven_cs5", type: "ball", name: "A Garden烟", site: "A", x: 71.8, y: 23.1, radius: 5, desc: "封住A Garden，切断防守方从花园回防路线", tags: ["进攻方"] },
      // B 点烟雾（中路）
      { id: "haven_cs6", type: "ball", name: "B大烟", site: "B", x: 36.0, y: 49.9, radius: 7, desc: "封住B大通道入口，掩护进攻方进入B点", tags: ["进攻方"] },
      { id: "haven_cs7", type: "line", name: "B窗口烟", site: "B", x: 59.9, y: 45.6, length: 15, angle: 90.0, desc: "封住B窗口高台视野，隔离中路到B点的视线", tags: [] },
      { id: "haven_cs8", type: "ball", name: "中庭烟", site: "B", x: 47.9, y: 49.9, radius: 6, desc: "封住中庭区域，掩护进攻方进入B点", tags: ["进攻方"] },
      { id: "haven_cs9", type: "ball", name: "车库烟", site: "B", x: 26.5, y: 49.9, radius: 6, desc: "封住车库入口，阻止防守方通过Garage支援", tags: ["进攻方"] },
      // C 点烟雾
      { id: "haven_cs10", type: "ball", name: "C大烟", site: "C", x: 59.9, y: 92.7, radius: 7, desc: "封住C Long超长通道，这是地图最长的视线", tags: [] },
      { id: "haven_cs11", type: "line", name: "C包点隔断烟", site: "C", x: 64.6, y: 84.1, length: 18, angle: 180.0, desc: "在C包点内制造纵向隔断，分割包点空间", tags: [] },
      { id: "haven_cs12", type: "ball", name: "C警家烟", site: "C", x: 74.2, y: 79.8, radius: 6, desc: "封住C警家回防路线，阻止防守方从CT回防C点", tags: ["进攻方"] },
      { id: "haven_cs13", type: "ball", name: "C Garage烟", site: "C", x: 50.3, y: 73.4, radius: 6, desc: "封住C Garage入口，切断中路到C的连接", tags: [] },
      { id: "haven_cs14", type: "ball", name: "C Cubby烟", site: "C", x: 56.3, y: 87.3, radius: 5, desc: "封住C Cubby角落，清除常见的防守站位", tags: ["防守方"] }
    ],
    wallbangs: [
      { id: "haven_wb1", name: "A Long穿点", x: 64.6, y: 4.9, desc: "A Long薄墙可穿透，打击A Garden的防守方", tags: [] },
      { id: "haven_wb2", name: "C Long穿点", x: 64.6, y: 94.8, desc: "C Long墙壁可穿透，打击C Cubby蹲守的防守方", tags: [] },
      { id: "haven_wb3", name: "Garage门穿点", x: 28.9, y: 49.9, desc: "车库门HP为400，破坏后可穿透打击门后敌人", tags: [] },
      { id: "haven_wb4", name: "B Window穿点", x: 62.2, y: 43.4, desc: "B Window木窗可穿透，打击中路架枪的防守方", tags: [] }
    ],
    plantSpots: [
      // A 点下包
      { id: "haven_pl1", plantType: "safe", name: "A安全包", site: "A", x: 67.0, y: 13.5, desc: "A点箱子后方安全下包，防守方难以从远处拆包", advantage: "被A Heaven和A Long同时保护，拆包需近身", risk: "防守方从Garden回防时可投掷技能逼退", postPlant: "A Heaven高台架枪，覆盖包点", tags: ["进攻方"] },
      { id: "haven_pl2", plantType: "open", name: "A开放包", site: "A", x: 62.2, y: 17.8, desc: "A点中央开放区域下包，适合快速下包战术", advantage: "下包速度快，防守方来不及回防", risk: "拆包时可从多个角度覆盖，需强力守包", postPlant: "A Long入口架枪 + Heaven覆盖", tags: ["进攻方"] },
      { id: "haven_pl3", plantType: "special", name: "A Garden特殊包", site: "A", x: 69.4, y: 24.2, desc: "靠近Garden的隐蔽下包点，出其不意", advantage: "防守方容易忽略此位置", risk: "Garden回防路线近，下包时易被发现", postPlant: "封A Garden烟后架枪守包", tags: ["进攻方"] },
      // B 点下包
      { id: "haven_pl4", plantType: "safe", name: "B安全包", site: "B", x: 55.1, y: 47.7, desc: "B点箱体后方安全下包，中路可覆盖", advantage: "被中庭和箱体保护，拆包困难", risk: "防守方可从B窗口高台投掷技能", postPlant: "中庭架枪 + B窗口覆盖", tags: ["进攻方"] },
      { id: "haven_pl5", plantType: "open", name: "B开放包", site: "B", x: 50.3, y: 52.0, desc: "B点中央开放下包，适合配合烟雾快速占点", advantage: "配合烟雾可快速安全下包", risk: "烟雾散后暴露在多个角度", postPlant: "中庭+B大双方向架枪", tags: ["进攻方"] },
      // C 点下包
      { id: "haven_pl6", plantType: "safe", name: "C安全包", site: "C", x: 67.0, y: 86.3, desc: "C点箱体后方安全下包，C Long可覆盖", advantage: "被C Long和箱体保护，拆包极难", risk: "防守方可从C Garage侧绕后", postPlant: "C Long架枪 + 警家覆盖", tags: ["进攻方"] },
      { id: "haven_pl7", plantType: "open", name: "C开放包", site: "C", x: 62.2, y: 82.0, desc: "C点中央开放下包，适合快速执行", advantage: "下包快，配合C Long烟雾效果好", risk: "从C Heaven和C Cubby可同时覆盖", postPlant: "C Long入口 + 警家方向架枪", tags: ["进攻方"] },
      { id: "haven_pl8", plantType: "special", name: "C Cubby特殊包", site: "C", x: 57.5, y: 88.4, desc: "C Cubby角落隐蔽下包，出其不意", advantage: "角落位置隐蔽，拆包时难以发现", risk: "近距离防守方可快速清除", postPlant: "封C Cubby烟后远距离架枪", tags: ["进攻方"] },
      // 二楼下包
      { id: "haven_pl9", plantType: "second-floor", name: "A Heaven二楼包", site: "A", x: 81.3, y: 11.3, desc: "A Heaven高台二楼下包，需要跳跃到达", advantage: "拆包必须上二楼，时间极紧张", risk: "下包过程中暴露在Heaven视野", postPlant: "从Heaven下方架枪覆盖二楼包", tags: ["进攻方"] }
    ]
  },
  {
    id: "split",
    name: "裂变",
    enName: "Split",
    sites: [
      { id: "A", x: 30, y: 25, label: "A点", tags: ["进攻方"] },
      { id: "B", x: 70, y: 70, label: "B点", tags: ["进攻方"] }
    ],
    image: "",
    description: "垂直空间明显的地图，拥有绳索攀爬机制。防守方优势地图，需要大量技能配合进点。",
    commonSmokes: [
      { id: "split_cs1", type: "ball", name: "A主烟", site: "A", x: 35, y: 30, radius: 7, desc: "封住A主道视野", tags: [] },
      { id: "split_cs2", type: "ball", name: "A Heaven烟", site: "A", x: 25, y: 18, radius: 6, desc: "封住A Heaven高台", tags: [] },
      { id: "split_cs3", type: "ball", name: "B主烟", site: "B", x: 65, y: 62, radius: 7, desc: "封住B主道视野", tags: [] },
      { id: "split_cs4", type: "ball", name: "中烟", site: "B", x: 50, y: 48, radius: 6, desc: "封住中路通道", tags: [] }
    ],
    wallbangs: [
      { id: "split_wb1", name: "A Heaven穿点", x: 28, y: 15, desc: "A Heaven墙壁可穿透打击A点", tags: [] },
      { id: "split_wb2", name: "B Rafter穿点", x: 72, y: 65, desc: "B Rafter区域可穿透", tags: [] }
    ]
  },
  {
    id: "ascent",
    name: "义境空岛",
    enName: "Ascent",
    sites: [
      { id: "A", x: 25, y: 40, label: "A点", tags: [] },
      { id: "B", x: 75, y: 60, label: "B点", tags: [] }
    ],
    image: "",
    description: "威尼斯地图，中路有可加固的铁门。经典三通道平衡地图。",
    commonSmokes: [
      { id: "ascent_cs1", type: "ball", name: "A主烟", site: "A", x: 30, y: 35, radius: 7, desc: "封住A主道视野", tags: [] },
      { id: "ascent_cs2", type: "ball", name: "A点烟", site: "A", x: 22, y: 42, radius: 6, desc: "封住A点内部", tags: [] },
      { id: "ascent_cs3", type: "ball", name: "B主烟", site: "B", x: 70, y: 62, radius: 7, desc: "封住B主道视野", tags: [] },
      { id: "ascent_cs4", type: "ball", name: "中烟", site: "B", x: 50, y: 50, radius: 6, desc: "封住中路通道", tags: [] }
    ],
    wallbangs: [
      { id: "ascent_wb1", name: "A门穿点", x: 32, y: 30, desc: "A门薄墙可穿透", tags: [] },
      { id: "ascent_wb2", name: "B窗穿点", x: 78, y: 55, desc: "B窗口墙壁可穿透", tags: [] }
    ]
  },
  {
    id: "breeze",
    name: "极地寒港",
    enName: "Breeze",
    sites: [
      { id: "A", x: 25, y: 35, label: "A点", tags: [] },
      { id: "B", x: 75, y: 65, label: "B点", tags: [] }
    ],
    image: "",
    description: "最大地图，拥有超长视线。适合狙击手和远程先锋，烟雾必不可少。",
    commonSmokes: [
      { id: "breeze_cs1", type: "ball", name: "A Cave烟", site: "A", x: 18, y: 28, radius: 7, desc: "封住A Cave出口", tags: [] },
      { id: "breeze_cs2", type: "ball", name: "A Shop烟", site: "A", x: 30, y: 38, radius: 6, desc: "封住A Shop区域", tags: [] },
      { id: "breeze_cs3", type: "ball", name: "B Main烟", site: "B", x: 70, y: 60, radius: 7, desc: "封住B Main通道", tags: [] },
      { id: "breeze_cs4", type: "ball", name: "中烟", site: "B", x: 50, y: 50, radius: 8, desc: "封住中路长走廊", tags: [] }
    ],
    wallbangs: [
      { id: "breeze_wb1", name: "A Cave穿点", x: 20, y: 25, desc: "A Cave墙壁可穿透", tags: [] },
      { id: "breeze_wb2", name: "B Elbow穿点", x: 75, y: 70, desc: "B Elbow区域可穿透", tags: [] }
    ]
  },
  {
    id: "pearl",
    name: "珍珠",
    enName: "Pearl",
    sites: [
      { id: "A", x: 25, y: 40, label: "A点", tags: [] },
      { id: "B", x: 75, y: 60, label: "B点", tags: [] }
    ],
    image: "",
    description: "里斯本水下城市，经典三通道设计，无特殊机制。纯拼枪法和战术的地图。",
    commonSmokes: [
      { id: "pearl_cs1", type: "ball", name: "A Main烟", site: "A", x: 30, y: 35, radius: 7, desc: "封住A Main通道", tags: [] },
      { id: "pearl_cs2", type: "ball", name: "A Art烟", site: "A", x: 20, y: 45, radius: 6, desc: "封住A Art区域", tags: [] },
      { id: "pearl_cs3", type: "ball", name: "B Main烟", site: "B", x: 70, y: 58, radius: 7, desc: "封住B Main通道", tags: [] },
      { id: "pearl_cs4", type: "ball", name: "中连接烟", site: "B", x: 50, y: 50, radius: 6, desc: "封住Mid Connector", tags: [] }
    ],
    wallbangs: [
      { id: "pearl_wb1", name: "A Main穿点", x: 32, y: 30, desc: "A Main墙壁可穿透", tags: [] },
      { id: "pearl_wb2", name: "B Tower穿点", x: 78, y: 65, desc: "B Tower区域可穿透", tags: [] }
    ]
  },
  {
    id: "lotus",
    name: "莲花",
    enName: "Lotus",
    sites: [
      { id: "A", x: 20, y: 35, label: "A点", tags: [] },
      { id: "B", x: 50, y: 50, label: "B点", tags: [] },
      { id: "C", x: 80, y: 35, label: "C点", tags: [] }
    ],
    image: "",
    description: "三据点地图，拥有旋转门和可破坏墙壁。机制复杂，战术多样。",
    commonSmokes: [
      { id: "lotus_cs1", type: "ball", name: "A Tree烟", site: "A", x: 25, y: 30, radius: 6, desc: "封住A Tree通道", tags: [] },
      { id: "lotus_cs2", type: "ball", name: "A Main烟", site: "A", x: 15, y: 40, radius: 7, desc: "封住A Main入口", tags: [] },
      { id: "lotus_cs3", type: "ball", name: "C Main烟", site: "C", x: 75, y: 30, radius: 7, desc: "封住C Main入口", tags: [] },
      { id: "lotus_cs4", type: "ball", name: "B Drop烟", site: "B", x: 50, y: 58, radius: 6, desc: "封住B Drop入口", tags: [] }
    ],
    wallbangs: [
      { id: "lotus_wb1", name: "A Link穿点", x: 28, y: 38, desc: "A Link墙壁可穿透", tags: [] },
      { id: "lotus_wb2", name: "C Link穿点", x: 72, y: 38, desc: "C Link墙壁可穿透", tags: [] }
    ]
  },
  {
    id: "fracture",
    name: "天漠之峡",
    enName: "Fracture",
    sites: [
      { id: "A", x: 30, y: 30, label: "A点", tags: [] },
      { id: "B", x: 70, y: 70, label: "B点", tags: [] }
    ],
    image: "",
    description: "进攻方从地图两侧出生，防守方在中间。拥有地下滑索，独特的双面进攻地图。",
    commonSmokes: [
      { id: "fracture_cs1", type: "ball", name: "A Main烟", site: "A", x: 35, y: 25, radius: 7, desc: "封住A Main入口", tags: [] },
      { id: "fracture_cs2", type: "ball", name: "A Rope烟", site: "A", x: 25, y: 35, radius: 6, desc: "封住A Rope区域", tags: [] },
      { id: "fracture_cs3", type: "ball", name: "B Main烟", site: "B", x: 65, y: 72, radius: 7, desc: "封住B Main入口", tags: [] },
      { id: "fracture_cs4", type: "ball", name: "B Arcade烟", site: "B", x: 72, y: 65, radius: 6, desc: "封住B Arcade通道", tags: [] }
    ],
    wallbangs: [
      { id: "fracture_wb1", name: "A Main穿点", x: 38, y: 22, desc: "A Main墙壁可穿透", tags: [] },
      { id: "fracture_wb2", name: "B Arcade穿点", x: 75, y: 62, desc: "B Arcade区域可穿透", tags: [] }
    ]
  }
];

// ------------------------------------------
// 4. 英雄特定技能点位
//    结构: LINEUPS[地图ID][英雄ID] = [点位数组]
//    每个点位包含:
//      ability: 技能按键 (C/Q/E/X)
//      name: 点位名称
//      type: "ball"=球烟, "line"=线烟, "other"=其他技能
//      x, y: 落点坐标 (百分比)
//      radius: 球烟半径 (百分比，建议5-8)
//      length: 线烟长度 (百分比，建议15-30)
//      angle: 线烟角度 (度)
//      standX, standY: 站位坐标 (百分比)
//      desc: 站位描述
//      crosshair: 准星瞄准描述
//      standImg: 站位截图路径 (可选，如 "lineups/xxx_stand.jpg")
//      aimImg: 瞄点截图路径 (可选，如 "lineups/xxx_aim.jpg")
//      effectImg: 效果截图路径 (可选，如 "lineups/xxx_effect.jpg")
//      video: 视频链接 (可选)
// ------------------------------------------
const LINEUPS = {
  // ========== 微风岛屿 Bind ==========
  bind: {
    brimstone: [
      {
        ability: "E", name: "A主道防守烟", type: "ball",
        x: 32, y: 28, radius: 7,
        standX: 15, standY: 15,
        desc: "站在A出生点左侧墙角",
        crosshair: "打开战术地图，将烟雾标记放在A主道入口",
        video: "",
        tags: [] },
      {
        ability: "E", name: "B短进攻烟", type: "ball",
        x: 65, y: 58, radius: 7,
        standX: 85, standY: 85,
        desc: "站在B出生点出口处",
        crosshair: "打开战术地图，标记B短通道",
        video: "",
        tags: [] },
      {
        ability: "Q", name: "A点燃烧弹", type: "other",
        x: 22, y: 38, radius: 5,
        standX: 32, standY: 25,
        desc: "站在A主道入口",
        crosshair: "瞄准A点Hookah出口地面",
        video: "",
        tags: [] }
    ],
    viper: [
      {
        ability: "E", name: "B点线烟分割", type: "line",
        x: 68, y: 60, length: 25, angle: 30,
        standX: 55, standY: 80,
        desc: "站在B通道入口处",
        crosshair: "面向B点左上方，瞄准天空",
        video: "",
        tags: [] },
      {
        ability: "E", name: "A点线烟", type: "line",
        x: 28, y: 32, length: 20, angle: 120,
        standX: 40, standY: 55,
        desc: "站在中路靠近A点位置",
        crosshair: "面向A点方向，瞄准天空右侧",
        video: "",
        tags: [] },
      {
        ability: "C", name: "A Hookah毒雾", type: "ball",
        x: 20, y: 42, radius: 5,
        standX: 25, standY: 30,
        desc: "站在A主道，靠近Hookah入口",
        crosshair: "瞄准Hookah门口上方",
        video: "",
        tags: [] }
    ],
    omen: [
      {
        ability: "E", name: "A点深烟", type: "ball",
        x: 25, y: 38, radius: 6,
        standX: 35, standY: 20,
        desc: "站在A主道拐角处",
        crosshair: "瞄准A点内部上方天空",
        video: "",
        tags: [] },
      {
        ability: "E", name: "B长烟", type: "ball",
        x: 78, y: 72, radius: 6,
        standX: 70, standY: 85,
        desc: "站在B短通道",
        crosshair: "瞄准B长通道方向天空",
        video: "",
        tags: [] }
    ],
    sova: [
      {        ability: "E", name: "A点侦察箭", type: "other",
        x: 22, y: 35, radius: 4,
        standX: 35, standY: 15,
        desc: "站在A出生点入口",
        crosshair: "瞄准A点方向天空，蓄力2格",
        video: "",
        tags: [] },
      {        ability: "Q", name: "B点震击箭", type: "other",
        x: 72, y: 62, radius: 4,
        standX: 60, standY: 80,
        desc: "站在B通道入口",
        crosshair: "瞄准B点天花板角落，蓄力1格",
        video: "",
        tags: [] }
    ]
  },

  // ========== 隐世修所 Haven ==========
  haven: {
    brimstone: [
      {
        ability: "E", name: "A Heaven烟", type: "ball",
        x: 76.6, y: 12.4, radius: 6,
        standX: 56.3, standY: 4.9,
        desc: "站在A Long入口拐角，打开战术地图",
        crosshair: "在战术地图上将烟雾标记放在A Heaven塔楼位置",
        video: "",
        tags: [] },
      {
        ability: "E", name: "A大烟", type: "ball",
        x: 59.9, y: 7.0, radius: 7,
        standX: 59.9, standY: 4.9,
        desc: "站在A Long入口",
        crosshair: "在战术地图上将烟雾标记放在A Long通道中段",
        video: "",
        tags: [] },
      {
        ability: "E", name: "C大烟", type: "ball",
        x: 59.9, y: 92.7, radius: 7,
        standX: 59.9, standY: 94.8,
        desc: "站在C Long入口",
        crosshair: "在战术地图上将烟雾标记放在C Long通道中段",
        video: "",
        tags: [] },
      {
        ability: "E", name: "C Garage烟", type: "ball",
        x: 50.3, y: 73.4, radius: 6,
        standX: 59.9, standY: 94.8,
        desc: "站在C Long入口",
        crosshair: "在战术地图上将烟雾标记放在Garage入口",
        video: "",
        tags: [] },
      {
        ability: "Q", name: "A点燃烧弹(守包)", type: "other",
        x: 62.2, y: 15.6, radius: 5,
        standX: 71.8, standY: 19.9,
        desc: "站在A Garden的独轮车上方角落",
        crosshair: "转身寻找从左数第二个吊灯，瞄准其中间位置释放",
        video: "",
        tags: [] }
    ],
    viper: [
      {
        ability: "E", name: "中路垂直线烟", type: "line",
        x: 68.2, y: 49.9, length: 30, angle: 180.0,
        standX: 80.1, standY: 49.9,
        desc: "站在中路高处Window位置",
        crosshair: "垂直向下瞄准，覆盖中路到B点通道",
        video: "",
        tags: [] },
      {
        ability: "C", name: "Garage毒雾", type: "ball",
        x: 28.9, y: 49.9, radius: 5,
        standX: 40.8, standY: 47.7,
        desc: "站在Garage入口旁的箱子后",
        crosshair: "瞄准Garage门口地面释放",
        video: "",
        tags: [] },
      {
        ability: "E", name: "C Long线烟", type: "line",
        x: 59.9, y: 92.7, length: 25, angle: 90.0,
        standX: 50.3, standY: 87.3,
        desc: "站在C点靠近C Long的位置",
        crosshair: "水平向右瞄准，覆盖C Long超长通道",
        video: "",
        tags: [] }
    ],
    omen: [
      {
        ability: "E", name: "A Heaven深烟", type: "ball",
        x: 76.6, y: 12.4, radius: 6,
        standX: 68.2, standY: 19.9,
        desc: "站在A Garden第一层台子角落",
        crosshair: "瞄准A Heaven塔楼上方天空，烟雾会自动飞到目标位置",
        video: "",
        tags: [] },
      {
        ability: "E", name: "C大深烟", type: "ball",
        x: 59.9, y: 92.7, radius: 6,
        standX: 64.6, standY: 82.0,
        desc: "站在C点靠近C Long的拐角",
        crosshair: "瞄准C Long方向天空右侧",
        video: "",
        tags: [] },
      {
        ability: "E", name: "B窗口烟", type: "ball",
        x: 59.9, y: 45.6, radius: 6,
        standX: 50.3, standY: 52.0,
        desc: "站在中路靠B点一侧",
        crosshair: "瞄准B Window高台方向天空",
        video: "",
        tags: [] }
    ],
    // ===== 猎枭 Sova 详细技能点位 =====
    sova: [
      // --- 侦察箭 Recon Bolt ---
      {
        id: "haven_sova_1",
        ability: "E", name: "A点全图侦察(从A Long)", type: "other",
        x: 64.6, y: 15.6, radius: 5,
        standX: 56.3, standY: 4.9,
        desc: "站在A Long角落，靠墙不动。将蓄力条第三格对准左侧菱形底部",
        crosshair: "无反弹，2格蓄力。箭会落在A点屋顶，覆盖整个A点",
        standImg: "lineups/haven_sova_a_recon_stand.jpg",
        aimImg: "lineups/haven_sova_a_recon_aim.jpg",
        effectImg: "lineups/haven_sova_a_recon_effect.jpg",
        video: "",
        tags: [] },
      {
        id: "haven_sova_2",
        ability: "E", name: "A Heaven侦察(从A Garden)", type: "other",
        x: 76.6, y: 12.4, radius: 4,
        standX: 71.8, standY: 23.1,
        desc: "站在A Garden第一层台子角落。将HUD线尖端对准如图所示位置，留一像素间隙",
        crosshair: "无反弹，1格蓄力。箭落在A Heaven高台，侦察塔楼防守方",
        standImg: "lineups/haven_sova_a_heaven_stand.jpg",
        aimImg: "lineups/haven_sova_a_heaven_aim.jpg",
        effectImg: "lineups/haven_sova_a_heaven_effect.jpg",
        video: "",
        tags: [] },
      {
        id: "haven_sova_3",
        ability: "E", name: "A点低位屋顶侦察(从A Garden)", type: "other",
        x: 62.2, y: 15.6, radius: 4,
        standX: 71.8, standY: 23.1,
        desc: "站在A Garden第一层台子角落。箭会从箱子反弹后粘在屋顶下方",
        crosshair: "无反弹，1格蓄力。覆盖A点最大范围，是A点最佳侦察箭",
        video: "",
        tags: [] },
      {
        id: "haven_sova_4",
        ability: "E", name: "B点后方侦察(从A Garden)", type: "other",
        x: 47.9, y: 49.9, radius: 4,
        standX: 71.8, standY: 23.1,
        desc: "站在A Garden第一层台子角落。将HUD线尖端对准绿色方块边缘一半位置",
        crosshair: "无反弹，2格蓄力。箭飞越中路落在B点后方",
        video: "",
        tags: [] },
      {
        id: "haven_sova_5",
        ability: "E", name: "C点侦察(从C Link)", type: "other",
        x: 64.6, y: 84.1, radius: 4,
        standX: 68.2, standY: 76.6,
        desc: "站在C Link拐角。蓄力条右上角对准桶的阴影",
        crosshair: "无反弹，2格蓄力。覆盖C点大部分区域",
        video: "",
        tags: [] },
      {
        id: "haven_sova_6",
        ability: "E", name: "C大侦察(从C点)", type: "other",
        x: 59.9, y: 92.7, radius: 4,
        standX: 59.9, standY: 82.0,
        desc: "站在C点后方靠近C Link位置，无反弹2格蓄力。箭落在C Long树上方的树枝",
        crosshair: "瞄准C Long方向树梢位置",
        video: "",
        tags: [] },
      {
        id: "haven_sova_7",
        ability: "E", name: "A Garden防守侦察(从A点)", type: "other",
        x: 71.8, y: 23.1, radius: 4,
        standX: 62.2, standY: 15.6,
        desc: "站在A点后方箱子上（黑色左角）。将箭尖对准屋顶角落",
        crosshair: "防守方使用。无反弹，1格蓄力",
        video: "",
        tags: ["防守方"] },
      {
        id: "haven_sova_8",
        ability: "E", name: "进攻方出生点侦察(从A点)", type: "other",
        x: 56.3, y: 1.7, radius: 4,
        standX: 59.9, standY: 15.6,
        desc: "站在A点后方箱子角落。将震击箭图标尖端对准屋顶顶点",
        crosshair: "防守方使用。可侦察到A Sewer的敌人",
        video: "",
        tags: ["进攻方"] },
      // --- 震击箭 Shock Bolt ---
      {
        id: "haven_sova_9",
        ability: "Q", name: "A Heaven双发震击(从A Long)", type: "other",
        x: 76.6, y: 12.4, radius: 4,
        standX: 59.9, standY: 4.9,
        desc: "站在A Long沙袋角落（地面层，不是上方）。箭1:HUD尖端在花瓣上方一像素；箭2:左菱形对准灯泡",
        crosshair: "2格蓄力。两支箭同步落下，压制A Heaven",
        video: "",
        tags: [] },
      {
        id: "haven_sova_10",
        ability: "Q", name: "A点默认下包震击(从A Long)", type: "other",
        x: 62.2, y: 15.6, radius: 4,
        standX: 59.9, standY: 4.9,
        desc: "站在A Long沙袋角落。箭1:从对角线连线到间隙；箭2:瞄准灯泡右下",
        crosshair: "守包使用。打击A点默认下包位置的敌人",
        video: "",
        tags: ["进攻方"] },
      {
        id: "haven_sova_11",
        ability: "Q", name: "B点默认下包震击(从C Garage)", type: "other",
        x: 47.9, y: 49.9, radius: 4,
        standX: 50.3, standY: 73.4,
        desc: "站在C Garage门角落。准星对准缆绳上的环，上移至碰到木块边缘",
        crosshair: "保持在木边缘下方，否则箭会打到门顶。1格蓄力",
        video: "",
        tags: ["进攻方"] },
      {
        id: "haven_sova_12",
        ability: "Q", name: "A点震击(从A Link)", type: "other",
        x: 62.2, y: 15.6, radius: 4,
        standX: 56.3, standY: 26.3,
        desc: "站在A Link拐角的箱子旁。准星对准木梁，弓的右侧对准右边木梁",
        crosshair: "防守方使用。打击A点进攻方",
        video: "",
        tags: [] },
      {
        id: "haven_sova_13",
        ability: "Q", name: "C点震击(从C Link)", type: "other",
        x: 64.6, y: 84.1, radius: 4,
        standX: 56.3, standY: 73.4,
        desc: "站在C Link靶子角落，贴墙直到停止。将猎枭小指关节对准墙壁装饰曲线",
        crosshair: "防守方使用。打击C点的进攻方",
        video: "",
        tags: [] },
      // --- 假箭 Fake Arrow ---
      {
        id: "haven_sova_14",
        ability: "E", name: "假C点箭(从A Garden)", type: "other",
        x: 64.6, y: 84.1, radius: 4,
        standX: 71.8, standY: 23.1,
        desc: "站在A Garden第一层台子角落。将无人机图标尖端嵌在柱状结构的顶部间隙",
        crosshair: "假箭。让C点防守方误以为进攻方在打C，实际在打A",
        video: "",
        tags: [] },
      // --- 大招 ---
      {
        id: "haven_sova_15",
        ability: "X", name: "中路三连大招", type: "other",
        x: 52.7, y: 49.9, radius: 5,
        standX: 80.1, standY: 49.9,
        desc: "站在中路高处。大招可穿透墙壁，对中路到B点一线的敌人造成伤害",
        crosshair: "瞄准中路方向，三发分别覆盖前中后三段",
        video: "",
        tags: [] }
    ]
  },

  // ========== 裂变 Split ==========
  split: {
    brimstone: [
      {
        ability: "E", name: "A Heaven烟", type: "ball",
        x: 25, y: 18, radius: 6,
        standX: 35, standY: 30,
        desc: "站在A主道",
        crosshair: "打开战术地图标记A Heaven",
        video: "",
        tags: [] },
      {
        ability: "E", name: "B主烟", type: "ball",
        x: 65, y: 62, radius: 7,
        standX: 55, standY: 80,
        desc: "站在B出生点",
        crosshair: "打开战术地图标记B主道",
        video: "",
        tags: [] }
    ],
    viper: [
      {
        ability: "E", name: "A-B分割线烟", type: "line",
        x: 50, y: 30, length: 30, angle: 90,
        standX: 50, standY: 45,
        desc: "站在中路高处",
        crosshair: "垂直向下瞄准",
        video: "",
        tags: [] }
    ],
    omen: [
      {
        ability: "E", name: "A Heaven深烟", type: "ball",
        x: 28, y: 15, radius: 6,
        standX: 38, standY: 28,
        desc: "站在A主道拐角",
        crosshair: "瞄准A Heaven上方天空",
        video: "",
        tags: [] }
    ]
  },

  // ========== 义境空岛 Ascent ==========
  ascent: {
    brimstone: [
      {
        ability: "E", name: "A主烟", type: "ball",
        x: 30, y: 35, radius: 7,
        standX: 20, standY: 25,
        desc: "站在A出生点",
        crosshair: "打开战术地图标记A主道",
        video: "",
        tags: [] },
      {
        ability: "E", name: "B主烟", type: "ball",
        x: 70, y: 62, radius: 7,
        standX: 80, standY: 75,
        desc: "站在B出生点",
        crosshair: "打开战术地图标记B主道",
        video: "",
        tags: [] },
      {
        ability: "Q", name: "A点燃烧弹", type: "other",
        x: 22, y: 42, radius: 5,
        standX: 32, standY: 30,
        desc: "站在A主道入口",
        crosshair: "瞄准A点内部地面",
        video: "",
        tags: [] }
    ],
    viper: [
      {
        ability: "E", name: "中路线烟", type: "line",
        x: 50, y: 45, length: 25, angle: 0,
        standX: 50, standY: 35,
        desc: "站在中路入口高处",
        crosshair: "水平瞄准中路方向",
        video: "",
        tags: [] }
    ],
    omen: [
      {
        ability: "E", name: "A主深烟", type: "ball",
        x: 32, y: 32, radius: 6,
        standX: 22, standY: 28,
        desc: "站在A出生点旁",
        crosshair: "瞄准A主道方向天空",
        video: "",
        tags: [] }
    ],
    sova: [
      {
        ability: "E", name: "A点侦察箭", type: "other",
        x: 25, y: 38, radius: 4,
        standX: 35, standY: 20,
        desc: "站在A出生点入口",
        crosshair: "瞄准A点方向，蓄力2格",
        video: "",
        tags: [] }
    ]
  },

  // ========== 极地寒港 Breeze ==========
  breeze: {
    brimstone: [
      {
        ability: "E", name: "A Cave烟", type: "ball",
        x: 18, y: 28, radius: 7,
        standX: 28, standY: 20,
        desc: "站在A出生点",
        crosshair: "打开战术地图标记A Cave",
        video: "",
        tags: [] },
      {
        ability: "E", name: "B Main烟", type: "ball",
        x: 70, y: 60, radius: 7,
        standX: 80, standY: 75,
        desc: "站在B出生点",
        crosshair: "打开战术地图标记B Main",
        video: "",
        tags: [] }
    ],
    viper: [
      {
        ability: "E", name: "A长线烟", type: "line",
        x: 25, y: 40, length: 30, angle: 90,
        standX: 20, standY: 25,
        desc: "站在A出生点高处",
        crosshair: "垂直向下瞄准，覆盖A长通道",
        video: "",
        tags: [] },
      {
        ability: "E", name: "B长线烟", type: "line",
        x: 75, y: 60, length: 30, angle: 90,
        standX: 80, standY: 75,
        desc: "站在B出生点",
        crosshair: "垂直向下瞄准，覆盖B长通道",
        video: "",
        tags: [] }
    ]
  },

  // ========== 珍珠 Pearl ==========
  pearl: {
    brimstone: [
      {
        ability: "E", name: "A Main烟", type: "ball",
        x: 30, y: 35, radius: 7,
        standX: 20, standY: 25,
        desc: "站在A出生点",
        crosshair: "打开战术地图标记A Main",
        video: "",
        tags: [] },
      {
        ability: "E", name: "B Main烟", type: "ball",
        x: 70, y: 58, radius: 7,
        standX: 80, standY: 75,
        desc: "站在B出生点",
        crosshair: "打开战术地图标记B Main",
        video: "",
        tags: [] }
    ],
    viper: [
      {
        ability: "E", name: "中线烟", type: "line",
        x: 50, y: 45, length: 25, angle: 0,
        standX: 50, standY: 35,
        desc: "站在中路入口",
        crosshair: "水平瞄准中路方向",
        video: "",
        tags: [] }
    ]
  },

  // ========== 莲花 Lotus ==========
  lotus: {
    brimstone: [
      {
        ability: "E", name: "A Main烟", type: "ball",
        x: 15, y: 40, radius: 7,
        standX: 25, standY: 25,
        desc: "站在A出生点",
        crosshair: "打开战术地图标记A Main",
        video: "",
        tags: [] },
      {
        ability: "E", name: "C Main烟", type: "ball",
        x: 75, y: 30, radius: 7,
        standX: 75, standY: 25,
        desc: "站在C出生点",
        crosshair: "打开战术地图标记C Main",
        video: "",
        tags: [] }
    ],
    viper: [
      {
        ability: "E", name: "A-C线烟", type: "line",
        x: 50, y: 35, length: 35, angle: 90,
        standX: 50, standY: 25,
        desc: "站在中路高处",
        crosshair: "垂直向下瞄准",
        video: "",
        tags: [] }
    ]
  },

  // ========== Fracture ==========
  fracture: {
    brimstone: [
      {
        ability: "E", name: "A Main烟", type: "ball",
        x: 35, y: 25, radius: 7,
        standX: 25, standY: 15,
        desc: "站在A侧出生点",
        crosshair: "打开战术地图标记A Main",
        video: "",
        tags: [] },
      {
        ability: "E", name: "B Main烟", type: "ball",
        x: 65, y: 72, radius: 7,
        standX: 75, standY: 85,
        desc: "站在B侧出生点",
        crosshair: "打开战术地图标记B Main",
        video: "",
        tags: [] }
    ],
    viper: [
      {
        ability: "E", name: "中线烟", type: "line",
        x: 50, y: 50, length: 30, angle: 45,
        standX: 45, standY: 40,
        desc: "站在中路",
        crosshair: "斜向瞄准",
        video: "",
        tags: [] }
    ]
  }
};

// 导出数据（供 app.js 使用）
if (typeof window !== "undefined") {
  window.APP_DATA = { ROLES, AGENTS, MAPS, LINEUPS };
}
