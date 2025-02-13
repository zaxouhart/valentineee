'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const emojis = [
  '💝', '💖', '💗', '💓', '💕', '💘', '🌹', '✨', '💫', '🦋',
  '💐', '🌸', '💮', '🏵️', '🌺', '🌻', '🌼', '🌷', '♥️', '💌'
];

const EmojiShower = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <ShowerWrapper>
      {Array.from({ length: 40 }).map((_, i) => {
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        const randomLeft = Math.random() * 100;
        const randomDelay = Math.random() * 8;
        const randomDuration = 3 + Math.random() * 4;
        const randomSize = 0.8 + Math.random() * 1; // Adjusted size range (0.8-1.8rem)
        const randomAnimation = Math.random() > 0.5 ? 'fallAndSpin' : 'fallAndWave';
        
        return (
          <Emoji 
            key={i}
            style={{
              left: `${randomLeft}vw`,
              animationDelay: `${randomDelay}s`,
              animationDuration: `${randomDuration}s`,
              fontSize: `${randomSize}rem`,
              animationName: randomAnimation
            }}
          >
            {randomEmoji}
          </Emoji>
        );
      })}
      <GlowingOverlay />
    </ShowerWrapper>
  );
};

const ShowerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
  background: radial-gradient(circle at 50% 50%, rgba(255, 192, 203, 0.05) 0%, transparent 70%);
`;

const GlowingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    rgba(255, 105, 180, 0.05) 0%,
    rgba(255, 192, 203, 0.05) 50%,
    rgba(255, 105, 180, 0.05) 100%
  );
  animation: glow 8s infinite alternate;

  @keyframes glow {
    0% {
      opacity: 0.2;
    }
    100% {
      opacity: 0.4;
    }
  }
`;

const Emoji = styled.div`
  position: absolute;
  animation: 3s linear infinite;
  opacity: 0.8;
  filter: drop-shadow(0 0 5px rgba(255, 105, 180, 0.3));
  transform-origin: center;

  @keyframes fallAndSpin {
    0% {
      transform: translateY(-20vh) rotate(0deg) scale(0.8);
      opacity: 0;
    }
    20% {
      opacity: 0.8;
    }
    80% {
      opacity: 0.8;
    }
    100% {
      transform: translateY(100vh) rotate(720deg) scale(1);
      opacity: 0;
    }
  }

  @keyframes fallAndWave {
    0% {
      transform: translateY(-20vh) translateX(0) scale(0.8);
      opacity: 0;
    }
    20% {
      opacity: 0.8;
    }
    50% {
      transform: translateY(40vh) translateX(50px) scale(1);
    }
    80% {
      opacity: 0.8;
    }
    100% {
      transform: translateY(100vh) translateX(-50px) scale(0.8);
      opacity: 0;
    }
  }
`;

export default EmojiShower; 