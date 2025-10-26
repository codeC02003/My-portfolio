import React, { useEffect, useRef } from "react";

export default function DisintegrateOnScroll({ children }) {
  const ref = useRef();
  const canvasRef = useRef();
  const ratioRef = useRef(0);
  const scrollPos = useRef(window.scrollY);

  useEffect(() => {
    const lineY = 100; // just below navbar
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];

    const makeParticle = (x, y) => ({
      x,
      y,
      vx: (Math.random() - 0.5) * 1.5,
      vy: -Math.random() * 2 - 0.5,
      life: 60 + Math.random() * 40,
      alpha: 1,
    });

    const updateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        p.alpha = p.life / 100;
        ctx.fillStyle = `rgba(0,255,255,${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      particles = particles.filter((p) => p.life > 0);
    };

    const updateDisintegration = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const elementHeight = rect.height;
      const overlap = Math.max(0, lineY - rect.top);
      const newRatio = Math.min(1, Math.max(0, overlap / elementHeight));
      ratioRef.current = newRatio; // no setState -> instant DOM sync

      // Emit particles proportionally to scroll speed
      const scrollSpeed = Math.abs(window.scrollY - scrollPos.current);
      if (newRatio > 0 && newRatio < 1) {
        const intensity = 15 + scrollSpeed * 0.3;
        const emissionY = lineY;
        for (let i = 0; i < intensity; i++) {
          const rx = rect.left + Math.random() * rect.width;
          particles.push(makeParticle(rx, emissionY));
        }
      }
      scrollPos.current = window.scrollY;
    };

    const animate = () => {
      updateDisintegration();
      updateParticles();

      // Update DOM mask directly (not React state)
      if (ref.current) {
        ref.current.style.clipPath = `inset(${ratioRef.current * 100}% 0 0 0)`;
        ref.current.style.opacity = 1 - ratioRef.current * 0.25;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div ref={ref} style={{ position: "relative" }}>
        {children}
      </div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 50,
        }}
      />
    </div>
  );
}
