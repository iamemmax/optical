import CheckIcon from "@/app/icons/CheckIcon";
import ContactSales from "@/app/icons/ContactSales";
import MoneyIcon from "@/app/icons/MoneyIcon";
import PlayIcon from "@/app/icons/PlayIcon";
import RightArrowIcon from "@/app/icons/RightArrow";
import UserGroupIcon from "@/app/icons/UserGroupIcon";
import WaveIcon from "@/app/icons/WaveIcon";
import { Button, LinkButton } from "@/components/core";
import React from "react";
// import Marquee from "./Marquee";

const BannerLeftContainer = () => {

    const bannerItemArray =[
        {
            icon:<UserGroupIcon />,
            name:"Investors",
            value:"800+"
        },
        {
            icon:<MoneyIcon/>,
            name:"Profit Margin",
            value:"100%"
        },
        {
            icon:<UserGroupIcon/>,
            name:"Success Rate",
            value:"100%"
        },
    ]
  return (
    <div className=" px-4">
      <div className="flex items-center bg-[#0B0740] gap-2 sm:px-4 sm:py-[.625rem] max-xxscren:-mt-10 rounded-[1.875rem] max-w-[14rem] sm:max-w-[18.5rem]  justify-center">
        <p className="text-white max-xxscren:text-[11px] text-xs sm:text-sm font-outfit font-medium">
        Your number one gateway to wealth
        </p>
        <CheckIcon />
      </div>
      <div className="mt-2">
        <h2 className="text-white font-verdana font-bold max-sm:text-[2.5rem] max-xxscren:text-[1.6rem]   2xl:leading-[5rem]  2xl:text-[4.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[2.5rem] 4xl:text-[4.8rem]">Smarter <span className="text-[#4649E5]">Investments</span> Real.  <span className="text-[#4649E5]">Returns.</span></h2>
      <p className="mt-4 max-xxscren:text-sm max-w-[95%] 2xl:max-w-[75%] text-base md:text-[1rem] xl:text-lg  font-outfit text-white/70">Join investors and businesses leveraging the power of Opticraft to grow smarter, earn better, and move faster.</p>
      </div>
      <div className=" mt-5 xl:mt-8 flex items-center gap-x-4  xl:gap-x-[2rem] 2xl:gap-x-[4.5rem]">
        <div className="flex items-center gap-3  sm:gap-6">
        <LinkButton href={"/login"} className="bg-white max-xxscren:text-xs text-sm text-[#2B3AA6] rounded-10 rounded-s-[24px] rounded-e-[24px] gap-4 flex items-center  2xl:px-6 py-[0.625rem] px-3 md:px-4 font-outfit">
          Get Started <RightArrowIcon color="#fff" background="#2B3AA6"/>
        </LinkButton>
        <Button className="bg-transparent max-xxscren:text-xs text-sm border-white text-white  border-opacity-60 rounded-10 rounded-s-[24px] rounded-e-[24px] gap-4 flex items-center 2xl:px-6 px-3 md-px-4 py-[0.625rem] font-outfit" variant={"outlined"}>
       Contact Sales <ContactSales/>
        </Button>
        </div>
        <div className="max-sm:hidden">
            <WaveIcon/>
        </div>
      </div>

      <div className="flex items-center max-xl:mt-[3rem] 2xl:mt-[2.5rem] 3xl:mt-[4.5rem] gap-4 sm:gap-6">
        {
            bannerItemArray?.map((item,idx:number)=>(
                <div className="flex items-start gap-2" key={idx}>
                    <div className="h-[2.2rem] sm:h-[2.5rem] w-[2.2rem] sm:w-[2.625rem] rounded-full shrink-0 bg-[#11143D] flex justify-center items-center">
                        {item?.icon}
                    </div>
                    <div className="">
                        <h3 className="text-white text-xs sm:text-base font-semibold font-outfit">{item?.value}</h3>
                        <p className="text-white text-xxs sm:text-xs font-light mt-1 font-outfit">{item?.name}</p>
                    </div>
                </div>
            ))
        }
      </div>
      
    </div>
  );
};

export default BannerLeftContainer;
