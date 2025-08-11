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
import DebounceInput from "../components/util/DebounceInput";
import TopMarquee from "../components/TopMaquee";


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

const faqData = [
  {
    title:"Investment & Trading",
    icon:<NetworkIcon/>,
    content:[
      {
        question: "What is Opticraft Trading Platform?",
        answer: "Opticraft Trading Platform is a comprehensive financial ecosystem that offers trading signals, investment opportunities, invoice discounting, and asset financing solutions. We help investors maximize returns while providing businesses with the capital they need to grow."
      },
      {
        question: "How do I start investing with Opticraft?",
        answer: "To start investing with Opticraft, simply create an account, complete the verification process, fund your account, and choose from our available investment opportunities. Our platform guides you through each step to ensure a smooth onboarding experience."
      },
      {
        question: "What are the minimum investment amounts?",
        answer: "Our minimum investment amounts vary by opportunity. For most trading signal subscriptions, you can start with as little as $100. For invoice discounting and asset financing opportunities, minimums typically start at $1,000. Check each specific opportunity for details."
      },
      {
        question: "How secure is my investment with Opticraft?",
        answer: "Security is our top priority. We implement bank-grade encryption, two-factor authentication, and regular security audits. Additionally, we maintain segregated accounts for client funds and follow strict regulatory compliance procedures to protect your investments."
      },
    ]
    

  },
  {
    title:"Onlending",
    icon:<NetworkIcon/>,
    content:[
      {
        question: "What is invoice discounting?",
        answer: "Invoice discounting, also known as accounts receivable financing, is a service where businesses can sell their unpaid invoices to Opticraft at a discounted rate. This provides immediate access to capital, helping businesses manage cash flow effectively."
      },
      {
        question: "How does invoice discounting work?",
        answer: "When you apply for invoice discounting, Opticraft reviews your invoices, verifies their validity, and provides you with a discounted amount based on the invoice's value and agreed-upon terms. You receive the funds within 24 hours, and Opticraft collects the full invoice amount from the debtor when it is due."
      },
      {
        question: "What types of invoices are eligible for discounting?",
        answer: "Eligible invoices must be from reputable clients, have a clear due date, and be for goods or services already provided. We do not discount invoices for speculative or future transactions."
      },
      {
        question: "How long does the invoice discounting process take?",
        answer: "The invoice discounting process is typically completed within 24 hours of application, subject to invoice verification. However, for expedited processing, there may be a small fee."
      },
      
    ]},
    {
      title:"Security & Accounts",
      icon:<NetworkIcon/>,
      content:[
        {
          question: "What is asset financing?",
          answer: "Asset financing, also known as equipment financing or capital leasing, is a service where businesses can borrow against the value of their assets, such as machinery, vehicles, or real estate. This provides businesses with the capital they need to acquire new assets or expand their operations."
        },
        {
          question: "How does asset financing work?",
          answer: "When you apply for asset financing, Opticraft assesses the value of your assets and provides you with a loan amount based on that value. You can then use this capital for various business purposes. The loan is typically repaid over a set period, often with interest."
        },
        {
          question: "What types of assets are eligible for financing?",
          answer: "Eligible assets include machinery, vehicles, real estate, and other business equipment. However, the specific types of assets that can be financed may vary based on local regulations and Opticraft's lending criteria."
        },
        {
          question: "How long does the asset financing process take?",
          answer: "The asset financing process can take anywhere from a few days to a week, depending on the complexity of the application and the verification of the asset's value. Expedited processing may be available for a fee."
        },
      ]

      



    },
    {
      title:"Deposit & Withdrawals",
      icon:<NetworkIcon/>,
      content:[
        {
          question: "What is Opticraft?",
          answer: "Opticraft is a smart trading investment platform that provides real-time trading signals, portfolio management, and secure transactions to help traders maximize their profits."
        },
        {
          question: "How does Opticraft work?",
          answer: "Opticraft uses advanced algorithms and machine learning to analyze market data and provide traders with real-time trading signals. Traders can then use these signals to make informed decisions and maximize their profits."
        },
        {
          question: "Is Opticraft safe to use?",
          answer: "Yes, Opticraft is safe to use. We use advanced security measures to protect your personal and financial information."
        },
        {
          question: "How do I get started with Opticraft?",
          answer: "To get started with Opticraft, simply create an account and start using our platform. You can then begin making trades and managing your portfolio."
        },
      ]

      



    },




];
const FaqPage = () => {



  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [filter, setFilter] = useState("")

  const handleToggle = (faqId: string) => {
    setOpenFaq(openFaq === faqId ? null : faqId);
  };






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
                    FAQ
                    </span>
                    <div className="h-[1px] w-16 bg-white/30"></div>
                  </div>

                  <div className="z-10">
                    <h1 className="max-xxscren:text-2xl text-4xl  xl:text-[2.8rem] 2xl:text-[3.25rem] 3xl:text-[4rem] font-verdana font-semibold text-white mb-6 leading-tight">
                    Got Questions? <br/> We’ve Got Answers
                    </h1>

                    <p className="text-white/80 text-base md:text-lg xl:text-2xl mb-12 max-w-[450px]">
                    rom investing to funding, find answers to the most common questions about Opticraft.
                    </p>
                    <div className="max-w-[18.875rem]">
                  <DebounceInput onChange={(e)=>setFilter(e)} value={filter} placeHolder="Search your question" />

                    </div>

                  </div>
                </div>

                {/* Circular Animation */}
                <div className="hidden justify-center lg:flex">
                  <AboutUsImage />
                </div>
              </div>

       
            </div>
          </motion.section>

          <TopMarquee />
          
          {/* FAQ Section */}
          <div className="container w-full px-4 py-16">
            <div className="w-full">
              
              {faqData?.map((item, idx) => (
      <div key={idx} className="mb-12">
        <div className="flex items-center mb-6 gap-4">
        <div className="flex-shrink-0 w-8 h-8 p-2  bg-white rounded-full flex items-center justify-center">
                  {item?.icon}
                </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white ">
          {item.title}
        </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {item.content?.map((faq, index) => {
            const faqId = `${idx}-${index}`;
            return (
              <FaqItem 
                key={index} 
                question={faq.question} 
                answer={faq.answer}
                isOpen={openFaq === faqId}
                onToggle={() => handleToggle(faqId)}
              />
            );
          })}
        </div>
      </div>
    ))}
            </div>
          </div>
        </motion.section>
      </div>

     

      {/* Footer */}
      <GetReadyBanner buttonName="Get Started" heading="Ready to invest smarter and scale faster on Opticraft Platform and enjoy maximum profit ?"/>
      <Footer />
    </div>
  );
};

const FaqItem = ({ 
  question, 
  answer, 
  isOpen, 
  onToggle 
}: { 
  question: string; 
  answer: string; 
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className=" rounded-lg overflow-hidden bg-white/10 h-fit">
      <button
        className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
        onClick={onToggle}
      >
        <h3 className="text-sm xl:text-xl font-medium text-white pr-4">{question}</h3>
        <div className={`w-6 h-6 flex items-center justify-center rounded-full transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 3L10.6 1.6L6 6.2L1.4 1.6L0 3L6 9Z" fill="#fff"/>
          </svg>
        </div>
      </button>
      
      <motion.div 
        initial={false}
        animate={{ 
          height: isOpen ? 'auto' : 0, 
          opacity: isOpen ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="p-6  text-white/80 border-t text-sm border-[#4453DD]/20">
          <p>{answer}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default FaqPage;
