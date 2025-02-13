'use client';

import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const BackgroundLove = () => {
  const [isClient, setIsClient] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  const calculateItemCount = useCallback((width: number, height: number) => {
    const baseCount = Math.floor((width * height) / 60000);
    return width < 640 ? baseCount * 1.5 : baseCount;
  }, []);

  const generatePosition = useCallback(() => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 2;
    const startPosition = Math.random() * 100; // Position initiale aléatoire sur l'axe Y
    return {
      angle,
      speed,
      x: Math.random() * 95,
      delay: 0, // Suppression du délai initial
      duration: 8 + Math.random() * 7,
      startY: startPosition,
      size: screenSize.width < 640 ? 
        160 + Math.random() * 80 : 
        200 + Math.random() * 100,
    };
  }, [screenSize.width]);

  useEffect(() => {
    setIsClient(true);
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenSize({ width, height });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  if (!isClient) return null;

  const itemCount = calculateItemCount(screenSize.width, screenSize.height);

  return (
    <LoveWrapper>
      {Array.from({ length: itemCount }).map((_, i) => {
        const pos = generatePosition();
        return (
          <LoveContainer 
            key={i}
            style={{
              left: `${pos.x}%`,
              top: `${pos.startY}%`,
              animationDelay: `${pos.delay}s`,
              animationDuration: `${pos.duration}s`,
              width: `${pos.size}px`,
              height: `${pos.size}px`,
              '--move-angle': `${pos.angle}rad`,
              '--move-speed': pos.speed
            } as React.CSSProperties & { '--move-angle': string; '--move-speed': number }}
          >
            <Image 
              src={`/love${(i % 9) + 1}.gif`}
              alt={`Love ${i + 1}`}
              fill
              style={{ objectFit: 'contain' }}
              priority={i < 3}
            />
          </LoveContainer>
        );
      })}
    </LoveWrapper>
  );
};

const LoveWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
`;

const LoveContainer = styled.div`
  position: absolute;
  opacity: 0.7;
  animation: floatMove linear infinite;
  filter: drop-shadow(0 0 10px rgba(255, 105, 180, 0.2));
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    opacity: 1;
    filter: drop-shadow(0 0 15px rgba(255, 105, 180, 0.4));
  }

  @keyframes floatMove {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(
        calc(cos(var(--move-angle)) * var(--move-speed) * 100px),
        calc(100vh)
      );
    }
  }
`;

export default BackgroundLove; 