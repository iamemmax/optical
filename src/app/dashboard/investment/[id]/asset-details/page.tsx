"use client";
import { useGetInvestmentAssetDetails } from '@/app/dashboard/misc/api/investment/fetchInvestmentAssetDetails';
import { addCommasToNumber } from '@/utils';
import { formatValue } from '@/utils/enums';
import { convertKebabAndSnakeToTitleCase } from '@/utils/strings';
import { useParams } from 'next/navigation';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';

const TradingDashboard = () => {
  const safeAddCommasToNumber = (num:number) => {
  const number = Number(num);
  if (isNaN(number)) return '0';
  return number?.toLocaleString();
};
  const params = useParams()
  const {data:assetDetails }=useGetInvestmentAssetDetails(String(params?.id))
 
    const performanceData = React.useMemo(() => {
      if (!assetDetails?.performance_chart) return [];
      
      return assetDetails?.performance_chart.chart_label.map((label, index) => ({
        month: label,
        value: assetDetails?.performance_chart.chart_values[index] || 0,
      }));
    }, [assetDetails?.performance_chart]);
  

 const assetOverview = [
  {
    title: "Start Date",
    value: assetDetails?.overview?.start_date ?? ""
  },
  {
    title: "Due Date",
    value: assetDetails?.overview?.due_date ?? ""
  },
  {
    title: "Amount Invested",
    value: `₦${addCommasToNumber(Number(assetDetails?.overview?.amount_invested) || 0)}`
  },
  {
    title: "Expected Return",
    value: `₦${addCommasToNumber(Number(assetDetails?.overview?.expected_returns) || 0)}`
  },
  {
    title: "Current Earnings",
    value: `₦${safeAddCommasToNumber(assetDetails?.overview?.current_earnings ?? 0)}`  },
  {
    title: "Progress Tracker",
    value: `${assetDetails?.overview?.progress_tracker || "0"}%`
  }
]

  const tradingAnalysis = [
    {
      title:"Asset Pair",
      value:assetDetails?.trade_analysis?.asset_pair ??""
    },
    {
      title:"Entry Price",
      value:`₦${addCommasToNumber(Number(assetDetails?.trade_analysis?.entry_price)) ??0}`
    },
    {
      title:"Strategy",
      value:assetDetails?.trade_analysis?.strategy ??""
    },
    {
      title:"Technical Analysis",
      value:assetDetails?.trade_analysis?.technical_analysis ??""
    },
    {
      title:"Fundamental Note",
      value:assetDetails?.trade_analysis?.fundamental_note ??""
    },
    {
      title:"Sentiment Indicator",
      value:assetDetails?.trade_analysis?.sentiment_indicator ??""
    },
    
  ]

  return (
    <div className="p-4 md:p-6">
      <div className="space-y-6">
      
        <div className="bg-[#090E29] rounded-lg p-4 sm:p-6 border border-[#4453DD]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-xl sm:text-2xl font-bold text-white">EUR/USD</h1>
              <span className="px-3 py-1 bg-emerald-500 text-white text-sm rounded-full">
               {convertKebabAndSnakeToTitleCase(assetDetails?.overview?.status)}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors w-full sm:w-auto">
                Withdraw
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
                Reinvest/Top up
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 border border-[#4453DD] p-4 sm:p-5 rounded-lg">
            
            {
              assetOverview?.map((item,idx:number)=>(
                <div key={idx}>
                  <p className="text-slate-400 text-sm mb-1">{item?.title}</p>
                  <p className="text-white font-medium">{item?.value}</p>
                </div>
              ))
            }
           
           
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Chart */}
          <div className="bg-[#090E29] rounded-lg p-4 sm:p-6 border border-[#4453DD]">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Performance</h2>
            <div className="h-[300px] md:h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    tickFormatter={formatValue}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Timeline & ROI */}
          <div className="space-y-6">
            {/* Investment Timeline */}
            <div className="bg-[#090E29] rounded-lg p-4 sm:p-6 border border-[#4453DD]">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Investment Timeline</h2>
              <div className="space-y-4">
                {[
                  { title: "Investment Initiated", date: assetDetails?.investment_timelines?.initiated ??"" },
                  { title: "Approval & Activation", date: assetDetails?.investment_timelines?.approved_on ??"" },
                  { title: "Payout/Interest Disbursement", date: assetDetails?.investment_timelines?.payout_date ??"" },
                  { title: "Maturity/Withdrawal Date", date: assetDetails?.investment_timelines?.maturity_date ??"", inactive: true }
                ].map(({ title, date, inactive }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full mt-1 ${inactive ? "bg-slate-600" : "bg-blue-500"}`} />
                    <div>
                      <p className={`font-medium ${inactive ? "text-slate-400" : "text-white"}`}>{title}</p>
                      <p className="text-slate-400 text-sm">{date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROI Details */}
            <div className="bg-[#090E29] rounded-lg p-4 sm:p-6 border border-[#4453DD]">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">ROI Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">ROI Percentage</span>
                  <span className="text-white font-medium">80%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Progress Tracker</span>
                  <span className="text-white font-medium">80%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Amount Earned So Far</span>
                  <span className="text-white font-medium">₦1,000,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Next Payout Date</span>
                  <span className="text-white font-medium">June 18, 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Trade Analysis */}
          <div className="bg-[#090E29] rounded-lg p-4 sm:p-6 border border-[#4453DD]">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Trade Analysis/Commentary</h2>
            <div className="space-y-4">
              {
                tradingAnalysis?.map((item,idx:number)=>(
                  <div key={idx} className="flex justify-between">
                    <span className="text-slate-400">{item?.title}:</span>
                    <span className="text-white  text-sm leading-relaxed">{item?.value}</span>
                  </div>
                ))
              }
             

              

           
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-[#090E29] rounded-lg p-4 sm:p-6 border border-[#4453DD]">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Terms/Conditions</h2>
            <div className="text-slate-300 text-sm leading-relaxed space-y-4">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingDashboard;
