#!/usr/bin/env python3
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
    resp = session.post(f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={API_KEY}",
        json={"returnSecureToken": True}, timeout=15)
    token = resp.json().get("idToken") if resp.status_code == 200 else None
    print(f"匿名认证: {resp.status_code}")
except Exception as e:
    token = None
    print(f"匿名认证失败: {e}")

headers = {}
if token:
    headers["Authorization"] = f"Bearer {token}"

# 测试已确认存在的文档 ID
doc_ids = [
    "10-12-0-attack",
    "10-12-0-defense",
    "10-12-1-attack",
]

print("\n测试单个文档 GET:")
for doc_id in doc_ids:
    url = f"{BASE}/lineups/{doc_id}"
    try:
        r = session.get(url, headers=headers, timeout=10)
        print(f"  {doc_id}: {r.status_code}")
        if r.status_code == 200:
            data = r.json()
            fields = data.get("fields", {})
            lineups = fields.get("lineups", {})
            print(f"    有 lineups 字段: {'lineups' in fields}")
            if "lineups" in fields:
                arr = lineups.get("arrayValue", {})
                vals = arr.get("values", [])
                print(f"    lineups 数组长度: {len(vals)}")
    except Exception as e:
        print(f"  {doc_id}: 错误 {e}")
