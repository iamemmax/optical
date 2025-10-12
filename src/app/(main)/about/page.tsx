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
import { useAuth } from "@/contexts/authentication";
import { useRouter } from "next/navigation";

// Move TopMarquee inside the component or make it a separate component file
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
    <motion.div className="flex py-6 bg-[#0C083F] w-full  gap-[.625rem] overflow-x-hidden   -mt-[1.8rem]">
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

const AboutPage = () => {
  const {authState}=useAuth()
  const router = useRouter()
  const {isAuthenticated}=authState
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

  const aboutMissiondata = [
    {
      title: "Mission",
      decription:
        "To unlock access to smart financial opportunities through transparent, intuitive, and high-yield investment and lending solutions.",
      img: "/images/about/aboutImage1.png",
    },
    {
      title: "Vision",
      decription:
        "A world where capital flows easily and opportunities are open to everyone—investors, SMEs, and the everyday trader.",
      img: "/images/about/aboutImage2.png",
    },
  ];

  const whatWeGoArray = [
    {
      title: "Trading Signal & Investment Insight",
      description:
        "We provide intelligent signals and tools that help users make data-driven trading decisions.",
      icon: <NetworkIcon />,
    },
    {
      title: "Invoice Discounting",
      description:
        "Helping businesses access funds faster by trading unpaid invoices.",
      icon: <NetworkIcon />,
    },
    {
      title: "Asset Finance & Payroll Lending",
      description:
        "Supporting business growth with tailored financing for assets or employee salaries.",
      icon: <NetworkIcon />,
    },
    {
      title: "High Approval Rate For Loans",
      description: "24/7 Platform Access",
      icon: <NetworkIcon />,
    },
  ];

  return (
    <div className="overflow-y-auto  z-50">
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
                      About Us
                    </span>
                    <div className="h-[1px] w-16 bg-white/30"></div>
                  </div>

                  <div className="z-10">
                    <h1 className="max-xxscren:text-2xl text-4xl  xl:text-[2.8rem] 2xl:text-[3.25rem] 3xl:text-[4rem] font-verdana font-semibold text-white mb-6 leading-tight">
                      Built For Investor, <br /> Trusted By Businesses.
                    </h1>

                    <p className="text-white/80 text-base md:text-lg xl:text-2xl mb-12 max-w-[500px]">
                      Opticraft is an all in one platform where individual and
                      institutional investors grow through professional trading
                      and onlending services.
                    </p>

                    {/* Stats */}
                    <div className="flex items-center max-xl:mt-[3rem] 2xl:mt-[2.5rem] 3xl:mt-[4.5rem] gap-4 sm:gap-8">
                      {bannerItemArray?.map((item, idx: number) => (
                        <div
                          className="flex items-start max-xxscren:gap-2 gap-3"
                          key={idx}
                        >
                          <div className="h-[2.2rem] sm:h-[2.5rem] w-[2.2rem] sm:w-[2.625rem] rounded-full shrink-0 bg-[#11143D] flex justify-center items-center">
                            {item?.icon}
                          </div>
                          <div className="">
                            <h3 className="text-white text-xs sm:text-base font-semibold font-outfit">
                              {item?.value}
                            </h3>
                            <p className="text-white text-xxs sm:text-xs font-light mt-1 font-outfit">
                              {item?.name}
                            </p>
                          </div>
                        </div>
                      ))}
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
        </motion.section>
      </div>

      {/* Mission & Vision Section */}
      <motion.section
        className="py-16 md:py-24 bg-[#02010d] px-4 md:px-[2rem] xl:px-[4.5rem] "
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container w-full">
          {aboutMissiondata.map((item, idx) => (
            <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 ">
              <div
                className={`${idx % 2 === 1 ? "lg:order-2" : ""} px-4 py-[2.625rem]`}
              >
                <h2 className="text-white text-[2rem] font-verdana  font-bold mb-4">
                  {item.title}
                </h2>
                <p className="text-white/80 font-outfit text-lg mb-6 max-w-md">
                  {item.decription}
                </p>
              </div>
              <div
                className={`relative max-xxscren:h-[250px] h-[400px] md:h-[300px] 2xl:h-[500px] w-full ${idx % 2 === 1 ? "lg:order-1" : ""}`}
              >
                <Image
                  src={item.img}
                  alt={`${item.title} image`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12">
            {whatWeGoArray?.map((item, idx: number) => (
              <div className="flex gap-6" key={idx}>
                <div className="flex-shrink-0 w-8 h-8 p-2  bg-white rounded-full flex items-center justify-center">
                  {item?.icon}
                </div>
                <div className="">
                  <h3 className="text-white font-outfit max-w-[200px] text-xl font-bold mb-2">
                    {item?.title}
                  </h3>
                  <p className="text-white/70 font-outfit text-base xl:text-lg 2xl:text-xl  max-xl:max-w-[350px] 2xl:max-w-[550px]">{item?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <GetReadyBanner buttonName="Get Started" heading="Ready to invest smarter and scale faster on Opticraft Platform and enjoy maximum profit ?" onclick={()=> isAuthenticated ? router.push("/dashboard/investment") : router.push("/login")}/>
       <Footer />
    </div>
  );
};

export default AboutPage;