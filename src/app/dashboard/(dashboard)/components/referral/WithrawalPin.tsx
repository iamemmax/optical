import { createWidthrawalPin } from "@/app/schema/SignupValidation";
import React, { SetStateAction } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PinInput from "react-pin-input";
// import { Button, ErrorModal, LinkButton } from "@/components/core";
import { Dialog,Button, DialogContent, DialogBody, ErrorModal ,LinkButton} from '@/components/core';

import useIsMobile from "@/hooks/UseMobile";
import { useErrorModalState } from "@/hooks";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useQueryClient } from "react-query";
import { useSetWidthrawalPin } from "@/app/(auth)/(onboarding)/api/sign-up/setWidthrawalPin";
import { useMakeWithdrawal } from "@/app/dashboard/misc/api/payment/makeWithdrawal";
import toast from "react-hot-toast";
import { SmallSpinner } from "@/icons/core";

interface prop {
   isOpen: boolean;
  onClose: () => void;
  closeAll: () => void;
  withdrawalPayload: {
    bank_code: string;
    account_number: string;
    account_name: string;
    amount: string;
    narration?: string | undefined;
}
}

export type UserWidrawalDetailsValue = z.infer<typeof createWidthrawalPin>;

const WidthrawalPinModal = ({ isOpen,onClose ,withdrawalPayload,closeAll}: prop) => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<UserWidrawalDetailsValue>({
    resolver: zodResolver(createWidthrawalPin),
    defaultValues: {
      pin: "",
    },
    mode: "onChange",
  });

  const {mutate:handleWithrawal, isLoading} = useMakeWithdrawal()
  const queryClient = useQueryClient()
  const onSubmit = ({ pin }: UserWidrawalDetailsValue) => {
    if (isValid) {
      handleWithrawal(
        {
          account_number:withdrawalPayload?.account_number,
          amount:Number(withdrawalPayload?.amount),
          bank_code:withdrawalPayload?.bank_code,
          narration:String(withdrawalPayload?.narration),
          withdrawal_pin:pin

        },
        {
          onSuccess: (data) => {
           toast.success("Withdrawal Successful")
           queryClient.invalidateQueries({queryKey:["user-details"]})
           onClose()
           closeAll()
          },
          onError: (error) => {
            const errorMessage = formatAxiosErrorMessage(error as AxiosError);
            openErrorModalWithMessage(String(errorMessage));
          },
        }
      );
    }
  };

  // mobile responsiveness
  const isMobile = useIsMobile();
  const handleComplete = (pin: string) => {
    setValue("pin", pin);
  };
  return (
   <Dialog open={isOpen}>
        <DialogContent className="bg-[#02010D] border-[#4649E5] rounded-[1rem] border-[0.5px] p-0 max-w-md w-full">
          <DialogBody className="p-6 py-[2.625rem]">
  
<div className="">
       <h2 className="text-white text-lg font-outfit font-medium">Enter Withdraw Pin</h2>
</div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[22.5rem]">
        <div className="mt-[2.625rem] w-full">
          <div className="mt-3 w-full ">
            <Controller
              name="pin"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <PinInput
                  {...field}
                  autoSelect={false}
                  initialValue=""
                  inputFocusStyle={{
                    border: "3px solid #02010D",
                    outline: "none",
                    background: "#fff",
                    color: "black",
                    boxShadow: "0 0 0 0.5px #fff, 0 0 0 1.8px #fff",
                  }}
                  inputMode="number"
                  inputStyle={{
                    background: "#F5F7F9CC",
                    borderRadius: "10px",
                    border: "transparent",
                    fontSize: isMobile ? "0.75rem" : "0.875rem",
                    transition: "all 0.45s ease-in-out",
                     width: isMobile ? "2.2rem" :"3rem",
                    height: isMobile ? "2.2rem" :"3rem",
                  }}
                  length={6}
                  style={{
                    display: "flex",
                    color: "black",
                    flexWrap: "nowrap",
                    gap: isMobile ? "0.4rem" : "1rem",
                    margin: "auto",
                  }}
                  type="numeric"
                  secret
                  onComplete={handleComplete}
                />
              )}
            />
          </div>

          {/* <Countdown onTimeUp={handleTimeUp} reset={resetTimer} /> */}
        </div>
        <div className="mt-[4.5rem] w-full flex flex-col ">
          <Button
            className="w-full bg-white text-[#2B3AA6] flex items-center gap-x-3 h-11 rounded-10 font-outfit text-sm "
            type="submit"
          >
            Withdraw {isLoading&&<SmallSpinner color="blue"/>}
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

export default WidthrawalPinModal;
