// ==========================================
// 无畏契约战术查询 - 交互逻辑
// ==========================================

(function () {
  "use strict";

  // 动态获取 APP_DATA（支持懒加载更新）
  function getAPP_DATA() { return window.APP_DATA || {}; }
  function ROLES() { return getAPP_DATA().ROLES || {}; }
  function AGENTS() { return getAPP_DATA().AGENTS || []; }
  function MAPS() { return getAPP_DATA().MAPS || []; }
  function LINEUPS() { return getAPP_DATA().LINEUPS || {}; }
  const app = document.getElementById("app");
  const detailOverlay = document.getElementById("detail-overlay");
  const detailPanel = document.getElementById("detail-panel");

  // 当前状态
  let currentMap = null;
  let currentTab = "smoke-attack"; // smoke-attack | smoke-defend | wallbangs | plants | agents
  let currentAgent = null;
  let currentRoleFilter = "all";
  let currentAbilityFilter = "all"; // all | C | Q | E | X | none
  let currentPlantFilter = "all"; // all | open | safe | special | second-floor
  let currentSideFilter = "all"; // all | 进攻方 | 防守方 | 双通

  // 进攻视图开关（切到 "进攻烟位" 时自动为 true，其余为 false；true 时所有坐标走 getMapPos 翻转 180°）
  // 初始值与 currentTab 保持同步
  let isAttackView = (currentTab === "smoke-attack");

  // 地点名称显示状态
  let showLocationNames = true;

  // 技能键位颜色
  const ABILITY_COLORS = {
    C: "#ffa500", // 先锋橙
    Q: "#ff4655", // 决斗红
    E: "#7b68ee", // 控场紫
    X: "#00d4aa"  // 大招青
  };

  // 地图坐标转换：
  //   - 正向视图（防守烟 / 其他 tab）：数据坐标直接透传
  //   - 进攻视图（进攻烟 tab）：CSS 将整体 .map-zoom-container rotate(180°)，
  //     数据坐标仍保持原始正向，因此这里无需再做 100-x/y 翻转（否则会重复翻转）。
  //     文字类标签通过 CSS 额外 rotate 180° 保持正向。
  function getMapPos(item) {
    return { x: item.x, y: item.y };
  }

  // 读取当前进攻视图是否开启（主要给 editor.js 判断坐标要反向与否）
  function isAttackViewOn() { return !!isAttackView; }

  // 统一设置当前视图（并决定 isAttackView）
  //   tab: 'smoke-attack' / 'smoke-defend' / 'wallbangs' / 'plants' / 'agents'
  function setCurrentTab(tab) {
    currentTab = tab;
    // 只有 "进攻烟位" tab 开启 180°进攻视图
    isAttackView = (tab === "smoke-attack");
  }

  // 读取当前哪个烟数组在看（attack / defend / null）
  function getCurrentSmokeSide() {
    if (currentTab === "smoke-attack") return "attack";
    if (currentTab === "smoke-defend") return "defend";
    return null;
  }

  // ==========================================
  // 路由
  // ==========================================
  function router() {
    const hash = window.location.hash.slice(1) || "/";
    const parts = hash.split("/").filter(Boolean);

    if (parts.length === 0) {
      renderHome();
    } else if (parts[0] === "map" && parts[1]) {
      const mapId = parts[1];
      // 检查地图数据是否已加载（通过检查是否有 sites 数据）
      const map = MAPS().find((m) => m.id === mapId);
      if (!map) {
        renderHome();
        return;
      }

      // 如果地图数据未完全加载，显示加载状态并动态加载
      if (!map.sites) {
        app.innerHTML = `
          <div class="loading-overlay">
            <div class="loading-spinner"></div>
            <div class="loading-text">正在加载地图数据...</div>
          </div>
        `;

        // 动态加载地图数据
        window.__VAL_LOAD_MAP_DATA__(mapId).then(() => {
          // 数据加载完成，重新获取地图对象（已更新）
          const loadedMap = MAPS().find((m) => m.id === mapId);
          if (loadedMap) {
            currentMap = loadedMap;
            currentAgent = parts[2] || null;
            if (currentAgent) {
              setCurrentTab("agents");
            } else {
              setCurrentTab(currentTab); // 确保 isAttackView 与 currentTab 同步
            }
            renderMapDetail();
          } else {
            renderHome();
          }
        }).catch(() => {
          renderHome();
        });
        return;
      }

      // 数据已加载，直接渲染
      currentMap = map;
      currentAgent = parts[2] || null;
      if (currentAgent) {
        setCurrentTab("agents");
      } else {
        setCurrentTab(currentTab); // 确保 isAttackView 与 currentTab 同步
      }
      renderMapDetail();
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
          ${MAPS().map((map) => renderMapCard(map)).join("")}
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
    const cardImage = map.splash || map.image;
    const previewContent = cardImage
      ? `<div class="map-card-img-wrap">
           <img src="${cardImage}" class="map-card-img" alt="${map.name}">
           <div class="map-card-site-overlay">${generateSiteOverlaySvg(map)}</div>
         </div>`
      : generateMapSvg(map, true);
    return `
      <a class="map-card" href="#/map/${map.id}" data-map-id="${map.id}">
        <div class="map-card-preview">
          ${previewContent}
        </div>
        <div class="map-card-info">
          <div class="map-card-name">${map.name}</div>
          <div class="map-card-en">${map.enName}</div>
          <div class="map-card-sites">
            ${(map.sites || []).map((s) => `<span class="site-badge">${s.id}点</span>`).join("")}
          </div>
          <div class="map-card-desc">${map.description}</div>
        </div>
      </a>
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
        <button class="edit-mode-btn" id="edit-mode-btn">
          <span class="edit-mode-icon">✎</span>
          <span>编辑模式</span>
        </button>
      </div>

      <div class="tab-bar">
        <button class="tab-btn ${currentTab === "smoke-attack" ? "active" : ""}" data-tab="smoke-attack">
          进攻烟位 (${(map.attackSmokes || []).length})
        </button>
        <button class="tab-btn ${currentTab === "smoke-defend" ? "active" : ""}" data-tab="smoke-defend">
          防守烟位 (${(map.defendSmokes || []).length})
        </button>
        <button class="tab-btn ${currentTab === "wallbangs" ? "active" : ""}" data-tab="wallbangs">
          穿墙点位 (${(map.wallbangs || []).length})
        </button>
        <button class="tab-btn ${currentTab === "plants" ? "active" : ""}" data-tab="plants">
          下包点位 (${(map.plantSpots || []).length})
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
          <div class="map-canvas ${map.image ? "has-image" : ""} ${isAttackView ? "is-attack-view" : ""}" id="map-canvas">
            <div class="map-zoom-container" id="map-zoom-container">
              ${map.image
                ? `<img src="${map.image}" class="map-bg-img" alt="${map.name}">`
                : generateMapSvg(map, false)}
              <div class="marker-layer" id="marker-layer"></div>
            </div>
            <div class="map-location-toggle" id="map-location-toggle">
              <input type="checkbox" id="location-names-checkbox" ${showLocationNames ? "checked" : ""}>
              <label for="location-names-checkbox">地名</label>
            </div>
            <div class="map-side-label attackers">进攻方 ATTACKERS</div>
            <div class="map-side-label defenders">防守方 DEFENDERS</div>
          </div>
          <div class="legend" id="legend"></div>
          ${(currentTab === "wallbangs" || currentTab === "plants") ? `
          <div class="side-filter-bar" id="side-filter-bar">
            <button class="side-filter-btn ${currentSideFilter === "all" ? "active" : ""}" data-side="all">全部</button>
            <button class="side-filter-btn ${currentSideFilter === "进攻方" ? "active attack" : ""}" data-side="进攻方">进攻方</button>
            <button class="side-filter-btn ${currentSideFilter === "防守方" ? "active defend" : ""}" data-side="防守方">防守方</button>
          </div>
          ` : ""}
        </div>
        <div class="sidebar" id="sidebar"></div>
      </div>
    `;

    app.innerHTML = html;

    // 绑定标签切换
    app.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        setCurrentTab(btn.dataset.tab);
        if (currentTab !== "agents") {
          currentAgent = null;
        }
        renderMapDetail();
      });
    });

    // 绑定攻防标签筛选
    app.querySelectorAll(".side-filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentSideFilter = btn.dataset.side;
        renderMarkers();
        renderSidebar();
      });
    });

    // 编辑模式按钮
    const editBtn = document.getElementById("edit-mode-btn");
    if (editBtn) {
      // 如果有草稿，提示恢复
      if (window.MapEditor && window.MapEditor.hasDraft(map.id)) {
        editBtn.classList.add("has-draft");
        editBtn.title = "有未保存的草稿，点击进入编辑模式";
      }
      editBtn.addEventListener("click", () => {
        if (window.MapEditor) {
          if (window.MapEditor.isActive()) {
            window.MapEditor.exit();
          } else {
            // 检查是否有草稿
            if (window.MapEditor.hasDraft(map.id)) {
              if (confirm("发现该地图的编辑草稿，是否恢复？\n点击确定恢复草稿，取消则使用当前数据。")) {
                window.MapEditor.restoreDraft(map.id);
              }
            }
            window.MapEditor.enter();
          }
        }
      });
    }

    // 绑定地点名称开关
    const locationCheckbox = document.getElementById("location-names-checkbox");
    if (locationCheckbox) {
      locationCheckbox.addEventListener("change", () => {
        showLocationNames = locationCheckbox.checked;
        renderLocationNames();
      });
    }

    // 如果编辑模式已激活，重新绑定画布事件
    if (window.MapEditor && window.MapEditor.isActive()) {
      // 编辑器会在enter后自己绑定
    }

    // 动态计算地图图片比例，确保标记定位准确
    const mapCanvas = document.getElementById("map-canvas");
    const bgImg = document.querySelector(".map-bg-img");
    
    if (bgImg && mapCanvas) {
      // 如果图片已加载完成，直接设置比例
      if (bgImg.complete && bgImg.naturalWidth > 0) {
        mapCanvas.style.aspectRatio = bgImg.naturalWidth + "/" + bgImg.naturalHeight;
      } else {
        // 图片还未加载，等待加载完成后再设置
        bgImg.onload = function() {
          mapCanvas.style.aspectRatio = this.naturalWidth + "/" + this.naturalHeight;
          // 重新渲染标记以确保定位准确
          renderMarkers();
          renderLocationNames();
        };
      }
    }

    // 渲染标记、地点名称、侧边栏
    renderMarkers();
    renderLocationNames();
    renderSidebar();
    renderLegend();

    // 编辑器激活时，DOM 重建后需恢复工具栏和画布事件
    if (window.MapEditor && window.MapEditor.isActive()) {
      setTimeout(() => {
        window.MapEditor._rebindEditorUI && window.MapEditor._rebindEditorUI();
      }, 0);
    }
  }

  // ==========================================
  // 地点名称渲染
  // ==========================================
  // ==========================================
  // 渲染 A/B 站点标签 + 地名 labels（统一为 HTML label，方便编辑器拖拽）
  // ==========================================
  function renderLocationNames() {
    const layer = document.getElementById("marker-layer");
    if (!layer || !currentMap) return;

    // 移除已有的地点/站点标签
    layer.parentElement.querySelectorAll(".map-location-label").forEach(el => el.remove());

    const siteFontSize = getSiteFontSize(currentMap);
    const locFontSize = getLocationFontSize(currentMap);

    // ---- 1. 站点 A/B/C：独立红色半透明大字 ----
    if (currentMap.sites && currentMap.sites.length) {
      currentMap.sites.forEach((site, idx) => {
        const label = document.createElement("div");
        label.className = "map-location-label type-site";
        label.dataset.labelKind = "site";
        label.dataset.labelIndex = idx;
        const pos = getMapPos(site);
        label.textContent = site.id;
        label.style.left = pos.x + "%";
        label.style.top = (pos.y + 1.5) + "%";
        label.style.fontSize = (site.fontSize || siteFontSize) + "px";
        label.style.color = "rgba(255, 70, 85, 0.5)";
        label.style.fontWeight = "900";
        layer.parentElement.appendChild(label);
      });
    }

    // ---- 2. 地名 labels ----
    const locations = currentMap.locations;
    if (!locations || locations.length === 0) return;

    locations.forEach((loc, idx) => {
      const label = document.createElement("div");
      label.className = "map-location-label" + (loc.type === "site" ? " type-site" : "");
      label.dataset.labelKind = "location";
      label.dataset.labelIndex = idx;

      // 非 site 类型在 toggle 关闭时隐藏
      if (loc.type !== "site" && !showLocationNames) {
        label.classList.add("hidden");
      }

      const pos = getMapPos(loc);
      label.textContent = loc.name;
      label.style.left = pos.x + "%";
      label.style.top = pos.y + "%";
      label.style.fontSize = (loc.fontSize || locFontSize) + "px";

      layer.parentElement.appendChild(label);
    });
  }

  // ==========================================
  // 站点/地名字号：每张地图可配置，默认值如下
  // ==========================================
  function getSiteFontSize(map) {
    return (map && map.siteFontSize) || 10;
  }
  function getLocationFontSize(map) {
    return (map && map.locationFontSize) || 10;
  }

  // 重新渲染 A/B 站点标签和地名标签（编辑器拖拽完后调用）
  function reloadLocationLabels() {
    renderLocationNames();
  }

  // ==========================================
  // 站点覆盖层 SVG（仅首页卡片缩略图使用，详情页用 HTML label 渲染）
  // ==========================================
  function generateSiteOverlaySvg(map) {
    if (!map.sites || map.sites.length === 0) return "";
    const fontSize = getSiteFontSize(map);
    let svg = `<svg class="site-overlay-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true">`;
    for (const site of map.sites) {
      svg += `<text x="${site.x}" y="${site.y + 1.5}" text-anchor="middle"
              fill="#ff4655" font-size="${fontSize}" font-weight="900"
              font-family="Arial, Helvetica, sans-serif"
              opacity="0.5" letter-spacing="0.5">${site.id}</text>`;
    }
    svg += `</svg>`;
    return svg;
  }

  // ==========================================
  // SVG 地图占位图生成（仅当无背景图时调用，会画网格/背景）
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

    // 据点标签
    if (sites && sites.length) {
      for (const site of sites) {
        svg += `<text x="${site.x}" y="${site.y + 1}" text-anchor="middle"
                fill="#ff4655" font-size="7" font-weight="bold"
                opacity="0.5"
                font-family="Arial, sans-serif">${site.id}</text>`;
      }
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
  // 标签过滤：检查item的tags是否包含当前筛选的标签
  function matchesSideFilter(item) {
    if (currentSideFilter === "all") return true;
    const tags = item.tags || [];
    return tags.includes(currentSideFilter);
  }

  function renderMarkers() {
    const layer = document.getElementById("marker-layer");
    if (!layer) return;
    layer.innerHTML = "";

    if (currentTab === "smoke-attack") {
      const arr = currentMap.attackSmokes || [];
      renderSmokeMarkers(layer, arr.filter(matchesSideFilter), false);
    } else if (currentTab === "smoke-defend") {
      const arr = currentMap.defendSmokes || [];
      renderSmokeMarkers(layer, arr.filter(matchesSideFilter), false);
    } else if (currentTab === "wallbangs") {
      const filtered = currentMap.wallbangs.filter(matchesSideFilter);
      renderWallbangMarkers(layer, filtered);
    } else if (currentTab === "plants") {
      const filtered = (currentMap.plantSpots || []).filter(matchesSideFilter);
      renderPlantSpotMarkers(layer, filtered);
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

  // 固定球烟半径（百分比）
  const SMOKE_RADIUS = 3;

  function createBallSmokeMarker(smoke, isAgentLineup) {
    const marker = document.createElement("div");
    marker.className = "marker ball-smoke";
    marker.dataset.itemId = smoke.id;
    if (isAgentLineup) marker.dataset.lineupId = smoke.id;
    const pos = getMapPos(smoke);
    marker.style.left = pos.x + "%";
    marker.style.top = pos.y + "%";

    marker.innerHTML = `
      <div class="smoke-range"></div>
      <div class="smoke-center"></div>
      <div class="smoke-label">${smoke.name}</div>
    `;

    marker.addEventListener("click", (e) => {
      e.stopPropagation();
      showDetail(smoke, isAgentLineup ? "lineup" : "smoke");
    });
    if (isAgentLineup) {
      marker.addEventListener("mouseenter", () => highlightLineupGroup(smoke.id, true));
      marker.addEventListener("mouseleave", () => highlightLineupGroup(smoke.id, false));
    }

    return marker;
  }

  function createLineSmokeMarker(smoke, isAgentLineup) {
    const marker = document.createElement("div");
    marker.className = "marker line-smoke";
    marker.dataset.itemId = smoke.id;
    if (isAgentLineup) marker.dataset.lineupId = smoke.id;
    const pos = getMapPos(smoke);
    marker.style.left = pos.x + "%";
    marker.style.top = pos.y + "%";
    marker.style.width = (smoke.length || 20) + "%";
    marker.style.transform = `translateY(-50%) rotate(${smoke.angle || 0}deg)`;

    marker.innerHTML = `<div class="smoke-label">${smoke.name}</div>`;

    marker.addEventListener("click", (e) => {
      e.stopPropagation();
      showDetail(smoke, isAgentLineup ? "lineup" : "smoke");
    });
    if (isAgentLineup) {
      marker.addEventListener("mouseenter", () => highlightLineupGroup(smoke.id, true));
      marker.addEventListener("mouseleave", () => highlightLineupGroup(smoke.id, false));
    }

    return marker;
  }

  function createAbilityMarker(smoke, isAgentLineup) {
    const marker = document.createElement("div");
    marker.className = "marker agent-ability";
    marker.dataset.itemId = smoke.id;
    marker.dataset.lineupId = smoke.id;
    marker.dataset.dragTarget = "ability";

    const abilityKey = smoke.ability || "E";
    const abilityColor = ABILITY_COLORS[abilityKey] || "#ff4655";

    const pos = getMapPos(smoke);
    marker.style.left = pos.x + "%";
    marker.style.top = pos.y + "%";
    marker.style.setProperty("--ability-color", abilityColor);

    marker.innerHTML = `
      <span class="ab-key">${abilityKey}</span>
      <div class="ab-label">${smoke.abilityName || smoke.name}</div>
    `;

    marker.addEventListener("click", (e) => {
      e.stopPropagation();
      showDetail(smoke, "lineup");
    });
    marker.addEventListener("mouseenter", () => highlightLineupGroup(smoke.id, true));
    marker.addEventListener("mouseleave", () => highlightLineupGroup(smoke.id, false));

    return marker;
  }

  function createStandMarker(smoke) {
    const marker = document.createElement("div");
    marker.className = "marker stand-position";
    marker.dataset.itemId = smoke.id;
    marker.dataset.lineupId = smoke.id;
    marker.dataset.dragTarget = "stand";

    const abilityKey = smoke.ability || "E";
    const abilityColor = ABILITY_COLORS[abilityKey] || "#ff4655";
    marker.style.setProperty("--ability-color", abilityColor);

    const pos = getMapPos({ x: smoke.standX, y: smoke.standY });
    marker.style.left = pos.x + "%";
    marker.style.top = pos.y + "%";
    marker.addEventListener("mouseenter", () => highlightLineupGroup(smoke.id, true));
    marker.addEventListener("mouseleave", () => highlightLineupGroup(smoke.id, false));
    return marker;
  }

  function createStandLine(smoke) {
    const line = document.createElement("div");
    line.className = "stand-line";
    line.dataset.lineupId = smoke.id;

    const abilityKey = smoke.ability || "E";
    const abilityColor = ABILITY_COLORS[abilityKey] || "#ff4655";
    line.style.setProperty("--ability-color", abilityColor);

    const landPos = getMapPos(smoke);
    const standPos = getMapPos({ x: smoke.standX, y: smoke.standY });
    const dx = landPos.x - standPos.x;
    const dy = landPos.y - standPos.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    line.style.left = standPos.x + "%";
    line.style.top = standPos.y + "%";
    line.style.width = length + "%";
    line.style.transform = `rotate(${angle}deg)`;

    // 添加鼠标事件，使连线也能触发高亮
    line.addEventListener("mouseenter", () => highlightLineupGroup(smoke.id, true));
    line.addEventListener("mouseleave", () => highlightLineupGroup(smoke.id, false));

    return line;
  }

  // 穿墙点标记
  function renderWallbangMarkers(layer, wallbangs) {
    wallbangs.forEach((wb) => {
      const marker = document.createElement("div");
      marker.className = "marker wallbang";
      marker.dataset.itemId = wb.id;
      const pos = getMapPos(wb);
      marker.style.left = pos.x + "%";
      marker.style.top = pos.y + "%";

      marker.innerHTML = `<div class="wb-label">${wb.name}</div>`;

      marker.addEventListener("click", (e) => {
        e.stopPropagation();
        showDetail(wb, "wallbang");
      });

      layer.appendChild(marker);
    });
  }

  // 下包点位标记
  // 下包类型配置
  const PLANT_TYPES = {
    open:        { label: "开放包", color: "#ff4655", icon: "◯" },
    safe:        { label: "安全包", color: "#00d4aa", icon: "▣" },
    special:     { label: "特殊包", color: "#ffa500", icon: "★" },
    "second-floor": { label: "二楼包", color: "#7b68ee", icon: "▲" }
  };

  function renderPlantSpotMarkers(layer, plantSpots) {
    plantSpots.forEach((ps) => {
      const marker = document.createElement("div");
      marker.className = "marker plant-spot plant-" + (ps.plantType || "open");
      marker.dataset.itemId = ps.id;

      const config = PLANT_TYPES[ps.plantType] || PLANT_TYPES.open;
      const pos = getMapPos(ps);
      marker.style.left = pos.x + "%";
      marker.style.top = pos.y + "%";
      marker.style.setProperty("--plant-color", config.color);

      marker.innerHTML = `
        <div class="plant-icon">${config.icon}</div>
        <div class="plant-label">${ps.name}</div>
      `;

      marker.addEventListener("click", (e) => {
        e.stopPropagation();
        showDetail(ps, "plant");
      });

      layer.appendChild(marker);
    });
  }

  // 英雄技能标记
  function renderAgentMarkers(layer) {
    if (!currentAgent || currentAbilityFilter === "none") {
      return;
    }

    const lineups = (LINEUPS()[currentMap.id] && LINEUPS()[currentMap.id][currentAgent]) || [];
    if (lineups.length === 0) {
      return;
    }

    // 根据技能筛选过滤
    let filteredLineups = currentAbilityFilter === "all"
      ? lineups
      : lineups.filter((l) => l.ability === currentAbilityFilter);

    if (filteredLineups.length === 0) {
      return;
    }

    const agent = AGENTS().find((a) => a.id === currentAgent);
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

    if (currentTab === "smoke-attack") {
      sidebar.innerHTML = renderSmokeSidebar("attack");
    } else if (currentTab === "smoke-defend") {
      sidebar.innerHTML = renderSmokeSidebar("defend");
    } else if (currentTab === "wallbangs") {
      sidebar.innerHTML = renderWallbangSidebar();
    } else if (currentTab === "plants") {
      sidebar.innerHTML = renderPlantSidebar();
    } else if (currentTab === "agents") {
      sidebar.innerHTML = renderAgentSidebar();
    }

    // 绑定侧边栏事件
    bindSidebarEvents();
  }

  function renderSmokeSidebar(side) {
    const smokes = side === "attack"
      ? (currentMap.attackSmokes || [])
      : (currentMap.defendSmokes || []);
    const title = side === "attack" ? "进攻烟位" : "防守烟位";
    if (smokes.length === 0) {
      return `<div class="empty-state">暂无${title}数据<div class="hint">在编辑模式中添加或导入</div></div>`;
    }

    return `
      <div class="sidebar-title">${title} (${smokes.length})</div>
      <div class="info-list">
        ${smokes.map((s) => renderInfoItem(s, getTypeLabel(s.type))).join("")}
      </div>
    `;
  }

  function renderWallbangSidebar() {
    const wbs = currentMap.wallbangs.filter(matchesSideFilter);
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

  function renderPlantSidebar() {
    const plantSpots = (currentMap.plantSpots || []).filter(matchesSideFilter);
    if (plantSpots.length === 0) {
      return `<div class="empty-state">暂无下包点位<div class="hint">在 data.js 中添加 plantSpots</div></div>`;
    }

    // 按类型分组统计
    const typeCounts = {};
    plantSpots.forEach((ps) => {
      const t = ps.plantType || "open";
      typeCounts[t] = (typeCounts[t] || 0) + 1;
    });

    const typeFilterHtml = `
      <div class="ability-filter">
        <button class="ability-btn ${currentPlantFilter === "all" ? "active" : ""}" data-plant-filter="all">全部 (${plantSpots.length})</button>
        ${Object.entries(PLANT_TYPES).map(([key, config]) => {
          const count = typeCounts[key] || 0;
          if (count === 0) return "";
          return `<button class="ability-btn ${currentPlantFilter === key ? "active" : ""}" data-plant-filter="${key}" style="--ability-color: ${config.color}">${config.label} (${count})</button>`;
        }).join("")}
      </div>
    `;

    const filteredSpots = currentPlantFilter === "all"
      ? plantSpots
      : plantSpots.filter((ps) => (ps.plantType || "open") === currentPlantFilter);

    return `
      <div class="sidebar-title">下包点位 (${plantSpots.length})</div>
      ${typeFilterHtml}
      <div class="info-list">
        ${filteredSpots.map((ps) => {
          const config = PLANT_TYPES[ps.plantType] || PLANT_TYPES.open;
          return renderInfoItem(ps, config.label);
        }).join("")}
      </div>
    `;
  }

  function renderAgentSidebar() {
    const roleFilterHtml = `
      <div class="role-filter">
        <button class="role-btn ${currentRoleFilter === "all" ? "active" : ""}" data-role="all">全部</button>
        ${Object.entries(ROLES()).map(([key, role]) => `
          <button class="role-btn ${currentRoleFilter === key ? "active" : ""}"
                  data-role="${key}"
                  style="--role-color: ${role.color}">
            ${role.icon} ${role.name}
          </button>
        `).join("")}
      </div>
    `;

    const filteredAgents = currentRoleFilter === "all"
      ? AGENTS()
      : AGENTS().filter((a) => a.role === currentRoleFilter);

    const agentListHtml = `
      <div class="agent-list">
        ${filteredAgents.map((agent) => {
          const hasLineup = LINEUPS()[currentMap.id] && LINEUPS()[currentMap.id][agent.id] && LINEUPS()[currentMap.id][agent.id].length > 0;
          const roleColor = ROLES()[agent.role].color;
          return `
            <div class="agent-card ${currentAgent === agent.id ? "active" : ""} ${hasLineup ? "has-lineup" : ""}"
                 data-agent-id="${agent.id}"
                 style="--role-color: ${roleColor}"
                 title="${agent.name} (${agent.enName})">
              <div class="agent-icon"><img src="assets/agents/${agent.id}.png?v=20260724" alt="${agent.name}" onerror="this.style.display='none';this.parentElement.textContent='${agent.name.charAt(0)}'"></div>
              <div class="agent-name">${agent.name}</div>
              <div class="agent-en">${agent.enName}</div>
            </div>
          `;
        }).join("")}
      </div>
    `;

    let lineupListHtml = "";
    if (currentAgent) {
      const agent = AGENTS().find((a) => a.id === currentAgent);
      const lineups = (LINEUPS()[currentMap.id] && LINEUPS()[currentMap.id][currentAgent]) || [];

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
            ${Object.entries(abilityCounts).map(([key, count]) => {
              // 查找该技能的中文名
              let abName = key;
              const sampleLineup = lineups.find(l => l.ability === key);
              if (sampleLineup && sampleLineup.abilityName) {
                abName = `${key} ${sampleLineup.abilityName}`;
              } else if (agent) {
                const ability = agent.abilities.find((ab) => ab.key === key);
                if (ability) abName = `${key} ${ability.name}`;
              }
              return `
              <button class="ability-btn ${currentAbilityFilter === key ? "active" : ""}"
                      data-ability="${key}"
                      style="--ability-color: ${ABILITY_COLORS[key] || "#ff4655"}">
                ${abName} (${count})
              </button>
            `}).join("")}
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
      : item.plantType ? "type-plant"
      : "type-wallbang";

    // 下包点位用 plantType 的颜色
    let badgeStyle = "";
    if (item.plantType) {
      const config = PLANT_TYPES[item.plantType] || PLANT_TYPES.open;
      badgeStyle = `style="background: ${config.color}; color: white;"`;
    }

    // 渲染标签徽章
    const tagsHtml = (item.tags || []).map(tag => {
      const tagClass = tag === "进攻方" ? "tag-attack"
        : tag === "防守方" ? "tag-defend"
        : "tag-both";
      return `<span class="info-item-tag ${tagClass}">${tag}</span>`;
    }).join("");

    // 为 lineup 生成中文名称
    let displayName = item.name;
    if (currentAgent && abilityKey) {
      displayName = getLineupTitle(item);
    }

    return `
      <div class="info-item" data-item-id="${item.id}">
        <div class="info-item-name">
          ${abilityKey ? `<span class="info-item-type ${typeClass}">${getAgentAbilityName(abilityKey, item.abilityName)}</span>` : `<span class="info-item-type ${typeClass}" ${badgeStyle}>${typeLabel}</span>`}
          ${displayName}
          ${tagsHtml ? `<span class="info-item-tags">${tagsHtml}</span>` : ""}
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

  // 获取当前英雄技能的中文名称
  // 优先使用 lineup 数据中的 abilityName（从原始数据转换）
  function getAgentAbilityName(abilityKey, lineupAbilityName) {
    if (lineupAbilityName) return `${abilityKey} ${lineupAbilityName}`;
    if (!currentAgent || !abilityKey) return abilityKey;
    const agent = AGENTS().find((a) => a.id === currentAgent);
    if (!agent) return abilityKey;
    const ability = agent.abilities.find((ab) => ab.key === abilityKey);
    return ability ? `${ability.key} ${ability.name}` : abilityKey;
  }

  // 生成中文点位标题
  function getLineupTitle(lineup) {
    const agent = AGENTS().find((a) => a.id === currentAgent);
    // 优先使用 lineup 数据中的 abilityName（从原始数据转换的中文名）
    const abilityName = lineup.abilityName || 
      (agent ? (agent.abilities.find((ab) => ab.key === lineup.ability)?.name || lineup.ability) : lineup.ability);
    const side = (lineup.tags || []).includes("进攻方") ? " - 进攻" :
                 (lineup.tags || []).includes("防守方") ? " - 防守" : "";
    return `${agent ? agent.name + " " : ""}${abilityName}点位${side}`;
  }

  // ==========================================
  // 图例
  // ==========================================
  function renderLegend() {
    const legend = document.getElementById("legend");
    if (!legend) return;

    let items = [];

    if (currentTab === "smoke-attack" || currentTab === "smoke-defend") {
      items = [
        { cls: "ball", label: "球烟（圆形范围）" },
        { cls: "line", label: "线烟（线性范围）" }
      ];
    } else if (currentTab === "wallbangs") {
      items = [
        { cls: "wallbang", label: "穿墙点位" }
      ];
    } else if (currentTab === "plants") {
      items = Object.entries(PLANT_TYPES).map(([key, config]) => ({
        cls: "plant-" + key,
        label: config.label,
        plantColor: config.color,
        plantIcon: config.icon
      }));
    } else if (currentTab === "agents") {
      items = [
        { cls: "ball", label: "球烟" },
        { cls: "line", label: "线烟" },
        { cls: "stand", label: "站位" }
      ];
      // 如果选了英雄，加上技能键位图例
      if (currentAgent) {
        const lineups = (LINEUPS()[currentMap.id] && LINEUPS()[currentMap.id][currentAgent]) || [];
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
      if (item.plantColor) {
        return `
          <div class="legend-item">
            <div class="legend-dot plant-dot" style="color: ${item.plantColor}; border-color: ${item.plantColor};">${item.plantIcon}</div>
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
        if (btn.dataset.ability) {
          currentAbilityFilter = btn.dataset.ability;
        } else if (btn.dataset.plantFilter) {
          currentPlantFilter = btn.dataset.plantFilter;
        }
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

  // 高亮/取消高亮同一组 lineup 的标记、站位和连线
  function highlightLineupGroup(lineupId, active) {
    // 高亮地图上的标记和连线
    const markers = app.querySelectorAll(`[data-lineup-id="${lineupId}"]`);
    markers.forEach((el) => {
      if (active) el.classList.add("hover-highlight");
      else el.classList.remove("hover-highlight");
    });
    
    // 同时高亮侧边栏对应项
    const sidebarItem = app.querySelector(`.info-item[data-item-id="${lineupId}"]`);
    if (sidebarItem) {
      if (active) sidebarItem.classList.add("hover-highlight");
      else sidebarItem.classList.remove("hover-highlight");
    }
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
    app.querySelectorAll(".stand-line").forEach((l) => {
      l.classList.remove("highlighted");
    });
    const marker = app.querySelector(`.marker[data-item-id="${itemId}"]`);
    if (marker) {
      marker.classList.add("highlighted");
    }
    // 同时高亮对应的站位和连线
    if (currentTab === "agents") {
      const standMarker = app.querySelector(`.marker.stand-position[data-lineup-id="${itemId}"]`);
      const standLine = app.querySelector(`.stand-line[data-lineup-id="${itemId}"]`);
      if (standMarker) standMarker.classList.add("highlighted");
      if (standLine) standLine.classList.add("highlighted");
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
    if (currentTab === "smoke-attack") {
      return (currentMap.attackSmokes || []).find((s) => s.id === itemId);
    } else if (currentTab === "smoke-defend") {
      return (currentMap.defendSmokes || []).find((s) => s.id === itemId);
    } else if (currentTab === "wallbangs") {
      return currentMap.wallbangs.find((w) => w.id === itemId);
    } else if (currentTab === "plants") {
      return (currentMap.plantSpots || []).find((p) => p.id === itemId);
    } else if (currentTab === "agents" && currentAgent) {
      const lineups = (LINEUPS()[currentMap.id] && LINEUPS()[currentMap.id][currentAgent]) || [];
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
    // 编辑模式下调用编辑面板
    if (window.MapEditor && window.MapEditor.isActive() && item.id) {
      window.MapEditor.showEditPanel(item.id);
      return;
    }

    let html = `<button class="detail-close" onclick="document.getElementById('detail-overlay').classList.add('hidden')">&times;</button>`;

    if (type === "smoke") {
      html += renderSmokeDetail(item);
    } else if (type === "wallbang") {
      html += renderWallbangDetail(item);
    } else if (type === "plant") {
      html += renderPlantDetail(item);
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
          <div class="detail-value">${SMOKE_RADIUS}%（固定，地图宽度百分比）</div>
        </div>
      ` : ""}

      ${smoke.type === "line" ? `
        <div class="detail-section">
          <div class="detail-label">长度 / 角度</div>
          <div class="detail-value">${smoke.length}% / ${smoke.angle}度</div>
        </div>
      ` : ""}

      ${renderDetailImageSection("站位图", smoke.standImg, smoke.standDesc)}
      ${renderDetailImageSection("瞄点图", smoke.aimImg, smoke.aimDesc)}
      ${renderDetailImageSection("效果图", smoke.effectImg, smoke.effectDesc)}
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

      ${renderDetailImageSection("站位图", wb.standImg, wb.standDesc)}
      ${renderDetailImageSection("瞄点图", wb.aimImg, wb.aimDesc)}
      ${renderDetailImageSection("效果图", wb.effectImg, wb.effectDesc)}
    `;
  }

  function renderPlantDetail(ps) {
    const config = PLANT_TYPES[ps.plantType] || PLANT_TYPES.open;

    return `
      <div class="detail-title">${ps.name}</div>
      <span class="detail-badge" style="background: ${config.color}; color: white;">
        ${config.label} ${ps.site ? "| " + ps.site + "点" : ""}
      </span>

      ${ps.desc ? `
        <div class="detail-section">
          <div class="detail-label">说明</div>
          <div class="detail-value">${ps.desc}</div>
        </div>
      ` : ""}

      <div class="detail-section">
        <div class="detail-label">坐标</div>
        <div class="detail-value">X: ${ps.x}%, Y: ${ps.y}%</div>
      </div>

      ${ps.advantage ? `
        <div class="detail-section">
          <div class="detail-label">优势</div>
          <div class="detail-value">${ps.advantage}</div>
        </div>
      ` : ""}

      ${ps.risk ? `
        <div class="detail-section">
          <div class="detail-label">风险</div>
          <div class="detail-value">${ps.risk}</div>
        </div>
      ` : ""}

      ${ps.postPlant ? `
        <div class="detail-section">
          <div class="detail-label">下包后站位</div>
          <div class="detail-value">${ps.postPlant}</div>
        </div>
      ` : ""}

      ${renderDetailImageSection("站位图", ps.standImg, ps.standDesc)}
      ${renderDetailImageSection("瞄点图", ps.aimImg, ps.aimDesc)}
      ${renderDetailImageSection("效果图", ps.effectImg, ps.effectDesc)}
    `;
  }

  function renderLineupDetail(lineup) {
    const agent = AGENTS().find((a) => a.id === currentAgent);
    const ability = agent ? agent.abilities.find((ab) => ab.key === lineup.ability) : null;
    const typeLabel = getTypeLabel(lineup.type);
    const roleColor = agent ? ROLES()[agent.role].color : "#ff4655";
    const chineseTitle = getLineupTitle(lineup);

    return `
      <div class="detail-title">${chineseTitle}</div>
      ${lineup.name && lineup.name !== chineseTitle ? `<div class="detail-subtitle">${lineup.name}</div>` : ""}
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

      ${renderDetailImageSection("站位图", lineup.standImg, lineup.standDesc)}
      ${renderDetailImageSection("瞄点图", lineup.aimImg, lineup.aimDesc)}
      ${renderDetailImageSection("效果图", lineup.effectImg, lineup.effectDesc)}

      ${lineup.video ? `
        <div class="detail-video">
          <a href="${lineup.video}" target="_blank">观看视频教学</a>
        </div>
      ` : ""}
    `;
  }

  // 渲染详情图片区块（始终显示，无图时显示占位符；desc 为图片上方说明文字）
  function renderDetailImageSection(label, imgPath, desc) {
    const descHtml = desc
      ? `<div class="detail-image-desc">${desc}</div>`
      : "";
    const imgHtml = imgPath
      ? `<img src="${imgPath}" alt="${label}" class="detail-image"
               onerror="this.parentElement.innerHTML='<div class=\\'detail-image-placeholder\\'>图片未找到: ${imgPath}</div>'">`
      : `<div class="detail-image-placeholder">暂无图片，可在数据中添加 ${label}</div>`;
    return `
      <div class="detail-section detail-image-section">
        <div class="detail-label">${label}</div>
        ${descHtml}
        <div class="detail-image-wrapper">
          ${imgHtml}
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
      ${MAPS().map((map) => `
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

  // 暴露编辑器需要的接口
  window.__APP__ = {
    getMap: () => currentMap,
    getTab: () => currentTab,
    getAgent: () => currentAgent,
    setAgent: (a) => { currentAgent = a; },
    setAbilityFilter: (f) => { currentAbilityFilter = f; },
    getLineups: () => LINEUPS(),
    rerender: () => renderMapDetail(),
    renderMarkers: () => renderMarkers(),
    renderSidebar: () => renderSidebar(),
    getData: () => ({ MAPS: MAPS(), AGENTS: AGENTS(), LINEUPS: LINEUPS(), ROLES: ROLES() }),
    showDetail: (item, type) => showDetail(item, type),
    ABILITY_COLORS: ABILITY_COLORS,
    reloadLabels: reloadLocationLabels,
    isAttackView: () => !!isAttackView,
    getLabelObject: (kind, idx) => {
      if (!currentMap) return null;
      if (kind === "site") return (currentMap.sites && currentMap.sites[idx]) || null;
      if (kind === "location") {
        if (!currentMap.locations) currentMap.locations = [];
        return currentMap.locations[idx] || null;
      }
      return null;
    },
    addLocationLabel: (kind, obj) => {
      if (!currentMap) return -1;
      if (kind === "location") {
        if (!currentMap.locations) currentMap.locations = [];
        currentMap.locations.push(obj);
        return currentMap.locations.length - 1;
      }
      if (kind === "site") {
        if (!currentMap.sites) currentMap.sites = [];
        currentMap.sites.push(obj);
        return currentMap.sites.length - 1;
      }
      return -1;
    },
    removeLocationLabel: (kind, idx) => {
      if (!currentMap) return;
      if (kind === "location" && currentMap.locations) {
        currentMap.locations.splice(idx, 1);
      }
      if (kind === "site" && currentMap.sites) {
        currentMap.sites.splice(idx, 1);
      }
    }
  };

  // 编辑器数据更新后重新渲染（仅在编辑器未激活时完整重渲染）
  window.addEventListener("editor-data-updated", () => {
    if (window.MapEditor && window.MapEditor.isActive()) {
      // 编辑器激活时，完整重渲染后需恢复工具栏和画布事件
      renderMapDetail();
      setTimeout(() => {
        window.MapEditor._rebindEditorUI && window.MapEditor._rebindEditorUI();
      }, 100);
    } else {
      renderMapDetail();
    }
  });

  router();
})();
