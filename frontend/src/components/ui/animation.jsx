import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define the keyframes for the animation
const appear = keyframes`
  from {
    opacity: 0;
    transform: scale(1);
  }
  to {
    opacity: 1;
    transform: scale(0);
  }
`;


const appear1 = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;


const appear2 = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const appear3 = keyframes`
  from {
    opacity: 0;
    transform: translateX(-200px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;


const appear4 = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

const appear5 = keyframes`
  from {
    opacity: 0;
    clip-path: inset (100% 100% 0
0);
  }
  to {
    opacity: 1;
    clip-path: inset (0 0 0
0);
  }
`;



// Create a styled component with the animation
export const Block = styled.div`
  animation: ${appear} 1s linear;
  /* Replace animation-timeline and animation-range with appropriate alternatives if supported */
 
`;

export const Block1 = styled.div`
  animation: ${appear1} 0.5s linear;
  /* Replace animation-timeline and animation-range with appropriate alternatives if supported */
 
`;

export const Block2 =styled.div`
  animation: ${appear2} 0.5s linear;
  /* Replace animation-timeline and animation-range with appropriate alternatives if supported */
 
`;

export const Block3 =styled.div`
  animation: ${appear3} 0.5s linear;
  /* Replace animation-timeline and animation-range with appropriate alternatives if supported */
 
`;

export const Block4 =styled.div`
  animation: ${appear4} 0.5s linear;
  /* Replace animation-timeline and animation-range with appropriate alternatives if supported */
 
`;

export const Block5 =styled.div`
  animation: ${appear5} 0.5s linear;
  /* Replace animation-timeline and animation-range with appropriate alternatives if supported */
 
`;




