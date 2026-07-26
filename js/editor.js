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
  let lineDrawState = null; // 线烟绘制状态 { startX, startY, previewEl, canvasRect }
  let docEventsBound = false; // document 级别事件是否已绑定

  // 获取应用接口
  function app() { return window.__APP__; }

  // 判断是否处于进攻视图（180°翻转开）—— 从 app.js 的暴露函数读取
  function isAttackViewOn() {
    return !!(window.__APP__ && window.__APP__.isAttackView && window.__APP__.isAttackView());
  }

  // 屏幕 VIEW 坐标 → 存储 DATA 坐标
  //   进攻视图时：data.x = 100 - view.x, data.y = 100 - view.y
  function viewToData(x, y) {
    if (isAttackViewOn()) {
      return {
        x: Math.round(Math.max(0, Math.min(100, 100 - x)) * 10) / 10,
        y: Math.round(Math.max(0, Math.min(100, 100 - y)) * 10) / 10
      };
    }
    return {
      x: Math.round(Math.max(0, Math.min(100, x)) * 10) / 10,
      y: Math.round(Math.max(0, Math.min(100, y)) * 10) / 10
    };
  }

  // DATA 坐标 → VIEW 坐标（用于读取数据项的当前显示位置）
  function dataToView(item) {
    if (!item) return { x: 0, y: 0 };
    if (isAttackViewOn()) {
      return { x: 100 - (item.x || 0), y: 100 - (item.y || 0) };
    }
    return { x: item.x || 0, y: item.y || 0 };
  }

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
    document.body.classList.add("editing-mode");
    showEditBanner();
    app().rerender();
    // rerender 会重建 DOM，toolbar 和画布事件需要在 DOM 重建后重新绑定
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
    lineDrawState = null;
    dragState = null;
    isDragging = false;
    document.body.classList.remove("editing-mode");
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
      <span class="edit-banner-hint">A/B点/地名可拖拽，点击编辑；添加后请导出替换文件</span>
      <button class="edit-banner-btn" id="edit-map-settings-btn">◈ 地图设置</button>
      <button class="edit-banner-btn" id="edit-export-btn">导出JSON</button>
      <button class="edit-banner-btn" id="edit-export-file-btn">⬇ 导出map_xxx.js</button>
      <button class="edit-banner-btn" id="edit-import-btn">导入JSON</button>
      <span class="edit-banner-sep">|</span>
      <button class="edit-banner-btn" id="edit-csv-template-btn" title="下载CSV模板（含格式说明和示例）">📋 CSV模板</button>
      <button class="edit-banner-btn" id="edit-csv-export-btn" title="导出当前地图所有技能点位为CSV">⬇ 导出CSV</button>
      <button class="edit-banner-btn" id="edit-csv-import-btn" title="从CSV批量导入/更新技能点位">📥 导入CSV</button>
      <button class="edit-banner-btn warning" id="edit-clear-draft-btn">🗑 清除草稿</button>
      <button class="edit-banner-btn danger" id="edit-exit-btn">退出编辑</button>
    `;
    banner.style.display = "flex";

    document.getElementById("edit-export-btn").addEventListener("click", exportJSON);
    document.getElementById("edit-export-file-btn").addEventListener("click", exportMapFile);
    document.getElementById("edit-map-settings-btn").addEventListener("click", showMapSettingsPanel);
    document.getElementById("edit-import-btn").addEventListener("click", importJSON);
    document.getElementById("edit-csv-template-btn").addEventListener("click", exportCSVTemplate);
    document.getElementById("edit-csv-export-btn").addEventListener("click", exportCSV);
    document.getElementById("edit-csv-import-btn").addEventListener("click", showCSVImportPanel);
    document.getElementById("edit-clear-draft-btn").addEventListener("click", () => {
      const cur = app().getMap();
      const curName = cur ? (cur.name + " (当前)") : "";
      const all = Object.keys(localStorage).filter(k => k.startsWith("valorant_edit_draft_"));
      const total = all.length;
      if (total === 0) {
        alert("当前没有任何草稿，无需清理。");
        return;
      }
      const mapList = all.map(k => k.replace("valorant_edit_draft_", "")).join("、");
      const choice = confirm(
        "检测到 " + total + " 张地图存在本地草稿：\n" + mapList +
        "\n\n点击【确定】→ 清除【全部】草稿（推荐，可立即用代码里的最新数据）\n" +
        "点击【取消】→ 只清除当前地图" + (curName ? "（" + curName + "）" : "") + "的草稿"
      );
      let cleared = 0;
      if (choice) {
        all.forEach(k => { localStorage.removeItem(k); cleared++; });
        alert("已清除全部 " + cleared + " 张地图草稿。\n刷新页面后将使用代码里的最新数据。");
      } else if (cur) {
        clearDraft(cur.id);
        alert("已清除当前地图草稿：" + cur.name);
      }
    });
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
      { id: "add-site", label: "加A/B点", icon: "Ⓐ" },
      { id: "add-location", label: "加地名", icon: "🏷" },
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

    // canvas 事件每次都要重新绑定（DOM 重建后会丢失）
    canvas.addEventListener("click", handleCanvasClick, true);
    canvas.addEventListener("mousedown", handleCanvasMouseDown, true);

    // document 事件只需要绑定一次（不会被 DOM 重建移除）
    if (!docEventsBound) {
      docEventsBound = true;
      document.addEventListener("mousemove", handleEditorMouseMove);
      document.addEventListener("mouseup", handleEditorMouseUp);
    }
  }

  function handleCanvasClick(e) {
    if (!editMode) return;
    if (editTool === "select") return;
    if (editTool === "add-line") return; // 线烟由 mousedown/mouseup 处理
    // 如果点击的是已有标记，不处理（让标记自己处理）
    if (e.target.closest(".marker")) return;
    if (e.target.closest(".map-location-label")) return;

    const canvas = document.getElementById("map-canvas");
    const rect = canvas.getBoundingClientRect();
    let viewX = ((e.clientX - rect.left) / rect.width) * 100;
    let viewY = ((e.clientY - rect.top) / rect.height) * 100;

    // 标签点位用 data 坐标存
    const dataPos = viewToData(viewX, viewY);
    const dataX = dataPos.x;
    const dataY = dataPos.y;

    if (editTool === "add-site") {
      const nextId = prompt("请输入新据点ID（如 A / B / C）:", "C");
      if (!nextId) return;
      const idx = app().addLocationLabel("site", {
        id: nextId.trim().toUpperCase(),
        x: dataX,
        y: dataY,
        label: nextId.trim().toUpperCase() + "点"
      });
      if (idx >= 0) {
        saveDraft();
        app().reloadLabels && app().reloadLabels();
      }
      return;
    }

    if (editTool === "add-location") {
      const name = prompt("请输入地名（如 A Long / Mid / B Short）:", "New Spot");
      if (!name) return;
      const idx = app().addLocationLabel("location", {
        name: name.trim(),
        x: dataX,
        y: dataY,
        type: "route"
      });
      if (idx >= 0) {
        saveDraft();
        app().reloadLabels && app().reloadLabels();
      }
      return;
    }

    // 烟位/穿墙/下包/技能：传 VIEW 坐标，addMarkerAt 内部统一处理
    addMarkerAt(editTool, viewX, viewY);
  }

  function handleCanvasMouseDown(e) {
    if (!editMode) return;

    // 线烟绘制模式
    if (editTool === "add-line") {
      const marker = e.target.closest(".marker");
      if (marker) return; // 如果点到了已有标记，不处理
      const locLabel = e.target.closest(".map-location-label");
      if (locLabel) return;

      const canvas = document.getElementById("map-canvas");
      const rect = canvas.getBoundingClientRect();
      // 这里 startX/startY 保持 VIEW 空间（预览线就是在 VIEW 中画的），
      // mouseup 创建数据时再整体转回 DATA 坐标
      const startX = ((e.clientX - rect.left) / rect.width) * 100;
      const startY = ((e.clientY - rect.top) / rect.height) * 100;

      // 创建预览线元素
      const previewEl = document.createElement("div");
      previewEl.className = "line-smoke-preview";
      previewEl.style.cssText = "position:absolute; left:" + startX + "%; top:" + startY + "%; height:6px; background:rgba(0,255,150,0.5); border:1px dashed rgba(0,255,150,0.8); border-radius:3px; transform-origin:left center; pointer-events:none; z-index:100; width:0;";

      const markerLayer = document.getElementById("marker-layer");
      if (markerLayer) markerLayer.parentElement.appendChild(previewEl);

      lineDrawState = { startX: startX, startY: startY, previewEl: previewEl, canvasRect: rect };
      e.preventDefault();
      return;
    }

    // 选择/移动模式：先看站点/地名 label，再看 marker
    if (editTool !== "select") return;

    const locLabel = e.target.closest(".map-location-label");
    if (locLabel) {
      const kind = locLabel.dataset.labelKind; // "site" or "location"
      const idx = parseInt(locLabel.dataset.labelIndex, 10);
      if (!kind || isNaN(idx)) return;

      const canvas = document.getElementById("map-canvas");
      const rect = canvas.getBoundingClientRect();
      const obj = app().getLabelObject(kind, idx);
      if (!obj) return;

      // 记录 startView（显示坐标），拖动时在显示坐标空间里加减 delta，最后再转回 data 存储
      const v0 = dataToView(obj);
      dragState = {
        itemId: `__label_${kind}_${idx}`,
        startMouseX: e.clientX,
        startMouseY: e.clientY,
        canvasRect: rect,
        labelKind: kind,
        labelIndex: idx,
        item: obj,
        startViewX: v0.x,
        startViewY: v0.y
      };
      isDragging = false;
      editSelectedId = dragState.itemId;
      return;
    }

    const marker = e.target.closest(".marker");
    if (!marker) return;

    const itemId = marker.dataset.itemId;
    if (!itemId) return;

    // 判断拖拽目标：stand=只移动起点，ability=只移动落点
    const dragTarget = marker.dataset.dragTarget || "ability";

    editSelectedId = itemId;
    const canvas = document.getElementById("map-canvas");
    const rect = canvas.getBoundingClientRect();

    const item = findItem(itemId);
    if (!item) return;

    var v0, sv0;
    if (dragTarget === "stand" && item.standX !== undefined) {
      // 拖拽起点：记录起点位置
      sv0 = isAttackViewOn()
        ? { x: 100 - item.standX, y: 100 - item.standY }
        : { x: item.standX, y: item.standY };
      v0 = dataToView(item); // 仍需记录落点位置以备不时之需
    } else {
      // 拖拽落点：记录落点位置
      v0 = dataToView(item);
      if (item.standX !== undefined) {
        sv0 = isAttackViewOn()
          ? { x: 100 - item.standX, y: 100 - item.standY }
          : { x: item.standX, y: item.standY };
      }
    }

    dragState = {
      itemId: itemId,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      canvasRect: rect,
      item: item,
      dragTarget: dragTarget,
      startViewX: v0.x,
      startViewY: v0.y
    };

    if (sv0) {
      dragState.startStandViewX = sv0.x;
      dragState.startStandViewY = sv0.y;
    }
    isDragging = false;
  }

  function handleEditorMouseMove(e) {
    // 线烟绘制预览
    if (lineDrawState) {
      var startX = lineDrawState.startX;
      var startY = lineDrawState.startY;
      var previewEl = lineDrawState.previewEl;
      var canvasRect = lineDrawState.canvasRect;

      var currentX = ((e.clientX - canvasRect.left) / canvasRect.width) * 100;
      var currentY = ((e.clientY - canvasRect.top) / canvasRect.height) * 100;

      var dx = currentX - startX;
      var dy = currentY - startY;
      var length = Math.sqrt(dx * dx + dy * dy);
      var angle = Math.atan2(dy, dx) * (180 / Math.PI);

      previewEl.style.width = Math.max(0, length) + "%";
      previewEl.style.transform = "translateY(-50%) rotate(" + angle + "deg)";
      return;
    }

    // 原有的拖拽移动逻辑
    if (!dragState || !dragState.item) return;

    var dx = ((e.clientX - dragState.startMouseX) / dragState.canvasRect.width) * 100;
    var dy = ((e.clientY - dragState.startMouseY) / dragState.canvasRect.height) * 100;

    if (Math.abs(e.clientX - dragState.startMouseX) > 3 || Math.abs(e.clientY - dragState.startMouseY) > 3) {
      isDragging = true;
    }

    if (isDragging) {
      // 根据 dragTarget 决定移动哪个点
      if (dragState.dragTarget === "stand" && dragState.startStandViewX !== undefined) {
        // 只移动起点
        const newStandViewX = dragState.startStandViewX + dx;
        const newStandViewY = dragState.startStandViewY + dy;
        const standData = viewToData(newStandViewX, newStandViewY);
        dragState.item.standX = standData.x;
        dragState.item.standY = standData.y;
      } else {
        // 只移动落点
        const newViewX = dragState.startViewX + dx;
        const newViewY = dragState.startViewY + dy;
        const newData = viewToData(newViewX, newViewY);
        dragState.item.x = newData.x;
        dragState.item.y = newData.y;
      }

      // label 拖拽实时刷新 label 位置显示
      if (dragState.labelKind) {
        app().reloadLabels && app().reloadLabels();
      } else {
        app().renderMarkers();
      }
      updateEditPanelCoords();
    }
  }

  function handleEditorMouseUp(e) {
    // 线烟绘制完成
    if (lineDrawState) {
      var startX = lineDrawState.startX;  // VIEW 坐标
      var startY = lineDrawState.startY;
      var previewEl = lineDrawState.previewEl;
      var canvasRect = lineDrawState.canvasRect;

      // 移除预览元素
      if (previewEl && previewEl.parentElement) {
        previewEl.remove();
      }

      var currentViewX = ((e.clientX - canvasRect.left) / canvasRect.width) * 100;
      var currentViewY = ((e.clientY - canvasRect.top) / canvasRect.height) * 100;

      var dx = currentViewX - startX;
      var dy = currentViewY - startY;
      var length = Math.sqrt(dx * dx + dy * dy);
      var angle = Math.atan2(dy, dx) * (180 / Math.PI);

      lineDrawState = null;

      // 如果拖拽距离太小（< 2%），当做点击处理，创建默认线烟
      if (length < 2) {
        addMarkerAt("add-line", startX, startY);  // addMarkerAt 内部自己会 viewToData
      } else {
        // 将 VIEW 空间的起点/长度/角度转换为 DATA 坐标
        //   数据起点 = viewToData(startX, startY)
        //   数据长度 = 视图长度 (保持长度不变)
        //   数据角度：翻转 180° 时 x' = 100-x, y' = 100-y
        //     → 向量 (dx, dy) 变成 (-dx, -dy)，即角度 + 180°
        const dataStart = viewToData(startX, startY);
        const dataAngle = isAttackViewOn() ? (angle + 180) % 360 : angle;
        addLineSmokeAtData(dataStart.x, dataStart.y, length, dataAngle);
      }
      return;
    }

    // 原有的 mouseup 逻辑
    var wasLabelDrag = dragState && dragState.labelKind;
    var justDragged = isDragging;
    var selectedDragId = dragState ? dragState.itemId : null;

    if (isDragging) {
      saveDraft();
      var preventClick = function(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        document.removeEventListener("click", preventClick, true);
      };
      document.addEventListener("click", preventClick, true);
    }

    dragState = null;
    isDragging = false;

    // 如果选中了 label 且没拖拽，当成点击弹出编辑面板
    if (!justDragged && selectedDragId && selectedDragId.startsWith && selectedDragId.startsWith("__label_")) {
      const [, kind, idxStr] = selectedDragId.split("__")[1].split("_");
      const idx = parseInt(idxStr, 10);
      // 延后触发，避免和 click 事件冲突
      setTimeout(() => showLabelEditPanel(kind, idx), 30);
    }
  }

  // ==========================================
  // 数据操作
  // ==========================================
  function getCurrentList() {
    const map = app().getMap();
    const tab = app().getTab();
    const agent = app().getAgent();

    if (tab === "smoke-attack") {
      if (!map.attackSmokes) map.attackSmokes = [];
      return { list: map.attackSmokes, type: "smoke", side: "attack" };
    } else if (tab === "smoke-defend") {
      if (!map.defendSmokes) map.defendSmokes = [];
      return { list: map.defendSmokes, type: "smoke", side: "defend" };
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

  function addMarkerAt(tool, viewX, viewY) {
    const ctx = getCurrentList();
    if (!ctx) {
      alert("请先选择一个标签页（进攻烟位/防守烟位/穿墙点位/英雄技能）");
      return;
    }

    const dataPos = viewToData(viewX, viewY);
    const id = "edit_" + Date.now();
    let newItem = { id, x: dataPos.x, y: dataPos.y };

    if (tool === "add-ball") {
      newItem.type = "ball";
      newItem.name = "新球烟";
      newItem.desc = "";
      if (ctx.type === "smoke") {
        newItem.site = "";
        if (!newItem.tags) newItem.tags = [ctx.side === "attack" ? "进攻方" : "防守方"];
      }
    } else if (tool === "add-line") {
      newItem.type = "line";
      newItem.name = "新线烟";
      newItem.length = 20;
      newItem.angle = 0;
      newItem.desc = "";
      if (ctx.type === "smoke") {
        newItem.site = "";
        if (!newItem.tags) newItem.tags = [ctx.side === "attack" ? "进攻方" : "防守方"];
      }
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
      // 站位在 VIEW 空间相对 (viewX-10, viewY+10) 的位置 → 转回 DATA
      const standViewX = Math.max(0, Math.min(100, viewX - 10));
      const standViewY = Math.max(0, Math.min(100, viewY + 10));
      const standData = viewToData(standViewX, standViewY);
      newItem.standX = standData.x;
      newItem.standY = standData.y;
    }

    ctx.list.push(newItem);
    editSelectedId = id;
    saveDraft();
    // 只重新渲染标记，不要触发完整的 renderMapDetail（会丢失工具栏）
    app().renderMarkers();
    setTimeout(() => showEditPanel(id), 200);
  }

  // 传入 DATA 坐标（用于线烟绘制完成后创建，已经在外部做过坐标转换）
  function addLineSmokeAtData(x, y, length, angle) {
    const ctx = getCurrentList();
    if (!ctx) {
      alert("请先选择一个标签页（进攻烟位/防守烟位/穿墙点位/英雄技能）");
      return;
    }

    const id = "edit_" + Date.now();
    const newItem = {
      id: id,
      type: "line",
      name: "新线烟",
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      length: Math.round(length * 10) / 10,
      angle: Math.round(angle * 10) / 10,
      desc: ""
    };
    if (ctx.type === "smoke") {
      newItem.site = "";
      if (!newItem.tags) newItem.tags = [ctx.side === "attack" ? "进攻方" : "防守方"];
    }

    ctx.list.push(newItem);
    editSelectedId = id;
    saveDraft();
    app().renderMarkers();
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
      // 只重新渲染标记，不要触发完整的 renderMapDetail（会丢失工具栏）
      app().renderMarkers();
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
  // 标签编辑面板（站点 A/B / 地名）
  // ==========================================
  function showLabelEditPanel(kind, idx) {
    const obj = app().getLabelObject(kind, idx);
    if (!obj) return;

    const overlay = document.getElementById("detail-overlay");
    const panel = document.getElementById("detail-panel");
    if (!overlay || !panel) return;

    const isSite = kind === "site";
    const title = isSite ? `编辑站点（${obj.id || ""}）` : `编辑地名（${obj.name || ""}）`;

    let body = "";

    // 站点字段：id, label, x, y
    if (isSite) {
      body += renderInputField("站点ID（A/B/C）", "id", obj.id || "", "text");
      body += renderInputField("显示标签（如 A点）", "label", obj.label || "", "text");
    } else {
      body += renderInputField("地名文字", "name", obj.name || "", "text");
      body += renderSelectField("类型", "type", obj.type || "route", [
        { value: "route", label: "通道/通用" },
        { value: "site", label: "据点相关" },
        { value: "room", label: "房间" }
      ]);
    }

    body += renderInputField("X坐标(%)", "x", obj.x, "number", "0", "100", "0.1");
    body += renderInputField("Y坐标(%)", "y", obj.y, "number", "0", "100", "0.1");
    body += renderRangeField("字号(px)", "fontSize", obj.fontSize || (isSite ? 10 : 10), 6, 24, 1);

    panel.innerHTML = `
      <button class="detail-close" onclick="document.getElementById('detail-overlay').classList.add('hidden')">&times;</button>
      <div class="edit-panel-header">
        <div class="detail-title">${title}</div>
        <button class="edit-delete-btn" id="label-delete-btn">删除此${isSite ? "站点" : "地名"}</button>
      </div>
      <div class="edit-form" id="label-edit-form">
        ${body}
      </div>
      <div class="edit-form-actions">
        <button class="edit-save-btn" id="label-save-btn">保存修改</button>
      </div>
    `;

    overlay.classList.remove("hidden");

    // 绑定输入
    panel.querySelectorAll("[data-field]").forEach(inp => {
      const f = inp.dataset.field;
      inp.addEventListener("input", () => {
        let v = inp.value;
        if (f === "x" || f === "y") {
          v = parseFloat(v) || 0;
        } else if (f === "fontSize") {
          obj.fontSize = parseInt(v, 10) || (isSite ? 10 : 10);
          saveDraft();
          app().reloadLabels && app().reloadLabels();
          return;
        }
        obj[f] = v;
        saveDraft();
        app().reloadLabels && app().reloadLabels();
      });
      inp.addEventListener("change", () => {
        saveDraft();
        app().reloadLabels && app().reloadLabels();
      });
    });

    const saveBtn = document.getElementById("label-save-btn");
    if (saveBtn) saveBtn.addEventListener("click", () => {
      saveDraft();
      app().reloadLabels && app().reloadLabels();
      overlay.classList.add("hidden");
    });

    const delBtn = document.getElementById("label-delete-btn");
    if (delBtn) delBtn.addEventListener("click", () => {
      if (!confirm(`确定删除此${isSite ? "站点" : "地名"}？`)) return;
      app().removeLocationLabel(kind, idx);
      saveDraft();
      app().reloadLabels && app().reloadLabels();
      overlay.classList.add("hidden");
    });
  }

  // ==========================================
  // 地图设置面板（A/B字号 / 地名字号）
  // ==========================================
  function showMapSettingsPanel() {
    const map = app().getMap();
    const overlay = document.getElementById("detail-overlay");
    const panel = document.getElementById("detail-panel");
    if (!map || !overlay || !panel) return;

    const siteFontSize = map.siteFontSize || 10;
    const locFontSize = map.locationFontSize || 10;

    panel.innerHTML = `
      <button class="detail-close" onclick="document.getElementById('detail-overlay').classList.add('hidden')">&times;</button>
      <div class="detail-title">地图设置：${map.name} (${map.id})</div>
      <div class="edit-form">
        ${renderRangeField("A/B 点字号 (px)", "siteFontSize", siteFontSize, 6, 30, 1)}
        ${renderRangeField("地名字号 (px)", "locationFontSize", locFontSize, 6, 20, 1)}
      </div>
      <div style="color:#aaa;font-size:12px;margin-top:12px">
        ⓘ 图片方向 = 显示方向 = 数据坐标方向。若地图方向不对，<b>请直接旋转图片文件</b>（不再通过代码旋转）。<br>
        &nbsp;&nbsp;改完字号后，导出时会把这些字段也包含进 <code>_maps_meta.js</code> 的代码片段，直接复制覆盖即可。
      </div>
      <div class="edit-form-actions">
        <button class="edit-save-btn" id="ms-save-btn">保存并重渲染</button>
      </div>
    `;
    overlay.classList.remove("hidden");

    panel.querySelectorAll("[data-field]").forEach(inp => {
      inp.addEventListener("input", () => {
        const f = inp.dataset.field;
        map[f] = parseInt(inp.value, 10) || 10;
        saveDraft();
        app().reloadLabels && app().reloadLabels();
      });
    });

    const saveBtn = document.getElementById("ms-save-btn");
    if (saveBtn) saveBtn.addEventListener("click", () => {
      saveDraft();
      overlay.classList.add("hidden");
      app().rerender();
      setTimeout(() => {
        addEditToolbar();
        bindCanvasEvents();
      }, 100);
    });
  }

  // ==========================================
  // 生成 maps/<mapId>/base.js 的完整文件内容
  // （AB点sites / 字号 / 进攻烟+防守烟 / 穿墙 / 下包点 / 地名 = 所有非英雄数据）
  // ==========================================
  function buildMapBaseJsFileContent(mapId) {
    const { MAPS } = app().getData();
    const map = MAPS.find(m => m.id === mapId);
    if (!map) return "";
    const MAP_ID_UPPER = mapId.toUpperCase().replace(/[^A-Z0-9]/g, "_");
    const base = { mapId: mapId };
    ["sites","siteFontSize","locationFontSize","attackSmokes","defendSmokes","wallbangs","plantSpots","locations"]
      .forEach(k => { if (k in map) base[k] = map[k]; });
    if (!("locations" in base)) base.locations = [];
    if (!("attackSmokes" in base)) base.attackSmokes = [];
    if (!("defendSmokes" in base)) base.defendSmokes = [];

    return `// ==========================================
// 地图基础数据（非英雄）：${map.name} (${mapId})
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// 生成时间：${new Date().toISOString()}
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_${MAP_ID_UPPER}__BASE = ${JSON.stringify(base, null, 2)};
`;
  }

  // ==========================================
  // 生成 maps/<mapId>/agents/<agentId>.js 的完整文件内容
  // （该英雄在这张地图上的所有技能点位）
  // ==========================================
  function buildMapAgentJsFileContent(mapId, agentId) {
    const { LINEUPS, AGENTS } = app().getData();
    const arr = (LINEUPS[mapId] && LINEUPS[mapId][agentId]) || [];
    const agent = AGENTS.find(a => a.id === agentId);
    const MAP_ID_UPPER = mapId.toUpperCase().replace(/[^A-Z0-9]/g, "_");
    const agentName = agent ? agent.name : agentId;

    return `// ==========================================
// ${agentName}（${agentId}）在本地图的所有技能点位
// 所属地图：${mapId}
// 修改频率：高
// 生成时间：${new Date().toISOString()}
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};
if (!window.__VAL_DATA__.MAP_DATA_${MAP_ID_UPPER}__AGENTS) window.__VAL_DATA__.MAP_DATA_${MAP_ID_UPPER}__AGENTS = {};

window.__VAL_DATA__.MAP_DATA_${MAP_ID_UPPER}__AGENTS['${agentId}'] = ${JSON.stringify(arr, null, 2)};
`;
  }

  // 兼容旧函数别名（防止别的地方引用了 buildMapFileContent）
  function buildMapFileContent(mapId) { return buildMapBaseJsFileContent(mapId); }

  // ==========================================
  // 导出面板（新结构：base.js + 当前选中英雄.js，或一键打包所有英雄）
  // ==========================================
  function exportMapFile() {
    const map = app().getMap();
    if (!map) return;

    const { AGENTS } = app().getData();
    const mapId = map.id;

    const baseContent = buildMapBaseJsFileContent(mapId);
    const currentAgentId = (window.__CURRENT_AGENT_SELECTED__ && window.__CURRENT_AGENT_SELECTED__[mapId]) || AGENTS[0].id;

    const overlay = document.getElementById("detail-overlay");
    const panel = document.getElementById("detail-panel");

    const agentOpts = AGENTS.map(a =>
      `<option value="${a.id}" ${a.id===currentAgentId?'selected':''}>${a.name} (${a.id})</option>`
    ).join("");

    panel.innerHTML = `
      <button class="detail-close" onclick="document.getElementById('detail-overlay').classList.add('hidden')">&times;</button>
      <div class="detail-title">导出并替换本地文件 — ${map.name} (${mapId})</div>
      <div class="edit-export-info">
        <div style="margin-bottom:8px;color:#ccc">
          ✅ 按你选的新结构：<code>js/data/maps/${mapId}/</code> 目录下有 <b>1 个 base.js</b> + <b>25 个 agents/*.js</b>（每英雄一个文件）。<br>
          ⓘ <b>日常高频修改 → agents/当前英雄.js</b>；<b>中低频修改 → base.js</b>（地名/AB点/进攻烟+防守烟）。
        </div>
        <div class="export-tabs">
          <button class="export-tab-btn active" data-tab="base">① 导出 base.js（AB点 / 地名 / 攻/守烟 等）</button>
          <button class="export-tab-btn" data-tab="agent">② 导出 当前英雄 的 agents/XXX.js</button>
          <button class="export-tab-btn" data-tab="all">③ 一键下载本图 26 个文件（base.js + 25 英雄）</button>
          <button class="export-tab-btn" data-tab="how">操作说明</button>
        </div>

        <div class="export-tab-content" id="export-tab-base">
          <div class="export-snippet-info">
            复制 → 全选覆盖 <code>js/data/maps/${mapId}/base.js</code> → 保存 → <b>Ctrl+Shift+R 强制刷新</b>
          </div>
          <textarea class="edit-export-textarea" id="export-ta-base" spellcheck="false">${baseContent.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</textarea>
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px">
            <button class="edit-save-btn" id="copy-base-btn">📋 复制 base.js 内容</button>
            <button class="edit-save-btn" id="dl-base-btn">⬇ 下载 base.js</button>
          </div>
        </div>

        <div class="export-tab-content hidden" id="export-tab-agent">
          <div style="margin-bottom:10px">
            <label style="margin-right:8px">选择要导出的英雄：</label>
            <select id="export-agent-sel" style="padding:4px 8px">${agentOpts}</select>
          </div>
          <div class="export-snippet-info">
            复制 → 全选覆盖 <code>js/data/maps/${mapId}/agents/<span id="export-agent-filename">${currentAgentId}.js</span></code> → 保存 → <b>Ctrl+Shift+R 强制刷新</b>
          </div>
          <textarea class="edit-export-textarea" id="export-ta-agent" spellcheck="false"></textarea>
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px">
            <button class="edit-save-btn" id="copy-agent-btn">📋 复制该英雄文件内容</button>
            <button class="edit-save-btn" id="dl-agent-btn">⬇ 下载该英雄.js</button>
          </div>
        </div>

        <div class="export-tab-content hidden" id="export-tab-all">
          <div class="export-guide">
            <h3>一键下载本图 26 个文件</h3>
            <p>点击后浏览器会依次自动下载 <b>1 个 base.js</b> + <b>25 个 agents/*.js</b>，
               下载完后把这 26 个文件按文件夹结构放进 <code>js/data/maps/${mapId}/</code> 和 <code>js/data/maps/${mapId}/agents/</code> 下覆盖即可。</p>
            <p style="color:#aaa">注：浏览器安全限制无法直接下 ZIP（需外部库），这里用 26 次单个下载代替；如果嫌麻烦，只替换「①/② 单个文件」就够了（通常只改了这俩）。</p>
            <button class="edit-save-btn" id="dl-all-btn" style="width:100%;font-size:16px;padding:12px">⬇ 一键下载本图 26 个文件（base.js + 25 英雄）</button>
          </div>
        </div>

        <div class="export-tab-content hidden" id="export-tab-how">
          <div class="export-guide">
            <h3>永久保存你的修改（新结构版）</h3>
            <ol>
              <li><b>改了 A/B 点、地名、字号、进攻烟/防守烟/穿墙/下包点</b> → 切到「① 导出 base.js」，复制/下载，覆盖 <code>js/data/maps/${mapId}/base.js</code>。</li>
              <li><b>改了某个英雄的技能点位</b> → 切到「② 导出 当前英雄.js」，选对英雄，复制/下载覆盖 <code>js/data/maps/${mapId}/agents/XXX.js</code>。</li>
              <li>回到浏览器，<b>Ctrl+Shift+R 强制刷新</b>（必须！否则会用旧缓存的 agents/*.js）。</li>
              <li>第一次用新结构别忘了<b>清草稿</b>：F12 → Console 执行：<code>Object.keys(localStorage).filter(k=>k.startsWith('valorant_edit_draft_')).forEach(k=>localStorage.removeItem(k))</code>。</li>
            </ol>
          </div>
        </div>
      </div>
    `;
    overlay.classList.remove("hidden");

    panel.querySelectorAll(".export-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        panel.querySelectorAll(".export-tab-btn").forEach(b => b.classList.remove("active"));
        panel.querySelectorAll(".export-tab-content").forEach(c => c.classList.add("hidden"));
        btn.classList.add("active");
        document.getElementById("export-tab-" + btn.dataset.tab).classList.remove("hidden");
        if (btn.dataset.tab === "agent") renderAgentTextarea();
      });
    });

    function renderAgentTextarea() {
      const sel = document.getElementById("export-agent-sel");
      if (!sel) return;
      const aid = sel.value;
      document.getElementById("export-ta-agent").value = buildMapAgentJsFileContent(mapId, aid);
      document.getElementById("export-agent-filename").textContent = aid + ".js";
    }
    document.getElementById("export-agent-sel").addEventListener("change", renderAgentTextarea);
    renderAgentTextarea();

    const copyToClipboard = (text, btn) => {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch(e){}
      document.body.removeChild(ta);
      const old = btn.textContent;
      btn.textContent = "✅ 已复制！";
      setTimeout(() => btn.textContent = old, 1500);
    };
    const dlTextAsFile = (text, filename) => {
      const blob = new Blob([text], { type: "application/javascript;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1500);
    };

    document.getElementById("copy-base-btn").addEventListener("click", e => copyToClipboard(baseContent, e.currentTarget));
    document.getElementById("dl-base-btn").addEventListener("click", () => dlTextAsFile(baseContent, "base.js"));

    document.getElementById("copy-agent-btn").addEventListener("click", e => {
      const aid = document.getElementById("export-agent-sel").value;
      copyToClipboard(buildMapAgentJsFileContent(mapId, aid), e.currentTarget);
    });
    document.getElementById("dl-agent-btn").addEventListener("click", () => {
      const aid = document.getElementById("export-agent-sel").value;
      dlTextAsFile(buildMapAgentJsFileContent(mapId, aid), aid + ".js");
    });

    document.getElementById("dl-all-btn").addEventListener("click", () => {
      dlTextAsFile(baseContent, `maps_${mapId}__base.js`);
      AGENTS.forEach((ag, i) => {
        setTimeout(() => {
          dlTextAsFile(buildMapAgentJsFileContent(mapId, ag.id), `maps_${mapId}__agents_${ag.id}.js`);
        }, 180 * (i + 1));
      });
    });
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

    // 标签编辑（攻防标签 + 自定义标签）
    fieldsHtml += `<div class="edit-section-title">标签</div>`;
    const currentTags = item.tags || [];
    const presetTags = ["进攻方", "防守方"];
    fieldsHtml += `<div class="edit-form-group">`;
    fieldsHtml += `<label class="edit-group-label">预设标签</label>`;
    fieldsHtml += `<div class="tag-checkbox-group">`;
    presetTags.forEach(tag => {
      const checked = currentTags.includes(tag) ? "checked" : "";
      fieldsHtml += `<label class="tag-checkbox"><input type="checkbox" data-tag-toggle="${tag}" ${checked}><span>${tag}</span></label>`;
    });
    fieldsHtml += `</div>`;
    // 显示自定义标签
    const customTags = currentTags.filter(t => !presetTags.includes(t));
    fieldsHtml += `<label class="edit-group-label">自定义标签</label>`;
    fieldsHtml += `<div class="tag-custom-list" id="tag-custom-list">`;
    customTags.forEach(tag => {
      fieldsHtml += `<span class="tag-custom-item">${tag}<button type="button" data-tag-remove="${tag}" class="tag-remove-btn">&times;</button></span>`;
    });
    fieldsHtml += `</div>`;
    fieldsHtml += `<div class="tag-add-row">`;
    fieldsHtml += `<input type="text" id="tag-new-input" class="edit-input tag-new-input" placeholder="输入自定义标签名" />`;
    fieldsHtml += `<button type="button" id="tag-add-btn" class="tag-add-btn">添加</button>`;
    fieldsHtml += `</div>`;
    fieldsHtml += `</div>`;

    // 图片字段
    fieldsHtml += `<div class="edit-section-title">图片与说明（可选）</div>`;
    fieldsHtml += renderInputField("站位图路径", "standImg", item.standImg || "", "text", "", "", "", "lineups/xxx_stand.jpg");
    fieldsHtml += renderInputField("站位图说明", "standDesc", item.standDesc || "", "text", "", "", "", "站在角落，面向A点方向");
    fieldsHtml += renderInputField("瞄点图路径", "aimImg", item.aimImg || "", "text", "", "", "", "lineups/xxx_aim.jpg");
    fieldsHtml += renderInputField("瞄点图说明", "aimDesc", item.aimDesc || "", "text", "", "", "", "准星对准屋顶边缘");
    fieldsHtml += renderInputField("效果图路径", "effectImg", item.effectImg || "", "text", "", "", "", "lineups/xxx_effect.jpg");
    fieldsHtml += renderInputField("效果图说明", "effectDesc", item.effectDesc || "", "text", "", "", "", "封锁回防路线");
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

    // 绑定标签切换事件
    panel.querySelectorAll("[data-tag-toggle]").forEach(cb => {
      cb.addEventListener("change", () => {
        const tag = cb.dataset.tagToggle;
        const item = findItem(itemId);
        if (!item) return;
        if (!item.tags) item.tags = [];
        if (cb.checked) {
          if (!item.tags.includes(tag)) item.tags.push(tag);
        } else {
          item.tags = item.tags.filter(t => t !== tag);
        }
        saveDraft();
      });
    });

    // 绑定标签删除事件
    panel.querySelectorAll("[data-tag-remove]").forEach(btn => {
      btn.addEventListener("click", () => {
        const tag = btn.dataset.tagRemove;
        const item = findItem(itemId);
        if (!item || !item.tags) return;
        item.tags = item.tags.filter(t => t !== tag);
        btn.parentElement.remove();
        saveDraft();
      });
    });

    // 绑定添加自定义标签
    const tagAddBtn = document.getElementById("tag-add-btn");
    const tagNewInput = document.getElementById("tag-new-input");
    if (tagAddBtn && tagNewInput) {
      const addTag = () => {
        const tag = tagNewInput.value.trim();
        if (!tag) return;
        const item = findItem(itemId);
        if (!item) return;
        if (!item.tags) item.tags = [];
        if (!item.tags.includes(tag)) {
          item.tags.push(tag);
          // 添加到显示列表
          const list = document.getElementById("tag-custom-list");
          if (list) {
            const el = document.createElement("span");
            el.className = "tag-custom-item";
            el.innerHTML = `${tag}<button type="button" data-tag-remove="${tag}" class="tag-remove-btn">&times;</button>`;
            el.querySelector("button").addEventListener("click", () => {
              const it = findItem(itemId);
              if (it && it.tags) {
                it.tags = it.tags.filter(t => t !== tag);
                el.remove();
                saveDraft();
              }
            });
            list.appendChild(el);
          }
          tagNewInput.value = "";
          saveDraft();
        }
      };
      tagAddBtn.addEventListener("click", addTag);
      tagNewInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          addTag();
        }
      });
    }

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

    mapData.attackSmokes = (mapData.attackSmokes || []).map(cleanId);
    mapData.defendSmokes = (mapData.defendSmokes || []).map(cleanId);
    mapData.wallbangs = (mapData.wallbangs || []).map(cleanId);
    mapData.plantSpots = (mapData.plantSpots || []).map(cleanId);
    Object.keys(lineupData).forEach(agent => {
      lineupData[agent] = lineupData[agent].map(cleanId);
    });

    const exportObj = {
      mapId: map.id,
      mapName: map.name,
      sites: mapData.sites,
      attackSmokes: mapData.attackSmokes,
      defendSmokes: mapData.defendSmokes,
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

    const atkCount = mapData.attackSmokes.length;
    const defCount = mapData.defendSmokes.length;
    const wallbangCount = mapData.wallbangs.length;
    const plantCount = mapData.plantSpots.length;
    const agentCount = Object.keys(lineupData).length;
    const lineupCount = Object.values(lineupData).reduce((sum, arr) => sum + arr.length, 0);

    panel.innerHTML = `
      <button class="detail-close" onclick="document.getElementById('detail-overlay').classList.add('hidden')">&times;</button>
      <div class="detail-title">导出数据 - ${map.name} (${map.id})</div>
      <div class="edit-export-info">
        <div class="export-stats">
          <span class="export-stat">进攻烟位: ${atkCount}</span>
          <span class="export-stat">防守烟位: ${defCount}</span>
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
            <br>• MAPS 数组中找到 <code>id: "${map.id}"</code> 的地图，替换其 attackSmokes / defendSmokes / wallbangs / plantSpots / sites
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
    snippet += `// 替换该地图的 sites / attackSmokes / defendSmokes / wallbangs / plantSpots 字段\n\n`;

    snippet += `sites: ${JSON.stringify(exportObj.sites, null, 2).replace(/^/gm, "  ").trim()},\n\n`;
    snippet += `attackSmokes: ${JSON.stringify(exportObj.attackSmokes, null, 2).replace(/^/gm, "  ").trim()},\n\n`;
    snippet += `defendSmokes: ${JSON.stringify(exportObj.defendSmokes, null, 2).replace(/^/gm, "  ").trim()},\n\n`;
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

          if (data.attackSmokes) map.attackSmokes = data.attackSmokes;
          if (data.defendSmokes) map.defendSmokes = data.defendSmokes;
          // 兼容旧数据：commonSmokes 拆成两份
          if (data.commonSmokes && !data.attackSmokes && !data.defendSmokes) {
            map.attackSmokes = data.commonSmokes.filter(s => (s.tags || []).includes("进攻方"));
            map.defendSmokes = data.commonSmokes.filter(s => (s.tags || []).includes("防守方"));
          }
          if (data.wallbangs) map.wallbangs = data.wallbangs;
          if (data.plantSpots) map.plantSpots = data.plantSpots;
          if (data.sites) map.sites = data.sites;
          if (data.lineups) lineups[map.id] = data.lineups;

          saveDraft();
          // 导入后需要完整重渲染，但编辑器模式需要恢复工具栏
          if (isActive()) {
            app().rerender();
            setTimeout(() => {
              addEditToolbar();
              bindCanvasEvents();
            }, 100);
          } else {
            window.dispatchEvent(new Event("editor-data-updated"));
          }
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
  // CSV 批量导入导出
  // ==========================================

  var CSV_COLUMNS = [
    "mapId", "agentId", "ability", "abilityName", "name", "type",
    "x", "y", "standX", "standY",
    "desc", "crosshair",
    "standImg", "standDesc", "aimImg", "aimDesc", "effectImg", "effectDesc",
    "video", "tags"
  ];

  // CSV 字段转义：含逗号/引号/换行时用双引号包裹，内部引号双写
  function csvEscape(val) {
    if (val === null || val === undefined) return "";
    var s = String(val);
    if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  }

  // 解析 CSV 文本 → 二维数组（支持引号包裹、跨行字段）
  function parseCSV(text) {
    if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1); // 去BOM
    var rows = [], row = [], field = "", inQuotes = false;
    for (var i = 0; i < text.length; i++) {
      var ch = text[i], next = text[i + 1];
      if (inQuotes) {
        if (ch === '"' && next === '"') { field += '"'; i++; }
        else if (ch === '"') { inQuotes = false; }
        else { field += ch; }
      } else {
        if (ch === '"') { inQuotes = true; }
        else if (ch === ',') { row.push(field); field = ""; }
        else if (ch === '\n' || ch === '\r') {
          if (ch === '\r' && next === '\n') i++;
          if (field !== "" || row.length > 0) { row.push(field); rows.push(row); row = []; field = ""; }
        } else { field += ch; }
      }
    }
    if (field !== "" || row.length > 0) { row.push(field); rows.push(row); }
    return rows;
  }

  // 将 CSV 行数组 → lineup 对象
  function csvRowToLineup(header, row, mapId) {
    var obj = {};
    for (var i = 0; i < header.length && i < row.length; i++) {
      obj[header[i].trim()] = (row[i] || "").trim();
    }
    // tags 字符串 → 数组
    var tags = [];
    if (obj.tags) tags = obj.tags.split(";").map(function(t) { return t.trim(); }).filter(Boolean);

    var agentId = obj.agentId || "";
    var ability = (obj.ability || "").toUpperCase();

    // 生成 id（如果 CSV 没有提供）
    var id = obj.id;
    if (!id) {
      var tagStr = tags.length > 0 ? tags[0] : "other";
      id = (obj.mapId || mapId) + "_" + agentId + "_" + ability + "_" + tagStr + "_" + Date.now().toString(36);
    }

    return {
      id: id,
      ability: ability,
      abilityName: obj.abilityName || "",
      name: obj.name || "",
      type: obj.type || "other",
      x: parseFloat(obj.x) || 0,
      y: parseFloat(obj.y) || 0,
      standX: parseFloat(obj.standX) || 0,
      standY: parseFloat(obj.standY) || 0,
      desc: obj.desc || "",
      crosshair: obj.crosshair || "",
      standImg: obj.standImg || "",
      standDesc: obj.standDesc || "",
      aimImg: obj.aimImg || "",
      aimDesc: obj.aimDesc || "",
      effectImg: obj.effectImg || "",
      effectDesc: obj.effectDesc || "",
      video: obj.video || "",
      tags: tags
    };
  }

  // ---- 导出 CSV 模板（含说明和示例）----
  function exportCSVTemplate() {
    var map = app().getMap();
    var BOM = "\uFEFF";

    var lines = [];
    lines.push("# 无畏契约战术查询 - CSV技能点位数据模板");
    lines.push("# 生成时间: " + new Date().toLocaleString("zh-CN"));
    lines.push("# 当前地图: " + map.name + " (" + map.id + ")");
    lines.push("#");
    lines.push("# 使用方法:");
    lines.push("#   1. 用 Excel / WPS / Google Sheets 打开此文件");
    lines.push("#   2. 按行填写数据，每一行 = 一个技能点位");
    lines.push("#   3. 保存为 CSV (UTF-8) 格式");
    lines.push("#   4. 在编辑模式点击「导入CSV」上传此文件");
    lines.push("#   5. 图片文件请手动放到 lineups/ 目录，CSV中填写路径即可");
    lines.push("#");
    lines.push("# 字段说明:");
    lines.push("#   mapId        地图ID (如 " + map.id + ")");
    lines.push("#   agentId      英雄ID (brimstone/jett/omen/viper/sage/cypher/reyna/raze/breach/sova/killjoy/phoenix)");
    lines.push("#   ability      技能键位 (Q/E/C/X)");
    lines.push("#   abilityName  技能名称 (如 燃烧榴弹)");
    lines.push("#   name         技能点位名称");
    lines.push("#   type         类型 (attack=进攻 defense=防守 other=其他)");
    lines.push("#   x, y         技能落点坐标 (0-100 百分比)");
    lines.push("#   standX, standY  站位坐标 (0-100 百分比)");
    lines.push("#   desc         站位文字描述");
    lines.push("#   crosshair    落点/准星文字描述");
    lines.push("#   standImg     站位图路径 (如 lineups/haven_brim_Q0_stand.jpg，留空=不显示)");
    lines.push("#   standDesc    站位图说明");
    lines.push("#   aimImg       瞄点图路径");
    lines.push("#   aimDesc      瞄点图说明");
    lines.push("#   effectImg    效果图路径");
    lines.push("#   effectDesc   效果图说明");
    lines.push("#   video        视频链接 (YouTube/B站等)");
    lines.push("#   tags         标签 (多个用分号分隔，如 进攻方;A点)");
    lines.push("#");
    lines.push("# 注意: 以 # 开头的行在导入时自动跳过，请勿删除表头行");

    // 表头
    lines.push(CSV_COLUMNS.join(","));

    // 示例行 1 — 进攻
    lines.push([
      map.id, "brimstone", "Q", "燃烧榴弹", "示例-A点烟雾弹", "attack",
      "85.5", "45.2", "62.3", "70.1",
      "站在重生点右侧角落，背靠墙壁", "准星对准屋顶边缘左侧",
      "lineups/haven_brim_Q0_stand.jpg", "站位图说明",
      "lineups/haven_brim_Q0_aim.jpg", "瞄点图说明",
      "", "效果图说明",
      "https://www.youtube.com/watch?v=xxx", "进攻方;A点"
    ].map(csvEscape).join(","));

    // 示例行 2 — 防守
    lines.push([
      map.id, "viper", "E", "毒雾", "示例-B点防守烟", "defense",
      "72.0", "48.5", "55.0", "60.0",
      "B通入口右侧", "准星对准B包点上沿",
      "", "", "", "", "", "",
      "", "防守方;B点"
    ].map(csvEscape).join(","));

    var csv = BOM + lines.join("\n") + "\n";

    var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = map.id + "_csv_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  // ---- 导出当前地图 CSV ----
  function exportCSV() {
    var map = app().getMap();
    var lineups = app().getLineups();
    var mapLineups = lineups[map.id] || {};

    var BOM = "\uFEFF";
    var rows = [];
    rows.push(CSV_COLUMNS.join(","));

    var agentCount = 0, itemCount = 0;

    Object.keys(mapLineups).forEach(function(agentId) {
      agentCount++;
      (mapLineups[agentId] || []).forEach(function(item) {
        itemCount++;
        rows.push([
          map.id, agentId,
          item.ability || "", item.abilityName || "",
          item.name || "", item.type || "",
          item.x != null ? item.x : "", item.y != null ? item.y : "",
          item.standX != null ? item.standX : "", item.standY != null ? item.standY : "",
          item.desc || "", item.crosshair || "",
          item.standImg || "", item.standDesc || "",
          item.aimImg || "", item.aimDesc || "",
          item.effectImg || "", item.effectDesc || "",
          item.video || "",
          (item.tags || []).join(";")
        ].map(csvEscape).join(","));
      });
    });

    if (itemCount === 0) {
      alert("当前地图没有技能点位数据，请先使用「CSV模板」创建。");
      return;
    }

    var csv = BOM + rows.join("\n") + "\n";
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = map.id + "_lineups.csv";
    a.click();
    URL.revokeObjectURL(url);

    alert("已导出 " + agentCount + " 个英雄、" + itemCount + " 个技能点位。");
  }

  // ---- 导入 CSV 说明面板 ----
  function showCSVImportPanel() {
    var map = app().getMap();
    var overlay = document.getElementById("detail-overlay");
    var panel = document.getElementById("detail-panel");

    // 可选英雄列表
    var agentList = ["brimstone", "jett", "omen", "viper", "sage", "cypher", "reyna", "raze", "breach", "sova", "killjoy", "phoenix"];

    panel.innerHTML = [
      '<button class="detail-close" onclick="document.getElementById(\'detail-overlay\').classList.add(\'hidden\')">&times;</button>',
      '<div class="detail-title">导入 CSV — ' + map.name + ' (' + map.id + ')</div>',
      '<div style="padding: 16px; max-height: 72vh; overflow-y: auto; font-size: 13px; line-height: 1.6;">',

      // ---- 格式说明 ----
      '<h3 style="color:#ff4655; margin:0 0 8px;">格式说明</h3>',
      '<p style="color:#aaa; margin:0 0 10px;">CSV 文件需包含以下列（表头行必须与此一致，顺序不限）：</p>',
      '<div style="background:#1a1a2e; border:1px solid #333; border-radius:6px; padding:10px 12px; font-family:monospace; font-size:11px; color:#8be9fd; margin-bottom:14px; overflow-x:auto; white-space:nowrap;">',
      CSV_COLUMNS.join(", "),
      '</div>',

      // ---- 字段说明表 ----
      '<h3 style="color:#ff4655; margin:0 0 8px;">字段说明</h3>',
      '<table style="width:100%; border-collapse:collapse; margin-bottom:14px; font-size:12px;">',
      '<tr style="background:#1a1a2e;">',
      '<th style="padding:5px 8px; text-align:left; border:1px solid #333; color:#ff4655;">字段</th>',
      '<th style="padding:5px 8px; text-align:left; border:1px solid #333; color:#ff4655;">说明</th>',
      '<th style="padding:5px 8px; text-align:left; border:1px solid #333; color:#ff4655;">示例</th>',
      '</tr>',
      '<tr><td style="padding:4px 8px; border:1px solid #333; color:#8be9fd;">mapId</td><td style="padding:4px 8px; border:1px solid #333;">地图ID</td><td style="padding:4px 8px; border:1px solid #333; color:#888;">' + map.id + '</td></tr>',
      '<tr><td style="padding:4px 8px; border:1px solid #333; color:#8be9fd;">agentId</td><td style="padding:4px 8px; border:1px solid #333;">英雄ID（小写英文）</td><td style="padding:4px 8px; border:1px solid #333; color:#888;">brimstone</td></tr>',
      '<tr><td style="padding:4px 8px; border:1px solid #333; color:#8be9fd;">ability</td><td style="padding:4px 8px; border:1px solid #333;">技能键位 Q / E / C / X</td><td style="padding:4px 8px; border:1px solid #333; color:#888;">Q</td></tr>',
      '<tr><td style="padding:4px 8px; border:1px solid #333; color:#8be9fd;">abilityName</td><td style="padding:4px 8px; border:1px solid #333;">技能中文名称</td><td style="padding:4px 8px; border:1px solid #333; color:#888;">燃烧榴弹</td></tr>',
      '<tr><td style="padding:4px 8px; border:1px solid #333; color:#8be9fd;">name</td><td style="padding:4px 8px; border:1px solid #333;">点位名称</td><td style="padding:4px 8px; border:1px solid #333; color:#888;">A点烟雾弹</td></tr>',
      '<tr><td style="padding:4px 8px; border:1px solid #333; color:#8be9fd;">type</td><td style="padding:4px 8px; border:1px solid #333;">类型：attack / defense / other</td><td style="padding:4px 8px; border:1px solid #333; color:#888;">attack</td></tr>',
      '<tr><td style="padding:4px 8px; border:1px solid #333; color:#8be9fd;">x, y</td><td style="padding:4px 8px; border:1px solid #333;">落点坐标 (0-100)</td><td style="padding:4px 8px; border:1px solid #333; color:#888;">85.5, 45.2</td></tr>',
      '<tr><td style="padding:4px 8px; border:1px solid #333; color:#8be9fd;">standX, standY</td><td style="padding:4px 8px; border:1px solid #333;">站位坐标 (0-100)</td><td style="padding:4px 8px; border:1px solid #333; color:#888;">62.3, 70.1</td></tr>',
      '<tr><td style="padding:4px 8px; border:1px solid #333; color:#8be9fd;">desc</td><td style="padding:4px 8px; border:1px solid #333;">站位文字描述</td><td style="padding:4px 8px; border:1px solid #333; color:#888;">站在重生点右侧</td></tr>',
      '<tr><td style="padding:4px 8px; border:1px solid #333; color:#8be9fd;">crosshair</td><td style="padding:4px 8px; border:1px solid #333;">落点/准星描述</td><td style="padding:4px 8px; border:1px solid #333; color:#888;">准星对准屋顶</td></tr>',
      '<tr><td style="padding:4px 8px; border:1px solid #333; color:#8be9fd;">standImg</td><td style="padding:4px 8px; border:1px solid #333;">站位图路径（可留空）</td><td style="padding:4px 8px; border:1px solid #333; color:#888;">lineups/xxx.jpg</td></tr>',
      '<tr><td style="padding:4px 8px; border:1px solid #333; color:#8be9fd;">standDesc</td><td style="padding:4px 8px; border:1px solid #333;">站位图说明</td><td style="padding:4px 8px; border:1px solid #333; color:#888;">背靠墙壁</td></tr>',
      '<tr><td style="padding:4px 8px; border:1px solid #333; color:#8be9fd;">aimImg / aimDesc</td><td style="padding:4px 8px; border:1px solid #333;">瞄点图路径 / 说明</td><td style="padding:4px 8px; border:1px solid #333; color:#888;">同上</td></tr>',
      '<tr><td style="padding:4px 8px; border:1px solid #333; color:#8be9fd;">effectImg / effectDesc</td><td style="padding:4px 8px; border:1px solid #333;">效果图路径 / 说明</td><td style="padding:4px 8px; border:1px solid #333; color:#888;">同上</td></tr>',
      '<tr><td style="padding:4px 8px; border:1px solid #333; color:#8be9fd;">video</td><td style="padding:4px 8px; border:1px solid #333;">视频链接</td><td style="padding:4px 8px; border:1px solid #333; color:#888;">https://...</td></tr>',
      '<tr><td style="padding:4px 8px; border:1px solid #333; color:#8be9fd;">tags</td><td style="padding:4px 8px; border:1px solid #333;">标签（分号分隔）</td><td style="padding:4px 8px; border:1px solid #333; color:#888;">进攻方;A点</td></tr>',
      '</table>',

      // ---- 示例 ----
      '<h3 style="color:#ff4655; margin:0 0 8px;">示例数据</h3>',
      '<div style="background:#1a1a2e; border:1px solid #333; border-radius:6px; padding:10px 12px; font-family:monospace; font-size:11px; color:#8be9fd; margin-bottom:6px; overflow-x:auto; white-space:nowrap;">',
      CSV_COLUMNS.join(","),
      '</div>',
      '<div style="background:#1a1a2e; border:1px solid #333; border-radius:6px; padding:10px 12px; font-family:monospace; font-size:11px; color:#50fa7b; margin-bottom:14px; overflow-x:auto; white-space:nowrap;">',
      [map.id, "brimstone", "Q", "燃烧榴弹", "A点烟雾弹", "attack", "85.5", "45.2", "62.3", "70.1", "站在重生点右侧", "准星对准屋顶边缘", "lineups/xxx_stand.jpg", "站位说明", "lineups/xxx_aim.jpg", "瞄点说明", "", "效果说明", "https://youtu.be/xxx", "进攻方;A点"].map(csvEscape).join(","),
      '</div>',

      // ---- 注意事项 ----
      '<div style="background:#1e1e30; border-left:3px solid #ffcc00; padding:10px 14px; margin-bottom:16px; border-radius:0 4px 4px 0;">',
      '<b style="color:#ffcc00;">注意事项</b><br>',
      '<span style="color:#ccc;">• <b>#</b> 开头的行自动跳过（注释行）<br>',
      '• 坐标范围 0-100，表示地图宽高的百分比<br>',
      '• 图片需手动放到 <code style="color:#8be9fd;">lineups/</code> 目录，CSV 中只填路径<br>',
      '• Excel 保存时选择 <b>CSV UTF-8</b> 格式，否则中文可能乱码<br>',
      '• 可用英雄ID：' + agentList.join(", ") + '</span>',
      '</div>',

      // ---- 导入模式选择 ----
      '<h3 style="color:#ff4655; margin:0 0 8px;">选择导入模式</h3>',
      '<div style="margin-bottom:16px;">',
      '<label style="display:block; margin-bottom:6px; cursor:pointer;"><input type="radio" name="csv-mode" value="merge" checked style="margin-right:6px;">',
      '<b style="color:#50fa7b;">按ID合并（推荐）</b> — CSV中有相同ID的点位会被更新，新点位追加</label>',
      '<label style="display:block; margin-bottom:6px; cursor:pointer;"><input type="radio" name="csv-mode" value="append" style="margin-right:6px;">',
      '<b style="color:#8be9fd;">追加</b> — 保留现有全部数据，CSV中所有行作为新点位添加</label>',
      '<label style="display:block; cursor:pointer;"><input type="radio" name="csv-mode" value="overwrite" style="margin-right:6px;">',
      '<b style="color:#ff5555;">覆盖</b> — 清空当前地图所有技能点位，用CSV完全替换</label>',
      '</div>',

      // ---- 上传按钮 ----
      '<div style="display:flex; gap:10px; align-items:center;">',
      '<button class="edit-save-btn" id="csv-upload-btn" style="padding:10px 24px; font-size:14px;">选择CSV文件并导入</button>',
      '<button class="edit-banner-btn" id="csv-download-template-btn2" style="padding:10px 16px; font-size:13px;">先下载模板</button>',
      '<span id="csv-file-name" style="color:#888; font-size:12px;"></span>',
      '</div>',

      '</div>'
    ].join("");

    overlay.classList.remove("hidden");

    // 下载模板按钮
    var dlBtn = panel.querySelector("#csv-download-template-btn2");
    if (dlBtn) dlBtn.addEventListener("click", exportCSVTemplate);

    // 上传按钮
    var uploadBtn = panel.querySelector("#csv-upload-btn");
    if (uploadBtn) uploadBtn.addEventListener("click", function() {
      var input = document.createElement("input");
      input.type = "file";
      input.accept = ".csv,text/csv";
      input.addEventListener("change", function(e) {
        var file = e.target.files[0];
        if (!file) return;
        var fileNameEl = document.getElementById("csv-file-name");
        if (fileNameEl) fileNameEl.textContent = file.name;

        var reader = new FileReader();
        reader.onload = function(ev) {
          try {
            var mode = "merge";
            var checked = panel.querySelector('input[name="csv-mode"]:checked');
            if (checked) mode = checked.value;

            var csvText = ev.target.result;
            var allRows = parseCSV(csvText);

            // 找表头行（跳过 # 注释行和空行）
            var headerIdx = -1;
            var header = null;
            for (var i = 0; i < allRows.length; i++) {
              var firstCell = (allRows[i][0] || "").trim();
              if (firstCell === "" || firstCell.charAt(0) === "#") continue;
              // 第一个非注释行 = 表头
              headerIdx = i;
              header = allRows[i].map(function(h) { return h.trim(); });
              break;
            }
            if (!header) {
              alert("CSV文件中没有找到有效的表头行！\n请确保第一行（注释行除外）是列名。");
              return;
            }

            // 检查必要列
            var hasAgentId = header.indexOf("agentId") >= 0;
            var hasX = header.indexOf("x") >= 0;
            if (!hasAgentId || !hasX) {
              alert("CSV缺少必要列！\n必须包含：agentId, x, y 至少三列。");
              return;
            }

            var map = app().getMap();
            var lineups = app().getLineups();
            var mapLineups = lineups[map.id] || {};

            // 覆盖模式：清空
            if (mode === "overwrite") {
              if (!confirm("覆盖模式将清空当前地图所有技能点位数据！\n确定继续吗？")) return;
              mapLineups = {};
            }

            var imported = 0, updated = 0, skipped = 0;
            var dataRows = allRows.slice(headerIdx + 1);

            dataRows.forEach(function(row) {
              // 跳过空行和注释行
              var firstCell = (row[0] || "").trim();
              if (firstCell === "" || firstCell.charAt(0) === "#") { skipped++; return; }
              if (row.length < 3) { skipped++; return; }

              var lineup = csvRowToLineup(header, row, map.id);
              var agentIdx = header.indexOf("agentId");
              var agentId = agentIdx >= 0 ? (row[agentIdx] || "").trim() : "";
              if (!agentId) { skipped++; return; }

              if (!mapLineups[agentId]) mapLineups[agentId] = [];

              if (mode === "merge") {
                // 按 ID 查找现有项
                var existIdx = -1;
                for (var j = 0; j < mapLineups[agentId].length; j++) {
                  if (mapLineups[agentId][j].id === lineup.id) { existIdx = j; break; }
                }
                if (existIdx >= 0) {
                  mapLineups[agentId][existIdx] = lineup;
                  updated++;
                } else {
                  mapLineups[agentId].push(lineup);
                  imported++;
                }
              } else {
                // append 或 overwrite 都是追加
                mapLineups[agentId].push(lineup);
                imported++;
              }
            });

            lineups[map.id] = mapLineups;
            saveDraft();

            // 关闭说明面板
            overlay.classList.add("hidden");

            // 重渲染
            if (isActive()) {
              app().rerender();
              setTimeout(function() { addEditToolbar(); bindCanvasEvents(); }, 100);
            } else {
              window.dispatchEvent(new Event("editor-data-updated"));
            }

            alert("导入完成！\n新增 " + imported + " 条，更新 " + updated + " 条，跳过 " + skipped + " 行。");

          } catch (err) {
            alert("CSV导入失败：" + err.message);
            console.error(err);
          }
        };
        reader.readAsText(file, "UTF-8");
      });
      input.click();
    });
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
    if (mapIdx < 0) return false;

    // 兼容性：草稿里可能残留已废弃字段（如 rotate180），合并前删掉
    if (draft.map && typeof draft.map === 'object') {
      delete draft.map.rotate180;
      // 同时过滤 draft.map.sites 每个元素里的 opacity/fontSize 等未来字段
      // （目前不删，保持宽松；仅删除已知的已废弃字段）
    }

    // 安全合并：仅保留当前数据源真正存在的 id（防止草稿 id 串台把 map 搞乱）
    if (draft.map && draft.map.id !== mapId) {
      console.warn('[草稿] 检测到草稿 map.id 与当前不匹配，拒绝合并。草稿 id:', draft.map.id, '当前 id:', mapId);
      return false;
    }

    MAPS[mapIdx] = draft.map;
    LINEUPS[mapId] = draft.lineups;
    return true;
  }

  function clearDraft(mapId) {
    localStorage.removeItem("valorant_edit_draft_" + mapId);
  }

  // ==========================================
  // 暴露接口
  // ==========================================
  // DOM 重建后重新绑定编辑器 UI（工具栏 + 画布事件）
  function _rebindEditorUI() {
    addEditToolbar();
    bindCanvasEvents();
  }

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
    saveDraft,
    _rebindEditorUI
  };

  // 快捷键：E 切换编辑模式
  document.addEventListener("keydown", (e) => {
    if (e.key === "e" && e.ctrlKey && e.shiftKey) {
      e.preventDefault();
      toggle();
    }
  });

})();
