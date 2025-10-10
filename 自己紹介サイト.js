// ========================================
// Navigation
// ========================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// Active Navigation Link
// ========================================
const sections = document.querySelectorAll('.section');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section link
            // メモ：index.html以外のページでは"#home"などがないため、エラーを防ぐために存在チェックを入れる
            const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ========================================
// Smooth Scroll
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // 70pxはナビゲーションバーの高さ
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Fade In Animation on Scroll
// ========================================
const fadeElements = document.querySelectorAll('.fade-in-up');

const fadeObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            fadeObserver.unobserve(entry.target);
        }
    });
}, fadeObserverOptions);

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// --- Likeボタン機能 ---
document.addEventListener("DOMContentLoaded", () => {
    const likeButton = document.getElementById("like-button");
    const likeCount = document.getElementById("like-count");
    let count = 0;

    likeButton.addEventListener("click", () => {
        count++;
        likeCount.textContent = count;
        likeButton.style.backgroundColor = "#ffeb3b"; // 押したとき黄色に変化
        setTimeout(() => {
            likeButton.style.backgroundColor = "#f1f1f1";
        }, 300);
    });
});


// ========================================
// Contact Form
// ========================================
// メモ: このフォームはHTMLに入れていない　今後のタメ残す
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && message) {
            // Show success message (in a real application, you would send this to a server)
            alert(`ありがとうございます、${name}様!\n\nメッセージを受け取りました。できるだけ早くご連絡させていただきます。`);
            
            // Reset form
            contactForm.reset();
        } else {
            alert('すべてのフィールドを入力してください。');
        }
    });
}

// ========================================
// Parallax Effect for Hero Section
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
});

// ========================================
// Dynamic Year in Footer
// ========================================
// メモ: この要素は現在HTMLに存在しないため、エラー回避のために存在チェックを行う
const footerText = document.querySelector('.footer-text');
if (footerText) {
    const currentYear = new Date().getFullYear();
    footerText.textContent = `© ${currentYear} Takashi Goto. All rights reserved.`;
}

// ========================================
// Skill Cards Hover Effect
// ========================================
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderTopColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--secondary-color');
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderTopColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--accent-color');
    });
});

// ========================================
// Timeline Animation
// ========================================
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 200);
            timelineObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    timelineObserver.observe(item);
});

// ========================================
// Loading Animation
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// Image Slider 
// ========================================
const sliderTrack = document.getElementById('slider-track');
if (sliderTrack) {
    // スライダーのアイテムを複製して無限ループを実現
    const slideItems = Array.from(sliderTrack.children);
    slideItems.forEach(item => {
        const clone = item.cloneNode(true);
        sliderTrack.appendChild(clone);
    });
}

console.log('🚀 Website loaded successfully!');
console.log('👨‍💼 Takashi Goto Portfolio');
console.log('🌐 Bridging Cultures, Delivering Value');

