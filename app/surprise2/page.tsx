'use client';

import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { AuroraText } from '@/components/magicui/aurora-text';
import { Scanlines } from '@/components/scanlines';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`;

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
`;

const LetterContainer = styled.div`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 3rem;
  text-align: center;
  max-width: 600px;
`;

const Envelope = styled.div<{ $isOpen: boolean }>`
  position: relative;
  width: 300px;
  height: 200px;
  margin: 2rem auto;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => props.$isOpen ? 'scale(0.6) translateY(-100px)' : 'scale(1)'};
  opacity: ${props => props.$isOpen ? 0 : 1};
`;

const EnvelopeFront = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SparkleEffect = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  
  &::before, &::after {
    content: '✨';
    position: absolute;
    animation: ${sparkle} 2s infinite;
  }
  
  &::before { top: 10%; left: 10%; }
  &::after { bottom: 10%; right: 10%; }
`;

const Letter = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95vw;
  max-width: 1200px;
  height: 90vh;
  background: rgba(0, 0, 0, 0.95);
  border: 2px solid #ff69b4;
  border-radius: 20px;
  padding: 4rem;
  box-shadow: 0 0 100px rgba(255, 105, 180, 0.3);
  overflow-y: auto;
  z-index: 100;
  opacity: ${props => props.$isOpen ? 1 : 0};
  transition: all 0.5s ease-in-out;
  pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
`;

export default function Surprise2Page() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

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
        <LetterContainer>
          <AuroraText className="text-2xl font-bold mb-8 text-white">
            ✨ Une Lettre Pour Toi ! ✨
          </AuroraText>

          <Envelope onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
            <EnvelopeFront>
              <Image
                src="/enveloppe-front.png"
                alt="Enveloppe"
                width={300}
                height={200}
                className="rounded-lg"
                priority
              />
              <SparkleEffect />
              <p className="mt-4 text-white text-xl">
                Clique pour ouvrir ta lettre 💌
              </p>
            </EnvelopeFront>
          </Envelope>

          <Letter $isOpen={isOpen}>
            <div className="max-w-4xl mx-auto">
              <motion.p 
                className="text-pink-300"
                style={{ 
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "2.5rem",
                  lineHeight: "1.8",
                  letterSpacing: "1px",
                  textAlign: "center"
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Ma chère Zeinab,<br/><br/>
                En l&apos;espace d&apos;un mois, tu as illuminé ma vie d&apos;une façon que je n&apos;aurais jamais imaginée. 
                Notre histoire s&apos;écrit peut-être rapidement, ou pas assez, mais elle s&apos;écrit avec sincérité.<br/><br/>
                Depuis ton arrivée dans ma vie, tout semble plus lumineux, plus prometteur. 
                Pour la première fois, je me projette dans l&apos;avenir avec confiance, et je te vois à mes côtés.<br/><br/>
                Même si parfois la distance nous sépare et que je ne suis pas toujours aussi présent que je le voudrais,
                sache que tu occupes une place unique dans mon cœur. Cette distance qui nous sépare aujourd&apos;hui
                n&apos;est qu&apos;un prélude à nos futures retrouvailles.<br/><br/>
                Je veux que cette relation grandisse et s&apos;épanouisse, car tu es devenue précieuse à mes yeux.
                Je ne suis peut-être pas le plus doué pour exprimer mes sentiments, mais sache que chaque mot
                est sincère (tout comme les six heures passées à coder ce site pour toi 😊).<br/><br/>
                Je t&apos;aime.<br/><br/>
                Ton amoureux ❤️
              </motion.p>
            </div>
          </Letter>
        </LetterContainer>
      </motion.div>
    </Container>
  );
}