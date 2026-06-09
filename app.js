const products = [
  ["반려동물 발 세척 컵", "Pet", "산책 후 강아지 발을 컵 안에서 바로 세척하는 제품. 오염 전후 비교 영상으로 보여주기 좋습니다.", "https://www.instagram.com/stridesoft_/reels/"],
  ["휴대용 손잡이 마사지기", "Beauty", "손잡이를 잡고 목, 어깨, 허리 부위에 직접 사용하는 셀프 마사지 제품입니다.", "https://www.instagram.com/erika.ronning/reels/"],
  ["슬림 청소 브러시", "Home", "창틀, 틈새, 배수구처럼 좁은 공간을 청소하는 긴 막대형 브러시 제품입니다.", "https://www.instagram.com/shezzasocks/reels/"],
  ["쿨링 페이스 마사지기", "Beauty", "차가운 금속 헤드로 얼굴 붓기와 피부 진정 콘텐츠를 만들기 쉬운 뷰티 제품입니다.", "https://www.instagram.com/reels/DY2-0IKxAWp/"],
  ["벽걸이 전동 스크러버", "Home", "욕실과 주방에 붙여두고 사용하는 전동 세척기. 보관 장면까지 영상화하기 좋습니다.", "https://www.instagram.com/pawsipus/reels/"],
  ["싱크대 필터 수납 홀더", "Home", "수전 주변 필터나 청소 도구를 세워두는 주방 정리형 제품입니다.", "https://www.instagram.com/reels/DY54Vr-Tq5Z/"],
  ["더블 헤드 페이스 롤러", "Beauty", "두 개의 마사지 헤드로 얼굴 라인을 문지르는 뷰티 디바이스입니다.", "https://www.instagram.com/reels/DYYCEyIRvWV/"],
  ["욕실 틈새 전동 브러시", "Home", "타일 줄눈과 좁은 홈을 청소하는 전동 브러시. 전후 비교 콘텐츠에 적합합니다.", "https://www.instagram.com/reels/DVeZls5jxAe/"],
  ["미니 테이블 청소기", "Home", "책상 위 먼지, 머리카락, 부스러기를 빨아들이는 소형 청소 제품입니다.", "https://www.instagram.com/reels/DYJ-qa2K7e_/"],
  ["실리콘 풋패드 깔창", "Fashion", "구두나 운동화 안에 넣는 발바닥 보호 패드. 통증 완화 후킹이 가능합니다.", "https://www.instagram.com/reels/DYu_-9qufAp/"],
  ["젤 아이 마스크", "Beauty", "눈가 붓기와 피로감을 시각적으로 보여주기 쉬운 쿨링 젤 마스크입니다.", "https://www.instagram.com/reels/DWW5bU8xGcQ/"],
  ["발목 압박 양말", "Fashion", "발목과 뒤꿈치 부분을 잡아주는 기능성 양말. 착용 전후 설명이 쉬운 제품입니다.", "https://www.instagram.com/shezzasocks/reels/"],
  ["휴대용 디지털 카운터", "Tech", "손에 쥐고 숫자를 기록하는 작은 전자 카운터. 습관, 운동, 재고 관리 소재로 활용됩니다.", ""],
  ["2-in-1 강아지 물병", "Pet", "산책 중 물그릇처럼 바로 펼쳐 쓰는 반려동물 휴대용 급수 제품입니다.", "https://www.instagram.com/pawsipus/reels/"],
  ["레드라이트 바디 벨트", "Beauty", "허리와 복부에 감아 쓰는 레드라이트 케어 제품. 통증 관리 니즈를 건드릴 수 있습니다.", "https://www.instagram.com/reels/DYJ-qa2K7e_/"],
  ["블랙 메모 보드", "Home", "책상이나 벽에 두는 미니 보드형 제품. 정리, 메모, 인테리어 콘텐츠로 풀기 좋습니다.", ""],
  ["자동 리드줄", "Pet", "강아지 산책 시 줄 길이를 조절하는 자동 리드줄. 안전성과 편의성을 강조할 수 있습니다.", ""],
  ["미니 빔프로젝터", "Tech", "방 안에서 큰 화면을 만드는 소형 프로젝터. 전후 분위기 변화가 강한 제품입니다.", ""],
  ["얼굴 화분 인테리어 소품", "Home", "식물을 머리카락처럼 연출하는 화분. 선물용과 인테리어 소재로 좋습니다.", ""],
  ["무선 스마트 스위치 세트", "Tech", "기존 조명 스위치를 스마트하게 제어하는 무선 스위치 세트입니다.", ""],
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
    image: `assets/products-square/product-${String(index + 1).padStart(2, "0")}.jpg`,
    score,
    trend,
    profit,
    competition,
    tags: [item[1], trend > 82 ? "High Demand" : "Steady Demand", profit > 72 ? "Good Margin" : "Test First"],
  };
});

const communityAppUrl = "https://trendscope-community.onrender.com/#community";
let activeCategory = "all";
let currentUser = null;
let billingConfig = null;
let paymentWidgets = null;
let paymentWidgetRendered = false;
let activeFeedSort = "hot";
let communityPosts = [];
let pendingPostImage = "";

function redirectGitHubCommunityToApp() {
  if (location.hostname.endsWith("github.io") && location.hash === "#community") {
    location.replace(communityAppUrl);
  }
}

function apiBaseUrl() {
  const configured =
    window.TRENDSCOPE_API_BASE ||
    document.querySelector('meta[name="trendscope-api-base"]')?.content ||
    localStorage.getItem("trendscopeApiBase") ||
    "";
  return configured.replace(/\/+$/, "");
}

function apiUrl(path) {
  const base = apiBaseUrl();
  return `${base}${path}`;
}

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return [...document.querySelectorAll(selector)];
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function timeAgo(value) {
  const timestamp = new Date(value).getTime();
  if (!timestamp) return "";
  const seconds = Math.max(1, Math.floor((Date.now() - timestamp) / 1000));
  if (seconds < 60) return "방금 전";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  return `${days}일 전`;
}

function readImageFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }
    if (!file.type.startsWith("image/")) {
      reject(new Error("이미지 파일만 올릴 수 있습니다."));
      return;
    }
    if (file.size > 2_000_000) {
      reject(new Error("이미지는 2MB 이하만 올릴 수 있습니다."));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("이미지를 읽지 못했습니다."));
    reader.readAsDataURL(file);
  });
}

function renderImagePreview(target, image, onClear) {
  if (!target) return;
  target.classList.toggle("is-hidden", !image);
  target.innerHTML = image
    ? `<img src="${escapeHtml(image)}" alt="" /><button type="button" aria-label="이미지 삭제">×</button>`
    : "";
  target.querySelector("button")?.addEventListener("click", onClear);
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

function renderLevel(level) {
  if (!level) return;
  const tierBadge = $("#tierBadge");
  const tierScore = $("#tierScore");
  const progressBar = $("#tierProgressBar");
  if (tierBadge) tierBadge.textContent = level.tier || "Starter";
  if (tierScore) {
    const next = level.nextTier ? ` · 다음 ${level.nextTier} ${level.nextXp} XP` : "";
    tierScore.textContent = `${level.xp || 0} XP${next}`;
  }
  if (progressBar) progressBar.style.width = `${Math.max(0, Math.min(100, Number(level.progress || 0)))}%`;
  $$("[data-tier]").forEach((item) => item.classList.toggle("active", item.dataset.tier === level.tier));
}

async function loadCommunityLevel() {
  if (!apiBaseUrl()) return;
  try {
    const response = await fetch(apiUrl("/api/community/level"), { credentials: "include" });
    if (!response.ok) throw new Error("level failed");
    renderLevel(await response.json());
  } catch {
    // Keep the static level UI if the server is temporarily unavailable.
  }
}

function renderAvatar(name, image, size = "") {
  const label = escapeHtml((name || "M").slice(0, 1).toUpperCase());
  return `<span class="avatar ${size}">${image ? `<img src="${escapeHtml(image)}" alt="" />` : label}</span>`;
}

function renderComment(comment, postId) {
  const isReply = Boolean(comment.parentId);
  return `
    <div class="comment ${isReply ? "reply" : ""}">
      ${renderAvatar(comment.name, comment.profileImage, "small")}
      <div>
        <strong>${escapeHtml(comment.name || "Member")}</strong>
        <span>${timeAgo(comment.createdAt)}</span>
        <p>${escapeHtml(comment.message)}</p>
        ${comment.image ? `<img class="attached-image" src="${escapeHtml(comment.image)}" alt="" />` : ""}
        ${!isReply ? `<button class="reply-link" type="button" data-reply-to="${escapeHtml(comment.id)}" data-post-id="${escapeHtml(postId)}">답글</button>` : ""}
      </div>
    </div>
  `;
}

function renderPost(post) {
  const liked = currentUser && post.likedBy?.includes(currentUser.id);
  const visibleComments = (post.comments || []).filter((comment) => comment.status !== "hidden" && comment.status !== "deleted");
  return `
    <article class="community-post" data-post-id="${escapeHtml(post.id)}">
      <div class="post">
        ${renderAvatar(post.name, post.profileImage)}
        <div class="post-main">
          <div class="post-meta">
            <strong>${escapeHtml(post.name || "Member")}</strong>
            <span>${timeAgo(post.createdAt)}</span>
          </div>
          <h4>${escapeHtml(post.title)}</h4>
          <p>${escapeHtml(post.message)}</p>
          ${post.image ? `<img class="attached-image" src="${escapeHtml(post.image)}" alt="" />` : ""}
          <div class="post-actions">
            <button class="${liked ? "liked" : ""}" type="button" data-like-post="${escapeHtml(post.id)}">좋아요 ${post.likes || 0}</button>
            <button type="button" data-toggle-comments="${escapeHtml(post.id)}">댓글 ${visibleComments.length}</button>
          </div>
          <div class="comment-drawer" data-comments-for="${escapeHtml(post.id)}">
            ${visibleComments.map((comment) => renderComment(comment, post.id)).join("") || `<p class="profile-empty">첫 댓글을 남겨보세요.</p>`}
            <form class="comment-form" data-comment-form="${escapeHtml(post.id)}">
              <input name="message" maxlength="260" placeholder="댓글을 입력하세요" required />
              <button type="submit">댓글</button>
            </form>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderCommunityFeed() {
  const feed = $("#communityFeed");
  if (!feed) return;
  if (!communityPosts.length) {
    feed.innerHTML = `<div class="profile-empty">아직 게시글이 없습니다. 첫 제품 소스를 공유해보세요.</div>`;
  } else {
    feed.innerHTML = communityPosts.map(renderPost).join("");
  }

  const postCount = $("#postCount");
  const replyCount = $("#replyCount");
  const comments = communityPosts.flatMap((post) => post.comments || []).filter((comment) => comment.status !== "hidden" && comment.status !== "deleted");
  if (postCount) postCount.textContent = communityPosts.length;
  if (replyCount) replyCount.textContent = comments.length;
}

async function loadCommunityFeed() {
  if (!apiBaseUrl()) {
    setAuthMessage("API 설정 필요");
    return;
  }
  try {
    setAuthMessage("Loading");
    const response = await fetch(apiUrl(`/api/community?sort=${activeFeedSort}`), { credentials: "include" });
    if (!response.ok) throw new Error("community feed failed");
    communityPosts = await response.json();
    renderCommunityFeed();
    setAuthMessage("Live");
  } catch {
    setAuthMessage("Server offline");
  }
}

async function submitCommunityPost(event) {
  event.preventDefault();
  if (!currentUser) {
    openLogin();
    return;
  }

  const title = $("#communityTitle")?.value.trim();
  const message = $("#communityMessage")?.value.trim();
  if (!title || !message) return;

  const button = event.currentTarget.querySelector("button[type='submit']");
  if (button) button.disabled = true;
  setAuthMessage("Posting");

  try {
    const response = await fetch(apiUrl("/api/community"), {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, message, image: pendingPostImage }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "post failed");

    event.currentTarget.reset();
    pendingPostImage = "";
    renderImagePreview($("#postImagePreview"), "", () => {});
    await loadCommunityFeed();
    await loadCommunityLevel();
    setAuthMessage("Level updated");
  } catch (error) {
    alert(error.message || "게시글 작성에 실패했습니다.");
    setAuthMessage("Live");
  } finally {
    if (button) button.disabled = false;
  }
}

async function likeCommunityPost(postId) {
  if (!currentUser) {
    openLogin();
    return;
  }
  try {
    const response = await fetch(apiUrl(`/api/community/${encodeURIComponent(postId)}/like`), {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) throw new Error("like failed");
    await loadCommunityFeed();
    await loadCommunityLevel();
  } catch {
    alert("좋아요 처리에 실패했습니다.");
  }
}

async function submitComment(event, postId, parentId = "") {
  event.preventDefault();
  if (!currentUser) {
    openLogin();
    return;
  }
  const form = event.target.closest("[data-comment-form]") || event.currentTarget;
  const input = form.querySelector("input[name='message']");
  const message = input?.value.trim();
  if (!message) return;
  try {
    const response = await fetch(apiUrl(`/api/community/${encodeURIComponent(postId)}/comments`), {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, parentId }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "comment failed");
    input.value = "";
    await loadCommunityFeed();
    await loadCommunityLevel();
  } catch (error) {
    alert(error.message || "댓글 작성에 실패했습니다.");
  }
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

function avatarText(user) {
  return escapeHtml((user?.name || user?.email || "M").slice(0, 1).toUpperCase());
}

function setAuthMessage(message) {
  const status = $("#communityStatus");
  if (status) status.textContent = message;
}

function setPaymentStatus(message) {
  const status = $("#paymentStatus");
  if (status) status.textContent = message;
}

function renderTopAuthButton(isLoggedIn) {
  const button = $("#openLoginModal");
  if (!button) return;
  button.textContent = isLoggedIn ? "로그아웃" : "로그인";
  button.dataset.authState = isLoggedIn ? "logged-in" : "logged-out";
}

function renderAuthState(user) {
  currentUser = user;
  const isLoggedIn = Boolean(user);
  renderTopAuthButton(isLoggedIn);
  $("#authPanel")?.classList.toggle("is-hidden", isLoggedIn);
  $("#userPanel")?.classList.toggle("is-hidden", !isLoggedIn);
  $("#communityForm")?.classList.toggle("is-hidden", !isLoggedIn);

  if (!user) return;

  const avatar = $("#currentUserAvatar");
  if (avatar) {
    avatar.innerHTML = user.profileImage
      ? `<img src="${escapeHtml(user.profileImage)}" alt="" />`
      : avatarText(user);
  }

  const name = $("#currentUserName");
  if (name) name.textContent = user.name || "Member";

  const email = $("#currentUserEmail");
  if (email) email.textContent = user.email || "로그인됨";
}

async function loadBillingConfig() {
  if (!apiBaseUrl()) return null;
  const response = await fetch(apiUrl("/api/billing/config"), { credentials: "include" });
  if (!response.ok) throw new Error("billing config failed");
  billingConfig = await response.json();
  return billingConfig;
}

async function startBillingAuth() {
  if (!currentUser) {
    openLogin();
    setPaymentStatus("먼저 Google 또는 Naver로 로그인해 주세요.");
    return;
  }

  if (!window.TossPayments) {
    setPaymentStatus("토스페이먼츠 SDK를 불러오지 못했습니다.");
    return;
  }

  const config = billingConfig || (await loadBillingConfig());
  if (!config?.enabled || !config.clientKey) {
    setPaymentStatus("Render에 토스 자동결제 클라이언트 키를 먼저 설정해야 합니다.");
    return;
  }

  if (!config.customerKey) {
    setPaymentStatus("로그인 정보를 확인한 뒤 다시 시도해 주세요.");
    return;
  }

  const button = $("#paymentButton");
  if (button) button.disabled = true;
  setPaymentStatus("토스 자동결제 카드 등록창을 여는 중입니다.");

  try {
    const tossPayments = TossPayments(config.clientKey);
    const payment = tossPayments.payment({ customerKey: config.customerKey });
    await payment.requestBillingAuth({
      method: "CARD",
      successUrl: new URL("success.html", location.href).href,
      failUrl: new URL("fail.html", location.href).href,
      customerEmail: currentUser.email || $("#orderEmail")?.value || "",
      customerName: $("#orderName")?.value || currentUser.name || "",
    });
  } catch (error) {
    setPaymentStatus(error.message || "카드 등록창을 열지 못했습니다.");
    if (button) button.disabled = false;
  }
}

async function loadAuthState() {
  if (!apiBaseUrl() && location.hostname.endsWith("github.io")) {
    setAuthMessage("API 설정 필요");
    return;
  }

  try {
    const response = await fetch(apiUrl("/api/auth/me"), { credentials: "include" });
    if (!response.ok) throw new Error("auth check failed");
    const data = await response.json();
    renderAuthState(data.authenticated ? data.user : null);
    setAuthMessage(data.authenticated ? "Logged in" : "Live");
    if (data.authenticated) {
      loadBillingConfig().catch(() => setPaymentStatus("토스 결제 설정을 아직 불러오지 못했습니다."));
    }
    await loadCommunityFeed();
    await loadCommunityLevel();
  } catch {
    renderAuthState(null);
    setAuthMessage("Server offline");
  }
}

function startOAuth(provider) {
  const base = apiBaseUrl();
  if (!base) {
    alert("로그인 서버 주소가 아직 설정되지 않았습니다.");
    return;
  }
  location.href = apiUrl(`/api/auth/${provider}/start`);
}

async function logoutCurrentUser() {
  try {
    await fetch(apiUrl("/api/auth/logout"), { method: "POST", credentials: "include" });
  } finally {
    renderAuthState(null);
    setAuthMessage("Live");
    await loadCommunityFeed();
    await loadCommunityLevel();
  }
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
$("#openLoginModal")?.addEventListener("click", () => {
  if (currentUser) {
    logoutCurrentUser();
    return;
  }
  openLogin();
});
$("#communityForm")?.addEventListener("submit", submitCommunityPost);
$("#communityImage")?.addEventListener("change", async (event) => {
  try {
    pendingPostImage = await readImageFile(event.target.files?.[0]);
    renderImagePreview($("#postImagePreview"), pendingPostImage, () => {
      pendingPostImage = "";
      event.target.value = "";
      renderImagePreview($("#postImagePreview"), "", () => {});
    });
  } catch (error) {
    alert(error.message);
    event.target.value = "";
  }
});
$$("[data-feed-sort]").forEach((button) => {
  button.addEventListener("click", () => {
    $$("[data-feed-sort]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFeedSort = button.dataset.feedSort || "hot";
    loadCommunityFeed();
  });
});
$("#orderForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  startBillingAuth();
});
$("#communityFeed")?.addEventListener("click", (event) => {
  const likeButton = event.target.closest("[data-like-post]");
  if (likeButton) {
    likeCommunityPost(likeButton.dataset.likePost);
    return;
  }

  const commentsButton = event.target.closest("[data-toggle-comments]");
  if (commentsButton) {
    const drawer = $$("[data-comments-for]").find((item) => item.dataset.commentsFor === commentsButton.dataset.toggleComments);
    drawer?.classList.toggle("open");
    return;
  }

  const replyButton = event.target.closest("[data-reply-to]");
  if (replyButton) {
    const drawer = $$("[data-comments-for]").find((item) => item.dataset.commentsFor === replyButton.dataset.postId);
    const input = drawer?.querySelector("input[name='message']");
    if (input) {
      input.value = `@${replyButton.closest(".comment")?.querySelector("strong")?.textContent || "reply"} `;
      input.dataset.parentId = replyButton.dataset.replyTo;
      input.focus();
    }
  }
});
$("#communityFeed")?.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-comment-form]");
  if (!form) return;
  const input = form.querySelector("input[name='message']");
  submitComment(event, form.dataset.commentForm, input?.dataset.parentId || "");
  if (input) input.dataset.parentId = "";
});
$$("[data-auth-provider]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    startOAuth(link.dataset.authProvider);
  });
});
$("#demoAdminButton")?.addEventListener("click", async () => {
  try {
    const response = await fetch(apiUrl("/api/auth/demo-admin"), { method: "POST", credentials: "include" });
    if (!response.ok) throw new Error("demo login failed");
    const data = await response.json();
    renderAuthState(data.user);
    closeLogin();
    location.hash = "#community";
  } catch {
    alert("관리자 데모 로그인은 서버가 켜져 있어야 사용할 수 있습니다.");
  }
});
$("#logoutButton")?.addEventListener("click", async () => {
  await logoutCurrentUser();
});
$$("[data-close-modal]").forEach((button) => button.addEventListener("click", closeLogin));
window.addEventListener("hashchange", () => setView(location.hash.replace("#", "")));

redirectGitHubCommunityToApp();
renderProducts();
setView(location.hash.replace("#", ""));
loadAuthState();
loadCommunityFeed();
loadCommunityLevel();
