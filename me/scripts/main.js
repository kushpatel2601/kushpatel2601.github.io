/* ============================================================
   PORTFOLIO — MAIN JAVASCRIPT
   Starfield · Tilt · Typewriter · Counters · Scroll Reveal
   ============================================================ */

'use strict';

/* ============================================================
   0. THREE.JS 3D INTERACTIVE CANVAS SCENE
   ============================================================ */
(function init3DScene() {
  const canvas = document.getElementById('webgl-3d-scene');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /* Floating 3D Geometries */
  const group = new THREE.Group();
  scene.add(group);

  /* 1. Wireframe Icosahedron */
  const icoGeo = new THREE.IcosahedronGeometry(6, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const icoMesh = new THREE.Mesh(icoGeo, icoMat);
  icoMesh.position.set(-15, 8, -5);
  group.add(icoMesh);

  /* 2. Torus Knot */
  const torusGeo = new THREE.TorusKnotGeometry(4.5, 1.2, 80, 16);
  const torusMat = new THREE.MeshBasicMaterial({
    color: 0x06b6d4,
    wireframe: true,
    transparent: true,
    opacity: 0.22
  });
  const torusMesh = new THREE.Mesh(torusGeo, torusMat);
  torusMesh.position.set(18, -6, -8);
  group.add(torusMesh);

  /* 3. Octahedron */
  const octGeo = new THREE.OctahedronGeometry(5, 0);
  const octMat = new THREE.MeshBasicMaterial({
    color: 0xec4899,
    wireframe: true,
    transparent: true,
    opacity: 0.28
  });
  const octMesh = new THREE.Mesh(octGeo, octMat);
  octMesh.position.set(-12, -14, -2);
  group.add(octMesh);

  /* 4. Ambient 3D Particle Cloud */
  const particlesCount = 280;
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  const colorPalette = [
    new THREE.Color(0xa78bfa),
    new THREE.Color(0x67e8f9),
    new THREE.Color(0xfcd34d),
    new THREE.Color(0xf472b6)
  ];

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 80;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

    const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i * 3]     = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  const particlesGeo = new THREE.BufferGeometry();
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particlesMat = new THREE.PointsMaterial({
    size: 0.8,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particleSystem);

  /* Interactive Mouse & Scroll Parallax */
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
  }, { passive: true });

  let scrollY = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY * 0.01;
  }, { passive: true });

  function animate() {
    requestAnimationFrame(animate);

    /* Smooth Lerp Camera Tilt */
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    camera.position.x = targetX * 15;
    camera.position.y = -targetY * 15 - (scrollY * 0.15);
    camera.lookAt(scene.position);

    /* Rotate 3D Meshes */
    icoMesh.rotation.x += 0.004;
    icoMesh.rotation.y += 0.006;

    torusMesh.rotation.x -= 0.005;
    torusMesh.rotation.z += 0.007;

    octMesh.rotation.y += 0.008;
    octMesh.rotation.z -= 0.004;

    particleSystem.rotation.y += 0.0008;
    particleSystem.rotation.x = scrollY * 0.02;

    renderer.render(scene, camera);
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
})();


/* ============================================================
   1. STARFIELD CANVAS
   ============================================================ */
(function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx    = canvas.getContext('2d');
  let W, H, stars = [];
  let mouseX   = window.innerWidth  / 2;
  let mouseY   = window.innerHeight / 2;
  let tick     = 0;
  let rafId    = null;

  /* Colour palette for stars */
  const STAR_COLOURS = [
    '255,255,255',  /* white */
    '167,139,250',  /* purple */
    '103,232,249',  /* cyan */
    '251,191,36',   /* amber */
    '249,168,212',  /* pink */
  ];

  function randomColour() {
    return STAR_COLOURS[Math.floor(Math.random() * STAR_COLOURS.length)];
  }

  function makeStar() {
    return {
      x:            Math.random() * W,
      y:            Math.random() * H,
      size:         Math.random() * 1.6 + 0.2,
      baseOpacity:  Math.random() * 0.65 + 0.25,
      speed:        Math.random() * 0.25 + 0.04,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.018 + 0.004,
      parallax:     Math.random() * 0.45 + 0.08,
      colour:       randomColour(),
    };
  }

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initStars() {
    const count = Math.min(Math.floor((W * H) / 5500), 320);
    stars = Array.from({ length: count }, makeStar);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    tick++;

    /* Parallax offset from mouse */
    const ox = ((mouseX / W) - 0.5) * 28;
    const oy = ((mouseY / H) - 0.5) * 28;

    for (const s of stars) {
      const twinkle  = Math.sin(tick * s.twinkleSpeed + s.twinklePhase);
      const opacity  = s.baseOpacity * (0.55 + 0.45 * twinkle);
      const px       = s.x + ox * s.parallax;
      const py       = s.y + oy * s.parallax;

      /* Core dot */
      ctx.beginPath();
      ctx.arc(px, py, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.colour},${opacity})`;
      ctx.fill();

      /* Subtle halo for bigger stars */
      if (s.size > 1.1) {
        ctx.beginPath();
        ctx.arc(px, py, s.size * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.colour},${opacity * 0.08})`;
        ctx.fill();
      }

      /* Drift upward */
      s.y -= s.speed;
      if (s.y < -3) {
        s.y = H + 3;
        s.x = Math.random() * W;
      }
    }

    rafId = requestAnimationFrame(draw);
  }

  /* Track mouse for parallax */
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  /* Handle resize */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      initStars();
    }, 150);
  });

  /* Boot */
  resize();
  initStars();
  draw();
})();


/* ============================================================
   2. NAVBAR — scroll class + active link highlighting
   ============================================================ */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');

  function onScroll() {
    /* Scroll class */
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    /* Active link */
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) {
        current = sec.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); /* run once on load */
})();


/* ============================================================
   3. HAMBURGER MENU (mobile)
   ============================================================ */
(function initHamburger() {
  const btn       = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!btn || !navLinks) return;

  function toggle() {
    const open = navLinks.classList.toggle('open');
    btn.classList.toggle('active', open);
    btn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  function close() {
    navLinks.classList.remove('open');
    btn.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', toggle);

  /* Close when a link is clicked */
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', close);
  });

  /* Close on Escape key */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();


/* ============================================================
   4. TYPEWRITER EFFECT
   ============================================================ */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const PHRASES = [
    'AI-Powered Systems',
    'Full-Stack Apps',
    'Rapid MVPs',
    'Hackathon Projects',
    'Computer Vision Apps',
    'Smart Solutions',
  ];

  let phraseIdx  = 0;
  let charIdx    = 0;
  let deleting   = false;
  let timer      = null;

  function tick() {
    const phrase = PHRASES[phraseIdx];

    if (deleting) {
      el.textContent = phrase.slice(0, --charIdx);
    } else {
      el.textContent = phrase.slice(0, ++charIdx);
    }

    let delay = deleting ? 45 : 95;

    if (!deleting && charIdx === phrase.length) {
      delay    = 2000;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting  = false;
      phraseIdx = (phraseIdx + 1) % PHRASES.length;
      delay     = 500;
    }

    timer = setTimeout(tick, delay);
  }

  /* Delay first run until hero animation settles */
  setTimeout(tick, 1600);
})();


/* ============================================================
   5. SCROLL-REVEAL (IntersectionObserver)
   ============================================================ */
(function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      /* Stagger siblings so they animate in sequence */
      const parent   = entry.target.parentElement;
      const siblings = Array.from(parent.querySelectorAll('.reveal:not(.visible)'));
      const idx      = siblings.indexOf(entry.target);
      const delay    = Math.max(0, idx * 90);

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => observer.observe(el));
})();


/* ============================================================
   6. ANIMATED COUNTERS
   ============================================================ */
(function initCounters() {
  const statsGrid = document.getElementById('stats-grid');
  if (!statsGrid) return;

  let fired = false;

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start    = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      /* Ease out cubic */
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !fired) {
        fired = true;
        statsGrid.querySelectorAll('[data-target]').forEach(animateCounter);
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsGrid);
})();


/* ============================================================
   7. 3D CARD TILT EFFECT
   ============================================================ */
(function initTilt() {
  const ROTATION = 9; /* max degrees of tilt */

  function applyTilt(card, e) {
    const rect    = card.getBoundingClientRect();
    const x       = e.clientX - rect.left;
    const y       = e.clientY - rect.top;
    const cx      = rect.width  / 2;
    const cy      = rect.height / 2;
    const rotX    = ((y - cy) / cy) * -ROTATION;
    const rotY    = ((x - cx) / cx) *  ROTATION;

    card.style.transform =
      `perspective(1100px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(12px)`;
  }

  function resetTilt(card) {
    card.style.transform =
      'perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  }

  function bindCard(card) {
    let raf;

    card.addEventListener('mousemove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => applyTilt(card, e));
    });

    card.addEventListener('mouseleave', () => {
      cancelAnimationFrame(raf);
      resetTilt(card);
    });

    /* Disable tilt on touch devices (bad UX) */
    card.addEventListener('touchstart', () => resetTilt(card), { passive: true });
  }

  /* Bind now */
  document.querySelectorAll('.tilt-card').forEach(bindCard);

  /* Also bind cards added after initial load (e.g., if dynamically injected) */
  const mo = new MutationObserver(muts => {
    muts.forEach(m => {
      m.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        if (node.classList.contains('tilt-card')) bindCard(node);
        node.querySelectorAll('.tilt-card').forEach(bindCard);
      });
    });
  });
  mo.observe(document.body, { childList: true, subtree: true });
})();


/* ============================================================
   8. CONTACT FORM — real email submit via FormSubmit API
   ============================================================ */
(function initContactForm() {
  const form    = document.getElementById('contact-form');
  const btnText = document.getElementById('btn-text');
  const btnIcon = document.getElementById('btn-icon');
  const submitBtn = document.getElementById('form-submit');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput    = document.getElementById('form-name');
    const emailInput   = document.getElementById('form-email');
    const messageInput = document.getElementById('form-message');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      btnText.textContent = '⚠️ Please fill all fields';
      setTimeout(() => { btnText.textContent = 'Send Message'; }, 2000);
      return;
    }

    /* Disable & show loading */
    submitBtn.disabled = true;
    btnText.textContent = 'Sending…';
    if (btnIcon) btnIcon.style.display = 'none';

    try {
      const response = await fetch('https://formsubmit.co/ajax/kushp8484@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: nameInput.value,
          email: emailInput.value,
          message: messageInput.value,
          _subject: `New Portfolio Message from ${nameInput.value}`
        })
      });

      if (response.ok) {
        btnText.textContent = '✅ Message Sent!';
        form.reset();
      } else {
        btnText.textContent = '❌ Error sending. Try again.';
      }
    } catch (err) {
      console.error('Form submission error:', err);
      btnText.textContent = '❌ Failed to send';
    } finally {
      setTimeout(() => {
        btnText.textContent = 'Send Message';
        if (btnIcon) btnIcon.style.display = '';
        submitBtn.disabled = false;
      }, 3000);
    }
  });
})();


/* ============================================================
   9. SMOOTH SCROLL for anchor links
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const id     = this.getAttribute('href');
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();


/* ============================================================
   10. CURSOR GLOW TRAIL (subtle pointer effect)
   ============================================================ */
(function initCursorGlow() {
  /* Skip on touch / mobile */
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%);
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 1;
    transition: opacity 0.3s ease;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  let tx = -300, ty = -300;
  let cx = -300, cy = -300;
  let raf;

  document.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  function animateGlow() {
    /* Lerp for smooth lag */
    cx += (tx - cx) * 0.1;
    cy += (ty - cy) * 0.1;
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    raf = requestAnimationFrame(animateGlow);
  }

  animateGlow();
})();


/* ============================================================
   11. MAGNETIC 3D CURSOR INTERACTION
   ============================================================ */
(function initMagnetic3D() {
  const elements = document.querySelectorAll('.btn, .social-btn, .project-link, .hero-badge');
  if (!elements.length) return;

  elements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      if (typeof gsap !== 'undefined') {
        gsap.to(el, {
          x: x * 0.35,
          y: y * 0.35,
          rotateX: -y * 0.15,
          rotateY: x * 0.15,
          duration: 0.4,
          ease: 'power2.out'
        });
      } else {
        el.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 10px) rotateX(${-y * 0.1}deg) rotateY(${x * 0.1}deg)`;
      }
    });

    el.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(el, {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)'
        });
      } else {
        el.style.transform = 'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)';
      }
    });
  });
})();
