
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useGetTransactionDetails } from '@/app/dashboard/misc/api/transactions/fetchTransactionDetails';
import moment from "moment"
import CloseIcon from '@/app/icons/CloseIcon';
interface TransactionDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  transId:string
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  isOpen,
  onClose,
  transId
}) => {
  if (!isOpen) return null;
  const {data}=useGetTransactionDetails(transId)


  return (
    <div className="fixed inset-0 bg-black bg-opacity-5 flex items-center justify-center z-50 p-4">
      <div className="bg-[#02010D] rounded-2xl border-[0.5px] border-[#4649E5] p-6 max-w-md w-full mx-4 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white text-xl font-medium">Transaction Details</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors p-1"
          >
           <CloseIcon/>
          </button>
        </div>

        {/* Transaction ID and Status */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white text-2xl font-medium tracking-wide">
            {data?.data?.reference_id}
            </h3>
           {data?.data?.status&& <div className="px-4 py-2 rounded-full border border-emerald-500 bg-emerald-500 bg-opacity-10">
              <span className="text-emerald-400 text-sm font-medium">{data?.data?.status}</span>
            </div>}
          </div>
        </div>

        {/* Transaction Details */}
        <div className="space-y-6">
          {/* Asset */}
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-base">Asset</span>
            <span className="text-white text-base font-medium">{data?.data?.asset}</span>
          </div>

          {/* Transaction Type */}
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-base">Transaction type</span>
            <span className="text-white text-base font-medium">{data?.data?.type}</span>
          </div>

          {/* Date & Time */}
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-base">Date & Time</span>
            <span className="text-white text-base font-medium">{moment(data?.data?.date_time)?.format("lll")}</span>
          </div>

          {/* Amount */}
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-base">Amount</span>
            <span className="text-white text-base font-medium">₦{data?.data?.amount}</span>
          </div>

          {/* Duration
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-base">Duration</span>
            <span className="text-white text-base font-medium">30 Days</span>
          </div> */}

          {/* Payment Method */}
          {/* <div className="flex justify-between items-center">
            <span className="text-gray-400 text-base">Payment Method</span>
            <span className="text-white text-base font-medium">Main Wallet</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};



export default TransactionDetails;