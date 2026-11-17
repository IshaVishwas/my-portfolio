/**
 * Antigravity - Interactive Portfolio Engine
 * Author: Antigravity AI
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render data from centralized single source of truth (portfolio-data.js)
  if (typeof PORTFOLIO_DATA !== 'undefined') {
    renderPortfolio(PORTFOLIO_DATA);
  }

  // 2. Initialize visual and interactive systems
  initParticles();
  initTiltEffect();
  initScrollReveal();
  initNavbarScroll();
});

/* ==========================================================================
   0. Centralized Portfolio Dynamic Renderer
   ========================================================================== */
function renderPortfolio(data) {
  if (!data) return;

  // 1. Profile Summary & Hero Objective
  const heroObjective = document.getElementById('hero-objective');
  if (heroObjective && data.personalInfo && data.personalInfo.summary) {
    heroObjective.textContent = data.personalInfo.summary;
  }

  // 2. Global Resume Links & Buttons
  if (data.personalInfo && data.personalInfo.resumePdf) {
    const resumePath = data.personalInfo.resumePdf;
    document.querySelectorAll('.resume-view-btn').forEach(btn => {
      btn.setAttribute('href', resumePath);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    });
    document.querySelectorAll('.resume-download-btn').forEach(btn => {
      btn.setAttribute('href', resumePath);
      btn.setAttribute('download', resumePath);
    });
  }

  // 3. Academic Pathway Timeline (Chronological: 10th -> 12th -> B.Tech)
  const educationTimeline = document.getElementById('education-timeline');
  if (educationTimeline && Array.isArray(data.education)) {
    educationTimeline.innerHTML = data.education.map(item => `
      <div class="timeline-node">
        <div class="timeline-dot"></div>
        <div class="timeline-card glass-card">
          <span class="timeline-tag"><i class="${item.tagIcon || 'fa-solid fa-graduation-cap'}"></i> ${item.tag}</span>
          <h3 class="timeline-degree">${item.degree}</h3>
          <p class="timeline-institution">
            ${item.id === 'undergraduate' ? '<i class="fa-solid fa-location-dot"></i> ' : ''}${item.institution}
            ${item.board && item.id !== 'undergraduate' ? `<span class="timeline-badge-board">${item.board}</span>` : ''}
          </p>
          <p class="timeline-score"><i class="fa-solid fa-award"></i> ${item.score}</p>
          <p class="timeline-duration"><i class="fa-regular fa-calendar"></i> ${item.duration}</p>
        </div>
      </div>
    `).join('');
  }

  // 4. Experience & Internships (Xebia first, then Arsalley)
  const experienceGrid = document.getElementById('experience-grid');
  if (experienceGrid && Array.isArray(data.experience)) {
    experienceGrid.innerHTML = data.experience.map(exp => `
      <div class="experience-card glass-card">
        <div class="card-header-wrapper">
          <span class="experience-tag"><i class="${exp.tagIcon || 'fa-solid fa-briefcase'}"></i> ${exp.tag}</span>
          <h3 class="experience-card-title">${exp.role}</h3>
          <h4 class="experience-card-subtitle">${exp.company}</h4>
          <p class="experience-duration"><i class="fa-regular fa-calendar"></i> ${exp.duration}</p>
        </div>
        <ul class="experience-bullets">
          ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
        ${exp.certificateUrl ? `
          <a href="${exp.certificateUrl}" target="_blank" rel="noopener noreferrer" class="outline-btn">
            View Certificate <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        ` : ''}
      </div>
    `).join('');
  }

  // 5. Featured Projects (Deepfake Detection System & Dynamic Context Compression Engine)
  const projectContainer = document.getElementById('project-container');
  if (projectContainer && Array.isArray(data.projects)) {
    projectContainer.innerHTML = data.projects.map(proj => `
      <div class="project-card glass-card">
        <div class="project-header">
          <div class="project-title-wrapper">
            <h3 class="project-title">${proj.title}</h3>
            ${proj.badge ? `
              <span class="badge-copyright">
                <i class="${proj.badgeIcon || 'fa-solid fa-shield-halved'}"></i> ${proj.badge}
              </span>
            ` : ''}
          </div>
        </div>
        <div class="project-tech-tags">
          ${proj.techStack.map(tech => `<span class="tag-project">${tech}</span>`).join('')}
        </div>
        <ul class="project-bullets">
          ${proj.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  // 6. Technical Skills Matrix (Exact 6 categories from resume)
  const techGrid = document.getElementById('tech-grid');
  if (techGrid && Array.isArray(data.technicalSkills)) {
    techGrid.innerHTML = data.technicalSkills.map(cat => `
      <div class="tech-card glass-card">
        <div class="tech-card-header">
          <i class="${cat.icon || 'fa-solid fa-code'} tech-icon"></i>
          <h3 class="tech-card-title">${cat.category}</h3>
        </div>
        <div class="tech-pills">
          ${cat.skills.map(skill => `<span class="tech-pill">${skill}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   1. Interactive Cosmic Canvas Particle System
   ========================================================================== */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  // Theme colors
  const colors = [
    'rgba(0, 242, 254, ',  // Cyan base
    'rgba(157, 78, 221, ', // Purple base
    'rgba(255, 255, 255, '  // White base
  ];

  // Adjust canvas bounds
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.5; // Small, crisp stars
      this.colorBase = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.5 + 0.1;
      this.speedX = (Math.random() - 0.5) * 0.15; // Slow drift
      this.speedY = -Math.random() * 0.2 - 0.05;  // Floating upwards
      this.glow = Math.random() > 0.8; // Some particles will glow
      this.pulseDirection = Math.random() > 0.5 ? 1 : -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.colorBase + this.alpha + ')';
      
      if (this.glow) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.colorBase === colors[0] ? '#00f2fe' : '#9d4edd';
      } else {
        ctx.shadowBlur = 0;
      }
      
      ctx.fill();
    }

    update() {
      // Basic cosmic drift (weightless movement)
      this.x += this.speedX;
      this.y += this.speedY;

      // Pulse alpha for starry twinkling
      this.alpha += 0.005 * this.pulseDirection;
      if (this.alpha >= 0.7 || this.alpha <= 0.1) {
        this.pulseDirection *= -1;
      }

      // Wrap around screen boundaries
      if (this.y < -10) {
        this.y = canvas.height + 10;
        this.x = Math.random() * canvas.width;
      }
      if (this.x < -10 || this.x > canvas.width + 10) {
        this.speedX *= -1;
      }

      // Mouse interactive push/pull
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.hypot(dx, dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          
          // Gently push particles away from cursor (anti-gravitational effect)
          this.x -= Math.cos(angle) * force * 1.5;
          this.y -= Math.sin(angle) * force * 1.5;
        }
      }
    }
  }

  function createParticles() {
    particles = [];
    // Adjust particle density based on screen resolution
    const density = Math.min(Math.floor((canvas.width * canvas.height) / 11000), 120);
    for (let i = 0; i < density; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Reset shadow parameters to avoid impact on other canvas actions
    ctx.shadowBlur = 0;
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    requestAnimationFrame(animate);
  }

  // Handle inputs
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Init
  resizeCanvas();
  animate();
}

/* ==========================================================================
   2. Weightless Parallax Tilt Effect for Cards
   ========================================================================== */
function initTiltEffect() {
  const cards = document.querySelectorAll('.glass-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x coordinate within element
      const y = e.clientY - rect.top;  // y coordinate within element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation strength (max 7 degrees)
      const rotateX = ((centerY - y) / centerY) * 7;
      const rotateY = ((x - centerX) / centerX) * 7;
      
      // Render transform
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      // Smoothly return card to base floating height
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* ==========================================================================
   3. Scroll Reveal Animation (Zero-Gravity Entrance)
   ========================================================================== */
function initScrollReveal() {
  const sections = document.querySelectorAll('.section-entrance');
  
  // Style config for smooth fade & rise
  sections.forEach(s => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(25px)';
    s.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  sections.forEach(s => revealObserver.observe(s));
}

/* ==========================================================================
   4. Floating Navbar Scroll Tracking and Active State
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('#about, #education, #experience, #tech-stack, #projects, #contact');

  if (!navbar) return;

  // Add scroll class to navbar for visual transitions and handle bottom-of-page contact link tracking
  function handleScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    const isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 60;
    if (isAtBottom) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === '#contact') {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once at init

  // Track active section via IntersectionObserver
  const options = {
    root: null,
    threshold: 0.2,
    rootMargin: '-100px 0px -50% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 60;
    if (isAtBottom) return;

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, options);

  sections.forEach(section => {
    if (section) {
      observer.observe(section);
    }
  });
}
