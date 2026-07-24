// ValoPlant 数据提取 - 在 valoplant.gg 控制台运行
// 复制全部内容，粘贴到 F12 → Console → 回车
// 或者在 Sources → Snippets → New Snippet → 粘贴 → 右键 Run

(async function() {
  // 等待页面完全加载
  if (document.readyState !== 'complete') {
    await new Promise(r => window.addEventListener('load', r));
    await new Promise(r => setTimeout(r, 5000));
  }

  console.log("=== ValoPlant 数据提取开始 ===");

  // 收集所有网络请求中的 Firestore 数据
  let allData = [];

  // 方法: 使用 Performance API 获取已完成的网络请求
  let entries = performance.getEntriesByType("resource");
  let firestoreEntries = entries.filter(e => 
    e.name.includes("firestore.googleapis.com")
  );

  console.log("Firestore 请求数:", firestoreEntries.length);

  // 如果没有捕获到（因为请求在页面加载前就完成了），使用另一种方式
  // 直接从页面的 localStorage 或 IndexedDB 中获取数据
  console.log("\n--- 搜索 localStorage ---");
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.includes("lineup") || key.includes("firebase") || key.includes("agent") || key.includes("map")) {
      console.log("Key:", key, "Value:", localStorage.getItem(key).substring(0, 200));
    }
  }

  console.log("\n--- 搜索全局 Firebase 对象 ---");
  let found = [];
  let keys = Object.getOwnPropertyNames(window);
  for (let key of keys) {
    try {
      let obj = window[key];
      if (obj && typeof obj === 'object' && 
          (obj.apps !== undefined || obj.initializeApp !== undefined || 
           obj.firestore !== undefined)) {
        found.push(key);
        console.log("Found:", key, "type:", typeof obj);
        if (obj.apps && obj.apps.length > 0) {
          console.log("  App count:", obj.apps.length);
          console.log("  Project:", obj.apps[0].options?.projectId || "unknown");
          // 尝试获取 Firestore 实例
          try {
            let db = obj.firestore(obj.apps[0]);
            console.log("  Firestore available: YES");
            // 尝试读取一个文档
            let doc = await db.collection("lineups").limit(1).get();
            console.log("  lineups collection size:", doc.size);
            doc.forEach(d => console.log("  sample doc:", d.id, JSON.stringify(d.data()).substring(0, 300)));
          } catch(e) {
            console.log("  Firestore read error:", e.message.substring(0, 200));
          }
        }
      }
    } catch(e) {}
  }

  if (found.length === 0) {
    console.log("未找到标准 Firebase 对象");
    console.log("尝试搜索包含 'fire' 的全局变量:");
    for (let key of keys) {
      if (key.toLowerCase().includes("fire") || key.toLowerCase().includes("fb_")) {
        console.log("  ", key, "->", typeof window[key]);
      }
    }
  }

  console.log("\n=== 提取完成 ===");
})();
