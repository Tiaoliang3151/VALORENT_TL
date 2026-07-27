// ==========================================
// 数据组装：支持懒加载
// - 首次加载：只组装已加载的地图数据（只有 meta）
// - loadMapData(mapId): 动态加载指定地图的 base.js + agents/*.js
// ⚠️ 不要手动修改本文件
// ==========================================
(function () {
  var D = window.__VAL_DATA__;
  if (!D) throw new Error('请先按顺序加载 _base.js / _maps_meta.js');

  function pick(obj, keys) { var o = {}; for (var i = 0; i < keys.length; i++) { var k = keys[i]; if (k in obj) o[k] = obj[k]; } return o; }
  function findMeta(mapId) { var m = D.MAPS_META.find(function (x) { return x.id === mapId; }); if (!m) throw new Error('MAPS_META miss: ' + mapId); return m; }
  function mapUpper(id) { return id.toUpperCase().replace(/[^A-Z0-9]/g, '_'); }

  var MAP_ID_ORDER = D.MAP_ID_ORDER;
  var AGENT_IDS = D.AGENTS.map(function (a) { return a.id; });

  // 初始化 APP_DATA（只包含已加载的地图）
  function initAPP_DATA() {
    var MAPS = [];
    var LINEUPS = {};

    for (var i = 0; i < MAP_ID_ORDER.length; i++) {
      var mapId = MAP_ID_ORDER[i];
      var UP = mapUpper(mapId);
      var BASE_KEY = 'MAP_DATA_' + UP + '__BASE';
      var AGENTS_KEY = 'MAP_DATA_' + UP + '__AGENTS';
      var base = D[BASE_KEY];

      if (!base) {
        // 未加载的地图，只添加基础 meta 信息
        MAPS.push(Object.assign({}, findMeta(mapId), { id: mapId }));
        LINEUPS[mapId] = {};
        for (var j = 0; j < AGENT_IDS.length; j++) {
          LINEUPS[mapId][AGENT_IDS[j]] = [];
        }
        continue;
      }

      var mapObj = Object.assign({}, findMeta(mapId), { id: mapId },
        pick(base, ['sites', 'siteFontSize', 'locationFontSize', 'attackSmokes', 'defendSmokes', 'wallbangs', 'plantSpots', 'locations'])
      );
      MAPS.push(mapObj);

      var agents = D[AGENTS_KEY] || {};
      LINEUPS[mapId] = {};
      for (var j = 0; j < AGENT_IDS.length; j++) {
        var aid = AGENT_IDS[j];
        LINEUPS[mapId][aid] = agents[aid] || [];
      }
    }

    window.APP_DATA = {
      ROLES: D.ROLES,
      AGENTS: D.AGENTS,
      MAPS: MAPS,
      LINEUPS: LINEUPS
    };
  }

  // 检查地图数据是否已加载
  function isMapLoaded(mapId) {
    var UP = mapUpper(mapId);
    var BASE_KEY = 'MAP_DATA_' + UP + '__BASE';
    return !!(D[BASE_KEY]);
  }

  // 动态加载地图数据
  // 返回 Promise，加载完成后自动更新 APP_DATA
  function loadMapData(mapId) {
    return new Promise(function (resolve, reject) {
      if (isMapLoaded(mapId)) {
        resolve();
        return;
      }

      var UP = mapUpper(mapId);
      var scripts = [];

      // 1. 加载 base.js
      scripts.push('js/data/maps/' + mapId + '/base.js');

      // 2. 加载所有 agent 文件
      for (var i = 0; i < AGENT_IDS.length; i++) {
        scripts.push('js/data/maps/' + mapId + '/agents/' + AGENT_IDS[i] + '.js');
      }

      var loadedCount = 0;
      var totalCount = scripts.length;

      function onScriptLoad() {
        loadedCount++;
        if (loadedCount >= totalCount) {
          initAPP_DATA();
          resolve();
        }
      }

      function onScriptError(err) {
        console.error('[loadMapData] 加载失败:', err);
        reject(err);
      }

      for (var i = 0; i < scripts.length; i++) {
        var script = document.createElement('script');
        script.src = scripts[i];
        script.onload = onScriptLoad;
        script.onerror = onScriptError;
        document.head.appendChild(script);
      }
    });
  }

  // 导出全局方法供 app.js 使用
  window.__VAL_LOAD_MAP_DATA__ = loadMapData;

  // 首次初始化
  initAPP_DATA();

  // ⚠️ 注意：不要删除 window.__VAL_DATA__，因为懒加载的地图脚本需要写入到这个对象中
  // 闭包中的 D 变量会持续引用这个对象，确保懒加载的数据能正确传递
})();
