// Mobile-only comfort adjustments. Keeps the desktop design unchanged.
(function () {
  var css = `
@media (max-width: 768px) {
  html, body { overflow-x: hidden; }
  body { width: 100%; padding-bottom: 112px; }
  body * { min-width: 0; box-sizing: border-box; }

  .topnav,
  .hero,
  .proof,
  .section,
  .excerpt,
  .refund,
  .footer { width: 100%; max-width: 100vw; overflow-x: hidden; }

  .topnav { padding: 12px 18px; gap: 12px; }
  .wordmark { font-size: 15px; }
  .wordmark__chip { font-size: 11px; padding: 3px 7px; }
  .nav-links, .nav-cta { display: none; }

  .hero { padding: 44px 20px 58px; }
  .hero__grid,
  .section__inner,
  .excerpt__inner,
  .proof__inner,
  .refund__grid,
  .footer__inner { width: 100%; max-width: calc(100vw - 40px); margin-left: auto; margin-right: auto; }

  .hero__cover-wrap { order: 2; padding-top: 10px; }
  .book-cover { width: min(248px, calc(100vw - 104px)); box-shadow: 7px 7px 0 var(--ink); }
  .hero__brush { display: none; }
  .hero__discount { left: 18px; bottom: -18px; padding: 8px 12px; font-size: 11px; }

  .hero__badges { gap: 7px; margin-bottom: 24px; }
  .badge { max-width: 100%; padding: 5px 10px; font-size: 11px; line-height: 1.25; white-space: normal; }
  .hero__eyebrow { gap: 10px; font-size: 12px; letter-spacing: 0.08em; }
  .hero__eyebrow-bar { width: 28px; }

  .hero__title { font-size: clamp(42px, 12vw, 52px); line-height: 1.12; letter-spacing: 0; max-width: calc(100vw - 48px); margin: 10px 0 24px; }
  .hero__title .accent { display: block; }
  .hero__hook { font-size: 18px; line-height: 1.55; }
  .hero__sub { font-size: 15px; line-height: 1.75; }

  .hero__cta-row { flex-direction: column; gap: 12px; }
  .hero-cta { width: 100%; max-width: calc(100vw - 52px); flex: 0 1 auto; min-height: 58px; padding: 13px 16px; }
  .hero-cta__pill { right: 12px; }
  .hero__links { align-items: flex-start; line-height: 1.5; }

  .hero__stats { display: grid; grid-template-columns: 1fr; gap: 14px; max-width: calc(100vw - 52px); margin-top: 34px; padding-top: 22px; }
  .hero__stat-num { font-size: 34px; }
  .hero__stat-label { font-size: 12px; line-height: 1.35; }

  .proof { padding: 28px 20px; }
  .proof__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 18px 14px; }
  .proof__cell { min-width: 0; }
  .proof__v { font-size: 14px; line-height: 1.35; }

  .section { padding: 68px 20px; }
  .section-label { gap: 10px; font-size: 11px; letter-spacing: 0.09em; margin-bottom: 18px; }
  .section-label__bar { width: 24px; }
  .notvsis__head, .benefits__head, .curriculum__head, .results__head, .plans__head, .reviews__head, .faq__head { margin-bottom: 34px; }

  .notvsis__head h2,
  .benefits__head h2,
  .curriculum__head h2,
  .results__head h2,
  .plans__head h2,
  .reviews__head h2,
  .faq__head h2,
  .chapters__head h2,
  .refund__copy h2,
  .cta-section__title { font-size: clamp(34px, 10vw, 44px); line-height: 1.16; letter-spacing: 0; word-break: keep-all; }

  .video__frame { box-shadow: 5px 5px 0 var(--ink); padding: 24px; }
  .notvsis__grid, .benefits__grid, .results__grid, .reviews__grid, .plans__grid { grid-template-columns: 1fr; gap: 22px; }
  .notvsis__card, .benefit, .case, .quote, .plan, .plans__faq, .faq-item, .cta-card { width: 100%; max-width: calc(100vw - 52px); padding: 24px 20px; box-shadow: 3px 3px 0 var(--ink); }
  .quote { transform: none; }

  .excerpt { padding: 70px 20px; }
  .excerpt__card { width: 100%; max-width: calc(100vw - 52px); padding: 44px 22px 30px; box-shadow: 5px 5px 0 var(--ink); }
  .excerpt__body { font-size: 16px; line-height: 1.78; }
  .excerpt__foot { flex-direction: column; gap: 6px; align-items: flex-start; }

  .excerpt__body,
  .section p,
  .notvsis__card li,
  .benefit p,
  .week__points li,
  .case__quote,
  .plan__desc,
  .plan__features li,
  .plans__faq-body,
  .quote__text,
  .faq-item p { white-space: normal; word-break: normal; overflow-wrap: anywhere; }

  .chapters__grid, .author__grid, .refund__grid, .cta-card__grid { grid-template-columns: 1fr; gap: 32px; }
  .chapter { grid-template-columns: 54px 1fr; gap: 14px; padding: 18px 0; }
  .chapter__num { font-size: 34px; }
  .chapter__title { font-size: 18px; line-height: 1.35; }
  .chapters__foot { text-align: left; }

  .author__photo { width: min(280px, calc(100vw - 84px)); margin: 0 auto; box-shadow: 5px 5px 0 var(--ink); }
  .author__name { font-size: clamp(42px, 12vw, 54px); letter-spacing: 0; }

  .week { grid-template-columns: 1fr; gap: 12px; padding: 22px 20px; }
  .week__num { font-size: 56px; }
  .week__title { font-size: 19px; }
  .week__time-cell { text-align: left; }
  .curriculum__totals, .case__ba { grid-template-columns: 1fr; }
  .case__arrow { justify-content: center; transform: rotate(90deg); }

  .refund { padding: 62px 20px; }
  .stamp { width: 132px; height: 132px; }
  .stamp__big { font-size: 30px; }

  .plan--bundle { transform: none; box-shadow: 7px 7px 0 var(--ink); }
  .plan__badge { top: -14px; right: 16px; font-size: 11px; }
  .plan__title { font-size: 32px; line-height: 1.15; }
  .plan--bundle .plan__title { font-size: 36px; }
  .plan--bundle .plan__price, .plan__price { font-size: 38px; }
  .plan__cta, .cta-card__cta, .sticky-bar__cta { min-height: 48px; display: flex; align-items: center; justify-content: center; }

  .footer { padding: 36px 20px; }
  .footer__cols { flex-direction: column; gap: 16px; }

  .sticky-bar { padding: 10px 14px calc(10px + env(safe-area-inset-bottom)); }
  .sticky-bar__inner { display: grid; grid-template-columns: 42px minmax(0, 1fr); gap: 6px 12px; align-items: center; }
  .sticky-bar__cover { display: block; grid-row: 1 / span 2; width: 38px; }
  .sticky-bar__title { font-size: 12px; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sticky-bar__price { font-size: 12px; line-height: 1.35; }
  .sticky-bar__cta { grid-column: 1 / -1; width: 100%; margin-left: 0; padding: 12px 16px; text-align: center; font-size: 14px; border-color: var(--ink); }
}
`;

  var style = document.createElement('style');
  style.setAttribute('data-mobile-comfort', 'true');
  style.textContent = css;
  document.head.appendChild(style);
})();

// Show sticky purchase bar after scrolling 600px.
(function () {
  var bar = document.getElementById('stickyBar');
  if (!bar) return;

  function onScroll() {
    if (window.scrollY > 600) {
      bar.classList.add('is-visible');
    } else {
      bar.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
