'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/core';

// Import ApexCharts types
import { ApexOptions } from 'apexcharts';

// Define tooltip parameter types
interface TooltipParams {
  seriesIndex: number;
  dataPointIndex: number;
  w: any;
}

// Import ApexCharts dynamically to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Mock data for trading signals
const mockSignals = [
  {
    id: "FX20230615",
    asset: "EUR/USD",
    assetFullName: "Euro / US Dollar",
    action: "Buy",
    entryPrice: 115000,
    targetPrice: 185000,
    stopLoss: 115000,
    timeframe: "1 Hour",
    timeframeDetail: "1H",
    confidence: 85,
    date: "12 June, 2024 6:15pm",
    status: "active"
  },
  {
    id: "FX20230616",
    asset: "GBP/USD",
    action: "Sell",
    entryPrice: 125000,
    targetPrice: 115000,
    stopLoss: 130000,
    timeframe: "4 Hour",
    timeframeDetail: "4H",
    confidence: 75,
    date: "13 June, 2024 2:30pm",
    status: "active"
  },
  {
    id: "CR20230617",
    asset: "BTC/USD",
    action: "Buy",
    entryPrice: 3500000,
    targetPrice: 4000000,
    stopLoss: 3300000,
    timeframe: "Daily",
    timeframeDetail: "1D",
    confidence: 90,
    date: "14 June, 2024 9:45am",
    status: "active"
  }
];

// Generate candlestick data
const generateCandlestickData = (currentSignal: any = null) => {
  const data = [];
  let time = new Date();
  time.setHours(time.getHours() - 3); // Start 3 hours ago
  let basePrice = currentSignal ? currentSignal.entryPrice : 40000;
  let currentPrice = basePrice;
  
  // Generate data points for a 3-hour chart with 15-minute intervals (3 candles per time period)
  for (let i = 0; i < 12; i++) { // 12 time periods × 15 minutes = 3 hours
    // For each time period, generate 3 candles
    for (let j = 0; j < 3; j++) {
      // Create a pattern similar to the reference image
      let trend;
      const periodIndex = i * 3 + j;
      
      if (periodIndex < 10) trend = -0.1; // Initial downtrend
      else if (periodIndex < 20) trend = 0.05; // Sideways
      else trend = 0.2; // Final uptrend
      
      const volatility = Math.random() * (basePrice * 0.005); // 0.5% volatility
      const open = currentPrice;
      const close = open + (Math.random() + trend) * volatility * (Math.random() > 0.5 ? 1 : -1);
      const high = Math.max(open, close) + Math.random() * (basePrice * 0.002);
      const low = Math.min(open, close) - Math.random() * (basePrice * 0.002);
      
      // Update current price for next iteration
      currentPrice = close;
      
      data.push({
        x: time.getTime(),
        y: [open, high, low, close]
      });
      
      // Increment time by 5 minutes for each candle
      time.setMinutes(time.getMinutes() + 5);
    }
  }
  
  return data;
};

// Generate volume data
const generateVolumeData = () => {
  const data = [];
  let time = new Date();
  time.setHours(time.getHours() - 3); // Start 3 hours ago
  
  // Generate data points for a 3-hour chart with 15-minute intervals (3 candles per time period)
  for (let i = 0; i < 12; i++) { // 12 time periods × 15 minutes = 3 hours
    // For each time period, generate 3 volume bars
    for (let j = 0; j < 3; j++) {
      // Create volume pattern similar to reference image
      const periodIndex = i * 3 + j;
      let volumeBase;
      
      if (periodIndex === 8) volumeBase = 800000; // Large volume spike
      else if (periodIndex > 25 && periodIndex < 30) volumeBase = 200000; // Increased volume during uptrend
      else volumeBase = 50000 + Math.random() * 50000;
      
      const volume = volumeBase * (0.5 + Math.random());
      
      // Determine if this is an up or down candle (for coloring)
      const isUp = Math.random() > 0.5;
      
      data.push({
        x: time.getTime(),
        y: volume,
        color: isUp ? '#16FFC7' : '#FF1515'
      });
      
      // Increment time by 5 minutes for each volume bar
      time.setMinutes(time.getMinutes() + 5);
    }
  }
  
  return data;
};

// Calculate moving averages
const calculateMA = (data: any[], period: number) => {
  const result = [];
  const prices = data.map(item => item.y[3]); // Close prices
  
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push({
        x: data[i].x,
        y: null
      });
    } else {
      const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
      result.push({
        x: data[i].x,
        y: sum / period
      });
    }
  }
  
  return result;
};

// Generate Bollinger Bands
const calculateBollingerBands = (data: any[], period: number = 20, multiplier: number = 2) => {
  const ma = calculateMA(data, period);
  const upperBand = [];
  const lowerBand = [];
  const prices = data.map(item => item.y[3]); // Close prices
  
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      upperBand.push({
        x: data[i].x,
        y: null
      });
      lowerBand.push({
        x: data[i].x,
        y: null
      });
    } else {
      const slice = prices.slice(i - period + 1, i + 1);
      const sum = slice.reduce((a, b) => a + b, 0);
      const mean = sum / period;
      
      // Calculate standard deviation
      const squaredDiffs = slice.map(price => Math.pow(price - mean, 2));
      const variance = squaredDiffs.reduce((a, b) => a + b, 0) / period;
      const stdDev = Math.sqrt(variance);
      
      upperBand.push({
        x: data[i].x,
        y: mean + (multiplier * stdDev)
      });
      lowerBand.push({
        x: data[i].x,
        y: mean - (multiplier * stdDev)
      });
    }
  }
  
  return {
    upper: upperBand,
    lower: lowerBand
  };
};

// Timeline data interface
interface TimelineItem {
  time: string;
  action: string;
  note: string;
}

// Timeline data
const timelineData: TimelineItem[] = [
  { time: "09:30AM", action: "Signal Issued", note: "Buy at 1.0922" },
  { time: "09:50AM", action: "Reached 50% Target", note: "TP half hit at 1.0935" },
  { time: "09:50AM", action: "Updated SL to 1.0905", note: "Move stop loss to breakeven" }
];

// Analysis data
const analysisData = {
  technical: "The pair is showing a bullish momentum after a recent upward-momentum above 40.50 MA. Price is currently testing resistance at 1.0935 level.",
  fundamental: "Positive Economic Data was revealed in U.S. labor market end of EUR strength.",
  sentiment: "75% of traders are long on EUR/USD today."
};

// Trade setup data structure
const tradeSetupFields = [
  { label: "Entry Price", key: "entryPrice" },
  { label: "Take Profit", key: "targetPrice" },
  { label: "Stop Loss", key: "stopLoss" },
  { label: "Timeframe", key: "timeframe", suffix: (signal:any) => `(${signal.timeframeDetail})` },
  { label: "Signal ID", key: "id", prefix: "#" },
  { label: "Signal Date", key: "date" }
];

interface PageProps {
  params: {
    id: string;
  };
}

// Trade setup data interface
interface TradeSetupItem {
  label: string;
  value: string | number;
}

// Analysis data interface
interface AnalysisItem {
  label: string;
  value: string;
}

// Ratio data interface
interface RatioItem {
  label: string;
  value: string | number;
}

export default function SignalDetailPage({ params }: PageProps) {
  const router = useRouter();
  const [signal, setSignal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any>(null);
  const [chartOptions, setChartOptions] = useState<any>(null);

  // Format price with commas
  const formatPrice = (price: number) => {
    return `₦${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  useEffect(() => {
    // Find the signal with the matching ID
    console.log("Looking for signal with ID:", params.id);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Find signal by ID
      const foundSignal = mockSignals.find(s => s.id === params.id);
      console.log("Found signal:", foundSignal);
      
      // If no signal found, use the first one as fallback (for demo purposes)
      setSignal(foundSignal || mockSignals[0]);
      setLoading(false);
    }, 500);
  }, [params.id]);

  // Initialize chart data and options
  useEffect(() => {
    if (loading || !signal) return;

    // Generate chart data with explicit signal parameter
    const candlestickData = generateCandlestickData(signal);
    const volumeData = generateVolumeData();
    
    // Calculate Bollinger Bands
    const bollingerBands = calculateBollingerBands(candlestickData, 10, 2);
    
    // Set chart series
    setChartData([
      {
        name: 'Candles',
        type: 'candlestick',
        data: candlestickData
      },
      {
        name: 'Volume',
        type: 'bar',
        data: volumeData
      },
      {
        name: 'Upper Band',
        type: 'line',
        data: bollingerBands.upper,
        color: '#4453DD',
        dashArray: 0
      },
      {
        name: 'Lower Band',
        type: 'line',
        data: bollingerBands.lower,
        color: '#4453DD',
        dashArray: 0
      }
    ]);
    
    // Set chart options
    setChartOptions({
      chart: {
        type: 'candlestick',
        height: 350,
        background: '#090E29',
        foreColor: '#d1d4dc',
        toolbar: {
          show: false,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          },
          autoSelected: 'zoom'
        },
        animations: {
          enabled: false
        }
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: '#16FFC7',
            downward: '#FF1515'
          },
          wick: {
            useFillColor: true
          }
        },
        bar: {
          columnWidth: '60%',
          colors: {
            ranges: [{
              from: 0,
              to: 999999,
              color: '#16FFC7'
            }]
          }
        }
      },
      stroke: {
        curve: 'straight',
        width: [1, 1]
      },
      grid: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        },
        row: {
          colors: undefined,
          opacity: 0.1
        },
        column: {
          colors: undefined,
          opacity: 0.1
        },
        padding: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10
        }
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            colors: '#d1d4dc',
            fontSize: '10px',
            fontFamily: 'Outfit, sans-serif'
          },
          format: 'HH:mm',
          datetimeUTC: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          show: true,
          stroke: {
            color: 'rgba(255, 255, 255, 0.3)',
            width: 1,
            dashArray: 0
          }
        }
      },
      yaxis: [
        {
          seriesName: 'Candles',
          opposite: true,
          labels: {
            style: {
              colors: '#d1d4dc',
              fontSize: '10px',
              fontFamily: 'Outfit, sans-serif'
            },
            formatter: function(val: number) {
              return val.toFixed(2);
            },
            offsetX: 0,
            align: 'right'
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          tickAmount: 6,
          crosshairs: {
            show: true,
            position: 'back',
            stroke: {
              color: 'rgba(255, 255, 255, 0.3)',
              width: 1,
              dashArray: 0
            }
          }
        },
        {
          seriesName: 'Volume',
          opposite: true,
          show: false
        }
      ],
      tooltip: {
        enabled: true,
        theme: 'dark',
        shared: true,
        intersect: false,
        custom: [
          function(options: TooltipParams) {
            const { seriesIndex, dataPointIndex, w } = options;
            
            if (seriesIndex === 0) {
              const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
              const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
              const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
              const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
              const time = new Date(w.globals.seriesX[seriesIndex][dataPointIndex]).toLocaleTimeString();
              
              return `
                <div class="apexcharts-tooltip-candlestick" style="padding: 8px; font-size: 12px;">
                  <div style="margin-bottom: 4px; font-weight: bold;">${time}</div>
                  <div>O: <span style="float: right; font-weight: bold;">${o.toFixed(2)}</span></div>
                  <div>H: <span style="float: right; font-weight: bold;">${h.toFixed(2)}</span></div>
                  <div>L: <span style="float: right; font-weight: bold;">${l.toFixed(2)}</span></div>
                  <div>C: <span style="float: right; font-weight: bold;">${c.toFixed(2)}</span></div>
                </div>
              `;
            }
            return '';
          },
          function(options: TooltipParams) {
            const { seriesIndex, dataPointIndex, w } = options;
            
            if (seriesIndex === 1) {
              const val = w.globals.series[seriesIndex][dataPointIndex];
              return `
                <div class="apexcharts-tooltip-bar" style="padding: 8px; font-size: 12px;">
                  <div>Volume: <span style="float: right; font-weight: bold;">${val.toLocaleString()}</span></div>
                </div>
              `;
            }
            return '';
          }
        ]
      },
      annotations: {
        yaxis: [
          {
            y: signal.targetPrice,
            borderColor: '#16FFC7',
            borderWidth: 1,
            strokeDashArray: 0,
            label: {
              borderColor: '#16FFC7',
              style: {
                color: '#090E29',
                background: '#16FFC7',
                fontSize: '10px',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 600,
                padding: {
                  left: 6,
                  right: 6,
                  top: 2,
                  bottom: 2
                }
              },
              text: 'Target',
              position: 'left'
            }
          }
        ]
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        opacity: 1
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              height: 300
            }
          }
        }
      ]
    });
  }, [loading, signal]);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl text-white mb-4">Loading signal data...</h2>
      </div>
    );
  }

  if (!signal) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl text-white mb-4">Signal not found (ID: {params.id})</h2>
        <button 
          onClick={() => router.back()}
          className="bg-[#4453DD] text-white px-4 py-2 rounded-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  const getActionColor = (action:string) => {
    switch (action) {
      case "Buy":
        return "border-[0.3px] border-[#16FFC7] px-6 py-[.375rem] font-outfit text-xs font-medium rounded-lg text-[#16FFC7]";
      
      case "Sell":
        return "border-[0.3px] border-[#FF1515] px-6 py-[.375rem] font-outfit text-xs font-medium rounded-lg text-[#FF1515]";
     
      case "Hold":
        return "border-[0.3px] border-[#FF9900] px-6 py-[.375rem] font-outfit text-xs font-medium rounded-lg text-[#FF9900]";
    }
  };

  // Signal Update Timeline section
  const SignalUpdateTimeline = () => {
    const columnHelper = createColumnHelper<TimelineItem>();
    
    const columns = useMemo(() => [
      columnHelper.accessor('time', {
        header: () => <div className="text-gray-400">Time</div>,
        cell: info => <div>{info.getValue()}</div>
      }),
      columnHelper.accessor('action', {
        header: () => <div className="text-gray-400">Action</div>,
        cell: info => <div>{info.getValue()}</div>
      }),
      columnHelper.accessor('note', {
        header: () => <div className="text-gray-400">Note</div>,
        cell: info => <div>{info.getValue()}</div>
      })
    ], []);
    
    const table = useReactTable({
      data: timelineData,
      columns,
      getCoreRowModel: getCoreRowModel()
    });
    
    return (
      <div className="bg-[#090E29] border-[0.3px] border-[#4453DD] rounded-lg p-4">
        <h3 className="text-lg font-bold mb-4">Signal Update Timeline</h3>
        <Table>
          <TableHeader className="bg-[#0B1739] border-none">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    className="font-nunito text-sm text-white font-medium"
                    key={header.id}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  // Trade Setup Overview Table
  const TradeSetupTable = () => {
    const tradeSetupData: TradeSetupItem[] = useMemo(() => {
      if (!signal) return [];
      return tradeSetupFields.map(field => ({
        label: field.label,
        value: field.key === 'entryPrice' || field.key === 'targetPrice' || field.key === 'stopLoss' 
          ? formatPrice(signal[field.key]) 
          : field.prefix 
            ? `${field.prefix}${signal[field.key]}` 
            : field.suffix 
              ? `${signal[field.key]}${field.suffix(signal)}` 
              : signal[field.key]
      }));
    }, [signal]);

    const columnHelper = createColumnHelper<TradeSetupItem>();
    
    const columns = useMemo(() => [
      columnHelper.accessor('label', {
        header: () => <div className="text-gray-400">Field</div>,
        cell: info => <div className="text-gray-400">{info.getValue()}</div>
      }),
      columnHelper.accessor('value', {
        header: () => <div className="text-gray-400">Value</div>,
        cell: info => <div>{info.getValue()}</div>
      })
    ], []);
    
    const table = useReactTable({
      data: tradeSetupData,
      columns,
      getCoreRowModel: getCoreRowModel()
    });
    
    return (
      <div className="bg-[#090E29] border-[0.3px] border-[#4453DD] rounded-lg p-4">
        <h3 className="text-lg font-bold mb-4">Trade Setup Overview</h3>
        <Table>
          <TableHeader className="hidden">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id} className="border-b border-white">
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className={cell.column.id === 'value' ? 'text-right' : ''}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  // Analysis Table
  const AnalysisTable = () => {
    const analysisItems: AnalysisItem[] = useMemo(() => [
      { label: "Technical Analysis", value: analysisData.technical },
      { label: "Fundamental Note", value: analysisData.fundamental },
      { label: "Sentiment Indicator", value: analysisData.sentiment }
    ], []);
    
    return (
      <div className="bg-[#090E29] border-[0.3px] border-[#4453DD] rounded-lg p-4">
        <h3 className="text-lg font-bold mb-4">Trade Analysis/Commentary</h3>
        <div className="space-y-4">
          {analysisItems.map((item, index) => (
            <div key={index} className="pb-4 last:border-b-0 last:pb-0">
              <div className="mb-1 font-medium">{item.label}:</div>
              <div className="text-sm text-gray-300">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Ratio Table
  const RatioTable = () => {
    const ratioData: RatioItem[] = useMemo(() => {
      if (!signal) return [];
      return [
        { label: "Entry Price", value: formatPrice(signal.entryPrice) },
        { label: "Take Profit", value: formatPrice(signal.targetPrice) },
        { label: "Stop Loss", value: formatPrice(signal.stopLoss) }
      ];
    }, [signal]);

    const columnHelper = createColumnHelper<RatioItem>();
    
    const columns = useMemo(() => [
      columnHelper.accessor('label', {
        header: () => <div className="text-gray-400">Field</div>,
        cell: info => <div className="text-gray-400">{info.getValue()}</div>
      }),
      columnHelper.accessor('value', {
        header: () => <div className="text-gray-400">Value</div>,
        cell: info => <div>{info.getValue()}</div>
      })
    ], []);
    
    const table = useReactTable({
      data: ratioData,
      columns,
      getCoreRowModel: getCoreRowModel()
    });
    
    return (
      <div className="bg-[#090E29] border-[0.3px] border-[#4453DD] rounded-lg p-4 md:col-span-2 lg:col-span-1">
        <h3 className="text-lg font-bold mb-4">Ratio</h3>
        <Table>
          <TableHeader className="hidden">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id} className="border-b border-[#4453DD]/20">
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className={cell.column.id === 'value' ? 'text-right' : ''}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className="bg-[#0A1029] text-white p-4 md:p-6">
      {/* Header with asset name and confidence */}
      <div className="bg-[#090E29] border-[0.3px] border-[#4453DD] rounded-lg p-4 mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">{signal.asset}</h2>
          <p className="text-sm text-gray-400">{signal.assetFullName} · ACTIVE</p>
          <Button variant={"outlined"}  className={`px-6 py-2  border-[#16FFC7] text-[#16FFC7] mt-3 rounded-md ${getActionColor(signal.action)}`}>
          {signal.action}
        </Button>
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
      

      {/* Chart */}
      <div className="bg-[#0B1739] p-4 rounded-lg mb-4 h-[400px] md:h-[450px]">
        {chartData && chartOptions ? (
          <div className="h-full">
            <ReactApexChart 
              options={chartOptions} 
              series={chartData} 
              type="candlestick" 
              height="100%" 
              width="100%" 
            />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-8 w-8 text-[#4453DD] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p>Loading chart data...</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TradeSetupTable />
        <AnalysisTable />
        <TradeSetupTable /> {/* For Indicator Used - reusing the same component */}
        <SignalUpdateTimeline />
        <RatioTable />
      </div>
    </div>
  );
}






