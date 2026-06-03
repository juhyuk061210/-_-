// Loads the current landing adjustments, then applies the latest copy tweaks.
(function () {
  var base = document.createElement('script');
  base.src = 'https://cdn.jsdelivr.net/gh/juhyuk061210/-@1fab282cce4482618fd11681e4dcbe5c53539db1/js/landing.js';
  base.onload = function () {
    function addMetaAdsBenefit() {
      var bundleFeatures = document.querySelector('.plan--bundle .plan__features');
      if (!bundleFeatures || bundleFeatures.innerHTML.indexOf('일 매출 500찍는 메타광고 세팅법') !== -1) return;
      var productListItem = Array.prototype.find.call(bundleFeatures.querySelectorAll('li'), function (item) {
        return item.textContent.indexOf('일 매출 500찍는 제품 리스트') !== -1;
      });
      if (!productListItem) return;
      var item = document.createElement('li');
      item.innerHTML = '<span class="plan__check">✓</span><span class="plan__feat-strong">일 매출 500찍는 메타광고 세팅법</span>';
      productListItem.after(item);
    }

    function moveAuthorVideoNearTop() {
      var videoSection = document.querySelector('.video__head') ? document.querySelector('.video__head').closest('section') : null;
      var proofSection = document.querySelector('.proof');
      var heroSection = document.querySelector('.hero');
      var anchor = proofSection || heroSection;
      if (!videoSection || !anchor || anchor.nextElementSibling === videoSection) return;
      anchor.after(videoSection);
    }

    function applyTweaks() {
      addMetaAdsBenefit();
      moveAuthorVideoNearTop();
    }

    applyTweaks();
    window.addEventListener('resize', function () { setTimeout(applyTweaks, 0); });
    new MutationObserver(applyTweaks).observe(document.body, { childList: true, subtree: true });
  };
  document.head.appendChild(base);
})();
