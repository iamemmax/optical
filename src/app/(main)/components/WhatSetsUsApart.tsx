'use client';

import React from 'react';

const features = [
  {
    id: '01',
    title: 'EXPERT-LED TRADING SIGNALS',
    description: 'A team of seasoned professional with extensive forex experience guides investment decisions, ensuring well-informed and strategic trading for consistent results.'
  },
  {
    id: '02',
    title: 'TRANSPARENT RETURNS & REPORTS',
    description: 'A team of seasoned professional with extensive forex experience guides investment decisions, ensuring well-informed and strategic trading for consistent results.'
  },
  {
    id: '03',
    title: 'REGULATED & SECURE PLATFORM',
    description: 'A team of seasoned professional with extensive forex experience guides investment decisions, ensuring well-informed and strategic trading.'
  },
  {
    id: '04',
    title: '24/7 CUSTOMER SUPPORT',
    description: 'A team of seasoned professional with extensive forex experience guides investment decisions, ensuring well-informed and strategic trading for consistent results.'
  },
  {
    id: '05',
    title: 'LOW DEFAULT RISK LENDING',
    description: 'A team of seasoned professional with extensive forex experience guides investment decisions, ensuring well-informed and strategic trading for consistent results.'
  },
  {
    id: '06',
    title: 'DEDICATED ACCOUNT MANAGERS',
    description: 'A team of seasoned professional with extensive forex experience guides investment decisions, ensuring well-informed and strategic trading.'
  }
];

const WhatSetsUsApart = () => {
  return (
    <div className="w-full bg-[#0C0A3A] py-16 md:py-24 px-4 md:px-[2rem] xl:px-[4.5rem]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-white/10 text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
            Why Choose Opticraft?
          </h2>
          <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
            What Sets Us Apart
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-3 xl:gap-6 w-full">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className="bg-white/10 rounded-[20px] p-4 xl:p-6 relative overflow-hidden"
            >
              <div className={`flex flex-row ${index % 2 === 1 ? 'flex-row-reverse' : ''} gap-4  items-center`}>
                <div className="flex-shrink-0">
                  <span className="text-5xl xl:text-7xl font-bold opacity-80 bg-gradient-to-r from-blue-600 to-blue-600/10 text-transparent bg-clip-text">
                    {feature.id}
                  </span>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h4 className="text-white text-xs md:text-sm font-bold font-outfit mb-2 2xl:text-base">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-white/70 text-xs">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatSetsUsApart;