/**
 * 앱 초기화
 */
document.addEventListener('DOMContentLoaded', () => {
    // 분석 초기화
    Analytics.init();

    // 챗봇 시작
    ChatBot.init();

    // 남은 자리 수 감소 효과
    Funnel.decrementSpots();
});
