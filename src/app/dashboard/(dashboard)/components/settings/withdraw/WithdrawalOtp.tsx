

import { signUpUserOtpSchema } from "@/app/schema/SignupValidation";
import React, {  useState, useEffect } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PinInput from "react-pin-input";
import { Button, ErrorModal } from "@/components/core";

import { useClipboard, useErrorModalState } from "@/hooks";
import useIsMobile from "@/hooks/UseMobile";
import MessageIcon from "@/app/icons/MessageIcon";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { SmallSpinner } from "@/icons/core";
import toast from "react-hot-toast";
import { useVerifyBvnVerification } from "@/app/(auth)/(onboarding)/api/sign-up/verifyBvnOtp";
import { useRequestBvnVerification } from "@/app/(auth)/(onboarding)/api/sign-up/requestBvnVerification";
import { useUser } from "@/app/(auth)/(onboarding)/api/getUserDetails";
import CloseIcon from "@/app/icons/CloseIcon";

interface prop {
 isOpen: boolean;
  onClose: () => void;
  email:string
}

export type UserSignupOtpDetailsValue = z.infer<typeof signUpUserOtpSchema>;

const UserWidthdrawalOtpVerification = ({ isOpen,onClose ,email}: prop) => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  
  // Countdown timer states
  const [countDownTime, setCountDownTime] = useState(300); // 5 minutes in seconds
  const [isCountdownActive, setIsCountdownActive] = useState(true);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const user = useUser()
  const { mutate: handleVerifyOtp, isLoading } = useVerifyBvnVerification();
  const { mutate: handleRequestVerification, isLoading: isResendingOtp } = useRequestBvnVerification();
    
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<UserSignupOtpDetailsValue>({
    resolver: zodResolver(signUpUserOtpSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onChange",
  });

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isCountdownActive && countDownTime > 0) {
      interval = setInterval(() => {
        setCountDownTime((prevTime) => {
          if (prevTime <= 1) {
            setIsCountdownActive(false);
            setCanResendOtp(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isCountdownActive, countDownTime]);

  // Format countdown time as MM:SS
  const formatCountdownTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const onSubmit = ({ otp }: UserSignupOtpDetailsValue) => {
    // if (isValid) {
      handleVerifyOtp(
        {
          email:user?.data?.email as string,
          otp,
        },
        {
          onSuccess: () => {
         
          },
          onError: (error) => {
            const errorMessage = formatAxiosErrorMessage(error as AxiosError);
            openErrorModalWithMessage(String(errorMessage));
          },
        }
      );
    // }
  };

  // mobile responsiveness
  const isMobile = useIsMobile();

  const handleResendOtp = () => {
    if (!canResendOtp || isResendingOtp) return;
    
    handleRequestVerification(
      {
        bvn_number:String(user?.data?.bvn_number),
        email
      },
      {
        onSuccess: () => {
          // Reset countdown timer
          toast.success("Otp send successfully")
          setCountDownTime(300); // Reset to 5 minutes
          setIsCountdownActive(true);
          setCanResendOtp(false);
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
  };
useEffect(() => {

  handleRequestVerification(
      {
        bvn_number:String(user?.data?.bvn_number) ,
       email
      },
      {
        onSuccess: () => {
          // Reset countdown timer
          toast.success("Otp send successfully")
          setCountDownTime(300); // Reset to 5 minutes
          setIsCountdownActive(true);
          setCanResendOtp(false);
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
}, [])

  const handleComplete = (pin: string) => {
    setValue("otp", pin);
  };
   if (!isOpen) return null;

  return (
     <div className="fixed inset-0 bg-black bg-opacity-5 flex items-center justify-center z-50 p-4">
      <div className="bg-[#02010D] rounded-2xl border-[0.5px] border-[#4649E5] p-6   mx-4 relative">
 
      <div className="">
        <h2 className="text-white font-verdana font-bold text-[1.25rem] xl:text-[1.75rem]">
          OTP Verification
        </h2>
        <p className="font-outfit max-xxscren:text-xs text-sm xl:text-base text-white text-opacity-70 max-w-[250px] lg:max-w-[280px] font-light">
          This is to create your operational wallet account
        </p>
        <div className="absolute max-xxscren:right-3 right-10 xl:right-16 top-14">
         <Button className="p-0" onClick={()=>onClose()}><CloseIcon/></Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="mt-[2.625rem]">
          <div className="mt-3 ">
            <Controller
              name="otp"
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
                    background: "#ffffff",
                    borderRadius: "10px",
                    border: "transparent",
                    fontSize: isMobile ? "0.75rem" : "0.875rem",
                    transition: "all 0.45s ease-in-out",
                    width: isMobile ? "2.2rem" : "3.3rem",
                    height: isMobile ? "2.2rem" : "3.3rem",
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

          <div className="flex w-full mt-7 items-end justify-between  max-sm:px-4 sm:max-w-[425px]">
            <div className="text-white text-xs px-2">
              <p className="font-outfit text-xxs font-light">
                {isCountdownActive ? formatCountdownTime(countDownTime) : "00:00"}
              </p>
            </div>
            
            <Button
              type="button"
              className={`flex p-0 items-center gap-[.3125rem] text-[.625rem] ${
                canResendOtp && !isResendingOtp
                  ? "bg-transparent text-white cursor-pointer hover:text-opacity-80"
                  : "bg-transparent text-white text-opacity-50 cursor-not-allowed"
              }`}
              onClick={handleResendOtp}
              disabled={!canResendOtp || isResendingOtp}
            >
              <MessageIcon /> 
             Resend OTP {isResendingOtp &&  <SmallSpinner />}
              {/* {isResendingOtp && <SmallSpinner />} */}
            </Button>
          </div>
        </div>
        
        <div className="mt-[4.5rem] flex flex-col pb-[2.75rem] lg:max-w-[425px]">
          <Button className="w-full bg-white text-[#2B3AA6] h-11 rounded-10 flex items-center gap-x-3 justify-center font-outfit text-sm ">
            Verify {isLoading && <SmallSpinner color="blue" />}{" "}
          </Button>
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
      />
    </div>
    </div>
  
  );
};

export default UserWidthdrawalOtpVerification;