import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button, LinkButton } from "@/components/core";

const BenefitsSection = () => {
  const slides = [
    {
      title: "real time Signals",
      description: "Get real time signals from our experts",
      id: 1,
      content: "Reliable Investment Opportunity",
      link: "#",
      img: "/images/homepage/banner1.png",
    },
    {
      title: "Risk Management & Optimization",
      description: "Optimize your risk management with our platform",
      id: 2,
      content: "Risk Management & Optimization",
      link: "#",
      img: "/images/homepage/banner2.png",
    },
    {
      title: "Expert-Led Trading",
      description: "Get expert-led trading signals",
      id: 3,
      content: "Expert-Led Trading",
      link: "#",
      img: "/images/homepage/banner3.png",
    },
    {
      title: "Transparency & Security",
      description: "Experience transparency and security with our platform",
      id: 4,
      content: "Transparency & Security",
      link: "#",
      img: "/images/homepage/banner4.png",
    },
    {
      title: "Onlending",
      description: "Get access to onlending services",
      id: 5,
      content: "Onlending",
      link: "#",
      img: "/images/homepage/banner5.png",
    },
  ];
  const slides2 = [
    {
      title: "Invoice Discounting",
      description:
        "OptiCraft Trading provides a seamless and trustworthy avenue for individuals to invest their capital, ensuring steady monthly returns",
      id: 1,
      content: "Invoice Discounting",
      link: "#",
      img: "/images/homepage/banner1.png",
    },
    {
      title: "real time Signals",
      description: "Get real time signals from our experts",
      id: 2,
      content: "Risk Management & Optimization",
      link: "#",
      img: "/images/homepage/banner2.png",
    },
    {
      title: "real time Signals",
      description: "Get expert-led trading signals",
      id: 3,
      content: "Expert-Led Trading",
      link: "#",
      img: "/images/homepage/banner3.png",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="w-full mt-3">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center py-[3rem] text-center">
          <h2 className="font-verdana font-bold text-[4rem] sm:text-[6rem] 2xl:text-[11.25rem] text-white text-opacity-10 underline leading-none">
            Services
          </h2>
          <p className="font-outfit font-bold text-2xl sm:text-3xl lg:text-[3rem] max-w-[53.125rem] text-white -mt-8   leading-[3rem] sm:leading-[3.5rem]">
            Our Investment Services
          </p>
        </div>

        {/* Content Grid */}
        <div className="bg-white w-full rounded-[20px] grid grid-cols-1 lg:grid-cols-2 px-6 sm:px-[2.625rem] py-8 sm:py-[3.3125rem] mt-3 gap-10 sm:gap-16">
          {/* Left Content */}
          <div className="flex flex-col justify-between space-y-8">
            <div className="">
              <h2 className="text-2xl sm:text-3xl 2xl:text-[3rem] font-verdana font-bold text-[#02010D]/10">
                Trading
              </h2>
            </div>

            <div className="">
              <div className="flex flex-col ">
                <h2 className="text-2xl sm:text-3xl 2xl:text-[32px] font-verdana font-bold text-[#02010D]">
                  {slides[activeIndex].title}
                </h2>
                <p className="text-base sm:text-lg 2xl:text-base font-outfit text-[#696969]">
                  {slides[activeIndex].description}
                </p>
              </div>

              {/* Pagination Buttons */}
              <div className="mt-6 flex flex-wrap gap-2  sm:gap-4">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-[2.375rem] w-[2.375rem] rounded-lg border text-xl font-outfit font-medium ${
                      idx === activeIndex
                        ? "border-[#02010D] text-[#02010D]"
                        : "border-[#696969] text-[#02010D4D]"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Carousel */}
          <div className="relative w-full h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[30rem] xl:h-[35rem] 2xl:h-[36rem] flex items-center justify-center rounded-lg overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[activeIndex].id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute w-full h-full"
              >
                <Image
                  src={slides[activeIndex]?.img}
                  alt="slide image"
                  fill
                  className="object-cover rounded-[1.25rem] object-center"
                  priority
                />
                <div className="flex justify-center items-center w-full">
                  <div className="absolute bottom-2 lg:bottom-10 py-3 xl:py-[1.5625rem] rounded-10 px-3 sm:px-6 flex justify-between items-center  bg-white w-[95%] ">
                    <h2 className="text-xxs sm:text-sm xl:text-[1.5rem] font-outfit font-medium text-[#02010D]">
                      {slides[activeIndex].content}
                    </h2>
                    <LinkButton
                      href={slides[activeIndex]?.link}
                      className="bg-[#080628] max-xxscren:text-[.5rem] text-[.5625rem] xl:text-sm text-white rounded-10 rounded-s-[24px] rounded-e-[24px] gap-2 xl:gap-4 flex items-center px-3 xl:px-6 py-2 xl:py-[0.625rem] font-outfit"
                    >
                      Get Started{" "}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.9813 3.64671C9.07505 3.55308 9.20213 3.50049 9.33463 3.50049C9.46714 3.50049 9.59422 3.55308 9.68797 3.64671L13.688 7.64672C13.7816 7.74047 13.8342 7.86755 13.8342 8.00005C13.8342 8.13255 13.7816 8.25963 13.688 8.35338L9.68797 12.3534C9.64219 12.4025 9.58699 12.4419 9.52566 12.4692C9.46433 12.4966 9.39812 12.5113 9.33098 12.5124C9.26385 12.5136 9.19716 12.5013 9.1349 12.4761C9.07264 12.451 9.01609 12.4136 8.96861 12.3661C8.92113 12.3186 8.8837 12.262 8.85855 12.1998C8.83341 12.1375 8.82106 12.0708 8.82224 12.0037C8.82342 11.9366 8.83812 11.8704 8.86545 11.809C8.89278 11.7477 8.93218 11.6925 8.9813 11.6467L12.128 8.50005H2.66797C2.53536 8.50005 2.40818 8.44737 2.31442 8.3536C2.22065 8.25983 2.16797 8.13266 2.16797 8.00005C2.16797 7.86744 2.22065 7.74026 2.31442 7.6465C2.40818 7.55273 2.53536 7.50005 2.66797 7.50005H12.128L8.9813 4.35338C8.88767 4.25963 8.83507 4.13255 8.83507 4.00005C8.83507 3.86755 8.88767 3.74047 8.9813 3.64671Z"
                          fill="#fff"
                        />
                      </svg>
                    </LinkButton>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="bg-white w-full rounded-[20px] grid grid-cols-1 lg:grid-cols-2 px-6 sm:px-[2.625rem] py-8 sm:py-[3.3125rem] mt-5 xl:mt-[52px] gap-10 sm:gap-16">
          {/* Left Content */}
          <div className="relative w-full max-md:order-2 h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[30rem] xl:h-[35rem] 2xl:h-[36rem] flex items-center justify-center rounded-lg overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides2[activeIndex].id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute w-full h-full"
              >
                <Image
                  src={slides2[activeIndex]?.img}
                  alt="slide image"
                  fill
                  className="object-cover rounded-[1.25rem] object-center"
                  priority
                />
                <div className="flex justify-center items-center w-full">
                  <div className="absolute bottom-2 lg:bottom-10 py-3 xl:py-[1.5625rem] rounded-10 px-3 sm:px-6 flex justify-between items-center  bg-white w-[95%] ">
                    <h2 className="text-xxs sm:text-sm xl:text-[1.5rem] font-outfit font-medium text-[#02010D]">
                      {slides2[activeIndex]?.content}
                    </h2>
                    <LinkButton
                      href={slides2[activeIndex]?.link}
                      className="bg-[#080628] max-xxscren:text-[.5rem] text-[.5625rem] xl:text-sm text-white rounded-10 rounded-s-[24px] rounded-e-[24px] gap-2 xl:gap-4 flex items-center px-3 xl:px-6 py-2 xl:py-[0.625rem] font-outfit"
                    >
                      Get Started{" "}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.9813 3.64671C9.07505 3.55308 9.20213 3.50049 9.33463 3.50049C9.46714 3.50049 9.59422 3.55308 9.68797 3.64671L13.688 7.64672C13.7816 7.74047 13.8342 7.86755 13.8342 8.00005C13.8342 8.13255 13.7816 8.25963 13.688 8.35338L9.68797 12.3534C9.64219 12.4025 9.58699 12.4419 9.52566 12.4692C9.46433 12.4966 9.39812 12.5113 9.33098 12.5124C9.26385 12.5136 9.19716 12.5013 9.1349 12.4761C9.07264 12.451 9.01609 12.4136 8.96861 12.3661C8.92113 12.3186 8.8837 12.262 8.85855 12.1998C8.83341 12.1375 8.82106 12.0708 8.82224 12.0037C8.82342 11.9366 8.83812 11.8704 8.86545 11.809C8.89278 11.7477 8.93218 11.6925 8.9813 11.6467L12.128 8.50005H2.66797C2.53536 8.50005 2.40818 8.44737 2.31442 8.3536C2.22065 8.25983 2.16797 8.13266 2.16797 8.00005C2.16797 7.86744 2.22065 7.74026 2.31442 7.6465C2.40818 7.55273 2.53536 7.50005 2.66797 7.50005H12.128L8.9813 4.35338C8.88767 4.25963 8.83507 4.13255 8.83507 4.00005C8.83507 3.86755 8.88767 3.74047 8.9813 3.64671Z"
                          fill="#fff"
                        />
                      </svg>
                    </LinkButton>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Right Carousel */}
          <div className="flex flex-col max-md:order-1 justify-between space-y-8">
            <div className="">
              <h2 className="text-2xl sm:text-3xl 2xl:text-[3rem] font-verdana font-bold text-[#02010D]/10">
              Onlending
              </h2>
            </div>

            <div className="">
              <div className="flex flex-col ">
                <h2 className="text-2xl sm:text-3xl 2xl:text-[32px] font-verdana font-bold text-[#02010D]">
                  {slides2[activeIndex].title}
                </h2>
                <p className="text-base sm:text-lg 2xl:text-base font-outfit text-[#696969]">
                  {slides2[activeIndex].description}
                </p>
              </div>

              {/* Pagination Buttons */}
              <div className="mt-6 flex flex-wrap gap-2  sm:gap-4">
                {slides2.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-[2.375rem] w-[2.375rem] rounded-lg border text-xl font-outfit font-medium ${
                      idx === activeIndex
                        ? "border-[#02010D] text-[#02010D]"
                        : "border-[#696969] text-[#02010D4D]"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BenefitsSection;
