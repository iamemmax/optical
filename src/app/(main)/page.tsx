"use client";

import React from "react";
import { motion } from "framer-motion";
import { MainHeader } from "./components/MainHeader";
import BannerLeftContainer from "./components/BannerLeftContainer";
import Marquee from "./components/Marquee";
import AboutSection from "./components/AboutSection";
import BenefitsSection from "./components/BenefitsSection";
import StepSection from "./components/StepSection";
import MarketTrend from "./components/MarketTrend";
import FaqSection from "./components/FaqSection";
import GetAppSection from "./components/GetAppSection";
import Footer from "./components/Footer";
import LandingPageBanner from "./components/landing-images/LandingPageBanner";
import WhatSetsUsApart from './components/WhatSetsUsApart';
import TestimonialSection from "./components/TestimonialSection";

const Page = () => {
  return (
    <div className="  overflow-y-scroll 2xl:pb-[3rem]">
      {/* scroll-smooth snap-y snap-mandatory */}

      <motion.section
        className="relative snap-start max-md:mt-[3rem]  lg:mt-[4rem] mb-[2rem]     md:px-[2rem] xl:px-[4.5rem]  flex flex-col justify-between   "
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className=" bg-[url('/images/homepage/landing-banner.svg')] flex justify-center md:h-screen bg-no-repeat bg-cover rounded-r-[3.125rem] max-md:py-10  bg-[#02010d] bg-opacity-50">
        <div className="grid grid-cols-1  lg:grid-cols-[1.5fr_1fr] relative z-10 overflow-x-hidden  overflow-hidden first-line: flex-1">
          <div className=" max-lg:py-16  flex justify-center relative items-center md:px-[2rem] xl:px-[4.5rem] ">
            <BannerLeftContainer />
          </div>
          <div className="h-full max-lg:hidden  flex justify-start items-center    relative overflow-hidden">
         <LandingPageBanner />
          </div>
        </div>

        </div>
      </motion.section>

      {/* Section 2 - About */}
      <motion.section
        className="snap-start min-h-screen   flex items-center  bg-[url('/images/homepage/landing-page-bg-2.svg')] z-[999999] bg-[position:top]  bg-no-repeat bg-cover  px-4 md:px-[2rem] xl:px-[4.5rem] justify-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <AboutSection />
      </motion.section>
      {/* Section 2 - About */}
      <motion.section
        className="snap-start min-h-screen  flex items-center justify-center px-4 md:px-[2rem] pb-5 xl:py-[50px] bg-[#0C0A3A] xl:px-[4.5rem]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <BenefitsSection />
      </motion.section>
      <div className="">
      <motion.section
        className="snap-start w-full flex flex-col items-center justify-center bg-[#080628]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <WhatSetsUsApart/>
        <StepSection />
      </motion.section>

      </div>

      <motion.section
        className="snap-start    flex items-center  bg-[url('/images/homepage/trending-page-bg.svg')] z-[999999]   bg-no-repeat bg-cover  justify-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <TestimonialSection />
      </motion.section>
      <motion.section
        className="snap-start    flex items-center  bg-[url('/images/homepage/trending-page-bg.svg')] z-[999999]   bg-no-repeat bg-cover  px-4 md:px-[2rem] xl:px-[4.5rem] justify-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <MarketTrend />
      </motion.section>

      <motion.section
        className="snap-start    flex items-center   z-[999999]   bg-no-repeat bg-cover  px-4 md:px-[2rem] xl:px-[4.5rem] justify-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <FaqSection />
      </motion.section>

      <motion.section
        className="snap-start    flex items-center   z-[999999] bg-[url('/images/homepage/landing-page-app-bg.svg')]   bg-no-repeat bg-cover bg-[position:bottom]  px-4 md:px-[2rem] xl:px-[4.5rem] justify-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <GetAppSection />
      </motion.section>

      <motion.section
        className="snap-start    flex items-center   z-[999999] bg-[#02010d]  px-4 md:px-[2rem] xl:px-[4.5rem] justify-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Footer />
      </motion.section>

      <div className="fixed bottom-0 lg:bottom-0 2xl:-bottom-0 left-0 w-full z-[99999] shadow-md">
        <Marquee />
      </div>
    </div>
  );
};

export default Page;
