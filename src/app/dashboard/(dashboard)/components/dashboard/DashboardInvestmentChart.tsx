import { useDashboardAnalyticsChart } from '@/app/dashboard/misc/api/dashboard/fetchDashboardAnalyticsChart';
import { OptionType, selectStyle } from '@/utils/selectStyles';
import  Select  from 'react-select';
import React, { useState } from 'react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Tooltip
} from 'recharts';
import { SmallSpinner } from '@/icons/core';
import { formatValue } from '@/utils/enums';

type CustomTooltipProps = {
  active?: boolean;
  payload?: any;
  label?: string;
};

const DashboardInvestmentChart = () => {
  const filterStatus: OptionType[] = [
    { label: "Today", value: "today" },
    { label: "This Week", value: "this_week" },
    { label: "This month", value: "this_month" },
    { label: "This year", value: "this_year" },
  ];
  const [selectedOption, setSelectedOption] = useState(filterStatus[0]?.value);
  const { data: analyticsData, isLoading } = useDashboardAnalyticsChart(selectedOption);

  // // Transform API data to chart format
  const chartData = React.useMemo(() => {
    if (!analyticsData) return [];
    
    return analyticsData.labels.map((label, index) => ({
      month: label,
      trading_investment: analyticsData.trading_investment_chart_data[index] || 0,
      onlending: analyticsData.onlending_chart_data[index] || 0
    }));
  }, [analyticsData]);


  const handleOption = (selection: OptionType | null) => {
    setSelectedOption(selection?.value as string);
  };

  

 

 

  const CustomLineTooltip = ({ active, payload, label }: CustomTooltipProps): JSX.Element | null => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white border rounded shadow">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatValue(entry.value)}
            </p>
          ))}
        </div>
      );
    }

    return null;
  };


  return (
    <div className="bg-[#090E29] border-[0.3px] border-[#4453DD] mt-6 rounded-lg p-4 md:p-6">
      <div className="flex justify-between items-start md:items-center  mb-6 space-y-3 md:space-y-0">
        <div className="flex flex-wrap items-center space-y-3 sm:space-y-0 sm:space-x-8">
          <h2 className="text-white text-sm md:text-xl font-semibold">Active Investments</h2>
          <div className="flex flex-wrap items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-gray-300 text-sm">Trading Investment</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-gray-300 text-sm">Onlending</span>
            </div>
          </div>
        </div>
         <div className="max-w-[8.75rem]">
              <Select
                className="w-full rounded-lg capitalize"
                components={{
                  IndicatorSeparator: () => null,
                }}
                defaultValue={filterStatus.find(
                  (option) => option.value === selectedOption
                )}
                options={filterStatus}
                styles={selectStyle}
                isSearchable={false}
                onChange={handleOption}
              />
            </div>
      </div>

      <div className="h-[300px] sm:h-[400px]">
        {
isLoading?(
  <div className="flex justify-center  h-full items-center py-3">
    <SmallSpinner color="#fff" />
  </div>
) : (
      <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis dataKey="month" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
            <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} tickFormatter={formatValue} />
            <Tooltip content={<CustomLineTooltip />} />
            <Line type="monotone" dataKey="trading_investment" stroke="#10B981" strokeWidth={2} dot={false} name="Trading Investment" strokeLinecap="round" />
            <Line type="monotone" dataKey="onlending" stroke="#3B82F6" strokeWidth={2} dot={false} name="Onlending" strokeLinecap="round" />
          </LineChart>
        </ResponsiveContainer>
  )
}
</div>
</div>
  );
};

export default DashboardInvestmentChart