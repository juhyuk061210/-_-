// Display adjustments for the landing page. Desktop remains close to the original; mobile is optimized.
(function () {
  var css = `
.shipping-note{font-size:.5em;font-weight:700;white-space:nowrap;vertical-align:baseline}.author__photo img{object-fit:contain!important;object-position:center center!important;padding:10px;background:var(--paper)}.curriculum__head h2{display:none!important}
@media (max-width:768px){html,body{overflow-x:hidden}body{width:100%;padding-bottom:112px}body *{min-width:0;box-sizing:border-box}.topnav,.hero,.proof,.section,.excerpt,.refund,.footer{width:100%;max-width:100vw;overflow-x:hidden}.topnav{padding:12px 18px;gap:12px}.nav-links,.nav-cta,.hero__brush{display:none}.wordmark{font-size:15px}.wordmark__chip{font-size:11px;padding:3px 7px}.hero{padding:44px 20px 58px}.hero__grid,.section__inner,.excerpt__inner,.proof__inner,.refund__grid,.footer__inner{width:100%;max-width:calc(100vw - 40px);margin:0 auto}.hero__cover-wrap{order:2;padding-top:10px}.book-cover{width:min(248px,calc(100vw - 104px));box-shadow:7px 7px 0 var(--ink)}.hero__discount{left:18px;bottom:-18px;padding:8px 12px;font-size:11px}.hero__badges{gap:7px;margin-bottom:24px}.badge{max-width:100%;padding:5px 10px;font-size:11px;line-height:1.25;white-space:normal}.hero__eyebrow{gap:10px;font-size:12px;letter-spacing:.08em}.hero__title{font-size:clamp(36px,10.2vw,46px);line-height:1.06;letter-spacing:0;max-width:calc(100vw - 48px);margin:10px 0 22px}.hero__title .accent{display:inline}.hero__hook{font-size:18px;line-height:1.62}.hero__sub{font-size:15px;line-height:1.78;text-align:left!important}.hero__cta-row{flex-direction:column;gap:12px}.hero-cta{width:100%;max-width:calc(100vw - 52px);flex:0 1 auto;min-height:58px;padding:13px 16px}.hero__links{align-items:flex-start;line-height:1.5}.hero__stats{display:grid;grid-template-columns:1fr;gap:14px;max-width:calc(100vw - 52px);margin-top:34px;padding-top:22px}.hero__stat-num{font-size:34px}.hero__stat-label{font-size:12px;line-height:1.35}.proof{padding:28px 20px}.proof__inner{display:grid;grid-template-columns:1fr 1fr;gap:18px 14px}.proof__cell:nth-child(2),.proof__cell:nth-child(3){display:none}.section{padding:68px 20px}.section-label{gap:10px;font-size:11px;letter-spacing:.09em;margin-bottom:18px}.hero__title,.hero__stat-num,.video__head h2,.video__title,.notvsis__head h2,.chapters__head h2,.chapter__num,.author__name,.benefit__num,.curriculum__head h2,.week__num,.week__time,.results__head h2,.case__avatar,.stamp,.refund__copy h2,.plans__head h2,.plan__title,.plan__price,.plans__faq-q,.reviews__head h2,.quote__mark,.cta-section__title,.cta-card__price,.faq__head h2{font-family:var(--font-body)!important;font-weight:900;letter-spacing:0}.notvsis__head h2,.benefits__head h2,.curriculum__head h2,.results__head h2,.plans__head h2,.reviews__head h2,.faq__head h2,.chapters__head h2,.refund__copy h2,.cta-section__title{font-size:clamp(30px,8.8vw,38px);line-height:1.24;word-break:keep-all}.notvsis__head,.benefits__head,.curriculum__head,.results__head,.plans__head,.reviews__head,.faq__head{margin-bottom:34px}.notvsis__grid,.benefits__grid,.plans__grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.notvsis__grid{gap:10px}.benefits__grid{gap:12px}.plans__grid{gap:10px;align-items:stretch;max-width:calc(100vw - 40px)}.results__grid,.reviews__grid{grid-template-columns:1fr;gap:22px}.notvsis__card,.benefit{width:100%;max-width:none;padding:18px 12px;box-shadow:3px 3px 0 var(--ink)}.notvsis__card-label{font-size:10px;line-height:1.35;letter-spacing:.04em}.notvsis__card li{font-size:12px;line-height:1.45;padding:8px 0}.benefit__num{font-size:28px}.benefit h4{font-size:14px;line-height:1.38}.benefit p{font-size:12px;line-height:1.55}.case,.quote,.plans__faq,.faq-item,.cta-card{width:100%;max-width:calc(100vw - 52px);padding:24px 20px;box-shadow:3px 3px 0 var(--ink)}.quote{transform:none}.plan{width:100%;max-width:none;padding:18px 10px;border-radius:8px;box-shadow:3px 3px 0 var(--ink)}.plan--bundle{transform:none;box-shadow:5px 5px 0 var(--ink)}.plan__badge{top:-12px;right:8px;padding:4px 8px;font-size:9px;letter-spacing:0}.plan__option{font-size:9px;letter-spacing:.08em;margin-bottom:8px}.plan__title{font-size:20px;line-height:1.22}.plan--bundle .plan__title{font-size:21px}.plan__desc{font-size:11px;line-height:1.5;margin-bottom:16px}.plan__price-wrap{margin-bottom:16px}.plan--bundle .plan__price,.plan__price{font-size:22px;line-height:1.14}.plan__features{margin-bottom:16px}.plan__features li{gap:6px;padding:7px 0;font-size:11px;line-height:1.45}.plan__check,.plan__dash{width:14px;height:14px;line-height:14px;font-size:9px}.plan__price-meta,.plan__micro{font-size:10px;line-height:1.45;word-break:keep-all}.plan__cta{min-height:42px;padding:10px 8px;font-size:11px;line-height:1.35;display:flex;align-items:center;justify-content:center}.excerpt{padding:70px 20px}.excerpt__card{width:100%;max-width:calc(100vw - 52px);padding:44px 22px 30px;box-shadow:5px 5px 0 var(--ink)}.excerpt__body{font-size:16px;line-height:1.82}.hero__hook,.hero__sub,.chapters__head p,.author__lead,.author__body,.curriculum__head p,.results__sub,.refund__copy p,.plans__social,.cta-section__sub,.cta-card__assurance,.results__foot{text-align:left!important;word-break:keep-all;overflow-wrap:anywhere}.excerpt__body,.section p,.notvsis__card li,.benefit p,.week__points li,.case__quote,.plan__desc,.plan__features li,.plans__faq-body,.quote__text,.faq-item p{white-space:normal;word-break:keep-all;overflow-wrap:anywhere}.chapters__grid,.author__grid,.refund__grid,.cta-card__grid,.week,.curriculum__totals,.case__ba{grid-template-columns:1fr}.chapter{grid-template-columns:54px 1fr;gap:14px;padding:18px 0}.chapter__num{font-size:32px}.chapter__title{font-size:18px;line-height:1.42;word-break:keep-all}.author__photo{width:min(280px,calc(100vw - 84px));margin:0 auto;box-shadow:5px 5px 0 var(--ink)}.author__photo img{padding:12px}.author__caption{left:12px;right:12px;bottom:12px;font-size:10px;line-height:1.35;letter-spacing:.04em}.author__name{font-size:clamp(34px,9.8vw,44px);line-height:1.22}.author__name-real{display:block;margin-top:4px;font-size:.5em}.author__lead{font-size:17px;line-height:1.78}.author__body{font-size:15px;line-height:1.84}.week{gap:12px;padding:22px 20px}.week__num{font-size:52px}.week__title{font-size:19px;line-height:1.42;word-break:keep-all}.week__time-cell{text-align:left}.case__arrow{justify-content:center;transform:rotate(90deg)}.refund{padding:62px 20px}.stamp{width:132px;height:132px}.footer{padding:36px 20px}.footer__cols{flex-direction:column;gap:16px}.sticky-bar{padding:10px 14px calc(10px + env(safe-area-inset-bottom))}.sticky-bar__inner{display:grid;grid-template-columns:42px minmax(0,1fr);gap:6px 12px;align-items:center}.sticky-bar__cover{display:block;grid-row:1/span 2;width:38px}.sticky-bar__title{font-size:12px;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sticky-bar__price{font-size:12px;line-height:1.35}.sticky-bar__cta{grid-column:1/-1;width:100%;margin-left:0;padding:12px 16px;text-align:center;font-size:14px;border-color:var(--ink)}}`;
  var style = document.createElement('style');
  style.setAttribute('data-mobile-comfort', 'true');
  style.textContent = css;
  document.head.appendChild(style);

  function setHtml(selector, value) { var node = document.querySelector(selector); if (node) node.innerHTML = value; }
  function setAllText(oldText, newHtml) { document.querySelectorAll('body *').forEach(function (node) { if (node.children.length === 0 && node.innerHTML.indexOf(oldText) !== -1) node.innerHTML = node.innerHTML.split(oldText).join(newHtml); }); }

  function applyRequestedCopy() {
    setHtml('.curriculum__head h2', '');
    setHtml('.author__lead', '왜 학교는 자본주의를 가르치지 않을까.<br />그 의도된 침묵을 알아차린 순간,<br />안타까움과 동시에 확신이 들었다.');
    setHtml('.hero-cta--ghost .hero-cta__main', '7,000원 <span class="shipping-note">(배송비만 부담)</span> · 혼자 시작');
    setHtml('.plan--basic .plan__price', '7,000원 <span class="shipping-note">(배송비만 부담)</span>');
    setHtml('.plan--bundle .plan__price', '29,800원 <span class="shipping-note">(무료배송)</span>');
    setHtml('.cta-card__col--left .cta-card__price', '7,000원 <span class="shipping-note">(배송비만 부담)</span>');
    setHtml('.cta-card__col--right .cta-card__price', '29,800원 <span class="shipping-note">(무료배송)</span>');
    setHtml('.sticky-bar__price .accent', '7,000원 <span class="shipping-note">(배송비만 부담)</span>');
    setHtml('.cta-section__sub', '책은 <strong>7,000원</strong> <span class="shipping-note">(배송비만 부담)</span>으로 받으세요.<br />지금 가장 많이 선택하는 옵션은<br /><strong class="accent">책 + 강의와 함께</strong>입니다.');
    setAllText('책 + 강의 함께', '책 + 강의와 함께');
    setAllText('약 280페이지', '약 238페이지');
    setAllText('280페이지', '238페이지');
    var bundleFeatures = document.querySelector('.plan--bundle .plan__features');
    if (bundleFeatures) {
      bundleFeatures.innerHTML = '<li><span class="plan__check">✓</span><span>책 1권 (약 238페이지)</span></li>' +
        '<li><span class="plan__check">✓</span><span class="plan__feat-strong">스마트스토어 및 자사몰 세팅하기</span></li>' +
        '<li><span class="plan__check">✓</span><span class="plan__feat-strong">팔리는 상품 찾는 법</span></li>' +
        '<li><span class="plan__check">✓</span><span class="plan__feat-strong">일 매출 500만든 광고세팅</span></li>' +
        '<li><span class="plan__check">✓</span><span>30일 환불 보장</span></li>';
    }
  }

  function applyRequestedMobileCopy() {
    if (!window.matchMedia('(max-width: 768px)').matches) return;
    setHtml('.hero__title', '한 달에 <span class="accent">4천만 원</span><br />버는 고3입니다.');
    setHtml('.hero__sub', '성인이 되기 직전,<br />월 수익 <span class="mark">4,000만 원</span>을 달성하기까지의 치열한 기록.');
    setHtml('.excerpt__body', '어른들이 가르쳐 준 길은, 어른들도 안 가본 길이었다.<br /><br />"공부해서 좋은 회사에 들어가라"고 말하는<br />사람들 중에 정말 좋은 회사에 들어가서<br />만족하고 사는 사람이 얼마나 될까.<br />나는 그게 늘 궁금했다.<br /><br />18살이 되어서야 알았다.<br />사실 그 길은 꿈을 포기한 사람들이<br />서로를 위로하며 적당히 안주하도록,<br />세상이 교묘하게 설계해 둔 판이란 것을.<br /><br />그걸 깨달으니 내가 가고자 했던 길에서 겪었던 실패가 더 이상 부끄럽지 않게 되었다.');
    setHtml('.chapters__head h2', '그는 어떻게 학생 신분으로<br />월 4천을 벌었을까?');
    setHtml('.chapters__head p', '오직 숫자와 결과로만 증명한<br />10대의 진짜 생존 기록입니다.');
    setHtml('.author__body', '수능 대신 사업을 선택했고<br />시험점수 대신 국세청 매출로 증명했다.<br /><br />18세 고등학생이 자본주의라는 거대한 게임의 룰을<br />어떻게 깨부수고 승리했는지,<br />그 생생한 치트키를 공개합니다.');
    setHtml('.benefits__head h2', '이 책을 읽기 전으로<br />절대 돌아갈 수 없습니다.');
    setHtml('.curriculum__head p', '책이 무엇을 했는지 알려준다면,<br />강의는 지금 당신이 어떻게 시작해야 하는지를 알려줍니다.');
    setHtml('.refund__copy h2', '마음에 들지 않으면<br />이유 없이 환불합니다.');
  }

  applyRequestedCopy();
  applyRequestedMobileCopy();
  window.addEventListener('resize', function () { applyRequestedCopy(); applyRequestedMobileCopy(); });
})();

// Show sticky purchase bar after scrolling 600px.
(function () {
  var bar = document.getElementById('stickyBar');
  if (!bar) return;
  function onScroll() { if (window.scrollY > 600) bar.classList.add('is-visible'); else bar.classList.remove('is-visible'); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
