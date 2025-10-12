'use client';

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogBody, ErrorModal } from '@/components/core';
import { Button } from '@/components/core/Button';
import CloseIcon from '@/app/icons/CloseIcon';
import EyeIcon from '@/app/icons/EyeIcon';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { withdrawalSchema } from '@/app/schema/WithdrawalSchema';
import { useFetchBankList } from '@/app/dashboard/misc/api/payment/fetchBankList';
import { useFetchAccountName } from '@/app/dashboard/misc/api/payment/getBankAccountName';
import { useErrorModalState } from '@/hooks';
import { formatAxiosErrorMessage } from '@/utils';
import { AxiosError } from 'axios';
import Select from "react-select";
import { OptionType, selectStyle, selectStyle2 } from '@/utils/selectStyles';
import { SmallSpinner } from '@/icons/core';
import WidthrawalPinModal from './WithrawalPin';



export type WithdrawalFormValues = z.infer<typeof withdrawalSchema>;

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
  const [showWithdrawalPinModal, setShowWithdrawalPinModal] = useState(false)
  const [withdrawalPayload, setWithdrawalPayload] = useState<WithdrawalFormValues>({ account_name: "", account_number: "", amount: "", bank_code: "", narration: "" })
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const { data, isLoading } = useFetchBankList()
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isValid },
    reset
  } = useForm<WithdrawalFormValues>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      bank_code: '',
      account_number: '',
      account_name: '',
      amount: '',
      narration: '',
    },
    mode: 'onChange',
  });

  const toggleShowBalance = () => {
    setShowBalance(!showBalance);
  };

  // useEffect(() => {
  //   if(isError)
  // }, [isError])

  const watchAcctNo = watch("account_number")
  const bankCode = watch("bank_code")

  const { mutate: handleFetchAccountName, isLoading: isLoadingAcctName } = useFetchAccountName()
  const onSubmit = ({ account_name, account_number, amount, bank_code, narration }: WithdrawalFormValues) => {
    setWithdrawalPayload({
      account_name, account_number, amount, bank_code, narration
    })
    setShowWithdrawalPinModal(true)
  };


  useEffect(() => {
    if (bankCode && watchAcctNo?.length === 10) {
      handleFetchAccountName({
        account_number: watchAcctNo,
        bank_code: bankCode
      }, {
        onSuccess: (data) => {
          if (data) {
            setValue("account_name", data?.data?.account_name)
          }
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
        },
      })
    }
  }, [watchAcctNo, bankCode])

  const bankList = data?.banks_list?.map((bank) => {
    return {
      id: bank?.id,
      label: bank?.name,
      value: bank?.code
    }
  })


  return (
    <>
      <Dialog open={isOpen}>
        <DialogContent className="bg-[#02010D] border-[#4649E5] rounded-[1rem] border-[0.5px] p-0 max-w-md w-full">
          <DialogBody className="p-6 py-[2.625rem]">
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-white text-lg font-outfit font-medium">Withdraw Funds</h2>
              <Button
                onClick={onClose}
                className="bg-transparent p-0 border-none transition-colors"
              >
                <CloseIcon />
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
                      <EyeIcon />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Select Bank */}
              <div className="mb-4">
                <label className="block text-white text-sm mb-2">Select Bank</label>
                <div className="relative">
                  <Controller
                    name="bank_code"
                    control={control}
                    render={({ field }) => (
                      <Select
                        className="w-full !h-[45px] rounded-lg capitalize"
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                        value={bankList?.find(option => option.value === field.value) || null}
                        options={bankList}
                        styles={selectStyle2}
                        isSearchable={true}
                        isLoading={isLoading}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption?.value || ''); // Update form field
                          // handleOption(selectedOption); // Your custom handler
                        }}
                        placeholder="Select a bank..."
                      />
                    )}
                  />
                  {errors.bank_code && (
                    <p className="text-red-500 text-xs mt-1">{errors.bank_code.message}</p>
                  )}
                </div>
              </div>

              {/* Account Number */}
        

<Controller
  name="account_number"
  control={control}
  render={({ field }) => (
    <div>
      <label className="block text-white text-sm mb-4 font-medium">
      Account Number
      </label>
      <input
        {...field}
        type="text"
        placeholder="1096386723"
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
        className={`w-full bg-transparent border-[0.5px] ${
          errors.account_number ? "border-red-500" : "border-[#333]"
        } rounded-lg px-4 h-[45px] text-white placeholder-gray-400 text-sm`}
      />
      {errors.account_number && (
        <p className="text-red-500 text-xs mt-1">
          {errors.account_number.message}
        </p>
      )}
    </div>
  )}
/>


              {/* Account Name */}
              <div className="mb-4 mt-2">
                {isLoadingAcctName ? <div className='flex justify-center items-center py-2'><SmallSpinner color='#fff' /></div> : <>
                  <label className="block text-white text-sm mb-2">Account Name</label>
                  <input
                    {...register('account_name')}
                    readOnly
                    type="text"
                    placeholder=""
                    className={`w-full bg-[#02010D] border-[0.3px] ${errors.account_name ? 'border-red-500' : 'border-[#696969]'} rounded-lg px-4 h-[44px] text-white placeholder-white/30`}
                  />
                  {errors.account_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.account_name.message}</p>
                  )}
                </>}
              </div>


              {/* Amount */}
              <div className="mb-4">
                <Controller
  name="amount"
  control={control}
  render={({ field }) => (
    <div>
      <label className="block text-white text-sm mb-3 font-medium">
      Amount
      </label>
      <input
        {...field}
        type="text"
        placeholder="amount"
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
        className={`w-full bg-transparent border-[0.5px] ${
          errors.amount ? "border-red-500" : "border-[#333]"
        } rounded-lg px-4 h-[45px] text-white placeholder-gray-400 text-sm`}
      />
      {errors.amount && (
        <p className="text-red-500 text-xs mt-1">
          {errors.amount.message}
        </p>
      )}
    </div>
  )}
/>
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

      {
        showWithdrawalPinModal && <WidthrawalPinModal isOpen={showWithdrawalPinModal} closeAll={onClose} onClose={() => setShowWithdrawalPinModal(false)} withdrawalPayload={withdrawalPayload} />
      }
    </>
  );
};

export default WithdrawalModal;

