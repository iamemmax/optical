// "use client"
// import { AnimatePresence } from "framer-motion";
// import { useState } from "react";
// import { motion } from "framer-motion"
// import UserBvnDetails from "@/app/(auth)/(onboarding)/components/signup/UserBvnDetails";
// import UserOtpVerification from "@/app/(auth)/(onboarding)/components/signup/UserOtpVerification";
// import FacialVerification from "@/app/(auth)/(onboarding)/components/signup/FacialVerification";
// import CreateWidthralPin from "@/app/(auth)/(onboarding)/components/signup/CreateWidthrawalPin";
// import OnboardingSuccessPage from "@/app/(auth)/(onboarding)/components/shared/OnboardingSuccessPagr";
// import { Dialog, DialogBody, DialogContent } from '@/components/core';




// export interface prop {
//     email: string;
//     phoneNumber: string;
//     isOpen: boolean
// }

// const CompleteVerificationModal = ({ email, phoneNumber, isOpen }: prop) => {
//     const [step, setStep] = useState(5);
//     const [bvn, setBvn] = useState("");


//     const pageVariants = {
//         initial: { opacity: 0, x: 50 },
//         animate: { opacity: 1, x: 0 },
//         exit: { opacity: 0, x: -50 },
//     };

//     return (
//         <Dialog open={isOpen}>
//             <DialogContent className="bg-[#0A0B1A] p-0 !z-[999] w-full mx-4">
//                 <DialogBody className="p-0">

//                     <AnimatePresence mode="wait">
//                         {step === 1 && (
//                             <motion.div
//                                 animate="animate"
//                                 className="h-full "
//                                 exit="exit"
//                                 initial="initial"
//                                 key="step1"
//                                 transition={{ duration: 0.4 }}
//                                 variants={pageVariants}
//                             >
//                                 <UserBvnDetails
//                                     setBvn={setBvn}
//                                     onNext={() => setStep(3)}
//                                     onPrev={() => setStep(1)}
//                                     openFrom="dashboard"
//                                 />
//                             </motion.div>
//                         )}
//                         {step === 2 && (
//                             <motion.div
//                                 animate="animate"
//                                 className="h-full"
//                                 exit="exit"
//                                 initial="initial"
//                                 key="step2"
//                                 transition={{ duration: 0.4 }}
//                                 variants={pageVariants}
//                             >
//                                 <UserOtpVerification
//                                     bvn_number={bvn}
//                                     email={email}
//                                     onNext={() => setStep(4)}
//                                     onPrev={() => setStep(2)}
//                                     openFrom="dashboard"
//                                 />
//                             </motion.div>
//                         )}
//                         {step === 3 && (
//                             <motion.div
//                                 animate="animate"
//                                 className="h-full"
//                                 exit="exit"
//                                 initial="initial"
//                                 key="step3"
//                                 transition={{ duration: 0.4 }}
//                                 variants={pageVariants}
//                             >
//                                 <FacialVerification
//                                     email={email}
//                                     onNext={() => setStep(5)}
//                                     onPrev={() => setStep(3)}
//                                     openFrom="dashboard"
//                                 />
//                             </motion.div>
//                         )}
//                         {step === 4 && (
//                             <motion.div
//                                 animate="animate"
//                                 className="h-full"
//                                 exit="exit"
//                                 initial="initial"
//                                 key="step4"
//                                 transition={{ duration: 0.4 }}
//                                 variants={pageVariants}
//                             >
//                                 <CreateWidthralPin
//                                     email={email}
//                                     phone_number={phoneNumber}
//                                     onNext={() => setStep(6)}
//                                     onPrev={() => setStep(4)}
//                                     openFrom="dashboard"
//                                 />
//                             </motion.div>
//                         )}
//                         {step === 5 && (
//                             <motion.div
//                                 animate="animate"
//                                 className="h-full"
//                                 exit="exit"
//                                 initial="initial"
//                                 key="step5"
//                                 transition={{ duration: 0.4 }}
//                                 variants={pageVariants}
//                             >

//                                 <OnboardingSuccessPage
//                                     href="/dashboard"
//                                     title="Successful"
//                                     subTitle="You have successfully completed your account verification."
//                                     openFrom="dashboard"
//                                 />
//                             </motion.div>
//                         )}

//                     </AnimatePresence>
//                 </DialogBody>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default CompleteVerificationModal;
"use client"
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import UserBvnDetails from "@/app/(auth)/(onboarding)/components/signup/UserBvnDetails";
import UserOtpVerification from "@/app/(auth)/(onboarding)/components/signup/UserOtpVerification";
import FacialVerification from "@/app/(auth)/(onboarding)/components/signup/FacialVerification";
import CreateWidthralPin from "@/app/(auth)/(onboarding)/components/signup/CreateWidthrawalPin";
import OnboardingSuccessPage from "@/app/(auth)/(onboarding)/components/shared/OnboardingSuccessPagr";
import { Dialog, DialogBody, DialogContent } from "@/components/core";

export type VerificationStep = "bvn" | "otp" | "facial" | "withdrawal_pin" | "success";

export interface CompleteVerificationModalProps {
  email: string;
  phoneNumber: string;
  isOpen: boolean;
  currentStep?: VerificationStep; 
  onClose?: () => void;
}

const CompleteVerificationModal = ({
  email,
  phoneNumber,
  isOpen,
  currentStep = "bvn",
  onClose,
}: CompleteVerificationModalProps) => {
  const [step, setStep] = useState<VerificationStep>(currentStep);
  const [bvn, setBvn] = useState("");

  // keep in sync with prop
  useEffect(() => {
    setStep(currentStep);
  }, [currentStep]);

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const getStepComponent = () => {
    switch (step) {
      case "bvn":
        return (
          <UserBvnDetails
            setBvn={setBvn}
            onNext={() => setStep("otp")}
            onPrev={() => onClose?.()}
            openFrom="dashboard"
            email={email}
          />
        );
      case "otp":
        return (
          <UserOtpVerification
            bvn_number={bvn}
            email={email}
            onNext={() => setStep("facial")}
            onPrev={() => setStep("bvn")}
            openFrom="dashboard"
          />
        );
      case "facial":
        return (
          <FacialVerification
            email={email}
            onNext={() => setStep("withdrawal_pin")}
            onPrev={() => setStep("bvn")}
            openFrom="dashboard"
          />
        );
      case "withdrawal_pin":
        return (
          <CreateWidthralPin
            email={email}
            phone_number={phoneNumber}
            onNext={() => setStep("success")}
            onPrev={() => setStep("facial")}
            openFrom="dashboard"
          />
        );
      case "success":
        return (
          <OnboardingSuccessPage
            href="/dashboard"
            title="Successful"
            subTitle="You have successfully completed your account verification."
            openFrom="dashboard"
            onClose={onClose}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0A0B1A] p-0 !z-[999] w-full mx-4">
        <DialogBody className="p-0">
          <AnimatePresence mode="wait">
            <motion.div
              animate="animate"
              className="h-full"
              exit="exit"
              initial="initial"
              key={step}
              transition={{ duration: 0.4 }}
              variants={pageVariants}
            >
              {getStepComponent()}
            </motion.div>
          </AnimatePresence>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteVerificationModal;
