// 一次性：把 13 张图 commonSmokes 按 tags 拆成 attackSmokes + defendSmokes
//   - tags 含 "进攻方" → attackSmokes
//   - tags 含 "防守方" → defendSmokes
//   - 占位样本（4个）→ attackSmokes 2 个 + defendSmokes 2 个（球烟/线烟进攻各一 / 球烟/线烟防守各一）
//   - tags 空 或 其他 → 按 name 里"防守/def/攻/atk"推测，都没有丢进 attackSmokes（兜底）
//
// 用法：node tools/split_commonSmokes_to_attack_defend.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'js', 'data');

const sand = { window: {} };
vm.createContext(sand);
vm.runInContext(fs.readFileSync(path.join(DATA, '_base.js'), 'utf8'), sand, {filename: path.join(DATA, '_base.js')});
vm.runInContext(fs.readFileSync(path.join(DATA, '_maps_meta.js'), 'utf8'), sand, {filename: path.join(DATA, '_maps_meta.js')});
const MAP_ORDER = sand.window.__VAL_DATA__.MAP_ID_ORDER;
const MAP_UP_CACHE = {};
MAP_ORDER.forEach(id => MAP_UP_CACHE[id] = id.toUpperCase().replace(/[^A-Z0-9]/g, '_'));

function sample(mapId, type, side) {
  // side = 'atk' / 'def'
  const sideCn = side === 'atk' ? '进攻方' : '防守方';
  const sideCnLabel = side === 'atk' ? '进攻方' : '防守方';
  const typeLabel = type === 'ball' ? '球烟' : '线烟';
  const o = {
    id: `${mapId}_sample_${type}_${side}`,
    type: type,
    name: `【占位-${sideCnLabel}${typeLabel}】请修改名称`,
    site: 'A',
    x: 50,
    y: 50,
    desc: `【占位样本-${sideCnLabel}】请修改坐标/名称/说明。删了自己改也行。`,
    tags: [sideCn]
  };
  if (type === 'ball') o.radius = 6;
  else { o.length = 15; o.angle = (side === 'atk' ? 0 : 90); }
  return o;
}

MAP_ORDER.forEach(mapId => {
  const p = path.join(DATA, 'maps', mapId, 'base.js');
  if (!fs.existsSync(p)) { console.log(`  [SKIP] no ${mapId}`); return; }

  try {
    const s2 = { window: {} };
    vm.createContext(s2);
    vm.runInContext(fs.readFileSync(p, 'utf8'), s2, { filename: p });
    const KEY = Object.keys(s2.window.__VAL_DATA__).find(k => k.endsWith('__BASE'));
    const base = s2.window.__VAL_DATA__[KEY];
    if (!base) throw new Error('no __BASE');

    const atk = [], def = [];

    // 分数据
    (base.commonSmokes || []).forEach(s => {
      const tags = s.tags || [];
      if (tags.includes('防守方')) { def.push(s); }
      else if (tags.includes('进攻方')) { atk.push(s); }
      else if (/防守|def|守/i.test(s.name || '')) { def.push(s); }
      else { atk.push(s); }  // 兜底：默认进进攻
      // 从每条里把 tags 里的 "进攻方"/"防守方" 去掉不再需要了（保留 tags 字段兼容）
    });

    // 如果分完两边都为空（占位 4 条还没分）→ 生成标准 2 + 2 占位
    if (atk.length === 0 && def.length === 0) {
      atk.push(sample(mapId, 'ball', 'atk'), sample(mapId, 'line', 'atk'));
      def.push(sample(mapId, 'ball', 'def'), sample(mapId, 'line', 'def'));
    } else if (atk.length === 0) {
      atk.push(sample(mapId, 'ball', 'atk'), sample(mapId, 'line', 'atk'));
    } else if (def.length === 0) {
      def.push(sample(mapId, 'ball', 'def'), sample(mapId, 'line', 'def'));
    }

    // 写入新字段 + 删除旧
    base.attackSmokes = atk;
    base.defendSmokes = def;
    delete base.commonSmokes;

    // 输出（和 fix_base_js_variable_names 同格式 —— 固定模板拼接不匹配正则）
    const JSON_STR = JSON.stringify(base, null, 2)
      .split('\n').map((l, i) => i === 0 ? l : '  ' + l).join('\n');
    const HEADER = `// ==========================================
// 地图基础数据（非英雄）：${mapId}
// 包含：AB 点 sites + 字号 / 进攻烟 attackSmokes / 防守烟 defendSmokes / 穿墙点 wallbangs / 下包点 plantSpots / 地名 locations
// 修改频率：中高
// ==========================================

if (!window.__VAL_DATA__) window.__VAL_DATA__ = {};

window.__VAL_DATA__.MAP_DATA_${MAP_UP_CACHE[mapId]}__BASE = ${JSON_STR};
`;
    fs.writeFileSync(p, HEADER, 'utf8');
    console.log(`  [OK] ${mapId.padEnd(10)} attackSmokes=${String(atk.length).padStart(2)} / defendSmokes=${String(def.length).padStart(2)}`);
  } catch (e) {
    console.error(`  [ERR] ${mapId}:`, e.message);
  }
});
console.log('\n✅ 完成');
