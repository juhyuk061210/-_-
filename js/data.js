/**
 * VSL 퍼널 데이터 설정
 * 실제 운영 시 이 파일의 값들을 수정하세요
 */
const FunnelConfig = {
    // 상품 정보
    product: {
        name: '수익화 마스터 패키지',
        price: 490000,
        originalValue: 4155000,
        installmentMonths: 12,
        get monthlyPayment() {
            return Math.ceil(this.price / this.installmentMonths);
        }
    },

    // 챗봇 대화 시나리오
    chatScenario: [
        {
            id: 'welcome',
            bot: '안녕하세요! 릴스에서 오셨군요 🙌\n\n자료를 드리기 전에, 현재 상황을 간단히 알려주시겠어요?',
            options: [
                { text: '콘텐츠는 만드는데 수익화가 안 돼요', next: 'content_creator' },
                { text: '처음 시작하는데 방법을 모르겠어요', next: 'beginner' },
                { text: '이미 수익이 있는데 더 키우고 싶어요', next: 'experienced' }
            ]
        },
        {
            id: 'content_creator',
            bot: '그렇군요! 콘텐츠는 잘 만드시는데 수익 전환이 안 되는 거죠.\n\n이건 시스템의 문제입니다. 대부분의 크리에이터가 겪는 1번 고민이에요.',
            options: [
                { text: '맞아요, 조회수는 나오는데...', next: 'solution' },
                { text: '수익화 방법이 너무 많아서 헷갈려요', next: 'solution' }
            ]
        },
        {
            id: 'beginner',
            bot: '시작이 반이에요! 사실 처음부터 올바른 구조를 세우면 시행착오를 90% 줄일 수 있습니다.',
            options: [
                { text: '어떤 구조인지 궁금해요', next: 'solution' },
                { text: '바로 배울 수 있을까요?', next: 'solution' }
            ]
        },
        {
            id: 'experienced',
            bot: '대단하시네요! 이미 수익이 있으시다면 자동화 퍼널만 추가해도 매출이 2~3배 뛰어요.',
            options: [
                { text: '자동화 퍼널이 뭔가요?', next: 'solution' },
                { text: '구체적인 방법을 알고 싶어요', next: 'solution' }
            ]
        },
        {
            id: 'solution',
            bot: '작가인 제가 직접 겪으며 만든 해결책을 15분 영상으로 정리했습니다.\n\n이 영상 하나로 "릴스 조회수 → 실제 매출"로 바꾸는 전체 시스템을 보여드릴게요.\n\n지금 바로 확인하시겠어요?',
            options: [
                { text: '네, 바로 보여주세요!', next: 'complete' },
                { text: '좀 더 알려주세요', next: 'more_info' }
            ]
        },
        {
            id: 'more_info',
            bot: '이 시스템으로 실제 수강생분들이 첫 달부터 월 1,000만 원 이상의 수익을 만들고 계세요.\n\n영상에서 구체적인 방법과 실제 수익 인증까지 모두 공개합니다.',
            options: [
                { text: '영상 보러 갈게요!', next: 'complete' }
            ]
        }
    ],

    // 리타겟팅 알림톡 메시지
    retargetMessages: [
        {
            delay: '1시간 후',
            delayMs: 8000,   // 데모용 (실제는 3600000)
            title: '카카오 알림톡',
            message: '결제 중 문제가 있었나요? 작가 XX에게 1:1 카톡으로 편하게 상담하세요.',
            status: 'active'
        },
        {
            delay: '24시간 후',
            delayMs: 20000,  // 데모용
            title: '카카오 알림톡',
            message: '함께 공부할 템플릿 배송 물량이 10개 남았습니다. 서두르세요!',
            status: 'scheduled'
        },
        {
            delay: '48시간 후',
            delayMs: 35000,  // 데모용
            title: '카카오 알림톡',
            message: '실제 수익 인증 사례 모음집을 확인하세요. 수강생들의 진짜 후기입니다.',
            status: 'scheduled'
        }
    ],

    // 카운트다운 시간 (시, 분, 초)
    countdown: {
        hours: 2,
        minutes: 47,
        seconds: 33
    },

    // 남은 자리 수
    remainingSpots: 23,

    // 동시 접속자 수 (랜덤 범위)
    viewerCount: {
        min: 780,
        max: 920
    }
};
