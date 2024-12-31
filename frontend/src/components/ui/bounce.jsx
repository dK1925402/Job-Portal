import styled, { keyframes } from 'styled-components';

// Define the bounce animation
const bounceKeyframes = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0); /* Stay at original position */
  }
  40% {
    transform: translateY(-10px); /* Move up slightly */
  }
  60% {
    transform: translateY(-5px); /* Move up even less */
  }
`;

// Create a styled component with animation
export const Bounce = styled.div`
  animation: 2s ${bounceKeyframes} infinite;
`;
