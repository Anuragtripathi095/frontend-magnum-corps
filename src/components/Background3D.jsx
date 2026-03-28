import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Background3D = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse values
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate relative position (-0.5 to 0.5)
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Transform values for parallax effect
  const sphereX = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const sphereY = useTransform(springY, [-0.5, 0.5], [-30, 30]);
  
  const crystalX = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const crystalY = useTransform(springY, [-0.5, 0.5], [20, -20]);

  return (
    <div className="global-3d-layer" style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      pointerEvents: 'none', 
      zIndex: 0,
      overflow: 'hidden'
    }}>
      {/* Mesh Sphere (Top Left Rotating + Reactive) */}
      <motion.img 
        src="/images/mesh_sphere.png" 
        alt="" 
        className="asset-3d rotating-3d" 
        style={{ 
          top: '15%', 
          left: '0%', 
          width: '450px', 
          opacity: 0.35, 
          filter: 'blur(1px) hue-rotate(-150deg) saturate(200%)',
          x: sphereX,
          y: sphereY
        }} 
      />
      
      {/* Green Crystal (Mid Right Floating + Reactive) */}
      <motion.img 
        src="/images/3d_crystal.png" 
        alt="" 
        className="asset-3d float-slower" 
        style={{ 
          top: '60%', 
          right: '0%', 
          width: '350px', 
          opacity: 0.25, 
          filter: 'blur(2px) hue-rotate(-150deg) saturate(200%)',
          x: crystalX,
          y: crystalY
        }} 
      />
      
      {/* Subtle Background Glow that follows mouse */}
      <motion.div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(180, 254, 71, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          x: useTransform(springX, [-0.5, 0.5], [-200, 200]),
          y: useTransform(springY, [-0.5, 0.5], [-200, 200]),
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  );
};

export default Background3D;
