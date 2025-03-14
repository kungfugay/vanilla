// common.js
const accessModal = {
    init: function() {
        this.bindEvents();
        this.checkCookie();
    },
    bindEvents: function() {
        const $modal = $('.modal');
        const $submitBtn = $('#submit-btn');
        const $passwordInput = $('#password');
        const $closeBtn = $('#close-btn');

        // 모달 열기 버튼 클릭 시
        $('.btn-open-modal').on('click', () => {
            $modal.css('display', 'flex'); // 모달 창 열기
            $modal.find('.modal_body').css('animation', 'bounceIn 0.5s forwards'); // 애니메이션 재설정
        });

        // 닫기 버튼 클릭 시 브라우저 뒤로가기
        $closeBtn.on('click', () => {
            window.history.back(); // 브라우저 뒤로 가기
        });

        // 제출 버튼 클릭 시
        $submitBtn.on('click', () => {
            const inputValue = $passwordInput.val(); // 사용자 입력값 가져오기
            if (inputValue === '공주') {
                const cookieValue = this.generateUniqueCookieValue(); // 고유값 생성
                this.setCookie('accessKey', cookieValue, 1); // 쿠키 설정 (24시간 유효)
                alert('Welcome!'); // 알림
                $modal.css('display', 'none'); // 모달 닫기
            } else {
                alert('Are you sure?'); // 알림
            }
        });
    },
    checkCookie: function() {
        const cookies = document.cookie.split('; ');
        if (!cookies.some(cookie => cookie.startsWith('accessKey='))) {
            $('.modal').css('display', 'flex'); // 모달 창 열기
        }
    },
    setCookie: function(name, value, days) {
        const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `${name}=${value}; expires=${expires}; path=/`;
    },
    generateUniqueCookieValue: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
};

// 페이지가 로드될 때 초기화
$(document).ready(function() {
    accessModal.init();
});