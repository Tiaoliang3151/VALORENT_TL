// 批量精简 agent lineup 数据：每个地图/英雄/技能只保留第一条作为占位
const fs = require('fs');
const path = require('path');

const mapsDir = path.join(__dirname, '..', 'js', 'data', 'maps');
const mapDirs = fs.readdirSync(mapsDir).filter(d => {
  return fs.statSync(path.join(mapsDir, d)).isDirectory();
});

let totalFiles = 0;
let totalTrimmed = 0;
let totalRemoved = 0;

mapDirs.forEach(mapId => {
  const agentsDir = path.join(mapsDir, mapId, 'agents');
  if (!fs.existsSync(agentsDir)) return;

  const agentFiles = fs.readdirSync(agentsDir).filter(f => f.endsWith('.js'));

  agentFiles.forEach(fileName => {
    const filePath = path.join(agentsDir, fileName);
    const content = fs.readFileSync(filePath, 'utf8');

    // 提取数组部分: '= [...];'
    const match = content.match(/=\s*\[([\s\S]*)\]\s*;?\s*$/);
    if (!match) return;

    const arrayStr = '[' + match[1] + ']';
    let arr;
    try {
      arr = JSON.parse(arrayStr);
    } catch (e) {
      // 可能是空数组
      if (arrayStr.trim() === '[]' || arrayStr.trim() === '[\n]') {
        return; // 空数组，跳过
      }
      console.error(`Parse error in ${filePath}: ${e.message}`);
      return;
    }

    if (arr.length === 0) return;

    // 按 ability 分组，每组只保留第一条
    const seen = new Set();
    const kept = [];
    const removed = [];

    arr.forEach(item => {
      const key = item.ability || 'unknown';
      if (!seen.has(key)) {
        seen.add(key);
        kept.push(item);
      } else {
        removed.push(item);
      }
    });

    if (kept.length === arr.length) return; // 无需修改

    totalFiles++;
    totalTrimmed += kept.length;
    totalRemoved += removed.length;

    // 重建文件内容
    const headerMatch = content.match(/^([\s\S]*?=\s*)\[/);
    const header = headerMatch ? headerMatch[1] : '';
    const footer = '\n];\n';

    const jsonStr = JSON.stringify(kept, null, 2);
    const newContent = header + jsonStr + footer;

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`${mapId}/${fileName}: ${arr.length} -> ${kept.length} (removed ${removed.length})`);
  });
});

console.log(`\nDone! ${totalFiles} files modified, ${totalTrimmed} entries kept, ${totalRemoved} entries removed.`);
