// ============================================================
// 端到端验证：新拆分结构加载出来的 window.APP_DATA 和原始 data.js 是否字节级一致
// ============================================================
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadInSandbox(scriptPaths) {
  const sandbox = { window: {}, console };
  vm.createContext(sandbox);
  for (const p of scriptPaths) {
    const code = fs.readFileSync(p, 'utf8');
    vm.runInContext(code, sandbox, { filename: p });
  }
  return sandbox.window.APP_DATA;
}

// 1. 加载原始单文件
const ORIG = loadInSandbox([path.join(__dirname, '..', 'js', 'data.js')]);

// 2. 按 index.html 里的新顺序加载拆分文件
const DATA_DIR = path.join(__dirname, '..', 'js', 'data');
const newPaths = [
  '_base.js',
  '_maps_meta.js',
  'map_bind.js',
  'map_haven.js',
  'map_split.js',
  'map_ascent.js',
  'map_breeze.js',
  'map_pearl.js',
  'map_lotus.js',
  'map_fracture.js',
  'map_icebox.js',
  'map_sunset.js',
  'map_abyss.js',
  'map_corrode.js',
  'map_summit.js',
  '_index.js',
].map(f => path.join(DATA_DIR, f));
const NEW = loadInSandbox(newPaths);

// 3. 对比（序列化后比较）
function deepEq(a, b, trail = '') {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEq(a[i], b[i], trail + `[${i}]`)) return false;
    }
    return true;
  }
  if (typeof a === 'object') {
    const ka = Object.keys(a).sort();
    const kb = Object.keys(b).sort();
    if (ka.join(',') !== kb.join(',')) {
      console.log(`❌ 键不同 @${trail}: ORIG=[${ka.join(',')}] NEW=[${kb.join(',')}]`);
      return false;
    }
    for (const k of ka) {
      if (!deepEq(a[k], b[k], trail + '.' + k)) return false;
    }
    return true;
  }
  return false;
}

console.log('--- 基本统计 ---');
console.log(`ORIG: ROLES=${Object.keys(ORIG.ROLES).length}  AGENTS=${ORIG.AGENTS.length}  MAPS=${ORIG.MAPS.length}  LINEUPS_maps=${Object.keys(ORIG.LINEUPS).length}`);
console.log(`NEW : ROLES=${Object.keys(NEW.ROLES).length}  AGENTS=${NEW.AGENTS.length}  MAPS=${NEW.MAPS.length}  LINEUPS_maps=${Object.keys(NEW.LINEUPS).length}`);

console.log('');
console.log('--- 深层对比 ---');
const ok = deepEq(ORIG, NEW);
if (ok) {
  console.log('✅✅✅ 全部一致！新数据结构与原 data.js 导出对象完全相同');
  // 再统计下每个 map_xxx.js 里 LINEUPS 总条数
  let total = 0;
  for (const mid of Object.keys(NEW.LINEUPS)) {
    const per = Object.values(NEW.LINEUPS[mid]).reduce((s, a) => s + a.length, 0);
    total += per;
    console.log(`   ${mid.padEnd(10)}: ${per} 条阵容`);
  }
  console.log(`   ${'合计'.padEnd(10)}: ${total} 条阵容`);
} else {
  console.log('❌ 有差异！详情看上面的错误提示');
  process.exit(1);
}
