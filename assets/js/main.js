document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

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

const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
if (mobileNavToggle) {
  mobileNavToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('navmenu-open');
    mobileNavToggle.setAttribute('aria-expanded', String(isOpen));
    const icon = mobileNavToggle.querySelector('i');
    if (icon) icon.className = isOpen ? 'bi bi-x' : 'bi bi-list';
  });
}

const typedElement = document.querySelector('.typed');
if (typedElement) {
  const roles = ['Flutter Developer', 'Mobile App Developer', 'Lead Management Specialist'];
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
      }, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(type, isDeleting ? 50 : 100);
  }

  type();
}

let scrollTop = document.querySelector('.scroll-top');

function toggleScrollTop() {
  if (scrollTop) {
    window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
  }
}

if (scrollTop) {
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

window.addEventListener('load', toggleScrollTop);
document.addEventListener('scroll', toggleScrollTop);

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
