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
      <h1 class="page-title">选择地图</h1>
      <p class="page-subtitle">选择一张地图，查看常规烟位、穿墙点位和英雄技能释放点位</p>
      <div class="map-grid">
        ${MAPS.map((map) => renderMapCard(map)).join("")}
      </div>
    `;
    app.innerHTML = html;

    // 绑定点击事件
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
          <div class="map-canvas" id="map-canvas">
            ${map.image ? "" : generateMapSvg(map, false)}
            <div class="marker-layer" id="marker-layer"></div>
          </div>
          <div class="legend" id="legend"></div>
        </div>
        <div class="sidebar" id="sidebar"></div>
      </div>
    `;

    app.innerHTML = html;

    // 如果有地图图片，设置背景
    if (map.image) {
      const canvas = document.getElementById("map-canvas");
      canvas.classList.add("has-image");
      canvas.style.setProperty("--map-image", `url(${map.image})`);
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

    // 渲染标记和侧边栏
    renderMarkers();
    renderSidebar();
    renderLegend();
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
    marker.style.left = smoke.x + "%";
    marker.style.top = smoke.y + "%";

    const radius = smoke.radius || 6;
    marker.innerHTML = `
      <div class="smoke-circle" style="width: ${radius * 2}%; height: ${radius * 2}%;"></div>
      <div class="smoke-label">${smoke.name}</div>
    `;

    marker.addEventListener("click", () => {
      showDetail(smoke, isAgentLineup ? "lineup" : "smoke");
    });

    return marker;
  }

  function createLineSmokeMarker(smoke, isAgentLineup) {
    const marker = document.createElement("div");
    marker.className = "marker line-smoke";
    marker.style.left = smoke.x + "%";
    marker.style.top = smoke.y + "%";
    marker.style.width = (smoke.length || 20) + "%";
    marker.style.transform = `rotate(${smoke.angle || 0}deg)`;

    marker.innerHTML = `<div class="smoke-label">${smoke.name}</div>`;

    marker.addEventListener("click", () => {
      showDetail(smoke, isAgentLineup ? "lineup" : "smoke");
    });

    return marker;
  }

  function createAbilityMarker(smoke, isAgentLineup) {
    const marker = document.createElement("div");
    marker.className = "marker agent-ability";

    const agent = currentAgent ? AGENTS.find((a) => a.id === currentAgent) : null;
    const roleColor = agent ? ROLES[agent.role].color : "#ff4655";

    marker.style.left = smoke.x + "%";
    marker.style.top = smoke.y + "%";
    marker.style.borderColor = roleColor;
    marker.style.color = roleColor;

    const radius = smoke.radius || 4;
    marker.style.width = (radius * 2 + 2) + "%";
    marker.style.height = (radius * 2 + 2) + "%";
    marker.style.maxWidth = "30px";
    marker.style.maxHeight = "30px";

    marker.innerHTML = `
      <span>${smoke.ability}</span>
      <div class="ab-label">${smoke.name}</div>
    `;

    marker.addEventListener("click", () => {
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
      marker.style.left = wb.x + "%";
      marker.style.top = wb.y + "%";

      marker.innerHTML = `<div class="wb-label">${wb.name}</div>`;

      marker.addEventListener("click", () => {
        showDetail(wb, "wallbang");
      });

      layer.appendChild(marker);
    });
  }

  // 英雄技能标记
  function renderAgentMarkers(layer) {
    if (!currentAgent) {
      // 没有选择英雄时，显示有数据的英雄快速选择提示
      return;
    }

    const lineups = (LINEUPS[currentMap.id] && LINEUPS[currentMap.id][currentAgent]) || [];
    if (lineups.length === 0) {
      return;
    }

    const agent = AGENTS.find((a) => a.id === currentAgent);
    if (!agent) return;

    // 检查英雄是否有烟雾类技能
    renderSmokeMarkers(layer, lineups, true);
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
        lineupListHtml = `
          <div class="sidebar-title" style="margin-top: 16px;">
            ${agent.name} 技能点位 (${lineups.length})
          </div>
          <div class="info-list">
            ${lineups.map((l) => renderInfoItem(l, getTypeLabel(l.type), l.ability)).join("")}
          </div>
        `;
      } else {
        lineupListHtml = `
          <div class="sidebar-title" style="margin-top: 16px;">
            ${agent.name} 技能点位
          </div>
          <div class="empty-state">
            暂无该英雄在此地图的点位数据
            <div class="hint">在 data.js 的 LINEUPS 中添加</div>
          </div>
        `;
      }
    }

    return roleFilterHtml + agentListHtml + lineupListHtml;
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
    }

    legend.innerHTML = items.map((item) => `
      <div class="legend-item">
        <div class="legend-dot ${item.cls}"></div>
        <span>${item.label}</span>
      </div>
    `).join("");
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

    // 英雄选择
    app.querySelectorAll(".agent-card").forEach((card) => {
      card.addEventListener("click", () => {
        const agentId = card.dataset.agentId;
        if (currentAgent === agentId) {
          // 再次点击取消选择
          currentAgent = null;
        } else {
          currentAgent = agentId;
        }
        renderMarkers();
        renderSidebar();
      });
    });

    // 信息项点击
    app.querySelectorAll(".info-item").forEach((item) => {
      item.addEventListener("click", () => {
        const itemId = item.dataset.itemId;
        highlightMarker(itemId);
      });
    });
  }

  // 高亮标记
  function highlightMarker(itemId) {
    // 移除之前的高亮
    app.querySelectorAll(".marker").forEach((m) => {
      m.style.zIndex = "10";
    });

    // 找到对应标记并高亮
    const markers = app.querySelectorAll(".marker");
    // 简单的闪烁效果
    const infoItems = app.querySelectorAll(".info-item");
    infoItems.forEach((i) => i.classList.remove("highlighted"));
    const currentItem = app.querySelector(`.info-item[data-item-id="${itemId}"]`);
    if (currentItem) {
      currentItem.classList.add("highlighted");
      currentItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
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

      ${lineup.video ? `
        <div class="detail-video">
          <a href="${lineup.video}" target="_blank">观看视频教学</a>
        </div>
      ` : ""}
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
  // 初始化
  // ==========================================
  router();
})();
