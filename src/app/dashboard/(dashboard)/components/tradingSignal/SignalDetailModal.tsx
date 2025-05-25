'use client';
import React from 'react';
import { TradingSignalData } from '../../../trading-signal/mockData';
import { Dialog, DialogContent } from '@/components/core';

interface SignalDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  signal: TradingSignalData | null;
}

const SignalDetailModal: React.FC<SignalDetailModalProps> = ({ isOpen, onClose, signal }) => {
  if (!signal) return null;

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Buy':
        return 'bg-[#16FFC7] text-[#0A1029]';
      case 'Sell':
        return 'bg-[#FF1515] text-white';
      case 'Hold':
        return 'bg-[#FB9700] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0A1029] text-white border-[#4453DD]/20 p-0 max-w-5xl">
        {/* Header with asset name and confidence */}
        <div className="bg-[#0A1029] p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{signal.asset}</h2>
            <p className="text-sm text-gray-400">{signal.asset === 'EUR/USD' ? 'Euro / US Dollar' : signal.asset} · ACTIVE</p>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-400 mr-2">Confidence</span>
            <div className="relative h-16 w-16">
              {/* Circle progress indicator */}
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4453DD"
                  strokeWidth="2"
                  strokeDasharray={`${signal.confidence}, 100`}
                  strokeLinecap="round"
                  className="stroke-[#4453DD]"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold">{signal.confidence}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="bg-[#0A1029] px-4 pb-4">
          <button className={`px-6 py-2 rounded-md ${getActionColor(signal.action)}`}>
            {signal.action}
          </button>
        </div>

        {/* Chart */}
        <div className="bg-[#0B1739] p-4 mx-4 rounded-lg mb-4 h-80 relative">
          {/* Placeholder for chart - in a real app, you'd use a charting library */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-400">Chart would be displayed here</p>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {/* Trade Setup Overview */}
          <div className="bg-[#0B1739] rounded-lg p-4">
            <h3 className="text-lg font-bold mb-4">Trade Setup Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Entry Price</span>
                <span>₦15,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Take Profit</span>
                <span>₦15,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Stop Loss</span>
                <span>₦15,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Timeframe</span>
                <span>1 Hour (1H)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Signal ID</span>
                <span>#FX20230415</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Signal Date</span>
                <span>12 June, 2024 6:15pm</span>
              </div>
            </div>
          </div>

          {/* Trade Analysis/Commentary */}
          <div className="bg-[#0B1739] rounded-lg p-4">
            <h3 className="text-lg font-bold mb-4">Trade Analysis/Commentary</h3>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-400 mb-1">Technical Analysis:</h4>
              <p className="text-sm">
                The pair is showing a bullish momentum above 1.0850. RSI is at 65, indicating strong buying pressure with a likely target of 1.1000.
              </p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-400 mb-1">Fundamental Note:</h4>
              <p className="text-sm">
                Recent Economic data has weakened U.S. labor market but of EUR strength.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-1">Sentiment Indicator:</h4>
              <p className="text-sm">
                75% of traders are long on EUR/USD today.
              </p>
            </div>
          </div>

          {/* Signal Update Timeline */}
          <div className="bg-[#0B1739] rounded-lg p-4 row-span-2">
            <h3 className="text-lg font-bold mb-4">Signal Update Timeline</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 text-sm">
                <div className="text-gray-400">Time</div>
                <div className="text-gray-400">Action</div>
                <div className="text-gray-400">Note</div>
              </div>
              
              <div className="grid grid-cols-3 text-sm">
                <div>09:30AM</div>
                <div>Signal Issued</div>
                <div>Buy at 1.0922</div>
              </div>
              
              <div className="grid grid-cols-3 text-sm">
                <div>09:50AM</div>
                <div>Reached 50% Target</div>
                <div>TP half hit at 1.0935</div>
              </div>
              
              <div className="grid grid-cols-3 text-sm">
                <div>09:55AM</div>
                <div>Updated SL to 1.0905</div>
                <div>Move stop loss to breakeven</div>
              </div>
            </div>
          </div>

          {/* Indicator Used */}
          <div className="bg-[#0B1739] rounded-lg p-4">
            <h3 className="text-lg font-bold mb-4">Indicator Used</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Entry Price</span>
                <span>₦15,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Take Profit</span>
                <span>₦15,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Stop Loss</span>
                <span>₦15,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Timeframe</span>
                <span>1 Hour (1H)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Signal ID</span>
                <span>#FX20230415</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Signal Date</span>
                <span>12 June, 2024 6:15pm</span>
              </div>
            </div>
          </div>

          {/* Ratio */}
          <div className="bg-[#0B1739] rounded-lg p-4">
            <h3 className="text-lg font-bold mb-4">Ratio</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Entry Price</span>
                <span>₦15,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Take Profit</span>
                <span>₦15,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Stop Loss</span>
                <span>₦15,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Timeframe</span>
                <span>1 Hour (1H)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Signal ID</span>
                <span>#FX20230415</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Signal Date</span>
                <span>12 June, 2024 6:15pm</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignalDetailModal;
