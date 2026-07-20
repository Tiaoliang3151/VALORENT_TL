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
  { id: "sova", name: "索娃", enName: "Sova", role: "initiator", smokeType: "none",
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
      { id: "bind_cs1", type: "ball", name: "A主道烟雾", site: "A", x: 32, y: 28, radius: 7, desc: "封住A主道视野，阻止防守方看到进攻路线" },
      { id: "bind_cs2", type: "ball", name: "A点Hookah烟", site: "A", x: 20, y: 42, radius: 6, desc: "封住Hookah出口，隔离A点防守方" },
      { id: "bind_cs3", type: "ball", name: "B短烟", site: "B", x: 65, y: 58, radius: 7, desc: "分割B短和B点，保护进攻方进点" },
      { id: "bind_cs4", type: "ball", name: "B长烟", site: "B", x: 78, y: 72, radius: 6, desc: "封住B长通道视野" }
    ],
    wallbangs: [
      { id: "bind_wb1", name: "A门穿点", x: 30, y: 22, desc: "A门外可穿透薄墙打击A点角落的防守方" },
      { id: "bind_wb2", name: "B短穿墙", x: 62, y: 55, desc: "B短通道墙壁可穿透，打击站点防守方" }
    ]
  },
  {
    id: "haven",
    name: "义境空岛",
    enName: "Haven",
    sites: [
      { id: "A", x: 20, y: 40, label: "A点" },
      { id: "B", x: 50, y: 55, label: "B点(中)" },
      { id: "C", x: 80, y: 40, label: "C点" }
    ],
    image: "",
    description: "三据点地图，中路控制至关重要。旋转距离长，需要快速移动能力。",
    commonSmokes: [
      { id: "haven_cs1", type: "ball", name: "A长烟", site: "A", x: 15, y: 30, radius: 7, desc: "封住A长通道视野" },
      { id: "haven_cs2", type: "ball", name: "C长烟", site: "C", x: 85, y: 30, radius: 7, desc: "封住C长通道视野" },
      { id: "haven_cs3", type: "ball", name: "中庭烟", site: "B", x: 50, y: 45, radius: 8, desc: "封住中庭，隔离B点和中路" },
      { id: "haven_cs4", type: "ball", name: "Garage烟", site: "B", x: 50, y: 65, radius: 6, desc: "封住Garage入口" }
    ],
    wallbangs: [
      { id: "haven_wb1", name: "A长穿点", x: 18, y: 25, desc: "A长通道墙壁可穿透" },
      { id: "haven_wb2", name: "C长穿点", x: 82, y: 25, desc: "C长通道墙壁可穿透" }
    ]
  },
  {
    id: "split",
    name: "裂变",
    enName: "Split",
    sites: [
      { id: "A", x: 30, y: 25, label: "A点" },
      { id: "B", x: 70, y: 70, label: "B点" }
    ],
    image: "",
    description: "垂直空间明显的地图，拥有绳索攀爬机制。防守方优势地图，需要大量技能配合进点。",
    commonSmokes: [
      { id: "split_cs1", type: "ball", name: "A主烟", site: "A", x: 35, y: 30, radius: 7, desc: "封住A主道视野" },
      { id: "split_cs2", type: "ball", name: "A Heaven烟", site: "A", x: 25, y: 18, radius: 6, desc: "封住A Heaven高台" },
      { id: "split_cs3", type: "ball", name: "B主烟", site: "B", x: 65, y: 62, radius: 7, desc: "封住B主道视野" },
      { id: "split_cs4", type: "ball", name: "中烟", site: "B", x: 50, y: 48, radius: 6, desc: "封住中路通道" }
    ],
    wallbangs: [
      { id: "split_wb1", name: "A Heaven穿点", x: 28, y: 15, desc: "A Heaven墙壁可穿透打击A点" },
      { id: "split_wb2", name: "B Rafter穿点", x: 72, y: 65, desc: "B Rafter区域可穿透" }
    ]
  },
  {
    id: "ascent",
    name: "义境空岛",
    enName: "Ascent",
    sites: [
      { id: "A", x: 25, y: 40, label: "A点" },
      { id: "B", x: 75, y: 60, label: "B点" }
    ],
    image: "",
    description: "经典三通道地图，中路有可加固的铁门。平衡性较好的地图。",
    commonSmokes: [
      { id: "ascent_cs1", type: "ball", name: "A主烟", site: "A", x: 30, y: 35, radius: 7, desc: "封住A主道视野" },
      { id: "ascent_cs2", type: "ball", name: "A点烟", site: "A", x: 22, y: 42, radius: 6, desc: "封住A点内部" },
      { id: "ascent_cs3", type: "ball", name: "B主烟", site: "B", x: 70, y: 62, radius: 7, desc: "封住B主道视野" },
      { id: "ascent_cs4", type: "ball", name: "中烟", site: "B", x: 50, y: 50, radius: 6, desc: "封住中路通道" }
    ],
    wallbangs: [
      { id: "ascent_wb1", name: "A门穿点", x: 32, y: 30, desc: "A门薄墙可穿透" },
      { id: "ascent_wb2", name: "B窗穿点", x: 78, y: 55, desc: "B窗口墙壁可穿透" }
    ]
  },
  {
    id: "breeze",
    name: "极地寒港",
    enName: "Breeze",
    sites: [
      { id: "A", x: 25, y: 35, label: "A点" },
      { id: "B", x: 75, y: 65, label: "B点" }
    ],
    image: "",
    description: "最大地图，拥有超长视线。适合狙击手和远程先锋，烟雾必不可少。",
    commonSmokes: [
      { id: "breeze_cs1", type: "ball", name: "A Cave烟", site: "A", x: 18, y: 28, radius: 7, desc: "封住A Cave出口" },
      { id: "breeze_cs2", type: "ball", name: "A Shop烟", site: "A", x: 30, y: 38, radius: 6, desc: "封住A Shop区域" },
      { id: "breeze_cs3", type: "ball", name: "B Main烟", site: "B", x: 70, y: 60, radius: 7, desc: "封住B Main通道" },
      { id: "breeze_cs4", type: "ball", name: "中烟", site: "B", x: 50, y: 50, radius: 8, desc: "封住中路长走廊" }
    ],
    wallbangs: [
      { id: "breeze_wb1", name: "A Cave穿点", x: 20, y: 25, desc: "A Cave墙壁可穿透" },
      { id: "breeze_wb2", name: "B Elbow穿点", x: 75, y: 70, desc: "B Elbow区域可穿透" }
    ]
  },
  {
    id: "pearl",
    name: "珍珠",
    enName: "Pearl",
    sites: [
      { id: "A", x: 25, y: 40, label: "A点" },
      { id: "B", x: 75, y: 60, label: "B点" }
    ],
    image: "",
    description: "里斯本水下城市，经典三通道设计，无特殊机制。纯拼枪法和战术的地图。",
    commonSmokes: [
      { id: "pearl_cs1", type: "ball", name: "A Main烟", site: "A", x: 30, y: 35, radius: 7, desc: "封住A Main通道" },
      { id: "pearl_cs2", type: "ball", name: "A Art烟", site: "A", x: 20, y: 45, radius: 6, desc: "封住A Art区域" },
      { id: "pearl_cs3", type: "ball", name: "B Main烟", site: "B", x: 70, y: 58, radius: 7, desc: "封住B Main通道" },
      { id: "pearl_cs4", type: "ball", name: "中连接烟", site: "B", x: 50, y: 50, radius: 6, desc: "封住Mid Connector" }
    ],
    wallbangs: [
      { id: "pearl_wb1", name: "A Main穿点", x: 32, y: 30, desc: "A Main墙壁可穿透" },
      { id: "pearl_wb2", name: "B Tower穿点", x: 78, y: 65, desc: "B Tower区域可穿透" }
    ]
  },
  {
    id: "lotus",
    name: "莲花",
    enName: "Lotus",
    sites: [
      { id: "A", x: 20, y: 35, label: "A点" },
      { id: "B", x: 50, y: 50, label: "B点" },
      { id: "C", x: 80, y: 35, label: "C点" }
    ],
    image: "",
    description: "三据点地图，拥有旋转门和可破坏墙壁。机制复杂，战术多样。",
    commonSmokes: [
      { id: "lotus_cs1", type: "ball", name: "A Tree烟", site: "A", x: 25, y: 30, radius: 6, desc: "封住A Tree通道" },
      { id: "lotus_cs2", type: "ball", name: "A Main烟", site: "A", x: 15, y: 40, radius: 7, desc: "封住A Main入口" },
      { id: "lotus_cs3", type: "ball", name: "C Main烟", site: "C", x: 75, y: 30, radius: 7, desc: "封住C Main入口" },
      { id: "lotus_cs4", type: "ball", name: "B Drop烟", site: "B", x: 50, y: 58, radius: 6, desc: "封住B Drop入口" }
    ],
    wallbangs: [
      { id: "lotus_wb1", name: "A Link穿点", x: 28, y: 38, desc: "A Link墙壁可穿透" },
      { id: "lotus_wb2", name: "C Link穿点", x: 72, y: 38, desc: "C Link墙壁可穿透" }
    ]
  },
  {
    id: "fracture",
    name: " fracture",
    enName: "Fracture",
    sites: [
      { id: "A", x: 30, y: 30, label: "A点" },
      { id: "B", x: 70, y: 70, label: "B点" }
    ],
    image: "",
    description: "进攻方从地图两侧出生，防守方在中间。拥有地下滑索，独特的双面进攻地图。",
    commonSmokes: [
      { id: "fracture_cs1", type: "ball", name: "A Main烟", site: "A", x: 35, y: 25, radius: 7, desc: "封住A Main入口" },
      { id: "fracture_cs2", type: "ball", name: "A Rope烟", site: "A", x: 25, y: 35, radius: 6, desc: "封住A Rope区域" },
      { id: "fracture_cs3", type: "ball", name: "B Main烟", site: "B", x: 65, y: 72, radius: 7, desc: "封住B Main入口" },
      { id: "fracture_cs4", type: "ball", name: "B Arcade烟", site: "B", x: 72, y: 65, radius: 6, desc: "封住B Arcade通道" }
    ],
    wallbangs: [
      { id: "fracture_wb1", name: "A Main穿点", x: 38, y: 22, desc: "A Main墙壁可穿透" },
      { id: "fracture_wb2", name: "B Arcade穿点", x: 75, y: 62, desc: "B Arcade区域可穿透" }
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
        video: ""
      },
      {
        ability: "E", name: "B短进攻烟", type: "ball",
        x: 65, y: 58, radius: 7,
        standX: 85, standY: 85,
        desc: "站在B出生点出口处",
        crosshair: "打开战术地图，标记B短通道",
        video: ""
      },
      {
        ability: "Q", name: "A点燃烧弹", type: "other",
        x: 22, y: 38, radius: 5,
        standX: 32, standY: 25,
        desc: "站在A主道入口",
        crosshair: "瞄准A点Hookah出口地面",
        video: ""
      }
    ],
    viper: [
      {
        ability: "E", name: "B点线烟分割", type: "line",
        x: 68, y: 60, length: 25, angle: 30,
        standX: 55, standY: 80,
        desc: "站在B通道入口处",
        crosshair: "面向B点左上方，瞄准天空",
        video: ""
      },
      {
        ability: "E", name: "A点线烟", type: "line",
        x: 28, y: 32, length: 20, angle: 120,
        standX: 40, standY: 55,
        desc: "站在中路靠近A点位置",
        crosshair: "面向A点方向，瞄准天空右侧",
        video: ""
      },
      {
        ability: "C", name: "A Hookah毒雾", type: "ball",
        x: 20, y: 42, radius: 5,
        standX: 25, standY: 30,
        desc: "站在A主道，靠近Hookah入口",
        crosshair: "瞄准Hookah门口上方",
        video: ""
      }
    ],
    omen: [
      {
        ability: "E", name: "A点深烟", type: "ball",
        x: 25, y: 38, radius: 6,
        standX: 35, standY: 20,
        desc: "站在A主道拐角处",
        crosshair: "瞄准A点内部上方天空",
        video: ""
      },
      {
        ability: "E", name: "B长烟", type: "ball",
        x: 78, y: 72, radius: 6,
        standX: 70, standY: 85,
        desc: "站在B短通道",
        crosshair: "瞄准B长通道方向天空",
        video: ""
      }
    ],
    sova: [
      {
        ability: "E", name: "A点侦察箭", type: "other",
        x: 22, y: 35, radius: 4,
        standX: 35, standY: 15,
        desc: "站在A出生点入口",
        crosshair: "瞄准A点方向天空，蓄力2格",
        video: ""
      },
      {
        ability: "Q", name: "B点震击箭", type: "other",
        x: 72, y: 62, radius: 4,
        standX: 60, standY: 80,
        desc: "站在B通道入口",
        crosshair: "瞄准B点天花板角落，蓄力1格",
        video: ""
      }
    ]
  },

  // ========== 义境空岛 Haven ==========
  haven: {
    brimstone: [
      {
        ability: "E", name: "A长烟", type: "ball",
        x: 15, y: 30, radius: 7,
        standX: 25, standY: 20,
        desc: "站在A出生点",
        crosshair: "打开战术地图标记A长通道",
        video: ""
      },
      {
        ability: "E", name: "C长烟", type: "ball",
        x: 85, y: 30, radius: 7,
        standX: 75, standY: 20,
        desc: "站在C出生点",
        crosshair: "打开战术地图标记C长通道",
        video: ""
      },
      {
        ability: "E", name: "中庭烟", type: "ball",
        x: 50, y: 45, radius: 8,
        standX: 50, standY: 30,
        desc: "站在中路入口",
        crosshair: "打开战术地图标记中庭",
        video: ""
      }
    ],
    viper: [
      {
        ability: "E", name: "A-C线烟", type: "line",
        x: 50, y: 35, length: 35, angle: 90,
        standX: 50, standY: 25,
        desc: "站在中路高处",
        crosshair: "垂直向下瞄准，覆盖中路",
        video: ""
      },
      {
        ability: "C", name: "Garage毒雾", type: "ball",
        x: 50, y: 65, radius: 5,
        standX: 48, standY: 55,
        desc: "站在Garage入口旁",
        crosshair: "瞄准Garage门口",
        video: ""
      }
    ],
    omen: [
      {
        ability: "E", name: "A长深烟", type: "ball",
        x: 12, y: 28, radius: 6,
        standX: 20, standY: 35,
        desc: "站在A短通道",
        crosshair: "瞄准A长方向天空",
        video: ""
      },
      {
        ability: "E", name: "C长深烟", type: "ball",
        x: 88, y: 28, radius: 6,
        standX: 80, standY: 35,
        desc: "站在C短通道",
        crosshair: "瞄准C长方向天空",
        video: ""
      }
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
        video: ""
      },
      {
        ability: "E", name: "B主烟", type: "ball",
        x: 65, y: 62, radius: 7,
        standX: 55, standY: 80,
        desc: "站在B出生点",
        crosshair: "打开战术地图标记B主道",
        video: ""
      }
    ],
    viper: [
      {
        ability: "E", name: "A-B分割线烟", type: "line",
        x: 50, y: 30, length: 30, angle: 90,
        standX: 50, standY: 45,
        desc: "站在中路高处",
        crosshair: "垂直向下瞄准",
        video: ""
      }
    ],
    omen: [
      {
        ability: "E", name: "A Heaven深烟", type: "ball",
        x: 28, y: 15, radius: 6,
        standX: 38, standY: 28,
        desc: "站在A主道拐角",
        crosshair: "瞄准A Heaven上方天空",
        video: ""
      }
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
        video: ""
      },
      {
        ability: "E", name: "B主烟", type: "ball",
        x: 70, y: 62, radius: 7,
        standX: 80, standY: 75,
        desc: "站在B出生点",
        crosshair: "打开战术地图标记B主道",
        video: ""
      },
      {
        ability: "Q", name: "A点燃烧弹", type: "other",
        x: 22, y: 42, radius: 5,
        standX: 32, standY: 30,
        desc: "站在A主道入口",
        crosshair: "瞄准A点内部地面",
        video: ""
      }
    ],
    viper: [
      {
        ability: "E", name: "中路线烟", type: "line",
        x: 50, y: 45, length: 25, angle: 0,
        standX: 50, standY: 35,
        desc: "站在中路入口高处",
        crosshair: "水平瞄准中路方向",
        video: ""
      }
    ],
    omen: [
      {
        ability: "E", name: "A主深烟", type: "ball",
        x: 32, y: 32, radius: 6,
        standX: 22, standY: 28,
        desc: "站在A出生点旁",
        crosshair: "瞄准A主道方向天空",
        video: ""
      }
    ],
    sova: [
      {
        ability: "E", name: "A点侦察箭", type: "other",
        x: 25, y: 38, radius: 4,
        standX: 35, standY: 20,
        desc: "站在A出生点入口",
        crosshair: "瞄准A点方向，蓄力2格",
        video: ""
      }
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
        video: ""
      },
      {
        ability: "E", name: "B Main烟", type: "ball",
        x: 70, y: 60, radius: 7,
        standX: 80, standY: 75,
        desc: "站在B出生点",
        crosshair: "打开战术地图标记B Main",
        video: ""
      }
    ],
    viper: [
      {
        ability: "E", name: "A长线烟", type: "line",
        x: 25, y: 40, length: 30, angle: 90,
        standX: 20, standY: 25,
        desc: "站在A出生点高处",
        crosshair: "垂直向下瞄准，覆盖A长通道",
        video: ""
      },
      {
        ability: "E", name: "B长线烟", type: "line",
        x: 75, y: 60, length: 30, angle: 90,
        standX: 80, standY: 75,
        desc: "站在B出生点",
        crosshair: "垂直向下瞄准，覆盖B长通道",
        video: ""
      }
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
        video: ""
      },
      {
        ability: "E", name: "B Main烟", type: "ball",
        x: 70, y: 58, radius: 7,
        standX: 80, standY: 75,
        desc: "站在B出生点",
        crosshair: "打开战术地图标记B Main",
        video: ""
      }
    ],
    viper: [
      {
        ability: "E", name: "中线烟", type: "line",
        x: 50, y: 45, length: 25, angle: 0,
        standX: 50, standY: 35,
        desc: "站在中路入口",
        crosshair: "水平瞄准中路方向",
        video: ""
      }
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
        video: ""
      },
      {
        ability: "E", name: "C Main烟", type: "ball",
        x: 75, y: 30, radius: 7,
        standX: 75, standY: 25,
        desc: "站在C出生点",
        crosshair: "打开战术地图标记C Main",
        video: ""
      }
    ],
    viper: [
      {
        ability: "E", name: "A-C线烟", type: "line",
        x: 50, y: 35, length: 35, angle: 90,
        standX: 50, standY: 25,
        desc: "站在中路高处",
        crosshair: "垂直向下瞄准",
        video: ""
      }
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
        video: ""
      },
      {
        ability: "E", name: "B Main烟", type: "ball",
        x: 65, y: 72, radius: 7,
        standX: 75, standY: 85,
        desc: "站在B侧出生点",
        crosshair: "打开战术地图标记B Main",
        video: ""
      }
    ],
    viper: [
      {
        ability: "E", name: "中线烟", type: "line",
        x: 50, y: 50, length: 30, angle: 45,
        standX: 45, standY: 40,
        desc: "站在中路",
        crosshair: "斜向瞄准",
        video: ""
      }
    ]
  }
};

// 导出数据（供 app.js 使用）
if (typeof window !== "undefined") {
  window.APP_DATA = { ROLES, AGENTS, MAPS, LINEUPS };
}
