import { signUpUserBvnSchema } from "@/app/schema/SignupValidation";
import React, { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Button, ErrorModal, LinkButton } from "@/components/core";
import CopyIcon from "@/app/icons/CopyIcon";
import { useClipboard, useErrorModalState } from "@/hooks";
import { useRequestBvnVerification } from "../../api/sign-up/requestBvnVerification";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { SmallSpinner } from "@/icons/core";
import { useQueryClient } from "react-query";

interface prop {
  setBvn: Dispatch<SetStateAction<string>>
  onNext: (value: SetStateAction<number>) => void;
  onPrev: (value: SetStateAction<number>) => void;
  openFrom?:"onboarding"| "dashboard"
  email:string
}

export type UserSignupBvnDetailsValue = z.infer<typeof signUpUserBvnSchema>;

const UserBvnDetails = ({ onNext, email, setBvn,openFrom="onboarding" }: prop) => {
  const { copy } = useClipboard();
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const { mutate: handleRequestVerification, isLoading } =
    useRequestBvnVerification();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserSignupBvnDetailsValue>({
    resolver: zodResolver(signUpUserBvnSchema),
    defaultValues: {
      bvn_number: "",
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient()
  const onSubmit = ({ bvn_number }: UserSignupBvnDetailsValue) => {
    if (isValid) {
      setBvn(bvn_number)
      handleRequestVerification(
        {
          bvn_number,
          email
        },
        {
          onSuccess: () => {
            onNext(3);
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
  return (
    <div className={`text-white relative border-[.0187rem] py-6 xl:py-[1.75rem]  border-[#4649E5] ${openFrom === "onboarding"?" px-6 md:px-[50px] 2xl:px-[6.1875rem]":" px-8 "} rounded-[1.25rem]`}>
      <div className="">
        <h2 className="text-white font-verdana font-bold text-[1.25rem] xl:text-[1.75rem]">
          BVN Verification
        </h2>
        <p className="font-outfit text-sm  text-white max-w-[290px] text-opacity-70 font-light">
          This is to create your operational wallet account
        </p>
        {openFrom==="onboarding" &&<div className="absolute right-10 xl:right-16 top-14">
          <p className="font-outfit font-semibold text-white text-xs xl:text-base">
            2/6
          </p>
        </div>}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="mt-6">
          <div className="mt-4">
            <Label
              className="mb-1 block text-sm font-outfit text-[#fff]"
              htmlFor={``}
            >
              BVN
            </Label>
            <div className="relative mt-[.25rem]">
              <Controller
                control={control}
                name={`bvn_number`}
                render={({ field }) => (
                  <input
                    {...field}
                    {...field}
                    className={`${
                      errors?.bvn_number
                        ? "border border-red-700"
                        : "border-[0.3px] border-[#696969]"
                    } text-[#fff] text-xs outline-none h-[2.75rem]  md:h-[3.375rem] border-opacity-70 rounded-lg w-full px-6 bg-[#02010D]`}
                    id="account_no"
                    placeholder="Enter your BVN"
                    type="text"
                    maxLength={11}
                    onChange={(e) => {
                      const target = e.target as HTMLInputElement; // Casting e.target to HTMLInputElement
                      // Handle input sanitization on change (typing)
                      const validBvn = target.value.replace(/[^0-9]/g, "");
                      field.onChange(validBvn);
                    }}
                    onPaste={(e) => {
                      e.target as HTMLInputElement;
                      // Intercept paste event to sanitize pasted content
                      const pastedValue = e.clipboardData.getData("text");
                      // Remove non-numeric characters and limit to 11 digits
                      const sanitizedValue = pastedValue
                        .replace(/[^0-9]/g, "")
                        .slice(0, 11); // Only allow first 11 digits
                      e.preventDefault(); // Prevent the default paste behavior
                      field.onChange(sanitizedValue); // Apply sanitized value
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement; // Casting e.target to HTMLInputElement
                      // Handle input sanitization on input changes
                      const validBvn = target.value.replace(/[^0-9]/g, "");
                      field.onChange(validBvn);
                    }}
                    // onChange={(e) => field.onChange(e.target.value)}~
                  />
                )}
              />

              {errors?.bvn_number && (
                <p className="text-red-700 text-xs mt-1">
                  {errors?.bvn_number?.message}
                </p>
              )}
            </div>
            <div className="border-[0.3px] border-[#696969] p-6 rounded-lg mt-4">
              <p className="max-w-[270px] 2xl:max-w-[400px] text-white text-xs  font-outfit ">
                Your BVN is safe and does not give access to your bank accounts
                or transactions as it would only be used for account creation.
              </p>
              <div className="mt-[1.0919rem]">
                <p className="text-xs font-outfit font-normal text-white">
                  Don’t know your BVN?
                </p>
                <div className="flex items-center gap-x-[.875rem] mt-2">
                  <p className="font-outfit font-normal text-xs text-white">
                    Dial: <span className="font-bold">*565*0#</span>
                  </p>
                  <Button
                    type="button"
                    className="bg-white gap-x-[.3831rem] text-[#0934F6] text-[.5rem] font-outfit font-normal flex items-center justify-center px-[.625rem] py-[.4375rem]"
                    onClick={() => copy("*565*0#")}
                  >
                    <CopyIcon /> Copy
                  </Button>
                </div>
              </div>

              <div></div>
            </div>
          </div>
        </div>
        <div className="mt-[4.5rem] flex flex-col pb-[2.75rem]">
          <Button
            className="w-full bg-white text-[#2B3AA6] h-11 flex justify-center items-center gap-x-3 rounded-10 font-outfit text-sm "
            type="submit"
          > 
            Verify {isLoading && <SmallSpinner color="blue"/>}
          </Button>
         {openFrom==="onboarding" &&<LinkButton href={"/login"}
            className="w-full border-[0.5px] border-[#FFFFFF] font-extralight mt-6 text-white h-11 rounded-10 font-outfit text-sm "
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

export default UserBvnDetails;
