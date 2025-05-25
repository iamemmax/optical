'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface SignalCardProps {
  id: string | number;
  asset: string;
  entryPrice: string | number;
  targetPrice: string | number;
  stopLoss: string | number;
  confidence: number;
  timeframe: string;
  timeframeDetail?: string;
  action: 'Buy' | 'Sell' | 'Hold';
}

const SignalCard: React.FC<SignalCardProps> = ({
  id,
  asset,
  entryPrice,
  targetPrice,
  stopLoss,
  confidence,
  timeframe,
  timeframeDetail,
  action
}) => {
  const router = useRouter();

  // Determine action color
  const getActionColor = () => {
    switch (action) {
      case "Buy":
        return "border-[0.3px] border-[#16FFC7] px-[.75rem] py-[.375rem] font-outfit text-xs font-medium rounded-lg text-[#16FFC7]";
      
      case "Sell":
        return "border-[0.3px] border-[#FF1515] px-[.75rem] py-[.375rem] font-outfit text-xs font-medium rounded-lg text-[#FF1515]";
     
      case "Hold":
        return "border-[0.3px] border-[#FF9900] px-[.75rem] py-[.375rem] font-outfit text-xs font-medium rounded-lg text-[#FF9900]";
    }
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Navigating to signal detail: ${id}`);
    // Make sure the ID is converted to string if needed
    router.push(`/dashboard/trading-signal/${id.toString()}/signal-detail`);
  };

  return (
    <div className="bg-[#0A1029] rounded-lg overflow-hidden border border-[#4453DD]/20 p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-white font-bold text-lg">{asset}</div>
        <div className={`px-4 py-1 rounded-md text-sm font-medium ${getActionColor()}`}>
          {action}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div>
          <div className="text-xs text-gray-400">Entry Price</div>
          <div className="text-white font-medium">{entryPrice}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400">TP</div>
          <div className="text-white font-medium">{targetPrice}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400">SL</div>
          <div className="text-white font-medium">{stopLoss}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400">Confidence</div>
          <div className="text-white font-medium">{confidence}%</div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <div>
          <div className="text-xs text-gray-400">Timeframe</div>
          <div className="text-white text-sm">{timeframe}</div>
        </div>
        
        <button 
          className="bg-transparent border-[0.3px] border-opacity-50 border-white hover:bg-[#4453DD]/20 text-white text-xs px-4 py-1 rounded-md transition-colors"
          onClick={handleViewClick}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default SignalCard;










