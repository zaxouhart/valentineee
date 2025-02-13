'use client';

import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PageTransition from '../components/PageTransition';

export default function VerificationPage() {
  const [password, setPassword] = useState(['', '', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Réinitialiser le overflow quand le composant est monté
    document.body.style.overflow = 'auto';
    
    // Optionnel: nettoyer quand le composant est démonté
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleChange = (index: number, value: string) => {
    const newPassword = [...password];
    newPassword[index] = value;
    setPassword(newPassword);

    if (value && index < 6) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !password[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullPassword = password.join('');
    if (fullPassword.toLowerCase() === 'chandou') {
      router.push('/success');
    } else {
      const errorSound = new Audio('/error.mp3');
      errorSound.volume = 1.0;
      
      try {
        errorSound.play().then(() => {
          setAttempts(prev => prev - 1);
          if (attempts <= 1) {
            router.push('/game-over');
          } else {
            setError(`Erreur ! Il te reste ${attempts - 1} essais... 🔒`);
            if (attempts === 2) {
              setShowHint(true);
            }
            setPassword(['', '', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
          }
        }).catch(error => {
          console.error('Erreur lors de la lecture du son:', error);
        });
      } catch (error) {
        console.error('Erreur lors de la lecture du son:', error);
      }
    }
  };

  return (
    <PageTransition>
      <GameWrapper>
        <Scanlines />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto pt-20 relative z-10"
        >
          <GameWindow>
            <GameHeader>
              <span>SYSTÈME DE SÉCURITÉ V1.0</span>
              <HealthBar attempts={attempts}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Heart key={i} $active={i < attempts}>❤️</Heart>
                ))}
              </HealthBar>
            </GameHeader>

            <ChatBubble>
              <GlowText className="text-xl mb-2">IDENTIFICATION REQUISE 🔐</GlowText>
              <p className="text-gray-300 text-lg">
                Prouve que tu es la bonne valentine...
                <br />
                <span className="text-pink-400 mt-2 block text-sm">
                  [INDICE] : Mon petit surnom d&apos;amour pour toi, celui qui te fait toujours sourire 💕
                  {showHint && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="block mt-2 text-purple-400"
                    >
                      Psst... Ça commence par &quot;C&quot; et ça finit par &quot;u&quot; 😉
                    </motion.span>
                  )}
                </span>
              </p>
            </ChatBubble>
            
            <CatContainer>
              <Image 
                src="/cat.png" 
                alt="Chat curieux" 
                width={300} 
                height={300}
                className="cat-image pixelated"
                priority
              />
            </CatContainer>

            <form onSubmit={handleSubmit}>
              <GameContainer>
                <div className="flex justify-center gap-2">
                  {password.map((digit, idx) => (
                    <PixelInput
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={digit}
                      ref={(el) => { inputRefs.current[idx] = el }}
                      onChange={e => handleChange(idx, e.target.value)}
                      onKeyDown={e => handleKeyDown(idx, e)}
                    />
                  ))}
                </div>
                
                {error && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="error-message"
                  >
                    <ErrorText>{error}</ErrorText>
                  </motion.div>
                )}

                <RetroButton type="submit">
                  <span className="button-content">VALIDER_</span>
                </RetroButton>
              </GameContainer>
            </form>
          </GameWindow>
        </motion.div>
      </GameWrapper>
    </PageTransition>
  );
}

const GameWrapper = styled.main`
  min-height: 100vh;
  background: linear-gradient(45deg, #1a1a1a, #2a1a2a);
  padding: 1rem;
  position: relative;
  overflow: hidden;
`;

const GameWindow = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border: 3px solid #ff69b4;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 
    0 0 20px rgba(255, 105, 180, 0.3),
    inset 0 0 20px rgba(255, 105, 180, 0.2);
  backdrop-filter: blur(10px);
`;

const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0.5rem;
  border-bottom: 2px solid #ff69b4;
  color: #ff69b4;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
`;

const HealthBar = styled.div<{ attempts: number }>`
  display: flex;
  gap: 0.5rem;
`;

const Heart = styled.span<{ $active: boolean }>`
  opacity: ${props => props.$active ? '1' : '0.3'};
  filter: ${props => props.$active ? 'none' : 'grayscale(100%)'};
  transition: all 0.3s ease;
`;

const GlowText = styled.h2`
  background: linear-gradient(45deg, #ff1493, #ff69b4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 1.8rem;
  font-weight: bold;
  text-shadow: 
    0 0 10px rgba(255, 20, 147, 0.5),
    0 0 20px rgba(255, 20, 147, 0.3),
    0 0 30px rgba(255, 20, 147, 0.1);
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
  }
`;

const PixelInput = styled.input`
  width: 3rem;
  height: 3rem;
  background: #2a2a2a;
  border: 3px solid #ff69b4;
  border-radius: 8px;
  color: #ff69b4;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  box-shadow: 
    0 0 10px rgba(255, 105, 180, 0.3),
    inset 0 0 5px rgba(255, 105, 180, 0.2);
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    transform: scale(1.1);
    border-color: #ff1493;
    box-shadow: 
      0 0 15px rgba(255, 105, 180, 0.5),
      inset 0 0 10px rgba(255, 105, 180, 0.3);
  }
`;

const RetroButton = styled.button`
  padding: 1em 2em;
  background: #ff1493;
  border: none;
  color: white;
  font-family: 'Press Start 2P', monospace;
  font-size: 1rem;
  position: relative;
  cursor: pointer;
  clip-path: polygon(
    0 0, 
    100% 0, 
    100% 70%,
    90% 100%,
    0 100%
  );
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 20, 147, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    height: 50%;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ErrorText = styled.p`
  color: #ff0000;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  animation: errorPulse 2s infinite;

  @keyframes errorPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const ChatBubble = styled.div`
  position: relative;
  background: linear-gradient(
    135deg, 
    rgba(255, 105, 180, 0.1) 0%,
    rgba(255, 20, 147, 0.2) 100%
  );
  backdrop-filter: blur(10px);
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, #ff1493, #ff69b4) 1;
  border-radius: 30px 30px 5px 30px;
  padding: 25px;
  margin-bottom: 40px;
  text-align: center;
  transform-style: preserve-3d;
  transition: transform 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 32px 32px 7px 32px;
    background: linear-gradient(45deg, #ff1493, #ff69b4);
    z-index: -1;
    opacity: 0.3;
    filter: blur(8px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 30px;
    border: 12px solid transparent;
    border-top: 15px solid #ff69b4;
    border-right: 15px solid #ff69b4;
    transform: skew(-15deg);
    filter: drop-shadow(0 4px 6px rgba(255, 20, 147, 0.3));
  }

  &:hover {
    transform: translateZ(20px) rotateX(-5deg);
  }
`;

const CatContainer = styled.div`
  text-align: center;
  margin: 30px 0;
  
  .cat-image {
    margin: 0 auto;
  }
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

const Scanlines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: url('/scanlines.png') repeat;
  background-size: 100% 100%;
`; 