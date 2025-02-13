'use client';

import { Particles } from '@/components/magicui/particles';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { AuroraText } from '@/components/magicui/aurora-text';
import EmojiShower from '@/components/emojiShower';
import BackgroundLove from '@/components/backgroundLove';
import Enter from '@/components/enter';

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState('#ff69b4');
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setColor(resolvedTheme === 'dark' ? '#ff69b4' : '#ff69b4');
  }, [resolvedTheme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-4 relative overflow-hidden">
      <Particles
        className="absolute inset-0 -z-10"
        quantity={100}
        staticity={30}
        color={color}
        ease={50}
        refresh={true}
      />
      <BackgroundLove />
      <EmojiShower />
      {showText && (
        <div className="animate-fade-in-scale z-10 flex flex-col items-center gap-8">
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl text-center">
            <span className="text-black">Veux-tu être </span>
            <AuroraText className="text-transparent">ma valentine</AuroraText>
            <span className="text-black"> ?</span>
          </h1>
          <Enter />
        </div>
      )}
    </main>
  );
}
