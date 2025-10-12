import React, { useEffect, useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogBody, ErrorModal, Button } from '@/components/core';
import { useErrorModalState } from '@/hooks';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SmallSpinner } from '@/icons/core';
import { depositResult, useMakeDeposit } from '@/app/dashboard/misc/api/payment/depositAmount';
import { addCommasToNumber, formatAxiosErrorMessage } from '@/utils';
import { AxiosError } from 'axios';

interface depositProp {
  isOpen: boolean;
  onClose: () => void;
}

const depositSchema = z.object({
  deposit_amount: z.string().min(1, { message: "Enter Deposit amount" }),
  dollar_rate: z.string().optional()
})

export type depositFormValues = z.infer<typeof depositSchema>;

export default function DepositFundsModal({ isOpen, onClose }: depositProp) {
  const { mutate: handleCoversion, isLoading } = useMakeDeposit()
  const [depositResult, setDepositResult] = useState<depositResult>()
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isValid },
    reset
  } = useForm<depositFormValues>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      deposit_amount: '',
    },
    mode: 'onChange',
  });

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(depositResult?.account_number));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const watchAmount = watch("deposit_amount")
  
  useEffect(() => {
    if (watchAmount) {
      handleCoversion({
        deposit_amount: Number(watchAmount)
      }, {
        onSuccess: (data) => {
          if (data) {
            setValue("dollar_rate", String(`$${addCommasToNumber(data?.dollar_amount)}`))
            setDepositResult(data)
          }
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
        },
      })
    }
  }, [watchAmount])

  const onSubmit = () => {
    // Handle form submission
  }

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-[#0A0B1A] border-[#4649E5] rounded-[1rem] border-[0.5px] p-0 max-w-sm sm:max-w-md w-full mx-2 sm:mx-4">
        <DialogBody className="p-4 sm:p-6 py-6 sm:py-[2.625rem]">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1 pr-4">
              <h1 className="text-white text-xl sm:text-2xl font-semibold mb-2">
                Deposit Funds
              </h1>
       
              {!depositResult || !depositResult?.account_number ? (
  <p className="text-gray-400 text-sm leading-relaxed">Make a deposit to your wallet by making a transfer to the account details below.</p>
) : (
  <p className="text-gray-400 text-sm leading-relaxed">Enter your desired deposit amount below to view the USD equivalent and receive your personalized transfer details.</p>
)}
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1 flex-shrink-0"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Amount Input */}
        <Controller
  name="deposit_amount"
  control={control}
  render={({ field }) => (
    <div>
      <label className="block text-white text-sm mb-3 font-medium">
        Amount 
      </label>
      <input
        {...field}
        type="text"
        placeholder="₦12,000"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          const validNumber = target.value.replace(/[^0-9]/g, "");
          field.onChange(validNumber);
        }}
        onPaste={(e) => {
          e.preventDefault();
          const pastedValue = e.clipboardData.getData("text");
          const sanitizedValue = pastedValue.replace(/[^0-9]/g, "");
          field.onChange(sanitizedValue);
        }}
        className={`w-full bg-[#0A0B1A] border-[0.5px] ${
          errors.deposit_amount ? "border-red-500" : "border-[#333]"
        } rounded-lg px-4 h-[50px] text-white placeholder-gray-400 text-sm`}
      />
     
    </div>
  )}
/>

            {/* Dollar Value - Only show when loading or when depositResult exists */}
            {/* {(isLoading || depositResult?.dollar_amount) && (
              <div>
                {isLoading ? (
                  <div className='flex justify-center items-center py-4'>
                    <SmallSpinner color='#fff' />
                  </div>
                ) : (
                  <>
                    <label className="block text-white text-sm mb-2">Dollar Value</label>
                    <input
                      {...register('dollar_rate')}
                      readOnly
                      type="text"
                      className="w-full bg-[#02010D] border-[0.3px] border-[#696969] rounded-lg px-3 sm:px-4 h-[44px] text-white placeholder-white/30 text-sm sm:text-base"
                    />
                  </>
                )}
              </div>
            )} */}

            {/* Transfer Details - Only show when depositResult is available */}
            {depositResult && depositResult.account_number && (
              <>
                {/* Dashed Divider */}
                <div className="border-t border-dashed border-gray-600 my-6"></div>

                {/* Transfer Details */}
                <div className="bg-[#02010D] border border-white rounded-xl p-4 sm:p-5">
                  <h3 className="text-white text-base sm:text-lg font-medium mb-4">Transfer</h3>
                  
                  <div className="space-y-4">
                    {/* Account Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {depositResult.account_name && (
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Account name</p>
                          <p className="text-white font-medium text-sm sm:text-base break-words">
                            {depositResult.account_name}
                          </p>
                        </div>
                      )}
                      
                      {depositResult.account_number && (
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Account no</p>
                          <div className="flex items-center gap-2">
                            <p className="text-white font-medium text-sm sm:text-base">
                              {depositResult.account_number}
                            </p>
                            <button 
                              type='button'
                              onClick={handleCopy}
                              className="text-gray-400 hover:text-white transition-colors p-1 flex-shrink-0"
                            >
                              {copied ? (
                                <Check size={16} className="text-green-500" />
                              ) : (
                                <Copy size={16} />
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bank Name */}
                    {depositResult.bank_name && (
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Bank name</p>
                        <p className="text-white font-medium text-sm sm:text-base">
                          {depositResult.bank_name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Button - Only show when transfer details are available */}
                <Button 
                  type='submit'
                  className="w-full bg-white text-[#2B3AA6] text-sm h-[44px] hover:bg-gray-100 font-medium py-3 rounded-lg transition-colors"
               onClick={()=>onClose()}
               >
                  I have made payment
                </Button>
              </>
            )}
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
      />
    </Dialog>
  );
}