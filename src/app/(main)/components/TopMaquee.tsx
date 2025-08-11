import React, { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion";
import CheckIcon from '@/app/icons/CheckIcon';
const TopMarquee = () => {
  const [width, setWidth] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);
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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Faster animation duration for all devices
  const getAnimationDuration = () => {
    // Check if window is available (client-side)
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1536) {
        // 2xl breakpoint
        return 7; // Faster for large screens (was 10)
      } else if (window.innerWidth >= 1280) {
        // xl breakpoint
        return 8; // Faster for medium screens (was 12)
      }
    }
    return 10; // Default duration (was 15)
  };
  const navItems = [
    "Opticraft Investment Platform",
    "Your number one gateway to wealth",
    "Onlending",
    "Trading Signals",
    "Invoice Discounting",
  ];

  return (
    <motion.div className="flex py-6 bg-[#0C083F] w-full  gap-[.625rem] overflow-x-hidden  z-[99] -mt-[1.8rem]">
      {navItems.map((item, index) => (
        <motion.div
          ref={marqueeRef}
          animate={{
            x: [-width, 0],
          }}
          transition={{
            x: {
              duration: getAnimationDuration(),
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            },
          }}
          key={index}
          className="flex items-center flex-nowrap  text-white"
        >
          <div className="flex items-center gap-2">
            <span className="mr-2 text-nowrap text-sm font-outfit">{item}</span>
            <CheckIcon />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TopMarquee