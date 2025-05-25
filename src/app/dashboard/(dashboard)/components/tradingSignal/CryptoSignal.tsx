'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import SignalGrid from './SignalGrid';
import { cryptoSignalsMockData, TradingSignalData } from '../../../trading-signal/mockData';

const CryptoSignal = () => {
  const router = useRouter();
  
  const handleCardClick = (signal: TradingSignalData) => {
    router.push(`/dashboard/trading-signal/${signal.id}/signal-detail`);
  };

  return (
    <div>
      <div className='mt-4 border-b-[.0313rem] border-[#696969] border-opacity-50 pb-4'>
        <h1 className="md:text-2xl text-lg font-bold font-verdana text-white mb-2">Crypto Trade Signal</h1>
        <p className="text-white/80 font-outfit text-sm md:text-base">Get daily updates, live trends, and smart alerts from our expert analysts</p>
      </div>

      <div className="mt-6">
        <SignalGrid 
          signals={cryptoSignalsMockData} 
          onCardClick={handleCardClick}
        />
      </div>
    </div>
  );
};

export default CryptoSignal
