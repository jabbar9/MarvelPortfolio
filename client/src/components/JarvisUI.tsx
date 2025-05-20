import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";

type JarvisUIProps = {
  reversed?: boolean;
};

const JarvisUI = ({ reversed = false }: JarvisUIProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const circles: Array<{
      x: number;
      y: number;
      radius: number;
      speed: number;
      direction: number;
    }> = [];
    
    const createCircles = () => {
      const totalCircles = 10;
      for (let i = 0; i < totalCircles; i++) {
        circles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.3 + 0.1,
          direction: Math.random() > 0.5 ? 1 : -1
        });
      }
    };
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      circles.length = 0;
      createCircles();
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create a gradient from the bottom (or top if reversed)
      const startY = reversed ? 0 : canvas.height;
      const endY = reversed ? canvas.height : 0;
      const gradient = ctx.createLinearGradient(0, startY, 0, endY);
      
      // Colors for gold-red Marvel theme
      gradient.addColorStop(0, "rgba(246, 190, 0, 0.1)");
      gradient.addColorStop(0.5, "rgba(158, 27, 50, 0.05)");
      gradient.addColorStop(1, "rgba(13, 13, 13, 0)");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Grid lines
      ctx.beginPath();
      const gridSize = 30;
      
      ctx.strokeStyle = "rgba(246, 190, 0, 0.1)";
      ctx.lineWidth = 0.5;
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      
      ctx.stroke();
      
      // Particles
      circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(246, 190, 0, 0.3)";
        ctx.fill();
        
        // Move circles horizontally
        circle.x += circle.speed * circle.direction;
        
        // Wrap around screen
        if (circle.x > canvas.width + circle.radius) {
          circle.x = -circle.radius;
        } else if (circle.x < -circle.radius) {
          circle.x = canvas.width + circle.radius;
        }
      });
      
      requestAnimationFrame(draw);
    };
    
    const animation = requestAnimationFrame(draw);
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animation);
    };
  }, [reversed]);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  );
};

export default JarvisUI;
