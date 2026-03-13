/**
 * 2~3단계: VSL 페이지 & 리타겟팅 컨트롤러
 */
const Funnel = {
    videoWatched: false,
    countdownInterval: null,
    retargetTimeouts: [],

    // 챗봇 건너뛰기
    skipChat() {
        document.getElementById('chat-overlay').classList.add('hidden');
        this.showVSLPage();
        Analytics.logEvent('chat', '챗봇 건너뛰기');
    },

    // VSL 페이지 표시
    showVSLPage() {
        document.getElementById('chat-overlay').classList.add('hidden');
        const vslPage = document.getElementById('vsl-page');
        vslPage.classList.remove('hidden');

        Analytics.logEvent('video', 'VSL 페이지 진입');

        // 스크롤 이벤트로 섹션 애니메이션
        this.initScrollReveal();
        // 접속자 수 업데이트
        this.startViewerCount();
        // 카운트다운 시작
        this.startCountdown();
    },

    // 비디오 재생
    playVideo() {
        const placeholder = document.getElementById('videoPlaceholder');
        const player = document.getElementById('videoPlayer');

        placeholder.classList.add('hidden');
        player.classList.remove('hidden');

        Analytics.logEvent('video', '영상 재생 시작');
        Analytics.trackVideoWatch();

        // 시뮬레이션: 프로그레스 바 진행
        this.simulateVideoProgress();
    },

    simulateVideoProgress() {
        const progress = document.getElementById('videoProgress');
        let percent = 0;

        const interval = setInterval(() => {
            percent += 0.5;
            progress.style.width = percent + '%';

            // 25% 지점에서 CTA 표시
            if (percent >= 25 && !this.videoWatched) {
                this.videoWatched = true;
                this.revealAllSections();
            }

            if (percent >= 100) {
                clearInterval(interval);
                Analytics.logEvent('video', '영상 시청 완료');
            }
        }, 150);
    },

    // 모든 섹션 순차적으로 표시
    revealAllSections() {
        const sections = [
            'videoCTA', 'problemSection', 'mechanismSection',
            'valueSection', 'paymentSection', 'guaranteeSection',
            'proofSection', 'faqSection', 'finalCTA'
        ];

        sections.forEach((id, index) => {
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) {
                    el.classList.remove('hidden');
                    el.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            }, index * 200);
        });

        // 플로팅 CTA 바 표시
        setTimeout(() => {
            document.getElementById('floatingCTA').classList.remove('hidden');
        }, sections.length * 200);

        // 리타겟팅 시퀀스 시작 (데모용)
        this.startRetargetSequence();
    },

    // 결제 처리
    handlePayment(method) {
        Analytics.trackPayAttempt();
        Analytics.logEvent('payment', `${method} 결제 시도`);

        const methodNames = {
            naverpay: '네이버페이',
            kakaopay: '카카오페이',
            card: '신용카드'
        };

        // 실제로는 여기서 PG사 결제 모듈을 호출합니다
        alert(
            `${methodNames[method]} 결제 페이지로 이동합니다.\n\n` +
            `상품: ${FunnelConfig.product.name}\n` +
            `금액: ${FunnelConfig.product.price.toLocaleString()}원\n\n` +
            `(데모 버전: 실제 PG 연동 시 여기서 결제 모듈이 실행됩니다)`
        );
    },

    // 결제 섹션으로 스크롤
    scrollToPayment() {
        const paymentSection = document.getElementById('paymentSection');
        if (paymentSection) {
            paymentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    },

    // 카운트다운 타이머
    startCountdown() {
        let totalSeconds =
            FunnelConfig.countdown.hours * 3600 +
            FunnelConfig.countdown.minutes * 60 +
            FunnelConfig.countdown.seconds;

        this.countdownInterval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(this.countdownInterval);
                return;
            }
            totalSeconds--;

            const h = Math.floor(totalSeconds / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);
            const s = totalSeconds % 60;

            document.getElementById('hours').textContent = String(h).padStart(2, '0');
            document.getElementById('minutes').textContent = String(m).padStart(2, '0');
            document.getElementById('seconds').textContent = String(s).padStart(2, '0');
        }, 1000);
    },

    // 접속자 수 업데이트
    startViewerCount() {
        const el = document.getElementById('viewerCount');
        setInterval(() => {
            const { min, max } = FunnelConfig.viewerCount;
            el.textContent = Math.floor(min + Math.random() * (max - min));
        }, 3000);
    },

    // 스크롤 기반 섹션 표시
    initScrollReveal() {
        // 이미 revealAllSections에서 처리되므로 여기서는 플로팅 바 토글만 처리
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const floatingCTA = document.getElementById('floatingCTA');
            if (!floatingCTA || floatingCTA.classList.contains('hidden')) return;

            const paymentSection = document.getElementById('paymentSection');
            if (!paymentSection) return;

            const rect = paymentSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                floatingCTA.style.opacity = '0';
                floatingCTA.style.pointerEvents = 'none';
            } else {
                floatingCTA.style.opacity = '1';
                floatingCTA.style.pointerEvents = 'auto';
            }
        });
    },

    // 3단계: 리타겟팅 알림 시퀀스
    startRetargetSequence() {
        FunnelConfig.retargetMessages.forEach((msg, index) => {
            const timeout = setTimeout(() => {
                this.showNotification(msg.title, msg.message);
                Analytics.logEvent('retarget', `${msg.delay}: 알림 발송`);
            }, msg.delayMs);
            this.retargetTimeouts.push(timeout);
        });
    },

    showNotification(title, message) {
        const popup = document.getElementById('notification-popup');
        document.getElementById('notifTitle').textContent = title;
        document.getElementById('notifMessage').textContent = message;
        popup.classList.remove('hidden');

        // 10초 후 자동 숨김
        setTimeout(() => {
            this.closeNotification();
        }, 10000);
    },

    closeNotification() {
        document.getElementById('notification-popup').classList.add('hidden');
    },

    // FAQ 토글
    toggleFAQ(element) {
        const faqItem = element.parentElement;
        faqItem.classList.toggle('open');
    },

    // 남은 자리 수 감소 (FOMO)
    decrementSpots() {
        const el = document.getElementById('remainingSpots');
        let current = parseInt(el.textContent);
        setInterval(() => {
            if (current > 3) {
                if (Math.random() > 0.7) {
                    current--;
                    el.textContent = current;
                }
            }
        }, 15000);
    },

    // 관리자 패널 토글
    toggleAdmin() {
        const panel = document.getElementById('admin-panel');
        panel.classList.toggle('hidden');
        if (!panel.classList.contains('hidden')) {
            AdminDashboard.refresh();
        }
    }
};
