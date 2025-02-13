'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Heart from '@/components/heart'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: showContent ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <TransitionOverlay>
          <Heart />
          <ChatBubble>
            <GlitchText>CHARGEMENT...</GlitchText>
          </ChatBubble>
          <LoadingBar>
            <LoadingProgress />
          </LoadingBar>
        </TransitionOverlay>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  );
}

const TransitionOverlay = styled.div`
  background: linear-gradient(45deg, #1a1a1a, #2d1a2d);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const ChatBubble = styled.div`
  position: relative;
  background: linear-gradient(45deg, rgba(255,20,147,0.1), rgba(255,105,180,0.2));
  backdrop-filter: blur(8px);
  border: 2px solid;
  border-image: linear-gradient(45deg, #ff1493, #ff69b4) 1;
  border-radius: 20px;
  padding: 1.5rem;
  margin: 1rem;
  animation: float 3s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 22px;
    background: linear-gradient(45deg, #ff1493, #ff69b4);
    z-index: -1;
    opacity: 0.3;
    filter: blur(8px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    border: 8px solid transparent;
    border-top-color: #ff1493;
    filter: drop-shadow(0 2px 4px rgba(255,20,147,0.3));
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

const GlitchText = styled.h2`
  font-family: 'Press Start 2P', monospace;
  color: white;
  font-size: 1.5rem;
  position: relative;
  text-shadow: 
    2px 2px #ff1493,
    -2px -2px #ff69b4;
  animation: glitch 0.5s infinite;
  letter-spacing: 2px;

  &::before,
  &::after {
    content: 'CHARGEMENT...';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &::before {
    color: #ff1493;
    animation: glitch 0.3s infinite;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    transform: translate(-2px);
  }

  &::after {
    color: #ff69b4;
    animation: glitch 0.3s infinite reverse;
    clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
    transform: translate(2px);
  }

  @keyframes glitch {
    0% { transform: translate(0) }
    20% { transform: translate(-2px, 2px) }
    40% { transform: translate(-2px, -2px) }
    60% { transform: translate(2px, 2px) }
    80% { transform: translate(2px, -2px) }
    100% { transform: translate(0) }
  }
`;

const LoadingBar = styled.div`
  width: 200px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  border-radius: 10px;
  overflow: hidden;
`;

const LoadingProgress = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  animation: loading 2s linear;
  transform-origin: left;

  @keyframes loading {
    0% { transform: scaleX(0); }
    100% { transform: scaleX(1); }
  }
`; 