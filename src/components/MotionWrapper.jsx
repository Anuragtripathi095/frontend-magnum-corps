import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef } from 'react';

/**
 * Reusable wrapper for standard Magnus animations
 */
export const Reveal = ({ children, delay = 0, width = "auto" }) => {
  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: [0.25, 1, 0.5, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const StaggerContainer = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ 
        staggerChildren: 0.1, 
        delayChildren: delay 
      }}
    >
      {children}
    </motion.div>
  );
};

export const TiltCard = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        rotateX: 10, 
        rotateY: -10, 
        scale: 1.02,
        z: 50
      }}
      style={{ 
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

export const Parallax = ({ children, offset = 100 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yValue = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const y = useSpring(yValue, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
};

export const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, display: 'inline-block', cursor: 'pointer', userSelect: 'none' }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-brand-lime z-[9999]"
      style={{ scaleX, transformOrigin: "0%" }}
    />
  );
};
