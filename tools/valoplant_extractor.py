#!/usr/bin/env python3
"""
ValoPlant 数据提取工具 v2
======================
在你的本地电脑上运行此脚本，自动从 valoplant.gg 提取所有 lineup 数据。

使用方法：
1. 确保已安装 Python 3
2. 确保已安装 Chrome/Edge 浏览器
3. 运行：python3 valoplant_extractor.py
4. 等待自动提取完成
5. 将生成的 valoplant_data.json 发给 AI 助手

依赖安装：
  pip install websocket-client
"""

import json
import time
import subprocess
import sys
import os

try:
    import websocket
except ImportError:
    print("正在安装 websocket-client...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "websocket-client"])
    import websocket


def find_chrome():
    """查找 Chrome/Edge 可执行文件路径"""
    import platform
    system = platform.system()

    if system == "Windows":
        paths = [
            os.path.expandvars(r"%ProgramFiles%\Google\Chrome\Application\chrome.exe"),
            os.path.expandvars(r"%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"),
            os.path.expandvars(r"%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"),
        ]
    elif system == "Darwin":  # macOS
        paths = [
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
            "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
        ]
    else:  # Linux
        paths = [
            "/usr/bin/google-chrome",
            "/usr/bin/chromium-browser",
            "/usr/bin/chromium",
            "/usr/bin/microsoft-edge",
        ]

    for p in paths:
        if os.path.exists(p):
            return p
    return None


def start_chrome(chrome_path, port=9222):
    """启动带远程调试的 Chrome"""
    import platform

    if platform.system() == "Windows":
        cmd = f'"{chrome_path}" --remote-debugging-port={port} --no-first-run --no-default-browser-check --user-data-dir=_chrome_debug_profile about:blank'
    else:
        cmd = f'"{chrome_path}" --remote-debugging-port={port} --no-first-run --no-default-browser-check --user-data-dir=/tmp/_chrome_debug_profile about:blank'

    # 后台启动
    if platform.system() == "Windows":
        subprocess.Popen(cmd, shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    else:
        subprocess.Popen(cmd, shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, 
                       start_new_session=True)

    # 等待 Chrome 启动
    print(f"启动 Chrome（调试端口 {port}）...")
    for i in range(15):
        time.sleep(1)
        try:
            import urllib.request
            urllib.request.urlopen(f"http://localhost:{port}/json/version", timeout=2)
            print(f"  Chrome 已启动")
            return True
        except:
            pass

    print("  Chrome 启动失败，请手动启动 Chrome 后重试")
    return False


def cdp_connect(port=9222):
    """通过 WebSocket 连接 CDP"""
    import urllib.request

    # 获取 tab 列表
    resp = urllib.request.urlopen(f"http://localhost:{port}/json/list", timeout=5)
    tabs = json.loads(resp.read())

    # 找到 valoplant 的 tab，或使用第一个 tab
    target_tab = None
    for tab in tabs:
        if "valoplant" in tab.get("url", ""):
            target_tab = tab
            break

    if not target_tab:
        target_tab = tabs[0] if tabs else None

    if not target_tab:
        print("未找到可用的浏览器标签页")
        return None

    ws_url = target_tab["webSocketDebuggerUrl"]
    print(f"连接到: {ws_url[:60]}...")

    ws = websocket.create_connection(ws_url, timeout=30)
    return ws


def cdp_send(ws, method, params=None, timeout=30):
    """发送 CDP 命令并等待响应"""
    cmd_id = getattr(cdp_send, '_id', 1)
    cdp_send._id = cmd_id + 1

    msg = json.dumps({"id": cmd_id, "method": method, "params": params or {}})
    ws.send(msg)

    start = time.time()
    while time.time() - start < timeout:
        try:
            data = ws.recv()
            for line in data.split("\n"):
                if line.strip():
                    resp = json.loads(line)
                    if "id" in resp and resp["id"] == cmd_id:
                        return resp
        except websocket.WebSocketTimeoutException:
            continue
        except:
            continue

    return None


def cdp_eval(ws, js_expr, timeout=30):
    """在页面中执行 JavaScript"""
    resp = cdp_send(ws, "Runtime.evaluate", {
        "expression": js_expr,
        "returnByValue": True,
        "awaitPromise": True,
        "awaitPromise": True
    }, timeout=timeout)

    if resp and "result" in resp:
        result = resp["result"]
        if "exceptionDetails" in result:
            desc = result["exceptionDetails"].get("text", str(result["exceptionDetails"]))
            return {"error": desc}
        value = result.get("result", {}).get("value")
        if value and isinstance(value, str):
            try:
                return json.loads(value)
            except:
                return value
        return value
    return None


def extract_all_data(ws):
    """从 valoplant.gg 提取所有 lineup 数据"""
    all_data = {"lineups": [], "agents": [], "maps": []}

    # Step 1: 获取 Firebase 实例信息
    print("\n[1/4] 查找 Firebase 实例...")
    fb_info = cdp_eval(ws, """
    (function() {
        let result = {};
        // 搜索全局变量中的 Firebase
        let keys = Object.getOwnPropertyNames(window);
        for (let key of keys) {
            try {
                let obj = window[key];
                if (obj && typeof obj === 'object') {
                    // Firebase 通常有 initializeApp, apps 等属性
                    if ('apps' in obj || 'initializeApp' in obj || ('firestore' in obj && 'auth' in obj)) {
                        result.found = true;
                        result.key = key;
                        if (obj.apps) result.appCount = obj.apps.length;
                        break;
                    }
                }
            } catch(e) {}
        }
        
        // 也搜索 _firebase_loaded 或其他 Flutter 使用的标识
        for (let key of keys) {
            if (key.toLowerCase().includes('firebase') || key.toLowerCase().includes('firestore')) {
                result[key] = typeof window[key];
            }
        }
        
        return JSON.stringify(result);
    })()
    """)
    print(f"  Firebase 搜索结果: {fb_info}")

    # Step 2: 通过拦截 fetch/XHR 获取 Firestore 数据
    print("\n[2/4] 注入数据拦截器...")
    cdp_eval(ws, """
    (function() {
        // 创建全局数据收集器
        window.__vpData = {
            requests: [],
            responses: []
        };
        
        // 拦截 fetch
        const origFetch = window.fetch;
        window.fetch = function(...args) {
            const url = typeof args[0] === 'string' ? args[0] : args[0]?.url || '';
            
            if (url.includes('firestore') || url.includes('firebase')) {
                window.__vpData.requests.push({
                    url: url,
                    time: Date.now()
                });
            }
            
            return origFetch.apply(this, args).then(async response => {
                if (url.includes('firestore.googleapis.com') && response.ok) {
                    try {
                        const clone = response.clone();
                        const text = await clone.text();
                        if (text.length > 50 && text.length < 50000) {
                            window.__vpData.responses.push({
                                url: url,
                                data: text.substring(0, 5000),
                                time: Date.now()
                            });
                        }
                    } catch(e) {}
                }
                return response;
            });
        };
        
        // 拦截 XMLHttpRequest
        const origOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url, ...rest) {
            this.__vpUrl = url;
            return origOpen.call(this, method, url, ...rest);
        };
        
        const origSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function(body) {
            this.addEventListener('load', function() {
                if (this.__vpUrl && this.__vpUrl.includes('firestore')) {
                    window.__vpData.responses.push({
                        url: this.__vpUrl,
                        data: this.responseText.substring(0, 5000),
                        time: Date.now()
                    });
                }
            });
            return origSend.call(this, body);
        };
        
        return 'interceptor installed';
    })()
    """)

    # Step 3: 触发 lineup 加载 - 遍历所有地图
    print("\n[3/4] 触发 lineup 数据加载...")
    print("  （在页面中模拟切换英雄和地图，触发数据请求）")

    # 等待数据收集
    print("  等待 15 秒收集 Firestore 请求...")
    time.sleep(15)

    # Step 4: 读取收集到的数据
    print("\n[4/4] 读取收集到的数据...")
    collected = cdp_eval(ws, """
    (function() {
        return JSON.stringify({
            requestCount: window.__vpData ? window.__vpData.requests.length : 0,
            responseCount: window.__vpData ? window.__vpData.responses.length : 0,
            sampleResponses: window.__vpData ? window.__vpData.responses.slice(0, 3) : []
        });
    })()
    """)

    if isinstance(collected, dict):
        all_data["requestCount"] = collected.get("requestCount", 0)
        all_data["responseCount"] = collected.get("responseCount", 0)
        all_data["sampleResponses"] = collected.get("sampleResponses", [])
    else:
        all_data["collectedRaw"] = str(collected)

    return all_data


def main():
    print("=" * 60)
    print("ValoPlant 数据提取工具 v2")
    print("=" * 60)

    PORT = 9222
    URL = "https://valoplant.gg/zh/lineups"

    # Step 1: 检查 Chrome
    chrome = find_chrome()
    if chrome:
        print(f"找到浏览器: {chrome}")
    else:
        print("未找到 Chrome/Edge，请手动启动带远程调试的浏览器：")
        print(f"  chrome --remote-debugging-port={PORT}")
        print()
        input("启动后按回车继续...")
        chrome = None

    # Step 2: 启动 Chrome（如果需要）
    if chrome:
        # 检查是否已有 Chrome 在运行
        import urllib.request
        try:
            urllib.request.urlopen(f"http://localhost:{PORT}/json/version", timeout=2)
            print("检测到 Chrome 已在运行")
        except:
            if not start_chrome(chrome, PORT):
                print("请手动启动 Chrome：")
                print(f"  chrome --remote-debugging-port={PORT}")
                input("启动后按回车继续...")

    # Step 3: 连接 CDP
    print(f"\n连接 CDP (端口 {PORT})...")
    ws = cdp_connect(PORT)
    if not ws:
        print("连接失败！请确保 Chrome 已启动且允许远程调试。")
        sys.exit(1)

    # Step 4: 导航到 valoplant
    print(f"\n导航到 valoplant.gg...")
    resp = cdp_send(ws, "Page.navigate", {"url": URL}, timeout=30)
    print("  页面导航已发送")

    # 等待页面加载（Flutter 需要时间）
    print("  等待 Flutter 加载 (30秒)...")
    time.sleep(30)

    # Step 5: 提取数据
    data = extract_all_data(ws)

    # Step 6: 保存结果
    output_file = os.path.join(os.path.dirname(__file__) or ".", "valoplant_data.json")
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"\n{'='*60}")
    print(f"数据已保存到: {output_file}")
    print(f"捕获请求数: {data.get('requestCount', 0)}")
    print(f"捕获响应数: {data.get('responseCount', 0)}")

    if data.get("sampleResponses"):
        print(f"\n示例响应（前3个）:")
        for i, r in enumerate(data["sampleResponses"]):
            print(f"  [{i}] URL: {r['url'][:80]}")
            print(f"      Data: {r['data'][:200]}")
            print()

    print("\n如果请求/响应数为 0，说明拦截器可能未生效。")
    print("请在脚本运行期间手动在页面中切换英雄和地图。")
    print("然后将 valoplant_data.json 的内容发给 AI 助手。")

    try:
        ws.close()
    except:
        pass


if __name__ == "__main__":
    main()
