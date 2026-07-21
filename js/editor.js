// ==========================================
// 无畏契约战术查询 - 可视化编辑器
// 在地图上直接添加/编辑/删除点位
// ==========================================

(function () {
  "use strict";

  // 编辑器状态
  let editMode = false;
  let editTool = "select"; // select | add-ball | add-line | add-wallbang | add-ability
  let editSelectedId = null;
  let dragState = null;
  let isDragging = false;

  // 获取应用接口
  function app() { return window.__APP__; }

  // ==========================================
  // 编辑模式开关
  // ==========================================
  function toggle() {
    editMode = !editMode;
    if (editMode) {
      enter();
    } else {
      exit();
    }
  }

  function isActive() { return editMode; }

  function enter() {
    editMode = true;
    editTool = "select";
    showEditBanner();
    app().rerender();
    setTimeout(() => {
      addEditToolbar();
      bindCanvasEvents();
      saveDraft();
    }, 100);
  }

  function exit() {
    editMode = false;
    editTool = "select";
    editSelectedId = null;
    removeEditBanner();
    app().rerender();
  }

  // ==========================================
  // 编辑模式横幅
  // ==========================================
  function showEditBanner() {
    let banner = document.getElementById("edit-banner");
    if (!banner) {
      banner = document.createElement("div");
      banner.id = "edit-banner";
      banner.className = "edit-banner";
      document.body.appendChild(banner);
    }
    banner.innerHTML = `
      <span class="edit-banner-icon">✎</span>
      <span>编辑模式已开启</span>
      <span class="edit-banner-hint">点击地图添加点位，拖拽移动，点击点位编辑</span>
      <button class="edit-banner-btn" id="edit-export-btn">导出JSON</button>
      <button class="edit-banner-btn" id="edit-import-btn">导入JSON</button>
      <button class="edit-banner-btn danger" id="edit-exit-btn">退出编辑</button>
    `;
    banner.style.display = "flex";

    document.getElementById("edit-export-btn").addEventListener("click", exportJSON);
    document.getElementById("edit-import-btn").addEventListener("click", importJSON);
    document.getElementById("edit-exit-btn").addEventListener("click", () => {
      if (confirm("退出编辑模式？未导出的修改将丢失（已自动保存到本地草稿）。")) {
        exit();
      }
    });
  }

  function removeEditBanner() {
    const banner = document.getElementById("edit-banner");
    if (banner) banner.style.display = "none";
  }

  // ==========================================
  // 编辑工具栏（地图上方）
  // ==========================================
  function addEditToolbar() {
    const wrapper = document.querySelector(".map-canvas-wrapper");
    if (!wrapper) return;

    let toolbar = document.getElementById("edit-toolbar");
    if (toolbar) toolbar.remove();

    toolbar = document.createElement("div");
    toolbar.id = "edit-toolbar";
    toolbar.className = "edit-toolbar";

    const tools = [
      { id: "select", label: "选择/移动", icon: "✥" },
      { id: "add-ball", label: "添加球烟", icon: "●" },
      { id: "add-line", label: "添加线烟", icon: "▬" },
      { id: "add-wallbang", label: "添加穿墙点", icon: "◆" },
      { id: "add-plant", label: "添加下包点", icon: "⚑" },
      { id: "add-ability", label: "添加技能点位", icon: "★" }
    ];

    toolbar.innerHTML = tools.map(t => `
      <button class="edit-tool-btn ${editTool === t.id ? "active" : ""}" data-tool="${t.id}">
        <span class="tool-icon">${t.icon}</span>
        <span class="tool-label">${t.label}</span>
      </button>
    `).join("");

    wrapper.insertBefore(toolbar, wrapper.firstChild);

    toolbar.querySelectorAll(".edit-tool-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        editTool = btn.dataset.tool;
        editSelectedId = null;
        toolbar.querySelectorAll(".edit-tool-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        updateCanvasCursor();
      });
    });

    updateCanvasCursor();
  }

  function updateCanvasCursor() {
    const canvas = document.getElementById("map-canvas");
    if (!canvas) return;
    if (editTool.startsWith("add-")) {
      canvas.style.cursor = "crosshair";
    } else {
      canvas.style.cursor = "default";
    }
  }

  // ==========================================
  // 画布事件绑定
  // ==========================================
  function bindCanvasEvents() {
    const canvas = document.getElementById("map-canvas");
    if (!canvas) return;

    // 点击地图添加点位
    canvas.addEventListener("click", handleCanvasClick, true);
    // 拖拽移动
    canvas.addEventListener("mousedown", handleMouseDown, true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleCanvasClick(e) {
    if (!editMode) return;
    if (editTool === "select") return;
    // 如果点击的是已有标记，不处理（让标记自己处理）
    if (e.target.closest(".marker") || e.target.closest(".zoom-btn") || e.target.closest(".zoom-level")) return;

    const canvas = document.getElementById("map-canvas");
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    addMarkerAt(editTool, x, y);
  }

  function handleMouseDown(e) {
    if (!editMode || editTool !== "select") return;
    const marker = e.target.closest(".marker");
    if (!marker) return;

    const itemId = marker.dataset.itemId;
    if (!itemId) return;

    editSelectedId = itemId;
    const canvas = document.getElementById("map-canvas");
    const rect = canvas.getBoundingClientRect();

    dragState = {
      itemId,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      canvasRect: rect,
      item: findItem(itemId)
    };

    if (dragState.item) {
      dragState.startX = dragState.item.x;
      dragState.startY = dragState.item.y;
      if (dragState.item.standX !== undefined) {
        dragState.startStandX = dragState.item.standX;
        dragState.startStandY = dragState.item.standY;
      }
      isDragging = false;
      // 不阻止事件传播，让 click 事件正常触发
    }
  }

  function handleMouseMove(e) {
    if (!dragState || !dragState.item) return;

    const dx = ((e.clientX - dragState.startMouseX) / dragState.canvasRect.width) * 100;
    const dy = ((e.clientY - dragState.startMouseY) / dragState.canvasRect.height) * 100;

    if (Math.abs(e.clientX - dragState.startMouseX) > 3 || Math.abs(e.clientY - dragState.startMouseY) > 3) {
      isDragging = true;
    }

    if (isDragging) {
      dragState.item.x = Math.round(Math.max(0, Math.min(100, dragState.startX + dx)) * 10) / 10;
      dragState.item.y = Math.round(Math.max(0, Math.min(100, dragState.startY + dy)) * 10) / 10;

      // 如果有站位，同时移动站位（保持相对位置）
      if (dragState.startStandX !== undefined) {
        dragState.item.standX = Math.round(Math.max(0, Math.min(100, dragState.startStandX + dx)) * 10) / 10;
        dragState.item.standY = Math.round(Math.max(0, Math.min(100, dragState.startStandY + dy)) * 10) / 10;
      }

      app().renderMarkers();
      updateEditPanelCoords();
    }
  }

  function handleMouseUp(e) {
    if (!dragState) return;

    if (isDragging) {
      // 拖拽完成，保存草稿。阻止 click 事件以避免弹出面板
      saveDraft();
      // 临时阻止接下来的 click 事件
      const preventClick = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        document.removeEventListener("click", preventClick, true);
      };
      document.addEventListener("click", preventClick, true);
    }

    dragState = null;
    isDragging = false;
  }

  // ==========================================
  // 数据操作
  // ==========================================
  function getCurrentList() {
    const map = app().getMap();
    const tab = app().getTab();
    const agent = app().getAgent();

    if (tab === "smokes") {
      return { list: map.commonSmokes, type: "smoke" };
    } else if (tab === "wallbangs") {
      return { list: map.wallbangs, type: "wallbang" };
    } else if (tab === "plants") {
      if (!map.plantSpots) map.plantSpots = [];
      return { list: map.plantSpots, type: "plant" };
    } else if (tab === "agents" && agent) {
      const lineups = app().getLineups();
      if (!lineups[map.id]) lineups[map.id] = {};
      if (!lineups[map.id][agent]) lineups[map.id][agent] = [];
      return { list: lineups[map.id][agent], type: "lineup" };
    }
    return null;
  }

  function findItem(itemId) {
    const ctx = getCurrentList();
    if (!ctx) return null;
    return ctx.list.find(item => item.id === itemId);
  }

  function addMarkerAt(tool, x, y) {
    const ctx = getCurrentList();
    if (!ctx) {
      alert("请先选择一个标签页（常规烟位/穿墙点位/英雄技能）");
      return;
    }

    const id = "edit_" + Date.now();
    let newItem = { id, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };

    if (tool === "add-ball") {
      newItem.type = "ball";
      newItem.name = "新球烟";
      newItem.desc = "";
      if (ctx.type === "smoke") newItem.site = "";
    } else if (tool === "add-line") {
      newItem.type = "line";
      newItem.name = "新线烟";
      newItem.length = 20;
      newItem.angle = 0;
      newItem.desc = "";
      if (ctx.type === "smoke") newItem.site = "";
    } else if (tool === "add-wallbang") {
      newItem.name = "新穿墙点";
      newItem.desc = "";
    } else if (tool === "add-plant") {
      newItem.name = "新下包点";
      newItem.plantType = "open";
      newItem.desc = "";
      if (ctx.type === "plant") newItem.site = "";
    } else if (tool === "add-ability") {
      newItem.type = "other";
      newItem.name = "新技能点位";
      newItem.ability = "E";
      newItem.desc = "";
      newItem.crosshair = "";
      newItem.standX = Math.max(0, Math.min(100, x - 10));
      newItem.standY = Math.max(0, Math.min(100, y + 10));
    }

    ctx.list.push(newItem);
    editSelectedId = id;
    saveDraft();
    window.dispatchEvent(new Event("editor-data-updated"));
    setTimeout(() => showEditPanel(id), 200);
  }

  function deleteItem(itemId) {
    const ctx = getCurrentList();
    if (!ctx) return;
    const idx = ctx.list.findIndex(item => item.id === itemId);
    if (idx >= 0) {
      ctx.list.splice(idx, 1);
      editSelectedId = null;
      saveDraft();
      window.dispatchEvent(new Event("editor-data-updated"));
    }
  }

  function updateField(itemId, field, value) {
    const item = findItem(itemId);
    if (!item) return;

    if (field === "x" || field === "y" || field === "standX" || field === "standY" ||
        field === "length" || field === "angle") {
      item[field] = parseFloat(value) || 0;
    } else {
      item[field] = value;
    }
    saveDraft();
    app().renderMarkers();
  }

  // ==========================================
  // 编辑面板
  // ==========================================
  function showEditPanel(itemId) {
    const item = findItem(itemId);
    if (!item) return;

    const ctx = getCurrentList();
    const overlay = document.getElementById("detail-overlay");
    const panel = document.getElementById("detail-panel");

    let fieldsHtml = "";

    // 基本字段
    fieldsHtml += renderInputField("名称", "name", item.name, "text");
    fieldsHtml += renderInputField("X坐标(%)", "x", item.x, "number", "0", "100", "0.1");
    fieldsHtml += renderInputField("Y坐标(%)", "y", item.y, "number", "0", "100", "0.1");

    // 类型相关字段
    if (item.type === "ball" || ctx.type === "smoke") {
      if (ctx.type === "smoke") {
        fieldsHtml += renderSelectField("类型", "type", item.type || "ball", [
          { value: "ball", label: "球烟" },
          { value: "line", label: "线烟" }
        ]);
        fieldsHtml += renderInputField("据点", "site", item.site || "", "text");
      }
      // 球烟半径已固定为6%，无需编辑
    }

    if (item.type === "line") {
      fieldsHtml += renderRangeField("长度(%)", "length", item.length || 20, 5, 50, 1);
      fieldsHtml += renderRangeField("角度(度)", "angle", item.angle || 0, 0, 360, 1);
    }

    // 技能点位特有字段
    if (ctx.type === "lineup") {
      fieldsHtml += renderSelectField("技能键位", "ability", item.ability || "E", [
        { value: "C", label: "C键" },
        { value: "Q", label: "Q键" },
        { value: "E", label: "E键" },
        { value: "X", label: "X键(大招)" }
      ]);
      fieldsHtml += renderSelectField("点位类型", "type", item.type || "other", [
        { value: "ball", label: "球烟" },
        { value: "line", label: "线烟" },
        { value: "other", label: "其他技能" }
      ]);
      fieldsHtml += renderInputField("站位X(%)", "standX", item.standX || "", "number", "0", "100", "0.1");
      fieldsHtml += renderInputField("站位Y(%)", "standY", item.standY || "", "number", "0", "100", "0.1");
      fieldsHtml += renderTextArea("站位说明", "desc", item.desc || "");
      fieldsHtml += renderTextArea("准星瞄准", "crosshair", item.crosshair || "");
    } else if (ctx.type === "plant") {
      fieldsHtml += renderSelectField("下包类型", "plantType", item.plantType || "open", [
        { value: "open", label: "开放包" },
        { value: "safe", label: "安全包" },
        { value: "special", label: "特殊包" },
        { value: "second-floor", label: "二楼包" }
      ]);
      fieldsHtml += renderInputField("据点", "site", item.site || "", "text");
      fieldsHtml += renderTextArea("说明", "desc", item.desc || "");
      fieldsHtml += renderTextArea("优势", "advantage", item.advantage || "");
      fieldsHtml += renderTextArea("风险", "risk", item.risk || "");
      fieldsHtml += renderTextArea("下包后站位", "postPlant", item.postPlant || "");
    } else {
      fieldsHtml += renderTextArea("说明", "desc", item.desc || "");
    }

    // 图片字段
    fieldsHtml += `<div class="edit-section-title">图片路径（可选）</div>`;
    fieldsHtml += renderInputField("站位图", "standImg", item.standImg || "", "text", "", "", "", "lineups/xxx_stand.jpg");
    fieldsHtml += renderInputField("瞄点图", "aimImg", item.aimImg || "", "text", "", "", "", "lineups/xxx_aim.jpg");
    fieldsHtml += renderInputField("效果图", "effectImg", item.effectImg || "", "text", "", "", "", "lineups/xxx_effect.jpg");
    fieldsHtml += renderInputField("视频链接", "video", item.video || "", "text", "", "", "", "https://...");

    panel.innerHTML = `
      <button class="detail-close" onclick="document.getElementById('detail-overlay').classList.add('hidden')">&times;</button>
      <div class="edit-panel-header">
        <div class="detail-title">编辑点位</div>
        <button class="edit-delete-btn" id="edit-delete-btn">删除此点位</button>
      </div>
      <div class="edit-form" id="edit-form">
        ${fieldsHtml}
      </div>
      <div class="edit-form-actions">
        <button class="edit-save-btn" id="edit-save-btn">保存修改</button>
      </div>
    `;

    overlay.classList.remove("hidden");

    // 绑定输入事件（实时更新）
    panel.querySelectorAll("[data-field]").forEach(input => {
      const field = input.dataset.field;
      input.addEventListener("input", () => {
        updateField(itemId, field, input.value);
      });
      input.addEventListener("change", () => {
        updateField(itemId, field, input.value);
      });
    });

    // 删除按钮
    const delBtn = document.getElementById("edit-delete-btn");
    if (delBtn) {
      delBtn.addEventListener("click", () => {
        if (confirm("确定删除此点位？")) {
          deleteItem(itemId);
          overlay.classList.add("hidden");
        }
      });
    }

    // 保存按钮（关闭面板）
    const saveBtn = document.getElementById("edit-save-btn");
    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        overlay.classList.add("hidden");
        saveDraft();
      });
    }
  }

  function updateEditPanelCoords() {
    if (!editSelectedId) return;
    const item = findItem(editSelectedId);
    if (!item) return;
    const form = document.getElementById("edit-form");
    if (!form) return;

    const xInput = form.querySelector('[data-field="x"]');
    const yInput = form.querySelector('[data-field="y"]');
    if (xInput) xInput.value = item.x;
    if (yInput) yInput.value = item.y;

    if (item.standX !== undefined) {
      const sxInput = form.querySelector('[data-field="standX"]');
      const syInput = form.querySelector('[data-field="standY"]');
      if (sxInput) sxInput.value = item.standX;
      if (syInput) syInput.value = item.standY;
    }
  }

  // ==========================================
  // 表单字段渲染
  // ==========================================
  function renderInputField(label, field, value, type, min, max, step, placeholder) {
    return `
      <div class="edit-field">
        <label class="edit-label">${label}</label>
        <input class="edit-input" type="${type}" data-field="${field}" value="${value || ""}"
               ${min ? `min="${min}"` : ""} ${max ? `max="${max}"` : ""} ${step ? `step="${step}"` : ""}
               ${placeholder ? `placeholder="${placeholder}"` : ""}>
      </div>
    `;
  }

  function renderRangeField(label, field, value, min, max, step) {
    return `
      <div class="edit-field">
        <label class="edit-label">${label}: <span class="range-value" id="range-${field}">${value}</span></label>
        <input class="edit-range" type="range" data-field="${field}" value="${value}"
               min="${min}" max="${max}" step="${step}"
               oninput="document.getElementById('range-${field}').textContent=this.value">
      </div>
    `;
  }

  function renderTextArea(label, field, value) {
    return `
      <div class="edit-field">
        <label class="edit-label">${label}</label>
        <textarea class="edit-textarea" data-field="${field}" rows="2">${value || ""}</textarea>
      </div>
    `;
  }

  function renderSelectField(label, field, value, options) {
    return `
      <div class="edit-field">
        <label class="edit-label">${label}</label>
        <select class="edit-select" data-field="${field}">
          ${options.map(o => `<option value="${o.value}" ${o.value === value ? "selected" : ""}>${o.label}</option>`).join("")}
        </select>
      </div>
    `;
  }

  // ==========================================
  // 导出/导入 JSON
  // ==========================================
  function exportJSON() {
    const map = app().getMap();
    const lineups = app().getLineups();
    const mapData = JSON.parse(JSON.stringify(map));
    const lineupData = JSON.parse(JSON.stringify(lineups[map.id] || {}));

    // 深拷贝清理
    const cleanId = (item) => {
      const copy = { ...item };
      return copy;
    };

    mapData.commonSmokes = (mapData.commonSmokes || []).map(cleanId);
    mapData.wallbangs = (mapData.wallbangs || []).map(cleanId);
    mapData.plantSpots = (mapData.plantSpots || []).map(cleanId);
    Object.keys(lineupData).forEach(agent => {
      lineupData[agent] = lineupData[agent].map(cleanId);
    });

    const exportObj = {
      mapId: map.id,
      mapName: map.name,
      sites: mapData.sites,
      commonSmokes: mapData.commonSmokes,
      wallbangs: mapData.wallbangs,
      plantSpots: mapData.plantSpots,
      lineups: lineupData
    };

    const json = JSON.stringify(exportObj, null, 2);

    // 生成可直接粘贴到 data.js 的代码片段
    const dataJsSnippet = generateDataJsSnippet(map.id, map.name, exportObj);

    // 显示导出面板
    const overlay = document.getElementById("detail-overlay");
    const panel = document.getElementById("detail-panel");

    const smokeCount = mapData.commonSmokes.length;
    const wallbangCount = mapData.wallbangs.length;
    const plantCount = mapData.plantSpots.length;
    const agentCount = Object.keys(lineupData).length;
    const lineupCount = Object.values(lineupData).reduce((sum, arr) => sum + arr.length, 0);

    panel.innerHTML = `
      <button class="detail-close" onclick="document.getElementById('detail-overlay').classList.add('hidden')">&times;</button>
      <div class="detail-title">导出数据 - ${map.name} (${map.id})</div>
      <div class="edit-export-info">
        <div class="export-stats">
          <span class="export-stat">常规烟位: ${smokeCount}</span>
          <span class="export-stat">穿墙点位: ${wallbangCount}</span>
          <span class="export-stat">下包点位: ${plantCount}</span>
          <span class="export-stat">英雄技能: ${agentCount}英雄/${lineupCount}点位</span>
        </div>
        <div class="export-tabs">
          <button class="export-tab-btn active" data-tab="json">JSON数据</button>
          <button class="export-tab-btn" data-tab="snippet">data.js代码片段</button>
          <button class="export-tab-btn" data-tab="guide">使用说明</button>
        </div>
        <div class="export-tab-content" id="export-tab-json">
          <textarea class="edit-export-textarea" id="export-textarea" readonly>${json}</textarea>
        </div>
        <div class="export-tab-content hidden" id="export-tab-snippet">
          <div class="export-snippet-info">
            将下方代码粘贴到 <code>js/data.js</code> 中对应位置：
            <br>• MAPS 数组中找到 <code>id: "${map.id}"</code> 的地图，替换其 commonSmokes / wallbangs / plantSpots / sites
            <br>• LINEUPS 对象中找到 <code>${map.id}: {...}</code>，替换整段
          </div>
          <textarea class="edit-export-textarea" id="export-snippet-textarea" readonly>${dataJsSnippet}</textarea>
        </div>
        <div class="export-tab-content hidden" id="export-tab-guide">
          <div class="export-guide">
            <h3>发布流程</h3>
            <ol>
              <li>在编辑模式中添加/修改/删除点位</li>
              <li>点击「导出JSON」获取数据</li>
              <li>选择「data.js代码片段」标签页</li>
              <li>复制代码，粘贴到 <code>js/data.js</code> 对应位置</li>
              <li>将修改后的 <code>data.js</code> 推送到 GitHub</li>
              <li>GitHub Pages 会自动更新网站</li>
            </ol>
            <h3>文件说明</h3>
            <ul>
              <li><b>js/data.js</b> - 所有地图数据都在这一个文件中</li>
              <li>MAPS 数组 - 包含所有地图的烟位、穿墙点、下包点</li>
              <li>LINEUPS 对象 - 包含所有地图的英雄技能点位</li>
              <li>每个地图通过 <code>id</code> 字段区分（如 haven、bind、split）</li>
            </ul>
            <h3>下载JSON文件</h3>
            <p>点击下方「下载JSON文件」可保存为 <code>${map.id}_data.json</code>，作为备份。导入时可用「导入JSON」按钮加载。</p>
          </div>
        </div>
      </div>
      <div class="edit-form-actions">
        <button class="edit-save-btn" id="copy-json-btn">复制JSON到剪贴板</button>
        <button class="edit-save-btn" id="copy-snippet-btn">复制代码片段</button>
        <button class="edit-save-btn" id="download-json-btn">下载 ${map.id}_data.json</button>
      </div>
    `;

    overlay.classList.remove("hidden");

    // 标签页切换
    panel.querySelectorAll(".export-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        panel.querySelectorAll(".export-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        panel.querySelectorAll(".export-tab-content").forEach(c => c.classList.add("hidden"));
        const tabId = "export-tab-" + btn.dataset.tab;
        const content = document.getElementById(tabId);
        if (content) content.classList.remove("hidden");
      });
    });

    document.getElementById("copy-json-btn").addEventListener("click", () => {
      const ta = document.getElementById("export-textarea");
      ta.select();
      try {
        document.execCommand("copy");
        alert("JSON已复制到剪贴板！");
      } catch (e) {
        alert("复制失败，请手动选择文本复制。");
      }
    });

    document.getElementById("copy-snippet-btn").addEventListener("click", () => {
      const ta = document.getElementById("export-snippet-textarea");
      ta.select();
      try {
        document.execCommand("copy");
        alert("代码片段已复制！粘贴到 js/data.js 即可。");
      } catch (e) {
        alert("复制失败，请手动选择文本复制。");
      }
    });

    document.getElementById("download-json-btn").addEventListener("click", () => {
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${map.id}_data.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // 生成可直接粘贴到 data.js 的代码片段
  function generateDataJsSnippet(mapId, mapName, exportObj) {
    // 生成 MAPS 数组中该地图的字段替换代码
    let snippet = `// =========================================\n`;
    snippet += `// ${mapName} (${mapId}) - 编辑器导出 ${new Date().toLocaleString('zh-CN')}\n`;
    snippet += `// =========================================\n\n`;

    snippet += `// --- 粘贴到 MAPS 数组中 id: "${mapId}" 的地图对象内 ---\n`;
    snippet += `// 替换该地图的 sites / commonSmokes / wallbangs / plantSpots 字段\n\n`;

    snippet += `sites: ${JSON.stringify(exportObj.sites, null, 2).replace(/^/gm, "  ").trim()},\n\n`;
    snippet += `commonSmokes: ${JSON.stringify(exportObj.commonSmokes, null, 2).replace(/^/gm, "  ").trim()},\n\n`;
    snippet += `wallbangs: ${JSON.stringify(exportObj.wallbangs, null, 2).replace(/^/gm, "  ").trim()},\n\n`;
    snippet += `plantSpots: ${JSON.stringify(exportObj.plantSpots, null, 2).replace(/^/gm, "  ").trim()},\n\n`;

    snippet += `\n// --- 粘贴到 LINEUPS 对象中，替换 "${mapId}: {...}" 整段 ---\n`;
    snippet += `${mapId}: ${JSON.stringify(exportObj.lineups, null, 2)},\n`;

    return snippet;
  }

  function importJSON() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          const map = app().getMap();
          const lineups = app().getLineups();

          if (data.commonSmokes) map.commonSmokes = data.commonSmokes;
          if (data.wallbangs) map.wallbangs = data.wallbangs;
          if (data.plantSpots) map.plantSpots = data.plantSpots;
          if (data.sites) map.sites = data.sites;
          if (data.lineups) lineups[map.id] = data.lineups;

          saveDraft();
          window.dispatchEvent(new Event("editor-data-updated"));
          alert("导入成功！");
        } catch (err) {
          alert("导入失败：" + err.message);
        }
      };
      reader.readAsText(file);
    });
    input.click();
  }

  // ==========================================
  // localStorage 草稿保存
  // ==========================================
  function saveDraft() {
    try {
      const map = app().getMap();
      const lineups = app().getLineups();
      const draftKey = "valorant_edit_draft_" + map.id;
      const draft = {
        map: JSON.parse(JSON.stringify(map)),
        lineups: JSON.parse(JSON.stringify(lineups[map.id] || {})),
        timestamp: Date.now()
      };
      localStorage.setItem(draftKey, JSON.stringify(draft));
    } catch (e) {
      console.warn("草稿保存失败:", e);
    }
  }

  function loadDraft(mapId) {
    try {
      const draftKey = "valorant_edit_draft_" + mapId;
      const saved = localStorage.getItem(draftKey);
      if (!saved) return null;
      return JSON.parse(saved);
    } catch (e) {
      return null;
    }
  }

  function hasDraft(mapId) {
    return !!loadDraft(mapId);
  }

  function restoreDraft(mapId) {
    const draft = loadDraft(mapId);
    if (!draft) return false;

    const { MAPS, LINEUPS } = app().getData();
    const mapIdx = MAPS.findIndex(m => m.id === mapId);
    if (mapIdx >= 0) {
      MAPS[mapIdx] = draft.map;
    }
    LINEUPS[mapId] = draft.lineups;
    return true;
  }

  function clearDraft(mapId) {
    localStorage.removeItem("valorant_edit_draft_" + mapId);
  }

  // ==========================================
  // 暴露接口
  // ==========================================
  window.MapEditor = {
    toggle,
    isActive,
    enter,
    exit,
    showEditPanel,
    hasDraft,
    restoreDraft,
    clearDraft,
    loadDraft,
    saveDraft
  };

  // 快捷键：E 切换编辑模式
  document.addEventListener("keydown", (e) => {
    if (e.key === "e" && e.ctrlKey && e.shiftKey) {
      e.preventDefault();
      toggle();
    }
  });

})();
