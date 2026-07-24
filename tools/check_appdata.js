const fs = require('fs');
const vm = require('vm');
const sandbox = { window: {}, document: {} };
vm.createContext(sandbox);
const files = [
  'js/data/_base.js',
  'js/data/_maps_meta.js',
  'js/data/map_ascent.js','js/data/map_bind.js','js/data/map_breeze.js','js/data/map_corrode.js','js/data/map_fracture.js','js/data/map_haven.js','js/data/map_icebox.js','js/data/map_lotus.js','js/data/map_pearl.js','js/data/map_split.js','js/data/map_summit.js','js/data/map_sunset.js','js/data/map_abyss.js',
  'js/data/_index.js'
];
for (const f of files) {
  try {
    vm.runInContext(fs.readFileSync(f,'utf8'), sandbox, { filename: f });
    console.log('OK', f);
  } catch(e) {
    console.log('FAIL', f, '->', e.message);
    process.exit(1);
  }
}
const MAPS = sandbox.window.APP_DATA.MAPS;
console.log('\nMAPS count:', MAPS.length);
MAPS.forEach((m,i) => {
  console.log(i, '- id:', m.id, '| name:', m.name, '| sites:', m.sites && m.sites.map(s=>s.id).join('/'), '| image?', !!m.image);
});
