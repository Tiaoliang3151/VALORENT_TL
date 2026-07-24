import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# ============================================================
# P0-1. 删除空 tags: []（安全替换，匹配末尾的空 tags）
# ============================================================
# 模式1: ,\n  <spaces>tags: []\n  -> 删除
content = re.sub(r',\n(\s*)tags:\s*\[\s*\]\n', r'\n', content)
# 模式2:  tags: [],\n  -> 删除
content = re.sub(r'\n(\s*)tags:\s*\[\s*\],\n', r'\n', content)

# ============================================================
# P0-2. 修正捷风 smokeType: none -> ball
# ============================================================
old_jett = '{ id: "jett", name: "捷风", enName: "Jett", role: "duelist", smokeType: "none",'
new_jett = '{ id: "jett", name: "捷风", enName: "Jett", role: "duelist", smokeType: "ball",'
assert old_jett in content, "jett not found"
content = content.replace(old_jett, new_jett)

# ============================================================
# P0-3. 修正蝰蛇 smokeType: line -> both
# ============================================================
old_viper = '{ id: "viper", name: "蝰蛇", enName: "Viper", role: "controller", smokeType: "line",'
new_viper = '{ id: "viper", name: "蝰蛇", enName: "Viper", role: "controller", smokeType: "both",'
assert old_viper in content, "viper not found"
content = content.replace(old_viper, new_viper)

# ============================================================
# P0-4. Chamber 尚勃勒 -> 钱博尔
# ============================================================
old_chamber = '{ id: "chamber", name: "尚勃勒", enName: "Chamber", role: "sentinel", smokeType: "none",'
new_chamber = '{ id: "chamber", name: "钱博尔", enName: "Chamber", role: "sentinel", smokeType: "none",'
assert old_chamber in content, "chamber not found"
content = content.replace(old_chamber, new_chamber)

# ============================================================
# P0-5. 地图官方名修正
# ============================================================
map_fixes = [
    ('id: "bind",\n    name: "源工重镇",', 'id: "bind",\n    name: "遗落境地",'),
    ('id: "split",\n    name: "霓虹町",',   'id: "split",\n    name: "分裂",'),
    ('id: "corrode",\n    name: "锈蚀",',   'id: "corrode",\n    name: "腐蚀",'),
]
for old, new in map_fixes:
    assert old in content, f"not found: {old[:40]}"
    content = content.replace(old, new)

# ============================================================
# P0-6. 英雄技能名批量修正（全部使用字符串精确匹配）
# ============================================================
ability_fixes = [
    # --- 蝰蛇 Viper ---
    ('{ key: "Q", name: "翳云",   enName: "Toxic Screen",  isSmoke: true, smokeForm: "line" }',
     '{ key: "Q", name: "毒幕屏障", enName: "Toxic Screen", isSmoke: true, smokeForm: "line" }'),

    # --- 钱博尔 Chamber ---
    ('abilities: [\n      { key: "C", name: "贵宾限行",       enName: "Trademark" },\n      { key: "Q", name: "金牌猎头",       enName: "Headhunter" },\n      { key: "E", name: "闪转自如",       enName: "Rendezvous" },\n      { key: "X", name: "孤高火力",   enName: "Tour de Force", isUlt: true }\n    ]\n  },\n  { id: "deadlock"',
     'abilities: [\n      { key: "C", name: "商标",       enName: "Trademark" },\n      { key: "Q", name: "猎头者",     enName: "Headhunter" },\n      { key: "E", name: "集合点",     enName: "Rendezvous" },\n      { key: "X", name: "巡演",       enName: "Tour de Force", isUlt: true }\n    ]\n  },\n  { id: "deadlock"'),

    # --- 霓虹 Neon（C/Q搞反了：C=快道FastLane, Q=接力雷电RelayBolt）---
    ('abilities: [\n      { key: "C", name: "高速通道",     enName: "Relay Bolt" },\n      { key: "Q", name: "闪电弹球",       enName: "Fast Lane" },\n      { key: "E", name: "充能疾驰",   enName: "High Gear" },\n      { key: "X", name: "超限暴走",       enName: "Overdrive", isUlt: true }\n    ]',
     'abilities: [\n      { key: "C", name: "快道",         enName: "Fast Lane" },\n      { key: "Q", name: "接力雷电",     enName: "Relay Bolt" },\n      { key: "E", name: "充能疾驰",     enName: "High Gear" },\n      { key: "X", name: "超限暴走",     enName: "Overdrive", isUlt: true }\n    ]'),

    # --- 奇乐 Killjoy ---
    ('abilities: [\n      { key: "C", name: "纳米蜂群",   enName: "Nanoswarm" },\n      { key: "Q", name: "哨戒炮台", enName: "Alarmbot" },\n      { key: "E", name: "自动哨兵",   enName: "Turret" },\n      { key: "X", name: "全面封锁",       enName: "Lockdown", isUlt: true }\n    ]',
     'abilities: [\n      { key: "C", name: "纳米蜂群",   enName: "Nanoswarm" },\n      { key: "Q", name: "警报机器人", enName: "Alarmbot" },\n      { key: "E", name: "炮塔",       enName: "Turret" },\n      { key: "X", name: "全面封锁",   enName: "Lockdown", isUlt: true }\n    ]'),

    # --- 贤者 Sage ---
    ('abilities: [\n      { key: "C", name: "玉城",     enName: "Barrier Orb" },\n      { key: "Q", name: "薄冰",     enName: "Slow Orb" },\n      { key: "E", name: "逢春",     enName: "Healing Orb" },\n      { key: "X", name: "再起",       enName: "Resurrection", isUlt: true }\n    ]',
     'abilities: [\n      { key: "C", name: "屏障宝珠", enName: "Barrier Orb" },\n      { key: "Q", name: "减速宝珠", enName: "Slow Orb" },\n      { key: "E", name: "治疗宝珠", enName: "Healing Orb" },\n      { key: "X", name: "复活",     enName: "Resurrection", isUlt: true }\n    ]'),

    # --- 铁臂 Breach ---
    ('abilities: [\n      { key: "C", name: "闪点突破",     enName: "Flashpoint" },\n      { key: "Q", name: "山崩地陷",       enName: "Aftershock" },\n      { key: "E", name: "震波冲击",     enName: "Fault Line" },\n      { key: "X", name: "惊雷卷地",   enName: "Rolling Thunder", isUlt: true }\n    ]',
     'abilities: [\n      { key: "C", name: "闪现点",     enName: "Flashpoint" },\n      { key: "Q", name: "余震",       enName: "Aftershock" },\n      { key: "E", name: "断层线",     enName: "Fault Line" },\n      { key: "X", name: "雷霆万钧",   enName: "Rolling Thunder", isUlt: true }\n    ]'),

    # --- 斯凯 Skye ---
    ('abilities: [\n      { key: "C", name: "辟林之虎",       enName: "Trailblazer" },\n      { key: "Q", name: "引路之隼",       enName: "Guiding Light" },\n      { key: "E", name: "愈生之息",       enName: "Regrowth" },\n      { key: "X", name: "追猎之灵",     enName: "Seekers", isUlt: true }\n    ]',
     'abilities: [\n      { key: "C", name: "开拓者",     enName: "Trailblazer" },\n      { key: "Q", name: "引路之光",   enName: "Guiding Light" },\n      { key: "E", name: "再生",       enName: "Regrowth" },\n      { key: "X", name: "猎食者",     enName: "Seekers", isUlt: true }\n    ]'),

    # --- 黑梦 Fade ---
    ('abilities: [\n      { key: "C", name: "鞭兽",       enName: "Prowler" },\n      { key: "Q", name: "幽爪",       enName: "Seize" },\n      { key: "E", name: "诡眼",       enName: "Haunt" },\n      { key: "X", name: "夜临",       enName: "Nightfall", isUlt: true }\n    ]',
     'abilities: [\n      { key: "C", name: "潜行者",     enName: "Prowler" },\n      { key: "Q", name: "束缚",       enName: "Seize" },\n      { key: "E", name: "魅影",       enName: "Haunt" },\n      { key: "X", name: "夜幕降临",   enName: "Nightfall", isUlt: true }\n    ]'),

    # --- 盖可 Gekko ---
    ('abilities: [\n      { key: "C", name: "眩晕光波",       enName: "Mosh Pit" },\n      { key: "Q", name: "顽皮搭档",       enName: "Dizzy" },\n      { key: "E", name: "嗨爆全场",       enName: "Wingman" },\n      { key: "X", name: "飞奔",       enName: "Thrash", isUlt: true }\n    ]',
     'abilities: [\n      { key: "C", name: "魔坑",       enName: "Mosh Pit" },\n      { key: "Q", name: "晕眩",       enName: "Dizzy" },\n      { key: "E", name: "僚机",       enName: "Wingman" },\n      { key: "X", name: "狂暴",       enName: "Thrash", isUlt: true }\n    ]'),

    # --- 不死鸟 Phoenix ---
    ('abilities: [\n      { key: "C", name: "火冒三丈",       enName: "Blaze" },\n      { key: "Q", name: "闪光曲球",       enName: "Curveball" },\n      { key: "E", name: "再火一回",       enName: "Hot Hands" },\n      { key: "X", name: "重来",       enName: "Run It Back", isUlt: true }\n    ]',
     'abilities: [\n      { key: "C", name: "烈焰",       enName: "Blaze" },\n      { key: "Q", name: "曲球",       enName: "Curveball" },\n      { key: "E", name: "火手",       enName: "Hot Hands" },\n      { key: "X", name: "倒流时光",   enName: "Run It Back", isUlt: true }\n    ]'),

    # --- 雷兹 Raze ---
    ('abilities: [\n      { key: "C", name: "惊喜翻腾",     enName: "Blast Pack" },\n      { key: "Q", name: "花车巡游", enName: "Boom Bot" },\n      { key: "E", name: "彩雷飞溢",       enName: "Paint Shells" },\n      { key: "X", name: "晚安焰火",   enName: "Showstopper", isUlt: true }\n    ]',
     'abilities: [\n      { key: "C", name: "爆破包",     enName: "Blast Pack" },\n      { key: "Q", name: "爆破机器人", enName: "Boom Bot" },\n      { key: "E", name: "彩绘弹",     enName: "Paint Shells" },\n      { key: "X", name: "压轴登场",   enName: "Showstopper", isUlt: true }\n    ]'),

    # --- 夜露 Yoru ---
    ('abilities: [\n      { key: "C", name: "不请自来",       enName: "Fakeout" },\n      { key: "Q", name: "出其不意",       enName: "Blindside" },\n      { key: "E", name: "裂隙",       enName: "Gatecrash" },\n      { key: "X", name: "鬼不觉",   enName: "Dimensional Drift", isUlt: true }\n    ]',
     'abilities: [\n      { key: "C", name: "伪装",       enName: "Fakeout" },\n      { key: "Q", name: "盲区",       enName: "Blindside" },\n      { key: "E", name: "砸门",       enName: "Gatecrash" },\n      { key: "X", name: "维度漂移",   enName: "Dimensional Drift", isUlt: true }\n    ]'),

    # --- 芮娜 Reyna ---
    ('abilities: [\n      { key: "C", name: "夺魄",      enName: "Leer" },\n      { key: "Q", name: "噬尽",       enName: "Devour" },\n      { key: "E", name: "逐散",       enName: "Dismiss" },\n      { key: "X", name: "女皇",       enName: "Empress", isUlt: true }\n    ]',
     'abilities: [\n      { key: "C", name: "邪视",       enName: "Leer" },\n      { key: "Q", name: "吞噬",       enName: "Devour" },\n      { key: "E", name: "遣散",       enName: "Dismiss" },\n      { key: "X", name: "女皇",       enName: "Empress", isUlt: true }\n    ]'),

    # --- 钢锁 Deadlock ---
    ('abilities: [\n      { key: "C", name: "声感陷阱", enName: "Sonic Sensor" },\n      { key: "Q", name: "重力捕网",     enName: "GravNet" },\n      { key: "E", name: "阻域屏障",     enName: "Barrier Mesh" },\n      { key: "X", name: "断魂索道",       enName: "Annihilation", isUlt: true }\n    ]',
     'abilities: [\n      { key: "C", name: "声波传感器", enName: "Sonic Sensor" },\n      { key: "Q", name: "引力网",     enName: "GravNet" },\n      { key: "E", name: "屏障网格",   enName: "Barrier Mesh" },\n      { key: "X", name: "歼灭",       enName: "Annihilation", isUlt: true }\n    ]'),

    # --- KAY/O ---
    ('abilities: [\n      { key: "C", name: "碎片溢出",       enName: "Frag/ment" },\n      { key: "Q", name: "零点嗅探",       enName: "ZERO/point" },\n      { key: "E", name: "闪存过载",       enName: "Suppression" },\n      { key: "X", name: "无效命令",       enName: "NULL/cmd", isUlt: true }\n    ]',
     'abilities: [\n      { key: "C", name: "碎片手雷",   enName: "Frag/ment" },\n      { key: "Q", name: "零点/点位",  enName: "ZERO/point" },\n      { key: "E", name: "压制",       enName: "Suppression" },\n      { key: "X", name: "无效/命令",  enName: "NULL/cmd", isUlt: true }\n    ]'),

    # --- 壹决 Iso ---
    ('abilities: [\n      { key: "C", name: "应变",       enName: "Undercut" },\n      { key: "Q", name: "双源",       enName: "Double Tap" },\n      { key: "E", name: "削减",       enName: "Contingency" },\n      { key: "X", name: "歼灭",       enName: "Kill Contract", isUlt: true }\n    ]',
     'abilities: [\n      { key: "C", name: "切低球",     enName: "Undercut" },\n      { key: "Q", name: "双击",       enName: "Double Tap" },\n      { key: "E", name: "应急预案",   enName: "Contingency" },\n      { key: "X", name: "死亡契约",   enName: "Kill Contract", isUlt: true }\n    ]'),

    # --- 零 Cypher ---
    ('abilities: [\n      { key: "C", name: "震慑丝线",     enName: "Trapwire" },\n      { key: "Q", name: "赛博囚笼",   enName: "Cyber Cage" },\n      { key: "E", name: "战术监控", enName: "Spycam" },\n      { key: "X", name: "神经解析",   enName: "Neural Theft", isUlt: true }\n    ]',
     'abilities: [\n      { key: "C", name: "绊线",       enName: "Trapwire" },\n      { key: "Q", name: "赛博牢笼",   enName: "Cyber Cage" },\n      { key: "E", name: "间谍相机",   enName: "Spycam" },\n      { key: "X", name: "神经窃取",   enName: "Neural Theft", isUlt: true }\n    ]'),

    # --- 暮蝶 Clove（修正繁体->简体）---
    ('abilities: [\n      { key: "C", name: "璞玿煙雲",       enName: "Pick-Me-Up" },\n      { key: "Q", name: "精神再生",       enName: "Meddle" },\n      { key: "E", name: "骇奇干涉",       enName: "Ruse", isSmoke: true },\n      { key: "X", name: "續命開關",       enName: "Not Dead Yet", isUlt: true }\n    ]',
     'abilities: [\n      { key: "C", name: "重拾",       enName: "Pick-Me-Up" },\n      { key: "Q", name: "干扰",       enName: "Meddle" },\n      { key: "E", name: "诡计",       enName: "Ruse", isSmoke: true },\n      { key: "X", name: "尚未死亡",   enName: "Not Dead Yet", isUlt: true }\n    ]'),

    # --- 维斯 Vyse（修正繁体->简体）---
    ('abilities: [\n      { key: "C", name: "断路铁壁",       enName: "Shear" },\n      { key: "Q", name: "弧光薔薇",   enName: "Arc Rose" },\n      { key: "E", name: "荆棘鐵網",     enName: "Razorvine" },\n      { key: "X", name: "叢棘盛開",   enName: "Steel Garden", isUlt: true }\n    ]',
     'abilities: [\n      { key: "C", name: "剪断",       enName: "Shear" },\n      { key: "Q", name: "弧光玫瑰",   enName: "Arc Rose" },\n      { key: "E", name: "荆棘藤",     enName: "Razorvine" },\n      { key: "X", name: "钢铁花园",   enName: "Steel Garden", isUlt: true }\n    ]'),

    # --- 海神 Harbor ---
    ('abilities: [\n      { key: "C", name: "海盾",       enName: "Cove", isSmoke: true, smokeForm: "ball" },\n      { key: "Q", name: "惊涛涌浪",       enName: "Cascade" },\n      { key: "E", name: "狂潮",       enName: "High Tide", isSmoke: true, smokeForm: "line" },\n      { key: "X", name: "爆泉",       enName: "Reckoning", isUlt: true }\n    ]',
     'abilities: [\n      { key: "C", name: "巨浪屏障",   enName: "Cove", isSmoke: true, smokeForm: "ball" },\n      { key: "Q", name: "巨浪冲击",   enName: "Cascade" },\n      { key: "E", name: "巨浪高墙",   enName: "High Tide", isSmoke: true, smokeForm: "line" },\n      { key: "X", name: "清算",       enName: "Reckoning", isUlt: true }\n    ]'),
]

for i, (old, new) in enumerate(ability_fixes):
    if old in content:
        content = content.replace(old, new)
        print(f"  技能修正 #{i+1} OK")
    else:
        # 尝试打印差异提示
        old_first = old.split('\n')[0][:80]
        print(f"  ⚠️  技能修正 #{i+1} 未匹配: {old_first}")

# ============================================================
# P0-7. 安全移除 4 个占位符英雄（从 AGENTS 数组）
# 精确：从 { id: "miks", ... 到 abilities 数组结束的下一个 ,
# ============================================================
def remove_agent(content, aid):
    # 匹配从 { id: "aid", 开始到 abilities 的 } 闭合，再到该对象结束的 },\n 或 ];\n
    marker_start = '{ id: "' + aid + '",'
    start = content.find(marker_start)
    if start < 0:
        print(f"  ⚠️  AGENTS中未找到 {aid}，可能已删除")
        return content
    # 找 abilities 数组和对象的结束
    # 找到该特工对象对应的最外层 { 匹配的 }
    # 从 { 开始 depth 计数
    brace_start = content.rfind('{', 0, start)
    if brace_start < start - 20:  # 太远，就是 marker 本身的起始 {
        brace_start = content.find('{', start - 5)
    # 实际上 marker_start 前面就是 {，让我以 { 为起点
    brace_start = content.find('{', start - 5)
    depth = 1
    i = brace_start + 1
    while i < len(content) and depth > 0:
        if content[i] == '{':
            depth += 1
        elif content[i] == '}':
            depth -= 1
        i += 1
    brace_end = i  # } 之后
    # 再吃掉后面的逗号和换行
    while brace_end < len(content) and content[brace_end] in ' \t\r\n,':
        brace_end += 1
    removed = content[brace_start:brace_end]
    print(f"  删除AGENTS中的 {aid}: {len(removed)}字符 -> {removed[:80]}...")
    return content[:brace_start] + content[brace_end:]

for aid in ["waylay", "tejo", "veto", "miks"]:
    content = remove_agent(content, aid)

# ============================================================
# P0-8. 安全移除 LINEUPS 中占位符英雄的键值对
# 精准匹配："miks": [ ... ], （深度匹配 [ ]）
# ============================================================
def remove_lineups_agent(content, aid):
    removed_total = 0
    while True:
        # 匹配 "aid": [
        marker = '"' + aid + '":'
        idx = content.find(marker)
        if idx < 0:
            break
        bracket_start = content.find('[', idx)
        if bracket_start < 0 or bracket_start - idx > 20:
            break
        depth = 1
        i = bracket_start + 1
        while i < len(content) and depth > 0:
            if content[i] == '[':
                depth += 1
            elif content[i] == ']':
                depth -= 1
            i += 1
        bracket_end = i
        # 再吃逗号和空格换行（可能还包含前面的空格）
        full_start = idx
        while full_start > 0 and content[full_start-1] in ' \t\r\n':
            full_start -= 1
        end = bracket_end
        while end < len(content) and content[end] in ' \t\r\n,':
            end += 1
        removed = content[full_start:end]
        removed_total += len(removed)
        content = content[:full_start] + content[end:]
    if removed_total > 0:
        print(f"  清理LINEUPS中的 {aid}: 共删除 {removed_total} 字符")
    else:
        print(f"  LINEUPS中无 {aid} 数据")
    return content

for aid in ["miks", "veto", "tejo", "waylay"]:
    content = remove_lineups_agent(content, aid)

# ============================================================
# 保存
# ============================================================
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✅ 修改完成，请用 node --check js/data.js 验证语法")
