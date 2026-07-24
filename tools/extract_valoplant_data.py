#!/usr/bin/env python3
"""
ValoPlant 数据提取工具
======================
从 valoplant.gg 的 Firebase Firestore 批量提取 Valorant lineup 数据。

使用方法：
1. 在浏览器中打开 https://valoplant.gg/zh/lineups
2. 按 F12 打开 DevTools → Network 标签
3. 刷新页面，等待 lineup 加载完成
4. 在 Network 中筛选 "firestore.googleapis.com"
5. 找到任意一个请求，右键 → Copy as cURL
6. 把 cURL 命令粘贴到下面 FIRESTORE_CURL 变量中
   （只需要一行，包含 --data 和 Authorization header 的那个）

运行：python3 extract_valoplant_data.py
输出：valoplant_lineups.json
"""

import json
import re
import subprocess
import sys
import os
import time

# ==========================================
# 配置区
# ==========================================

# 方式1：直接粘贴一个从 DevTools 复制的 Firestore cURL 命令
# 这个命令中包含 Authorization token，用于认证 Firebase 请求
FIRESTORE_CURL = None  # <-- 把 cURL 命令粘贴在这里（用三引号包裹）

# 方式2：如果不想手动粘贴，可以设置 Firebase API Key
# 脚本会尝试匿名登录获取 token
FIREBASE_API_KEY = "AIzaSyC38RKCgxKwAxbwCQj52LaPN754jUvhTPo"
FIREBASE_PROJECT_ID = "valoplant-cb7c6"

# 输出文件
OUTPUT_FILE = "valoplant_lineups.json"

# ==========================================
# 地图定义（从 main.dart.js 提取）
# ==========================================
MAPS = {
    0: "bind",
    1: "haven",
    2: "split",
    3: "ascent",
    4: "icebox",
    5: "breeze",
    6: "fracture",
    7: "pearl",
    8: "lotus",
    9: "sunset",
    10: "abyss",
    11: "corrode",
    12: "summit",
}

# ==========================================
# 英雄定义
# ==========================================
AGENTS = {
    0: {"id": "brimstone", "name": "炼狱", "role": "controller"},
    1: {"id": "viper", "name": "蝰蛇", "role": "controller"},
    2: {"id": "omen", "name": "幽影", "role": "controller"},
    3: {"id": "astra", "name": "星礈", "role": "controller"},
    4: {"id": "harbor", "name": "海神", "role": "controller"},
    5: {"id": "clove", "name": "蔻蕊", "role": "controller"},
    6: {"id": "miks", "name": "米克斯", "role": "controller"},
    7: {"id": "sova", "name": "猎枭", "role": "initiator"},
    8: {"id": "breach", "name": "布雷兹", "role": "initiator"},
    9: {"id": "skye", "name": "斯凯", "role": "initiator"},
    10: {"id": "kayo", "name": "KAY/O", "role": "initiator"},
    11: {"id": "fade", "name": "菲德", "role": "initiator"},
    12: {"id": "gekko", "name": "盖克", "role": "initiator"},
    13: {"id": "tejo", "name": "泰乔", "role": "initiator"},
    14: {"id": "killjoy", "name": "奇乐", "role": "sentinel"},
    15: {"id": "cypher", "name": "赛菲尔", "role": "sentinel"},
    16: {"id": "sage", "name": "贤者", "role": "sentinel"},
    17: {"id": "chamber", "name": "钱伯", "role": "sentinel"},
    18: {"id": "deadlock", "name": "死锁", "role": "sentinel"},
    19: {"id": "vyse", "name": "维斯", "role": "sentinel"},
    20: {"id": "veto", "name": "维托", "role": "sentinel"},
    21: {"id": "phoenix", "name": "凤凰", "role": "duelist"},
    22: {"id": "jett", "name": "捷风", "role": "duelist"},
    23: {"id": "reyna", "name": "蕾娜", "role": "duelist"},
    24: {"id": "raze", "name": "瑞兹", "role": "duelist"},
    25: {"id": "yoru", "name": "夜露", "role": "duelist"},
    26: {"id": "neon", "name": "霓虹", "role": "duelist"},
    27: {"id": "iso", "name": "伊索", "role": "duelist"},
    28: {"id": "waylay", "name": "韦蕾", "role": "duelist"},
}

# ==========================================
# 技能定义（需要确认每个英雄的技能ID）
# 以下是常见的技能ID模式，可能需要根据实际数据调整
# ==========================================
# 技能键位映射：C/Q/E/X
ABILITY_KEYS = {
    "brimstone": {"C": "stim_beacon", "Q": "incendiary", "E": "sky_smoke", "X": "orbital_strike"},
    "viper":      {"C": "poison_cloud", "Q": "toxic_screen", "E": "snake_bite", "X": "vipers_pit"},
    "omen":       {"C": "shrouded_step", "Q": "paranoia", "E": "dark_cover", "X": "from_the_shadows"},
    "astra":      {"C": "gravity_well", "Q": "nova_pulse", "E": "nebula", "X": "cosmic_divide"},
    "harbor":     {"C": "cove", "Q": "cascade", "E": "high_tide", "X": "reckoning"},
    "clove":      {"C": "pickmeup", "Q": "meddle", "E": "ruse", "X": "not_dead_yet"},
    "sova":       {"C": "owl_drone", "Q": "shock_bolt", "E": "recon_bolt", "X": "hunters_fury"},
    "killjoy":    {"C": "nanoswarm", "Q": "alarmbot", "E": "turret", "X": "lockdown"},
    "cypher":     {"C": "trapwire", "Q": "cyber_cage", "E": "spycam", "X": "neural_theft"},
    "sage":       {"C": "barrier_orb", "Q": "slow_orb", "E": "healing_orb", "X": "resurrection"},
    "phoenix":    {"C": "blaze", "Q": "curveball", "E": "hot_hands", "X": "run_it_back"},
    "jett":       {"C": "cloudburst", "Q": "updraft", "E": "tailwind", "X": "blade_storm"},
    "raze":       {"C": "blast_pack", "Q": "boom_bot", "E": "paint_shells", "X": "showstopper"},
    "breach":     {"C": "flashpoint", "Q": "aftershock", "E": "fault_line", "X": "rolling_thunder"},
    "skye":       {"C": "trailblazer", "Q": "guiding_light", "E": "regrowth", "X": "seekers"},
    "kayo":       {"C": "fragment", "Q": "flash_drive", "E": "zero_point", "X": "null_cmd"},
    "fade":       {"C": "prowler", "Q": "seize", "E": "haunt", "X": "nightfall"},
    "gekko":      {"C": "mosh_pit", "Q": "dizzy", "E": "wingman", "X": "thrash"},
    "reyna":      {"C": "leer", "Q": "devour", "E": "dismiss", "X": "empress"},
    "yoru":       {"C": "fakeout", "Q": "blindside", "E": "gatecrash", "X": "dimensional_drift"},
    "neon":       {"C": "relay_bolt", "Q": "fast_lane", "E": "high_gear", "X": "overdrive"},
    "chamber":    {"C": "trademark", "Q": "headhunter", "E": "rendezvous", "X": "tour_de_force"},
    "deadlock":   {"C": "sonic_sensor", "Q": "gravnet", "E": "barrier_mesh", "X": "annihilation"},
    "iso":        {"C": "undercut", "Q": "double_tap", "E": "contingency", "X": "kill_contract"},
    "vyse":       {"C": "shear", "Q": "arc_rose", "E": "razorvine", "X": "steel_garden"},
}


def get_anonymous_token():
    """尝试匿名 Firebase 认证获取 token"""
    import urllib.request
    url = f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={FIREBASE_API_KEY}"
    data = json.dumps({"returnSecureToken": True}).encode()
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            result = json.loads(resp.read())
            return result.get("idToken")
    except Exception as e:
        print(f"匿名认证失败: {e}")
        return None


def get_token_from_curl(curl_cmd):
    """从 cURL 命令中提取 Authorization token"""
    match = re.search(r'Authorization:\s*Bearer\s+(\S+)', curl_cmd)
    if match:
        return match.group(1)
    # 也可能在 -H 参数中
    match = re.search(r"-H\s+'Authorization:\s*Bearer\s+([^']+)'", curl_cmd)
    if match:
        return match.group(1)
    return None


def firestore_get(doc_path, token):
    """从 Firestore 读取单个文档"""
    import urllib.request
    url = f"https://firestore.googleapis.com/v1/projects/{FIREBASE_PROJECT_ID}/databases/(default)/documents/{doc_path}"
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {token}"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return None
        return None


def parse_firestore_value(field):
    """解析 Firestore 字段值"""
    if not field:
        return None
    fv = field.get("integerValue") or field.get("doubleValue") or \
         field.get("stringValue") or field.get("booleanValue") or \
         field.get("timestampValue") or field.get("arrayValue") or \
         field.get("mapValue") or field.get("nullValue")
    if isinstance(fv, dict):
        if "arrayValue" in fv:
            values = fv["arrayValue"].get("values", [])
            return [parse_firestore_value({"v": v}) for v in values]
        if "mapValue" in fv:
            fields = fv["mapValue"].get("fields", {})
            return {k: parse_firestore_value(v) for k, v in fields.items()}
    return fv


def extract_lineup_from_doc(doc):
    """从 Firestore 文档中提取 lineup 数据"""
    if not doc or "fields" not in doc:
        return None

    fields = doc["fields"]
    result = {}

    # 提取坐标（百分比 0-1 → 0-100）
    for key in ["xPercentAgent", "yPercentAgent", "xPercentAbility", "yPercentAbility"]:
        if key in fields:
            val = parse_firestore_value(fields[key])
            if val is not None:
                result[key] = round(val * 100, 1)

    # 提取其他字段
    for key in ["agentId", "abilityId", "imageUrls", "videoData"]:
        if key in fields:
            result[key] = parse_firestore_value(fields[key])

    return result


def main():
    print("=" * 60)
    print("ValoPlant 数据提取工具")
    print("=" * 60)

    # 获取 token
    token = None

    if FIRESTORE_CURL:
        print("\n[1] 从 cURL 命令中提取 token...")
        token = get_token_from_curl(FIRESTORE_CURL)
        if token:
            print(f"    Token 提取成功: {token[:20]}...")
        else:
            print("    未找到 token，尝试匿名认证...")
    else:
        print("\n[1] 未提供 cURL 命令，尝试匿名认证...")

    if not token:
        token = get_anonymous_token()
        if token:
            print(f"    匿名 token: {token[:20]}...")
        else:
            print("    匿名认证也失败了")
            print("\n请手动获取 token：")
            print("    1. 打开 https://valoplant.gg/zh/lineups")
            print("    2. F12 → Network → 筛选 firestore")
            print("    3. 复制任意请求的 cURL")
            print("    4. 粘贴到脚本中的 FIRESTORE_CURL 变量")
            sys.exit(1)

    # 尝试已知文档路径
    print("\n[2] 尝试读取 lineup 数据...")
    print("    文档ID格式: {mapIndex}-{agentIndex}-{abilityIndex}-{side}")

    all_lineups = []
    found_count = 0
    not_found_count = 0

    # 遍历所有地图和英雄组合
    for map_idx, map_name in MAPS.items():
        for agent_idx, agent_info in AGENTS.items():
            for side in ["attack", "defense"]:
                # 先尝试 index-index-index-side 格式
                doc_id = f"{map_idx}-{agent_idx}-0-{side}"
                doc_path = f"lineups/{doc_id}"

                doc = firestore_get(doc_path, token)
                if doc:
                    lineup = extract_lineup_from_doc(doc)
                    if lineup:
                        lineup["map"] = map_name
                        lineup["side"] = side
                        lineup["docId"] = doc_id
                        all_lineups.append(lineup)
                        found_count += 1
                        print(f"    ✓ {map_name}/{agent_info['name']}/{side} -> 坐标找到!")
                else:
                    not_found_count += 1

                time.sleep(0.1)  # 避免请求太快

    print(f"\n[3] 结果统计:")
    print(f"    找到: {found_count} 个 lineup")
    print(f"    未找到: {not_found_count} 个组合")

    if all_lineups:
        output_path = os.path.join(os.path.dirname(__file__) or ".", OUTPUT_FILE)
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(all_lineups, f, ensure_ascii=False, indent=2)
        print(f"    数据已保存到: {output_path}")

        # 也输出一个 data.js 格式的摘要
        print(f"\n[4] 数据预览:")
        for l in all_lineups[:5]:
            print(f"    地图={l.get('map')} 进攻方={l.get('side')}")
            print(f"      站位: ({l.get('xPercentAgent')}, {l.get('yPercentAgent')})")
            print(f"      落点: ({l.get('xPercentAbility')}, {l.get('yPercentAbility')})")
            print()
    else:
        print("\n    未找到任何 lineup 数据")
        print("    可能原因：")
        print("    1. 文档ID格式不对（需要从实际 Firestore 请求中确认）")
        print("    2. Firebase Security Rules 阻止了匿名访问")
        print("    3. 数据库结构不是简单的 {map}-{agent}-{ability}-{side} 格式")
        print("\n    建议：在浏览器 DevTools 中查看实际的 Firestore 请求路径")

    print("\n完成!")


if __name__ == "__main__":
    main()
