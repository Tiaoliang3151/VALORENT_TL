// ==========================================
// 无畏契约战术查询 - 交互逻辑
// ==========================================

(function () {
  "use strict";

  const { ROLES, AGENTS, MAPS, LINEUPS } = window.APP_DATA;
  const app = document.getElementById("app");
  const detailOverlay = document.getElementById("detail-overlay");
  const detailPanel = document.getElementById("detail-panel");

  // 当前状态
  let currentMap = null;
  let currentTab = "smokes"; // smokes | wallbangs | agents
  let currentAgent = null;
  let currentRoleFilter = "all";
  let currentAbilityFilter = "all"; // all | C | Q | E | X | none

  // 缩放/平移状态
  let zoomLevel = 1;
  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragStartPanX = 0;
  let dragStartPanY = 0;
  const MIN_ZOOM = 1;
  const MAX_ZOOM = 5;

  // 技能键位颜色
  const ABILITY_COLORS = {
    C: "#ffa500", // 先锋橙
    Q: "#ff4655", // 决斗红
    E: "#7b68ee", // 控场紫
    X: "#00d4aa"  // 大招青
  };

  // ==========================================
  // 路由
  // ==========================================
  function router() {
    const hash = window.location.hash.slice(1) || "/";
    const parts = hash.split("/").filter(Boolean);

    if (parts.length === 0) {
      renderHome();
    } else if (parts[0] === "map" && parts[1]) {
      const map = MAPS.find((m) => m.id === parts[1]);
      if (map) {
        currentMap = map;
        currentAgent = parts[2] || null;
        if (currentAgent) {
          currentTab = "agents";
        }
        renderMapDetail();
      } else {
        renderHome();
      }
    } else {
      renderHome();
    }
  }

  window.addEventListener("hashchange", router);

  // ==========================================
  // 首页 - 地图选择
  // ==========================================
  function renderHome() {
    currentMap = null;
    currentAgent = null;

    const html = `
      <div class="home-placeholder">
        <div class="home-placeholder-title">无畏契约战术查询</div>
        <div class="home-placeholder-subtitle">VALORANT Tactics Lookup</div>
        <button class="home-placeholder-cta" id="home-cta-btn">
          选择地图开始查询
        </button>
        <div class="home-placeholder-hint">点击按钮选择地图，或使用右上角下拉菜单</div>
      </div>
      <div class="home-map-section" id="home-map-section">
        <h2 class="home-map-section-title">选择地图</h2>
        <div class="map-grid">
          ${MAPS.map((map) => renderMapCard(map)).join("")}
        </div>
      </div>
    `;
    app.innerHTML = html;

    // 首页按钮点击：展开/收起地图网格
    const ctaBtn = document.getElementById("home-cta-btn");
    const mapSection = document.getElementById("home-map-section");
    if (ctaBtn && mapSection) {
      ctaBtn.addEventListener("click", () => {
        const isOpen = mapSection.classList.contains("open");
        if (isOpen) {
          mapSection.classList.remove("open");
          ctaBtn.textContent = "选择地图开始查询";
          // 滚动回顶部
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          mapSection.classList.add("open");
          ctaBtn.textContent = "收起地图列表";
          // 平滑滚动到地图列表
          setTimeout(() => {
            mapSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      });
    }

    // 绑定地图卡片点击事件
    app.querySelectorAll(".map-card").forEach((card) => {
      card.addEventListener("click", () => {
        window.location.hash = `/map/${card.dataset.mapId}`;
      });
    });
  }

  function renderMapCard(map) {
    return `
      <div class="map-card" data-map-id="${map.id}">
        <div class="map-card-preview">
          ${generateMapSvg(map, true)}
        </div>
        <div class="map-card-info">
          <div class="map-card-name">${map.name}</div>
          <div class="map-card-en">${map.enName}</div>
          <div class="map-card-sites">
            ${map.sites.map((s) => `<span class="site-badge">${s.id}点</span>`).join("")}
          </div>
          <div class="map-card-desc">${map.description}</div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // 地图详情页
  // ==========================================
  function renderMapDetail() {
    const map = currentMap;

    // 重置缩放状态
    zoomLevel = 1;
    panX = 0;
    panY = 0;

    const html = `
      <div class="breadcrumb">
        <a href="#/">地图选择</a>
        <span>/</span>
        <span class="current">${map.name}</span>
      </div>

      <div class="map-detail-header">
        <div class="map-detail-title">
          <h2>${map.name}</h2>
          <span class="en">${map.enName}</span>
        </div>
      </div>

      <div class="tab-bar">
        <button class="tab-btn ${currentTab === "smokes" ? "active" : ""}" data-tab="smokes">
          常规烟位 (${map.commonSmokes.length})
        </button>
        <button class="tab-btn ${currentTab === "wallbangs" ? "active" : ""}" data-tab="wallbangs">
          穿墙点位 (${map.wallbangs.length})
        </button>
        <button class="tab-btn ${currentTab === "agents" ? "active" : ""}" data-tab="agents">
          英雄技能
        </button>
      </div>

      <div class="map-layout">
        <div class="map-canvas-wrapper">
          ${map.splash ? `
            <div class="map-splash-banner" style="background-image: url('${map.splash}')">
              <div class="map-splash-overlay">
                <div class="map-splash-name">${map.name}</div>
                <div class="map-splash-en">${map.enName.toUpperCase()}</div>
              </div>
            </div>
          ` : ""}
          <div class="map-canvas ${map.image ? "has-image" : ""}" id="map-canvas">
            <div class="map-zoom-container" id="map-zoom-container">
              ${map.image ? "" : generateMapSvg(map, false)}
              <div class="marker-layer" id="marker-layer"></div>
            </div>
            <div class="map-side-label defenders">防守方 DEFENDERS</div>
            <div class="map-side-label attackers">进攻方 ATTACKERS</div>
            <div class="zoom-controls">
              <button class="zoom-btn" id="zoom-in" title="放大">+</button>
              <div class="zoom-level" id="zoom-level">100%</div>
              <button class="zoom-btn" id="zoom-out" title="缩小">−</button>
              <button class="zoom-btn" id="zoom-reset" title="重置" style="font-size:14px;">⟲</button>
            </div>
          </div>
          <div class="legend" id="legend"></div>
        </div>
        <div class="sidebar" id="sidebar"></div>
      </div>
    `;

    app.innerHTML = html;

    // 如果有地图图片，设置缩放容器的背景
    if (map.image) {
      const zoomContainer = document.getElementById("map-zoom-container");
      zoomContainer.style.backgroundImage = `url("${map.image}")`;
    }

    // 绑定标签切换
    app.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentTab = btn.dataset.tab;
        if (currentTab !== "agents") {
          currentAgent = null;
        }
        renderMapDetail();
      });
    });

    // 初始化缩放/平移
    initZoomPan();

    // 渲染标记和侧边栏
    renderMarkers();
    renderSidebar();
    renderLegend();
  }

  // ==========================================
  // 缩放/平移功能
  // ==========================================
  function initZoomPan() {
    const canvas = document.getElementById("map-canvas");
    if (!canvas) return;

    // 按钮缩放
    const zoomInBtn = document.getElementById("zoom-in");
    const zoomOutBtn = document.getElementById("zoom-out");
    const zoomResetBtn = document.getElementById("zoom-reset");

    if (zoomInBtn) {
      zoomInBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        setZoom(zoomLevel + 0.5, true);
      });
    }
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        setZoom(zoomLevel - 0.5, true);
      });
    }
    if (zoomResetBtn) {
      zoomResetBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        resetZoom();
      });
    }

    // 滚轮缩放
    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.3 : 0.3;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      setZoom(zoomLevel + delta, false, mouseX, mouseY);
    }, { passive: false });

    // 拖拽平移
    canvas.addEventListener("mousedown", (e) => {
      // 不拦截标记点击
      if (e.target.closest(".marker") || e.target.closest(".zoom-btn")) return;
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      dragStartPanX = panX;
      dragStartPanY = panY;
      canvas.classList.add("dragging");
      e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const dx = (e.clientX - dragStartX) / zoomLevel;
      const dy = (e.clientY - dragStartY) / zoomLevel;
      panX = dragStartPanX + dx;
      panY = dragStartPanY + dy;
      updateZoomTransform();
    });

    document.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false;
        canvas.classList.remove("dragging");
      }
    });

    // 触摸缩放（双指）
    let touchStartDist = 0;
    let touchStartZoom = 1;
    let touchStartPanX = 0;
    let touchStartPanY = 0;
    let touchStartCenterX = 0;
    let touchStartCenterY = 0;

    canvas.addEventListener("touchstart", (e) => {
      if (e.target.closest(".marker") || e.target.closest(".zoom-btn")) return;
      if (e.touches.length === 2) {
        e.preventDefault();
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        touchStartDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        touchStartZoom = zoomLevel;
        const rect = canvas.getBoundingClientRect();
        touchStartCenterX = ((t1.clientX + t2.clientX) / 2) - rect.left;
        touchStartCenterY = ((t1.clientY + t2.clientY) / 2) - rect.top;
        touchStartPanX = panX;
        touchStartPanY = panY;
      } else if (e.touches.length === 1) {
        const t = e.touches[0];
        isDragging = true;
        dragStartX = t.clientX;
        dragStartY = t.clientY;
        dragStartPanX = panX;
        dragStartPanY = panY;
      }
    }, { passive: false });

    canvas.addEventListener("touchmove", (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        if (touchStartDist > 0) {
          const scale = dist / touchStartDist;
          const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, touchStartZoom * scale));
          zoomLevel = newZoom;
          updateZoomTransform();
        }
      } else if (e.touches.length === 1 && isDragging) {
        e.preventDefault();
        const t = e.touches[0];
        const dx = (t.clientX - dragStartX) / zoomLevel;
        const dy = (t.clientY - dragStartY) / zoomLevel;
        panX = dragStartPanX + dx;
        panY = dragStartPanY + dy;
        updateZoomTransform();
      }
    }, { passive: false });

    canvas.addEventListener("touchend", () => {
      isDragging = false;
      touchStartDist = 0;
    });
  }

  function setZoom(newZoom, animate, centerX, centerY) {
    const oldZoom = zoomLevel;
    zoomLevel = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));

    if (centerX !== undefined && centerY !== undefined) {
      // 以鼠标位置为中心缩放
      const canvas = document.getElementById("map-canvas");
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const cx = centerX || rect.width / 2;
        const cy = centerY || rect.height / 2;
        // 调整pan使得鼠标位置保持不变
        const zoomRatio = zoomLevel / oldZoom;
        panX = cx / oldZoom - (cx / zoomLevel) + panX * (1 / zoomRatio) * zoomRatio;
        panY = cy / oldZoom - (cy / zoomLevel) + panY * (1 / zoomRatio) * zoomRatio;
      }
    }

    updateZoomTransform(animate);
  }

  function resetZoom() {
    zoomLevel = 1;
    panX = 0;
    panY = 0;
    updateZoomTransform(true);
  }

  function updateZoomTransform(animate) {
    const container = document.getElementById("map-zoom-container");
    const levelDisplay = document.getElementById("zoom-level");
    if (!container) return;

    if (animate) {
      container.style.transition = "transform 0.3s ease";
    } else {
      container.style.transition = "none";
    }

    container.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;

    if (levelDisplay) {
      levelDisplay.textContent = Math.round(zoomLevel * 100) + "%";
    }
  }

  // ==========================================
  // SVG 地图占位图生成
  // ==========================================
  function generateMapSvg(map, isPreview) {
    const sites = map.sites;
    let svg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">`;

    // 背景
    svg += `<rect width="100" height="100" fill="#0a1118"/>`;

    // 网格
    svg += `<defs>
      <pattern id="grid-${map.id}" width="5" height="5" patternUnits="userSpaceOnUse">
        <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#1a2a3a" stroke-width="0.2"/>
      </pattern>
    </defs>`;
    svg += `<rect width="100" height="100" fill="url(#grid-${map.id})"/>`;

    // 通道连线（据点之间）
    for (let i = 0; i < sites.length - 1; i++) {
      svg += `<line x1="${sites[i].x}" y1="${sites[i].y}" x2="${sites[i + 1].x}" y2="${sites[i + 1].y}"
              stroke="#2a3a5a" stroke-width="2" stroke-dasharray="1.5,1" opacity="0.5"/>`;
    }

    // 据点区域
    for (const site of sites) {
      svg += `<rect x="${site.x - 10}" y="${site.y - 10}" width="20" height="20"
              fill="#ff465515" stroke="#ff465540" stroke-width="0.5" rx="2"/>`;
    }

    // 据点标签
    for (const site of sites) {
      svg += `<text x="${site.x}" y="${site.y + 1}" text-anchor="middle"
              fill="#ff4655" font-size="7" font-weight="bold"
              font-family="Arial, sans-serif">${site.id}</text>`;
    }

    // 地图名称
    if (!isPreview) {
      svg += `<text x="50" y="97" text-anchor="middle" fill="#333" font-size="2.5"
              font-family="Arial, sans-serif">${map.enName.toUpperCase()}</text>`;
    }

    svg += `</svg>`;
    return svg;
  }

  // ==========================================
  // 标记渲染
  // ==========================================
  function renderMarkers() {
    const layer = document.getElementById("marker-layer");
    if (!layer) return;
    layer.innerHTML = "";

    if (currentTab === "smokes") {
      renderSmokeMarkers(layer, currentMap.commonSmokes, false);
    } else if (currentTab === "wallbangs") {
      renderWallbangMarkers(layer, currentMap.wallbangs);
    } else if (currentTab === "agents") {
      renderAgentMarkers(layer);
    }
  }

  // 球烟/线烟标记
  function renderSmokeMarkers(layer, smokes, isAgentLineup) {
    smokes.forEach((smoke) => {
      if (smoke.type === "ball") {
        const marker = createBallSmokeMarker(smoke, isAgentLineup);
        layer.appendChild(marker);
      } else if (smoke.type === "line") {
        const marker = createLineSmokeMarker(smoke, isAgentLineup);
        layer.appendChild(marker);
      } else if (smoke.type === "other") {
        const marker = createAbilityMarker(smoke, isAgentLineup);
        layer.appendChild(marker);
      }

      // 如果是英雄点位且有站位，添加站位标记
      if (isAgentLineup && smoke.standX !== undefined) {
        const standMarker = createStandMarker(smoke);
        layer.appendChild(standMarker);

        // 站位到落点的连线
        const line = createStandLine(smoke);
        layer.appendChild(line);
      }
    });
  }

  function createBallSmokeMarker(smoke, isAgentLineup) {
    const marker = document.createElement("div");
    marker.className = "marker ball-smoke";
    marker.dataset.itemId = smoke.id;
    marker.style.left = smoke.x + "%";
    marker.style.top = smoke.y + "%";

    const radius = smoke.radius || 6;
    marker.innerHTML = `
      <div class="smoke-circle" style="width: ${radius * 2}%; height: ${radius * 2}%;"></div>
      <div class="smoke-label">${smoke.name}</div>
    `;

    marker.addEventListener("click", (e) => {
      e.stopPropagation();
      showDetail(smoke, isAgentLineup ? "lineup" : "smoke");
    });

    return marker;
  }

  function createLineSmokeMarker(smoke, isAgentLineup) {
    const marker = document.createElement("div");
    marker.className = "marker line-smoke";
    marker.dataset.itemId = smoke.id;
    marker.style.left = smoke.x + "%";
    marker.style.top = smoke.y + "%";
    marker.style.width = (smoke.length || 20) + "%";
    marker.style.transform = `translateY(-50%) rotate(${smoke.angle || 0}deg)`;

    marker.innerHTML = `<div class="smoke-label">${smoke.name}</div>`;

    marker.addEventListener("click", (e) => {
      e.stopPropagation();
      showDetail(smoke, isAgentLineup ? "lineup" : "smoke");
    });

    return marker;
  }

  function createAbilityMarker(smoke, isAgentLineup) {
    const marker = document.createElement("div");
    marker.className = "marker agent-ability";
    marker.dataset.itemId = smoke.id;

    const abilityKey = smoke.ability || "E";
    const abilityColor = ABILITY_COLORS[abilityKey] || "#ff4655";

    marker.style.left = smoke.x + "%";
    marker.style.top = smoke.y + "%";
    marker.style.setProperty("--ability-color", abilityColor);

    marker.innerHTML = `
      <span class="ab-key">${abilityKey}</span>
      <div class="ab-label">${smoke.name}</div>
    `;

    marker.addEventListener("click", (e) => {
      e.stopPropagation();
      showDetail(smoke, "lineup");
    });

    return marker;
  }

  function createStandMarker(smoke) {
    const marker = document.createElement("div");
    marker.className = "marker stand-position";
    marker.style.left = smoke.standX + "%";
    marker.style.top = smoke.standY + "%";
    return marker;
  }

  function createStandLine(smoke) {
    const line = document.createElement("div");
    line.className = "stand-line";

    const dx = smoke.x - smoke.standX;
    const dy = smoke.y - smoke.standY;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    line.style.left = smoke.standX + "%";
    line.style.top = smoke.standY + "%";
    line.style.width = length + "%";
    line.style.transform = `rotate(${angle}deg)`;

    return line;
  }

  // 穿墙点标记
  function renderWallbangMarkers(layer, wallbangs) {
    wallbangs.forEach((wb) => {
      const marker = document.createElement("div");
      marker.className = "marker wallbang";
      marker.dataset.itemId = wb.id;
      marker.style.left = wb.x + "%";
      marker.style.top = wb.y + "%";

      marker.innerHTML = `<div class="wb-label">${wb.name}</div>`;

      marker.addEventListener("click", (e) => {
        e.stopPropagation();
        showDetail(wb, "wallbang");
      });

      layer.appendChild(marker);
    });
  }

  // 英雄技能标记
  function renderAgentMarkers(layer) {
    if (!currentAgent || currentAbilityFilter === "none") {
      return;
    }

    const lineups = (LINEUPS[currentMap.id] && LINEUPS[currentMap.id][currentAgent]) || [];
    if (lineups.length === 0) {
      return;
    }

    // 根据技能筛选过滤
    const filteredLineups = currentAbilityFilter === "all"
      ? lineups
      : lineups.filter((l) => l.ability === currentAbilityFilter);

    if (filteredLineups.length === 0) {
      return;
    }

    const agent = AGENTS.find((a) => a.id === currentAgent);
    if (!agent) return;

    // 渲染筛选后的点位
    renderSmokeMarkers(layer, filteredLineups, true);
  }

  // ==========================================
  // 侧边栏渲染
  // ==========================================
  function renderSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    if (currentTab === "smokes") {
      sidebar.innerHTML = renderSmokeSidebar();
    } else if (currentTab === "wallbangs") {
      sidebar.innerHTML = renderWallbangSidebar();
    } else if (currentTab === "agents") {
      sidebar.innerHTML = renderAgentSidebar();
    }

    // 绑定侧边栏事件
    bindSidebarEvents();
  }

  function renderSmokeSidebar() {
    const smokes = currentMap.commonSmokes;
    if (smokes.length === 0) {
      return `<div class="empty-state">暂无烟位数据<div class="hint">在 data.js 中添加 commonSmokes</div></div>`;
    }

    return `
      <div class="sidebar-title">常规烟位 (${smokes.length})</div>
      <div class="info-list">
        ${smokes.map((s) => renderInfoItem(s, getTypeLabel(s.type))).join("")}
      </div>
    `;
  }

  function renderWallbangSidebar() {
    const wbs = currentMap.wallbangs;
    if (wbs.length === 0) {
      return `<div class="empty-state">暂无穿墙点位<div class="hint">在 data.js 中添加 wallbangs</div></div>`;
    }

    return `
      <div class="sidebar-title">穿墙点位 (${wbs.length})</div>
      <div class="info-list">
        ${wbs.map((wb) => renderInfoItem(wb, "穿墙")).join("")}
      </div>
    `;
  }

  function renderAgentSidebar() {
    const roleFilterHtml = `
      <div class="role-filter">
        <button class="role-btn ${currentRoleFilter === "all" ? "active" : ""}" data-role="all">全部</button>
        ${Object.entries(ROLES).map(([key, role]) => `
          <button class="role-btn ${currentRoleFilter === key ? "active" : ""}"
                  data-role="${key}"
                  style="--role-color: ${role.color}">
            ${role.icon} ${role.name}
          </button>
        `).join("")}
      </div>
    `;

    const filteredAgents = currentRoleFilter === "all"
      ? AGENTS
      : AGENTS.filter((a) => a.role === currentRoleFilter);

    const agentListHtml = `
      <div class="agent-list">
        ${filteredAgents.map((agent) => {
          const hasLineup = LINEUPS[currentMap.id] && LINEUPS[currentMap.id][agent.id] && LINEUPS[currentMap.id][agent.id].length > 0;
          const roleColor = ROLES[agent.role].color;
          return `
            <div class="agent-card ${currentAgent === agent.id ? "active" : ""} ${hasLineup ? "has-lineup" : ""}"
                 data-agent-id="${agent.id}"
                 style="--role-color: ${roleColor}"
                 title="${agent.name} (${agent.enName})">
              <div class="agent-icon">${agent.name.charAt(0)}</div>
              <div class="agent-name">${agent.name}</div>
              <div class="agent-en">${agent.enName}</div>
            </div>
          `;
        }).join("")}
      </div>
    `;

    let lineupListHtml = "";
    if (currentAgent) {
      const agent = AGENTS.find((a) => a.id === currentAgent);
      const lineups = (LINEUPS[currentMap.id] && LINEUPS[currentMap.id][currentAgent]) || [];

      if (lineups.length > 0) {
        // 统计各技能数量
        const abilityCounts = {};
        lineups.forEach((l) => {
          const k = l.ability || "E";
          abilityCounts[k] = (abilityCounts[k] || 0) + 1;
        });

        // 技能筛选按钮
        const abilityFilterHtml = `
          <div class="ability-filter">
            <button class="ability-btn ${currentAbilityFilter === "all" ? "active" : ""}" data-ability="all">全部 (${lineups.length})</button>
            ${Object.entries(abilityCounts).map(([key, count]) => `
              <button class="ability-btn ${currentAbilityFilter === key ? "active" : ""}"
                      data-ability="${key}"
                      style="--ability-color: ${ABILITY_COLORS[key] || "#ff4655"}">
                ${key} (${count})
              </button>
            `).join("")}
            <button class="ability-btn ${currentAbilityFilter === "none" ? "active" : ""}" data-ability="none">隐藏</button>
          </div>
        `;

        lineupListHtml = `
          <div class="lineup-header">
            <div class="lineup-header-info">
              <div class="lineup-header-name">${agent.name}</div>
              <div class="lineup-header-count">${lineups.length} 个点位</div>
            </div>
            <button class="lineup-change-btn" id="change-agent-btn">更换英雄</button>
          </div>
          ${abilityFilterHtml}
          <div class="info-list">
            ${(currentAbilityFilter === "all" ? lineups : currentAbilityFilter === "none" ? [] : lineups.filter((l) => l.ability === currentAbilityFilter))
              .map((l) => renderInfoItem(l, getTypeLabel(l.type), l.ability)).join("")}
          </div>
        `;
      } else {
        lineupListHtml = `
          <div class="lineup-header">
            <div class="lineup-header-info">
              <div class="lineup-header-name">${agent.name}</div>
              <div class="lineup-header-count">暂无数据</div>
            </div>
            <button class="lineup-change-btn" id="change-agent-btn">更换英雄</button>
          </div>
          <div class="empty-state">
            暂无该英雄在此地图的点位数据
            <div class="hint">在 data.js 的 LINEUPS 中添加</div>
          </div>
        `;
      }
    }

    // 选中英雄时：lineup信息在顶部，英雄列表在下方（可折叠）
    if (currentAgent) {
      return lineupListHtml + '<div class="agent-list-collapsed">' + roleFilterHtml + agentListHtml + '</div>';
    }
    return roleFilterHtml + agentListHtml;
  }

  function renderInfoItem(item, typeLabel, abilityKey) {
    const typeClass = item.type === "ball" ? "type-ball"
      : item.type === "line" ? "type-line"
      : item.type === "other" ? "type-other"
      : "type-wallbang";

    return `
      <div class="info-item" data-item-id="${item.id}">
        <div class="info-item-name">
          ${abilityKey ? `<span class="info-item-type ${typeClass}">${abilityKey}</span>` : `<span class="info-item-type ${typeClass}">${typeLabel}</span>`}
          ${item.name}
        </div>
        ${item.desc ? `<div class="info-item-desc">${item.desc}</div>` : ""}
      </div>
    `;
  }

  function getTypeLabel(type) {
    const labels = {
      ball: "球烟",
      line: "线烟",
      other: "技能",
      wallbang: "穿墙"
    };
    return labels[type] || type;
  }

  // ==========================================
  // 图例
  // ==========================================
  function renderLegend() {
    const legend = document.getElementById("legend");
    if (!legend) return;

    let items = [];

    if (currentTab === "smokes") {
      items = [
        { cls: "ball", label: "球烟（圆形范围）" },
        { cls: "line", label: "线烟（线性范围）" }
      ];
    } else if (currentTab === "wallbangs") {
      items = [
        { cls: "wallbang", label: "穿墙点位" }
      ];
    } else if (currentTab === "agents") {
      items = [
        { cls: "ball", label: "球烟" },
        { cls: "line", label: "线烟" },
        { cls: "stand", label: "站位" }
      ];
      // 如果选了英雄，加上技能键位图例
      if (currentAgent) {
        const lineups = (LINEUPS[currentMap.id] && LINEUPS[currentMap.id][currentAgent]) || [];
        const abilities = [...new Set(lineups.map((l) => l.ability))];
        abilities.forEach((ab) => {
          items.push({ cls: "ability-" + ab, label: ab + "键", abilityKey: ab });
        });
      }
    }

    legend.innerHTML = items.map((item) => {
      if (item.abilityKey) {
        const color = ABILITY_COLORS[item.abilityKey] || "#ff4655";
        return `
          <div class="legend-item">
            <div class="legend-dot ability-dot" style="border-color: ${color}; color: ${color};">${item.abilityKey}</div>
            <span>${item.label}</span>
          </div>
        `;
      }
      return `
        <div class="legend-item">
          <div class="legend-dot ${item.cls}"></div>
          <span>${item.label}</span>
        </div>
      `;
    }).join("");
  }

  // ==========================================
  // 侧边栏事件绑定
  // ==========================================
  function bindSidebarEvents() {
    // 角色筛选
    app.querySelectorAll(".role-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentRoleFilter = btn.dataset.role;
        renderSidebar();
      });
    });

    // 技能筛选
    app.querySelectorAll(".ability-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentAbilityFilter = btn.dataset.ability;
        renderMarkers();
        renderSidebar();
      });
    });

    // 更换英雄按钮
    const changeBtn = document.getElementById("change-agent-btn");
    if (changeBtn) {
      changeBtn.addEventListener("click", () => {
        currentAgent = null;
        currentAbilityFilter = "all";
        renderMarkers();
        renderSidebar();
      });
    }

    // 英雄选择
    app.querySelectorAll(".agent-card").forEach((card) => {
      card.addEventListener("click", () => {
        const agentId = card.dataset.agentId;
        if (currentAgent === agentId) {
          // 再次点击取消选择
          currentAgent = null;
        } else {
          currentAgent = agentId;
          currentAbilityFilter = "all";
        }
        renderMarkers();
        renderSidebar();
      });
    });

    // 信息项点击 - 弹出详情
    app.querySelectorAll(".info-item").forEach((item) => {
      item.addEventListener("click", () => {
        const itemId = item.dataset.itemId;
        highlightAndShowDetail(itemId);
      });
    });
  }

  // 高亮标记并显示详情
  function highlightAndShowDetail(itemId) {
    // 高亮侧边栏项
    const infoItems = app.querySelectorAll(".info-item");
    infoItems.forEach((i) => i.classList.remove("highlighted"));
    const currentItem = app.querySelector(`.info-item[data-item-id="${itemId}"]`);
    if (currentItem) {
      currentItem.classList.add("highlighted");
      currentItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // 高亮地图标记
    app.querySelectorAll(".marker").forEach((m) => {
      m.classList.remove("highlighted");
    });
    const marker = app.querySelector(`.marker[data-item-id="${itemId}"]`);
    if (marker) {
      marker.classList.add("highlighted");
    }

    // 查找数据并显示详情
    const item = findItemById(itemId);
    if (item) {
      let type = "smoke";
      if (currentTab === "wallbangs") type = "wallbang";
      else if (currentTab === "agents") type = "lineup";
      showDetail(item, type);
    }
  }

  // 根据ID查找数据项
  function findItemById(itemId) {
    if (currentTab === "smokes") {
      return currentMap.commonSmokes.find((s) => s.id === itemId);
    } else if (currentTab === "wallbangs") {
      return currentMap.wallbangs.find((w) => w.id === itemId);
    } else if (currentTab === "agents" && currentAgent) {
      const lineups = (LINEUPS[currentMap.id] && LINEUPS[currentMap.id][currentAgent]) || [];
      return lineups.find((l) => l.id === itemId);
    }
    return null;
  }

  // 保留旧函数名兼容（高亮地图标记）
  function highlightMarker(itemId) {
    highlightAndShowDetail(itemId);
  }

  // ==========================================
  // 详情面板
  // ==========================================
  function showDetail(item, type) {
    let html = `<button class="detail-close" onclick="document.getElementById('detail-overlay').classList.add('hidden')">&times;</button>`;

    if (type === "smoke") {
      html += renderSmokeDetail(item);
    } else if (type === "wallbang") {
      html += renderWallbangDetail(item);
    } else if (type === "lineup") {
      html += renderLineupDetail(item);
    }

    detailPanel.innerHTML = html;
    detailOverlay.classList.remove("hidden");
  }

  function renderSmokeDetail(smoke) {
    const typeLabel = getTypeLabel(smoke.type);
    const typeClass = smoke.type === "ball" ? "type-ball" : "type-line";

    return `
      <div class="detail-title">${smoke.name}</div>
      <span class="detail-badge ${typeClass}" style="background: ${smoke.type === "ball" ? "var(--controller)" : "var(--sentinel)"}; color: white;">
        ${typeLabel} ${smoke.site ? "| " + smoke.site + "点" : ""}
      </span>

      ${smoke.desc ? `
        <div class="detail-section">
          <div class="detail-label">说明</div>
          <div class="detail-value">${smoke.desc}</div>
        </div>
      ` : ""}

      <div class="detail-section">
        <div class="detail-label">坐标</div>
        <div class="detail-value">X: ${smoke.x}%, Y: ${smoke.y}%</div>
      </div>

      ${smoke.type === "ball" ? `
        <div class="detail-section">
          <div class="detail-label">半径</div>
          <div class="detail-value">${smoke.radius}%（地图宽度百分比）</div>
        </div>
      ` : ""}

      ${smoke.type === "line" ? `
        <div class="detail-section">
          <div class="detail-label">长度 / 角度</div>
          <div class="detail-value">${smoke.length}% / ${smoke.angle}度</div>
        </div>
      ` : ""}

      ${renderDetailImageSection("效果图", smoke.effectImg)}
    `;
  }

  function renderWallbangDetail(wb) {
    return `
      <div class="detail-title">${wb.name}</div>
      <span class="detail-badge type-wallbang" style="background: var(--wallbang-color); color: var(--bg-dark);">穿墙点位</span>

      ${wb.desc ? `
        <div class="detail-section">
          <div class="detail-label">说明</div>
          <div class="detail-value">${wb.desc}</div>
        </div>
      ` : ""}

      <div class="detail-section">
        <div class="detail-label">坐标</div>
        <div class="detail-value">X: ${wb.x}%, Y: ${wb.y}%</div>
      </div>

      ${renderDetailImageSection("效果图", wb.effectImg)}
    `;
  }

  function renderLineupDetail(lineup) {
    const agent = AGENTS.find((a) => a.id === currentAgent);
    const ability = agent ? agent.abilities.find((ab) => ab.key === lineup.ability) : null;
    const typeLabel = getTypeLabel(lineup.type);
    const roleColor = agent ? ROLES[agent.role].color : "#ff4655";

    return `
      <div class="detail-title">${lineup.name}</div>
      <span class="detail-badge" style="background: ${roleColor}; color: white;">
        ${agent ? agent.name : ""} | ${lineup.ability}键 ${ability ? ability.name : ""}
      </span>

      ${lineup.type !== "other" ? `
        <div class="detail-section">
          <div class="detail-label">烟雾类型</div>
          <div class="detail-value">${typeLabel}</div>
        </div>
      ` : ""}

      <div class="detail-section">
        <div class="detail-label">落点坐标</div>
        <div class="detail-value">X: ${lineup.x}%, Y: ${lineup.y}%</div>
      </div>

      ${lineup.type === "ball" && lineup.radius ? `
        <div class="detail-section">
          <div class="detail-label">烟雾半径</div>
          <div class="detail-value">${lineup.radius}%</div>
        </div>
      ` : ""}

      ${lineup.type === "line" ? `
        <div class="detail-section">
          <div class="detail-label">长度 / 角度</div>
          <div class="detail-value">${lineup.length || "-"}% / ${lineup.angle || 0}度</div>
        </div>
      ` : ""}

      ${lineup.standX !== undefined ? `
        <div class="detail-section">
          <div class="detail-label">站位坐标</div>
          <div class="detail-value">X: ${lineup.standX}%, Y: ${lineup.standY}%</div>
        </div>
      ` : ""}

      ${lineup.desc ? `
        <div class="detail-section">
          <div class="detail-label">站位说明</div>
          <div class="detail-value">${lineup.desc}</div>
        </div>
      ` : ""}

      ${lineup.crosshair ? `
        <div class="detail-section">
          <div class="detail-label">准星瞄准</div>
          <div class="detail-value">${lineup.crosshair}</div>
        </div>
      ` : ""}

      ${renderDetailImageSection("站位图", lineup.standImg)}
      ${renderDetailImageSection("瞄点图", lineup.aimImg)}
      ${renderDetailImageSection("效果图", lineup.effectImg)}

      ${lineup.video ? `
        <div class="detail-video">
          <a href="${lineup.video}" target="_blank">观看视频教学</a>
        </div>
      ` : ""}
    `;
  }

  // 渲染详情图片区块
  function renderDetailImageSection(label, imgPath) {
    if (!imgPath) return "";
    return `
      <div class="detail-section">
        <div class="detail-label">${label}</div>
        <div class="detail-image-wrapper">
          <img src="${imgPath}" alt="${label}" class="detail-image" 
               onerror="this.parentElement.innerHTML='<div class=\\'detail-image-placeholder\\'>图片未找到: ${imgPath}</div>'">
        </div>
      </div>
    `;
  }

  // 点击遮罩关闭详情
  detailOverlay.addEventListener("click", (e) => {
    if (e.target === detailOverlay) {
      detailOverlay.classList.add("hidden");
    }
  });

  // ESC 关闭详情
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      detailOverlay.classList.add("hidden");
    }
  });

  // ==========================================
  // 导航栏下拉菜单
  // ==========================================
  function initNavDropdown() {
    const dropdown = document.getElementById("nav-map-dropdown");
    const btn = dropdown ? dropdown.querySelector(".nav-dropdown-btn") : null;
    const menu = document.getElementById("nav-map-menu");
    if (!dropdown || !btn || !menu) return;

    // 生成地图列表
    menu.innerHTML = `
      <a class="nav-dropdown-item" href="#/" data-action="home">
        <span>首页</span>
        <span class="item-en">HOME</span>
      </a>
      <div class="nav-dropdown-divider"></div>
      ${MAPS.map((map) => `
        <a class="nav-dropdown-item" href="#/map/${map.id}" data-map-id="${map.id}">
          <span>${map.name}</span>
          <span class="item-en">${map.enName.toUpperCase()}</span>
        </a>
      `).join("")}
    `;

    // 按钮点击切换
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleNavDropdown();
    });

    // 点击菜单项后关闭
    menu.addEventListener("click", (e) => {
      const item = e.target.closest(".nav-dropdown-item");
      if (item) {
        closeNavDropdown();
      }
    });

    // 点击页面其他地方关闭
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        closeNavDropdown();
      }
    });
  }

  function toggleNavDropdown() {
    const btn = document.querySelector(".nav-dropdown-btn");
    const menu = document.getElementById("nav-map-menu");
    if (!btn || !menu) return;
    const isOpen = menu.classList.contains("open");
    if (isOpen) {
      closeNavDropdown();
    } else {
      openNavDropdown();
    }
  }

  function openNavDropdown() {
    const btn = document.querySelector(".nav-dropdown-btn");
    const menu = document.getElementById("nav-map-menu");
    if (!btn || !menu) return;
    menu.classList.add("open");
    btn.classList.add("open");
  }

  function closeNavDropdown() {
    const btn = document.querySelector(".nav-dropdown-btn");
    const menu = document.getElementById("nav-map-menu");
    if (!btn || !menu) return;
    menu.classList.remove("open");
    btn.classList.remove("open");
  }

  // ==========================================
  // 初始化
  // ==========================================
  initNavDropdown();
  router();
})();
