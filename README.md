<div align="center">

# CHINMAY MHATRE — PORTFOLIO

### Full-Stack Developer · AI / ML Engineer · Creative Technologist

[![Portfolio Live](https://img.shields.io/badge/Portfolio-chinmaymhatre.vercel.app-00FFFF?style=for-the-badge&logo=vercel&logoColor=white)](https://chinmaymhatre.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/chinmay-mhatre-857825193/)
[![GitHub](https://img.shields.io/badge/GitHub-codeC02003-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/codeC02003)
[![Email](https://img.shields.io/badge/Email-Reach%20Out-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:chinmaymhatre02003@gmail.com)

---

![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=three.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=white)

**MS Computer Science @ University of Arizona · Open to AI, ML & Software Engineering Internships**

</div>

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Portfolio Sections](#portfolio-sections)
- [Featured Projects](#featured-projects)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [About the Developer](#about-the-developer)
- [Connect](#connect)

---

## Overview

A **cyberpunk-aesthetic personal portfolio** that goes beyond a static page. Built with React 18, Vite 7, and Tailwind CSS, it features a WebGL-rendered 4D Tesseract (hypercube), particle disintegration effects, glassmorphism UI, and scroll-synced Framer Motion animations — all backed by a multi-layer CSS starfield.

This project demonstrates real engineering decisions:

- **Interactive 3D/4D graphics** — a live WebGL hypercube that teleports between hero and corner positions with a cyan ring materialize animation
- **Physics-based UI** — Framer Motion spring physics driving the sidebar scroll indicator
- **Performance discipline** — optimized render loops, IntersectionObserver scroll-spy, and a 620 ms animation cooldown lock to prevent visual conflicts
- **Modern design system** — glassmorphism cards, backdrop blur, cyberpunk neon palette (cyan `#00FFFF` + electric blue `#44CCFF`)

> **Search keywords:** React developer portfolio · AI ML engineer portfolio · full-stack developer Tucson Arizona · Three.js WebGL portfolio · React Vite Tailwind CSS · software engineering graduate student

---

## Live Demo

**[chinmaymhatre.vercel.app](https://chinmaymhatre.vercel.app)**

Deployed on Vercel with automatic CI/CD from the `main` branch. No environment variables required for the frontend — open and runs out of the box.

---

## Key Features

| Feature | Technical Detail |
|---|---|
| **4D Tesseract — WebGL** | Three.js hypercube with custom GLSL shaders. Scroll past 45% VH triggers a vanish + materialize teleport animation with expanding cyan rings. 620 ms cooldown lock prevents conflicts on fast scroll. |
| **Particle Disintegration** | Scroll-triggered burst animation that breaks elements into particles |
| **Scroll-spy Sidebar Nav** | Fixed 100 px left sidebar using `IntersectionObserver`. An animated Framer Motion `layoutId` glow ring slides between active nav items with spring physics. |
| **Glassmorphism Hero Card** | `backdrop-filter: blur(22px) saturate(160%)` card with scroll-fade + Y-axis float out. Animated EXPLORE chevron disappears as the user scrolls. |
| **CSS Starfield Background** | Three-layer CSS keyframe star animation producing a parallax galaxy effect. Zero JS overhead. |
| **Staggered Entry Animations** | All sections use Framer Motion scroll-triggered stagger reveals for a polished first-load experience. |

---

## Tech Stack

### Frontend Framework

| Technology | Version | Role |
|---|---|---|
| **React** | 18.3 | UI component library |
| **Vite** | 7.x | Build tool, HMR dev server, production bundler |
| **Tailwind CSS** | 3.x | Utility-first CSS framework |
| **Framer Motion** | 10.x | Declarative animation & gesture library |

### 3D / WebGL Layer

| Technology | Role |
|---|---|
| **Three.js** | Core WebGL engine for 4D Tesseract rendering |
| **@react-three/fiber** | React reconciler for Three.js |
| **@react-three/drei** | Three.js utility helpers |
| **vite-plugin-glsl** | GLSL shader file imports in Vite |

### Styling & Typography

| Asset | Detail |
|---|---|
| **Abolition** | Custom display font for headings |
| **Lil Grotesk** | Body & UI text |
| **React Icons** | Icon library (GitHub, LinkedIn, Chevron, Map pin) |
| **Neon palette** | Cyan `#00FFFF` · Electric Blue `#44CCFF` · Deep Space `#040C1C` |

---

## Portfolio Sections

| # | Section | Contents |
|---|---|---|
| 1 | **Hero** | Name, role tagline, status badge, CTA buttons (GitHub · LinkedIn · Email · Resume) |
| 2 | **About** | Background, engineering philosophy, technical interests |
| 3 | **Education** | MS Computer Science @ University of Arizona · BE Information Technology @ K.J. Somaiya College of Engineering |
| 4 | **Skills** | C++, Python, JavaScript, React.js, Node.js, Tailwind CSS, Docker, AWS, Git, Figma, Canva |
| 5 | **Projects** | Gait Analysis (IoT + ML), WeConnect (NGO platform), Ticket Booking System |
| 6 | **Leadership** | KJSCE Insignia Art Team, Head of Art Team, Codecell Creative Member |
| 7 | **Contact** | Email form + social links |

---

## Featured Projects

### Gait Analysis System — IoT + Machine Learning
Biomechanics research tool that collects gait data through IoT sensors and processes it with machine learning algorithms to identify walking pattern anomalies.
**Stack:** Python · Machine Learning · IoT · Signal Processing

---

### WeConnect — NGO Digital Platform
Full-stack web application designed to connect non-governmental organizations with volunteers and donors, streamlining outreach and coordination.
**Stack:** React.js · Node.js · REST API · Database

---

### Ticket Booking System
End-to-end event and transport ticket reservation web application with real-time seat availability and booking flow.
**Stack:** JavaScript · React · Backend API

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/codeC02003/My-portfolio.git
cd My-portfolio

# 2. Install dependencies  (Node.js 18+ recommended)
npm install

# 3. Start the development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview the production build locally
npm run preview
```

> Uses ES Modules (`"type": "module"` in `package.json`). No `.env` file needed.

---

## Project Structure

```
My-portfolio/
├── public/                    # Static assets (favicon, fonts, resume PDF)
├── src/
│   ├── App.jsx                # Root layout — composes all sections
│   ├── NavbarPortal.jsx       # Fixed left sidebar with IntersectionObserver scroll-spy
│   │                          # and Framer Motion layoutId glow ring
│   ├── FloatingSphere.jsx     # Tesseract teleport controller (hero <-> corner widget)
│   ├── Tesseract.jsx          # Three.js WebGL 4D hypercube renderer
│   ├── Hero.jsx               # Landing section — glassmorphism card + scroll-fade
│   ├── About.jsx              # About me section
│   ├── Education.jsx          # Education timeline cards
│   ├── Skills.jsx             # Skill grid with category icons
│   ├── SelectedWork.jsx       # Interactive project showcase panel
│   ├── Leadership.jsx         # Leadership & creative teamwork section
│   ├── Contact.jsx            # Contact form + social links
│   ├── index.css              # Global styles, font @imports, CSS starfield keyframes
│   └── assets/                # GLSL shader files + static images
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## Performance & SEO Notes

- **Vercel edge CDN** — global distribution with automatic HTTPS
- **Vite production build** — tree-shaking, code splitting, and asset hashing
- **Semantic HTML** — proper `<h1>` → `<h2>` heading hierarchy throughout sections
- **IntersectionObserver** — replaces scroll event listeners for better paint performance
- **Animation cooldown locks** — prevents frame-rate drops from rapid scroll triggers
- **Responsive design** — mobile-first Tailwind utility classes; sidebar collapses on small screens

---

## About the Developer

**Chinmay Mhatre** is a Computer Science graduate student at the University of Arizona (Tucson, AZ), holding a Bachelor's degree in Information Technology from K.J. Somaiya College of Engineering, Mumbai, India.

He builds at the intersection of **Artificial Intelligence**, **full-stack web development**, and **creative engineering** — crafting systems that are both technically rigorous and visually compelling.

**Currently seeking internships in:**
- Artificial Intelligence & Machine Learning
- Software Engineering (Frontend · Backend · Full-Stack)
- Computer Vision & Robotics

---

## Connect

| Platform | Link |
|---|---|
| **Portfolio** | [chinmaymhatre.vercel.app](https://chinmaymhatre.vercel.app) |
| **LinkedIn** | [linkedin.com/in/chinmay-mhatre-857825193](https://www.linkedin.com/in/chinmay-mhatre-857825193/) |
| **GitHub** | [github.com/codeC02003](https://github.com/codeC02003) |
| **Email** | [chinmaymhatre02003@gmail.com](mailto:chinmaymhatre02003@gmail.com) |

---

<div align="center">

Built with **React 18** · **Three.js** · **Framer Motion** · **Tailwind CSS** · **Vite 7**

*Chinmay Mhatre — Full-Stack Developer & AI/ML Engineer — Tucson, Arizona, USA*

</div>
