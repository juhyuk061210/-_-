const products = [
  ["Spin Sneaker", "Fashion", "Cushioned rotation sneaker concept with visual hook for comfort and daily-wear content.", "https://www.instagram.com/stridesoft_/reels/"],
  ["Handheld Massage Head Wrap", "Beauty", "Portable self-care massage product with easy demonstration and wellness angles.", ""],
  ["Satin Sockliner", "Fashion", "Comfort footwear insert positioned around softness, heel protection, and walking relief.", ""],
  ["CushionFlex Foot Cooling Tube", "Beauty", "Cooling foot-care product with clear relief story for summer and recovery content.", ""],
  ["Head Massage Therapy Device", "Beauty", "Relaxation device with strong visual transformation and pain-relief positioning.", ""],
  ["Smart Clay Cleaning Tool", "Home", "Reusable cleaning product for keyboards, vents, and small dust-prone spaces.", ""],
  ["Digital Sports Watch", "Tech", "Simple gadget product for fitness routines, steps, and daily performance content.", ""],
  ["Pet Easy Massage Brush", "Pet", "Pet grooming and massage item with warm owner-pet demo potential.", ""],
  ["Fan Cleaner", "Home", "Niche cleaning tool with satisfying before-after visuals for dusty home appliances.", ""],
  ["Soft Comfort Insoles", "Fashion", "Minimal footwear support item for long standing, commuting, and shoe-fit improvement.", ""],
  ["Cooling Gel Eye Pads", "Beauty", "Reusable gel pads for puffiness and relaxation with strong morning routine angles.", ""],
  ["Padded Socks", "Fashion", "Comfort sock product with visible cushioning story and everyday wear positioning.", "https://www.instagram.com/shezzasocks/reels/"],
  ["Magnetic Grip Holder", "Tech", "Compact phone accessory for hands-free viewing, grip, and quick mounting demos.", ""],
  ["2-in-1 Dog Water Bottle", "Pet", "Outdoor pet hydration item with travel-friendly benefit and easy demonstration.", "https://www.instagram.com/pawsipus/reels/"],
  ["Heat Relief Wrap", "Beauty", "Body-care wrap for warmth and relief with pain-point driven short-form content.", ""],
  ["Minimal Fold Panel", "Home", "Simple home utility item suitable for desk, kitchen, and storage problem angles.", ""],
  ["Retractable Pet Leash", "Pet", "Pet walking accessory with safety, control, and convenience storylines.", ""],
  ["Smart Mini Projector", "Tech", "Entertainment gadget with strong room setup visuals and giftable positioning.", ""],
  ["Hanging Plant Pot", "Home", "Home decor product with personalization, indoor plant, and small-space angles.", ""],
  ["Wireless Smart Switch Set", "Tech", "Home automation accessory for renter-friendly smart room upgrades.", ""],
].map((item, index) => {
  const score = 94 - Math.floor(index * 1.7);
  const trend = 96 - ((index * 7) % 31);
  const profit = 88 - ((index * 5) % 34);
  const competition = 28 + ((index * 6) % 46);
  return {
    name: item[0],
    category: item[1],
    description: item[2],
    source: item[3],
    image: `https://picsum.photos/seed/trendscope-${String(index + 1).padStart(2, "0")}/360/360`,
    score,
    trend,
    profit,
    competition,
    tags: [item[1], trend > 82 ? "High Demand" : "Steady Demand", profit > 72 ? "Good Margin" : "Test First"],
  };
});

let activeCategory = "all";

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return [...document.querySelectorAll(selector)];
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function metricRow(label, value, color = "") {
  return `<div class="metric"><span>${label}</span><span class="bar ${color}"><span style="width:${value}%"></span></span><strong>${value}</strong></div>`;
}

function renderProducts() {
  const query = ($("#searchInput")?.value || "").trim().toLowerCase();
  const sort = $("#sortSelect")?.value || "score";
  const items = products
    .filter((product) => activeCategory === "all" || product.category === activeCategory)
    .filter((product) => !query || [product.name, product.category, product.description, ...product.tags].join(" ").toLowerCase().includes(query))
    .sort((a, b) => b[sort] - a[sort]);

  $("#visibleCount").textContent = `${items.length} products`;
  $("#totalCount").textContent = products.length;
  $("#productList").innerHTML = items.map((product, index) => `
    <article class="product-card">
      <div class="thumb">
        <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" />
        <span class="rank">#${String(index + 1).padStart(2, "0")}</span>
      </div>
      <div class="card-body">
        <div class="card-top"><h3 class="card-title">${escapeHtml(product.name)}</h3><span class="score">${product.score}</span></div>
        <p class="desc">${escapeHtml(product.description)}</p>
        <div class="pill-row">${product.tags.map((tag) => `<span class="pill">${escapeHtml(tag)}</span>`).join("")}</div>
        <div class="metrics">${metricRow("Trend", product.trend)}${metricRow("Profit", product.profit, "yellow")}${metricRow("Comp.", product.competition, "orange")}</div>
        <div class="actions">
          ${product.source ? `<a class="primary" href="${product.source}" target="_blank" rel="noreferrer">Source</a>` : `<button class="disabled" type="button" disabled>확인 필요</button>`}
          <button type="button">Details</button>
        </div>
      </div>
    </article>
  `).join("");
}

function setView(view) {
  const selected = ["products", "community", "subscribe"].includes(view) ? view : "products";
  $(".page")?.classList.toggle("wide-view", selected !== "products");
  $$("[data-view]").forEach((section) => section.classList.toggle("is-hidden", section.dataset.view !== selected));
  $$("[data-view-link]").forEach((link) => link.classList.toggle("active", link.dataset.viewLink === selected));
}

function openLogin() {
  $("#loginModal")?.classList.remove("is-hidden");
}

function closeLogin() {
  $("#loginModal")?.classList.add("is-hidden");
}

$$("[data-category]").forEach((button) => {
  button.addEventListener("click", () => {
    $$("[data-category]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeCategory = button.dataset.category;
    renderProducts();
  });
});

$("#searchInput")?.addEventListener("input", renderProducts);
$("#sortSelect")?.addEventListener("change", renderProducts);
$("#openLoginModal")?.addEventListener("click", openLogin);
$("#demoAdminButton")?.addEventListener("click", () => {
  closeLogin();
  location.hash = "#community";
});
$$("[data-close-modal]").forEach((button) => button.addEventListener("click", closeLogin));
window.addEventListener("hashchange", () => setView(location.hash.replace("#", "")));

renderProducts();
setView(location.hash.replace("#", ""));
