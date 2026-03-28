/* ============================================
   VIKUL TYAGI – PREMIUM PORTFOLIO JS
   ============================================ */

// ===== Page Loader =====
window.addEventListener('load', () => {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 600);
    setTimeout(() => loader.remove(), 1100);
  }
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    // Close mobile nav
    document.body.classList.remove('navmenu-open');
    const toggleButton = document.querySelector('.mobile-nav-toggle');
    if (toggleButton) {
      toggleButton.setAttribute('aria-expanded', 'false');
      const icon = toggleButton.querySelector('i');
      if (icon) icon.className = 'bi bi-list';
    }

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// ===== Mobile Navigation Toggle =====
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
if (mobileNavToggle) {
  mobileNavToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('navmenu-open');
    mobileNavToggle.setAttribute('aria-expanded', String(isOpen));
    const icon = mobileNavToggle.querySelector('i');
    if (icon) icon.className = isOpen ? 'bi bi-x' : 'bi bi-list';
  });
}

// ===== Typing Animation (Enhanced) =====
const typedElement = document.querySelector('.typed');
if (typedElement) {
  const roles = [
    'Flutter Developer',
    'Mobile App Developer',
    'Lead Management Specialist',
    'UI/UX Enthusiast'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      setTimeout(() => {
        isDeleting = true;
      }, 2200);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(type, isDeleting ? 40 : 90);
  }

  // Delay start for loader
  setTimeout(type, 800);
}

// ===== Scroll-to-top Button =====
const scrollTop = document.querySelector('.scroll-top');

function toggleScrollTop() {
  if (scrollTop) {
    window.scrollY > 200 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
  }
}

if (scrollTop) {
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

window.addEventListener('load', toggleScrollTop);
document.addEventListener('scroll', toggleScrollTop);

// ===== Active Nav Link on Scroll =====
const navLinks = document.querySelectorAll('.navmenu a');

function updateActiveLink() {
  navLinks.forEach(link => {
    if (!link.hash) return;
    const section = document.querySelector(link.hash);
    if (!section) return;

    const position = window.scrollY + 200;
    if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

window.addEventListener('load', updateActiveLink);
document.addEventListener('scroll', updateActiveLink);

// ===== Header Scroll Effect =====
const header = document.querySelector('.header');

function updateHeader() {
  if (header) {
    window.scrollY > 50 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateHeader);
window.addEventListener('load', updateHeader);

// ===== Scroll-Triggered Animations (IntersectionObserver) =====
const animateElements = document.querySelectorAll('.animate-on-scroll');

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // Once animated, stop observing
      animationObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

animateElements.forEach(el => animationObserver.observe(el));

// ===== Progress Bar Animation on Scroll =====
const progressBars = document.querySelectorAll('.progress-bar');

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const targetWidth = bar.getAttribute('data-width') || bar.style.width;
      bar.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bar.style.width = targetWidth;
          bar.classList.add('animated');
        });
      });
      progressObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

progressBars.forEach(bar => {
  // Store original width and reset
  bar.setAttribute('data-width', bar.style.width);
  bar.style.width = '0%';
  progressObserver.observe(bar);
});

// ===== Counter Animation for Stats =====
const statItems = document.querySelectorAll('.stat-item h4');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent.trim();
      const match = text.match(/(\d+)/);
      if (match) {
        const target = parseInt(match[1]);
        const suffix = text.replace(match[1], '');
        let current = 0;
        const increment = Math.max(1, Math.floor(target / 40));
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 30);
      }
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statItems.forEach(el => counterObserver.observe(el));

// ===== Floating Particles Canvas =====
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouseX = 0, mouseY = 0;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.4 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Gentle mouse attraction
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        this.x += dx * 0.001;
        this.y += dy * 0.001;
      }

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108, 99, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  // Create particles
  const particleCount = Math.min(60, Math.floor(window.innerWidth / 25));
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Track mouse
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(108, 99, 255, ${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}

// ===== Cursor Glow Effect =====
const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow && window.innerWidth > 991) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
}

// ===== Tilt Effect on Project Cards =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 991) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -3;
    const rotateY = (x - centerX) / centerX * 3;
    card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== Magnetic Hover for Social Links =====
document.querySelectorAll('.social-links a').forEach(link => {
  link.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 991) return;
    const rect = link.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    link.style.transform = `translateY(-4px) translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  link.addEventListener('mouseleave', () => {
    link.style.transform = '';
  });
});

console.log('✨ Vikul Tyagi Portfolio — Loaded');
