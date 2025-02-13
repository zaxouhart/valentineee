'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { AuroraText } from '@/components/magicui/aurora-text';
import EmojiShower from '@/components/emojiShower';
import BackgroundLove from '@/components/backgroundLove';
import { Scanlines } from '@/components/scanlines';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 105, 180, 0.4); }
  50% { box-shadow: 0 0 30px rgba(255, 105, 180, 0.7); }
`;

export default function SuccessPage() {
  const router = useRouter();
  const [showElements, setShowElements] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowElements(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <BackgroundLove />
      <EmojiShower />
      <Scanlines />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <HeartContainer>
          <Image 
            src="/success-heart.gif" 
            alt="Coeur battant"
            width={150}
            height={150}
            className="mx-auto mb-6"
            priority
          />
          
          <AuroraText className="text-3xl font-bold mb-6 text-white">
            Bingo ! Marou chandou ✨
          </AuroraText>

          {showElements && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <LoveMessage>
                J&apos;ai préparé quelques petites surprises rien que pour toi...
                <br />
                Choisis une boîte mystère ! 🎁
              </LoveMessage>

              <MysteryBoxContainer>
                <MysteryBox
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/surprise1')}
                >
                  <Image 
                    src="/mystery-box.png" 
                    alt="Boîte mystère 1"
                    width={120}
                    height={120}
                    priority
                  />
                  <span className="mt-2 block text-white">Surprise #1</span>
                </MysteryBox>

                <MysteryBox
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/surprise2')}
                >
                  <Image 
                    src="/mystery-box.png" 
                    alt="Boîte mystère 2"
                    width={120}
                    height={120}
                    priority
                  />
                  <span className="mt-2 block text-white">Surprise #2</span>
                </MysteryBox>
              </MysteryBoxContainer>
            </motion.div>
          )}
        </HeartContainer>
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

const HeartContainer = styled.div`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 3rem;
  box-shadow: 
    0 0 30px rgba(255, 20, 147, 0.2),
    0 0 60px rgba(255, 20, 147, 0.1);
  max-width: 800px;
  transform-style: preserve-3d;
  perspective: 1000px;
`;

const LoveMessage = styled.p`
  font-size: 2rem;
  line-height: 2;
  color: #ff69b4;
  margin-top: 2rem;
  font-family: 'Dancing Script', cursive;
  text-shadow: 0 0 10px rgba(255, 105, 180, 0.5);
`;

const MysteryBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  padding: 1rem;
`;

const MysteryBox = styled(motion.button)`
  background: rgba(255, 105, 180, 0.1);
  border: 2px solid rgba(255, 105, 180, 0.3);
  border-radius: 15px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${float} 3s ease-in-out infinite;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    background: linear-gradient(45deg, #ff1493, #ff69b4, #ff1493);
    border-radius: 17px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: scale(1.05) translateY(-5px);
    border-color: transparent;
    background: rgba(255, 105, 180, 0.2);
    animation: ${glow} 2s ease-in-out infinite;
    
    &::before {
      opacity: 1;
    }
    
    img {
      transform: scale(1.1);
      filter: drop-shadow(0 0 10px rgba(255, 105, 180, 0.6));
    }
    
    span {
      color: #fff;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    }
  }
  
  &:active {
    transform: scale(0.95) translateY(5px);
  }
  
  img {
    transition: all 0.3s ease;
  }
  
  span {
    transition: all 0.3s ease;
  }
`; 