import { createWidthrawalPin } from "@/app/schema/SignupValidation";
import React, { SetStateAction } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PinInput from "react-pin-input";
import { Button, ErrorModal, LinkButton } from "@/components/core";

import useIsMobile from "@/hooks/UseMobile";
import { useSetWidthrawalPin } from "../../api/sign-up/setWidthrawalPin";
import { useErrorModalState } from "@/hooks";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useQueryClient } from "react-query";

interface prop {
   email: string
  phone_number: string;
  onNext: (value: SetStateAction<number>) => void;
  onPrev: (value: SetStateAction<number>) => void;
   openFrom?:"onboarding"| "dashboard"
}

export type UserWidrawalDetailsValue = z.infer<typeof createWidthrawalPin>;

const CreateWidthralPin = ({ onNext, phone_number,email,openFrom="onboarding" }: prop) => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const { mutate: handleSetpin } = useSetWidthrawalPin();
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

  const queryClient = useQueryClient()
  const onSubmit = ({ pin }: UserWidrawalDetailsValue) => {
    if (isValid) {
      handleSetpin(
        {
          email,
          phone_number,
          pin,
        },
        {
          onSuccess: () => {
            onNext(6); // Move to next step only on success
            queryClient.invalidateQueries({queryKey:["user-details"]})
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
    <div className={`text-white relative border-[.0187rem] w-full border-[#4649E5] ${openFrom==="onboarding"?"px-6  py-6 xl:py-[4.5rem] md:px-[50px] 2xl:px-[6.1875rem]":"px-6 py-[3.5rem]"} rounded-[1.25rem] `}>
      <div className="">
        <h2 className="text-white font-verdana font-bold text-[1.25rem] xl:text-[1.75rem]">
          Withdrawal Pin
        </h2>
        <p className="font-outfit max-xxscren:text-xs text-sm xl:text-base text-white text-opacity-70 max-w-[250px] lg:max-w-[380px] font-light">
          Create your unique pin for withdrawal.
        </p>
        {openFrom==="onboarding"&&<div className="absolute max-xxscren:right-3 right-10 xl:right-16 top-14">
          <p className="font-outfit font-semibold text-white text-xs xl:text-base">
            5/6
          </p>
        </div>}
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
                     width: isMobile ? "2.2rem" : openFrom==="onboarding"?"3.3rem":"3rem",
                    height: isMobile ? "2.2rem" : openFrom==="onboarding"?"3.3rem":"3rem",
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
        <div className="mt-[4.5rem] w-full flex flex-col pb-[2.75rem]">
          <Button
            className="w-full bg-white text-[#2B3AA6] h-11 rounded-10 font-outfit text-sm "
            type="submit"
          >
            Create
          </Button>
          {openFrom==="onboarding"&&<LinkButton
            className="w-full border-[0.5px] border-[#FFFFFF] font-extralight mt-6 text-white h-11 rounded-10 font-outfit text-sm "
            href={"/"}
            variant={"outlined"}
          >
            Skip
          </LinkButton>}
        </div>
      </form>

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={
          errorModalMessage || "Please check your inputs and try again."
        }
      ></ErrorModal>
    </div>
  );
};

export default CreateWidthralPin;
