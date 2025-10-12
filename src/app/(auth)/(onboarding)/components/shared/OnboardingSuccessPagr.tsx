import { Button, LinkButton } from "@/components/core";
import React from "react";


interface Prop{
    title:string;
    subTitle:string;
    href?: string
    openFrom?:"onboarding"| "dashboard"
     onClose?: (() => void) | undefined
}
const OnboardingSuccessPage = ({subTitle,title,href="/login",openFrom="onboarding",onClose}:Prop) => {

  
  return (
    <div className={`text-white relative border-[.0187rem]   border-[#4649E5] ${openFrom==="onboarding"?"px-6 md:px-[50px] py-[3.875rem] xl:py-[8.5rem] 2xl:px-[6.1875rem]":"px-8 py-[3.5rem]"}   flex justify-center items-center flex-col w-full  rounded-[1.25rem]`}>
      <div className="flex justify-center items-center flex-col w-full">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M40.0013 6.66699C21.5919 6.66699 6.66797 21.5909 6.66797 40.0003C6.66797 58.4096 21.5919 73.3337 40.0013 73.3337C58.4106 73.3337 73.3347 58.4096 73.3347 40.0003C73.3347 21.5909 58.4108 6.66699 40.0013 6.66699ZM40.0013 66.667C25.2973 66.667 13.3347 54.7043 13.3347 40.0003C13.3347 25.2962 25.2972 13.3337 40.0013 13.3337C54.7053 13.3337 66.668 25.2962 66.668 40.0003C66.668 54.7043 54.7053 66.667 40.0013 66.667ZM52.5537 28.0911L57.2673 32.8046L36.668 53.4903L24.3113 41.1336L29.0247 36.42L36.668 44.0632L52.5537 28.0911Z" fill="#009A49"/>
</svg>

      </div>
       <div className="flex justify-center text-center items-center flex-col w-full">
        <h2 className="text-white font-verdana font-bold text-[1rem] max-w-[20.75rem] xl:text-[1.8rem]">
       {title}
        </h2>
        <p className="font-outfit text-sm xl:text-base text-white mt-1  max-w-[20.75rem] text-opacity-70 font-light">
       {subTitle}
        </p>
       
      </div>
{openFrom==="onboarding"&&<div className="mt-[4.5rem] w-full">
<LinkButton className="w-full bg-white font-bold mt-6  h-12 rounded-10 font-outfit text-[#2B3AA6] text-sm  max-w-[25.75rem] "  href={href}>Login</LinkButton>

</div>}
{openFrom==="dashboard"&&<div className="w-full z-50">
<Button className="w-full bg-white font-bold mt-6  h-12 rounded-10 font-outfit text-[#2B3AA6] text-sm  max-w-[25.75rem] "  onClick={onClose}>Done</Button>

</div>}

    </div>
  );
};

export default OnboardingSuccessPage;
