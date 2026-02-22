# Chinmay Mhatre — Portfolio

Personal portfolio website built with React, Vite, and Tailwind CSS. Cyberpunk/neon aesthetic with a starfield background, glassmorphism cards, a WebGL 4D Tesseract that teleports between hero and corner positions on scroll, and smooth Framer Motion animations throughout.

🔗 **Live:** [chinmaymhatre.vercel.app](https://chinmaymhatre.vercel.app) *(or your deployed URL)*

---

## Features

- **Teleporting Tesseract** — A 4D hypercube rendered in WebGL occupies the hero viewport. Once you scroll past 45% of the viewport height it teleports (vanish + materialize animation with expanding cyan rings) to a 120×120 fixed corner widget. Scrolling back up teleports it home. A 620 ms cooldown lock prevents animation conflicts during fast scrolling.
- **Left sidebar nav** — Fixed 100 px sidebar with scroll-spy (IntersectionObserver) and a `layoutId` animated glow ring that slides between active items.
- **Hero glassmorphism card** — Backdrop-blur card that fades and rises on scroll, with an animated "EXPLORE" chevron button that disappears once the user scrolls away.
- **Starfield background** — Three-layer CSS keyframe star animation.

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Introduction, location, CTA buttons (GitHub, LinkedIn, Email, Resume) |
| **About** | Background, tech stack, philosophy, interests |
| **Education** | MS CS @ University of Arizona · BE IT @ K.J. Somaiya |
| **Skills** | C++, Python, JS / React, Node.js, Tailwind / Docker, AWS, Git / Figma, Canva |
| **Projects** | Gait Analysis (IoT + ML), WeConnect (NGO platform), Ticket Booking site |
| **Leadership** | KJSCE Insignia Art Team, Head of Art Team, Codecell Creative Member |
| **Contact** | Email form + social links |

---

## Tech Stack

- **React 18** + **Vite 7**
- **Tailwind CSS 3**
- **Framer Motion** — scroll-triggered animations, teleport-phase sphere, spring-physics navbar indicator
- **Three.js / WebGL** — interactive 4D Tesseract (hypercube) rendered on canvas
- **React Icons** — icon library
- **Custom fonts** — Abolition (headings), Lil Grotesk (body)
- **CSS starfield** — multi-layer animated galaxy background

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── App.jsx              # Root layout
├── NavbarPortal.jsx     # Fixed left sidebar nav with scroll-spy & glow indicator
├── FloatingSphere.jsx   # Standalone Tesseract — teleports hero ↔ mini on scroll
├── Tesseract.jsx        # Three.js WebGL 4D hypercube renderer
├── Hero.jsx             # Landing section (glassmorphism card + scroll-fade)
├── About.jsx            # About me
├── Education.jsx        # Education cards
├── Skills.jsx           # Skill categories with icons
├── SelectedWork.jsx     # Interactive project panel
├── Leadership.jsx       # Leadership & teamwork
├── Contact.jsx          # Contact form + info
├── index.css            # Global styles, fonts, starfield
└── assets/              # Static assets & GLSL shaders
```

---

## Contact

**Chinmay Mhatre** · chinmaymhatre02003@gmail.com
[LinkedIn](https://www.linkedin.com/in/chinmay-mhatre-857825193/) · [GitHub](https://github.com/codeC02003)
