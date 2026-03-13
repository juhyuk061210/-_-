/**
 * 4단계: 관리자 대시보드 & 분석
 */
const Analytics = {
    data: {
        visitors: 0,
        chatComplete: 0,
        videoWatch: 0,
        payAttempt: 0,
        events: []
    },

    init() {
        // localStorage에서 기존 데이터 복원
        const saved = localStorage.getItem('funnel_analytics');
        if (saved) {
            try {
                this.data = JSON.parse(saved);
            } catch (e) {
                // ignore
            }
        }
        this.trackVisitor();
    },

    save() {
        localStorage.setItem('funnel_analytics', JSON.stringify(this.data));
    },

    trackVisitor() {
        this.data.visitors++;
        this.save();
    },

    trackChatComplete() {
        this.data.chatComplete++;
        this.save();
    },

    trackVideoWatch() {
        this.data.videoWatch++;
        this.save();
    },

    trackPayAttempt() {
        this.data.payAttempt++;
        this.save();
    },

    logEvent(type, description) {
        const event = {
            time: new Date().toLocaleTimeString('ko-KR'),
            type: type,
            description: description
        };
        this.data.events.unshift(event);
        if (this.data.events.length > 50) {
            this.data.events = this.data.events.slice(0, 50);
        }
        this.save();
    },

    getConversionRate() {
        if (this.data.visitors === 0) return '0';
        return ((this.data.payAttempt / this.data.visitors) * 100).toFixed(1);
    },

    reset() {
        this.data = {
            visitors: 0,
            chatComplete: 0,
            videoWatch: 0,
            payAttempt: 0,
            events: []
        };
        this.save();
    }
};

const AdminDashboard = {
    refresh() {
        this.updateStats();
        this.renderFunnelChart();
        this.renderRetargetList();
        this.renderEventLog();
    },

    updateStats() {
        document.getElementById('statVisitors').textContent = Analytics.data.visitors;
        document.getElementById('statChatComplete').textContent = Analytics.data.chatComplete;
        document.getElementById('statVideoWatch').textContent = Analytics.data.videoWatch;
        document.getElementById('statPayAttempt').textContent = Analytics.data.payAttempt;
        document.getElementById('statConversion').textContent = Analytics.getConversionRate() + '%';
    },

    renderFunnelChart() {
        const container = document.getElementById('funnelChart');
        const total = Analytics.data.visitors || 1;

        const stages = [
            { label: '방문', value: Analytics.data.visitors, class: 'stage-1' },
            { label: '챗봇 완료', value: Analytics.data.chatComplete, class: 'stage-2' },
            { label: '영상 시청', value: Analytics.data.videoWatch, class: 'stage-3' },
            { label: '결제 시도', value: Analytics.data.payAttempt, class: 'stage-4' }
        ];

        container.innerHTML = stages.map(stage => {
            const pct = Math.round((stage.value / total) * 100);
            return `
                <div class="funnel-bar">
                    <span class="funnel-bar-label">${stage.label}</span>
                    <div class="funnel-bar-track">
                        <div class="funnel-bar-fill ${stage.class}" style="width: ${pct}%">
                            ${stage.value} (${pct}%)
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    renderRetargetList() {
        const container = document.getElementById('retargetList');
        container.innerHTML = FunnelConfig.retargetMessages.map(msg => `
            <div class="retarget-item">
                <div class="retarget-time">${msg.delay}</div>
                <div class="retarget-message">${msg.message}</div>
                <span class="retarget-status ${msg.status}">${msg.status === 'active' ? '활성' : '예약됨'}</span>
            </div>
        `).join('');
    },

    renderEventLog() {
        const container = document.getElementById('eventLog');
        if (Analytics.data.events.length === 0) {
            container.innerHTML = '<p style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 20px;">아직 이벤트가 없습니다</p>';
            return;
        }

        container.innerHTML = Analytics.data.events.slice(0, 20).map(event => `
            <div class="event-item">
                <span class="event-time">${event.time}</span>
                <span class="event-type ${event.type}">${event.type}</span>
                <span class="event-desc">${event.description}</span>
            </div>
        `).join('');
    }
};
