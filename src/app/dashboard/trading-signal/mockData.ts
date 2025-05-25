export interface TradingSignalData {
  id: string | number;
  asset: string;
  entryPrice: string | number;
  targetPrice: string | number;
  stopLoss: string | number;
  confidence: number;
  timeframe: string;
  timeframeDetail: string;
  signalType?: string;
  action: 'Buy' | 'Sell' | 'Hold';
  date?: string;
}

// Currency pairs for forex
const forexPairs = [
  'EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'USD/CAD', 
  'AUD/USD', 'NZD/USD', 'EUR/GBP', 'EUR/JPY', 'GBP/JPY'
];

// Crypto pairs
const cryptoPairs = [
  'BTC/USD', 'ETH/USD', 'XRP/USD', 'LTC/USD', 'BCH/USD',
  'ADA/USD', 'DOT/USD', 'LINK/USD', 'XLM/USD', 'UNI/USD'
];

// Timeframes
const timeframes = [
  { time: '1 Hour', detail: '(1H)' },
  { time: '4 Hour', detail: '(4H)' },
  { time: '1 Day', detail: '(1D)' },
  { time: '1 Week', detail: '(1W)' }
];

// Actions with weights to make Buy more common
const actions = [
  'Buy', 'Buy', 'Buy', 'Buy', 'Buy', 'Buy',  // 60% Buy
  'Sell', 'Sell', 'Sell',                    // 30% Sell
  'Hold'                                     // 10% Hold
];

// Generate random price (some with Naira symbol, some without)
export const generatePrice = (isNaira = true, min = 1, max = 100000) => {
  if (isNaira) {
    return `₦${Math.floor(Math.random() * (max - min) + min).toLocaleString()}`;
  } else {
    return (Math.random() * (max - min) + min).toFixed(4);
  }
};

// Generate top signals (table view data)
export const topSignalsMockData: TradingSignalData[] = Array(20).fill(null).map((_, index) => {
  const useNaira = Math.random() > 0.3;
  const pair = Math.random() > 0.5 ? 
    forexPairs[Math.floor(Math.random() * forexPairs.length)] : 
    cryptoPairs[Math.floor(Math.random() * cryptoPairs.length)];
  
  const timeframeIndex = Math.floor(Math.random() * timeframes.length);
  
  return {
    id: index + 1,
    asset: pair,
    entryPrice: useNaira ? `₦${Math.floor(Math.random() * 50000 + 10000).toLocaleString()}` : (Math.random() * 2 + 0.5).toFixed(4),
    targetPrice: useNaira ? `₦${Math.floor(Math.random() * 60000 + 10000).toLocaleString()}` : (Math.random() * 2 + 0.8).toFixed(4),
    stopLoss: useNaira ? `₦${Math.floor(Math.random() * 40000 + 5000).toLocaleString()}` : (Math.random() * 1 + 0.3).toFixed(4),
    confidence: Math.floor(Math.random() * 20 + 80), // 80-99%
    timeframe: timeframes[timeframeIndex].time,
    timeframeDetail: timeframes[timeframeIndex].detail,
  
    action: actions[Math.floor(Math.random() * actions.length)] as 'Buy' | 'Sell' | 'Hold'
  };
});

// Generate forex signals (card view data)
export const forexSignalsMockData: TradingSignalData[] = Array(15).fill(null).map((_, index) => {
  const pair = forexPairs[Math.floor(Math.random() * forexPairs.length)];
  const timeframeIndex = Math.floor(Math.random() * timeframes.length);
  
  return {
    id: index + 100,
    asset: pair,
    entryPrice: (Math.random() * 2 + 0.5).toFixed(4),
    targetPrice: (Math.random() * 2 + 0.8).toFixed(4),
    stopLoss: (Math.random() * 1 + 0.3).toFixed(4),
    confidence: Math.floor(Math.random() * 20 + 80), // 80-99%
    timeframe: timeframes[timeframeIndex].time,
    timeframeDetail: timeframes[timeframeIndex].detail,
    signalType: 'Forex Signal',
    action: actions[Math.floor(Math.random() * actions.length)] as 'Buy' | 'Sell' | 'Hold'
  };
});

// Generate crypto signals (card view data)
export const cryptoSignalsMockData: TradingSignalData[] = Array(15).fill(null).map((_, index) => {
  const pair = cryptoPairs[Math.floor(Math.random() * cryptoPairs.length)];
  const timeframeIndex = Math.floor(Math.random() * timeframes.length);
  
  return {
    id: index + 200,
    asset: pair,
    entryPrice: Math.random() > 0.5 ? 
      `₦${Math.floor(Math.random() * 5000000 + 1000000).toLocaleString()}` : 
      (Math.random() * 50000 + 10000).toFixed(2),
    targetPrice: Math.random() > 0.5 ? 
      `₦${Math.floor(Math.random() * 6000000 + 1000000).toLocaleString()}` : 
      (Math.random() * 60000 + 10000).toFixed(2),
    stopLoss: Math.random() > 0.5 ? 
      `₦${Math.floor(Math.random() * 4000000 + 500000).toLocaleString()}` : 
      (Math.random() * 40000 + 5000).toFixed(2),
    confidence: Math.floor(Math.random() * 20 + 80), // 80-99%
    timeframe: timeframes[timeframeIndex].time,
    timeframeDetail: timeframes[timeframeIndex].detail,
    signalType: 'Crypto Signal',
    action: actions[Math.floor(Math.random() * actions.length)] as 'Buy' | 'Sell' | 'Hold'
  };
});

// Combined data for all signals (50 total)
export const allTradingSignalsMockData: TradingSignalData[] = [
  ...topSignalsMockData,
  ...forexSignalsMockData,
  ...cryptoSignalsMockData
];


// Mock data for trading signals
export const tradingSignals: TradingSignalData[] = [
  {
    id: 'FX20230415',
    asset: 'EUR/USD',
    entryPrice: '₦15,000',
    targetPrice: '₦15,000',
    stopLoss: '₦15,000',
    confidence: 85,
    timeframe: '1 Hour',
    timeframeDetail: '1H',
    action: 'Buy',
    date: '12 June, 2024 6:15pm'
  },
  // Add more mock signals as needed
];

export function getTradingSignalById(id: string | number): TradingSignalData | null {
  console.log("getTradingSignalById called with id:", id);
  
  // Convert id to string for comparison
  const idStr = id.toString();
  
  // Search in all signal arrays
  const allSignals = [...topSignalsMockData, ...forexSignalsMockData, ...cryptoSignalsMockData];
  
  // Debug log
  console.log("Searching through", allSignals.length, "signals");
  console.log("Signal IDs:", allSignals.map(s => s.id));
  
  const foundSignal = allSignals.find(signal => signal.id.toString() === idStr);
  console.log("Found signal:", foundSignal);
  
  return foundSignal || null;
}


