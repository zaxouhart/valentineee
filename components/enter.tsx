import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const Enter = () => {
  const router = useRouter();

  const handleSuccess = () => {
    document.body.style.overflow = 'hidden';
    const glitchEffect = new Audio('/audio-glitch.wav');
    glitchEffect.play();
    
    document.documentElement.classList.add('glitch-effect');
    setTimeout(() => {
      router.push('/verification');
    }, 500);
  };

  return (
    <StyledWrapper className="flex flex-col sm:flex-row gap-4">
      <button className="button yes-button" onClick={handleSuccess}>
        <div><span>Avec plaisir ! 💝</span></div>
      </button>
      <button className="button no-button">
        <div><span>Laisse-moi réfléchir... 🤔</span></div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    font-size: 1rem;
    @media (min-width: 640px) {
      font-size: 1.125rem;
    }
    cursor: pointer;
    position: relative;
    font-family: "Rubik", sans-serif;
    font-weight: bold;
    line-height: 1;
    padding: 1px;
    transform: translate(-4px, -4px);
    outline: 2px solid transparent;
    outline-offset: 5px;
    border-radius: 9999px;
    color: white;
    transition:
      transform 150ms ease,
      box-shadow 150ms ease;
    text-align: center;
    width: 100%;
    @media (min-width: 640px) {
      width: auto;
    }
  }

  .yes-button {
    --button-light: #ffe6e6;
    --button-dark: #ff1493;
    --button-accent: #ff69b4;
    background-color: var(--button-dark);
    box-shadow:
      0.5px 0.5px 0 0 var(--button-dark),
      1px 1px 0 0 var(--button-dark),
      1.5px 1.5px 0 0 var(--button-dark),
      2px 2px 0 0 var(--button-dark),
      2.5px 2.5px 0 0 var(--button-dark),
      3px 3px 0 0 var(--button-dark),
      0 0 0 2px var(--button-light),
      0.5px 0.5px 0 2px var(--button-light),
      1px 1px 0 2px var(--button-light),
      1.5px 1.5px 0 2px var(--button-light),
      2px 2px 0 2px var(--button-light),
      2.5px 2.5px 0 2px var(--button-light),
      3px 3px 0 2px var(--button-light),
      3.5px 3.5px 0 2px var(--button-light),
      4px 4px 0 2px var(--button-light);

    & > div {
      background-color: var(--button-accent);
    }

    &:hover {
      transform: translate(0, 0);
      box-shadow: 0 0 0 2px var(--button-light);
    }
  }

  .no-button {
    --button-light: #e6e6ff;
    --button-dark: #8a2be2;
    --button-accent: #9370db;
    background-color: var(--button-dark);
    box-shadow:
      0.5px 0.5px 0 0 var(--button-dark),
      1px 1px 0 0 var(--button-dark),
      1.5px 1.5px 0 0 var(--button-dark),
      2px 2px 0 0 var(--button-dark),
      2.5px 2.5px 0 0 var(--button-dark),
      3px 3px 0 0 var(--button-dark),
      0 0 0 2px var(--button-light),
      0.5px 0.5px 0 2px var(--button-light),
      1px 1px 0 2px var(--button-light),
      1.5px 1.5px 0 2px var(--button-light),
      2px 2px 0 2px var(--button-light),
      2.5px 2.5px 0 2px var(--button-light),
      3px 3px 0 2px var(--button-light),
      3.5px 3.5px 0 2px var(--button-light),
      4px 4px 0 2px var(--button-light);

    & > div {
      background-color: var(--button-accent);
    }

    transition: transform 0.3s ease;

    &:hover {
      @media (max-width: 639px) {
        transform: translate(150vw, 0);
      }
      @media (min-width: 640px) {
        transform: translate(-200px, -200px);
      }
      box-shadow: 0 0 0 2px var(--button-light);
    }
  }

  .button > div {
    position: relative;
    pointer-events: none;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 9999px;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 9999px;
      opacity: 0.5;
      background-image: radial-gradient(
          rgb(255 255 255 / 80%) 20%,
          transparent 20%
        ),
        radial-gradient(rgb(255 255 255 / 100%) 20%, transparent 20%);
      background-position:
        0 0,
        4px 4px;
      background-size: 8px 8px;
      mix-blend-mode: hard-light;
      animation: dots 0.5s infinite linear;
    }

    & > span {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1.25rem;
      gap: 0.25rem;
      filter: drop-shadow(0 -1px 0 rgba(255, 255, 255, 0.25));

      &:active {
        transform: translateY(2px);
      }
    }
  }

  @keyframes dots {
    0% {
      background-position:
        0 0,
        4px 4px;
    }
    100% {
      background-position:
        8px 0,
        12px 4px;
    }
  }
`;

export default Enter;
