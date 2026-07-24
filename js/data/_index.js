// ==========================================
// 数据组装：从 maps/<mapId>/base.js + maps/<mapId>/agents/*.js 汇总为 window.APP_DATA
// ⚠️ 不要手动修改本文件
// ==========================================
(function () {
  var D = window.__VAL_DATA__;
  if (!D) throw new Error('请先按顺序加载 _base.js / _maps_meta.js / maps/**');

  function pick(obj, keys) { var o = {}; for (var i = 0; i < keys.length; i++) { var k = keys[i]; if (k in obj) o[k] = obj[k]; } return o; }
  function findMeta(mapId) { var m = D.MAPS_META.find(function (x) { return x.id === mapId; }); if (!m) throw new Error('MAPS_META miss: ' + mapId); return m; }
  function mapUpper(id) { return id.toUpperCase().replace(/[^A-Z0-9]/g, '_'); }

  var MAP_ID_ORDER = D.MAP_ID_ORDER;
  var AGENT_IDS = D.AGENTS.map(function (a) { return a.id; });

  var MAPS = [];
  var LINEUPS = {};

  for (var i = 0; i < MAP_ID_ORDER.length; i++) {
    var mapId = MAP_ID_ORDER[i];
    var UP = mapUpper(mapId);
    var BASE_KEY   = 'MAP_DATA_' + UP + '__BASE';
    var AGENTS_KEY = 'MAP_DATA_' + UP + '__AGENTS';
    var base = D[BASE_KEY];
    if (!base) { console.warn('[APP_DATA] 跳过缺少 base.js 的地图:', mapId); continue; }

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

  delete window.__VAL_DATA__;
})();
