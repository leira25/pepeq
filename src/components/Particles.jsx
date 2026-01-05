import React, { useEffect } from 'react';

const Particles = () => {
  useEffect(() => {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      particle.style.left = `${Math.random() * 100}%`;

      const duration = Math.random() * 20 + 10;
      particle.style.animationDuration = `${duration}s`;

      const delay = Math.random() * 10;
      particle.style.animationDelay = `-${delay}s`;

      particlesContainer.appendChild(particle);
    }
  }, []);

  return <div className="particles" id="particles"></div>;
};

export default Particles;