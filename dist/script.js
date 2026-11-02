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
window.matchMedia("(min-width: 651px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

const posts = [...document.querySelectorAll(".post")];
const filters = [...document.querySelectorAll("[data-filter]")];
const searchInput = document.querySelector("#article-search");
const clearSearch = document.querySelector(".clear-search");
const resultCount = document.querySelector("#article-count");
const emptyState = document.querySelector(".empty-state");
let selectedCategory = "all";

// Work from the readable HTML so the article list also works without JavaScript.
const searchablePosts = posts.map((post) => ({
  element: post,
  category: post.dataset.category,
  text: (
    post.querySelector(".post-title").textContent +
    " " +
    post.dataset.tags
  )
    .replace(/\s+/g, " ")
    .toLocaleLowerCase(),
}));

document.querySelectorAll("[data-count]").forEach((counter) => {
  const category = counter.dataset.count;
  counter.textContent =
    category === "all"
      ? posts.length
      : posts.filter((post) => post.dataset.category === category).length;
});

function updateArticles() {
  const terms = searchInput.value
    .trim()
    .toLocaleLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  let visibleCount = 0;
  searchablePosts.forEach((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = terms.every((term) => post.text.includes(term));
    const visible = matchesCategory && matchesSearch;
    post.element.hidden = !visible;
    if (visible) visibleCount++;
  });
  filters.forEach((button) =>
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.filter === selectedCategory),
    ),
  );
  resultCount.textContent =
    selectedCategory === "all" && terms.length === 0
      ? `共 ${posts.length} 篇文章`
      : `找到 ${visibleCount} 篇文章`;
  emptyState.hidden = visibleCount !== 0;
  clearSearch.hidden = searchInput.value.length === 0;
}

filters.forEach((button) =>
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.filter;
    updateArticles();
  }),
);
searchInput.addEventListener("input", updateArticles);
document
  .querySelector(".search-form")
  .addEventListener("submit", (event) => event.preventDefault());
clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  updateArticles();
  searchInput.focus();
});
document.querySelector("#reset-filters").addEventListener("click", () => {
  selectedCategory = "all";
  searchInput.value = "";
  updateArticles();
  filters[0].focus();
});
document.querySelectorAll("[data-topic]").forEach((link) =>
  link.addEventListener("click", () => {
    selectedCategory = link.dataset.topic;
    searchInput.value = "";
    updateArticles();
  }),
);
document.querySelector(".reading-controls").hidden = false;
updateArticles();
document.querySelector("#year").textContent = new Date().getFullYear();
