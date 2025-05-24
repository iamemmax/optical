"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div className="overflow-y-auto  ">
      {/* Hero Section */}
      <motion.section
        className=" pt-[6rem] md:pt-[8rem] px-4 bg-[#02010d]   max-md:mt-[3rem]  lg:mt-[4rem] md:px-[2rem] xl:px-[4.5rem] relative bg-[url('/images/homepage/landing-banner.svg')]
bg-no-repeat bg-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          {/* About Us Header */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-white font-outfit text-sm">About Us</span>
            <div className="h-[1px] w-16 bg-white/30"></div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Built For Investor,
                <br />
                Trusted By Businesses.
              </h1>

              <p className="text-white/80 text-base md:text-lg mb-12 max-w-xl">
                Opticraft is an all in one platform where individual and
                institutional investors grow through professional trading and
                onlending services.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mt-8">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-900/30 p-3">
                    <span className="text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </span>
                  </div>
                  <div>
                    <p className="font-bold">800+</p>
                    <p className="text-sm text-gray-400">Investors</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-900/30 p-3">
                    <span className="text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                    </span>
                  </div>
                  <div>
                    <p className="font-bold">100%</p>
                    <p className="text-sm text-gray-400">Profit Margin</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-900/30 p-3">
                    <span className="text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </span>
                  </div>
                  <div>
                    <p className="font-bold">100%</p>
                    <p className="text-sm text-gray-400">Success Rate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Circular Animation */}
            <div className="relative hidden lg:block">
              <div className="absolute right-0 top-0 w-[400px] h-[400px]">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 border-2 border-white/10 rounded-full"></div>
                  <div className="absolute inset-0 border-2 border-white/5 rounded-full scale-[0.85]"></div>
                  <div className="absolute inset-0 border-2 border-white/5 rounded-full scale-[0.7]"></div>

                  {/* Blue dots */}
                  <div className="absolute top-[15%] right-[10%] w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="absolute top-[40%] right-[5%] w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="absolute bottom-[20%] right-[15%] w-3 h-3 bg-blue-500 rounded-full"></div>

                  {/* Loading arc */}
                  <div className="absolute top-[30%] right-[20%] w-[150px] h-[150px] border-4 border-white rounded-full border-t-transparent rotate-45"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Trading Charts Row */}
          <div className="mt-16 grid grid-cols-3 md:grid-cols-7 gap-2 md:gap-4">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="bg-blue-900/20 rounded-lg overflow-hidden"
              >
                <div className="h-20 w-full relative">
                  <Image
                    src="/images/about/chart-preview.png"
                    alt="Trading chart"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <motion.section
        className="py-16 md:py-24 bg-[#02010d] px-4 md:px-[2rem] xl:px-[4.5rem] "
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Mission */}
            <div className="flex flex-col">
              <h2 className="text-white text-3xl font-bold mb-6">Mission</h2>
              <p className="text-white/80 mb-8 max-w-md">
                To unlock access to smart financial opportunities through
                transparent, intuitive, and high-yield investment and lending
                solutions.
              </p>

              <div className="mt-auto">
                <div className="border border-blue-500/30 rounded-xl overflow-hidden">
                  <div className="relative h-[200px] md:h-[300px] w-full">
                    <Image
                      src="/images/about/phone-hand-1.jpg"
                      alt="Trading app in hand"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Vision */}
            <div className="flex flex-col">
              <div className="border border-blue-500/30 rounded-xl overflow-hidden mb-8">
                <div className="relative h-[200px] md:h-[300px] w-full">
                  <Image
                    src="/images/about/phone-hand-2.jpg"
                    alt="Trading app in hand"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h2 className="text-white text-3xl font-bold mb-6">Vision</h2>
              <p className="text-white/80 max-w-md">
                A world where capital flows easily and opportunities are open to
                everyone—investors, SMEs, and the everyday trader.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* What We Do Section */}
      <motion.section
        className="py-16 md:py-24 px-4 md:px-[2rem] bg-[#02010d] xl:px-[4.5rem]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <h2 className="text-white text-4xl font-bold mb-16">What We Do</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {/* Trading Signal */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9L7 5M7 5L11 9M7 5V19M21 15L17 19M17 19L13 15M17 19V5"
                    stroke="#0055FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white text-xl font-bold mb-2">
                  Trading Signal & Investment Insight
                </h3>
                <p className="text-white/70">
                  We provide intelligent signals and tools that help users make
                  data-driven trading decisions.
                </p>
              </div>
            </div>

            {/* Invoice Discounting */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
                    stroke="#0055FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white text-xl font-bold mb-2">
                  Invoice Discounting
                </h3>
                <p className="text-white/70">
                  Helping businesses access funds faster by trading unpaid
                  invoices.
                </p>
              </div>
            </div>

            {/* Asset Finance */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 6V12M12 12H16.5M12 12V18M12 12H7.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="#0055FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white text-xl font-bold mb-2">
                  Asset Finance & Payroll Lending
                </h3>
                <p className="text-white/70">
                  Supporting business growth with tailored financing for assets
                  or employee salaries.
                </p>
              </div>
            </div>

            {/* High Approval Rate */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="#0055FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white text-xl font-bold mb-2">
                  High Approval Rate For Loans
                </h3>
                <p className="text-white/70">24/7 Platform Access</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
