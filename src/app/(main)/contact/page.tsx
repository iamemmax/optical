"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "../components/Footer";
import AboutUsImage from "@/app/icons/AboutUsImage";
import MoneyIcon from "@/app/icons/MoneyIcon";
import UserGroupIcon from "@/app/icons/UserGroupIcon";
import CheckIcon from "@/app/icons/CheckIcon";
import NetworkIcon from "@/app/icons/NetworlIcon";
import GetReadyBanner from "../components/GetReadyBanner";
import { LinkButton } from "@/components/core";
import RightArrowIcon from "@/app/icons/RightArrow";
import ContactForm from "./ContactForm";
import TopMarquee from "../components/TopMaquee";

const ContactPage = () => {
  const bannerItemArray = [
    {
      icon: <UserGroupIcon />,
      name: "Investors",
      value: "800+",
    },
    {
      icon: <MoneyIcon />,
      name: "Profit Margin",
      value: "100%",
    },
    {
      icon: <UserGroupIcon />,
      name: "Success Rate",
      value: "100%",
    },
  ];

  

  return (
    <div className="overflow-y-auto  ">
      {/* Hero Section */}

      <div className="">
        <motion.section
          className="relative snap-start max-md:mt-[3rem]  lg:mt-[2rem] mb-[2rem]   h-auto  md:px-[2rem] xl:px-[4.5rem]  flex flex-col justify-between   "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.section
            className=" py-[4rem] px-4 bg-[#02010d]   max-md:mt-[3rem]   lg:mt-[4rem] md:px-[2rem] xl:px-[4.5rem] relative bg-[url('/images/homepage/landing-banner.svg')]
bg-no-repeat bg-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="container mx-auto">
              {/* About Us Header */}
              {/* Main Content */}
              <div className="grid grid-cols-1 items-center lg:grid-cols-[1.4fr_1fr] gap-12">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-white font-outfit text-sm">
                      Contac Us
                    </span>
                    <div className="h-[1px] w-16 bg-white/30"></div>
                  </div>

                  <div className="z-10">
                    <h1 className="max-xxscren:text-2xl text-4xl  xl:text-[2.8rem] 2xl:text-[3.25rem] 3xl:text-[4rem] font-verdana font-semibold text-white mb-6 leading-tight">
                      We’re Here to Help <br /> You 24/7.
                    </h1>

                    <p className="text-white/80 text-base md:text-lg xl:text-2xl mb-12 max-w-[500px]">
                      Have a question, need support, or want to partner with us?
                      Reach out and we’ll get back to you quickly.
                    </p>

                    {/* Stats */}
                    <div className="max-w-[150px]">
                      <LinkButton
                        href={"/login"}
                        className="bg-white max-xxscren:text-xs text-sm text-[#2B3AA6] rounded-10 rounded-s-[24px] rounded-e-[24px] gap-4 flex items-center  2xl:px-1 py-[0.625rem] px-3 md:px-4 font-outfit"
                      >
                        Get Started{" "}
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="12" cy="12" r="12" fill="#2B3AA6" />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.2667 15H13.1667C15.468 15 17.3333 13.1347 17.3333 10.8333C17.3333 8.532 15.468 6.66667 13.1667 6.66667H10.8333C8.532 6.66667 6.66667 8.532 6.66667 10.8333C6.66667 13.52 8.19867 15.1267 9.81 16.0953C10.6187 16.5813 11.4333 16.8953 12.049 17.0877C12.1248 17.1114 12.1973 17.1333 12.2667 17.1533V15ZM12.9333 18C12.9333 18 12.6787 17.957 12.2667 17.8457C10.53 17.375 6 15.6833 6 10.8333C6 8.164 8.164 6 10.8333 6H13.1667C15.836 6 18 8.164 18 10.8333C18 13.5027 15.836 15.6667 13.1667 15.6667H12.9333V18Z"
                            fill="white"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13.2317 8.16135C13.575 8.38935 13.8337 8.75901 13.8337 9.25468C13.8337 9.78068 13.6217 10.1673 13.278 10.404C13.1424 10.496 12.9926 10.5651 12.8347 10.6087V11.1193C12.8347 11.252 12.782 11.3791 12.6882 11.4729C12.5945 11.5667 12.4673 11.6193 12.3347 11.6193C12.2021 11.6193 12.0749 11.5667 11.9811 11.4729C11.8874 11.3791 11.8347 11.252 11.8347 11.1193V10.187C11.8346 10.0602 11.8828 9.93803 11.9695 9.84538C12.0561 9.75272 12.1748 9.69647 12.3013 9.68801C12.486 9.67568 12.626 9.63901 12.7103 9.58068C12.7445 9.55801 12.7721 9.52674 12.7903 9.49001C12.8103 9.45001 12.8337 9.37868 12.8337 9.25435C12.8337 9.15035 12.793 9.07035 12.678 8.99368C12.5473 8.90701 12.3373 8.84301 12.085 8.83501C11.8357 8.82701 11.5933 8.87568 11.415 8.96201C11.2363 9.04868 11.1707 9.14601 11.1523 9.21768C11.136 9.28128 11.1073 9.34105 11.0679 9.39356C11.0285 9.44608 10.9791 9.49031 10.9226 9.52374C10.866 9.55717 10.8035 9.57914 10.7385 9.58839C10.6735 9.59765 10.6073 9.59401 10.5437 9.57768C10.4801 9.56135 10.4203 9.53266 10.3678 9.49323C10.3153 9.45381 10.271 9.40443 10.2376 9.34791C10.2042 9.29139 10.1822 9.22884 10.173 9.16383C10.1637 9.09881 10.1673 9.03262 10.1837 8.96901C10.2987 8.52201 10.633 8.23001 10.979 8.06235C11.3257 7.89401 11.7333 7.82301 12.1167 7.83535C12.4977 7.84735 12.9043 7.94335 13.2317 8.16135Z"
                            fill="white"
                          />
                          <path
                            d="M13.0013 13.0007C13.0013 13.1775 12.9311 13.347 12.806 13.4721C12.681 13.5971 12.5114 13.6673 12.3346 13.6673C12.1578 13.6673 11.9883 13.5971 11.8632 13.4721C11.7382 13.347 11.668 13.1775 11.668 13.0007C11.668 12.8238 11.7382 12.6543 11.8632 12.5292C11.9883 12.4042 12.1578 12.334 12.3346 12.334C12.5114 12.334 12.681 12.4042 12.806 12.5292C12.9311 12.6543 13.0013 12.8238 13.0013 13.0007Z"
                            fill="white"
                          />
                        </svg>
                      </LinkButton>
                    </div>
                  </div>
                </div>

                {/* Circular Animation */}
                <div className="hidden justify-center lg:flex">
                  <AboutUsImage />
                </div>
              </div>

              {/* Trading Charts Row */}
            </div>
          </motion.section>

          <TopMarquee />
     <div className="mt-[5.375rem]">
        <ContactForm />
     </div>
        </motion.section>
      </div>

 
    
      <Footer />
    </div>
  );
};

export default ContactPage;
