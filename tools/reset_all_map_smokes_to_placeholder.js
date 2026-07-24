// 一次性：把 13 张图 commonSmokes 全部替换为 4 个占位样本：
//   ball + 进攻方 / ball + 防守方 / line + 进攻方 / line + 防守方
// agents/*.js 不触碰。
// 用法：node tools/reset_all_map_smokes_to_placeholder.js
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

function buildSamples(mapId) {
  return [
    {
      id: `${mapId}_sample_ball_attack`,
      type: "ball",
      name: "【占位-进攻方球烟】请修改名称",
      site: "A",
      x: 50,
      y: 50,
      radius: 6,
      desc: "【占位样本】请修改坐标/名称/说明。删了自己改也行。",
      tags: ["进攻方"]
    },
    {
      id: `${mapId}_sample_ball_defend`,
      type: "ball",
      name: "【占位-防守方球烟】请修改名称",
      site: "B",
      x: 50,
      y: 50,
      radius: 6,
      desc: "【占位样本】请修改坐标/名称/说明。",
      tags: ["防守方"]
    },
    {
      id: `${mapId}_sample_line_attack`,
      type: "line",
      name: "【占位-进攻方线烟】请修改名称",
      site: "A",
      x: 50,
      y: 50,
      length: 15,
      angle: 0,
      desc: "【占位样本】请修改坐标/长度/角度/说明。",
      tags: ["进攻方"]
    },
    {
      id: `${mapId}_sample_line_defend`,
      type: "line",
      name: "【占位-防守方线烟】请修改名称",
      site: "B",
      x: 50,
      y: 50,
      length: 15,
      angle: 90,
      desc: "【占位样本】请修改坐标/长度/角度/说明。",
      tags: ["防守方"]
    }
  ];
}

MAP_ORDER.forEach(mapId => {
  const basePath = path.join(DATA, 'maps', mapId, 'base.js');
  if (!fs.existsSync(basePath)) { console.log(`  [SKIP] 没有 ${path.basename(basePath)}`); return; }
  let src = fs.readFileSync(basePath, 'utf8');

  // 匹配 "commonSmokes": [ 到对应闭合 ] 整块（非贪婪，加上可选的末尾逗号）
  // 为避免嵌套 [] 非贪婪提前闭合，我们用 vm 先解析 base.js 更安全。
  try {
    const s2 = { window: {} };
    vm.createContext(s2);
    vm.runInContext(src, s2, { filename: basePath });
    const KEYS = Object.keys(s2.window.__VAL_DATA__).filter(k => k.endsWith('__BASE'));
    const KEY = KEYS[0];
    const base = s2.window.__VAL_DATA__[KEY];
    if (!base) { console.log(`  [SKIP] 没解析到 __BASE：${mapId}`); return; }
    // 替换 samples
    base.commonSmokes = buildSamples(mapId);
    // 按原来的结构序列化输出，保持和原文件一致的整体格式（mapId: ..., sites:...
    // 把 base 对象序列化成：
    const jsonStr = JSON.stringify(base, null, 2)
      .split('\n')
      .map((l, i) => i === 0 ? l : '  ' + l)   // 2 空格补全原缩进（因为整个 window.__VAL_DATA__.XXX = {...} 里的 {...} 顶层是 2 空格）
      .join('\n');
    // 替换原文件中 `= {` 到末尾 `};` 间的内容
    const newSrc = src.replace(/=\s*\{[\s\S]*\};\s*$/, `= ${jsonStr};`);
    fs.writeFileSync(basePath, newSrc, 'utf8');
    console.log(`  [OK] ${mapId} commonSmokes → 4 个占位样本`);
  } catch (e) {
    console.error(`  [ERR] ${mapId} 解析失败:`, e.message);
  }
});

console.log('\n✅ 完成');
