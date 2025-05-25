'use client';
import React, { useState } from 'react';
import { cn } from '@/utils/classNames';
import TopSignal from '../(dashboard)/components/tradingSignal/TopSignal';
import ForexSignal from '../(dashboard)/components/tradingSignal/ForexSignal';
import CryptoSignal from '../(dashboard)/components/tradingSignal/CryptoSignal';

type SignalType = 'Top Signal' | 'Forex Trade Signal' | 'Crypto Trade Signal';

const TradingSignalsPage = () => {
  const [activeTab, setActiveTab] = useState<SignalType>('Top Signal');

  return (
    <div className="rounded-xl  w-full">
      <div className={`mb-4 flex justify-between items-center ${activeTab === 'Top Signal' ? 'hidden' : ''} `}>
        <div className={``}>
          <h1 className="md:text-2xl text-lg font-bold font-verdana text-white mb-2">Trading Signals</h1>
          <p className="text-white/80 font-outfit text-sm md:text-base">Get daily updates, live trends, and smart alerts from our expert analysts</p>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="bg-[#0B1739] overflow-hidden mb-6">
        <div className="flex">
          {(['Top Signal', 'Forex Trade Signal', 'Crypto Trade Signal'] as SignalType[]).map((tab) => (
            <button
              key={tab}
              className={cn(
                "py-4 px-6 text-white md:text-base text-sm font-outfit font-medium transition-all",
                activeTab === tab ? "border-b-2 border-[#5879FD]" : "text-gray-400 hover:text-white"
              )}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      {activeTab === "Top Signal" && <TopSignal />}
      {activeTab === "Forex Trade Signal" && <ForexSignal />}
      {activeTab === "Crypto Trade Signal" && <CryptoSignal />}
    </div>
  );
};

export default TradingSignalsPage;
