"use client"

import { Button } from '@/components/core';
import React, { useState } from 'react'
import Select, { StylesConfig } from "react-select";
import { cn } from '@/utils/classNames';
import TradingInvestment from '../(dashboard)/components/investment/TradingInvestment';
import OnleandingInvestment from '../(dashboard)/components/investment/OnleandingInvestment';
import TransactionIcon from '@/app/icons/(dashboard)/TransactionIcon';
import WalletTable from '../(dashboard)/components/transaction/WalletTable';
import AssetInvestment from '../(dashboard)/components/transaction/AssetInvestment';

type OptionType = {
  label: string;
  value: string;
}
type SignalType = 'wallet' | 'Asset/Investment';
 
const TransactionPage = () => {
    const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
      const [activeTab, setActiveTab] = useState<SignalType>('wallet');
    
    
    const filterStatus: OptionType[] = [
        { label: "today", value: "today" },
        { label: "this Week", value: "this_week" },
        { label: "this month", value: "this_month" },
        { label: "this year", value: "this_year" },
    ];
    const cardsArray = [
        {
            icon:<TransactionIcon />,
            title:"Total Transactions",
            count:"3000",
            rate:"Increase from Last Month",
            percentage:"+10%"
        },
        {
            icon:<TransactionIcon />,
            title:"Pending Transactions",
              count:"10",
            rate:"Increase from Last Month",
            percentage:"+10%"
        },
        {
            icon:<TransactionIcon />,
            title:"Completed Transactions",
             count:"2,700",
            rate:"Increase from Last Month",
            percentage:"+10%"
        },
        {
            icon:<TransactionIcon />,
            title:"Failed Transactions",
             count:"10",
            rate:"Increase from Last Month",
            percentage:"+10%"
        },
    ]
    
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

    const style: StylesConfig<OptionType, false> = {
        control: (base) => ({
            ...base,
            borderColor: "#eee",
            background: "#090E29",
            height: "2.875rem",
            boxShadow: "none",
            paddingInline: "10px",
            color: "#fff",
            fontSize: "14px",
            borderRadius: "10px",
            borderWidth: "0.1px",
          }),
          option: (provided) => ({
            ...provided,
            color: "#333",
              borderColor: "#eee",
            background: "#fff",
            fontSize: "12px",
            zIndex: "9999999",
            "&:hover": {
              background: "#fff",
            },
          }),
          input: (provided) => ({
            ...provided,
            color: "#fff",
            fontSize: "12px",
            textTransform: "capitalize",
            borderRadius: "8px",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "#fff",
            fontSize: "12px",
            textTransform: "capitalize",
            borderRadius: "8px",
          }),
    };


    // WalletIcon

    
    const handleOption = (selection: OptionType | null) => {
        setSelectedOption(selection);
    };



 
  
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
                            styles={style}
                            isSearchable={false}
                            onChange={handleOption}
                        />
                        </div>
                    </div>
                  
                        <div className="flex items-center  gap-4">
                          
                            <div className="">
                                <Button 
                                    className="bg-white text-[#2B3AA6] font-outfit text-sm h-[46px]"
                                    onClick={() => setWithdrawalModalOpen(true)}
                                >
                                   Export
                                </Button>
                            </div>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 items-center gap-4">
{
    cardsArray?.map((card,idx:number)=>(
        <div className="border-[0.5px] border-[#4453DD] p-4 2xl:p-6 rounded-10 flex flex-col gap-3" key={idx}>
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

            </div>
              


               {/* Tab Navigation */}
                    <div className="bg-[#090E29] overflow-hidden my-6">
                      <div className="flex">
                        {(['wallet','Asset/Investment'] as SignalType[])?.map((tab) => (
                          <button
                            key={tab}
                            className={cn(
                              "py-4 pt-8 px-6 text-white md:text-base text-base font-outfit font-medium transition-all",
                              activeTab === tab ? "border-b-4 border-[#5879FD]" : "text-gray-400 hover:text-white"
                            )}
                            onClick={() => setActiveTab(tab)}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {activeTab === "wallet" && <WalletTable />}
                    {activeTab === "Asset/Investment" && <AssetInvestment />} 
        </div>
    )
}



export default TransactionPage
