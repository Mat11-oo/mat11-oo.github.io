const entries = {
  website: {
    label: "WEB DESIGN / DEVELOPMENT",
    title: "我的线上自留地",
    paragraphs: [
      "一个从零搭建的个人网站，也是一块可以自由探索的线上空间。用 HTML、CSS 和 JavaScript 实现，适配电脑和手机。",
      "这次视觉探索围绕贴纸、超大字体与蓝色充气曲线展开：让页面像一本可以翻阅的灵感剪贴簿，也让每个作品和想法都拥有自己的位置。",
      "网站源码托管在 GitHub，推送更新后通过 GitHub Actions 自动发布到 GitHub Pages。",
    ],
    url: "https://github.com/Mat11-oo/mat11-oo.github.io",
  },
  garden: {
    label: "SELECTED WORK / 示例项目",
    title: "灵感花园",
    paragraphs: [
      "一个为想法留出空间的个人内容项目。灵感有时来自一本书、一段对话，或是在路上看见的一束光。把它们收集起来，让零散的念头慢慢长出联系。",
      "这是一张示例作品卡片。你可以将它替换为真实项目的介绍、过程、成果与链接，让来访者更好地了解你的创作。",
    ],
  },
  slow: {
    label: "SELECTED WORK / 示例项目",
    title: "日常观察计划",
    paragraphs: [
      "试着放慢脚步，观察生活里被忽略的细节：窗边变化的光线、走过许多次的小路、一杯热茶腾起的雾气。普通的一天，也有值得记录的瞬间。",
      "这是一张示例作品卡片。这里可以展示你的摄影、设计、开发作品，或一个正在进行中的个人探索。",
    ],
  },
  begin: {
    label: "NOTES & THOUGHTS / 示例随笔",
    title: "先开始，再慢慢变好",
    paragraphs: [
      "有些想法，停留在脑海里时总是很完美。可是一旦准备动手，就会发现还有许多没有想清楚的地方。",
      "也许不必等到所有条件都刚刚好。先写下第一句话，画出第一张草图，完成最小的一步。开始之后，问题会变得具体，下一步也会更清楚。",
      "把它当作一次尝试，允许自己边做边学。今天完成一点，就已经很好。",
    ],
  },
  daily: {
    label: "NOTES & THOUGHTS / 示例随笔",
    title: "在普通的一天，发现一点新鲜",
    paragraphs: [
      "同一条路，换一个时间走，可能就会看到不一样的风景。路口的树换了颜色，熟悉的店门口多了一盆植物，阳光落在墙面上画出新的形状。",
      "不一定要去很远的地方，才能遇见新鲜事。给自己一点时间，收起手机，看看眼前。也许值得记住的瞬间，就藏在普通的一天里。",
    ],
  },
  space: {
    label: "NOTES & THOUGHTS / 示例随笔",
    title: "给生活留一点空白",
    paragraphs: [
      "不是每一个空闲的时刻，都需要被安排。偶尔什么也不做，喝杯水，看一会儿窗外，让思绪自由地走一走。",
      "留白也是生活的一部分。那些没有被日程表填满的时间，可以用来消化经历、重新整理想法，或只是好好休息。",
    ],
  },
};
const dialog = document.querySelector("#detail-dialog");
function showDetail(key) {
  const entry = entries[key];
  if (!entry) return;
  document.querySelector("#dialog-label").textContent = entry.label;
  document.querySelector("#dialog-title").textContent = entry.title;
  const body = document.querySelector("#dialog-body");
  body.replaceChildren(
    ...entry.paragraphs.map((text) => {
      const p = document.createElement("p");
      p.textContent = text;
      return p;
    }),
  );
  const link = document.querySelector("#dialog-link");
  link.hidden = !entry.url;
  if (entry.url) link.href = entry.url;
  else link.removeAttribute("href");
  dialog.showModal();
}
document
  .querySelectorAll("[data-detail]")
  .forEach((button) =>
    button.addEventListener("click", () => showDetail(button.dataset.detail)),
  );
document
  .querySelectorAll(".close-dialog,.dialog-done")
  .forEach((button) => button.addEventListener("click", () => dialog.close()));
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      dialog.close();
  }
});

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
function closeMenu() {
  mobileNav.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "打开导航");
  menuToggle.firstElementChild.textContent = "＋";
}
menuToggle.addEventListener("click", () => {
  const opening = mobileNav.hidden;
  mobileNav.hidden = !opening;
  menuToggle.setAttribute("aria-expanded", String(opening));
  menuToggle.setAttribute("aria-label", opening ? "关闭导航" : "打开导航");
  menuToggle.firstElementChild.textContent = opening ? "−" : "＋";
});
mobileNav
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileNav.hidden) {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header") && !mobileNav.hidden) closeMenu();
});
window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});
document.querySelector("#copy-link").addEventListener("click", async () => {
  const status = document.querySelector(".copy-status");
  try {
    await navigator.clipboard.writeText("https://mat11-oo.github.io/");
    status.textContent = "已复制，分享给有意思的人吧。";
  } catch {
    status.textContent = "可以复制这个地址：https://mat11-oo.github.io/";
  }
});
document.querySelector("#year").textContent = new Date().getFullYear();
