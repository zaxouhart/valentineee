'use client';

import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { AuroraText } from '@/components/magicui/aurora-text';
import Image from 'next/image';
import { useState } from 'react';
import { Scanlines } from '@/components/scanlines';
import { useRouter } from 'next/navigation';

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
`;

const shine = keyframes`
  0% { background-position: -100% 100%; }
  100% { background-position: 200% -100%; }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`;

export default function Surprise1Page() {
  const router = useRouter();
  const [isFlipped, setIsFlipped] = useState(false);
  const giftCode = "AMAZON-LOVE-2024-ZEINAB";
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(giftCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  return (
    <Container>
      <BackButton
        onClick={() => router.push('/success')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Retour aux surprises
      </BackButton>
      <Scanlines />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <GiftContainer>
          <AuroraText className="text-2xl font-bold mb-8">
            ✨ Ta Carte Cadeau Amazon ! ✨
          </AuroraText>

          <CardWrapper onClick={() => setIsFlipped(!isFlipped)}>
            <Card $isFlipped={isFlipped}>
              <CardFront>
                <Image
                  src="/audible-gift.png"
                  alt="Carte Cadeau Amazon"
                  width={400}
                  height={240}
                  className="rounded-lg shadow-2xl"
                  priority
                />
                <ShineEffect />
                <SparkleEffect />
                <p className="mt-6 text-white text-xl font-dancing">Clique pour découvrir ta surprise ! 🎁</p>
              </CardFront>

              <CardBack>
                <div className="text-center p-4">
                  <h3 className="text-3xl mb-6 text-pink-400 font-dancing">Ton Code Cadeau</h3>
                  <CodeBox>
                    {giftCode.split('').map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          delay: i * 0.1,
                          type: "spring",
                          stiffness: 100
                        }}
                        className="code-char"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </CodeBox>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                  >
                    <CopyButton
                      onClick={handleCopy}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isCopied ? '✨ Copié !' : '📋 Copier le code'}
                    </CopyButton>
                  </motion.div>
                </div>
              </CardBack>
            </Card>
          </CardWrapper>

          <InfoText>
            Je sais à quel point t&apos;aimes lire et j&apos;ai eu quelques difficultés à trouver un cadeau qui te ferait plaisir...<br/>
            Mais je me suis dis qu&apos;une carte cadeau amazon serait un bon compromis !<br/>
            <span className="text-sm opacity-80 mt-4 block">
              PS: y&apos;a un livre que je te recommande c&apos;est &quot;entre fauves&quot;🤗
            </span>
          </InfoText>
        </GiftContainer>
      </motion.div>
    </Container>
  );
}

const Container = styled.main`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a1a2a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow: hidden;
  position: relative;
`;

const GiftContainer = styled.div`
  animation: ${float} 6s ease-in-out infinite;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 3rem;
  text-align: center;
  max-width: 600px;
`;

const CardWrapper = styled.div`
  perspective: 1000px;
  cursor: pointer;
  margin: 2rem 0;
`;

const Card = styled.div<{ $isFlipped: boolean }>`
  position: relative;
  width: 400px;
  height: 240px;
  margin: 0 auto;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: ${props => props.$isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 105, 180, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 0 30px rgba(255, 105, 180, 0.3);
`;

const CardFront = styled(CardSide)`
  position: relative;
  overflow: hidden;
`;

const CardBack = styled(CardSide)`
  transform: rotateY(180deg);
  background: rgba(0, 0, 0, 0.8);
`;

const ShineEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 100%
  );
  background-size: 200% 200%;
  animation: ${shine} 3s infinite linear;
`;

const CodeBox = styled.div`
  background: linear-gradient(145deg, rgba(255, 105, 180, 0.1), rgba(255, 105, 180, 0.2));
  padding: 1.5rem;
  border-radius: 12px;
  letter-spacing: 3px;
  font-family: 'Space Mono', monospace;
  font-size: 1.4rem;
  color: #ff69b4;
  display: flex;
  gap: 6px;
  justify-content: center;
  flex-wrap: wrap;
  box-shadow: 0 0 20px rgba(255, 105, 180, 0.2);
  border: 1px solid rgba(255, 105, 180, 0.3);
  
  .code-char {
    text-shadow: 0 0 10px rgba(255, 105, 180, 0.5);
  }
`;

const InfoText = styled.p`
  color: #ff69b4;
  font-size: 1.1rem;
  line-height: 1.8;
  margin-top: 2rem;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.5px;
  font-weight: 300;
  
  span {
    font-style: italic;
  }
`;

const SparkleEffect = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  &::before, &::after {
    content: '✨';
    position: absolute;
    animation: ${sparkle} 2s infinite;
  }
  
  &::before {
    top: 10%;
    left: 10%;
  }
  
  &::after {
    bottom: 10%;
    right: 10%;
  }
`;

const CopyButton = styled(motion.button)`
  background: rgba(255, 105, 180, 0.2);
  border: 1px solid rgba(255, 105, 180, 0.3);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: #ff69b4;
  font-size: 0.9rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 105, 180, 0.3);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const BackButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 105, 180, 0.2);
  border: 1px solid rgba(255, 105, 180, 0.3);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: #ff69b4;
  font-size: 0.9rem;
  cursor: pointer;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(255, 105, 180, 0.3);
  }
`; 