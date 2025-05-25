'use client';
import React from 'react';
import SignalCard from './SignalCard';
import { TradingSignalData } from '../../../trading-signal/mockData';

interface SignalGridProps {
  signals: TradingSignalData[];
  onCardClick?: (signal: TradingSignalData) => void;
}

const SignalGrid: React.FC<SignalGridProps> = ({ signals, onCardClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {signals.map((signal, index) => (
        <div 
          key={signal.id || index} 
          className="cursor-pointer transition-transform hover:scale-[1.02]"
          onClick={() => onCardClick && onCardClick(signal)}
        >
          <SignalCard
            id={signal.id as any}
            asset={signal.asset as string}
            entryPrice={signal.entryPrice as string}
            targetPrice={signal.targetPrice as string}
            stopLoss={signal.stopLoss as string}
            confidence={signal.confidence}
            timeframe={signal.timeframe}
            timeframeDetail={signal.timeframeDetail}
            action={signal.action as 'Buy' | 'Sell' | 'Hold'}
          />
        </div>
      ))}
    </div>
  );
};

export default SignalGrid;


