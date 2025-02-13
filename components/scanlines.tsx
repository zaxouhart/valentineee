'use client';

import styled from 'styled-components';

export const Scanlines = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(0, 0, 0, 0.05) 50%
  );
  background-size: 100% 4px;
  z-index: 40;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 105, 180, 0.1),
      transparent 50%
    );
    animation: scanline 6s linear infinite;
  }

  @keyframes scanline {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`; 