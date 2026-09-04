/**
 * Telemetry & Camera Vision Simulator for UGV 6X6 COMPROTIC-UNEFA
 * Real-time HUD data generation & Interactive MediaPipe vision suite feed
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const elRoll = document.getElementById('telemetry-roll');
  const elPitch = document.getElementById('telemetry-pitch');
  const elYaw = document.getElementById('telemetry-yaw');
  const elTemp = document.getElementById('telemetry-temp');
  const elBat = document.getElementById('telemetry-bat');
  const elFps = document.getElementById('telemetry-fps');
  const elLat = document.getElementById('telemetry-latency');
  const elGps = document.getElementById('telemetry-gps');

  // Camera feed controls
  const feedImg = document.getElementById('hud-camera-img');
  const feedTitle = document.getElementById('hud-camera-title');
  const feedSpec = document.getElementById('hud-camera-spec');
  const canvas = document.getElementById('hud-ai-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;

  // Base state
  let currentPitch = -3.4;
  let currentRoll = 1.2;
  let currentYaw = 142.8;
  let cpuTemp = 42.5;
  let batLevel = 98.4;
  let latency = 11;
  let activeCameraMode = 'arducam'; // 'ov5647', 'arducam', 'ptz'

  // Image mappings
  const cameraFeeds = {
    ov5647: {
      src: 'images/ugv-camaras-suite.jpg',
      title: 'Cámara OV5647 5MP Ojo de Pez (160° IR)',
      spec: 'Modo Infrarrojo Activado // FOV: 160° Diagonal // Visión Nocturna 850nm',
      overlayTint: 'rgba(0, 255, 136, 0.15)'
    },
    arducam: {
      src: 'images/ugv-pedregoso.jpg',
      title: 'Arducam 16MP Auto-Focus HD + MediaPipe IA',
      spec: 'Google MediaPipe Studio Active // Detección de Objetos en Tiempo Real // 60 FPS',
      overlayTint: 'transparent'
    },
    ptz: {
      src: 'images/ugv-rocker-bogie.jpg',
      title: 'Cámara Motorizada PTZ 360° Periférica',
      spec: 'Giro Pan-Tilt Servo Asistido // Ángulo Acimut: 215° // Elevación: +15°',
      overlayTint: 'rgba(0, 240, 255, 0.08)'
    }
  };

  // Switch Camera Feed Handler
  window.switchCameraFeed = function(mode) {
    if (!cameraFeeds[mode]) return;
    activeCameraMode = mode;
    
    // Update active tab buttons UI
    document.querySelectorAll('.cam-btn').forEach(btn => {
      btn.classList.remove('active', 'border-emerald-500', 'bg-emerald-950/40', 'text-emerald-400');
      btn.classList.add('border-slate-800', 'bg-slate-900/60', 'text-slate-400');
    });

    const activeBtn = document.getElementById(`btn-cam-${mode}`);
    if (activeBtn) {
      activeBtn.classList.add('active', 'border-emerald-500', 'bg-emerald-950/40', 'text-emerald-400');
      activeBtn.classList.remove('border-slate-800', 'bg-slate-900/60', 'text-slate-400');
    }

    // Update Image & Labels
    const data = cameraFeeds[mode];
    if (feedImg) feedImg.src = data.src;
    if (feedTitle) feedTitle.textContent = data.title;
    if (feedSpec) feedSpec.textContent = data.spec;

    const overlay = document.getElementById('hud-vision-overlay');
    if (overlay) overlay.style.backgroundColor = data.overlayTint;
  };

  // Simulated MediaPipe Bounding Box AI Rendering on Canvas
  let animationFrameId;
  let frameCount = 0;

  function resizeCanvas() {
    if (!canvas || !canvas.parentElement) return;
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function drawAICanvas() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frameCount++;

    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return;

    // Draw central tactical crosshair
    const cx = w / 2;
    const cy = h / 2;
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(cx - 20, cy); ctx.lineTo(cx + 20, cy);
    ctx.moveTo(cx, cy - 20); ctx.lineTo(cx, cy + 20);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(0, 255, 136, 0.6)';
    ctx.beginPath();
    ctx.arc(cx, cy, 35, 0, Math.PI * 2);
    ctx.stroke();

    // Render Simulated Bounding Boxes if Arducam / MediaPipe is selected
    if (activeCameraMode === 'arducam') {
      const box1X = w * 0.25 + Math.sin(frameCount * 0.02) * 8;
      const box1Y = h * 0.4 + Math.cos(frameCount * 0.02) * 5;
      const box1W = w * 0.28;
      const box1H = h * 0.35;

      // Draw Green Bounding Box for Rock/Obstacle
      ctx.strokeStyle = '#00ff88';
      ctx.lineWidth = 2;
      ctx.strokeRect(box1X, box1Y, box1W, box1H);

      // Label tag
      ctx.fillStyle = '#00ff88';
      ctx.fillRect(box1X, box1Y - 22, 180, 22);
      ctx.fillStyle = '#050811';
      ctx.font = 'bold 11px JetBrains Mono';
      ctx.fillText('OBSTÁCULO: ROCA [94%]', box1X + 6, box1Y - 7);

      // Draw Cyan Bounding Box for Distance Target
      const box2X = w * 0.62 + Math.cos(frameCount * 0.015) * 6;
      const box2Y = h * 0.32;
      const box2W = w * 0.22;
      const box2H = h * 0.28;

      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.strokeRect(box2X, box2Y, box2W, box2H);

      ctx.fillStyle = '#00f0ff';
      ctx.fillRect(box2X, box2Y - 22, 190, 22);
      ctx.fillStyle = '#050811';
      ctx.font = 'bold 11px JetBrains Mono';
      ctx.fillText('TERRENO: PENDIENTE [98%]', box2X + 6, box2Y - 7);
    } else if (activeCameraMode === 'ov5647') {
      // IR Thermal / Night Vision scan lines
      ctx.fillStyle = 'rgba(0, 255, 136, 0.04)';
      const scanY = (frameCount * 2) % h;
      ctx.fillRect(0, scanY, w, 4);

      ctx.fillStyle = '#00ff88';
      ctx.font = 'bold 12px Orbitron';
      ctx.fillText('IR NIGHT VISION ACTIVE // 850nm', 20, 30);
    } else if (activeCameraMode === 'ptz') {
      // Compass heading scale
      ctx.fillStyle = '#00f0ff';
      ctx.font = '12px JetBrains Mono';
      ctx.fillText(`BEARING: ${((currentYaw + 360) % 360).toFixed(1)}° NNE`, 20, 30);
    }

    requestAnimationFrame(drawAICanvas);
  }
  drawAICanvas();

  // Periodic Telemetry Updates
  setInterval(() => {
    // Jitter telemetry values slightly for realistic simulation
    currentPitch += (Math.random() - 0.5) * 0.4;
    currentRoll += (Math.random() - 0.5) * 0.3;
    currentYaw += (Math.random() - 0.5) * 0.2;
    cpuTemp = 42.0 + Math.sin(Date.now() * 0.001) * 1.5;
    latency = Math.floor(10 + Math.random() * 4);

    if (elPitch) elPitch.textContent = `${currentPitch >= 0 ? '+' : ''}${currentPitch.toFixed(1)}°`;
    if (elRoll) elRoll.textContent = `${currentRoll >= 0 ? '+' : ''}${currentRoll.toFixed(1)}°`;
    if (elYaw) elYaw.textContent = `${((currentYaw + 360) % 360).toFixed(1)}°`;
    if (elTemp) elTemp.textContent = `${cpuTemp.toFixed(1)}°C`;
    if (elBat) elBat.textContent = `${batLevel.toFixed(1)}%`;
    if (elFps) elFps.textContent = `${Math.floor(58 + Math.random() * 4)} FPS`;
    if (elLat) elLat.textContent = `${latency} ms`;

    if (elGps) {
      const latOffset = (Math.random() - 0.5) * 0.00005;
      const lonOffset = (Math.random() - 0.5) * 0.00005;
      elGps.textContent = `10.${(48060 + latOffset * 1000).toFixed(0)}° N, 66.${(90360 + lonOffset * 1000).toFixed(0)}° W`;
    }
  }, 1000);
});
