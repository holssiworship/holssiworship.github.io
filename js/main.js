// 페이지 로딩 시 애니메이션
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loading-fade');
    
    // 스크롤 애니메이션 준비
    const animatedSections = document.querySelectorAll('section');
    animatedSections.forEach(section => {
        section.classList.add('section-animate');
    });
    
    // 초기 로드시 보이는 섹션들에 애니메이션 적용
    checkSectionVisibility();
});

// 스크롤 애니메이션
function checkSectionVisibility() {
    const animatedSections = document.querySelectorAll('.section-animate');
    const windowHeight = window.innerHeight;
    
    animatedSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight * 0.8) {
            section.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkSectionVisibility);

// 모바일 메뉴 기능
const hamburgerBtn = document.getElementById("hamburger-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuCloseBtn = document.getElementById("mobile-menu-close-btn");
const mobileMenuLinks = mobileMenu.querySelectorAll("a");
const navLinks = document.querySelectorAll('header nav a');
const sections = document.querySelectorAll('section');

function toggleMobileMenu() {
    mobileMenu.classList.toggle("hidden");
}

hamburgerBtn.addEventListener("click", toggleMobileMenu);
mobileMenuCloseBtn.addEventListener("click", toggleMobileMenu);
mobileMenuLinks.forEach(link => {
    link.addEventListener("click", toggleMobileMenu);
});

document.addEventListener('click', (event) => {
    if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(event.target) && event.target !== hamburgerBtn) {
        toggleMobileMenu();
    }
});

// 활성 네비게이션 링크 업데이트
function updateActiveNavLink() {
    let currentSectionId = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active', 'text-primary', 'font-bold');
        if (link.getAttribute('href').slice(1) === currentSectionId) {
            link.classList.add('active', 'text-primary', 'font-bold');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// 스무스 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 문의 폼 제출 처리
const contactForm = document.getElementById('contact-form');
const formSubmitButton = document.getElementById('form-submit-btn');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // 폼 기본 제출 방지
        
        // 폼 데이터 수집
        const formData = {
            inquiry_title: document.getElementById('inquiry_title').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value || "연락처 없음", // 연락처가 없을 경우 기본값 설정
            message: document.getElementById('message').value,
            contact_source: 'holssiworship.github.io'
        };
        
        // 폼 유효성 검사
        if (!formData.inquiry_title || !formData.email || !formData.message) {
            formStatus.textContent = '제목, 이메일, 문의 내용은 필수 입력 항목입니다.';
            formStatus.className = 'mt-4 text-red-500';
            return;
        }
        
        // 이메일 형식 검사
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            formStatus.textContent = '유효한 이메일 주소를 입력해주세요.';
            formStatus.className = 'mt-4 text-red-500';
            return;
        }
        
        // 버튼 비활성화 및 로딩 표시
        formSubmitButton.disabled = true;
        formSubmitButton.innerHTML = '<span class="animate-pulse">전송 중...</span>';
        
        // 상태 메시지 표시
        formStatus.textContent = '문의를 전송 중입니다...';
        formStatus.className = 'mt-4 text-primary';
        
        // reCAPTCHA v2 검증
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            formStatus.textContent = '로봇이 아님을 인증해주세요.';
            formStatus.className = 'mt-4 text-red-500';
            
            // 버튼 상태 복원
            formSubmitButton.disabled = false;
            formSubmitButton.innerHTML = '문의하기';
            return;
        }
        
        // reCAPTCHA 토큰을 포함한 템플릿 파라미터
        const templateParams = {
            subject: formData.inquiry_title,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            contact_source: formData.contact_source,
            'g-recaptcha-response': recaptchaResponse  // reCAPTCHA 토큰 추가
        };
        
        // EmailJS로 이메일 전송
        emailjs.send('service_2jixwit', 'template_krrg5f9', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                formStatus.textContent = '문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변 드리겠습니다.';
                formStatus.className = 'mt-4 text-green-600';
                
                // 폼 초기화
                contactForm.reset();
                
                // reCAPTCHA 초기화
                grecaptcha.reset();
                
                // 버튼 상태 복원
                formSubmitButton.disabled = false;
                formSubmitButton.innerHTML = '문의하기';
                
                // 5초 후에 상태 메시지 숨기기
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            })
            .catch(function(error) {
                console.error('이메일 전송 실패:', error);
                formStatus.textContent = '이메일 전송 중 오류가 발생했습니다. 다시 시도해주세요.';
                formStatus.className = 'mt-4 text-red-500';
                
                // reCAPTCHA 초기화
                grecaptcha.reset();
                
                // 버튼 상태 복원
                formSubmitButton.disabled = false;
                formSubmitButton.innerHTML = '문의하기';
            });
        });
    });
}

// 이미지 갤러리 기능
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        // 갤러리 모달 표시 로직을 여기에 추가할 수 있습니다.
    });
});
