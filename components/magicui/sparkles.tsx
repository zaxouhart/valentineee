'use client';

import { useEffect, useRef } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";

interface SparklesProps {
  id: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}

export const SparklesCore = ({
  id,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 100,
  className,
  particleColor = "#FFF"
}: SparklesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useMousePosition();

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
    }> = [];

    const createParticles = () => {
      const density = Math.floor((canvas.width * canvas.height) / particleDensity);
      
      for (let i = 0; i < density; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (maxSize - minSize) + minSize,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.x += particle.speedX + (mousePosition.x - canvas.width/2) * 0.01;
        particle.y += particle.speedY + (mousePosition.y - canvas.height/2) * 0.01;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.length = 0;
      createParticles();
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [maxSize, minSize, particleColor, particleDensity, mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      style={{
        background,
        width: "100%",
        height: "100%",
      }}
      className={className}
    />
  );
}; 