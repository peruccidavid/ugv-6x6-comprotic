# 🛡️ CUNAGUARO // COMPROTIC-UNEFA - Vitrina Tecnológica y Robótica Táctica

> **Soberanía Tecnológica y Robótica Táctica**: Vehículo Terrestre no Tripulado (UGV) CUNAGUARO 6x6 de exploración autónoma para misiones críticas en terrenos hostiles.

Desarrollado conjuntamente por el equipo de **COMPROTIC** y la **Universidad Nacional Experimental Politécnica de la Fuerza Armada Nacional Bolivariana (UNEFA)**.

---

## 📸 Demostración del Prototipo

| Sección | Descripción |
| :--- | :--- |
| **Hero & Telemetría** | Identidad CUNAGUARO con HUD Táctico y telemetría en tiempo real (Pitch/Roll/Yaw IMU, CPU Temp, Batería UPS, GPS). |
| **Chasis 6x6 & Rocker-Bogie** | Suspensión articulada de absorción biomecánica sobre chasis metálico de 2 pulgadas. |
| **Suite Percepción IA** | Cámara OV5647 160° IR, Arducam 16MP HD con detección de objetos **Google MediaPipe Studio**, y cámara motorizada PTZ 360°. |
| **Energía & Manipulación** | Mini UPS KP7 PRO 24,000 mAh (1h autonomía continuous zero-drop) y brazo robótico impreso en 3D. |

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5 Semántico, CSS3 Vanilla Táctico (Efectos HUD, retículas, paleta táctica dorada/bronce `#b88b45`, glassmorphic UI).
- **Framework de Estilos**: Tailwind CSS CDN.
- **Iconografía**: Lucide Icons.
- **Lógica e Interactividad**: JavaScript (ES6+), Canvas API para overlay de IA en tiempo real, observadores de scroll (IntersectionObserver).
- **Procesamiento Embebido**: Raspberry Pi 5 8GB, Adafruit 9-DOF IMU BNO055.

---

## 📂 Estructura del Proyecto

```
ugv-6x6-comprotic/
├── index.html                  # Página principal de exhibición CUNAGUARO
├── README.md                   # Documentación oficial del repositorio
├── css/
│   └── custom-hud.css          # Estilos visuales del HUD táctico (#b88b45) y animaciones
├── js/
│   ├── app.js                  # Lógica de modales, menú responsive e interacción
│   └── telemetry-simulator.js  # Simulador de telemetría y visor de cámara con IA
└── images/                     # Logotipos oficiales, fotografías e ilustraciones
    ├── cunaguaro-logo.svg
    ├── comprotic-logo-footer.svg
    ├── ugv-pedregoso.jpg
    ├── ugv-camaras-suite.jpg
    ├── ugv-rocker-bogie.jpg
    ├── ugv-brazo-ups.jpg
    └── ugv-transmision-drone.jpg
```

---

## 🚀 Instalación y Visualización Local

No requiere de compiladores ni instalación de dependencias pesadas:

1. Clona o descarga este repositorio:
   ```bash
   git clone https://github.com/TU_USUARIO/ugv-6x6-comprotic.git
   ```
2. Abre el archivo `index.html` en cualquier navegador web moderno (Chrome, Edge, Firefox).

---

## 📜 Créditos e Instituciones

- **COMPROTIC** - Equipo de Desarrollo de Hardware & Software.
- **UNEFA** - Universidad Nacional Experimental Politécnica de la Fuerza Armada Nacional Bolivariana.
- *República Bolivariana de Venezuela*.
