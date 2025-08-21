

// import { FxSymbol, useFetchFxSymbols } from '@/app/dashboard/misc/api/dashboard/fetchFxChartsymbol';
// import { OptionType, selectStyle } from '@/utils/selectStyles';
// import Select  from 'react-select';
// import React, { useState, useMemo, useRef, useEffect } from 'react';
// import { useFetchFxChartData } from '@/app/dashboard/misc/api/dashboard/fetchFxChartData';
// import { SmallSpinner } from '@/icons/core';

// interface CandlestickData {
//   datetime: string;
//   open: string;
//   high: string;
//   low: string;
//   close: string;
//   volume: string;
//   isGreen?: boolean;
// }

// interface CandlestickProps {
//   payload: CandlestickData;
//   x: number;
//   width: number;
//   height: number;
//   minPrice: number;
//   maxPrice: number;
// }

// interface VolumeBarProps {
//   payload: CandlestickData;
//   x: number;
//   width: number;
//   chartHeight: number;
//   maxVolume: number;
//   volumeHeight: number;
// }

// const TrendDashboardChart: React.FC = () => {
//   const fxTimeFrameOptions = [
//   "1min", "5min", "15min", "30min", "45min",
//   "1h", "2h", "4h", "5h",
//   "1day", "1week", "1month"
// ].map((tf) => ({
//   label: tf,
//   value: tf
// }));

//   const [timeframe, setTimeframe] = useState<string>('1h');
//   const [selectedSymbolOption, setSelectedSymbolOption] = useState<OptionType | null>(null);
//   const [chartDimensions, setChartDimensions] = useState({ width: 800, height: 500 }); // Increased height for volume
//   const chartContainerRef = useRef<HTMLDivElement>(null);
  
//   const handleTimeframeChange = (selection: OptionType | null) => {
//     setTimeframe(selection?.value as string);
//   };

//   const {data:fxChartsymbol, isLoading}=useFetchFxSymbols()

//   const fSymbolOptions = [
//   { label: "AAPL", value: "AAPL" }, // first static option
//   ...(fxChartsymbol?.data?.map((item: FxSymbol) => ({
//     label: item?.symbol,
//     value: item?.symbol,
//   })) ?? []),
// ];

//   const handleSymbolOption = (selection: OptionType | null) => {
//     setSelectedSymbolOption(selection);
//   };

//   const {data:fxChartData, isLoading:isloadingFxChart } = useFetchFxChartData({
//     symbol: selectedSymbolOption?.value || "AAPL",
//     interval: timeframe,
//   })

//   // Update chart dimensions when container size changes
//   useEffect(() => {
//     const updateDimensions = () => {
//       if (chartContainerRef.current) {
//         const containerWidth = chartContainerRef.current.offsetWidth;
//         setChartDimensions({
//           width: Math.max(containerWidth - 80, 300), // Account for price scale padding, minimum width
//           height: 500 // Increased height for volume section
//         });
//       }
//     };

//     // Use ResizeObserver for better responsiveness
//     const resizeObserver = new ResizeObserver(() => {
//       updateDimensions();
//     });

//     if (chartContainerRef.current) {
//       resizeObserver.observe(chartContainerRef.current);
//     }

//     // Initial update with a small delay to ensure DOM is ready
//     const timeoutId = setTimeout(updateDimensions, 100);

//     // Fallback for older browsers
//     window.addEventListener('resize', updateDimensions);

//     return () => {
//       resizeObserver.disconnect();
//       window.removeEventListener('resize', updateDimensions);
//       clearTimeout(timeoutId);
//     };
//   }, []);
  
//   // Custom Candlestick Component
//   const Candlestick = ({ payload, x, width, height, minPrice, maxPrice }: CandlestickProps) => {
//     if (!payload) return null;
    
//     // Convert string values to numbers
//     const open = parseFloat(payload.open);
//     const high = parseFloat(payload.high);
//     const low = parseFloat(payload.low);
//     const close = parseFloat(payload.close);
//     const isGreen = close > open;
    
//     const color: string = isGreen ? '#10b981' : '#ef4444';
//     const priceRange: number = maxPrice - minPrice;
    
//     // Calculate positions (only use 70% of height for candlesticks, leaving 30% for volume)
//     const candlestickHeight = height * 0.7;
//     const getY = (price: number): number => candlestickHeight - ((price - minPrice) / priceRange) * candlestickHeight;
    
//     const openY: number = getY(open);
//     const closeY: number = getY(close);
//     const highY: number = getY(high);
//     const lowY: number = getY(low);
    
//     const bodyTop: number = Math.min(openY, closeY);
//     const bodyHeight: number = Math.max(Math.abs(closeY - openY), 1);
//     const bodyWidth: number = Math.max(width * 0.7, 2); // Ensure minimum width
//     const bodyX: number = x + (width - bodyWidth) / 2;
//     const wickX: number = x + width / 2;
    
//     return (
//       <g>
//         {/* Upper wick */}
//         <line
//           x1={wickX}
//           y1={highY}
//           x2={wickX}
//           y2={Math.min(openY, closeY)}
//           stroke={color}
//           strokeWidth={1}
//         />
        
//         {/* Lower wick */}
//         <line
//           x1={wickX}
//           y1={Math.max(openY, closeY)}
//           x2={wickX}
//           y2={lowY}
//           stroke={color}
//           strokeWidth={1}
//         />
        
//         {/* Body */}
//         <rect
//           x={bodyX}
//           y={bodyTop}
//           width={bodyWidth}
//           height={bodyHeight}
//           fill={isGreen ? color : color}
//           stroke={color}
//           strokeWidth={1}
//         />
//       </g>
//     );
//   };

//   // Custom Volume Bar Component
//   const VolumeBar = ({ payload, x, width, chartHeight, maxVolume, volumeHeight }: VolumeBarProps) => {
//     if (!payload) return null;
    
//     const volume = parseFloat(payload.volume);
//     const open = parseFloat(payload.open);
//     const close = parseFloat(payload.close);
//     const isGreen = close > open;
    
//     const color = isGreen ? '#10b981' : '#ef4444';
//     const barHeight = (volume / maxVolume) * volumeHeight;
//     const barWidth = Math.max(width * 0.7, 2);
//     const barX = x + (width - barWidth) / 2;
//     const barY = chartHeight * 0.7 + (volumeHeight - barHeight);
    
//     return (
//       <rect
//         x={barX}
//         y={barY}
//         width={barWidth}
//         height={barHeight}
//         fill={color}
//         opacity={0.7}
//       />
//     );
//   };

//   const CandlestickChart: React.FC = () => {    
//     // Safety checks for data
//     if (!fxChartData?.values || !Array.isArray(fxChartData.values) || fxChartData.values.length === 0) {
//       return (
//         <div className="flex items-center justify-center h-96 text-slate-400">
//           {fxChartData ? "No chart data available" : "Loading chart..."}
//         </div>
//       );
//     }
    
//     // Convert string values to numbers for calculations
//     const numericValues = fxChartData?.values.map(d => ({
//       ...d,
//       openNum: parseFloat(d.open),
//       highNum: parseFloat(d.high),
//       lowNum: parseFloat(d.low),
//       closeNum: parseFloat(d.close),
//       volumeNum: parseFloat(d.volume)
//     }));
    
//     const minPrice: number = Math.min(...numericValues.map(d => d.lowNum)) - 0.01;
//     const maxPrice: number = Math.max(...numericValues.map(d => d.highNum)) + 0.01;
//     const maxVolume: number = Math.max(...numericValues.map(d => d.volumeNum));
    
//     // Process data to add isGreen property
//     const processedData = fxChartData.values.map(item => ({
//       ...item,
//       isGreen: parseFloat(item.close) > parseFloat(item.open)
//     }));
    
//     const currentPrice = parseFloat(processedData[processedData.length - 1]?.close || '0');
//     const candleWidth = chartDimensions.width / processedData.length;
//     const volumeHeight = chartDimensions.height * 0.25; // 25% of total height for volume
    
//     return (
//       <div className="relative w-full  pr-8" style={{ height: chartDimensions.height }}>
//         <svg 
//           width="100%" 
//           height={chartDimensions.height}
//           viewBox={`0 0 ${chartDimensions.width} ${chartDimensions.height}`}
//           preserveAspectRatio="none"
//         >
//           <defs>
//             <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
//               <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5"/>
//             </pattern>
//           </defs>
          
//           {/* Grid background */}
//           <rect width="100%" height="100%" fill="url(#grid)" />
          
         
          
//           {/* Candlesticks and Volume Bars */}
//           {processedData.map((item, index: number) => {
//             const x: number = index * candleWidth;
            
//             return (
//               <g key={index}>
//                 {/* Candlestick */}
//                 <Candlestick
//                   payload={item}
//                   x={x}
//                   width={candleWidth}
//                   height={chartDimensions.height}
//                   minPrice={minPrice}
//                   maxPrice={maxPrice}
//                 />
                
//                 {/* Volume Bar */}
//                 <VolumeBar
//                   payload={item}
//                   x={x}
//                   width={candleWidth}
//                   chartHeight={chartDimensions.height}
//                   maxVolume={maxVolume}
//                   volumeHeight={volumeHeight}
//                 />
//               </g>
//             );
//           })}
          
         
//         </svg>
//       </div>
//     );
//   };

//   // Calculate current price data for display
//   const currentPriceData = useMemo(() => {
//     if (!fxChartData?.values || fxChartData.values.length === 0) {
//       return {
//         open: 0,
//         high: 0,
//         low: 0,
//         close: 0,
//         change: 0,
//         changePercent: 0
//       };
//     }
    
//     const current = fxChartData.values[fxChartData.values.length - 1];
//     const previous = fxChartData.values.length > 1 ? fxChartData.values[fxChartData.values.length - 2] : current;
    
//     // Convert strings to numbers
//     const currentClose = parseFloat(current.close);
//     const previousClose = parseFloat(previous.close);
//     const currentOpen = parseFloat(current.open);
//     const currentHigh = parseFloat(current.high);
//     const currentLow = parseFloat(current.low);
    
//     const change = currentClose - previousClose;
//     const changePercent = previousClose !== 0 ? (change / previousClose) * 100 : 0;
    
//     return {
//       open: currentOpen,
//       high: currentHigh,
//       low: currentLow,
//       close: currentClose,
//       change,
//       changePercent
//     };
//   }, [fxChartData]);

//   return (
//     <div className="bg-[#090E29] text-white border-[0.3px] border-[#4453DD] rounded-10 py-5">
//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.8;
//           }
//         }
//       `}</style>
//       <div className="w-full">
//         {/* Header */}
//         <div className="flex justify-between flex-wrap items-center p-6 ">
//           <div className="flex items-center gap-3">
//           <h1 className="text-xl font-medium text-white">Market Chart</h1>
//             <div className="max-w-[140px] z-50">
//              <Select
//                 options={fSymbolOptions || []}
//                 value={selectedSymbolOption}
//                 onChange={handleSymbolOption}
//                 placeholder="Select"
//                 className="react-select-container"
//                 classNamePrefix="react-select"
//                 styles={selectStyle}
//                 isLoading={isLoading}
//                 isSearchable={true}
//                 components={{
//                     IndicatorSeparator: () => null,
//                 }}
//               />
//             </div>

//           </div>
                
//             <div className="max-w-[140px] z-50">
//              <Select
//                 options={fxTimeFrameOptions}
//                 value={fxTimeFrameOptions.find(option => option.value === timeframe)}
//                 onChange={handleTimeframeChange}
//                 placeholder="1hr"
//                 className="react-select-container"
//                 classNamePrefix="react-select"
//                 styles={selectStyle}
//                 isSearchable={false}
//                 components={{
//                     IndicatorSeparator: () => null,
//                 }}
//               />
//             </div>
//         </div>

//         {/* Price Header */}
//         <div className="lg:px-6 px-2  ">
//           <div className="flex items-start lg:items-center  gap-3 lg:gap-6 mb-2">
//             <div className="flex items-center gap-2">
//               <span className="text-sm lg:text-2xl font-medium">
//                 {selectedSymbolOption?.label || " AAPL"}
//               </span>
//             </div>
//             <div className='bg-[#092131] h-[1.25rem] flex justify-center items-center w-[1.25rem] rounded-full'>
//               <div className='w-[.5581rem] h-[.5581rem] bg-[#0FC578] rounded-full'/>
//               </div>
//           <div className="flex items-center flex-wrap gap-2 lg:gap-6 text-xxs lg:text-sm text-slate-300">
//             <span>
//               O - <span className="text-green-400">{currentPriceData?.open.toFixed(4)}</span></span>
//             <span>H - <span className="text-green-400">{currentPriceData?.high.toFixed(4)}</span></span>
//             <span>L - <span className="text-red-400">{currentPriceData?.low.toFixed(4)}</span></span>
//             <span>C - <span className="text-white">{currentPriceData?.close.toFixed(4)}</span></span>
//             <span className={currentPriceData?.change >= 0 ? 'text-green-400' : 'text-red-400'}>
//               {currentPriceData?.change >= 0 ? '+' : ''}{currentPriceData?.change.toFixed(4)} ({currentPriceData.change >= 0 ? '+' : ''}{currentPriceData.changePercent.toFixed(2)}%)
//             </span>
//           </div>
//           </div>
//         </div>

//         {/* Main Chart Container */}
//         <div className="lg:px-4 px-3">

//           {
//             isloadingFxChart?(
//               <div className="flex justify-center  h-full items-center py-7">
//                 <SmallSpinner color="#fff" />
//               </div>
//             ) : (
//           <div 
//             ref={chartContainerRef}
//             className="bg-[#090E29] rounded-lg  relative overflow-hidden"
//           >
            
//             {/* Price Scale */}
           
// {/* Price Scale */}
// <div className="absolute lg:right-0  items-center  right-0 top-0 h-[90%] lg:h-[100%] flex flex-col justify-between lg:py-8 text-xxs lg:text-xs text-slate-400 z-20">
//   {fxChartData?.values && fxChartData.values.length > 0 ? (
//     <>
//       {(() => {
//         const maxPrice = Math.max(...fxChartData.values.map(d => parseFloat(d.high))) + 0.01;
//         const minPrice = Math.min(...fxChartData.values.map(d => parseFloat(d.low))) - 0.01;
//         const currentPrice = parseFloat(fxChartData.values[fxChartData.values.length - 1]?.close || '0');
//         const priceRange = maxPrice - minPrice;
        
//         // Generate all price levels
//         const priceLevels = Array.from({length: 11}, (_, i) => 
//           maxPrice - (i * priceRange / 10)
//         );
        
//         // Find the closest price level to current price
//         const closestIndex = priceLevels.reduce((closest, price, index) => {
//           const currentDiff = Math.abs(price - currentPrice);
//           const closestDiff = Math.abs(priceLevels[closest] - currentPrice);
//           return currentDiff < closestDiff ? index : closest;
//         }, 0);
        
//         return priceLevels.map((price, i) => {
//           const isActivePrice = i === closestIndex;
          
//           return (
//             <span 
//               key={i} 
//               className={
//                 isActivePrice 
//                   ? "bg-[#4453DD]/10 border-l-[4px] border-[#4453DD] px-3 py-2 rounded-md text-white text-xs font-semibold shadow-lg relative" 
//                   : "text-slate-400"
//               }
//             >
//               {price.toFixed(4)}
//             </span>
//           );
//         });
//       })()}
//     </>
//   ) : (
//     <></>
//   )}
// </div>
            
//             {/* Chart Area */}
//             <div className="lg:p-4 pb-0 pr-16 lg:pr-20">
//               <CandlestickChart />
//             </div>
            
//             {/* Time Scale */}
//             <div className="flex justify-between text-xxs lg:text-xs text-slate-400  lg:px-4 lg:mr-20">
//               {fxChartData?.values && fxChartData.values.length > 0 ? (
//                 fxChartData.values
//                   .filter((_, index) => index % Math.ceil(fxChartData.values.length / 10) === 0)
//                   .map((item, index) => (
//                     <span key={index}>
//                       {new Date(item.datetime)?.toLocaleTimeString('en-US', { 
//                         hour: '2-digit', 
//                         minute: '2-digit',
//                         hour12: false 
//                       })}
//                     </span>
//                   ))
//               ) : (
//                 <></>
//               )}
//             </div>
//           </div>
//             )
//           }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrendDashboardChart;










import { FxSymbol, useFetchFxSymbols } from '@/app/dashboard/misc/api/dashboard/fetchFxChartsymbol';
import { OptionType, selectStyle } from '@/utils/selectStyles';
import Select  from 'react-select';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useFetchFxChartData } from '@/app/dashboard/misc/api/dashboard/fetchFxChartData';
import { SmallSpinner } from '@/icons/core';

interface CandlestickData {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  isGreen?: boolean;
}

interface CandlestickProps {
  payload: CandlestickData;
  x: number;
  width: number;
  height: number;
  minPrice: number;
  maxPrice: number;
}

interface VolumeBarProps {
  payload: CandlestickData;
  x: number;
  width: number;
  chartHeight: number;
  maxVolume: number;
  volumeHeight: number;
}

interface TooltipData {
  x: number;
  y: number;
  data: CandlestickData;
  visible: boolean;
}

interface SignalLine {
  price: number;
  label: string;
  color: string;
  type: 'support' | 'resistance' | 'moving_average';
}

const TrendDashboardChart: React.FC = () => {
  const fxTimeFrameOptions = [
  "1min", "5min", "15min", "30min", "45min",
  "1h", "2h", "4h", "5h",
  "1day", "1week", "1month"
].map((tf) => ({
  label: tf,
  value: tf
}));

  const [timeframe, setTimeframe] = useState<string>('1h');
  const [selectedSymbolOption, setSelectedSymbolOption] = useState<OptionType | null>(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 800, height: 500 });
  const [tooltip, setTooltip] = useState<TooltipData>({ x: 0, y: 0, data: {} as CandlestickData, visible: false });
  const [crosshair, setCrosshair] = useState<{ x: number; y: number; visible: boolean }>({ x: 0, y: 0, visible: false });
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  const handleTimeframeChange = (selection: OptionType | null) => {
    setTimeframe(selection?.value as string);
  };

  const {data:fxChartsymbol, isLoading}=useFetchFxSymbols()

  const fSymbolOptions = [
  { label: "AAPL", value: "AAPL" },
  ...(fxChartsymbol?.data?.map((item: FxSymbol) => ({
    label: item?.symbol,
    value: item?.symbol,
  })) ?? []),
];

  const handleSymbolOption = (selection: OptionType | null) => {
    setSelectedSymbolOption(selection);
  };

  const {data:fxChartData, isLoading:isloadingFxChart } = useFetchFxChartData({
    symbol: selectedSymbolOption?.value || "AAPL",
    interval: timeframe,
  })

  // Update chart dimensions when container size changes
  useEffect(() => {
    const updateDimensions = () => {
      if (chartContainerRef.current) {
        const containerWidth = chartContainerRef.current.offsetWidth;
        setChartDimensions({
          width: Math.max(containerWidth - 80, 300),
          height: 500
        });
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    const timeoutId = setTimeout(updateDimensions, 100);
    window.addEventListener('resize', updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timeoutId);
    };
  }, []);

  // Calculate signal lines (support, resistance, moving averages)
  const signalLines = useMemo((): SignalLine[] => {
    if (!fxChartData?.values || fxChartData.values.length < 20) return [];
    
    const values = fxChartData.values.map(d => ({
      ...d,
      closeNum: parseFloat(d.close),
      highNum: parseFloat(d.high),
      lowNum: parseFloat(d.low)
    }));
    
    const signals: SignalLine[] = [];
    
    // Simple Moving Average (20 periods)
    const sma20 = values.slice(-20).reduce((sum, item) => sum + item.closeNum, 0) / 20;
    signals.push({
      price: sma20,
      label: 'SMA(20)',
      color: '#3b82f6',
      type: 'moving_average'
    });
    
    // Recent high/low as resistance/support
    const recentHigh = Math.max(...values.slice(-10).map(d => d.highNum));
    const recentLow = Math.min(...values.slice(-10).map(d => d.lowNum));
    
    signals.push({
      price: recentHigh,
      label: 'Resistance',
      color: '#ef4444',
      type: 'resistance'
    });
    
    signals.push({
      price: recentLow,
      label: 'Support',
      color: '#10b981',
      type: 'support'
    });
    
    return signals;
  }, [fxChartData]);
  
  // Custom Candlestick Component with hover detection
  const Candlestick = ({ payload, x, width, height, minPrice, maxPrice }: CandlestickProps & { index?: number }) => {
    if (!payload) return null;
    
    const open = parseFloat(payload.open);
    const high = parseFloat(payload.high);
    const low = parseFloat(payload.low);
    const close = parseFloat(payload.close);
    const isGreen = close > open;
    
    const color: string = isGreen ? '#10b981' : '#ef4444';
    const priceRange: number = maxPrice - minPrice;
    
    const candlestickHeight = height * 0.7;
    const getY = (price: number): number => candlestickHeight - ((price - minPrice) / priceRange) * candlestickHeight;
    
    const openY: number = getY(open);
    const closeY: number = getY(close);
    const highY: number = getY(high);
    const lowY: number = getY(low);
    
    const bodyTop: number = Math.min(openY, closeY);
    const bodyHeight: number = Math.max(Math.abs(closeY - openY), 1);
    const bodyWidth: number = Math.max(width * 0.7, 2);
    const bodyX: number = x + (width - bodyWidth) / 2;
    const wickX: number = x + width / 2;
    
    const handleMouseEnter = (e: React.MouseEvent) => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (rect) {
        setTooltip({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          data: payload,
          visible: true
        });
      }
    };
    
    const handleMouseLeave = () => {
      setTooltip(prev => ({ ...prev, visible: false }));
    };
    
    return (
      <g>
        {/* Invisible hover area */}
        <rect
          x={x}
          y={0}
          width={width}
          height={candlestickHeight}
          fill="transparent"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: 'crosshair' }}
        />
        
        {/* Upper wick */}
        <line
          x1={wickX}
          y1={highY}
          x2={wickX}
          y2={Math.min(openY, closeY)}
          stroke={color}
          strokeWidth={1}
        />
        
        {/* Lower wick */}
        <line
          x1={wickX}
          y1={Math.max(openY, closeY)}
          x2={wickX}
          y2={lowY}
          stroke={color}
          strokeWidth={1}
        />
        
        {/* Body */}
        <rect
          x={bodyX}
          y={bodyTop}
          width={bodyWidth}
          height={bodyHeight}
          fill={isGreen ? color : color}
          stroke={color}
          strokeWidth={1}
        />
      </g>
    );
  };

  // Custom Volume Bar Component
  const VolumeBar = ({ payload, x, width, chartHeight, maxVolume, volumeHeight }: VolumeBarProps) => {
    if (!payload) return null;
    
    const volume = parseFloat(payload.volume);
    const open = parseFloat(payload.open);
    const close = parseFloat(payload.close);
    const isGreen = close > open;
    
    const color = isGreen ? '#10b981' : '#ef4444';
    const barHeight = (volume / maxVolume) * volumeHeight;
    const barWidth = Math.max(width * 0.7, 2);
    const barX = x + (width - barWidth) / 2;
    const barY = chartHeight * 0.7 + (volumeHeight - barHeight);
    
    return (
      <rect
        x={barX}
        y={barY}
        width={barWidth}
        height={barHeight}
        fill={color}
        opacity={0.7}
      />
    );
  };

  // Signal Lines Component
  const SignalLines = ({ signals, minPrice, maxPrice, width, height }: {
    signals: SignalLine[];
    minPrice: number;
    maxPrice: number;
    width: number;
    height: number;
  }) => {
    const candlestickHeight = height * 0.7;
    const priceRange = maxPrice - minPrice;
    const getY = (price: number): number => candlestickHeight - ((price - minPrice) / priceRange) * candlestickHeight;
    
    return (
      <g>
        {signals.map((signal, index) => {
          const y = getY(signal.price);
          const strokeDasharray = signal.type === 'moving_average' ? '5,5' : signal.type === 'resistance' ? '3,3' : '8,2';
          
          return (
            <g key={index}>
              {/* Signal line */}
              <line
                x1={0}
                y1={y}
                x2={width}
                y2={y}
                stroke={signal.color}
                strokeWidth={1.5}
                strokeDasharray={strokeDasharray}
                opacity={0.8}
              />
              
              {/* Signal label */}
              <rect
                x={5}
                y={y - 10}
                width={signal.label.length * 6 + 8}
                height={16}
                fill={signal.color}
                opacity={0.9}
                rx={3}
              />
              <text
                x={9}
                y={y + 2}
                fill="white"
                fontSize="10"
                fontWeight="500"
              >
                {signal.label}
              </text>
              
              {/* Price label */}
              <rect
                x={width - 60}
                y={y - 8}
                width={55}
                height={14}
                fill={signal.color}
                opacity={0.9}
                rx={2}
              />
              <text
                x={width - 57}
                y={y + 2}
                fill="white"
                fontSize="9"
                fontWeight="500"
              >
                {signal.price.toFixed(4)}
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  // Crosshair Component
  const Crosshair = ({ x, y, visible, width, height }: {
    x: number;
    y: number;
    visible: boolean;
    width: number;
    height: number;
  }) => {
    if (!visible) return null;
    
    return (
      <g opacity={0.5}>
        {/* Vertical line */}
        <line
          x1={x}
          y1={0}
          x2={x}
          y2={height * 0.7}
          stroke="#6b7280"
          strokeWidth={1}
          strokeDasharray="2,2"
        />
        
        {/* Horizontal line */}
        <line
          x1={0}
          y1={y}
          x2={width}
          y2={y}
          stroke="#6b7280"
          strokeWidth={1}
          strokeDasharray="2,2"
        />
      </g>
    );
  };

  // Tooltip Component
  const TooltipComponent = ({ tooltip }: { tooltip: TooltipData }) => {
    if (!tooltip.visible || !tooltip.data.datetime) return null;
    
    const open = parseFloat(tooltip.data.open);
    const high = parseFloat(tooltip.data.high);
    const low = parseFloat(tooltip.data.low);
    const close = parseFloat(tooltip.data.close);
    const volume = parseFloat(tooltip.data.volume);
    const isGreen = close > open;
    const change = close - open;
    const changePercent = open !== 0 ? (change / open) * 100 : 0;
    
    return (
      <div
        className="absolute z-50 bg-gray-900 border border-gray-600 rounded-lg p-3 text-xs shadow-lg pointer-events-none"
        style={{
          left: tooltip.x + 10,
          top: tooltip.y - 10,
          transform: tooltip.x > chartDimensions.width - 200 ? 'translateX(-100%)' : 'none'
        }}
      >
        <div className="text-white font-semibold mb-2">
          {new Date(tooltip.data.datetime).toLocaleString()}
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Open:</span>
            <span className="text-white">{open.toFixed(4)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">High:</span>
            <span className="text-green-400">{high.toFixed(4)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Low:</span>
            <span className="text-red-400">{low.toFixed(4)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Close:</span>
            <span className={isGreen ? 'text-green-400' : 'text-red-400'}>
              {close.toFixed(4)}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Volume:</span>
            <span className="text-white">{volume.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-4 pt-1 border-t border-gray-600">
            <span className="text-gray-400">Change:</span>
            <span className={isGreen ? 'text-green-400' : 'text-red-400'}>
              {change >= 0 ? '+' : ''}{change.toFixed(4)} ({changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>
    );
  };

  const CandlestickChart: React.FC = () => {    
    if (!fxChartData?.values || !Array.isArray(fxChartData.values) || fxChartData.values.length === 0) {
      return (
        <div className="flex items-center justify-center h-96 text-slate-400">
          {fxChartData ? "No chart data available" : "Loading chart..."}
        </div>
      );
    }
    
    const numericValues = fxChartData?.values.map(d => ({
      ...d,
      openNum: parseFloat(d.open),
      highNum: parseFloat(d.high),
      lowNum: parseFloat(d.low),
      closeNum: parseFloat(d.close),
      volumeNum: parseFloat(d.volume)
    }));
    
    const minPrice: number = Math.min(...numericValues.map(d => d.lowNum)) - 0.01;
    const maxPrice: number = Math.max(...numericValues.map(d => d.highNum)) + 0.01;
    const maxVolume: number = Math.max(...numericValues.map(d => d.volumeNum));
    
    const processedData = fxChartData.values.map(item => ({
      ...item,
      isGreen: parseFloat(item.close) > parseFloat(item.open)
    }));
    
    const candleWidth = chartDimensions.width / processedData.length;
    const volumeHeight = chartDimensions.height * 0.25;
    
    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCrosshair({ x, y, visible: true });
    };
    
    const handleMouseLeave = () => {
      setCrosshair({ x: 0, y: 0, visible: false });
      setTooltip(prev => ({ ...prev, visible: false }));
    };
    
    return (
      <div className="relative w-full pr-8" style={{ height: chartDimensions.height }}>
        <svg 
          ref={svgRef}
          width="100%" 
          height={chartDimensions.height}
          viewBox={`0 0 ${chartDimensions.width} ${chartDimensions.height}`}
          preserveAspectRatio="none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5"/>
            </pattern>
          </defs>
          
          {/* Grid background */}
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Signal Lines */}
          {/* <SignalLines
            signals={signalLines}
            minPrice={minPrice}
            maxPrice={maxPrice}
            width={chartDimensions.width}
            height={chartDimensions.height}
          /> */}
          
          {/* Candlesticks and Volume Bars */}
          {processedData.map((item, index: number) => {
            const x: number = index * candleWidth;
            
            return (
              <g key={index}>
                <Candlestick
                  payload={item}
                  x={x}
                  width={candleWidth}
                  height={chartDimensions.height}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                />
                
                <VolumeBar
                  payload={item}
                  x={x}
                  width={candleWidth}
                  chartHeight={chartDimensions.height}
                  maxVolume={maxVolume}
                  volumeHeight={volumeHeight}
                />
              </g>
            );
          })}
          
          {/* Crosshair */}
          <Crosshair
            x={crosshair.x}
            y={crosshair.y}
            visible={crosshair.visible}
            width={chartDimensions.width}
            height={chartDimensions.height}
          />
        </svg>
        
        {/* Tooltip */}
        <TooltipComponent tooltip={tooltip} />
      </div>
    );
  };

  // Calculate current price data for display
  const currentPriceData = useMemo(() => {
    if (!fxChartData?.values || fxChartData.values.length === 0) {
      return {
        open: 0,
        high: 0,
        low: 0,
        close: 0,
        change: 0,
        changePercent: 0
      };
    }
    
    const current = fxChartData.values[fxChartData.values.length - 1];
    const previous = fxChartData.values.length > 1 ? fxChartData.values[fxChartData.values.length - 2] : current;
    
    const currentClose = parseFloat(current.close);
    const previousClose = parseFloat(previous.close);
    const currentOpen = parseFloat(current.open);
    const currentHigh = parseFloat(current.high);
    const currentLow = parseFloat(current.low);
    
    const change = currentClose - previousClose;
    const changePercent = previousClose !== 0 ? (change / previousClose) * 100 : 0;
    
    return {
      open: currentOpen,
      high: currentHigh,
      low: currentLow,
      close: currentClose,
      change,
      changePercent
    };
  }, [fxChartData]);

  return (
    <div className="bg-[#090E29] text-white border-[0.3px] border-[#4453DD] rounded-10 py-5">
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between flex-wrap items-center p-6 ">
          <div className="flex items-center gap-3">
          <h1 className="text-xl font-medium text-white">Market Chart</h1>
            <div className="max-w-[140px] z-50">
             <Select
                options={fSymbolOptions || []}
                value={selectedSymbolOption}
                onChange={handleSymbolOption}
                placeholder="Select"
                className="react-select-container"
                classNamePrefix="react-select"
                styles={selectStyle}
                isLoading={isLoading}
                isSearchable={true}
                components={{
                    IndicatorSeparator: () => null,
                }}
              />
            </div>

          </div>
                
            <div className="max-w-[140px] z-50">
             <Select
                options={fxTimeFrameOptions}
                value={fxTimeFrameOptions.find(option => option.value === timeframe)}
                onChange={handleTimeframeChange}
                placeholder="1hr"
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

        {/* Price Header with Signal Line Indicators */}
        <div className="lg:px-6 px-2">
          <div className="flex items-start lg:items-center gap-3 lg:gap-6 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm lg:text-2xl font-medium">
                {selectedSymbolOption?.label || " AAPL"}
              </span>
            </div>
            <div className='bg-[#092131] h-[1.25rem] flex justify-center items-center w-[1.25rem] rounded-full'>
              <div className='w-[.5581rem] h-[.5581rem] bg-[#0FC578] rounded-full'/>
            </div>
            <div className="flex items-center flex-wrap gap-2 lg:gap-6 text-xxs lg:text-sm text-slate-300">
              <span>O - <span className="text-green-400">{currentPriceData?.open.toFixed(4)}</span></span>
              <span>H - <span className="text-green-400">{currentPriceData?.high.toFixed(4)}</span></span>
              <span>L - <span className="text-red-400">{currentPriceData?.low.toFixed(4)}</span></span>
              <span>C - <span className="text-white">{currentPriceData?.close.toFixed(4)}</span></span>
              <span className={currentPriceData?.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                {currentPriceData?.change >= 0 ? '+' : ''}{currentPriceData?.change.toFixed(4)} ({currentPriceData.change >= 0 ? '+' : ''}{currentPriceData.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
          
          {/* Signal Line Legend */}
          {/* {signalLines.length > 0 && (
            <div className="flex items-center gap-4 mt-2 text-xs">
              <span className="text-slate-400">Signals:</span>
              {signalLines.map((signal, index) => (
                <div key={index} className="flex items-center gap-1">
                  <div 
                    className="w-3 h-0.5" 
                    style={{ 
                      backgroundColor: signal.color,
                      opacity: 0.8
                    }}
                  />
                  <span style={{ color: signal.color }}>
                    {signal.label}
                  </span>
                </div>
              ))}
            </div>
          )} */}
        </div>

        {/* Main Chart Container */}
        <div className="lg:px-4 px-3">
          {isloadingFxChart ? (
            <div className="flex justify-center h-full items-center py-7">
              <SmallSpinner color="#fff" />
            </div>
          ) : (
            <div 
              ref={chartContainerRef}
              className="bg-[#090E29] rounded-lg relative overflow-hidden"
            >
              {/* Price Scale */}
              <div className="absolute lg:right-0 items-center right-0 top-0 h-[90%] lg:h-[100%] flex flex-col justify-between lg:py-8 text-xxs lg:text-xs text-slate-400 z-20">
                {fxChartData?.values && fxChartData.values.length > 0 ? (
                  <>
                    {(() => {
                      const maxPrice = Math.max(...fxChartData.values.map(d => parseFloat(d.high))) + 0.01;
                      const minPrice = Math.min(...fxChartData.values.map(d => parseFloat(d.low))) - 0.01;
                      const currentPrice = parseFloat(fxChartData.values[fxChartData.values.length - 1]?.close || '0');
                      const priceRange = maxPrice - minPrice;
                      
                      const priceLevels = Array.from({length: 11}, (_, i) => 
                        maxPrice - (i * priceRange / 10)
                      );
                      
                      const closestIndex = priceLevels.reduce((closest, price, index) => {
                        const currentDiff = Math.abs(price - currentPrice);
                        const closestDiff = Math.abs(priceLevels[closest] - currentPrice);
                        return currentDiff < closestDiff ? index : closest;
                      }, 0);
                      
                      return priceLevels.map((price, i) => {
                        const isActivePrice = i === closestIndex;
                        
                        return (
                          <span 
                            key={i} 
                            className={
                              isActivePrice 
                                ? "bg-[#4453DD]/10 border-l-[4px] border-[#4453DD] px-3 py-2 rounded-md text-white text-xs font-semibold shadow-lg relative" 
                                : "text-slate-400"
                            }
                          >
                            {price.toFixed(4)}
                          </span>
                        );
                      });
                    })()}
                  </>
                ) : (
                  <></>
                )}
              </div>
              
              {/* Chart Area */}
              <div className="lg:p-4 pb-0 pr-16 lg:pr-20">
                <CandlestickChart />
              </div>
              
              {/* Time Scale */}
              <div className="flex justify-between text-xxs lg:text-xs text-slate-400 lg:px-4 lg:mr-20">
                {fxChartData?.values && fxChartData.values.length > 0 ? (
                  fxChartData.values
                    .filter((_, index) => index % Math.ceil(fxChartData.values.length / 10) === 0)
                    .map((item, index) => (
                      <span key={index}>
                        {new Date(item.datetime)?.toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit',
                          hour12: false 
                        })}
                      </span>
                    ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendDashboardChart;