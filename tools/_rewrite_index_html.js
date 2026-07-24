// 一次性：重写 index.html 末尾 <script> 段（之前手滑写进了思考过程文字，污染了文件）
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const INDEX_HTML = path.join(ROOT, 'index.html');
const SNIPPET_TXT = path.join(__dirname, '_index_html_data_scripts.txt');

const snippet = fs.readFileSync(SNIPPET_TXT, 'utf8');

// index.html 期望的完整末尾 script 段
const block =
`  <script src="js/data/_base.js?v=20260724c"></script>
  <script src="js/data/_maps_meta.js?v=20260724c"></script>
  <!-- ============================================================
       下面 338 个脚本由 tools/restructure_to_per_map_agents.js 生成
       每张地图：1 个 base.js + 25 个英雄文件 = 26 个脚本 × 13 图
       ============================================================ -->
${snippet}
  <script src="js/data/_index.js?v=20260724c"></script>
  <script src="js/app.js?v=20260724c"></script>
  <script src="js/editor.js?v=20260724c"></script>
</body>
</html>
`;

const html = fs.readFileSync(INDEX_HTML, 'utf8');
// 定位到第一个 <script 行之前的内容（即从行首开始，"<script src=\"js/data/_base.js" 作为分割点）
const marker = '<script src="js/data/_base.js';
const idx = html.indexOf(marker);
if (idx === -1) throw new Error('没找到 _base.js script 行，index.html 结构变了？');

const head = html.substring(0, idx);
const finalHtml = head + block;
fs.writeFileSync(INDEX_HTML, finalHtml, 'utf8');
console.log('✅ index.html 末尾 script 段已重写。共 ' + finalHtml.split('\n').length + ' 行');
