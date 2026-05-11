/* ===== 드랍쉬핑 영상 플랫폼 ===== */
const Videos = (() => {
  const STORAGE_KEY = 'dropshipping_videos';

  const CATEGORIES = [
    { id: 'all', label: '전체' },
    { id: 'product', label: '제품 찾기' },
    { id: 'marketing', label: '마케팅' },
    { id: 'profit', label: '수익 인증' },
    { id: 'operation', label: '운영 팁' },
    { id: 'beginner', label: '초보자 가이드' },
    { id: 'supplier', label: '공급업체' },
    { id: 'ads', label: '광고 전략' },
  ];

  // 샘플 데이터 (실제 운영 시 관리자가 추가)
  const SAMPLE_VIDEOS = [
    {
      id: 'sample_1',
      tiktokUrl: 'https://www.tiktok.com/@shopify/video/7341549092631001386',
      videoId: '7341549092631001386',
      author: '@shopify',
      title: '드랍쉬핑으로 첫 판매 달성하는 방법 — 완전 초보도 가능',
      category: 'beginner',
      tags: ['입문', 'Shopify', '첫판매'],
      addedAt: Date.now() - 86400000 * 3,
    },
    {
      id: 'sample_2',
      tiktokUrl: 'https://www.tiktok.com/@shopify/video/7366215517764757802',
      videoId: '7366215517764757802',
      author: '@shopify',
      title: '2024년 드랍쉬핑 트렌드 제품 TOP 5 — 지금 당장 팔아야 하는 아이템',
      category: 'product',
      tags: ['트렌드', '제품발굴', '2024'],
      addedAt: Date.now() - 86400000 * 2,
    },
    {
      id: 'sample_3',
      tiktokUrl: 'https://www.tiktok.com/@shopify/video/7384902674186888490',
      videoId: '7384902674186888490',
      author: '@shopify',
      title: 'TikTok 광고 없이 유기적 트래픽만으로 월 1000만 원 달성한 비결',
      category: 'marketing',
      tags: ['오가닉', '무광고', '마케팅'],
      addedAt: Date.now() - 86400000,
    },
  ];

  let videos = [];
  let currentCategory = 'all';
  let searchQuery = '';
  let tiktokScriptLoaded = false;

  function init() {
    loadVideos();
    renderCategories();
    renderGrid();
    bindEvents();
    loadTikTokScript();
  }

  function loadVideos() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      videos = stored ? JSON.parse(stored) : [...SAMPLE_VIDEOS];
      if (!stored) saveVideos();
    } catch {
      videos = [...SAMPLE_VIDEOS];
    }
  }

  function saveVideos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
  }

  function loadTikTokScript() {
    if (tiktokScriptLoaded) return;
    const s = document.createElement('script');
    s.src = 'https://www.tiktok.com/embed.js';
    s.async = true;
    s.onload = () => { tiktokScriptLoaded = true; };
    document.head.appendChild(s);
  }

  function reloadTikTokEmbeds() {
    if (window.tiktokEmbed) {
      window.tiktokEmbed.lib.reload();
    } else {
      loadTikTokScript();
    }
  }

  function renderCategories() {
    const bar = document.getElementById('categoryBar');
    if (!bar) return;
    bar.innerHTML = CATEGORIES.map(c => `
      <button class="cat-tag ${c.id === currentCategory ? 'active' : ''}"
              data-cat="${c.id}">${c.label}</button>
    `).join('');
  }

  function getFilteredVideos() {
    return videos.filter(v => {
      const matchCat = currentCategory === 'all' || v.category === currentCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = !q ||
        v.title.toLowerCase().includes(q) ||
        v.author.toLowerCase().includes(q) ||
        (v.tags || []).some(t => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }

  function renderGrid() {
    const grid = document.getElementById('vidGrid');
    const countEl = document.getElementById('vidCount');
    if (!grid) return;

    const filtered = getFilteredVideos();
    if (countEl) countEl.textContent = filtered.length;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="vid-empty">
          <div class="empty-icon">🎬</div>
          <h3>영상이 없습니다</h3>
          <p>검색 조건을 바꾸거나 새 영상을 추가해보세요.</p>
        </div>`;
      return;
    }

    grid.innerHTML = filtered.map(v => renderCard(v)).join('');
    reloadTikTokEmbeds();
  }

  function renderCard(v) {
    const catLabel = CATEGORIES.find(c => c.id === v.category)?.label || v.category;
    const tags = (v.tags || []).map(t => `<span class="vid-tag">#${t}</span>`).join('');

    return `
      <div class="vid-card" data-id="${v.id}">
        <div class="vid-card-embed">
          <div class="embed-loading" id="loading_${v.id}">
            <div class="spinner"></div>
            <span>TikTok 영상 로딩 중...</span>
          </div>
          <blockquote class="tiktok-embed"
            cite="${v.tiktokUrl}"
            data-video-id="${v.videoId}"
            style="max-width:605px;min-width:325px;">
            <section></section>
          </blockquote>
        </div>
        <div class="vid-card-info">
          <div class="vid-card-meta">
            <span class="vid-author">${v.author}</span>
            <span class="vid-category-badge">${catLabel}</span>
          </div>
          <p class="vid-title">${v.title}</p>
          <div class="vid-tags">${tags}</div>
          <div class="vid-card-actions">
            <button class="btn-delete" onclick="Videos.deleteVideo('${v.id}')">삭제</button>
            <a class="btn-visit" href="${v.tiktokUrl}" target="_blank" rel="noopener">
              TikTok에서 보기 ↗
            </a>
          </div>
        </div>
      </div>`;
  }

  function bindEvents() {
    // 카테고리 필터
    document.getElementById('categoryBar')?.addEventListener('click', e => {
      const btn = e.target.closest('.cat-tag');
      if (!btn) return;
      currentCategory = btn.dataset.cat;
      document.querySelectorAll('.cat-tag').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGrid();
    });

    // 검색
    document.getElementById('searchInput')?.addEventListener('input', e => {
      searchQuery = e.target.value;
      renderGrid();
    });

    // 모달 열기/닫기
    document.getElementById('btnAddVideo')?.addEventListener('click', openModal);
    document.getElementById('btnCancel')?.addEventListener('click', closeModal);
    document.getElementById('btnCancelForm')?.addEventListener('click', closeModal);
    document.getElementById('modalOverlay')?.addEventListener('click', e => {
      if (e.target === document.getElementById('modalOverlay')) closeModal();
    });

    // URL 붙여넣기 → 자동 파싱
    document.getElementById('tiktokUrlInput')?.addEventListener('input', e => {
      parseAndPreview(e.target.value.trim());
    });

    // 폼 제출
    document.getElementById('addVideoForm')?.addEventListener('submit', handleSubmit);
  }

  function openModal() {
    document.getElementById('modalOverlay')?.classList.add('open');
    document.getElementById('tiktokUrlInput')?.focus();
  }

  function closeModal() {
    document.getElementById('modalOverlay')?.classList.remove('open');
    document.getElementById('addVideoForm')?.reset();
    document.getElementById('previewBox').innerHTML = '<p class="preview-placeholder">TikTok URL을 입력하면 미리보기가 표시됩니다</p>';
  }

  function extractVideoId(url) {
    const match = url.match(/video\/(\d+)/);
    return match ? match[1] : null;
  }

  function extractAuthor(url) {
    const match = url.match(/tiktok\.com\/@([^/]+)/);
    return match ? `@${match[1]}` : '';
  }

  function parseAndPreview(url) {
    const videoId = extractVideoId(url);
    const previewBox = document.getElementById('previewBox');
    if (!previewBox) return;

    if (!videoId || !url.includes('tiktok.com')) {
      previewBox.innerHTML = '<p class="preview-placeholder">올바른 TikTok URL을 입력하세요</p>';
      return;
    }

    previewBox.innerHTML = `
      <blockquote class="tiktok-embed"
        cite="${url}"
        data-video-id="${videoId}"
        style="max-width:100%;min-width:200px;">
        <section></section>
      </blockquote>`;
    reloadTikTokEmbeds();

    // 자동 author 채우기
    const authorInput = document.getElementById('authorInput');
    if (authorInput && !authorInput.value) {
      authorInput.value = extractAuthor(url);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const url = document.getElementById('tiktokUrlInput').value.trim();
    const title = document.getElementById('titleInput').value.trim();
    const author = document.getElementById('authorInput').value.trim();
    const category = document.getElementById('categorySelect').value;
    const tagsRaw = document.getElementById('tagsInput').value.trim();

    const videoId = extractVideoId(url);
    if (!videoId) {
      showToast('올바른 TikTok 영상 URL을 입력하세요.', 'error');
      return;
    }

    if (!title) {
      showToast('영상 제목을 입력하세요.', 'error');
      return;
    }

    const newVideo = {
      id: `vid_${Date.now()}`,
      tiktokUrl: url,
      videoId,
      author: author || extractAuthor(url) || '@unknown',
      title,
      category,
      tags: tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [],
      addedAt: Date.now(),
    };

    videos.unshift(newVideo);
    saveVideos();
    closeModal();
    renderGrid();
    showToast('영상이 추가되었습니다!', 'success');
  }

  function deleteVideo(id) {
    if (!confirm('이 영상을 삭제할까요?')) return;
    videos = videos.filter(v => v.id !== id);
    saveVideos();
    renderGrid();
    showToast('영상이 삭제되었습니다.', 'success');
  }

  function showToast(msg, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }

  return { init, deleteVideo };
})();

document.addEventListener('DOMContentLoaded', Videos.init);
