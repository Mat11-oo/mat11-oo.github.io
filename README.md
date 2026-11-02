# 我的个人空间

个人网站，使用 HTML、CSS 和 JavaScript 编写，无需安装依赖或构建。

网站地址：<https://mat11-oo.github.io/>

## 修改网站

- `dist/index.html`：个人介绍、作品卡片、页面结构。
- `dist/style.css`：配色、排版及手机布局。
- `dist/script.js`：作品与随笔弹窗内容、联系入口。

网站使用 GitHub 名称 Mat11-oo，联系入口指向真实 GitHub 主页。灵感花园和三篇随笔为示例内容，可根据实际情况替换。

## 视觉与素材

根据提供的 Slush 风格参考设计：浅蓝画布、超大标题、彩色贴纸、黑色细描边及胶囊按钮。字体 Anton 随站点加载，许可见 `dist/assets/OFL-Anton.txt`。

蓝色曲线由内置 ImageGen 生成，保存在 `dist/assets/blue-ribbon.png`。使用的生成提示词：

> Use case: stylized-concept. Asset type: transparent decorative 3D ribbon for a personal creative portfolio website. Create one large electric blue (#4da2ff) inflated tubular ribbon, a generous looping horizontal squiggle shaped like a loose cursive lowercase m / sideways double loop, sculptural playful soft inflatable tube with broad curved bends and tapered rounded ends. Landscape composition about 3:2, ribbon fills image edge-to-edge with sufficient clean margin, loop interiors fully transparent, no background, genuine alpha. Camera front 3/4, diffuse studio lighting; bright periwinkle sky-blue highlights, deeper saturated blue on shaded undersides; fine rough foam / softly grainy rubber texture, substantial rounded volume, sophisticated high-quality 3D product rendering, fun Y2K inflated-object aesthetic. This is a single cutout object to weave behind huge black editorial typography on pastel blue paper. No text, no letters, no logos, no additional objects, no floor plane, no drop shadow, no frame. Save the resulting image to disk and return its local path.

## 本地预览

在仓库目录执行：

```sh
python3 -m http.server 8000 --directory dist
```

然后访问 <http://localhost:8000>。

## 发布更新

修改 `dist/` 中的网站文件，提交并推送到 `main` 分支后，GitHub Actions 会自动部署到 GitHub Pages。可在仓库的 Actions 页面查看发布进度。

```sh
git add dist
git commit -m "Update website"
git push origin main
```

`.openai/hosting.json` 是原 Sites 托管配置。GitHub Pages 仅发布 `dist/` 目录。
