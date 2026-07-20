# 无畏契约战术查询网站

一个简洁的无畏契约战术查询工具，支持地图烟位、穿墙点位、英雄技能释放点位查询。

## 功能

- 地图选择首页
- 每张地图查看：常规烟位（球烟/线烟）、穿墙点位
- 英雄技能点位查询（按职业筛选英雄）
- 球烟显示合理半径，线烟显示合理长度和角度
- 英雄点位包含站位标记和站位-落点连线

## 文件结构

```
├── index.html        # 主页面
├── css/
│   └── style.css     # 样式文件
├── js/
│   ├── data.js       # ★ 所有数据（修改这个文件即可更新内容）
│   └── app.js        # 交互逻辑（一般不需要改）
└── maps/             # 地图图片目录（可选，放真实地图截图用）
```

---

## 如何修改数据

**所有数据都在 `js/data.js` 文件中。** 用任何文本编辑器打开即可修改。

### 1. 修改地图基本信息

在 `MAPS` 数组中找到对应地图，修改 `name`（中文名）、`enName`（英文名）、`description`（描述）。

```javascript
const MAPS = [
  {
    id: "bind",              // 地图ID（不可重复，用于路由）
    name: "微风岛屿",         // 中文名
    enName: "Bind",          // 英文名
    sites: [                  // 据点位置（x, y 为百分比坐标 0-100）
      { id: "A", x: 25, y: 35, label: "A点" },
      { id: "B", x: 72, y: 65, label: "B点" }
    ],
    image: "",                // 地图图片路径，留空用SVG占位图。填写则如 "maps/bind.jpg"
    description: "地图描述文字",
    commonSmokes: [...],      // 常规烟位（见下方）
    wallbangs: [...]          // 穿墙点位（见下方）
  }
];
```

### 2. 添加/修改常规烟位

在对应地图的 `commonSmokes` 数组中添加：

#### 球烟（圆形烟雾，如炼狱/幽影/星礈的烟）

```javascript
{
  id: "bind_cs1",          // 唯一ID（不可重复）
  type: "ball",             // 类型：球烟
  name: "A主道烟雾",        // 名称
  site: "A",                // 所属据点
  x: 32,                    // X坐标（百分比 0-100，左到右）
  y: 28,                    // Y坐标（百分比 0-100，上到下）
  radius: 7,                // 半径（百分比，建议 5-8，越大烟雾越大）
  desc: "封住A主道视野"     // 说明
}
```

#### 线烟（线形烟雾，如蝰蛇的毒屏/海神的高潮）

```javascript
{
  id: "bind_cs5",          // 唯一ID
  type: "line",             // 类型：线烟
  name: "A点线烟",          // 名称
  site: "A",                // 所属据点
  x: 28,                    // 起点X坐标
  y: 32,                    // 起点Y坐标
  length: 25,               // 长度（百分比，建议 15-30）
  angle: 90,                // 角度（度，0=水平向右，90=垂直向下，180=水平向左）
  desc: "分割A点视野"       // 说明
}
```

### 3. 添加/修改穿墙点位

在对应地图的 `wallbangs` 数组中添加：

```javascript
{
  id: "bind_wb1",          // 唯一ID
  name: "A门穿点",          // 名称
  x: 30,                    // X坐标
  y: 22,                    // Y坐标
  desc: "A门外可穿透薄墙"  // 说明
}
```

### 4. 添加英雄技能点位

在 `LINEUPS` 对象中，按 `LINEUPS[地图ID][英雄ID]` 的结构添加：

```javascript
const LINEUPS = {
  "bind": {                          // 地图ID
    "brimstone": [                   // 英雄ID（与AGENTS中的id对应）
      {
        ability: "E",                // 技能按键：C/Q/E/X
        name: "A主道防守烟",         // 点位名称
        type: "ball",                // "ball"=球烟, "line"=线烟, "other"=其他技能
        x: 32,                       // 落点X坐标
        y: 28,                       // 落点Y坐标
        radius: 7,                   // 球烟半径（type为ball时使用）
        // length: 25,              // 线烟长度（type为line时使用）
        // angle: 90,               // 线烟角度（type为line时使用）
        standX: 15,                  // 站位X坐标（英雄点位特有）
        standY: 15,                  // 站位Y坐标
        desc: "站在A出生点左侧墙角", // 站位描述
        crosshair: "瞄准天空左上角", // 准星瞄准描述
        video: ""                    // 视频链接（可选，留空则不显示按钮）
      }
    ],
    "viper": [
      {
        ability: "E",
        name: "B点线烟分割",
        type: "line",
        x: 68, y: 60,
        length: 25, angle: 30,
        standX: 55, standY: 80,
        desc: "站在B通道入口",
        crosshair: "面向B点左上方",
        video: ""
      }
    ]
  }
};
```

### 5. 添加新地图

在 `MAPS` 数组末尾添加一个新对象：

```javascript
{
  id: "newmap",              // 唯一ID
  name: "新地图",
  enName: "NewMap",
  sites: [
    { id: "A", x: 30, y: 40, label: "A点" },
    { id: "B", x: 70, y: 60, label: "B点" }
  ],
  image: "",
  description: "新地图描述",
  commonSmokes: [],
  wallbangs: []
}
```

然后在 `LINEUPS` 中添加对应条目：

```javascript
const LINEUPS = {
  // ... 已有地图
  "newmap": {}  // 空对象即可，后续添加英雄点位
};
```

### 6. 添加/修改英雄

在 `AGENTS` 数组中添加：

```javascript
{
  id: "newagent",            // 唯一ID（英文小写）
  name: "新英雄",            // 中文名
  enName: "NewAgent",        // 英文名
  role: "controller",        // 职业：controller/sentinel/initiator/duelist
  smokeType: "ball",         // 烟雾类型：ball/line/both/none
  abilities: [
    { key: "C", name: "技能C", enName: "Ability C" },
    { key: "Q", name: "技能Q", enName: "Ability Q" },
    { key: "E", name: "技能E", enName: "Ability E", isSmoke: true },  // isSmoke标记为烟雾技能
    { key: "X", name: "终极技能", enName: "Ultimate", isUlt: true }   // isUlt标记为大招
  ]
}
```

### 7. 使用真实地图图片

1. 在项目根目录创建 `maps/` 文件夹
2. 将地图截图放入该文件夹（建议 16:10 比例，如 `bind.jpg`）
3. 在 `MAPS` 中将对应地图的 `image` 字段改为 `"maps/bind.jpg"`

```javascript
{
  id: "bind",
  name: "微风岛屿",
  image: "maps/bind.jpg",   // 填写图片路径
  // ...其他字段
}
```

### 8. 坐标说明

所有坐标使用百分比系统（0-100）：

- `x: 0` = 最左边，`x: 100` = 最右边
- `y: 0` = 最上面，`y: 100` = 最下面
- `x: 50, y: 50` = 地图正中心

可以在浏览器中用开发者工具（F12）调整坐标值，实时预览效果。

---

## 部署到 GitHub Pages

1. 在 GitHub 创建一个新仓库
2. 将所有文件上传到仓库（或用 `git push`）
3. 进入仓库的 **Settings** -> **Pages**
4. 在 **Source** 中选择 `main` 分支，文件夹选 `/ (root)`
5. 点击 **Save**
6. 等待 1-2 分钟，访问 `https://你的用户名.github.io/仓库名/` 即可

### 用 Git 上传

```bash
git init
git add .
git commit -m "无畏契约战术查询网站"
git branch -M main
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

---

## 本地预览

直接用浏览器打开 `index.html` 即可预览，无需服务器。

> 如果地图图片无法加载，可能是浏览器安全限制，用本地服务器预览更准确：
> ```bash
> # Python
> python -m http.server 8000
> # 然后访问 http://localhost:8000
> ```
