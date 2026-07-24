import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# ============================================================
# 1. 删除空 tags: []（保留有内容的 tags）
# ============================================================
content = re.sub(r',\s*\n\s*tags:\s*\[\s*\]', '', content)
content = re.sub(r'tags:\s*\[\s*\],\s*\n', '', content)

# ============================================================
# 2. 修正捷风 smokeType：none -> ball（C技能瞬云是烟雾）
# ============================================================
content = content.replace(
    '{ id: "jett", name: "捷风", enName: "Jett", role: "duelist", smokeType: "none",',
    '{ id: "jett", name: "捷风", enName: "Jett", role: "duelist", smokeType: "ball",'
)

# ============================================================
# 3. 修正蝰蛇 smokeType：line -> both（C毒幕球烟+Q毒屏线烟）
# ============================================================
content = content.replace(
    '{ id: "viper", name: "蝰蛇", enName: "Viper", role: "controller", smokeType: "line",',
    '{ id: "viper", name: "蝰蛇", enName: "Viper", role: "controller", smokeType: "both",'
)

# ============================================================
# 4. 修正蝰蛇Q技能名：翳云 -> 毒幕屏障（官方名）
# ============================================================
content = content.replace(
    '{ key: "Q", name: "翳云",   enName: "Toxic Screen",  isSmoke: true, smokeForm: "line" }',
    '{ key: "Q", name: "毒幕屏障", enName: "Toxic Screen", isSmoke: true, smokeForm: "line" }'
)

# ============================================================
# 5. 修正 Chamber：尚勃勒 -> 钱博尔（官方名）
# ============================================================
content = content.replace(
    '{ id: "chamber", name: "尚勃勒", enName: "Chamber", role: "sentinel", smokeType: "none",',
    '{ id: "chamber", name: "钱博尔", enName: "Chamber", role: "sentinel", smokeType: "none",'
)

# ============================================================
# 6. 修正 Chamber 技能名（官方名）
# ============================================================
content = content.replace(
    'abilities: [\n      { key: "C", name: "贵宾限行",       enName: "Trademark" },\n      { key: "Q", name: "金牌猎头",       enName: "Headhunter" },\n      { key: "E", name: "闪转自如",       enName: "Rendezvous" },\n      { key: "X", name: "孤高火力",   enName: "Tour de Force", isUlt: true }\n    ]\n  },\n  { id: "deadlock"',
    'abilities: [\n      { key: "C", name: "商标",       enName: "Trademark" },\n      { key: "Q", name: "猎头者",     enName: "Headhunter" },\n      { key: "E", name: "集合点",     enName: "Rendezvous" },\n      { key: "X", name: "巡演",       enName: "Tour de Force", isUlt: true }\n    ]\n  },\n  { id: "deadlock"'
)

# ============================================================
# 7. 修正霓虹(C/霓虹)技能顺序：官方 C=Fast Lane 快道，Q=Relay Bolt 接力雷电
#    原始：C高速通道+Q闪电弹球 搞反了，修正
# ============================================================
content = content.replace(
    'abilities: [\n      { key: "C", name: "高速通道",     enName: "Relay Bolt" },\n      { key: "Q", name: "闪电弹球",       enName: "Fast Lane" },\n      { key: "E", name: "充能疾驰",   enName: "High Gear" },\n      { key: "X", name: "超限暴走",       enName: "Overdrive", isUlt: true }\n    ]',
    'abilities: [\n      { key: "C", name: "快道",         enName: "Fast Lane" },\n      { key: "Q", name: "接力雷电",     enName: "Relay Bolt" },\n      { key: "E", name: "充能疾驰",     enName: "High Gear" },\n      { key: "X", name: "超限暴走",     enName: "Overdrive", isUlt: true }\n    ]'
)

# ============================================================
# 8. 修正奇乐技能名（Q=警报机器人，E=炮塔）
# ============================================================
content = content.replace(
    'abilities: [\n      { key: "C", name: "纳米蜂群",   enName: "Nanoswarm" },\n      { key: "Q", name: "哨戒炮台", enName: "Alarmbot" },\n      { key: "E", name: "自动哨兵",   enName: "Turret" },\n      { key: "X", name: "全面封锁",       enName: "Lockdown", isUlt: true }\n    ]',
    'abilities: [\n      { key: "C", name: "纳米蜂群",   enName: "Nanoswarm" },\n      { key: "Q", name: "警报机器人", enName: "Alarmbot" },\n      { key: "E", name: "炮塔",       enName: "Turret" },\n      { key: "X", name: "全面封锁",   enName: "Lockdown", isUlt: true }\n    ]'
)

# ============================================================
# 9. 修正贤者技能名（官方名更准确）
# ============================================================
content = content.replace(
    'abilities: [\n      { key: "C", name: "玉城",     enName: "Barrier Orb" },\n      { key: "Q", name: "薄冰",     enName: "Slow Orb" },\n      { key: "E", name: "逢春",     enName: "Healing Orb" },\n      { key: "X", name: "再起",       enName: "Resurrection", isUlt: true }\n    ]',
    'abilities: [\n      { key: "C", name: "屏障宝珠", enName: "Barrier Orb" },\n      { key: "Q", name: "减速宝珠", enName: "Slow Orb" },\n      { key: "E", name: "治疗宝珠", enName: "Healing Orb" },\n      { key: "X", name: "复活",     enName: "Resurrection", isUlt: true }\n    ]'
)

# ============================================================
# 10. 修正铁臂技能名
# ============================================================
content = content.replace(
    'abilities: [\n      { key: "C", name: "闪点突破",     enName: "Flashpoint" },\n      { key: "Q", name: "山崩地陷",       enName: "Aftershock" },\n      { key: "E", name: "震波冲击",     enName: "Fault Line" },\n      { key: "X", name: "惊雷卷地",   enName: "Rolling Thunder", isUlt: true }\n    ]',
    'abilities: [\n      { key: "C", name: "闪现点",     enName: "Flashpoint" },\n      { key: "Q", name: "余震",       enName: "Aftershock" },\n      { key: "E", name: "断层线",     enName: "Fault Line" },\n      { key: "X", name: "雷霆万钧",   enName: "Rolling Thunder", isUlt: true }\n    ]'
)

# ============================================================
# 11. 修正斯凯技能名
# ============================================================
content = content.replace(
    'abilities: [\n      { key: "C", name: "辟林之虎",       enName: "Trailblazer" },\n      { key: "Q", name: "引路之隼",       enName: "Guiding Light" },\n      { key: "E", name: "愈生之息",       enName: "Regrowth" },\n      { key: "X", name: "追猎之灵",     enName: "Seekers", isUlt: true }\n    ]',
    'abilities: [\n      { key: "C", name: "开拓者",     enName: "Trailblazer" },\n      { key: "Q", name: "引路之光",   enName: "Guiding Light" },\n      { key: "E", name: "再生",       enName: "Regrowth" },\n      { key: "X", name: "猎食者",     enName: "Seekers", isUlt: true }\n    ]'
)

# ============================================================
# 12. 修正黑梦技能名
# ============================================================
content = content.replace(
    'abilities: [\n      { key: "C", name: "鞭兽",       enName: "Prowler" },\n      { key: "Q", name: "幽爪",       enName: "Seize" },\n      { key: "E", name: "诡眼",       enName: "Haunt" },\n      { key: "X", name: "夜临",       enName: "Nightfall", isUlt: true }\n    ]',
    'abilities: [\n      { key: "C", name: "潜行者",     enName: "Prowler" },\n      { key: "Q", name: "束缚",       enName: "Seize" },\n      { key: "E", name: "魅影",       enName: "Haunt" },\n      { key: "X", name: "夜幕降临",   enName: "Nightfall", isUlt: true }\n    ]'
)

# ============================================================
# 13. 修正盖可技能名
# ============================================================
content = content.replace(
    'abilities: [\n      { key: "C", name: "眩晕光波",       enName: "Mosh Pit" },\n      { key: "Q", name: "顽皮搭档",       enName: "Dizzy" },\n      { key: "E", name: "嗨爆全场",       enName: "Wingman" },\n      { key: "X", name: "飞奔",       enName: "Thrash", isUlt: true }\n    ]',
    'abilities: [\n      { key: "C", name: "魔坑",       enName: "Mosh Pit" },\n      { key: "Q", name: "晕眩",       enName: "Dizzy" },\n      { key: "E", name: "僚机",       enName: "Wingman" },\n      { key: "X", name: "狂暴",       enName: "Thrash", isUlt: true }\n    ]'
)

# ============================================================
# 14. 修正不死鸟技能名
# ============================================================
content = content.replace(
    'abilities: [\n      { key: "C", name: "火冒三丈",       enName: "Blaze" },\n      { key: "Q", name: "闪光曲球",       enName: "Curveball" },\n      { key: "E", name: "再火一回",       enName: "Hot Hands" },\n      { key: "X", name: "重来",       enName: "Run It Back", isUlt: true }\n    ]',
    'abilities: [\n      { key: "C", name: "烈焰",       enName: "Blaze" },\n      { key: "Q", name: "曲球",       enName: "Curveball" },\n      { key: "E", name: "火手",       enName: "Hot Hands" },\n      { key: "X", name: "倒流时光",   enName: "Run It Back", isUlt: true }\n    ]'
)

# ============================================================
# 15. 修正雷兹技能名
# ============================================================
content = content.replace(
    'abilities: [\n      { key: "C", name: "惊喜翻腾",     enName: "Blast Pack" },\n      { key: "Q", name: "花车巡游", enName: "Boom Bot" },\n      { key: "E", name: "彩雷飞溢",       enName: "Paint Shells" },\n      { key: "X", name: "晚安焰火",   enName: "Showstopper", isUlt: true }\n    ]',
    'abilities: [\n      { key: "C", name: "爆破包",     enName: "Blast Pack" },\n      { key: "Q", name: "爆破机器人", enName: "Boom Bot" },\n      { key: "E", name: "彩绘弹",     enName: "Paint Shells" },\n      { key: "X", name: "压轴登场",   enName: "Showstopper", isUlt: true }\n    ]'
)

# ============================================================
# 16. 修正夜露技能名
# ============================================================
content = content.replace(
    'abilities: [\n      { key: "C", name: "不请自来",       enName: "Fakeout" },\n      { key: "Q", name: "出其不意",       enName: "Blindside" },\n      { key: "E", name: "裂隙",       enName: "Gatecrash" },\n      { key: "X", name: "鬼不觉",   enName: "Dimensional Drift", isUlt: true }\n    ]',
    'abilities: [\n      { key: "C", name: "伪装",       enName: "Fakeout" },\n      { key: "Q", name: "盲区",       enName: "Blindside" },\n      { key: "E", name: "砸门",       enName: "Gatecrash" },\n      { key: "X", name: "维度漂移",   enName: "Dimensional Drift", isUlt: true }\n    ]'
)

# ============================================================
# 17. 修正芮娜技能名
# ============================================================
content = content.replace(
    'abilities: [\n      { key: "C", name: "夺魄",      enName: "Leer" },\n      { key: "Q", name: "噬尽",       enName: "Devour" },\n      { key: "E", name: "逐散",       enName: "Dismiss" },\n      { key: "X", name: "女皇",       enName: "Empress", isUlt: true }\n    ]',
    'abilities: [\n      { key: "C", name: "邪视",       enName: "Leer" },\n      { key: "Q", name: "吞噬",       enName: "Devour" },\n      { key: "E", name: "遣散",       enName: "Dismiss" },\n      { key: "X", name: "女皇",       enName: "Empress", isUlt: true }\n    ]'
)

# ============================================================
# 18. 修正钢锁技能名
# ============================================================
content = content.replace(
    'abilities: [\n      { key: "C", name: "声感陷阱", enName: "Sonic Sensor" },\n      { key: "Q", name: "重力捕网",     enName: "GravNet" },\n      { key: "E", name: "阻域屏障",     enName: "Barrier Mesh" },\n      { key: "X", name: "断魂索道",       enName: "Annihilation", isUlt: true }\n    ]',
    'abilities: [\n      { key: "C", name: "声波传感器", enName: "Sonic Sensor" },\n      { key: "Q", name: "引力网",     enName: "GravNet" },\n      { key: "E", name: "屏障网格",   enName: "Barrier Mesh" },\n      { key: "X", name: "歼灭",       enName: "Annihilation", isUlt: true }\n    ]'
)

# ============================================================
# 19. 修正 KAY/O 技能名
# ============================================================
content = content.replace(
    'abilities: [\n      { key: "C", name: "碎片溢出",       enName: "Frag/ment" },\n      { key: "Q", name: "零点嗅探",       enName: "ZERO/point" },\n      { key: "E", name: "闪存过载",       enName: "Suppression" },\n      { key: "X", name: "无效命令",       enName: "NULL/cmd", isUlt: true }\n    ]',
    'abilities: [\n      { key: "C", name: "碎片手雷",   enName: "Frag/ment" },\n      { key: "Q", name: "零点/点位",  enName: "ZERO/point" },\n      { key: "E", name: "压制",       enName: "Suppression" },\n      { key: "X", name: "无效/命令",  enName: "NULL/cmd", isUlt: true }\n    ]'
)

# ============================================================
# 20. 修正壹决技能名
# ============================================================
content = content.replace(
    'abilities: [\n      { key: "C", name: "应变",       enName: "Undercut" },\n      { key: "Q", name: "双源",       enName: "Double Tap" },\n      { key: "E", name: "削减",       enName: "Contingency" },\n      { key: "X", name: "歼灭",       enName: "Kill Contract", isUlt: true }\n    ]',
    'abilities: [\n      { key: "C", name: "切低球",     enName: "Undercut" },\n      { key: "Q", name: "双击",       enName: "Double Tap" },\n      { key: "E", name: "应急预案",   enName: "Contingency" },\n      { key: "X", name: "死亡契约",   enName: "Kill Contract", isUlt: true }\n    ]'
)

# ============================================================
# 21. 修正零技能名（赛博囚笼->赛博牢笼，E:间谍相机，X:神经窃取）
# ============================================================
content = content.replace(
    'abilities: [\n      { key: "C", name: "震慑丝线",     enName: "Trapwire" },\n      { key: "Q", name: "赛博囚笼",   enName: "Cyber Cage" },\n      { key: "E", name: "战术监控", enName: "Spycam" },\n      { key: "X", name: "神经解析",   enName: "Neural Theft", isUlt: true }\n    ]',
    'abilities: [\n      { key: "C", name: "绊线",       enName: "Trapwire" },\n      { key: "Q", name: "赛博牢笼",   enName: "Cyber Cage" },\n      { key: "E", name: "间谍相机",   enName: "Spycam" },\n      { key: "X", name: "神经窃取",   enName: "Neural Theft", isUlt: true }\n    ]'
)

# ============================================================
# 22. 修正暮蝶(Clove)技能名 - 修正繁体字为简体
# ============================================================
content = content.replace(
    'abilities: [\n      { key: "C", name: "璞玿煙雲",       enName: "Pick-Me-Up" },\n      { key: "Q", name: "精神再生",       enName: "Meddle" },\n      { key: "E", name: "骇奇干涉",       enName: "Ruse", isSmoke: true },\n      { key: "X", name: "續命開關",       enName: "Not Dead Yet", isUlt: true }\n    ]',
    'abilities: [\n      { key: "C", name: "重拾",       enName: "Pick-Me-Up" },\n      { key: "Q", name: "干扰",       enName: "Meddle" },\n      { key: "E", name: "诡计",       enName: "Ruse", isSmoke: true },\n      { key: "X", name: "尚未死亡",   enName: "Not Dead Yet", isUlt: true }\n    ]'
)

# ============================================================
# 23. 修正维斯(Vyse)技能名 - 修正繁体字
# ============================================================
content = content.replace(
    'abilities: [\n      { key: "C", name: "断路铁壁",       enName: "Shear" },\n      { key: "Q", name: "弧光薔薇",   enName: "Arc Rose" },\n      { key: "E", name: "荆棘鐵網",     enName: "Razorvine" },\n      { key: "X", name: "叢棘盛開",   enName: "Steel Garden", isUlt: true }\n    ]',
    'abilities: [\n      { key: "C", name: "剪断",       enName: "Shear" },\n      { key: "Q", name: "弧光玫瑰",   enName: "Arc Rose" },\n      { key: "E", name: "荆棘藤",     enName: "Razorvine" },\n      { key: "X", name: "钢铁花园",   enName: "Steel Garden", isUlt: true }\n    ]'
)

# ============================================================
# 24. 修正海神(Harbor)技能名
# ============================================================
content = content.replace(
    'abilities: [\n      { key: "C", name: "海盾",       enName: "Cove", isSmoke: true, smokeForm: "ball" },\n      { key: "Q", name: "惊涛涌浪",       enName: "Cascade" },\n      { key: "E", name: "狂潮",       enName: "High Tide", isSmoke: true, smokeForm: "line" },\n      { key: "X", name: "爆泉",       enName: "Reckoning", isUlt: true }\n    ]',
    'abilities: [\n      { key: "C", name: "巨浪屏障",   enName: "Cove", isSmoke: true, smokeForm: "ball" },\n      { key: "Q", name: "巨浪冲击",   enName: "Cascade" },\n      { key: "E", name: "巨浪高墙",   enName: "High Tide", isSmoke: true, smokeForm: "line" },\n      { key: "X", name: "清算",       enName: "Reckoning", isUlt: true }\n    ]'
)

# ============================================================
# 25. 移除 4 个占位符英雄：Miks, Veto, Tejo, Waylay
#     同时也要清理 LINEUPS 中对应的引用
# ============================================================
def remove_agent_block(content, agent_id):
    # 匹配该特工的整个定义块（从 { id: "xxx", 到下一个 { id: 或 ], 之间的内容）
    pattern = r'\{\s*id:\s*"' + re.escape(agent_id) + r'",[\s\S]*?\}\s*,\s*\n(?=\s*(?://|$|\{ id:))'
    match = re.search(pattern, content)
    if match:
        content = content[:match.start()] + content[match.end():]
    return content

# 逐个删除（从后往前避免索引问题，但逐个正则更简单）
content = remove_agent_block(content, "waylay")
content = remove_agent_block(content, "tejo")
content = remove_agent_block(content, "veto")
content = remove_agent_block(content, "miks")

# 也清理 LINEUPS 中对应英雄（但保留其他内容）
for aid in ["miks", "veto", "tejo", "waylay"]:
    # 移除 LINEUPS 中每个地图下的该英雄条目
    pattern = r'"\s*' + re.escape(aid) + r'"\s*:\s*\[[\s\S]*?\]\s*,'
    content = re.sub(pattern, '', content)

# ============================================================
# 26. 修改 14 张地图中文名（官方名）
# ============================================================
map_name_fixes = {
    # id: (错误名, 官方名)
    "bind": ("源工重镇", "遗落境地"),
    "haven": ("隐世修所", "隐世修所"),  # 没问题，保留
    "split": ("霓虹町", "分裂"),
    "ascent": ("亚海悬城", "亚海悬城"),  # 官方名
    "breeze": ("微风岛屿", "微风岛屿"),  # 官方名
    "pearl": ("深海明珠", "深海明珠"),  # 官方名
    "lotus": ("莲华古城", "莲华古城"),  # 官方名
    "fracture": ("裂变峡谷", "裂变峡谷"),  # 官方名
    "icebox": ("冰霜", "冰霜"),  # 官方名正确
    "sunset": ("落日", "落日"),  # 官方名
    "abyss": ("深渊", "深渊"),  # 官方名
    "corrode": ("锈蚀", "腐蚀"),
    "summit": ("巅峰", "巅峰"),
}

# 针对 bind 和 split、corrode 进行精确替换
for mid, (old, new) in map_name_fixes.items():
    if old == new:
        continue
    pattern = r'id:\s*"' + re.escape(mid) + r'",\s*\n\s*name:\s*"' + re.escape(old) + r'",'
    repl = 'id: "' + mid + '",\n    name: "' + new + '",'
    content = re.sub(pattern, repl, content)

# ============================================================
# 保存
# ============================================================
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ data.js 已修改完成！")
print()
print("已执行修改：")
print("  1. 删除所有空 tags: []")
print("  2. 捷风 smokeType: none -> ball（C技能瞬云是烟雾）")
print("  3. 蝰蛇 smokeType: line -> both（C球烟+Q线烟）")
print("  4. 尚勃勒 -> 钱博尔")
print("  5. 修正 20+ 英雄的技能名官方中文")
print("  6. 修复霓虹C/Q技能顺序搞反的问题")
print("  7. 移除 4 个占位符英雄（Miks/Veto/Tejo/Waylay）")
print("  8. 修正繁体字技能名为简体")
print("  9. 修正地图名：源工重镇->遗落境地, 霓虹町->分裂, 锈蚀->腐蚀")
