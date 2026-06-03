// Loads the current landing adjustments, then applies the latest copy tweak.
(function () {
  var base = document.createElement('script');
  base.src = 'https://cdn.jsdelivr.net/gh/juhyuk061210/-@1fab282cce4482618fd11681e4dcbe5c53539db1/js/landing.js';
  base.onload = function () {
    function addMetaAdsBenefit() {
      var bundleFeatures = document.querySelector('.plan--bundle .plan__features');
      if (!bundleFeatures || bundleFeatures.innerHTML.indexOf('일 매출 500찍는 메타광고 세팅법') !== -1) return;
      var marginItem = Array.prototype.find.call(bundleFeatures.querySelectorAll('li'), function (item) {
        return item.textContent.indexOf('제품 마진 계산기') !== -1;
      });
      if (!marginItem) return;
      var item = document.createElement('li');
      item.innerHTML = '<span class="plan__check">✓</span><span class="plan__feat-strong">일 매출 500찍는 메타광고 세팅법</span>';
      marginItem.after(item);
    }

    addMetaAdsBenefit();
    window.addEventListener('resize', function () { setTimeout(addMetaAdsBenefit, 0); });
    new MutationObserver(addMetaAdsBenefit).observe(document.body, { childList: true, subtree: true });
  };
  document.head.appendChild(base);
})();
