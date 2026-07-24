const fs = require('fs');
let code = fs.readFileSync('js/data.js', 'utf8');
// 模拟浏览器 window 对象
global.window = {};
eval(code);

const D = window.APP_DATA;
console.log('✅ window.APP_DATA 加载成功');
console.log('');
console.log('职业:', Object.keys(D.ROLES).length, '个 -', Object.values(D.ROLES).map(r=>r.name).join(' / '));
console.log('特工:', D.AGENTS.length, '名');
const aNames = D.AGENTS.map(a => a.name+'('+a.id+')').join(', ');
console.log('  -', aNames);
console.log('');
console.log('地图:', D.MAPS.length, '张');
const mNames = D.MAPS.map(m => m.name+'('+m.id+')').join(', ');
console.log('  -', mNames);
console.log('');
console.log('LINEUPS 英雄数据地图:', Object.keys(D.LINEUPS).length, '张');
console.log('');
console.log('--- 关键核对 ---');
const jett = D.AGENTS.find(a=>a.id==='jett');
const viper = D.AGENTS.find(a=>a.id==='viper');
const chamber = D.AGENTS.find(a=>a.id==='chamber');
const bind = D.MAPS.find(m=>m.id==='bind');
const split = D.MAPS.find(m=>m.id==='split');
const corrode = D.MAPS.find(m=>m.id==='corrode');
const neon = D.AGENTS.find(a=>a.id==='neon');
console.log('捷风 smokeType:', jett.smokeType, '- C技能:', jett.abilities[0].name, jett.abilities[0].isSmoke ? '✅烟雾' : '❌');
console.log('蝰蛇 smokeType:', viper.smokeType, '- C球烟:', viper.abilities[0].name, '- Q线烟:', viper.abilities[1].name);
console.log('Chamber 中文名:', chamber.name, '(期望:钱博尔)');
console.log('Bind 地图名:', bind.name, '(期望:遗落境地)');
console.log('Split 地图名:', split.name, '(期望:分裂)');
console.log('Corrode 地图名:', corrode.name, '(期望:腐蚀)');
console.log('霓虹 C/Q技能:', neon.abilities[0].name+'/'+neon.abilities[1].name, '(期望:快道/接力雷电)');
console.log('');
console.log('--- 检查空tags情况 ---');
function countEmpty(obj, depth=0){
  let emptyTags = 0, totalTags = 0;
  if (Array.isArray(obj)) {
    for (const it of obj) {
      const r = countEmpty(it, depth+1);
      emptyTags += r.emptyTags; totalTags += r.totalTags;
    }
  } else if (obj && typeof obj === 'object') {
    if ('tags' in obj) {
      totalTags++;
      if (Array.isArray(obj.tags) && obj.tags.length === 0) emptyTags++;
    }
    for (const k of Object.keys(obj)) {
      const r = countEmpty(obj[k], depth+1);
      emptyTags += r.emptyTags; totalTags += r.totalTags;
    }
  }
  return {emptyTags, totalTags};
}
const r = countEmpty(D);
console.log('  tags总数:', r.totalTags, ', 空tags数:', r.emptyTags, r.totalTags? '占比'+(r.emptyTags/r.totalTags*100).toFixed(1)+'%':'');
