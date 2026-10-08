# 项目进度说明文档

> **⚠️ 推送仓库前必读：每次更新推送前，请检查并更新版本号（见下方「版本号管理」章节）**

---

## 项目基本信息

| 项目 | 内容 |
|---|---|
| 项目名称 | AI提示词生成器（prompt.westiger.com） |
| 在线地址 | https://prompt.westiger.com |
| 项目类型 | 纯前端静态网站（HTML + CSS + JS，无后端） |
| 主要功能 | 为豆包等 AI 图像生成工具生成结构完整的中文提示词；附带投稿文案生成器 |
| 技术栈 | 原生 HTML / CSS / JavaScript，无框架依赖 |
| 浏览器兼容 | Chrome / Edge / Safari / Firefox（现代浏览器） |

## 仓库信息

| 项目 | 内容 |
|---|---|
| Git 仓库地址 | https://github.com/downc301-hue/prompt.westiger.com |
| 默认分支 | `main` |
| 本地仓库路径 | `d:\wwwroot\chatgpt.westiger.com` |
| `.gitignore` | `.omc/`、`ai-bijo-prompt-maker/`（备份目录，不推送） |

## 当前版本

**v1.0.0** — 首版正式版，已完成本地化和数据拆分架构

版本号位置：
- `index.html` 第 7 行：`<meta name="app-version" content="1.0.0">`
- `index.html` 第 61 行：标题右侧版本号徽章 `<span id="version-badge">v1.0.0</span>`

---

## 版本号管理（重要）

每次推送仓库 **之前** 必须执行：

1. **检查当前版本号** — 在 `index.html` 中搜索 `app-version` 和 `version-badge`
2. **判断版本号升级类型**：
   - **PATCH（x.x.+1）**：bug 修复、文案微调、小细节改动 → `1.0.0` → `1.0.1`
   - **MINOR（x.+1.x）**：新增功能、数据文件、新选项 → `1.0.0` → `1.1.0`
   - **MAJOR（+1.x.x）**：大改版、架构重构、不兼容变更 → `1.0.0` → `2.0.0`
3. **同步更新两处版本号**：
   ```
   <meta name="app-version" content="新版本号">
   <span id="version-badge">v新版本号</span>
   ```
4. **更新本文档「更新内容」章节**，记录本次变更
5. **提交推送**，commit message 建议带版本号，如：`feat: v1.1.0 新增男性数据`

---

## 文件结构

```
chatgpt.westiger.com/
├── index.html              # 主页面：提示词生成器（含完整 UI + 逻辑）
├── post.html               # 投稿文案生成器
├── 404.html                # 404 页面
├── favicon.ico             # 网站图标
├── README.md               # 项目说明文档（给访客看的）
├── PROGRESS.md             # 本文档（交接 / 进度记录）
├── data/                   # 人物类型数据目录
│   ├── female-young.js     # ✅ 青年女性（完整可用）
│   ├── female-middle.js    # ⏳ 中年女性（待完善，当前为模板副本）
│   ├── female-old.js       # ⏳ 老年女性（待完善，当前为模板副本）
│   ├── male-young.js       # ⏳ 青年男性（待完善，当前为模板副本）
│   ├── male-middle.js      # ⏳ 中年男性（待完善，当前为模板副本）
│   ├── male-old.js         # ⏳ 老年男性（待完善，当前为模板副本）
│   └── _raw.txt            # 原始数据备份（参考用）
├── example/                # 案例图片（在备份目录 ai-bijo-prompt-maker/example/ 中）
│   ├── case1.jpg           # 文生图案例 1
│   ├── case1-prompt.txt    # 案例 1 的完整提示词
│   ├── ...
│   ├── case4-1.jpg         # 图生图案例 4 参考图
│   ├── case4-result.jpg    # 图生图案例 4 生成结果
│   └── ...
└── ai-bijo-prompt-maker/   # 备份目录（.gitignore 已忽略）
```

## 数据架构说明

### 数据与逻辑分离

原本所有数据（场景、体型、服装、姿势等）都内联在 `index.html` 的 `<script>` 标签中。现在已经拆分为外部 `.js` 文件，按「性别 × 年龄段」分文件存放。

### 数据文件结构

每个数据文件（如 `data/female-young.js`）需要定义以下全局变量：

```js
const BODY     = [{ l: "下拉显示", t: "提示词中使用的完整描述" }, ...];
const SCENES   = { "场景名": { outfits: [...], poses: [...], bg: "背景描述", style: "风格描述" } };
const TASTE    = [{ l: "", t: "" }];        // 风格调性
const REASON   = [{ l: "", t: "" }];        // 拍摄动机
const MAKEUP   = [{ l: "", t: "" }];        // 妆容
const HAIRSTYLE= [{ l: "", t: "" }];        // 发型
const EXPRESSION= [{ l: "", t: "" }];       // 表情
const FRAMING  = [{ l: "", t: "" }];        // 取景范围
const CAMERA   = [{ l: "", t: "" }];        // 镜头视角
const ACCESSORY= [{ l: "", t: "" }];        // 小饰品
const NEGATIVE = "排除词的长文本";           // 负面提示词
```

### 动态加载机制

`index.html` 中的核心逻辑：

```js
// 配置表：key → 数据文件路径
var GENDER_CONFIGS = {
  'female-young': { file: 'data/female-young.js', label: '青年女性' },
  ...
};

// 动态切换人物类型
function loadGender(key) {
  // 移除旧 script 标签 → 创建新 script 加载新数据 → onload 后重新填充所有下拉框
}
```

**关键注意点**：
- 因为 `<script>` 一旦加载就不能"卸载"，所以切换人物类型时需要通过 **移除旧标签 + 新增新标签** 的方式触发重新加载
- 如果后续数据文件之间有变量冲突，可以考虑用 IIFE + `window.DATA = {...}` 的方式封装

### 新增人物类型的数据文件开发步骤

1. 复制 `data/female-young.js` 为新文件（如 `data/male-young.js`）
2. 修改文件头部注释，标明类型
3. **逐个变量修改内容**，特别是：
   - `BODY`（体型描述）— 男女差异大，需重写
   - `SCENES`（场景）— 部分场景通用，部分需改写
   - `MAKEUP`（妆容）— 男性可能不需要或改为"护肤"
   - `HAIRSTYLE`（发型）— 男女发型差异大
   - `ethnicity()` 函数中的地区描述（如 `"东亚女性"` → `"东亚男性"`），这个在 `index.html` 的 JS 里硬编码了，如果做男性版本需要同步修改该函数，或者把地区描述也移到数据文件里
4. 在 `GENDER_CONFIGS` 配置表中注册（已预注册 6 个类型）
5. 在下拉框 `<select id="gender-type">` 中启用选项（去掉「待完善」标记）

---

## 更新内容

### v1.0.0（当前版本）— 首版正式版

**发布日期**：2025-10-XX

**主要变更**：

1. ✅ **本地化改造**
   - 场景描述中的日本地名替换为国内地名（如"东京"→"一线城市"，"涩谷"→"星巴克"）
   - 新增本地化场景关键词（如"星巴克"、"厦门/青岛风"、"全家/便利蜂"）
   - 优化场景描述，更贴近国内生活实际

2. ✅ **数据架构升级**
   - 将内联在 `index.html` 中的 3000+ 行数据拆分为独立的 `data/female-young.js`
   - 搭建「性别 × 年龄段」6 类数据框架（青年/中年/老年 × 男/女）
   - 实现人物类型下拉框动态切换数据加载

3. ✅ **版本号体系建立**
   - `index.html` 添加 `<meta name="app-version" content="1.0.0">`
   - 页面标题右侧显示版本号徽章
   - 创建本交接文档 `PROGRESS.md`

4. ✅ **图标集成**
   - 项目根目录放置 `favicon.ico`

5. ✅ **项目整理**
   - `.gitignore` 排除备份目录 `ai-bijo-prompt-maker/`
   - 重写 `README.md` 为中文说明文档
   - `post.html` 本地化同步

---

## 待办 / 后续计划

### 高优先级

- [ ] 完善 5 个人物类型的数据文件（`female-middle.js`、`female-old.js`、`male-young.js`、`male-middle.js`、`male-old.js`）
  - 特别是男性数据，体型、发型、妆容、服装、场景描述都需要大幅重写
- [ ] `ethnicity()` 函数中的性别硬编码问题 — 当前写死了"东亚女性"，做男性版本需要改为动态
- [ ] 下拉框选项启用：完善数据后去掉选项中的「（待完善）」标记

### 中优先级

- [ ] 数据文件中的场景去重 — 男女通用场景可以考虑抽为共用模块
- [ ] 增加更多场景（职场、校园、旅行、运动等）
- [ ] 考虑将 `TASTE`、`FRAMING`、`CAMERA` 这些男女通用的数据从各数据文件中抽离为 `data/common.js`

### 低优先级

- [ ] 考虑支持更多 AI 模型的参数格式（如 Midjourney 的 `--ar` 参数）
- [ ] 提示词历史记录功能（localStorage）
- [ ] 导入/导出自定义数据文件

---

## 推送仓库 Checklist

每次推送前，按此清单检查：

- [ ] 代码修改已本地测试（浏览器打开 index.html 无报错）
- [ ] 版本号已更新（`index.html` 中两处同步修改）
- [ ] 本文档（`PROGRESS.md`）的「更新内容」已追加新条目
- [ ] `README.md` 如有变更已同步
- [ ] 备份目录 `ai-bijo-prompt-maker/` 不会被误推送（`.gitignore` 已包含）
- [ ] 案例图片（`example/` 目录）需要推送时确认路径正确
- [ ] Git 提交信息清晰，建议格式：`type(scope): v版本号 简短描述`
  - type: `feat`（新功能）/ `fix`（修复）/ `refactor`（重构）/ `docs`（文档）/ `chore`（杂项）
- [ ] 执行推送：`git add .` → `git commit -m "..."` → `git push origin main`

---

## 已知问题

1. **`ethnicity()` 函数硬编码性别** — 在 `index.html` 的 JS 中，该函数返回 `"东亚女性"` 等字符串，切换到男性数据时需要同步修改此函数。建议后续改为由数据文件提供地区描述模板。
2. **动态加载的 script 标签不会真正卸载变量** — 切换人物类型时，旧数据文件定义的全局变量（如 `BODY`、`SCENES`）仍存在于内存中，只是被新文件重新赋值覆盖。当前不会造成问题，但如果后续数据文件结构差异很大可能需要注意。
3. **`favicon.ico` 未在 HTML 中显式引用** — 浏览器会自动请求根目录的 favicon.ico，如果部署到非根路径可能需要手动添加 `<link rel="icon" href="favicon.ico">`。

---

## 联系方式 / 维护者

- 项目托管：https://github.com/downc301-hue/prompt.westiger.com
- 在线访问：https://prompt.westiger.com