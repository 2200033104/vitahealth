function applyShopFilters() {
  const grid = document.getElementById("shop-grid");
  if (!grid) return;

  const activeTab = document.querySelector(".tab.active")?.dataset.tab || "all";
  const category = document.querySelector(".cat.active")?.dataset.cat || "all";
  const brands = [...document.querySelectorAll("[name=brand]:checked")].map((el) => el.value);
  const minRating = Number(document.querySelector("[name=rating]:checked")?.value || 0);
  const maxPrice = Number(document.getElementById("price-range")?.value || 5000);
  const query = (document.getElementById("shop-search")?.value || "").toLowerCase();

  const items = PRODUCTS.filter((p) => {
    const tabOk = activeTab === "all" || p.tabs.includes(activeTab);
    const catOk = category === "all" || p.category === category;
    const brandOk = !brands.length || brands.includes(p.brand);
    const ratingOk = p.rating >= minRating;
    const priceOk = p.price <= maxPrice;
    const searchOk = !query || p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query);
    return tabOk && catOk && brandOk && ratingOk && priceOk && searchOk;
  });

  grid.innerHTML = items.length
    ? items.map(productCard).join("")
    : "<p>No products match these filters.</p>";
}

document.addEventListener("DOMContentLoaded", () => {
  const featured = document.getElementById("featured-grid");
  if (featured) {
    featured.innerHTML = PRODUCTS.slice(0, 5).map(productCard).join("");
  }

  if (document.getElementById("shop-grid")) {
    applyShopFilters();
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        applyShopFilters();
      });
    });
    document.querySelectorAll(".cat").forEach((cat) => {
      cat.addEventListener("click", () => {
        document.querySelectorAll(".cat").forEach((c) => c.classList.remove("active"));
        cat.classList.add("active");
        applyShopFilters();
      });
    });
    document.querySelectorAll("[name=brand], [name=rating], #price-range, #shop-search").forEach((el) => {
      el.addEventListener("input", applyShopFilters);
      el.addEventListener("change", applyShopFilters);
    });
    const priceLabel = document.getElementById("price-label");
    const range = document.getElementById("price-range");
    if (range && priceLabel) {
      range.addEventListener("input", () => {
        priceLabel.textContent = "₹0 – ₹" + Number(range.value).toLocaleString("en-IN");
      });
    }
  }
});
