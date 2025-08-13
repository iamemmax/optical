"use client";
import DebounceInput from "@/app/(main)/components/util/DebounceInput";
import FIlterIcon from "@/app/icons/(dashboard)/FilterIcon";
import {
  Button,
  LinkButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/core";
import {
  PaginationState,
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { SkeletonLoading } from "../referral/ReferalTable";
import { convertKebabAndSnakeToTitleCase } from "@/utils/strings";
import { addCommasToNumber } from "@/utils";
import { useInvestmentDashboardOnleandingTable } from "@/app/dashboard/misc/api/investment/onlending/fetchInvestmentOnleandingtable";
import OnlendingInvestmentChart from "./OnlendingInvestmentChart";

interface investmentProp {
  id?: number;
  asset: string;
  start_date: string;
  amount: string;
  expected_returns: string;
  duration: string;
  status: string;
  action?: string;
}

const OnleandingInvestment = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {data: investmentData, isLoading: isLoadingInvestmentTable} = useInvestmentDashboardOnleandingTable()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return " text-[#16FFC7] border-[#16FFC7]";
      case "Completed":
        return " text-[#407BFF] border-[#407BFF]";
      case "Pending":
        return " text-[#FF9900] border-[#FF9900]";
      case "Cancelled":
        return " text-[#FF1515] border-[#FF1515]";
      default:
        return " text-slate-400 border-slate-500/30";
    }
  };

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columnHelper = createColumnHelper<investmentProp>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("asset", {
        header: () => "Asset",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("start_date", {
        header: () => "Date Started",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("amount", {
        header: () => "Amount Invested",
        cell: (info) => `₦${addCommasToNumber(Number(info.getValue()))}`,
      }),
      columnHelper.accessor("expected_returns", {
        header: () => "Return on Investment",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("duration", {
        header: () => "Duration",
        cell: (info) => convertKebabAndSnakeToTitleCase(info.getValue()),
      }),
      columnHelper.accessor("status", {
        header: () => "Status",
        cell: (info) => (
          <div
            className={` max-w-[100px] flex justify-center items-center py-[.5625rem] text-sm font-medium bg-transparent rounded-lg border-[0.3px] ${getStatusColor(convertKebabAndSnakeToTitleCase(info.getValue()))}`}
          >
            {convertKebabAndSnakeToTitleCase(info.getValue())}
          </div>
        ),
      }),
      columnHelper.accessor("action", {
        header: () => "Action",
        cell: (info) => (
          <div className="">
            <LinkButton
              href={`/dashboard/investment/${info?.row?.original?.id}/asset-details`}
              className="text-white px-6 py-3 border-white border-[0.3px] border-opacity-50"
              variant="outlined"
            >
              View Details
            </LinkButton>
          </div>
        ),
      }),
    ],
    []
  );

  // Fix: Use investmentData?.results directly and add dependency
  const tableData = useMemo(() => investmentData?.results ?? [], [investmentData?.results]);

  const table = useReactTable({
    data: tableData, // Use the memoized data
    columns,
    state: {
      globalFilter: searchTerm,
      pagination,
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setSearchTerm,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // Fix: Correct the pageCount calculation
    pageCount: investmentData?.count ? Math.ceil(investmentData.count / pagination.pageSize) : -1,
  });

  // Remove the unused rows variable that was causing issues
  // const rows = useMemo(() => investmentData?.results, []); // This had empty dependency array!

  return (
    <div className="px-8 py-6 bg-[#090E29] h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-white font-bold font-verdana text-base">
            Investment Table
          </h2>
          <div className="relative">
            <DebounceInput
              onChange={(e) => setSearchTerm(e)}
              value={searchTerm}
              placeHolder="Search a transaction"
              className="bg-transparent"
              containerClassName="border-[0.4px] border-opacity-40 border-white rounded-[10px]"
            />
          </div>
        </div>
        <Button
          variant="outlined"
          className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700"
        >
          <FIlterIcon className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="block overflow-x-auto mt-6">
        {isLoadingInvestmentTable ? (
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
                    <TableCell
                      key={cellIndex}
                      className="text-xs cursor-pointer font-nunito py-2"
                    >
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
                      className="font-nunito  text-sm text-white font-medium"
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

            <TableBody className="px-5 md:px-8 lg:px-16">
              {/* Fix: Use table.getRowModel().rows directly and add proper condition */}
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row, rowIndex) => (
                  <TableRow className={`hover:bg-[#212d4e]`} key={row.id}>
                    {row.getVisibleCells().map((cell, idx) => (
                      <TableCell
                        className={`text-sm text-white cursor-pointer font-nunito py-5 border-opacity-50 border-y-[#E2E8F0] ${
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
                ))
              ) : (
                // Show empty state when no data
                <TableRow>
                  <TableCell 
                    colSpan={columns.length} 
                    className="text-center text-white py-8"
                  >
                    No investment data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}

        {/* Pagination Controls */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="flex items-center space-x-2">
           {investmentData?.previous && <Button
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
            </Button>}

            {/* Page Number Buttons */}
            <div className="flex space-x-1">
              {Array.from(
                { length: Math.min(5, table.getPageCount()) },
                (_, i) => {
                  const pageIndex = i;
                  const isCurrentPage =
                    pageIndex === table.getState().pagination.pageIndex;

                  return (
                    <Button
                      key={i}
                      className={`w-8 h-8 p-0 ${isCurrentPage ? "bg-[#4453DD] text-white" : "bg-transparent text-white"}`}
                      variant={isCurrentPage ? "default" : "light"}
                      onClick={() => table.setPageIndex(pageIndex)}
                    >
                      {pageIndex + 1}
                    </Button>
                  );
                }
              )}

              {table.getPageCount() > 5 && (
                <span className="flex items-center justify-center text-white">
                  ...
                </span>
              )}
            </div>

         {investmentData?.next && <Button
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
            </Button>}
          </div>
        </div>
      </div>

      <OnlendingInvestmentChart />
    </div>
  );
};

export default OnleandingInvestment;