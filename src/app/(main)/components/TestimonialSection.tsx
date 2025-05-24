"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
}

interface VisibleCard extends Testimonial {
  position: 'prev' | 'center' | 'next';
  originalIndex: number;
}

interface CardStyle {
  bgColor: string;
  textColor: string;
  scale: number;
  opacity: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jarvis Sonaiki",
    location: "Lagos, Nigeria",
    text: "Opticraft helped my business survive a cash flow gap",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    location: "Abuja, Nigeria",
    text: "Their trading dashboard is the easiest I've used",
  },
  {
    id: 3,
    name: "Mike Chen",
    location: "Toronto, Canada",
    text: "Best investment platform I've ever experienced",
  },
  {
    id: 4,
    name: "Lisa Rodriguez",
    location: "Lagos, Nigeria",
    text: "Exceptional customer service and easy interface",
  },
  {
    id: 5,
    name: "David Kim",
    location: "Abuja, Nigeria",
    text: "Their trading dashboard is intuitive and powerful",
  },
  {
    id: 6,
    name: "Emma Wilson",
    location: "Toronto, Canada",
    text: "Helped me achieve my financial goals quickly",
  },
];

const TestimonialSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [visibleCards, setVisibleCards] = useState<VisibleCard[]>([]);
  const [replacingIndex, setReplacingIndex] = useState<number | null>(null);
  const cardWidth = 400;
  const cardGap = 30;

  // Calculate which 3 cards should be visible
  useEffect(() => {
    const getVisibleCards = (): VisibleCard[] => {
      const prevIndex = activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;
      const nextIndex = (activeIndex + 1) % testimonials.length;
      
      return [
        { ...testimonials[prevIndex], position: 'prev', originalIndex: prevIndex },
        { ...testimonials[activeIndex], position: 'center', originalIndex: activeIndex },
        { ...testimonials[nextIndex], position: 'next', originalIndex: nextIndex }
      ];
    };

    setVisibleCards(getVisibleCards());
  }, [activeIndex]);

  // Get card styles based on position
  const getCardStyle = (position: 'prev' | 'center' | 'next'): CardStyle => {
    switch (position) {
      case 'prev':
        return {
          bgColor: "bg-black",
          textColor: "text-white",
          scale: 0.9,
          opacity: 0.8
        };
      case 'center':
        return {
          bgColor: "bg-[#0055FF]",
          textColor: "text-white",
          scale: 1.05,
          opacity: 1
        };
      case 'next':
        return {
          bgColor: "bg-white",
          textColor: "text-black",
          scale: 0.9,
          opacity: 0.8
        };
      default:
        return {
          bgColor: "bg-gray-200",
          textColor: "text-black",
          scale: 0.8,
          opacity: 0.5
        };
    }
  };

  // Handle navigation
  const goToPrev = (): void => {
    const prevIndex = activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;
    setReplacingIndex(prevIndex);
    setActiveIndex(prevIndex);
    
    // Reset the replacing index after animation completes
    setTimeout(() => {
      setReplacingIndex(null);
    }, 500);
  };

  const goToNext = (): void => {
    const nextIndex = (activeIndex + 1) % testimonials.length;
    setReplacingIndex(nextIndex);
    setActiveIndex(nextIndex);
    
    // Reset the replacing index after animation completes
    setTimeout(() => {
      setReplacingIndex(null);
    }, 500);
  };

  return (
    <div className="w-full bg-[#02010d] py-12 md:py-24 relative px-2 md:px-[2rem] xl:px-[4.5rem] overflow-hidden">
      <div className="container mx-auto px-2 md:px-6 relative z-10">
        <div className="text-center flex justify-between items-center">
          <div className="flex items-center gap-x-3">
            <p className="font-verdana text-lg md:text-xl mb-2 text-white">Testimonials</p>
            <div>
              <svg
                width="81"
                height="2"
                viewBox="0 0 81 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1.5H81V0.5H0V1.5Z" fill="white" opacity="0.2" />
              </svg>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-2 md:space-x-4">
            <button
              onClick={goToPrev}
              className="bg-[#02010D] text-white w-[2rem] h-[2rem] md:w-[2.5rem] md:h-[2.5rem] max-xl:p-1 xl:w-[4.5rem] xl:h-[4.5rem] border border-[#4453DD] flex justify-center items-center rounded-full transition-colors hover:bg-[#4453DD]"
              aria-label="Previous testimonial"
            >
              <svg
                width="24"
                height="18"
                viewBox="0 0 32 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.4275 0.571345C13.1814 0.325556 12.8478 0.1875 12.5 0.1875C12.1522 0.1875 11.8186 0.325556 11.5725 0.571345L1.0725 11.0713C0.82671 11.3174 0.688656 11.651 0.688656 11.9988C0.688656 12.3467 0.82671 12.6802 1.0725 12.9263L11.5725 23.4263C11.6927 23.5553 11.8376 23.6587 11.9986 23.7305C12.1596 23.8022 12.3334 23.8408 12.5096 23.8439C12.6858 23.847 12.8609 23.8146 13.0243 23.7486C13.1877 23.6825 13.3362 23.5843 13.4608 23.4597C13.5854 23.335 13.6837 23.1866 13.7497 23.0231C13.8157 22.8597 13.8481 22.6847 13.845 22.5084C13.8419 22.3322 13.8034 22.1584 13.7316 21.9974C13.6599 21.8364 13.5565 21.6915 13.4275 21.5713L5.1675 13.3113H30C30.3481 13.3113 30.6819 13.1731 30.9281 12.9269C31.1742 12.6808 31.3125 12.3469 31.3125 11.9988C31.3125 11.6507 31.1742 11.3169 30.9281 11.0708C30.6819 10.8246 30.3481 10.6863 30 10.6863H5.1675L13.4275 2.42635C13.6733 2.18025 13.8113 1.84666 13.8113 1.49884C13.8113 1.15103 13.6733 0.817439 13.4275 0.571345Z"
                  fill="white"
                />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="bg-[#02010D] text-white w-[2rem] h-[2rem] md:w-[2.5rem] md:h-[2.5rem] max-xl:p-1 xl:w-[4.5rem] xl:h-[4.5rem] border border-[#4453DD] flex justify-center items-center rounded-full transition-colors hover:bg-[#4453DD]"
              aria-label="Next testimonial"
            >
              <svg
                width="24"
                height="18"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.5725 9.57134C23.8186 9.32556 24.1522 9.1875 24.5 9.1875C24.8478 9.1875 25.1814 9.32556 25.4275 9.57134L35.9275 20.0713C36.1733 20.3174 36.3113 20.651 36.3113 20.9988C36.3113 21.3467 36.1733 21.6802 35.9275 21.9263L25.4275 32.4263C25.3073 32.5553 25.1624 32.6587 25.0014 32.7305C24.8404 32.8022 24.6666 32.8408 24.4904 32.8439C24.3142 32.847 24.1391 32.8146 23.9757 32.7486C23.8123 32.6825 23.6638 32.5843 23.5392 32.4597C23.4146 32.335 23.3163 32.1866 23.2503 32.0231C23.1843 31.8597 23.1519 31.6847 23.155 31.5084C23.1581 31.3322 23.1966 31.1584 23.2684 30.9974C23.3401 30.8364 23.4435 30.6915 23.5725 30.5713L31.8325 22.3113H7C6.6519 22.3113 6.31806 22.1731 6.07192 21.9269C5.82578 21.6808 5.6875 21.3469 5.6875 20.9988C5.6875 20.6507 5.82578 20.3169 6.07192 20.0708C6.31806 19.8246 6.6519 19.6863 7 19.6863H31.8325L23.5725 11.4263C23.3267 11.1803 23.1887 10.8467 23.1887 10.4988C23.1887 10.151 23.3267 9.81744 23.5725 9.57134Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden min-h-[100px]  md:mt-11">
          {/* Carousel Track - Show 3 cards on desktop, partial cards on mobile */}
          <div className="flex justify-center items-center h-full">
            {/* Desktop view - 3 full cards */}
            <div className="hidden lg:flex items-center justify-center gap-8">
              <AnimatePresence mode="popLayout">
                {visibleCards.map((card) => {
                  const { bgColor, textColor, scale, opacity } = getCardStyle(card.position);
                  const isReplacing = replacingIndex === card.originalIndex;
                  
                  return (
                    <motion.div
                      key={`${card.originalIndex}-${card.position}`}
                      className={`testimonial-card flex-shrink-0 w-[400px] px-6 md:py-12 rounded-2xl ${bgColor} ${textColor} cursor-pointer transition-all duration-300`}
                      onClick={() => setActiveIndex(card.originalIndex)}
                      initial={{ 
                        scale: 0.8, 
                        opacity: 0, 
                        y: 30,
                        x: isReplacing ? (card.position === 'prev' ? -100 : card.position === 'next' ? 100 : 0) : 0
                      }}
                      animate={{ 
                        scale,
                        opacity,
                        y: card.position === 'center' ? -10 : 0,
                        x: 0
                      }}
                      exit={{ 
                        scale: 0.8, 
                        opacity: 0, 
                        y: 30,
                        x: isReplacing ? (card.position === 'prev' ? -100 : card.position === 'next' ? 100 : 0) : 0,
                        transition: {
                          duration: 0.4,
                          ease: [0.4, 0.0, 0.2, 1]
                        }
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 25,
                        mass: 1.2,
                        duration: 0.5
                      }}
                      whileHover={{ 
                        scale: card.position === 'center' ? scale : scale + 0.05,
                        y: card.position === 'center' ? -15 : -5,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <h3 className="text-[25px] font-bold mb-4 leading-10">
                        THE BEST INVESTMENT PLATFORM!
                      </h3>
                      <p className="mb-8 text-base opacity-90">{card.text}</p>
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-gray-300 flex items-center justify-center">
                          <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-semibold">{card.name}</p>
                          <p className="text-xs opacity-80">
                            {card.location}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Mobile view - Main card with peek of adjacent cards */}
            <div className="lg:hidden relative overflow-hidden min-h-[300px] w-full">
              <div className="absolute w-full h-full flex items-center">
                <AnimatePresence mode="popLayout">
                  {visibleCards.map((card) => {
                    const { bgColor, textColor } = getCardStyle(card.position);
                    const isCenter = card.position === 'center';
                    const isReplacing = replacingIndex === card.originalIndex;
                    
                    // Calculate positions for better peeking effect
                    const leftPosition = card.position === 'prev' 
                      ? "-85%" 
                      : card.position === 'center' 
                        ? "0%" 
                        : "75%";
                    
                    return (
                      <motion.div
                        key={`${card.originalIndex}-${card.position}-mobile`}
                        className={`testimonial-card absolute px-5 py-7 rounded-2xl ${bgColor} ${textColor} cursor-pointer shadow-lg`}
                        style={{
                          height: "auto",
                          width: "85%", 
                          left: leftPosition,
                          opacity: isCenter ? 1 : 0.7,
                          zIndex: isCenter ? 20 : 10,
                        }}
                        initial={{ 
                          x: isReplacing ? (card.position === 'prev' ? -300 : card.position === 'next' ? 300 : 0) : 0,
                          opacity: 0,
                          scale: 0.85
                        }}
                        animate={{ 
                          x: 0,
                          opacity: isCenter ? 1 : 0.7,
                          scale: isCenter ? 1 : 0.95
                        }}
                        exit={{ 
                          x: isReplacing ? (card.position === 'prev' ? -300 : card.position === 'next' ? 300 : 0) : 0,
                          opacity: 0,
                          scale: 0.85,
                          transition: { 
                            duration: 0.5,
                            ease: [0.4, 0.0, 0.2, 1]
                          }
                        }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 30,
                          mass: 1.2
                        }}
                        whileHover={{ 
                          scale: isCenter ? 1.02 : 0.97,
                          transition: { duration: 0.2 }
                        }}
                        onClick={() => setActiveIndex(card.originalIndex)}
                      >
                        <h3 className="text-lg sm:text-xl font-bold mb-3 leading-7">
                          THE BEST INVESTMENT PLATFORM!
                        </h3>
                        <p className="mb-6 text-sm opacity-90">{card.text}</p>
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-300 flex items-center justify-center">
                            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{card.name}</p>
                            <p className="text-xs opacity-80">
                              {card.location}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
