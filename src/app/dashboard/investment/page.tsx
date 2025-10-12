"use client";
// import { UserData } from '@/app/(auth)/(onboarding)/misc/types';
import CopyIcon from "@/app/icons/(dashboard)/CopyIcon";
import ReferralIcon1 from "@/app/icons/(dashboard)/ReferralIcon1";
import ReferralIcon2 from "@/app/icons/(dashboard)/ReferralIcon2";
import WalletIcon from "@/app/icons/(dashboard)/WalletIcon";
import { Button } from "@/components/core";
import useClipboard from "@/hooks/useClipboard copy";
import React, { useState } from "react";
import Select, { StylesConfig } from "react-select";
import { cn } from "@/utils/classNames";
import TradingInvestment from "../(dashboard)/components/investment/TradingInvestment";
import OnleandingInvestment from "../(dashboard)/components/investment/OnleandingInvestment";
import { useInvestmentDashboardOverview } from "../misc/api/investment/trading/fetchInvestmentDashboardOverview";
import { SmallSpinner } from "@/icons/core";
import { selectStyle } from "@/utils/selectStyles";
import AddInvestmentModal from "../(dashboard)/components/investment/AddInvestment";

type OptionType = {
  label: string;
  value: string;
};
type SignalType = "Trading Investment" | "Onlending Investment";

const InvestmentPage = () => {
  const filterStatus: OptionType[] = [
    { label: "today", value: "today" },
    { label: "this Week", value: "this_week" },
    { label: "this month", value: "this_month" },
    { label: "this year", value: "this_year" },
  ];
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SignalType>("Trading Investment");
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const { data: investmentData, isLoading: isLoadingOverview } =
    useInvestmentDashboardOverview(
      (selectedOption?.value as string) || "today"
    );

  const cardsArray = [
    {
      icon: <WalletIcon height={15} width={15} />,
      title: "Invested Capital",
      count: `₦${investmentData?.invested_capital?.amount ?? 0}`,
      rate: "Increase from Last Month",
      percentage: investmentData?.invested_capital?.last_month_perc_change ?? 0,
    },
    {
      icon: <ReferralIcon1 height={20} width={20} />,
      title: "Return on Investment",
      count: `₦${investmentData?.roi?.amount ?? 0}`,
      rate: "Increase from Last Month",
      percentage: investmentData?.roi?.last_month_perc_change ?? 0,
    },
    {
      icon: <ReferralIcon2 height={20} width={20} />,
      title: "Active Investment",
      count: `₦${investmentData?.active_investment?.amount ?? 0}`,
      rate: "Increase from Last Month",
      percentage:
        investmentData?.active_investment?.last_month_perc_change ?? 0,
    },
    {
      icon: <ReferralIcon2 height={20} width={20} />,
      title: "Completed Investment",
      count: `₦${investmentData?.completed_investment?.amount ?? 0}`,
      rate: "Increase from Last Month",
      percentage:
        investmentData?.completed_investment?.last_month_perc_change ?? 0,
    },
  ];

  const handleOption = (selection: OptionType | null) => {
    setSelectedOption(selection);
  };

  return (
    <div className=" ">
      <div className="bg-[#090E29] w-full border-[0.3px] border-[#4453DD] rounded-10 p-6">
       <div className="flex flex-col space-y-4 w-full md:flex-row md:justify-between md:items-center md:space-y-0">
  {/* Left Section - Title and Select */}
  <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3 lg:space-x-4">
    <h2 className="text-white font-verdana font-bold text-xl sm:text-2xl">
      My Investment
    </h2>
    <div className="w-full sm:w-auto sm:max-w-[8.75rem]">
      <Select
        className="w-full rounded-lg capitalize"
        components={{
          IndicatorSeparator: () => null,
        }}
        defaultValue={filterStatus.find(
          (option) => option.value === selectedOption?.value
        )}
        options={filterStatus}
        styles={selectStyle}
        isSearchable={false}
        onChange={handleOption}
      />
    </div>
  </div>

  {/* Right Section - Button */}
  <div className="w-full sm:w-auto">
    <Button
      className="w-full sm:w-auto bg-white text-[#2B3AA6] font-outfit text-sm md:text-base h-[46px] px-4 md:px-6"
      onClick={() => setWithdrawalModalOpen(true)}
    >
      Add New Investment
    </Button>
  </div>
</div>

        {isLoadingOverview ? (
          <div className="flex justify-center items-center py-10">
            <SmallSpinner color="#fff" />
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 items-center gap-4">
            {cardsArray?.map((card, idx: number) => (
              <div
                className="border-[0.5px] border-[#4453DD] p-4 2xl:p-6 rounded-10 flex flex-col gap-3"
                key={idx}
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full border-[0.5px] border-[#4453DD]">
                    {" "}
                    {card?.icon}
                  </div>
                  <p className="font-outfit text-white text-sm">
                    {card?.title}
                  </p>
                </div>
                <h2 className="font-outfit text-white text-xl font-bold">
                  {card?.count}
                </h2>
                <div className="">
                  <p className="font-outfit text-[#00FF31] text-sm">
                    {card?.percentage}{" "}
                    <span className="text-white/70 pl-1">{card?.rate}</span>
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
          {(
            ["Trading Investment", "Onlending Investment"] as SignalType[]
          )?.map((tab) => (
            <button
              key={tab}
              className={cn(
                "py-4 pt-8 md:px-6 px-3 text-white text-sm md:text-base  font-outfit font-medium transition-all",
                activeTab === tab
                  ? "border-b-4 border-[#5879FD]"
                  : "text-gray-400 hover:text-white"
              )}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Trading Investment" && <TradingInvestment />}
      {activeTab === "Onlending Investment" && <OnleandingInvestment />}
      {withdrawalModalOpen && (
        <AddInvestmentModal
          isOpen={withdrawalModalOpen}
          onClose={() => setWithdrawalModalOpen(false)}
          walletBalance="24,041.08"
        />
      )}
    </div>
  );
};

export default InvestmentPage;
