import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 150 };
  const trailerX = useSpring(cursorX, springConfig);
  const trailerY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      const isTouch = !window.matchMedia('(pointer: fine)').matches;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isTouch || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e) => {
      const target = e.target;
      if (target.closest('a') || target.closest('button') || target.closest('.interactive')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    if (!isMobile) {
      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mouseover', handleHover);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [cursorX, cursorY, isMobile]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? '#fff' : 'var(--color-brand-lime)',
        }}
      />
      <motion.div
        className="cursor-trailer"
        style={{
          x: trailerX,
          y: trailerY,
        }}
        animate={{
          scale: isHovered ? 2.5 : 1,
          opacity: isHovered ? 0.4 : 0.2,
        }}
      />
    </>
  );
};

export default CustomCursor;
