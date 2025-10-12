"use client";
import CopyIcon from "@/app/icons/(dashboard)/CopyIcon";
import ReferralIcon1 from "@/app/icons/(dashboard)/ReferralIcon1";
import ReferralIcon2 from "@/app/icons/(dashboard)/ReferralIcon2";
import WalletIcon from "@/app/icons/(dashboard)/WalletIcon";
import { Button } from "@/components/core";
import useClipboard from "@/hooks/useClipboard copy";
import React, { useState } from "react";
import Select, { StylesConfig } from "react-select";
import { UserDataTypes } from "../(auth)/(onboarding)/misc/types";
import TrendDashboardChart from "./(dashboard)/components/dashboard/TrendDashboardChart";
import { useDashboardOverview } from "./misc/api/dashboard/fetchDashboardOverview";
import { SmallSpinner } from "@/icons/core";
import DashboardInvestmentChart from "./(dashboard)/components/dashboard/DashboardInvestmentChart";
import ReturnOnInvestment from "./(dashboard)/components/dashboard/ReturnOnInvestment";
import WithdrawalModal from "./(dashboard)/components/referral/WithdrawalModal";
import { useUser } from "../(auth)/(onboarding)/api/getUserDetails";
import { selectStyle } from "@/utils/selectStyles";
import DepositFundsModal from "./(dashboard)/components/dashboard/DepositModal";

type OptionType = {
  label: string;
  value: string;
};

const Page = () => {
  // const [userData, setUserData] = useState<UserDataTypes | null>(null);
  const userData = useUser()
  const [selectedReferralOption, setSelectedReferralOption] =
    useState<OptionType | null>(null);
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
const [showDepositModal, setShowDepositModal] = useState(false)
  const { data: dashOverviewData, isLoading } = useDashboardOverview(
    selectedOption?.value || "today"
  );

  const filterStatus: OptionType[] = [
    { label: "today", value: "today" },
    { label: "this Week", value: "this_week" },
    { label: "this month", value: "this_month" },
    { label: "this year", value: "this_year" },
  ];
  const cardsArray = [
    {
      icon: <WalletIcon height={15} width={15} />,
      title: "Wallet Balance",
      count: `₦${dashOverviewData?.wallet_balance ?? 0} `,
      rate: "Increase from Last Month",
      percentage: "+10%",
      hasWidrawal: false,
    },
    {
      icon: <ReferralIcon1 height={20} width={20} />,
      title: "Invested Capital",
      count: `₦${dashOverviewData?.invested_capital ?? 0}`,
      rate: "Increase from Last Month",
      percentage: "+10%",
      hasWidrawal: false,
    },
    {
      icon: <ReferralIcon2 height={20} width={20} />,
      title: "Return on Investment",
      count: `₦${dashOverviewData?.return_on_investment ?? 0}`,
      rate: "Increase from Last Month",
      percentage: "+10%",
      hasWidrawal: false,
    },
    {
      icon: <ReferralIcon2 height={20} width={20} />,
      title: "Referral Balance",
      count: `₦${dashOverviewData?.referral_balance ?? 0}`,
      rate: "Increase from Last Month",
      percentage: "+10%",
      hasWidrawal: true,
    },
  ];


  // WalletIcon

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
      value: userData?.data?.referral_code || "",
      type: "copy"
    },
    {
      label: "Referral Links",
      value: `https://www.libertylifeplus.com/plan?referral_code=${userData?.data?.referral_code || ""}`,
      type: "copy",
    },
  ];

  return (
    <div className=" ">
      <div className="bg-[#090E29] w-full border-[0.3px] border-[#4453DD] rounded-10 p-6">
        <div className="flex justify-between w-full flex-wrap items-center">
          {/* Overview and Filter - Full width on mobile */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <h2 className="text-white font-verdana font-bold text-2xl">
              Overview
            </h2>
            <div className="max-w-[8.75rem]">
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

          {/* Referral and Buttons Section */}
          <div className="flex flex-col gap-3 w-full lg:w-auto mt-4 lg:mt-0">
            {/* Row 1: Referral Options (Mobile) */}
            <div className="flex gap-4 w-full lg:hidden">
              <div className="flex-1">
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
            </div>

            {/* Row 2: Buttons (Mobile) / All items (Desktop) */}
            <div className="flex gap-4 items-center flex-wrap lg:flex-nowrap">
              {/* Desktop Referral Links */}
              <div
                className="hidden lg:flex items-start justify-center flex-col gap-x-2 border-[0.3px] border-white bg-[#090E29] px-4 rounded-lg cursor-pointer border-opacity-30 py-[.5625rem]"
                onClick={() =>
                  copy(
                    `https://opticraft/?referral_code=${userData?.data?.referral_code || "2436473"}`
                  )
                }
              >
                <p className="text-white text-[.5rem]">
                  Your unique referral link
                </p>
                <div className="flex gap-2">
                  <p className="text-white max-w-[7rem] text-xxs truncate">
                    {`https://opticraft/?referral_code=${userData?.data?.referral_code || "2436473"}`}
                  </p>
                  <Button className="text-white px-0 py-[.0625rem] flex items-start bg-[#090E29] text-xs font-medium">
                    <CopyIcon height={15} width={15} fillColor="#fff" />
                  </Button>
                </div>
              </div>
              <div
                className="hidden lg:flex items-start justify-center flex-col gap-x-2 bg-[#090E29] border-[0.3px] border-white px-6 rounded-lg cursor-pointer border-opacity-30 py-[.5625rem]"
                onClick={() => copy(userData?.data?.referral_code || "2436473")}
              >
                <p className="text-white text-[.5rem]">Referral Code</p>
                <div className="flex gap-3">
                  <p className="text-white max-w-[4rem] text-xxs truncate">
                    {userData?.data?.referral_code || "2436473"}
                  </p>
                  <Button className="text-white px-0 py-[.0625rem] flex items-start bg-transparent text-xs font-medium">
                    <CopyIcon height={15} width={15} fillColor="#fff" />
                  </Button>
                </div>
              </div>

              {/* Buttons - Full width on mobile */}
              <div className="flex gap-4 w-full lg:w-auto">
                <Button
                  className="bg-white text-[#2B3AA6] font-medium font-outfit text-sm h-[46px] flex-1 lg:flex-none"
                  onClick={() => setShowDepositModal(true)}
                >
                  Deposit
                </Button>
                <Button
                  className="bg-white text-[#2B3AA6] font-medium font-outfit text-sm h-[46px] flex-1 lg:flex-none"
                  onClick={() => setWithdrawalModalOpen(true)}
                >
                  Withdrawal
                </Button>
              </div>
            </div>
          </div>
        </div>

        <>
          {isLoading ? (
            <div className="flex justify-center items-center py-7">
              <SmallSpinner color="#fff" />
            </div>
          ) : (
            <div className="mt-8 grid max-xxscren:grid-cols-1 grid-cols-2 lg:grid-cols-3 h-a xl:grid-cols-4 items-center gap-4">
              {cardsArray?.map((card, idx: number) => (
                <div
                  className="border-[0.5px] border-[#4453DD] p-4 2xl:p-6 rounded-10 flex flex-col gap-2"
                  key={idx}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full border-[0.5px] border-[#4453DD]">
                      {" "}
                      {card?.icon}
                    </div>
                    <p className="font-outfit text-white text-xs sm:text-sm">
                      {card?.title}
                    </p>
                  </div>
                  <h2 className="font-outfit text-white text-sm sm:text-xl font-bold">
                    {card?.count}
                  </h2>
                  {!card?.hasWidrawal && (
                    <div className="pb-3">
                      <p className="font-outfit text-[#00FF31] text-xs sm:text-sm">
                        {card?.percentage}{" "}
                        <span className="text-white/70 pl-1">{card?.rate}</span>
                      </p>
                    </div>
                  )}
                  {card?.hasWidrawal && (
                    <div className="flex items-start gap-x-4">
                      <Button
                        variant={"outlined"}
                        className="px-3 py-[6px] text-xs font-outfit text-white bg-transparent border-white border-opacity-40"
                      >
                        Withdraw
                      </Button>
                      <Button
                        variant={"outlined"}
                        className="px-3 py-[6px] text-xs font-outfit text-white bg-transparent border-white border-opacity-40"
                      >
                        View
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      </div>

      <div className="mt-4">
        <TrendDashboardChart />
      </div>
      <div className="mt-4">
        <DashboardInvestmentChart />
      </div>
      <div className="mt-4">
        <ReturnOnInvestment />
      </div>
      {
       withdrawalModalOpen&& <WithdrawalModal
        isOpen={withdrawalModalOpen}
        walletBalance={String(userData?.data?.wallet_details?.main_balance )}
        onClose={()=>setWithdrawalModalOpen(false)}
        
        />
      }
      {
        showDepositModal && <DepositFundsModal isOpen={showDepositModal} onClose={()=>setShowDepositModal(false)}/>
      }
    </div>
  ); 
};

export default Page;
