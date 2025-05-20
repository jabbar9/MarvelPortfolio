import { useEffect, useRef } from "react";

type ParticleEffectsProps = {
  count?: number;
};

const ParticleEffects = ({ count = 50 }: ParticleEffectsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }> = [];
    
    const createParticles = () => {
      for (let i = 0; i < count; i++) {
        const isGold = Math.random() > 0.7;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.1,
          color: isGold ? "#F6BE00" : "#9E1B32"
        });
      }
    };
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.length = 0;
      createParticles();
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around screen
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
        
        // Slowly change opacity for twinkling effect
        particle.opacity += (Math.random() - 0.5) * 0.01;
        if (particle.opacity < 0.1) particle.opacity = 0.1;
        if (particle.opacity > 0.5) particle.opacity = 0.5;
      });
      
      requestAnimationFrame(animate);
    };
    
    const animation = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animation);
    };
  }, [count]);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};

export default ParticleEffects;
