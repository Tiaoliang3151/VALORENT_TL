const fs = require('fs');
const path = require('path');
const PNG = require('pngjs').PNG;

const mapsMeta = require('./_maps_meta.js'); // 无法直接加载，手动获取路径

const mapImages = [
  'assets/maps/ascent_overview.png',
  'assets/maps/bind_overview.png', 
  'assets/maps/breeze_overview.png',
  'assets/maps/corrode_overview.png',
  'assets/maps/fracture_overview.png',
  'assets/maps/haven_overview.png',
  'assets/maps/icebox_overview.png',
  'assets/maps/lotus_overview.png',
  'assets/maps/pearl_overview.png',
  'assets/maps/split_overview.png',
  'assets/maps/summit_overview.png',
  'assets/maps/sunset_overview.png',
  'assets/maps/abyss_overview.png'
];

mapImages.forEach(imgPath => {
  const fullPath = path.join(__dirname, '..', imgPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`${imgPath}: 文件不存在`);
    return;
  }
  
  fs.createReadStream(fullPath)
    .pipe(new PNG())
    .on('parsed', function() {
      const ratio = this.width / this.height;
      console.log(`${imgPath}: ${this.width}x${this.height}, 比例: ${ratio.toFixed(4)}`);
    })
    .on('error', err => {
      console.log(`${imgPath}: 读取失败 - ${err.message}`);
    });
});
