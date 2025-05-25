'use client';
import React, { useMemo, useState } from 'react';
import { 
  createColumnHelper, 
  flexRender, 
  getCoreRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel, 
  useReactTable,
  PaginationState
} from '@tanstack/react-table';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow,
  Button
} from '@/components/core';
import { topSignalsMockData, TradingSignalData } from '../../../trading-signal/mockData';
import SignalGrid from './SignalGrid';

export const SkeletonLoading = () => (
  <div className="animate-pulse">
    <div className="h-3 bg-gray-200 rounded mb-2"/>
  </div>
);

const TopSignal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [selectedSignal, setSelectedSignal] = useState<TradingSignalData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);
  
  const columnHelper = createColumnHelper<TradingSignalData>();
  
  const columns = useMemo(
    () => [
      columnHelper.accessor("asset", {
        header: () => "Asset",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("entryPrice", {
        header: () => "Entry Price",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("targetPrice", {
        header: () => "Target Price",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("stopLoss", {
        header: () => "Stop Loss",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("confidence", {
        header: () => "Confidence",
        cell: (info) => `${info.getValue()}%`,
      }),
      columnHelper.accessor("timeframe", {
        header: () => "Timeframe",
        cell: (info) => `${info.getValue()} ${info.row.original.timeframeDetail}`,
      }),
      columnHelper.accessor("action", {
        header: () => "Signal Type",
        cell: (info) => {
          const action = info.getValue();
          let className = "";
          
          switch (action) {
            case "Buy":
              className = "border-[0.3px] border-[#16FFC7] px-[1.3125rem] py-[.5625rem] font-outfit text-xs font-medium rounded-lg text-[#16FFC7]";
              break;
            case "Sell":
              className = "border-[0.3px] border-[#FF1515] px-[1.3125rem] py-[.5625rem] font-outfit text-xs font-medium rounded-lg text-[#FF1515]";
              break;
            case "Hold":
              className = "border-[0.3px] border-[#FF9900] px-[1.3125rem] py-[.5625rem] font-outfit text-xs font-medium rounded-lg text-[#FF9900]";
              break;
          }
          
          return (
            <span className={className}>
              {action}
            </span>
          );
        },
      }),
      columnHelper.accessor("id", {
        header: () => "Action",
        cell: (info) => (
          <button 
            className="bg-[#0A1029] border-opacity-50 border-[0.3px] py-[.5625rem] px-3 border-white rounded-lg text-white text-xs hover:bg-[#4453DD]/20 transition-colors"
            onClick={() => {
              setSelectedSignal(info.row.original);
              setShowDetailView(true);
            }}
          >
            See more
          </button>
        ),
      }),
    ],
    []
  );
  
  const table = useReactTable({
    data: topSignalsMockData,
    columns,
    state: {
      globalFilter,
      pagination,
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(topSignalsMockData.length / pagination.pageSize),
  });
  
  const rows = useMemo(() => topSignalsMockData, []);



  const handleCardClick = (signal: TradingSignalData) => {
    setSelectedSignal(signal);
    setIsModalOpen(true);
  };

  const handleBackToTable = () => {
    setShowDetailView(false);
  };

  return (
    <div>
      <div className='mt-4 border-b-[.0313rem] border-[#696969] border-opacity-50 pb-4'>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="md:text-2xl text-lg font-bold font-verdana text-white mb-2">Top Signal</h1>
            <p className="text-white/80 font-outfit text-sm md:text-base">Get daily updates, live trends, and smart alerts from our expert analysts</p>
          </div>
          {showDetailView && (
            <Button 
              className="bg-[#4453DD] hover:bg-[#3344CC] text-white px-4 py-2 rounded-lg"
              onClick={handleBackToTable}
            >
              Back to Table
            </Button>
          )}
        </div>
      </div>

      {/* Signal Grid View for Mobile */}
      <div className="block md:hidden mt-6">
        <SignalGrid 
          signals={topSignalsMockData.slice(0, 4)} 
          onCardClick={handleCardClick}
        />
      </div>

      {/* Detail View when "See more" is clicked */}
      {showDetailView && (
        <div className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white">
              {selectedSignal?.asset} - {selectedSignal?.action} Signal
            </h2>
          </div>
          <SignalGrid 
            signals={topSignalsMockData.filter(signal => 
              signal.action === selectedSignal?.action || 
              signal.asset === selectedSignal?.asset
            )} 
            onCardClick={handleCardClick}
          />
        </div>
      )}

      {/* Table View for Desktop when detail view is not shown */}
      {!showDetailView && (
        <div className="hidden md:block overflow-x-auto mt-6">
          {isLoading ? (
            <Table>
              <TableHeader className="bg-[#0B1739] border-none">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
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
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index} className="hover:bg-[#212d4e] py-2">
                    {Array.from({ length: 8 }).map((_, cellIndex) => (
                      <TableCell key={cellIndex} className="text-xs cursor-pointer font-nunito py-2">
                        <SkeletonLoading />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Table className="">
              <TableHeader className="bg-[#0B1739]">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
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

              <>
                {rows?.length > 0 && (
                  <TableBody className="px-5 md:px-8 lg:px-16">
                    {table.getRowModel().rows.map((row, rowIndex) => (
                      <TableRow
                        className={`hover:bg-[#212d4e]`}
                        key={row.id}
                      >
                        {row.getVisibleCells().map((cell, idx) => (
                          <TableCell
                            className={`text-xs text-white cursor-pointer font-nunito py-5 border-opacity-50 border-y-[#E2E8F0] ${
                              row.getVisibleCells().length - 1 === idx
                                ? "border-y-[0.3px] border-[#E2E8F0]"
                                : "border-y-[0.3px]"
                            }`}
                            key={cell.id}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </>
            </Table>
          )}

          {/* Pagination Controls */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="flex items-center space-x-2">
              <Button
                className="gap-2 border-[#C4C4C4]/50"
                disabled={!table.getCanPreviousPage()}
                variant="outlined"
                onClick={() => table.previousPage()}
              >
                <svg
                  fill="none"
                  height={12}
                  viewBox="0 0 12 12"
                  width={12}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M1.478 3.643a3.333 3.333 0 0 0-.126 4.582l.126.132L4.91 11.59a.833.833 0 0 0 1.247-1.1l-.069-.079L2.656 7.18a1.667 1.667 0 0 1-.097-2.251l.097-.106L6.09 1.59A.833.833 0 0 0 4.99.342l-.078.07-3.433 3.231Z"
                    fill="#111C38"
                    fillRule="evenodd"
                  />
                  <path
                    clipRule="evenodd"
                    d="M6.478 3.643a3.333 3.333 0 0 0-.126 4.582l.126.132L9.91 11.59a.833.833 0 0 0 1.248-1.1l-.07-.079L7.656 7.18a1.667 1.667 0 0 1-.097-2.251l.097-.106L11.09 1.59A.833.833 0 0 0 9.99.342l-.078.07-3.433 3.231Z"
                    fill="#B8BBC3"
                    fillRule="evenodd"
                  />
                </svg>
              </Button>
              
              {/* Page Number Buttons */}
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
                  const pageIndex = i;
                  const isCurrentPage = pageIndex === table.getState().pagination.pageIndex;
                  
                  return (
                    <Button
                      key={i}
                      className={`w-8 h-8 p-0 ${isCurrentPage ? 'bg-[#4453DD] text-white' : 'bg-transparent text-white'}`}
                      variant={isCurrentPage ? "default" : "light"}
                      onClick={() => table.setPageIndex(pageIndex)}
                    >
                      {pageIndex + 1}
                    </Button>
                  );
                })}
                
                {table.getPageCount() > 5 && (
                  <span className="flex items-center justify-center text-white">...</span>
                )}
              </div>
              
              <Button
                className="gap-2 border-[#C4C4C4]/50"
                disabled={!table.getCanNextPage()}
                variant="outlined"
                onClick={() => table.nextPage()}
              >
                <svg
                  fill="none"
                  height={12}
                  viewBox="0 0 12 12"
                  width={12}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M10.522 3.643a3.334 3.334 0 0 1 .126 4.582l-.126.132L7.09 11.59a.833.833 0 0 1-1.247-1.1l.069-.079L9.344 7.18a1.667 1.667 0 0 0 .097-2.251l-.097-.106L5.91 1.59A.833.833 0 0 1 7.01.342l.078.07 3.433 3.231Z"
                    fill="#111C38"
                    fillRule="evenodd"
                  />
                  <path
                    clipRule="evenodd"
                    d="M5.522 3.643a3.333 3.333 0 0 1 .126 4.582l-.126.132L2.09 11.59a.833.833 0 0 1-1.247-1.1l.069-.079L4.344 7.18a1.667 1.667 0 0 0 .097-2.251l-.097-.106L.91 1.59A.833.833 0 0 1 2.01.342l.078.07 3.433 3.231Z"
                    fill="#B8BBC3"
                    fillRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      )}

     
    </div>
  );
};

export default TopSignal;
