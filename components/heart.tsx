import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const beat = keyframes`
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.1); }
  40% { transform: scale(0.9); }
  60% { transform: scale(1.2); }
  75% { transform: scale(0.95); }
`;

const glow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 8px #ff1493); }
  50% { filter: drop-shadow(0 0 20px #ff1493); }
`;

const StyledWrapper = styled(motion.div)`
  .loader {
    position: relative;
    width: 60px;
    height: 80px;
    animation: ${beat} 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1),
               ${glow} 2s infinite ease-in-out;
  }

  .loader:before,
  .loader:after {
    content: "";
    background: linear-gradient(45deg, #ff1493, #ff69b4);
    width: 60px;
    height: 80px;
    border-radius: 50px 50px 0 0;
    position: absolute;
    left: 0;
    bottom: 0;
    transform: rotate(45deg);
    transform-origin: 50% 68%;
    box-shadow: 
      5px 4px 5px #0004 inset,
      0 0 15px #ff1493;
    transition: all 0.3s ease;
  }

  .loader:after {
    transform: rotate(-45deg);
  }

  &:hover .loader:before {
    transform: rotate(45deg) scale(1.1);
  }

  &:hover .loader:after {
    transform: rotate(-45deg) scale(1.1);
  }
`;

const Loader = () => {
  return (
    <StyledWrapper
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <div className="loader" />
    </StyledWrapper>
  );
}

export default Loader;
