#!/usr/bin/env python3
"""
ValoPlant.gg Firestore 数据爬取工具
===================================
从 valoplant.gg 的 Firebase Firestore 批量爬取 Valorant lineup 数据。

使用方法：
    python3 crawl_valoplant.py

依赖安装：
    pip install requests

输出文件：
    valoplant_lineups.json  - 原始爬取数据（JSON 格式）
    valoplant_summary.json  - 统计摘要

代理设置（可选）：
    export HTTP_PROXY=http://127.0.0.1:7890
    export HTTPS_PROXY=http://127.0.0.1:7890
    python3 crawl_valoplant.py

注意事项：
    - 该脚本使用 Firebase REST API，不需要浏览器
    - 优先尝试匿名认证；若失败则尝试无认证直接访问
    - 遍历所有 mapIndex-agentId-abilityId-side 组合
    - 坐标从 0.0~1.0 范围转换为 0~100 范围
"""

import json
import os
import sys
import time
import logging
from datetime import datetime

try:
    import requests
except ImportError:
    print("正在安装 requests 库...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "requests"])
    import requests

# ==========================================
# 日志配置
# ==========================================
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger(__name__)

# ==========================================
# Firebase 配置
# ==========================================
FIREBASE_PROJECT_ID = "valoplant-cb7c6"
FIREBASE_API_KEY = "AIzaSyC38RKCgxKwAxbwCQj52LaPN754jUvhTPo"
FIRESTORE_BASE_URL = (
    f"https://firestore.googleapis.com/v1/projects/{FIREBASE_PROJECT_ID}"
    f"/databases/(default)/documents"
)
IDENTITY_URL = (
    f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={FIREBASE_API_KEY}"
)

# ==========================================
# 爬取参数
# ==========================================
# 最大重试次数（单次请求）
MAX_RETRIES = 3
# 重试间隔基数（秒），实际等待 = RETRY_DELAY * (2 ** attempt)
RETRY_DELAY = 1.0
# 每次请求之间的间隔（秒），避免触发限流
REQUEST_INTERVAL = 0.15
# 遇到连续 404 时跳过当前 abilityId 的阈值
CONSECUTIVE_404_THRESHOLD = 4
# 请求超时时间（秒）
REQUEST_TIMEOUT = 15

# ==========================================
# 地图索引映射
# mapIndex → 地图名称
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
# 英雄索引映射
# agentId → 英雄信息
# 索引值以 10 为步长递增，需要遍历所有可能的索引
# ==========================================
AGENTS = {
    0:   {"id": "breach",     "name": "铁臂",     "enName": "Breach"},
    10:  {"id": "brimstone",  "name": "炼狱",     "enName": "Brimstone"},
    20:  {"id": "cypher",     "name": "零",       "enName": "Cypher"},
    30:  {"id": "jett",       "name": "捷风",     "enName": "Jett"},
    40:  {"id": "killjoy",    "name": "奇乐",     "enName": "Killjoy"},
    50:  {"id": "omen",       "name": "幽影",     "enName": "Omen"},
    60:  {"id": "phoenix",    "name": "不死鸟",   "enName": "Phoenix"},
    70:  {"id": "raze",       "name": "雷兹",     "enName": "Raze"},
    80:  {"id": "reyna",      "name": "芮娜",     "enName": "Reyna"},
    90:  {"id": "sage",       "name": "贤者",     "enName": "Sage"},
    100: {"id": "sova",       "name": "猎枭",     "enName": "Sova"},
    110: {"id": "viper",      "name": "蝰蛇",     "enName": "Viper"},
    120: {"id": "skye",       "name": "斯凯",     "enName": "Skye"},
    130: {"id": "yoru",       "name": "夜露",     "enName": "Yoru"},
    140: {"id": "astra",      "name": "星礈",     "enName": "Astra"},
    150: {"id": "kayo",       "name": "KAY/O",    "enName": "KAY/O"},
    160: {"id": "chamber",    "name": "尚勃勒",   "enName": "Chamber"},
    170: {"id": "neon",       "name": "霓虹",     "enName": "Neon"},
    180: {"id": "fade",       "name": "黑梦",     "enName": "Fade"},
    190: {"id": "harbor",     "name": "海神",     "enName": "Harbor"},
    200: {"id": "gekko",      "name": "盖可",     "enName": "Gekko"},
    210: {"id": "deadlock",   "name": "钢锁",     "enName": "Deadlock"},
    220: {"id": "iso",        "name": "壹决",     "enName": "Iso"},
    230: {"id": "clove",      "name": "暮蝶",     "enName": "Clove"},
    240: {"id": "vyse",       "name": "维斯",     "enName": "Vyse"},
    250: {"id": "tejo",       "name": "戴侯",     "enName": "Tejo"},
    260: {"id": "waylay",     "name": "维蕾",     "enName": "Waylay"},
    270: {"id": "veto",       "name": "维托",     "enName": "Veto"},
    280: {"id": "miks",       "name": "Miks",     "enName": "Miks"},
}

# ==========================================
# 技能数量上限
# 每个英雄最多 4 个技能（C/Q/E/X），abilityId 从 0 开始编号
# 遍历时从 0 到 MAX_ABILITY_INDEX-1
# ==========================================
MAX_ABILITY_INDEX = 5  # 覆盖 0,1,2,3,4（通常只有 0-3）

# ==========================================
# 两侧阵营
# ==========================================
SIDES = ["attack", "defense"]

# ==========================================
# 输出文件路径（与脚本同目录）
# ==========================================
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_FILE = os.path.join(SCRIPT_DIR, "valoplant_lineups.json")
SUMMARY_FILE = os.path.join(SCRIPT_DIR, "valoplant_summary.json")


# ==========================================
# 工具函数
# ==========================================

def parse_firestore_value(field):
    """
    递归解析 Firestore REST API 返回的字段值。
    
    Firestore 字段格式示例：
        "doubleValue": 0.35
        "stringValue": "abc"
        "arrayValue": {"values": [...]}
        "mapValue": {"fields": {...}}
        "integerValue": "42"
        "nullValue": null
    """
    if not field or not isinstance(field, dict):
        return None

    # 按优先级提取原始值
    raw = (
        field.get("doubleValue")
        or field.get("integerValue")
        or field.get("stringValue")
        or field.get("booleanValue")
        or field.get("timestampValue")
        or field.get("nullValue")
    )

    # 如果有原始值且不是复合类型，直接返回
    if raw is not None or "nullValue" in field:
        # integerValue 是字符串格式，需要转换
        if "integerValue" in field and "doubleValue" not in field:
            try:
                return int(raw)
            except (ValueError, TypeError):
                return raw
        return raw

    # 处理数组类型
    if "arrayValue" in field:
        values = field["arrayValue"].get("values", [])
        return [parse_firestore_value({"v": v}) for v in values]

    # 处理映射/对象类型
    if "mapValue" in field:
        nested_fields = field["mapValue"].get("fields", {})
        return {k: parse_firestore_value(v) for k, v in nested_fields.items()}

    return None


def get_requests_session():
    """
    创建 requests Session，自动读取环境变量中的代理设置。
    支持 HTTP_PROXY / HTTPS_PROXY / ALL_PROXY 环境变量。
    """
    session = requests.Session()
    # requests 会自动读取环境变量中的代理设置
    # 这里也可以手动设置
    proxies = {}
    for env_key in ["HTTP_PROXY", "http_proxy", "HTTPS_PROXY", "https_proxy",
                     "ALL_PROXY", "all_proxy"]:
        val = os.environ.get(env_key)
        if val:
            logger.info(f"检测到代理环境变量: {env_key}={val}")
            if "HTTPS" in env_key.upper() or "ALL" in env_key.upper():
                proxies["https"] = val
                proxies["http"] = val
            else:
                proxies["http"] = val
                if "https" not in proxies:
                    proxies["https"] = val
    if proxies:
        session.proxies.update(proxies)
    return session


def get_anonymous_token(session):
    """
    尝试 Firebase 匿名认证，获取 idToken。
    
    Firebase Identity Toolkit signUp endpoint 支持匿名注册，
    返回的 idToken 可用于后续 Firestore 请求的 Authorization header。
    
    参数:
        session: requests.Session 实例
        
    返回:
        str | None: 成功返回 token，失败返回 None
    """
    logger.info("尝试 Firebase 匿名认证...")
    payload = {"returnSecureToken": True}
    try:
        resp = session.post(
            IDENTITY_URL,
            json=payload,
            timeout=REQUEST_TIMEOUT,
        )
        if resp.status_code == 200:
            data = resp.json()
            token = data.get("idToken")
            if token:
                expires_in = data.get("expiresIn", "?")
                logger.info(f"匿名认证成功，token 有效期: {expires_in} 秒")
                logger.info(f"Token 前缀: {token[:20]}...")
                return token
            else:
                logger.warning("匿名认证响应中无 idToken")
                return None
        else:
            logger.warning(f"匿名认证失败，HTTP {resp.status_code}: {resp.text[:200]}")
            return None
    except requests.RequestException as e:
        logger.warning(f"匿名认证请求异常: {e}")
        return None


def refresh_token_if_needed(session, token, token_expiry_time):
    """
    检查 token 是否即将过期，如果是则重新获取。
    
    Firebase 匿名 token 默认有效期 3600 秒（1 小时）。
    提前 5 分钟刷新。
    
    参数:
        session: requests.Session 实例
        token: 当前 token
        token_expiry_time: token 过期的 Unix 时间戳
        
    返回:
        (str, float): (新 token, 新过期时间)
    """
    now = time.time()
    # 提前 300 秒（5 分钟）刷新
    if now + 300 > token_expiry_time:
        logger.info("Token 即将过期，重新获取...")
        new_token = get_anonymous_token(session)
        if new_token:
            return new_token, now + 3600  # 默认有效期 1 小时
        else:
            logger.warning("Token 刷新失败，继续使用旧 token")
    return token, token_expiry_time


def firestore_get_document(session, collection, doc_id, token=None):
    """
    从 Firestore REST API 读取单个文档。
    
    参数:
        session: requests.Session 实例
        collection: 集合名称（如 "lineups"）
        doc_id: 文档 ID（如 "0-30-1-attack"）
        token: 可选的 Bearer token
        
    返回:
        dict | None: 成功返回文档 JSON，404 返回 None，其他错误也返回 None
    """
    url = f"{FIRESTORE_BASE_URL}/{collection}/{doc_id}"
    headers = {}
    if token:
        headers["Authorization"] = f"Bearer {token}"

    for attempt in range(MAX_RETRIES):
        try:
            resp = session.get(url, headers=headers, timeout=REQUEST_TIMEOUT)

            if resp.status_code == 200:
                return resp.json()

            if resp.status_code == 404:
                # 404 不需要重试，文档确实不存在
                return None

            if resp.status_code == 429:
                # 被限流，等待更长时间
                wait = RETRY_DELAY * (2 ** attempt) * 2
                logger.debug(f"限流 (429)，等待 {wait:.1f}s 后重试: {doc_id}")
                time.sleep(wait)
                continue

            if resp.status_code == 401 or resp.status_code == 403:
                # 认证/权限错误，不再重试
                logger.debug(f"权限错误 ({resp.status_code}): {doc_id}")
                return None

            # 其他错误，按重试逻辑处理
            wait = RETRY_DELAY * (2 ** attempt)
            logger.debug(
                f"HTTP {resp.status_code}，第 {attempt + 1}/{MAX_RETRIES} 次重试: {doc_id}"
            )
            time.sleep(wait)

        except requests.Timeout:
            wait = RETRY_DELAY * (2 ** attempt)
            logger.debug(f"请求超时，第 {attempt + 1}/{MAX_RETRIES} 次重试: {doc_id}")
            time.sleep(wait)

        except requests.ConnectionError as e:
            wait = RETRY_DELAY * (2 ** attempt)
            logger.debug(f"连接错误，第 {attempt + 1}/{MAX_RETRIES} 次重试: {doc_id} - {e}")
            time.sleep(wait)

        except requests.RequestException as e:
            logger.debug(f"请求异常: {doc_id} - {e}")
            return None

    return None


def extract_lineup_data(doc, map_name, map_idx, agent_info, agent_idx, ability_id, side, doc_id):
    """
    从 Firestore 文档中提取 lineup 数据，并进行格式转换。

    valoplant.gg 的文档结构：
        每个文档包含一个 "lineups" 数组字段，
        每个数组元素是一个 lineup 对象，包含坐标、视频等信息。

    提取的字段：
        - 坐标: xPercentAgent/yPercentAgent/xPercentAbility/yPercentAbility (0-1 → 0-100)
        - 视频: videoData (YouTube title/videoId)
        - 截图: imageUrls (数组)
        - 其他: lineupStack, agentId, abilityId

    参数:
        doc: Firestore 文档 JSON
        map_name: 地图名称
        map_idx: 地图索引
        agent_info: 英雄信息字典
        agent_idx: 英雄索引
        ability_id: 技能索引
        side: 阵营 (attack/defense)
        doc_id: 文档 ID

    返回:
        list: lineup 字典列表（一个文档可能包含多个 lineup）
    """
    if not doc or "fields" not in doc:
        return []

    fields = doc["fields"]
    results = []

    # --- 文档可能包含 "lineups" 数组 ---
    lineup_list = []
    if "lineups" in fields:
        raw = parse_firestore_value(fields["lineups"])
        if isinstance(raw, list):
            lineup_list = raw
    else:
        # 某些旧文档可能直接包含字段（非数组）
        lineup_list = [fields]

    for item in lineup_list:
        if not isinstance(item, dict):
            continue

        lineup = {}

        # --- 提取坐标字段并转换范围 (0~1 → 0~100) ---
        coord_keys = [
            "xPercentAgent",
            "yPercentAgent",
            "xPercentAbility",
            "yPercentAbility",
        ]
        has_coords = False
        for key in coord_keys:
            if key in item:
                raw_val = parse_firestore_value(item[key]) if isinstance(item[key], dict) else item[key]
                if raw_val is not None:
                    lineup[key] = round(float(raw_val) * 100, 2)
                    has_coords = True

        # 如果没有任何坐标数据，跳过
        if not has_coords:
            continue

        # --- 提取视频信息 ---
        if "videoData" in item:
            lineup["videoData"] = parse_firestore_value(item["videoData"]) if isinstance(item["videoData"], dict) else item["videoData"]

        # --- 提取截图 URL 列表 ---
        if "imageUrls" in item:
            lineup["imageUrls"] = parse_firestore_value(item["imageUrls"]) if isinstance(item["imageUrls"], dict) else item["imageUrls"]

        # --- 提取其他元数据字段 ---
        for key in ["lineupStack", "agentId", "abilityId"]:
            if key in item:
                lineup[key] = parse_firestore_value(item[key]) if isinstance(item[key], dict) else item[key]

        # --- 添加映射信息 ---
        lineup["_meta"] = {
            "map": map_name,
            "mapIndex": map_idx,
            "agent": agent_info["id"],
            "agentName": agent_info["name"],
            "agentEnName": agent_info["enName"],
            "agentIndex": agent_idx,
            "abilityIndex": ability_id,
            "side": side,
            "docId": doc_id,
        }

        results.append(lineup)

    return results


def build_lineup_collection_index(lineups):
    """
    将 lineup 列表构建为按 地图→英雄→阵营 索引的字典结构。
    
    输出格式示例：
    {
        "bind": {
            "jett": {
                "attack": [lineup1, lineup2, ...],
                "defense": [lineup3, ...]
            },
            ...
        },
        ...
    }
    
    参数:
        lineups: lineup 字典列表
        
    返回:
        dict: 嵌套索引字典
    """
    index = {}
    for lineup in lineups:
        meta = lineup.get("_meta", {})
        map_name = meta.get("map")
        agent_id = meta.get("agent")
        side = meta.get("side")

        if not map_name or not agent_id:
            continue

        index.setdefault(map_name, {})
        index[map_name].setdefault(agent_id, {})
        index[map_name][agent_id].setdefault(side, [])
        index[map_name][agent_id][side].append(lineup)

    return index


def crawl_all_lineups(session, token=None):
    """
    主爬取逻辑：遍历所有 mapIndex-agentId-abilityId-side 组合。
    
    遍历策略：
        1. 外层：所有地图（0~12）
        2. 中层：所有英雄索引（0, 10, 20, ..., 280）
        3. 内层：技能索引（0~4），遇到连续 404 则提前跳过
        4. 底层：两侧阵营（attack, defense）
    
    优化策略：
        - 连续 N 个 abilityId 都返回 404 时，跳过当前英雄剩余技能
        - 使用指数退避重试
        - 自动刷新即将过期的 token
        
    参数:
        session: requests.Session 实例
        token: 可选的 Bearer token
        
    返回:
        list: 所有找到的 lineup 字典列表
    """
    all_lineups = []

    # 统计计数器
    total_requests = 0
    total_found = 0
    total_not_found = 0
    total_errors = 0

    # token 过期时间管理
    token_expiry_time = time.time() + 3600 if token else 0

    # 计算总组合数（用于进度显示）
    total_combinations = len(MAPS) * len(AGENTS) * MAX_ABILITY_INDEX * len(SIDES)
    logger.info(f"开始遍历，共 {total_combinations} 种组合")

    start_time = time.time()

    # --- 遍历所有地图 ---
    for map_idx, map_name in sorted(MAPS.items()):
        logger.info(f"--- 地图: {map_name} (index={map_idx}) ---")

        # --- 遍历所有英雄 ---
        for agent_idx, agent_info in sorted(AGENTS.items()):
            agent_name = agent_info["enName"]

            # --- 遍历技能索引 ---
            for ability_id in range(MAX_ABILITY_INDEX):
                consecutive_404 = 0
                found_any_in_ability = False

                # --- 遍历两侧阵营 ---
                for side in SIDES:
                    # 刷新 token（如果即将过期）
                    if token:
                        token, token_expiry_time = refresh_token_if_needed(
                            session, token, token_expiry_time
                        )

                    # 构造文档 ID: {agentId}-{abilityId}-{mapIndex}-{side}
                    doc_id = f"{agent_idx}-{ability_id}-{map_idx}-{side}"

                    # 发起请求
                    doc = firestore_get_document(
                        session,
                        collection="lineups",
                        doc_id=doc_id,
                        token=token,
                    )
                    total_requests += 1

                    if doc is not None:
                        # 解析 lineup 数据（一个文档可能包含多个 lineup）
                        lineups_from_doc = extract_lineup_data(
                            doc=doc,
                            map_name=map_name,
                            map_idx=map_idx,
                            agent_info=agent_info,
                            agent_idx=agent_idx,
                            ability_id=ability_id,
                            side=side,
                            doc_id=doc_id,
                        )
                        if lineups_from_doc:
                            all_lineups.extend(lineups_from_doc)
                            total_found += len(lineups_from_doc)
                            found_any_in_ability = True
                            consecutive_404 = 0
                            logger.debug(
                                f"  找到: {map_name}/{agent_name}/{side}/ability{ability_id} ({len(lineups_from_doc)} 个点位)"
                            )
                        else:
                            # 文档存在但没有有效坐标
                            logger.debug(
                                f"  文档无有效坐标: {doc_id}"
                            )
                            consecutive_404 += 1
                    else:
                        # 404 或权限错误
                        total_not_found += 1
                        consecutive_404 += 1

                    # 请求间隔，避免限流
                    time.sleep(REQUEST_INTERVAL)

                # --- 连续 404 优化：如果两个 side 都 404 且已连续多次，跳过后续技能 ---
                if consecutive_404 >= CONSECUTIVE_404_THRESHOLD and not found_any_in_ability:
                    logger.debug(
                        f"  {agent_name} 已连续 {consecutive_404} 次 404，跳过后续技能"
                    )
                    break

            # 进度报告
            elapsed = time.time() - start_time
            # 估算已完成的组合数
            maps_done = sorted(MAPS.keys()).index(map_idx)
            agents_done = sorted(AGENTS.keys()).index(agent_idx) + 1
            combinations_done = (maps_done * len(AGENTS) + agents_done) * MAX_ABILITY_INDEX * len(SIDES)
            progress = combinations_done / total_combinations * 100
            speed = total_requests / elapsed if elapsed > 0 else 0
            eta = (total_combinations - combinations_done) / speed if speed > 0 else 0

            logger.info(
                f"  进度: {progress:.1f}% | "
                f"找到: {total_found} | "
                f"已请求: {total_requests} | "
                f"速度: {speed:.0f} req/s | "
                f"预计剩余: {eta/60:.1f} 分钟"
            )

    elapsed_total = time.time() - start_time
    logger.info(f"遍历完成，耗时: {elapsed_total:.1f} 秒")
    logger.info(f"总请求数: {total_requests}")
    logger.info(f"找到 lineup: {total_found}")
    logger.info(f"未找到: {total_not_found}")
    logger.info(f"错误: {total_errors}")

    return all_lineups


def save_results(lineups):
    """
    保存爬取结果到 JSON 文件。
    
    生成两个文件：
        1. valoplant_lineups.json - 完整 lineup 数据列表
        2. valoplant_summary.json - 统计摘要（按地图/英雄/阵营统计数量）
    
    参数:
        lineups: lineup 字典列表
    """
    # --- 保存完整数据 ---
    logger.info(f"保存完整数据到: {OUTPUT_FILE}")
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(lineups, f, ensure_ascii=False, indent=2)

    # --- 构建并保存统计摘要 ---
    summary = {
        "crawledAt": datetime.now().isoformat(),
        "totalLineups": len(lineups),
        "maps": {},
        "agents": {},
        "sides": {"attack": 0, "defense": 0},
        "collectionIndex": build_lineup_collection_index(lineups),
    }

    # 按地图统计
    for lineup in lineups:
        meta = lineup.get("_meta", {})
        map_name = meta.get("map")
        agent_id = meta.get("agent")
        side = meta.get("side")

        if map_name:
            summary["maps"].setdefault(map_name, 0)
            summary["maps"][map_name] += 1
        if agent_id:
            summary["agents"].setdefault(agent_id, 0)
            summary["agents"][agent_id] += 1
        if side in summary["sides"]:
            summary["sides"][side] += 1

    logger.info(f"保存统计摘要到: {SUMMARY_FILE}")
    with open(SUMMARY_FILE, "w", encoding="utf-8") as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)

    # --- 打印摘要信息 ---
    logger.info("=" * 50)
    logger.info("爬取结果摘要:")
    logger.info(f"  总 lineup 数量: {summary['totalLineups']}")
    logger.info("  按地图:")
    for map_name, count in sorted(summary["maps"].items()):
        logger.info(f"    {map_name}: {count}")
    logger.info("  按英雄:")
    for agent_id, count in sorted(summary["agents"].items()):
        logger.info(f"    {agent_id}: {count}")
    logger.info("  按阵营:")
    for side, count in summary["sides"].items():
        logger.info(f"    {side}: {count}")


def main():
    """主入口函数"""
    logger.info("=" * 60)
    logger.info("ValoPlant.gg Firestore 数据爬取工具")
    logger.info("=" * 60)
    logger.info(f"Firebase 项目: {FIREBASE_PROJECT_ID}")
    logger.info(f"地图数量: {len(MAPS)}")
    logger.info(f"英雄数量: {len(AGENTS)}")
    logger.info(f"技能遍历上限: {MAX_ABILITY_INDEX}")
    logger.info(f"阵营: {', '.join(SIDES)}")
    logger.info("")

    # 创建 HTTP 会话（支持代理）
    session = get_requests_session()

    # 尝试匿名认证获取 token
    token = get_anonymous_token(session)

    if not token:
        logger.warning("匿名认证失败，将尝试无认证直接访问 Firestore")
        logger.warning("如果后续大量返回 403 错误，说明该集合需要认证")
        logger.warning("建议：在浏览器 DevTools 中手动获取 token")
        # 如果需要手动 token，取消下面的注释并填入
        # token = "YOUR_MANUAL_TOKEN_HERE"
        # logger.info("使用手动设置的 token")

    # 执行爬取
    logger.info("")
    lineups = crawl_all_lineups(session, token)

    # 保存结果
    if lineups:
        save_results(lineups)
        logger.info("")
        logger.info(f"完成！数据已保存到:")
        logger.info(f"  {OUTPUT_FILE}")
        logger.info(f"  {SUMMARY_FILE}")
    else:
        logger.warning("")
        logger.warning("未找到任何 lineup 数据！")
        logger.warning("可能的原因：")
        logger.warning("  1. 文档 ID 格式不正确（需要从实际 Firestore 请求确认）")
        logger.warning("  2. Firebase Security Rules 阻止了匿名访问")
        logger.warning("  3. 数据集合名称不是 'lineups'")
        logger.warning("")
        logger.warning("排查建议：")
        logger.warning("  1. 在浏览器中打开 https://valoplant.gg/zh/lineups")
        logger.warning("  2. 按 F12 打开 DevTools → Network 标签")
        logger.warning("  3. 刷新页面，筛选 'firestore' 请求")
        logger.warning("  4. 检查实际的请求路径和 Authorization header")

    return 0 if lineups else 1


if __name__ == "__main__":
    sys.exit(main())
