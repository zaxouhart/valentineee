'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

export default function GameOver() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto pt-10"
      >
        <GameOverText
          initial={{ y: -100, scale: 0.3 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          GAME OVER
        </GameOverText>

        <motion.div
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", delay: 0.5 }}
          className="glitch-box p-6 my-8 border-2 border-red-500 rounded-lg bg-black/50"
        >
          <GlitchText>ERREUR 404: VALENTINE NON TROUVÉE</GlitchText>
          <p className="text-red-400 text-lg mt-4">
            Désolé, mais tu n&apos;es pas la valentine que je cherche ! 
            <br />
            <span className="text-sm opacity-70">
              (Ou alors tu as juste fait une faute de frappe... 🤔)
            </span>
          </p>
        </motion.div>

        <div className="flex gap-4 justify-center mt-12">
          <PixelButton
            onClick={() => router.push('/verification')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ↺ RÉESSAYER
          </PixelButton>
          
          <PixelButton
            onClick={() => router.push('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600"
          >
            ← RETOUR AU MENU
          </PixelButton>
        </div>
      </motion.div>
      <Scanlines />
    </main>
  );
}

const GameOverText = styled(motion.h1)`
  font-size: 5rem;
  font-weight: bold;
  text-align: center;
  color: #ff0000;
  text-shadow: 
    2px 2px 0 #ff000066,
    4px 4px 0 #ff000033,
    6px 6px 0 #ff000019;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% { text-shadow: 2px 2px 0 #ff000066, 4px 4px 0 #ff000033; }
    50% { text-shadow: 2px 2px 15px #ff0000, 4px 4px 15px #ff0000; }
  }
`;

const GlitchText = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  position: relative;
  text-shadow: 2px 2px #ff0000;
  animation: glitch 1s infinite;

  @keyframes glitch {
    0% { transform: translate(0) }
    20% { transform: translate(-2px, 2px) }
    40% { transform: translate(-2px, -2px) }
    60% { transform: translate(2px, 2px) }
    80% { transform: translate(2px, -2px) }
    100% { transform: translate(0) }
  }
`;

const PixelButton = styled(motion.button)`
  padding: 0.8em 1.5em;
  background: #ff0000;
  border: none;
  color: white;
  font-weight: bold;
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  position: relative;
  clip-path: polygon(
    0 0, 
    100% 0, 
    100% 70%,
    90% 100%,
    0 100%
  );

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    background: rgba(255, 255, 255, 0.1);
    clip-path: polygon(0 0, 100% 0, 100% 3px, 0 3px);
  }
`;

const Scanlines = styled.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(0, 0, 0, 0.5) 50%
  );
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 10;
  opacity: 0.15;
`; 