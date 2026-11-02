# 我的个人空间

个人网站，使用 HTML、CSS 和 JavaScript 编写，无需安装依赖或构建。

网站地址：<https://mat11-oo.github.io/>

## 修改网站

- `dist/index.html`：个人介绍、作品卡片、页面结构。
- `dist/style.css`：配色、排版及手机布局。
- `dist/script.js`：作品与随笔弹窗内容、联系入口。

目前姓名、作品、随笔与联系方式为占位或示例内容，请根据实际情况替换。

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
