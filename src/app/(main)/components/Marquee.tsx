'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import LibertyAssuredLogo from '@/app/icons/logos/LibertyAssurdLogo';
import LibertyPayLogo from '@/app/icons/logos/LibertyPayLogo';
import Paybox360Logo from '@/app/icons/logos/Paybox360Logo';
import WinWiseLogo from '@/app/icons/logos/WInwiseLogo';
import WhisperSmsLogo from '@/app/icons/logos/WhisperSmsLogo';
import GetlinkedLogo from '@/app/icons/logos/GetlinkedLogo';
import SeedByPeniesLogo from '@/app/icons/logos/SeedByPeniesLogo';

const Marquee = () => {
  const [width, setWidth] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const cryptoData = [
    { icon: <LibertyAssuredLogo /> },
    { icon: <LibertyPayLogo /> },
    { icon: <Paybox360Logo /> },
    { icon: <WinWiseLogo /> },
    { icon: <WhisperSmsLogo /> },
    { icon: <GetlinkedLogo /> },
    { icon: <SeedByPeniesLogo /> },
  ];

  useEffect(() => {
    if (marqueeRef.current) {
      setWidth(marqueeRef.current.scrollWidth / 3);
    }
    
    // Recalculate on window resize
    const handleResize = () => {
      if (marqueeRef.current) {
        setWidth(marqueeRef.current.scrollWidth / 3);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Faster animation duration for all devices
  const getAnimationDuration = () => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1536) { // 2xl breakpoint
        return 10; // Faster for large screens
      } else if (window.innerWidth >= 1280) { // xl breakpoint
        return 12;
      }
    }
    return 15; // Default duration (faster than before)
  };

  return (
    <div className="w-full bg-[#02010d] py-4 2xl:py-6 overflow-hidden relative">
      {/* Animation overlay effects */}
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#02010d] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#0b0d01] to-transparent z-10"></div>
      
      <div className="flex items-center">
        <motion.div
          ref={marqueeRef}
          className="flex gap-10" 
          animate={{
            x: [-width, 0],
          }}
          transition={{
            x: {
              duration: getAnimationDuration(),
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }
          }}
        >
          {cryptoData.map((item, idx) => (
            <div 
              className="flex items-center gap-3 px-2" 
              key={idx}
            >
              <div className="flex-shrink-0">
                {item.icon}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;
