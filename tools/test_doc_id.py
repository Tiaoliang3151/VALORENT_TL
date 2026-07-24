#!/usr/bin/env python3
"""测试 valoplant.gg Firestore 文档 ID 的各种可能格式"""
import requests
import os

PROJECT_ID = "valoplant-cb7c6"
API_KEY = "AIzaSyC38RKCgxKwAxbwCQj52LaPN754jUvhTPo"
BASE = f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents"

session = requests.Session()
for env_key in ["HTTP_PROXY","http_proxy","HTTPS_PROXY","https_proxy","ALL_PROXY","all_proxy"]:
    val = os.environ.get(env_key)
    if val:
        session.proxies.update({"http": val, "https": val})
        break

# 先匿名认证
try:
    resp = session.post(
        f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={API_KEY}",
        json={"returnSecureToken": True}, timeout=15
    )
    token = resp.json().get("idToken") if resp.status_code == 200 else None
    print(f"匿名认证: {resp.status_code}, token={token is not None}")
except Exception as e:
    token = None
    print(f"匿名认证失败: {e}")

headers = {}
if token:
    headers["Authorization"] = f"Bearer {token}"

# 测试几种文档 ID 格式
map_idx = 2    # Split
agent_idx = 100  # Sova
ability_idx = 1  # 第一个技能
side = "attack"

formats = [
    # 格式: (name, doc_id)
    ("map-agent-ability-side", f"{map_idx}-{agent_idx}-{ability_idx}-{side}"),
    ("map-ability-agent-side", f"{map_idx}-{ability_idx}-{agent_idx}-{side}"),
    ("agent-map-ability-side", f"{agent_idx}-{map_idx}-{ability_idx}-{side}"),
    ("agent-ability-map-side", f"{agent_idx}-{ability_idx}-{map_idx}-{side}"),
    ("ability-map-agent-side", f"{ability_idx}-{map_idx}-{agent_idx}-{side}"),
    ("ability-agent-map-side", f"{ability_idx}-{agent_idx}-{map_idx}-{side}"),
    # 去掉 side
    ("map-agent-ability", f"{map_idx}-{agent_idx}-{ability_idx}"),
    ("map-ability-agent", f"{map_idx}-{ability_idx}-{agent_idx}"),
    ("agent-map-ability", f"{agent_idx}-{map_idx}-{ability_idx}"),
    # 尝试用 agent 索引 0-based (10→1, 20→2...)
    ("map-agent0-ability-side", f"{map_idx}-{agent_idx//10}-{ability_idx}-{side}"),
    # 尝试字符串名称
    ("split-sova-1-attack", f"split-sova-{ability_idx}-{side}"),
    ("split-100-1-attack", f"split-{agent_idx}-{ability_idx}-{side}"),
    ("2-sova-1-attack", f"{map_idx}-sova-{ability_idx}-{side}"),
    # 多级路径
    ("lineups/2/100/1/attack", None),  # 单独处理
]

print("\n测试 lineup 集合:")
for name, doc_id in formats:
    if doc_id is None:
        continue
    url = f"{BASE}/lineups/{doc_id}"
    try:
        r = session.get(url, headers=headers, timeout=10)
        status = r.status_code
        if status == 200:
            print(f"  ✓ {name}: {doc_id} -> 200!")
            print(f"    响应: {r.text[:200]}")
        elif status == 404:
            print(f"  ✗ {name}: {doc_id} -> 404")
        else:
            print(f"  ? {name}: {doc_id} -> {status}: {r.text[:100]}")
    except Exception as e:
        print(f"  ! {name}: {doc_id} -> 错误: {e}")

# 也测试其他可能的集合名
print("\n测试其他集合名 (用 map-agent-ability-side 格式):")
collections = ["lineup", "lineups", "Lineup", "Lineups", "publicLineups", "publishedLineups", "approvedLineups"]
doc_id = f"{map_idx}-{agent_idx}-{ability_idx}-{side}"
for coll in collections:
    url = f"{BASE}/{coll}/{doc_id}"
    try:
        r = session.get(url, headers=headers, timeout=10)
        status = r.status_code
        if status == 200:
            print(f"  ✓ {coll}: 200!")
        elif status == 404:
            print(f"  ✗ {coll}: 404")
        else:
            print(f"  ? {coll}: {status}: {r.text[:100]}")
    except Exception as e:
        print(f"  ! {coll}: 错误: {e}")

# 测试多级路径
print("\n测试多级路径:")
paths = [
    f"{BASE}/lineups/{map_idx}/{agent_idx}/{ability_idx}/{side}",
    f"{BASE}/lineups/{map_idx}/{agent_idx}/{side}/{ability_idx}",
    f"{BASE}/lineups/{map_idx}/{side}/{agent_idx}/{ability_idx}",
]
for url in paths:
    try:
        r = session.get(url, headers=headers, timeout=10)
        print(f"  {url.split('/documents/')[1]} -> {r.status_code}")
    except Exception as e:
        print(f"  错误: {e}")
