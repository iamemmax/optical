"use client"

import { Button } from '@/components/core';
import React, { useState, useEffect } from 'react'
import Select, { StylesConfig } from "react-select";
import { cn } from '@/utils/classNames';
import TradingInvestment from '../(dashboard)/components/investment/TradingInvestment';
import OnleandingInvestment from '../(dashboard)/components/investment/OnleandingInvestment';
import TransactionIcon from '@/app/icons/(dashboard)/TransactionIcon';
import WalletTable from '../(dashboard)/components/transaction/WalletTable';
import AssetInvestment from '../(dashboard)/components/transaction/AssetInvestment';
import { useGetTransactionOverview } from '../misc/api/transactions/fetchTransactionOverview';
import { selectStyle } from '@/utils/selectStyles';
import { SmallSpinner } from '@/icons/core';

type OptionType = {
  label: string;
  value: string;
}
type SignalType = 'wallet' | 'Asset/Investment';

// Define tab options to ensure consistency
const TAB_OPTIONS: SignalType[] = ['wallet', 'Asset/Investment'];
 
const TransactionPage = () => {
    const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
    // Explicitly set the default to the first tab option with useEffect to ensure proper initialization
    const [activeTab, setActiveTab] = useState<SignalType>('wallet');
    
    const filterStatus: OptionType[] = [
        { label: "today", value: "today" },
        { label: "this Week", value: "this_week" },
        { label: "this month", value: "this_month" },
        { label: "this year", value: "this_year" },
    ];
    
    // Initialize with default option (first option)
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(filterStatus[0]);
    
    const {data, isLoading} = useGetTransactionOverview(selectedOption?.value || "today")
    
    const cardsArray = [
        {
            icon: <TransactionIcon />,
            title: "Total Transactions",
            count: data?.total_transactions?.amount ?? 0,
            rate: "Increase from Last Month",
            percentage: (data?.total_transactions?.percentage ?? 0) + "%"
        },
        {
            icon: <TransactionIcon />,
            title: "Pending Transactions",
            count: data?.pending_transactions?.amount ?? 0,
            rate: "Increase from Last Month",
            percentage: (data?.pending_transactions?.percentage ?? 0) + "%"
        },
        {
            icon: <TransactionIcon />,
            title: "Completed Transactions",
            count: data?.completed_transactions?.amount ?? 0,
            rate: "Increase from Last Month",
            percentage: (data?.completed_transactions?.percentage ?? 0) + "%"
        },
        {
            icon: <TransactionIcon />,
            title: "Failed Transactions",
            count: data?.failed_transactions?.amount ?? 0,
            rate: "Increase from Last Month",
            percentage: (data?.failed_transactions?.percentage ?? 0) + "%"
        },
    ]
    
    const handleOption = (selection: OptionType | null) => {
        setSelectedOption(selection);
    };

    const handleTabClick = (tab: SignalType) => {
        console.log('Tab clicked:', tab); // Debug log
        setActiveTab(tab);
    };

    // Ensure the component renders with the default tab on mount
    useEffect(() => {
        if (!activeTab) {
            setActiveTab('wallet');
        }
    }, [activeTab]);

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
                                value={selectedOption} // Use value instead of defaultValue
                                options={filterStatus}
                                styles={selectStyle}
                                isSearchable={false}
                                onChange={handleOption}
                            />
                        </div>
                    </div>
                  
                    {/* <div className="flex items-center gap-4">
                        <div className="">
                            <Button 
                                className="bg-white text-[#2B3AA6] font-outfit text-sm h-[46px]"
                                onClick={() => setWithdrawalModalOpen(true)}
                            >
                               Withdrawal
                            </Button>
                        </div>
                    </div> */}
                </div>

                {isLoading ? (
                    <div className='flex justify-center items-center py-5'>
                        <SmallSpinner color='white'/>
                    </div>
                ) : (
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 items-center gap-4">
                        {cardsArray?.map((card, idx: number) => (
                            <div className="border-[0.5px] border-[#4453DD] p-4 2xl:p-6 rounded-10 flex flex-col gap-3" key={idx}>
                               <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center h-8 w-8 rounded-full border-[0.5px] border-[#4453DD]">
                                    {card?.icon}
                                </div>
                                <p className='font-outfit text-white text-sm'>{card?.title}</p>
                               </div>
                               <h2 className='font-outfit text-white text-xl font-bold'>{card?.count}</h2>
                               <div className="">
                                <p className='font-outfit text-[#00FF31] text-sm'>
                                    {card?.percentage} 
                                    <span className='text-white/70 pl-1'>{card?.rate}</span>
                                </p>
                               </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
              
            {/* Tab Navigation */}
            <div className="bg-[#090E29] overflow-hidden my-6">
              <div className="flex">
                {TAB_OPTIONS.map((tab, idx: number) => (
                  <button
                    key={idx}
                    className={cn(
                      "py-4 pt-8 px-6 text-white md:text-base text-base capitalize font-outfit font-medium transition-all",
                      activeTab === tab ? "border-b-4 border-[#5879FD]" : "text-gray-400 hover:text-white"
                    )}
                    onClick={() => handleTabClick(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              {/* Debug info - remove this in production */}
          
            </div>
            
            <div className="tab-content">
              {activeTab === 'wallet' && <WalletTable />}
              {activeTab === 'Asset/Investment' && <AssetInvestment />}
            </div>
        </div>
    )
}

export default TransactionPage