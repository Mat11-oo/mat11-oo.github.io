const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
function closeMenu() {
  showHeader();
  mobileNav.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "打开导航");
  menuToggle.firstElementChild.textContent = "＋";
}
menuToggle.addEventListener("click", () => {
  showHeader();
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

// Make room for reading; small scroll reversals should not flash the header.
let previousScrollY = Math.max(0, window.scrollY);
let directionStartY = previousScrollY;
let scrollDirection = 0;
let scrollFramePending = false;

function showHeader() {
  siteHeader.classList.remove("is-hidden");
}

function resetHeaderScroll() {
  showHeader();
  previousScrollY = Math.max(0, window.scrollY);
  directionStartY = previousScrollY;
  scrollDirection = 0;
}

function updateHeaderOnScroll() {
  const currentY = Math.max(0, window.scrollY);
  const direction = Math.sign(currentY - previousScrollY);
  const nearTop = currentY <= Math.max(100, siteHeader.offsetHeight + 24);
  const keyboardFocus = siteHeader.querySelector(":focus-visible");

  if (nearTop || !mobileNav.hidden || keyboardFocus) {
    showHeader();
    directionStartY = currentY;
    scrollDirection = 0;
  } else if (direction !== 0) {
    if (direction !== scrollDirection) {
      directionStartY = previousScrollY;
      scrollDirection = direction;
    }
    const distance = Math.abs(currentY - directionStartY);
    if (direction > 0 && distance >= 24) {
      siteHeader.classList.add("is-hidden");
    } else if (direction < 0 && distance >= 12) {
      showHeader();
    }
  }

  previousScrollY = currentY;
  scrollFramePending = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (scrollFramePending) return;
    scrollFramePending = true;
    window.requestAnimationFrame(updateHeaderOnScroll);
  },
  { passive: true },
);
siteHeader.addEventListener("focusin", resetHeaderScroll);
window.addEventListener("resize", resetHeaderScroll, { passive: true });
window.addEventListener("hashchange", resetHeaderScroll);

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
