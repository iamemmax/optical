'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogBody } from '@/components/core';
import { Button } from '@/components/core/Button';
import CloseIcon from '@/app/icons/CloseIcon';
import EyeIcon from '@/app/icons/EyeIcon';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { withdrawalSchema } from '@/app/schema/WithdrawalSchema';



type WithdrawalFormValues = z.infer<typeof withdrawalSchema>;

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletBalance: string;
}

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({
  isOpen,
  onClose,
  walletBalance,
}) => {
  const [showBalance, setShowBalance] = useState(true);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset
  } = useForm<WithdrawalFormValues>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      bank: 'Zenith Bank',
      accountNumber: '',
      accountName: '',
      amount: '',
      narration: '',
    },
    mode: 'onChange',
  });

  const toggleShowBalance = () => {
    setShowBalance(!showBalance);
  };

  const onSubmit = (data: WithdrawalFormValues) => {
    console.log('Form submitted:', data);
    // Here you would typically make an API call
    
    // Reset form and close modal
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-[#02010D] border-[#4649E5] rounded-[1rem] border-[0.5px] p-0 max-w-md w-full">
        <DialogBody className="p-6 py-[2.625rem]">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-white text-lg font-outfit font-medium">Withdraw Funds</h2>
            <Button 
              onClick={onClose}
              className="bg-transparent p-0 border-none transition-colors"
            >
             <CloseIcon/>
            </Button>
          </div>
          <p className="text-white/70 text-sm mb-6 max-w-[18.4375rem]">
            Withdraw funds from your referral wallet to your preferred account.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Wallet Balance */}
            <div className="mb-6 border-[.0313rem] border-[#696969] bg-[#02010D] rounded-10 py-4 px-6">
              <label className="block text-white/80 font-outfit text-xs mb-1">Wallet Balance</label>
              <div className="relative">
                <div className='flex items-center gap-x-[2.625rem]'>
                  {showBalance ? (
                    <span className="text-xl text-white font-semibold">₦{walletBalance}</span>
                  ) : (
                    <span className="text-xl text-white font-bold">••••••••••</span>
                  )}
                  <Button 
                    type="button"
                    className="text-white/70 hover:text-white"
                    onClick={toggleShowBalance}
                  >
                    <EyeIcon/>
                  </Button>
                </div>
              </div>
            </div>

            {/* Select Bank */}
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">Select Bank</label>
              <div className="relative">
                <Controller
                  name="bank"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className={`w-full bg-[#02010D] border-[0.3px] ${errors.bank ? 'border-red-500' : 'border-[#696969]'} rounded-lg px-4 h-[44px] text-white appearance-none`}
                    >
                      <option value="Zenith Bank">Zenith Bank</option>
                      <option value="GTBank">GTBank</option>
                      <option value="First Bank">First Bank</option>
                      <option value="Access Bank">Access Bank</option>
                      <option value="UBA">UBA</option>
                    </select>
                  )}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              {errors.bank && (
                <p className="text-red-500 text-xs mt-1">{errors.bank.message}</p>
              )}
            </div>

            {/* Account Number */}
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">Account Number</label>
              <input
                {...register('accountNumber')}
                type="text"
                placeholder="1096386723"
                className={`w-full bg-[#02010D] border-[0.3px] ${errors.accountNumber ? 'border-red-500' : 'border-[#696969]'} rounded-lg px-4 h-[44px] text-white placeholder-white/30`}
              />
              {errors.accountNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.accountNumber.message}</p>
              )}
            </div>

            {/* Account Name */}
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">Account Name</label>
              <input
                {...register('accountName')}
                type="text"
                placeholder=""
                className={`w-full bg-[#02010D] border-[0.3px] ${errors.accountName ? 'border-red-500' : 'border-[#696969]'} rounded-lg px-4 h-[44px] text-white placeholder-white/30`}
              />
              {errors.accountName && (
                <p className="text-red-500 text-xs mt-1">{errors.accountName.message}</p>
              )}
            </div>

            {/* Amount */}
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">Amount</label>
              <input
                {...register('amount')}
                type="text"
                className={`w-full bg-[#02010D] border-[0.3px] ${errors.amount ? 'border-red-500' : 'border-[#696969]'} rounded-lg px-4 h-[44px] text-white placeholder-white/30`}
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
              )}
            </div>

            {/* Narration */}
            <div className="mb-12">
              <label className="block text-white text-sm mb-2">Narration</label>
              <textarea
                {...register('narration')}
                rows={3}
                className="w-full bg-[#02010D] border-[0.3px] border-[#696969] rounded-lg px-4 text-white placeholder-white/30 resize-none"
              />
            </div>

            {/* Continue Button */}
            <Button 
              type="submit"
              className="w-full bg-white text-[#2B3AA6] text-sm h-[40px] hover:bg-gray-100 font-medium py-3 rounded-lg"
              // disabled={!isValid}
            >
              Continue
            </Button>
          </form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawalModal;

