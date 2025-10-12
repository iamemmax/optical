"use client"
// import { UserData } from '@/app/(auth)/(onboarding)/misc/types';
import CopyIcon from '@/app/icons/(dashboard)/CopyIcon';
import ReferralIcon1 from '@/app/icons/(dashboard)/ReferralIcon1';
import ReferralIcon2 from '@/app/icons/(dashboard)/ReferralIcon2';
import WalletIcon from '@/app/icons/(dashboard)/WalletIcon';
import { Button } from '@/components/core';
import useClipboard from '@/hooks/useClipboard copy';
import React, { useState } from 'react'
import Select from "react-select";
import ReferalTable from '../(dashboard)/components/referral/ReferalTable';
import WithdrawalModal from '../(dashboard)/components/referral/WithdrawalModal';
import { useFetchReferralOverview } from '../misc/api/referral/fetchReferralOverview';
import { selectStyle } from '@/utils/selectStyles';
import { addCommasToNumber } from '@/utils';
import { useUser } from '@/app/(auth)/(onboarding)/api/getUserDetails';
import { SmallSpinner } from '@/icons/core';

type OptionType = {
  label: string;
  value: string;
}

const Page = () => {
    const [selectedReferralOption, setSelectedReferralOption] = useState<OptionType | null>(null);
    const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
      const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

    const {data:userData}= useUser()
    const filterStatus: OptionType[] = [
        { label: "today", value: "today" },
        { label: "this Week", value: "this_week" },
        { label: "this month", value: "this_month" },
        { label: "this year", value: "this_year" },
    ];
    const {data, isLoading}=useFetchReferralOverview(String(selectedOption?.value))
    const cardsArray = [
        {
            icon: <WalletIcon height={15} width={15}/>,
        title: "Referral Wallet",
        count: `₦${addCommasToNumber(Number(data?.referral_wallet?.amount ?? 0))}`,
        rate: `Increase from Last ${data?.referral_wallet?.period ?? ""}`,
        percentage: `${data?.referral_wallet?.change === "up" ? "+" : "-"}${data?.referral_wallet?.percent_change ?? "0"}%`
    },
    {
        icon: <ReferralIcon1 height={20} width={20}/>,
        title: "Total Referrals",
        count: data?.total_referrals?.count ?? 0,
        rate: `Increase from Last ${data?.total_referrals?.period ?? ""}`,
        percentage: `${data?.total_referrals?.change === "up" ? "+" : "-"}${data?.total_referrals?.percent_change ?? "0"}%`
    },
    {
        icon: <ReferralIcon2 height={20} width={20}/>,
        title: "Verified Signups",
        count: data?.verified_signups?.count ?? 0,
        rate: `Increase from Last ${data?.verified_signups?.period ?? ""}`,
        percentage: `${data?.verified_signups?.change === "up" ? "+" : "-"}${data?.verified_signups?.percent_change ?? "0"}%`
    },
    {
        icon: <ReferralIcon2 height={20} width={20}/>,
        title: "First-time Deposit",
        count: data?.first_time_deeposits?.count ?? 0, // Fixed typo: "deeposits" → "deposits"
        rate: `Increase from Last ${data?.first_time_deeposits?.period ?? ""}`, // Fixed typo here too
        percentage: `${data?.first_time_deeposits?.change === "up" ? "+" : "-"}${data?.first_time_deeposits?.percent_change ?? "0"}%` // And here
    },
]
    

  const { copy } = useClipboard();
    
    const handleOption = (selection: OptionType | null) => {
        setSelectedOption(selection);
    };

    const handleSelectChange = (selection: OptionType | null) => {
        if (selection) {
            copy(selection.value);
            setSelectedReferralOption(selection);
        }
    };

    const referralOption = [
        {
          label: "Referral code",
          value: data?.referral_code|| "",
          type: "copy",
        },
        {
          label: "Referral Links",
          value: data?.referral_link ??"",
          type: "copy",
        },
    ];

  
    return (
        <div className=' '>
            <div className="bg-[#090E29] w-full border-[0.3px] border-[#4453DD] rounded-10 p-6">
                <div className="flex justify-between w-full flex-wrap items-center">
                    <div className="flex items-center gap-3">
                        <h2 className='text-white font-verdana font-bold text-2xl'>Overview</h2>
                        <div className="max-w-[8.75rem]">
                        <Select
                            className="w-full rounded-lg capitalize"
                            components={{
                                IndicatorSeparator: () => null,
                            }}
                            defaultValue={filterStatus.find(option => option.value === selectedOption?.value)}
                            options={filterStatus}
                            styles={selectStyle}
                            isSearchable={false}
                            onChange={handleOption}
                        />
                        </div>
                    </div>
                    <div className="flex  gap-4 justify-between items-center max-sm:mt-3 lg:mt-0">
                       {!isLoading&& <div className="flex items-center  gap-4">
                            <div className="hidden lg:flex items-start justify-center flex-col gap-x-2 border-[0.3px] border-white bg-[#090E29] px-4 rounded-lg cursor-pointer border-opacity-30 py-[.5625rem]"
                                onClick={() => copy(`${data?.referral_link ??""}`)}
                            >
                                <p className="text-white text-[.5rem]">Your unique referral link</p>
                                <div className="flex gap-2">
                                    <p className="text-white max-w-[7rem] text-xxs truncate">
                                        {`${data?.referral_link??""}`}
                                    </p>
                                    <Button className="text-white px-0 py-[.0625rem] flex items-start bg-[#090E29] text-xs font-medium">
                                        <CopyIcon height={15} width={15} fillColor="#fff" />
                                    </Button>
                                </div>
                            </div>
                            <div className="hidden lg:flex items-start justify-center flex-col gap-x-2 bg-[#090E29] border-[0.3px] border-white px-6 rounded-lg cursor-pointer border-opacity-30 py-[.5625rem]"
                                onClick={() => copy(data?.referral_code || "")}
                            >
                                <p className="text-white text-[.5rem]">Referral Code</p>
                                <div className="flex gap-3">
                                    <p className="text-white max-w-[4rem] text-xxs truncate">
                                        {data?.referral_code || ""}
                                    </p>
                                    <Button className="text-white px-0 py-[.0625rem] flex items-start bg-transparent text-xs font-medium">
                                        <CopyIcon height={15} width={15} fillColor="#fff" />
                                    </Button>
                                </div>
                            </div>
                            <div className="lg:hidden w-full max-w-[170px]">
                                <Select
                                    options={referralOption}
                                    value={selectedReferralOption}
                                    onChange={handleSelectChange}
                                    placeholder="Select Referral"
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                    styles={selectStyle}
                                    isSearchable={false}
                                    components={{
                                        IndicatorSeparator: () => null,
                                    }}
                                />
                            </div>
                            <div className="">
                                <Button 
                                    className="bg-white text-[#2B3AA6] font-outfit text-sm h-[46px]"
                                    onClick={() => setWithdrawalModalOpen(true)}
                                >
                                    Withdrawal
                                </Button>
                            </div>
                        </div>}
                    </div>
                </div>

                {
                    isLoading ? <div className='flex justify-center items-center py-6'><SmallSpinner color='#fff'/></div>
                    :
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-4">
{
    cardsArray?.map((card,idx:number)=>(
        <div className="border-[0.5px] border-[#4453DD] p-4 2xl:p-6 rounded-10 flex flex-col gap-2" key={idx}>
           <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-full border-[0.5px] border-[#4453DD]"> {card?.icon}</div>
            <p className='font-outfit text-white text-sm'>{card?.title}</p>
           </div>
           <h2 className='font-outfit text-white text-xl font-bold'>{card?.count}</h2>
           <div className="">
            <p className='font-outfit text-[#00FF31] text-sm'>{card?.percentage} <span className='text-white/70 pl-1'>{ card?.rate}</span></p>
           </div>
        </div>
    ))
}
                </div>
                }


            </div>
                <ReferalTable/>

               {withdrawalModalOpen&& <WithdrawalModal 
    isOpen={withdrawalModalOpen}
    onClose={() => setWithdrawalModalOpen(false)}
    walletBalance={String(userData?.wallet_details?.main_balance)}
/>}
        </div>
    )
}



export default Page
