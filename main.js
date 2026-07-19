
// ============================================
// HOTEL TERME LEONARDO — Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {

  // ====== MOBILE MENU ======
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMobile = document.querySelector('.nav-mobile');

  if (mobileToggle && navMobile) {
    mobileToggle.addEventListener('click', () => {
      navMobile.classList.toggle('open');
      mobileToggle.textContent = navMobile.classList.contains('open') ? '✕' : '☰';
    });

    // Close mobile menu on link click
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('open');
        mobileToggle.textContent = '☰';
      });
    });
  }

  // ====== HEADER SCROLL EFFECT ======
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
  });

  // ====== SCROLL REVEAL ANIMATIONS ======
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeElements.forEach(el => observer.observe(el));

  // ====== COOKIE BANNER ======
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAccept = document.getElementById('cookie-accept');
  const cookieReject = document.getElementById('cookie-reject');

  if (cookieBanner && !localStorage.getItem('cookies-consent')) {
    setTimeout(() => cookieBanner.classList.add('show'), 1500);
  }

  if (cookieAccept) {
    cookieAccept.addEventListener('click', () => {
      localStorage.setItem('cookies-consent', 'accepted');
      cookieBanner.classList.remove('show');
    });
  }

  if (cookieReject) {
    cookieReject.addEventListener('click', () => {
      localStorage.setItem('cookies-consent', 'rejected');
      cookieBanner.classList.remove('show');
    });
  }

  // ====== BOOKING BAR ======
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const arrival = document.getElementById('arrival').value;
      const departure = document.getElementById('departure').value;
      const adults = document.getElementById('adults').value;
      const children = document.getElementById('children').value;

      if (!arrival || !departure) {
        alert('Seleziona le date di arrivo e partenza');
        return;
      }

      const url = `https://www.termeleonardo.com/it/booking/rooms-available?rooms=1&arrival=${arrival}&departure=${departure}&adults1=${adults}&children1=${children}`;
      window.open(url, '_blank');
    });
  }

  // ====== NEWSLETTER ======
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      if (email) {
        alert('Grazie per l'iscrizione! Ti terremo aggiornato sulle nostre offerte.');
        this.reset();
      }
    });
  }

  // ====== SMOOTH SCROLL FOR ANCHORS ======
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ====== GALLERY LIGHTBOX (simple) ======
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const bg = item.style.backgroundImage;
      if (bg) {
        const imgUrl = bg.replace(/url\(["']?/, '').replace(/["']?\)/, '');
        window.open(imgUrl, '_blank');
      }
    });
  });

});
