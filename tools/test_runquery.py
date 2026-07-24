#!/usr/bin/env python3
"""用 Firestore runQuery 查询 lineup 数据"""
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

# 匿名认证
try:
    resp = session.post(
        f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={API_KEY}",
        json={"returnSecureToken": True}, timeout=15
    )
    token = resp.json().get("idToken") if resp.status_code == 200 else None
    print(f"匿名认证: {resp.status_code}")
except Exception as e:
    token = None
    print(f"匿名认证失败: {e}")

headers = {"Content-Type": "application/json"}
if token:
    headers["Authorization"] = f"Bearer {token}"

# 尝试用 runQuery 查询 lineups 集合
queries = [
    {
        "name": "查询所有 lineups",
        "body": {
            "structuredQuery": {
                "from": [{"collectionId": "lineups"}],
                "limit": 5
            }
        }
    },
    {
        "name": "按 mapIndex 过滤",
        "body": {
            "structuredQuery": {
                "from": [{"collectionId": "lineups"}],
                "where": {
                    "fieldFilter": {
                        "field": {"fieldPath": "mapIndex"},
                        "op": "EQUAL",
                        "value": {"integerValue": "2"}
                    }
                },
                "limit": 5
            }
        }
    },
    {
        "name": "按 agentId 过滤",
        "body": {
            "structuredQuery": {
                "from": [{"collectionId": "lineups"}],
                "where": {
                    "fieldFilter": {
                        "field": {"fieldPath": "agentId"},
                        "op": "EQUAL",
                        "value": {"integerValue": "100"}
                    }
                },
                "limit": 5
            }
        }
    },
]

for q in queries:
    print(f"\n{q['name']}:")
    try:
        r = session.post(f"{BASE}:runQuery", headers=headers, json=q["body"], timeout=15)
        print(f"  状态: {r.status_code}")
        if r.status_code == 200:
            data = r.json()
            print(f"  结果数: {len(data)}")
            if data:
                print(f"  第一条: {str(data[0])[:500]}")
        else:
            print(f"  响应: {r.text[:300]}")
    except Exception as e:
        print(f"  错误: {e}")

# 也试试 listDocuments
print("\n尝试 listDocuments (lineups 集合前5个):")
try:
    r = session.get(f"{BASE}/lineups?pageSize=5", headers=headers, timeout=15)
    print(f"  状态: {r.status_code}")
    if r.status_code == 200:
        data = r.json()
        docs = data.get("documents", [])
        print(f"  文档数: {len(docs)}")
        for doc in docs[:3]:
            print(f"    {doc.get('name', '').split('/')[-1]}")
    else:
        print(f"  响应: {r.text[:300]}")
except Exception as e:
    print(f"  错误: {e}")
