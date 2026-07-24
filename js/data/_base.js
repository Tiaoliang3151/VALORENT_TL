// ==========================================
// 基础数据：职业定义 + 特工/英雄列表
// 修改频率：极低（只有新英雄/新职业/技能名变更时才改）
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.ROLES = {
  controller: {
    name: "控场者",
    enName: "Controller",
    color: "#7b68ee",
    icon: "🛡️"
  },
  sentinel: {
    name: "哨兵",
    enName: "Sentinel",
    color: "#00d4aa",
    icon: "🔒"
  },
  initiator: {
    name: "先锋",
    enName: "Initiator",
    color: "#ffa500",
    icon: "📡"
  },
  duelist: {
    name: "决斗者",
    enName: "Duelist",
    color: "#ff4655",
    icon: "⚔️"
  }
};

window.__VAL_DATA__.AGENTS = [
  {
    id: "brimstone",
    name: "炼狱",
    enName: "Brimstone",
    role: "controller",
    smokeType: "ball",
    abilities: [
      {
        key: "C",
        name: "振奋标志",
        enName: "Stim Beacon"
      },
      {
        key: "Q",
        name: "燃烧榴弹",
        enName: "Incendiary"
      },
      {
        key: "E",
        name: "空投烟幕",
        enName: "Sky Smoke",
        isSmoke: true
      },
      {
        key: "X",
        name: "天基光束",
        enName: "Orbital Strike",
        isUlt: true
      }
    ]
  },
  {
    id: "viper",
    name: "蝰蛇",
    enName: "Viper",
    role: "controller",
    smokeType: "both",
    abilities: [
      {
        key: "C",
        name: "毒幕",
        enName: "Poison Cloud",
        isSmoke: true
      },
      {
        key: "Q",
        name: "毒幕屏障",
        enName: "Toxic Screen",
        isSmoke: true,
        smokeForm: "line"
      },
      {
        key: "E",
        name: "蛇咬",
        enName: "Snake Bite"
      },
      {
        key: "X",
        name: "蝰腹",
        enName: "Viper's Pit",
        isUlt: true
      }
    ]
  },
  {
    id: "omen",
    name: "幽影",
    enName: "Omen",
    role: "controller",
    smokeType: "ball",
    abilities: [
      {
        key: "C",
        name: "践影",
        enName: "Shrouded Step"
      },
      {
        key: "Q",
        name: "暗魇",
        enName: "Paranoia"
      },
      {
        key: "E",
        name: "黑翳",
        enName: "Dark Cover",
        isSmoke: true
      },
      {
        key: "X",
        name: "离魂",
        enName: "From the Shadows",
        isUlt: true
      }
    ]
  },
  {
    id: "astra",
    name: "星礈",
    enName: "Astra",
    role: "controller",
    smokeType: "ball",
    abilities: [
      {
        key: "C",
        name: "重力之井",
        enName: "Gravity Well"
      },
      {
        key: "Q",
        name: "新星脉冲",
        enName: "Nova Pulse"
      },
      {
        key: "E",
        name: "星云",
        enName: "Nebula",
        isSmoke: true
      },
      {
        key: "X",
        name: "宇宙分裂",
        enName: "Cosmic Divide",
        isUlt: true
      }
    ]
  },
  {
    id: "harbor",
    name: "海神",
    enName: "Harbor",
    role: "controller",
    smokeType: "both",
    abilities: [
      {
        key: "C",
        name: "巨浪屏障",
        enName: "Cove",
        isSmoke: true,
        smokeForm: "ball"
      },
      {
        key: "Q",
        name: "巨浪冲击",
        enName: "Cascade"
      },
      {
        key: "E",
        name: "巨浪高墙",
        enName: "High Tide",
        isSmoke: true,
        smokeForm: "line"
      },
      {
        key: "X",
        name: "清算",
        enName: "Reckoning",
        isUlt: true
      }
    ]
  },
  {
    id: "clove",
    name: "暮蝶",
    enName: "Clove",
    role: "controller",
    smokeType: "ball",
    abilities: [
      {
        key: "C",
        name: "重拾",
        enName: "Pick-Me-Up"
      },
      {
        key: "Q",
        name: "干扰",
        enName: "Meddle"
      },
      {
        key: "E",
        name: "诡计",
        enName: "Ruse",
        isSmoke: true
      },
      {
        key: "X",
        name: "尚未死亡",
        enName: "Not Dead Yet",
        isUlt: true
      }
    ]
  },
  {
    id: "killjoy",
    name: "奇乐",
    enName: "Killjoy",
    role: "sentinel",
    smokeType: "none",
    abilities: [
      {
        key: "C",
        name: "纳米蜂群",
        enName: "Nanoswarm"
      },
      {
        key: "Q",
        name: "警报机器人",
        enName: "Alarmbot"
      },
      {
        key: "E",
        name: "炮塔",
        enName: "Turret"
      },
      {
        key: "X",
        name: "全面封锁",
        enName: "Lockdown",
        isUlt: true
      }
    ]
  },
  {
    id: "cypher",
    name: "零",
    enName: "Cypher",
    role: "sentinel",
    smokeType: "none",
    abilities: [
      {
        key: "C",
        name: "绊线",
        enName: "Trapwire"
      },
      {
        key: "Q",
        name: "赛博牢笼",
        enName: "Cyber Cage"
      },
      {
        key: "E",
        name: "间谍相机",
        enName: "Spycam"
      },
      {
        key: "X",
        name: "神经窃取",
        enName: "Neural Theft",
        isUlt: true
      }
    ]
  },
  {
    id: "sage",
    name: "贤者",
    enName: "Sage",
    role: "sentinel",
    smokeType: "none",
    abilities: [
      {
        key: "C",
        name: "屏障宝珠",
        enName: "Barrier Orb"
      },
      {
        key: "Q",
        name: "减速宝珠",
        enName: "Slow Orb"
      },
      {
        key: "E",
        name: "治疗宝珠",
        enName: "Healing Orb"
      },
      {
        key: "X",
        name: "复活",
        enName: "Resurrection",
        isUlt: true
      }
    ]
  },
  {
    id: "chamber",
    name: "钱博尔",
    enName: "Chamber",
    role: "sentinel",
    smokeType: "none",
    abilities: [
      {
        key: "C",
        name: "商标",
        enName: "Trademark"
      },
      {
        key: "Q",
        name: "猎头者",
        enName: "Headhunter"
      },
      {
        key: "E",
        name: "集合点",
        enName: "Rendezvous"
      },
      {
        key: "X",
        name: "巡演",
        enName: "Tour de Force",
        isUlt: true
      }
    ]
  },
  {
    id: "deadlock",
    name: "钢锁",
    enName: "Deadlock",
    role: "sentinel",
    smokeType: "none",
    abilities: [
      {
        key: "C",
        name: "声波传感器",
        enName: "Sonic Sensor"
      },
      {
        key: "Q",
        name: "引力网",
        enName: "GravNet"
      },
      {
        key: "E",
        name: "屏障网格",
        enName: "Barrier Mesh"
      },
      {
        key: "X",
        name: "歼灭",
        enName: "Annihilation",
        isUlt: true
      }
    ]
  },
  {
    id: "vyse",
    name: "维斯",
    enName: "Vyse",
    role: "sentinel",
    smokeType: "none",
    abilities: [
      {
        key: "C",
        name: "剪断",
        enName: "Shear"
      },
      {
        key: "Q",
        name: "弧光玫瑰",
        enName: "Arc Rose"
      },
      {
        key: "E",
        name: "荆棘藤",
        enName: "Razorvine"
      },
      {
        key: "X",
        name: "钢铁花园",
        enName: "Steel Garden",
        isUlt: true
      }
    ]
  },
  {
    id: "sova",
    name: "猎枭",
    enName: "Sova",
    role: "initiator",
    smokeType: "none",
    abilities: [
      {
        key: "C",
        name: "枭型无人机",
        enName: "Owl Drone"
      },
      {
        key: "Q",
        name: "雷击箭",
        enName: "Shock Bolt"
      },
      {
        key: "E",
        name: "寻敌箭",
        enName: "Recon Bolt"
      },
      {
        key: "X",
        name: "狂猎之怒",
        enName: "Hunter's Fury",
        isUlt: true
      }
    ]
  },
  {
    id: "breach",
    name: "铁臂",
    enName: "Breach",
    role: "initiator",
    smokeType: "none",
    abilities: [
      {
        key: "C",
        name: "闪现点",
        enName: "Flashpoint"
      },
      {
        key: "Q",
        name: "余震",
        enName: "Aftershock"
      },
      {
        key: "E",
        name: "断层线",
        enName: "Fault Line"
      },
      {
        key: "X",
        name: "雷霆万钧",
        enName: "Rolling Thunder",
        isUlt: true
      }
    ]
  },
  {
    id: "skye",
    name: "斯凯",
    enName: "Skye",
    role: "initiator",
    smokeType: "none",
    abilities: [
      {
        key: "C",
        name: "开拓者",
        enName: "Trailblazer"
      },
      {
        key: "Q",
        name: "引路之光",
        enName: "Guiding Light"
      },
      {
        key: "E",
        name: "再生",
        enName: "Regrowth"
      },
      {
        key: "X",
        name: "猎食者",
        enName: "Seekers",
        isUlt: true
      }
    ]
  },
  {
    id: "kayo",
    name: "KAY/O",
    enName: "KAY/O",
    role: "initiator",
    smokeType: "none",
    abilities: [
      {
        key: "C",
        name: "碎片手雷",
        enName: "Frag/ment"
      },
      {
        key: "Q",
        name: "零点/点位",
        enName: "ZERO/point"
      },
      {
        key: "E",
        name: "压制",
        enName: "Suppression"
      },
      {
        key: "X",
        name: "无效/命令",
        enName: "NULL/cmd",
        isUlt: true
      }
    ]
  },
  {
    id: "fade",
    name: "黑梦",
    enName: "Fade",
    role: "initiator",
    smokeType: "none",
    abilities: [
      {
        key: "C",
        name: "潜行者",
        enName: "Prowler"
      },
      {
        key: "Q",
        name: "束缚",
        enName: "Seize"
      },
      {
        key: "E",
        name: "魅影",
        enName: "Haunt"
      },
      {
        key: "X",
        name: "夜幕降临",
        enName: "Nightfall",
        isUlt: true
      }
    ]
  },
  {
    id: "gekko",
    name: "盖可",
    enName: "Gekko",
    role: "initiator",
    smokeType: "none",
    abilities: [
      {
        key: "C",
        name: "魔坑",
        enName: "Mosh Pit"
      },
      {
        key: "Q",
        name: "晕眩",
        enName: "Dizzy"
      },
      {
        key: "E",
        name: "僚机",
        enName: "Wingman"
      },
      {
        key: "X",
        name: "狂暴",
        enName: "Thrash",
        isUlt: true
      }
    ]
  },
  {
    id: "phoenix",
    name: "不死鸟",
    enName: "Phoenix",
    role: "duelist",
    smokeType: "none",
    abilities: [
      {
        key: "C",
        name: "烈焰",
        enName: "Blaze"
      },
      {
        key: "Q",
        name: "曲球",
        enName: "Curveball"
      },
      {
        key: "E",
        name: "火手",
        enName: "Hot Hands"
      },
      {
        key: "X",
        name: "倒流时光",
        enName: "Run It Back",
        isUlt: true
      }
    ]
  },
  {
    id: "jett",
    name: "捷风",
    enName: "Jett",
    role: "duelist",
    smokeType: "ball",
    abilities: [
      {
        key: "C",
        name: "瞬云",
        enName: "Cloudburst",
        isSmoke: true,
        smokeForm: "ball"
      },
      {
        key: "Q",
        name: "凌空",
        enName: "Updraft"
      },
      {
        key: "E",
        name: "逐风",
        enName: "Tailwind"
      },
      {
        key: "X",
        name: "飙刃",
        enName: "Blade Storm",
        isUlt: true
      }
    ]
  },
  {
    id: "reyna",
    name: "芮娜",
    enName: "Reyna",
    role: "duelist",
    smokeType: "none",
    abilities: [
      {
        key: "C",
        name: "邪视",
        enName: "Leer"
      },
      {
        key: "Q",
        name: "吞噬",
        enName: "Devour"
      },
      {
        key: "E",
        name: "遣散",
        enName: "Dismiss"
      },
      {
        key: "X",
        name: "女皇",
        enName: "Empress",
        isUlt: true
      }
    ]
  },
  {
    id: "raze",
    name: "雷兹",
    enName: "Raze",
    role: "duelist",
    smokeType: "none",
    abilities: [
      {
        key: "C",
        name: "爆破包",
        enName: "Blast Pack"
      },
      {
        key: "Q",
        name: "爆破机器人",
        enName: "Boom Bot"
      },
      {
        key: "E",
        name: "彩绘弹",
        enName: "Paint Shells"
      },
      {
        key: "X",
        name: "压轴登场",
        enName: "Showstopper",
        isUlt: true
      }
    ]
  },
  {
    id: "yoru",
    name: "夜露",
    enName: "Yoru",
    role: "duelist",
    smokeType: "none",
    abilities: [
      {
        key: "C",
        name: "伪装",
        enName: "Fakeout"
      },
      {
        key: "Q",
        name: "盲区",
        enName: "Blindside"
      },
      {
        key: "E",
        name: "砸门",
        enName: "Gatecrash"
      },
      {
        key: "X",
        name: "维度漂移",
        enName: "Dimensional Drift",
        isUlt: true
      }
    ]
  },
  {
    id: "neon",
    name: "霓虹",
    enName: "Neon",
    role: "duelist",
    smokeType: "none",
    abilities: [
      {
        key: "C",
        name: "快道",
        enName: "Fast Lane"
      },
      {
        key: "Q",
        name: "接力雷电",
        enName: "Relay Bolt"
      },
      {
        key: "E",
        name: "充能疾驰",
        enName: "High Gear"
      },
      {
        key: "X",
        name: "超限暴走",
        enName: "Overdrive",
        isUlt: true
      }
    ]
  },
  {
    id: "iso",
    name: "壹决",
    enName: "Iso",
    role: "duelist",
    smokeType: "none",
    abilities: [
      {
        key: "C",
        name: "切低球",
        enName: "Undercut"
      },
      {
        key: "Q",
        name: "双击",
        enName: "Double Tap"
      },
      {
        key: "E",
        name: "应急预案",
        enName: "Contingency"
      },
      {
        key: "X",
        name: "死亡契约",
        enName: "Kill Contract",
        isUlt: true
      }
    ]
  }
];
