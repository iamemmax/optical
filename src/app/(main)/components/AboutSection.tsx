'use client';

import React from "react";
import { motion } from "framer-motion";
import AboutDashboardImage1 from "@/app/icons/AboutDashboardImage1";
import AboutImageDashboard2 from "@/app/icons/AboutImage2";
import { Button } from "@/components/core";

const AboutSection = () => {
  return (
    <section className="flex items-center w-full text-white px-4 overflow-x-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
        {/* Left Side Content */}
        <div className="flex flex-col justify-center space-y-6 3xl:max-w-[95%]">
          <div className="flex items-center gap-x-3">
            <p className="font-verdana text-xl ">About Us</p>
            <div>
              <svg width="81" height="2" viewBox="0 0 81 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_123)">
                  <g transform="matrix(0.0405 0 0 0.0005 40.5 2)">
                    <foreignObject x="-1000" y="-1000" width="2000" height="2000">
                      <div style={{
                        background:
                          'conic-gradient(from 90deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,1) 200.4deg, rgba(255,255,255,0) 360deg)',
                        height: '100%',
                        width: '100%',
                        opacity: 0.8,
                      }} />
                    </foreignObject>
                  </g>
                </g>
                <path d="M0 1.5H81V0.5H0V1.5Z" fill="white" opacity="0.2" />
                <defs>
                  <clipPath id="clip0_123">
                    <path d="M0 1.5H81V0.5H0V1.5Z" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          
<div className="">

          <h2 className="text-[2rem] max-xxscren:text-[1rem]  lg:text-[2.25rem] 2xl:text-[3.5rem] font-verdana font-bold text-white text-opacity-30 leading-tight">
          Built for Investor, Trusted by Businesses.
          </h2>

<div className="leading-10">

          <p className="font-outfit py-2 text-sm 2xl:text-xl md:max-w-[92%] mt-3">
          Opticraft is an all in one platform where individual and institutional investors grow through professional trading and onlending services. 
          
          </p>
          <p className=" font-outfit text-sm 2xl:text-xl py-1">
          Our mission is simple: Make financial growth accessible and secure.
          
          </p>
</div>
</div>

          <div className=" mt-5">
            <Button className="flex items-center gap-2 bg-transparent text-[#4649E5]  transition-colors px-0 py-2 rounded-10 font-bold">
            Learn More
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.47 5.46934C13.6106 5.32889 13.8012 5.25 14 5.25C14.1988 5.25 14.3894 5.32889 14.53 5.46934L20.53 11.4693C20.6705 11.61 20.7493 11.8006 20.7493 11.9993C20.7493 12.1981 20.6705 12.3887 20.53 12.5293L14.53 18.5293C14.4613 18.603 14.3785 18.6621 14.2865 18.7031C14.1945 18.7441 14.0952 18.7662 13.9945 18.7679C13.8938 18.7697 13.7938 18.7512 13.7004 18.7135C13.607 18.6757 13.5222 18.6196 13.451 18.5484C13.3797 18.4772 13.3236 18.3923 13.2859 18.2989C13.2482 18.2055 13.2296 18.1055 13.2314 18.0048C13.2332 17.9041 13.2552 17.8048 13.2962 17.7128C13.3372 17.6208 13.3963 17.538 13.47 17.4693L18.19 12.7493H4C3.80109 12.7493 3.61032 12.6703 3.46967 12.5297C3.32902 12.389 3.25 12.1983 3.25 11.9993C3.25 11.8004 3.32902 11.6097 3.46967 11.469C3.61032 11.3284 3.80109 11.2493 4 11.2493H18.19L13.47 6.52934C13.3295 6.38871 13.2507 6.19809 13.2507 5.99934C13.2507 5.80059 13.3295 5.60997 13.47 5.46934Z" fill="#4649E5"/>
</svg>

            </Button>
          </div>
        </div>


        {/* Right Side Images with Framer Animation */}
        <div className="hidden max-lg:-mt-10 sm:flex flex-col relative items-end justify-end w-full">
          {/* First Image */}
          <motion.div
            className="pr-[5rem] 2xl:pr-[7rem]"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <AboutDashboardImage1 className="max-lg:max-w-[400px] max-2xl:max-w-[350px]" />
          </motion.div>

          {/* Second Image */}
          <motion.div
            className="-mt-[10rem] lg:-mt-[12rem] 3xl:-mt-[6.125rem] "
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <AboutImageDashboard2 className="max-lg:max-w-[400px] max-2xl:max-w-[350px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
