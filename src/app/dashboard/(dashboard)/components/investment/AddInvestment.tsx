'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogBody, ErrorModal } from '@/components/core';
import { Button } from '@/components/core/Button';
import CloseIcon from '@/app/icons/CloseIcon';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetAssetList } from '@/app/dashboard/misc/api/investment/fetchAssetList';
import { SmallSpinner } from '@/icons/core';
import { useCalculateRoi } from '@/app/dashboard/misc/api/investment/calculateInvestmentReturn';
import { useErrorModalState } from '@/hooks';
import {  convertKebabAndSnakeToTitleCase, formatAxiosErrorMessage } from '@/utils';
import { AxiosError } from 'axios';
import { addCommasToNumber } from '@/utils/numbers';
import { useAddInvestment } from '@/app/dashboard/misc/api/investment/addInvestment';
import toast from 'react-hot-toast';

// Investment schema - you'll need to create this
const investmentSchema = z.object({
  investment_type: z.string().min(1, 'Please select an investment type'),
  asset_id: z.string().min(1, 'Please select an asset'),
  amount: z.string().min(1, 'Amount is required'),
  duration: z.string().min(1, 'Please select a duration'),
  title: z.string().min(1, 'Title is require'),
  payment_method: z.string().min(1, 'Please select a payment method'),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

type InvestmentFormValues = z.infer<typeof investmentSchema>;

interface AddInvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletBalance: string;
}

const AddInvestmentModal: React.FC<AddInvestmentModalProps> = ({
  isOpen,
  onClose,
  
}) => {
     const {
          isErrorModalOpen,
          setErrorModalState,
          openErrorModalWithMessage,
          errorModalMessage,
        } = useErrorModalState();
    const {data:assetList,isLoading:isLoadingAsset}=useGetAssetList()
    const {mutate:handleCalculate,isLoading:isCalculatingRoi}=useCalculateRoi()
    const {mutate:handleInvestment,isLoading:isInvesting}=useAddInvestment()
    
  const [returnOnInvestment, setReturnOnInvestment] = useState('0');

  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
    reset
  } = useForm<InvestmentFormValues>({
    resolver: zodResolver(investmentSchema),
    defaultValues: {
      investment_type: '',
      asset_id: '',
      amount: '',
      duration: '',
      payment_method: '',
      agreeToTerms: false,
    },
    mode: 'onChange',
  });

  const watchedAmount = watch('amount');
  const watchedAssetId = watch('asset_id');

  const onSubmit = ({amount,asset_id,title,duration,investment_type,payment_method}: InvestmentFormValues) => {
  handleInvestment({
    amount:Number(amount),asset:String(asset_id),title,duration,investment_type,payment_method

  },{

    onSuccess:()=>{
toast.success("Investment Added Successfully")
        reset();
        onClose();
    },
    onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
         openErrorModalWithMessage(String(errorMessage))
    }
  })
  };
React.useEffect(() => {
  // Skip if amount is empty/null (but allow 0) or assetId is missing
  if ((watchedAmount === undefined || watchedAmount === null || watchedAmount === '') || !watchedAssetId) {
    return;
  }

  const numericAmount = watchedAmount.toString().replace(/[^0-9.]/g, ''); // Keep decimals
  if (!numericAmount) return;

  handleCalculate(
    {
      amount: numericAmount,
      asset_id: Number(watchedAssetId)
    },
    {
      onSuccess: (data) => {
        if (data) {
          setReturnOnInvestment(`${addCommasToNumber(Number(data.roi))}`);
        }
      },
      onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(String(errorMessage));
      },
    }
  );
}, [watchedAmount, watchedAssetId]);



const durationArray =  ["THREE_MONTHS", "SIX_MONTHS"]
  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-[#0A0B1A] border-[#4649E5] rounded-[1rem] border-[0.5px] p-0 max-w-md w-full mx-4">
        <DialogBody className="p-6 py-[2.625rem]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-lg font-medium">Add Investment</h2>
            <Button 
              onClick={onClose}
              className="bg-transparent p-0 border-none text-white hover:text-gray-300 transition-colors"
            >
              <CloseIcon/>
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="max-h-[65vh] space-y-4 overflow-y-auto">

                       <div>
              <label className="block text-white text-sm mb-3 font-medium">Title</label>
              <input
                {...register('title')}
                type="text"
                placeholder="Enter Investment title"
                className={`w-full bg-[#0A0B1A] border-[0.5px] ${errors.title ? 'border-red-500' : 'border-[#333]'} rounded-lg px-4 h-[50px] text-white placeholder-gray-400 text-sm`}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
              )}
            </div>
            {/* Select Investment Type */}
            <div>
              <label className="block text-white text-sm mb-3 font-medium">Select Investment Type</label>
              <div className="relative">
                <Controller
                  name="investment_type"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className={`w-full bg-[#0A0B1A] border-[0.5px] ${errors.investment_type ? 'border-red-500' : 'border-[#333]'} rounded-lg px-4 h-[50px] text-white appearance-none text-sm`}
                    >
                      <option value="" className="text-gray-400">Select investment type</option>
                      <option value="TRADING">Trading</option>
                      <option value="ONLENDING">Onleanding</option>
                   
                    </select>
                  )}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              {errors.investment_type && (
                <p className="text-red-500 text-xs mt-1">{errors.investment_type.message}</p>
              )}
            </div>

            {/* Select Asset */}
            <div>
              <label className="block text-white text-sm mb-3 font-medium">Select Asset</label>
              <div className="relative">
                <Controller
                  name="asset_id"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className={`w-full bg-[#0A0B1A] border-[0.5px] ${errors.asset_id ? 'border-red-500' : 'border-[#333]'} rounded-lg px-4 h-[50px] text-white appearance-none text-sm`}
                    >
                      <option value="" className="text-gray-400">Select asset</option>
                    {isLoadingAsset?<div className='flex justify-center items-center'><SmallSpinner color='White'/></div>:
                        assetList?.map((asset)=>(
                            <option value={asset?.asset_id} key={asset?.asset_id} className="text-gray-400">{convertKebabAndSnakeToTitleCase(asset?.asset_name)}</option>

                        ))
                    }
                    </select>
                  )}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              {errors.asset_id && (
                <p className="text-red-500 text-xs mt-1">{errors.asset_id.message}</p>
              )}
            </div>

            {/* Amount to Invest */}
            <div>
              <label className="block text-white text-sm mb-3 font-medium">Amount to Invest</label>
              <input
                {...register('amount')}
                type="text"
                placeholder="₦12,000"
                className={`w-full bg-[#0A0B1A] border-[0.5px] ${errors.amount ? 'border-red-500' : 'border-[#333]'} rounded-lg px-4 h-[50px] text-white placeholder-gray-400 text-sm`}
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
              )}
            </div>

            {/* Duration */}
            <div>
              <label className="block text-white text-sm mb-3 font-medium">Duration</label>
             <div className="relative">
  <Controller
    name="duration"
    control={control}
    render={({ field }) => (
      <select
        {...field}
        className={`w-full bg-[#0A0B1A] border-[0.5px] ${
          errors.duration ? 'border-red-500' : 'border-[#333]'
        } rounded-lg px-4 h-[50px] text-white appearance-none text-sm`}
      >
        <option value="" disabled hidden>
          Select duration
        </option>
        {durationArray?.map((durx: string | number, idx: number) => (
          <option key={idx} value={durx}>
            {convertKebabAndSnakeToTitleCase(String(durx))}
          </option>
        ))}
      </select>
    )}
  />
  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
    <svg
      className="w-4 h-4 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      ></path>
    </svg>
  </div>
</div>

              {errors.duration && (
                <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>
              )}
            </div>

            {/* Return on Investment Display */}
            <div className="bg-[#0A0B1A] border-[0.5px] border-[#333] rounded-lg px-4 py-4">
              <div className="flex justify-between items-center">
                <span className="text-white text-sm">Return on Investment:</span>
                <div className="text-white text-lg font-medium"> {isCalculatingRoi? <SmallSpinner color='#fff'/>: "₦"+returnOnInvestment}</div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-white text-sm mb-3 font-medium">Payment Method</label>
              <div className="relative">
                <Controller
                  name="payment_method"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className={`w-full bg-[#0A0B1A] border-[0.5px] ${errors.payment_method ? 'border-red-500' : 'border-[#333]'} rounded-lg px-4 h-[50px] text-white appearance-none text-sm`}
                    >
                      <option value="">Select Payment method</option>
                      <option value="NAIRA_WALLET" className="text-gray-400">Naira Wallet</option>
                      
                    </select>
                  )}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              {errors.payment_method && (
                <p className="text-red-500 text-xs mt-1">{errors.payment_method.message}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <Controller
                name="agreeToTerms"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                    className="w-4 h-4 mt-1 text-blue-600 bg-transparent border-[0.5px] border-[#333] rounded focus:ring-blue-500 focus:ring-2"
                  />
                )}
              />
              <label className="text-white text-sm">
                I agree to the terms and condition
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-xs">{errors.agreeToTerms.message}</p>
            )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button 
                type="submit"
                className="w-full bg-white flex justify-center items-center gap-x-3 text-[#2B3AA6] text-sm h-[50px] hover:bg-gray-100 font-medium rounded-lg"
                disabled={!isValid}
              >
                Invest Now {isInvesting ? <SmallSpinner color='blue'/>:""}
              </Button>
              
              <Button 
                type="button"
                onClick={onClose}
                className="w-full bg-transparent border-[0.5px] border-[#333] text-white text-sm h-[50px] hover:bg-[#1a1b2e] font-medium rounded-lg"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogBody>
      </DialogContent>
      <ErrorModal
              isErrorModalOpen={isErrorModalOpen}
              setErrorModalState={() => {
                setErrorModalState(false);
              }}
              subheading={
                errorModalMessage || "Please check your inputs and try again."
              }
            ></ErrorModal>
    </Dialog>
  );
};

export default AddInvestmentModal;