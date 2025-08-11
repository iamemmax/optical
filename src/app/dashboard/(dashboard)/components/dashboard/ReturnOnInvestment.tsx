import { useDashboardPortfolioChart } from '@/app/dashboard/misc/api/dashboard/fetchdashboardPotfolioChart';
import { useDashboardRoiChart } from '@/app/dashboard/misc/api/dashboard/fetchDashboardRoiChart';
import { formatValue } from '@/utils/enums';
import React, { useState } from 'react';
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
  Tooltip
} from 'recharts';
import  Select  from 'react-select';
import { OptionType, selectStyle } from '@/utils/selectStyles';
import { SmallSpinner } from '@/icons/core';
type CustomTooltipProps = {
  active?: boolean;
  payload?: any;
  label?: string;
};

const ReturnOnInvestment = () => {
    const filterStatus: OptionType[] = [
     { label: "Today", value: "today" },
     { label: "This Week", value: "this_week" },
     { label: "This month", value: "this_month" },
     { label: "This year", value: "this_year" },
   ];
   const [selectedGrowthOption, setSelectedGrowthOption] = useState(filterStatus[0]?.value);
   const [selectedOption, setSelectedOption] = useState(filterStatus[0]?.value);
  const { data: roiChartData,isLoading:isloadinRoi } = useDashboardRoiChart(selectedGrowthOption);
  const { data: portfolioChartData, isLoading:isloadingPortfolio } = useDashboardPortfolioChart(selectedOption);


  const roiData = React.useMemo(() => {
    if (!roiChartData) return [];
    
    return roiChartData.labels.map((label, index) => ({
      month: label,
      value: roiChartData.roi_investment_chart_data[index] || 0,
    }));
  }, [roiChartData]);

  const source = {
    labels: portfolioChartData?.labels,
    chart_data: portfolioChartData?.chart_data
  };

  const colorMap: Record<string, string> = {
    roi: "#0FC578",
    capital: "#4453DD",
    withdrawal: "#FF1515"
  };

  const portfolioData = React.useMemo(() => {
    if (!source.labels || !source.chart_data) return [];

    return source.labels.map((label, index) => ({
      name: label.toUpperCase(),
      value: source && source?.chart_data&&source?.chart_data[index] || 0,
      color: colorMap[label] || "#000000"
    }));
  }, [source.labels, source.chart_data]);

  const total = portfolioData.reduce((sum, item) => sum + item.value, 0);
  const paddingAngle = 5;
  const numSlices = portfolioData.length;
  const totalPadding = numSlices * paddingAngle;
  const availableAngle = 360 - totalPadding;

  const portfolioDataNormalized = portfolioData.map((item) => ({
    ...item,
    normalizedValue: (item.value / total) * availableAngle,
  }));

  const formatCurrency = (value: number) => {
    return `₦${value.toLocaleString()}`;
  };

  const CustomBarTooltip = ({ active, payload, label }: CustomTooltipProps): JSX.Element | null => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded p-2 shadow-lg">
          <p className="text-[#05091CB2] font-bold font-outfit text-sm">{`${label}: ${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }: CustomTooltipProps): JSX.Element | null => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#090E29] border-[0.3px] border-[#4453DD] rounded p-2 shadow-lg">
          <p className="text-white text-sm">{`${data.name}: ${data.value}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Calculate dynamic percentages for legend
  const getPercentage = (value: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  // Get actual data for legend display
  const legendData = React.useMemo(() => {
    if (portfolioData.length === 0) return [];
    
    return portfolioData.map((item) => ({
      ...item,
      percentage: getPercentage(item.value),
      formattedValue: formatCurrency(item.value)
    }));
  }, [portfolioData, total]);



  const handleGrowthOption = (selection: OptionType | null) => {
    setSelectedGrowthOption(selection?.value as string);
  };
  const handleOption = (selection: OptionType | null) => {
    setSelectedOption(selection?.value as string);
  };


  return (
    <div className="bg-[#090E29] p-4 md:p-6">
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        {/* ROI Growth Chart */}
        <div className="bg-[#090E29] border-[0.3px] border-[#4453DD] rounded-lg p-4 md:p-6">
          <div className="flex flex-row justify-between flex-wrap items-center mb-6 space-y-3 md:space-y-0">
            <h2 className="text-white sm:text-sm text-lg md:text-xl font-semibold">ROI Growth Value</h2>
              <div className="max-w-[8.75rem]">
              <Select
                className="w-full rounded-lg capitalize"
                components={{
                  IndicatorSeparator: () => null,
                }}
                defaultValue={filterStatus?.find(
                  (option) => option.value === selectedGrowthOption
                )}
                options={filterStatus}
                styles={selectStyle}
                isSearchable={false}
                onChange={handleGrowthOption}
              />
            </div>
          </div>
          <div className="w-full h-[300px] sm:h-[330px]">
            {
                isloadinRoi  ? <div className='flex justify-center h-full items-center py-2'><SmallSpinner color='#fff'/></div>
                :
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={roiData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                barCategoryGap={5}
                barGap={2}
              >
                <CartesianGrid strokeDasharray="2 2" stroke="#374151" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#9CA3AF', fontSize: 12 }} tickMargin={5}  />
                <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} tickFormatter={formatValue} width={40} />
                <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" fill="#4453DD" radius={[2, 2, 0, 0]} maxBarSize={12} />
              </BarChart>
            </ResponsiveContainer>
            }
          </div>
        </div>

        {/* Portfolio Pie Chart */}


        {

        }
        <div className="bg-[#090E29] w-full border-[0.3px] border-[#4453DD] rounded-lg p-4 md:p-6">
            <>
            {
                isloadingPortfolio  ? <div className='flex justify-center h-full items-center py-2'><SmallSpinner color='#fff'/></div>
                :
                <>
         <div className="flex flex-row justify-between flex-wrap items-center mb-6 space-y-3 md:space-y-0">
            <h2 className="text-white text-lg md:text-xl font-semibold">Portfolio</h2>
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

          <div className="flex justify-center mb-6">
            <div className="relative  w-50 h-56 ">
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <PieChart>
                  <Pie
                    data={portfolioDataNormalized}
                    dataKey="normalizedValue"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={paddingAngle}
                    startAngle={-90}
                    endAngle={270}
                  >
                    {portfolioDataNormalized.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              {/* Dynamic Labels positioned around the donut */}
              {legendData?.map((item, index) => {
                // Calculate cumulative angle for proper positioning
                let cumulativeValue = 0;
                for (let i = 0; i < index; i++) {
                  cumulativeValue += legendData[i].value;
                }
                const midPointValue = cumulativeValue + (item.value / 2);
                const angle = ((midPointValue / total) * 360) - 90;
                
                const radius = 105; // Distance from center
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                
                return (
                  <div
                    key={item.name}
                    className="absolute bg-[#090E29] h-10 w-10
                     sm:h-12 sm:w-12 rounded-full text-white 
                     font-bold text-xs flex justify-center items-center border
                      border-gray-600 transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      
                    }}
                  >
                    {item.percentage}%
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic Legend */}
          <div className=" items-start gap-7  grid grid-cols-2">
            {legendData.map((item, index) => (
              <div key={item.name} className="space-y-2 ">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-300 text-sm">
                    {item.name} - {item.formattedValue}
                  </span>
                </div>
                <div className=" bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      width: `${item.percentage}%`,
                      backgroundColor: item.color
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
                </>
            }
            </>
        </div>
      </div>
    </div>
  );
};

export default ReturnOnInvestment;