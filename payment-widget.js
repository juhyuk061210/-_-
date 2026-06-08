(function () {
  let currentUser = null;
  let paymentConfig = null;
  let widgets = null;
  let rendered = false;
  let currentAmount = 29800;

  const $ = (selector) => document.querySelector(selector);
  const apiBase = () =>
    (
      window.TRENDSCOPE_API_BASE ||
      document.querySelector('meta[name="trendscope-api-base"]')?.content ||
      localStorage.getItem("trendscopeApiBase") ||
      ""
    ).replace(/\/+$/, "");
  const apiUrl = (path) => `${apiBase()}${path}`;

  function couponApplied() {
    return Boolean($("#coupon-box")?.checked);
  }

  function baseAmount() {
    return Number(paymentConfig?.amount || 29800);
  }

  function amountWithCoupon() {
    return Math.max(0, baseAmount() - (couponApplied() ? 5000 : 0));
  }

  function ensureCouponRow() {
    if ($("#coupon-box")) return;
    const widget = $(".payment-widget");
    const note = $(".payment-note");
    if (!widget || !note) return;

    const label = document.createElement("label");
    label.className = "coupon-row";
    label.innerHTML = '<input type="checkbox" id="coupon-box" /><span>5,000원 쿠폰 적용</span>';
    widget.parentNode.insertBefore(label, widget);
  }

  function setStatus(message) {
    const status = $("#paymentStatus");
    if (status) status.textContent = message;
  }

  async function refreshUser() {
    if (!apiBase()) return null;
    try {
      const response = await fetch(apiUrl("/api/auth/me"), { credentials: "include" });
      const data = await response.json();
      currentUser = data.authenticated ? data.user : null;
      return currentUser;
    } catch {
      currentUser = null;
      return null;
    }
  }

  async function loadConfig() {
    const response = await fetch(apiUrl("/api/payments/config"), { credentials: "include" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "payment config failed");
    paymentConfig = data;
    return data;
  }

  async function renderWidget() {
    if (rendered) return;
    if (!window.TossPayments) throw new Error("TossPayments SDK is not loaded");

    const user = currentUser || (await refreshUser());
    if (!user) {
      setStatus("Please log in with Google or Naver first.");
      return;
    }

    const config = paymentConfig || (await loadConfig());
    if (!config.enabled || !config.clientKey) {
      setStatus("Toss Payments keys are not configured on Render yet.");
      return;
    }

    widgets = TossPayments(config.clientKey).widgets({ customerKey: config.customerKey });
    currentAmount = amountWithCoupon();
    await widgets.setAmount({
      currency: config.currency || "KRW",
      value: currentAmount,
    });
    await Promise.all([
      widgets.renderPaymentMethods({
        selector: "#payment-method",
        variantKey: config.variantKey || "DEFAULT",
      }),
      widgets.renderAgreement({
        selector: "#agreement",
        variantKey: config.agreementVariantKey || "AGREEMENT",
      }),
    ]);

    rendered = true;
    setStatus("Choose a payment method, then press the payment button.");
  }

  async function updateAmount() {
    if (!paymentConfig) return;
    currentAmount = amountWithCoupon();
    if (widgets) {
      await widgets.setAmount({
        currency: paymentConfig.currency || "KRW",
        value: currentAmount,
      });
    }
    const button = $("#paymentButton");
    if (button) button.textContent = `${currentAmount.toLocaleString("ko-KR")}원 결제하기`;
  }

  async function startPayment() {
    const user = currentUser || (await refreshUser());
    if (!user) {
      $("#loginModal")?.classList.remove("is-hidden");
      setStatus("Please log in with Google or Naver first.");
      return;
    }

    await renderWidget();
    if (!widgets) return;

    const orderResponse = await fetch(apiUrl("/api/payments/order"), {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coupon: couponApplied() }),
    });
    const order = await orderResponse.json();
    if (!orderResponse.ok) throw new Error(order.error || "payment order failed");

    await widgets.requestPayment({
      orderId: order.orderId,
      orderName: order.orderName,
      customerEmail: order.customerEmail || user.email || $("#orderEmail")?.value || "",
      customerName: order.customerName || $("#orderName")?.value || user.name || "",
      successUrl: new URL("success.html", location.href).href,
      failUrl: new URL("fail.html", location.href).href,
    });
  }

  function bind() {
    const form = $("#orderForm");
    if (!form) return;
    ensureCouponRow();
    $("#coupon-box")?.addEventListener("change", () => {
      updateAmount().catch((error) => setStatus(error.message || "Could not update amount."));
    });

    form.addEventListener(
      "submit",
      async (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        const button = $("#paymentButton");
        if (button) button.disabled = true;
        setStatus("Opening Toss Payments checkout.");
        try {
          await startPayment();
        } catch (error) {
          setStatus(error.message || "Could not open checkout.");
          if (button) button.disabled = false;
        }
      },
      true,
    );
  }

  document.addEventListener("DOMContentLoaded", async () => {
    bind();
    await refreshUser();
    if (location.hash === "#subscribe") renderWidget().catch((error) => setStatus(error.message));
  });

  window.addEventListener("hashchange", () => {
    if (location.hash === "#subscribe") renderWidget().catch((error) => setStatus(error.message));
  });
})();
