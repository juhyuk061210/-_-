/**
 * 1단계: 사전 자격 심사 챗봇 (ManyChat 스타일)
 */
const ChatBot = {
    messagesEl: null,
    inputAreaEl: null,
    currentStep: null,

    init() {
        this.messagesEl = document.getElementById('chatMessages');
        this.inputAreaEl = document.getElementById('chatInputArea');
        this.startConversation();
    },

    startConversation() {
        const firstStep = FunnelConfig.chatScenario.find(s => s.id === 'welcome');
        this.showStep(firstStep);
    },

    showStep(step) {
        if (!step) return;
        this.currentStep = step;

        // 타이핑 인디케이터 표시
        this.showTyping();

        setTimeout(() => {
            this.removeTyping();
            this.addBotMessage(step.bot);

            // 옵션 버튼 표시
            setTimeout(() => {
                this.showOptions(step.options);
            }, 300);
        }, 1000 + Math.random() * 500);
    },

    showTyping() {
        const typing = document.createElement('div');
        typing.className = 'chat-typing';
        typing.id = 'typingIndicator';
        typing.innerHTML = '<span></span><span></span><span></span>';
        this.messagesEl.appendChild(typing);
        this.scrollToBottom();
    },

    removeTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    },

    addBotMessage(text) {
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble bot';
        bubble.textContent = text;
        this.messagesEl.appendChild(bubble);
        this.scrollToBottom();
    },

    addUserMessage(text) {
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble user';
        bubble.textContent = text;
        this.messagesEl.appendChild(bubble);
        this.scrollToBottom();
    },

    showOptions(options) {
        this.inputAreaEl.innerHTML = '';
        options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.textContent = option.text;
            btn.addEventListener('click', () => this.handleOption(option));
            this.inputAreaEl.appendChild(btn);
        });
    },

    handleOption(option) {
        // 유저 메시지 추가
        this.addUserMessage(option.text);
        // 옵션 버튼 제거
        this.inputAreaEl.innerHTML = '';

        // 이벤트 로그
        Analytics.logEvent('chat', `선택: "${option.text}"`);

        if (option.next === 'complete') {
            // 챗봇 완료 → VSL 페이지로 전환
            Analytics.trackChatComplete();
            setTimeout(() => {
                this.addBotMessage('좋아요! 지금 바로 영상을 보여드릴게요. 화면이 전환됩니다.');
                setTimeout(() => {
                    Funnel.showVSLPage();
                }, 1500);
            }, 800);
        } else {
            // 다음 단계로 이동
            const nextStep = FunnelConfig.chatScenario.find(s => s.id === option.next);
            setTimeout(() => {
                this.showStep(nextStep);
            }, 500);
        }
    },

    scrollToBottom() {
        this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
    }
};
