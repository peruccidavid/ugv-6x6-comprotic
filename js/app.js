/**
 * Main Interactive Application Script for UGV 6X6 COMPROTIC-UNEFA Showcase
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggleBtn = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('mobile-nav-menu');

  if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('hidden');
    });

    // Close menu when clicking links
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.add('hidden'));
    });
  }

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Modal Technical Deep-Dives Data
  const modalData = {
    'pi5': {
      title: 'Raspberry Pi 5 (8GB) + Google MediaPipe Studio',
      subtitle: 'Núcleo Central de Cómputo e Inferencia de IA en Tiempo Real',
      body: `
        <div class="space-y-4 text-slate-300">
          <p><strong class="text-[#d8a85e]">Procesador:</strong> Broadcom BCM2712 Quad-core ARM Cortex-A76 a 2.4GHz de 64 bits, ofreciendo un incremento de velocidad de hasta 3x en comparación con la generación previa.</p>
          <p><strong class="text-[#d8a85e]">Memoria RAM:</strong> 8GB LPDDR4X-4267 SDRAM de alta velocidad con ancho de banda optimizado para modelos de visión computacional.</p>
          <p><strong class="text-[#d8a85e]">Inferencia de IA:</strong> Integración con la suite <strong>Google MediaPipe Studio</strong> optimizada para cuantización INT8/FP16 en CPU ARM, ejecutando algoritmos de detección de obstáculos, clasificación de terreno y rastreo de objetivos a 60 FPS continuos.</p>
          <div class="p-3 bg-slate-900/80 border border-[#b88b45]/30 rounded font-mono-code text-xs text-[#d8a85e]">
            [SYS_LOG]: MediaPipe ObjectDetector active.<br>
            [MODELS]: EfficientDet-Lite0 running on 4 ARM Cores.<br>
            [LATENCY]: 16.4ms inference frame window.
          </div>
        </div>
      `
    },
    'rocker-bogie': {
      title: 'Tracción Total 6x6 & Suspensión Rocker-Bogie',
      subtitle: 'Arquitectura de Movilidad de Grado Aeroespacial y Defensa',
      body: `
        <div class="space-y-4 text-slate-300">
          <p><strong class="text-[#d8a85e]">Chasis Reforzado:</strong> Estructura metálica de 2 pulgadas de grosor con recubrimiento electrostático resistente a la corrosión, polvo e impactos severos.</p>
          <p><strong class="text-[#d8a85e]">Mecanismo Rocker-Bogie:</strong> Sistema articulado sin resortes que distribuye el peso equitativamente entre las 6 ruedas motorizadas. Permite superar obstáculos superiores al diámetro de la rueda sin inclinación excesiva del chasis principal.</p>
          <p><strong class="text-[#d8a85e]">Capacidad de Vadeo:</strong> Sellado industrial en módulos electromecánicos para inmersión temporal en arroyos y zanjas fangosas.</p>
          <div class="grid grid-cols-2 gap-2 text-center text-xs font-hud mt-3">
            <div class="p-2 bg-slate-900 border border-[#b88b45]/30 rounded"><span class="text-[#d8a85e] block text-lg font-bold">45°</span>Pendiente Máxima</div>
            <div class="p-2 bg-slate-900 border border-[#b88b45]/30 rounded"><span class="text-[#b88b45] block text-lg font-bold">100%</span>Tracción 6WD</div>
          </div>
        </div>
      `
    },
    'arm-power': {
      title: 'Brazo Robótico 3D & Mini UPS KP7 PRO (24,000 mAh)',
      subtitle: 'Manipulación Físicamente Segura y Alimentación Ininterrumpida',
      body: `
        <div class="space-y-4 text-slate-300">
          <p><strong class="text-[#d8a85e]">Brazo Robótico Impreso en 3D:</strong> Fabricado en polímero técnico PETG/Carbon Fiber de alta tenacidad. Dispone de servo-motores de alto torque (25kg/cm) para manipulación remota de paquetes y recolección de muestras peligrosas.</p>
          <p><strong class="text-[#d8a85e]">Mini UPS KP7 PRO:</strong> Banco de energía LiFePO4 de 24,000 mAh / 88.8Wh con múltiples salidas reguladas (DC 5V/9V/12V/PoE 24V/48V).</p>
          <p><strong class="text-[#d8a85e]">Zero-Drop Switch:</strong> Garantiza 0 milisegundos de interrupción de energía ante picos de demanda electromecánica, ofreciendo 1 hora de operación contínua de máxima carga.</p>
        </div>
      `
    }
  };

  // Modal Control Functions
  const modalContainer = document.getElementById('tech-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close');

  window.openTechModal = function(key) {
    const data = modalData[key];
    if (!data || !modalContainer) return;

    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalBody.innerHTML = data.body;

    modalContainer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  window.closeTechModal = function() {
    if (!modalContainer) return;
    modalContainer.classList.add('hidden');
    document.body.style.overflow = 'auto';
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeTechModal);
  }

  if (modalContainer) {
    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) closeTechModal();
    });
  }

  // Interactive Specification Tabs Switcher
  const specTabs = document.querySelectorAll('.spec-tab-btn');
  const specContents = document.querySelectorAll('.spec-tab-content');

  specTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      specTabs.forEach(t => t.classList.remove('active'));
      specContents.forEach(c => c.classList.add('hidden'));

      tab.classList.add('active');
      const activeContent = document.getElementById(`tab-content-${targetTab}`);
      if (activeContent) activeContent.classList.remove('hidden');
    });
  });

  // Intersection Observer for Smooth Scroll Fade-In & HUD Reveal
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-8');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => {
    el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-8');
    observer.observe(el);
  });

  // 3D Interactive Tilt for CUNAGUARO Emblem
  const cunaguaroCard = document.getElementById('cunaguaro-3d-card');
  const cunaguaroWrapper = document.getElementById('cunaguaro-3d-wrapper');

  if (cunaguaroCard && cunaguaroWrapper) {
    cunaguaroWrapper.addEventListener('mousemove', (e) => {
      const rect = cunaguaroWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const rotateX = (-y / (rect.height / 2)) * 28;
      const rotateY = (x / (rect.width / 2)) * 28;
      
      cunaguaroCard.style.animation = 'none';
      cunaguaroCard.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(20px) scale(1.08)`;
    });

    cunaguaroWrapper.addEventListener('mouseleave', () => {
      cunaguaroCard.style.animation = 'cunaguaroRotate3D 6s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite alternate';
      cunaguaroCard.style.transform = '';
    });
  }

  // Telemetry HUD Live Feed - Hide on Scroll Down, Show at Top
  const telemetryFeed = document.getElementById('top-telemetry-feed');
  if (telemetryFeed) {
    let isScrolled = false;
    const handleScroll = () => {
      const scrollPos = window.scrollY || window.pageYOffset;
      if (scrollPos > 30) {
        if (!isScrolled) {
          telemetryFeed.classList.add('telemetry-hidden');
          isScrolled = true;
        }
      } else {
        if (isScrolled) {
          telemetryFeed.classList.remove('telemetry-hidden');
          isScrolled = false;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run on init in case page loads scrolled
    handleScroll();
  }
});

