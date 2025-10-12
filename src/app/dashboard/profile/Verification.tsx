








import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { Dialog, DialogBody, DialogContent } from '@/components/core';
import CompleteVerificationModal from './CompleteVerificationModal';
import { UserDataTypes } from '@/app/(auth)/(onboarding)/misc/types';

interface VerificationStatus {
  bvn: boolean;
  facial: boolean;
  withdrawal_pin: boolean;
}

export type VerificationStep = 'bvn' | 'facial' | 'withdrawal_pin';

interface AccountVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  user: UserDataTypes | undefined;
}

const BVN_STEP: VerificationStep = 'bvn';
const FACIAL_STEP: VerificationStep = 'facial';
const WITHDRAWAL_PIN_STEP: VerificationStep = 'withdrawal_pin';

export const AccountVerificationModal: React.FC<AccountVerificationModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  user
}) => {
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<VerificationStep>('bvn');
  const [showCompleteVerificationModal, setShowCompleteVerificationModal] = useState(false);

  // Initialize verification status from user data
  useEffect(() => {
    if (isOpen && user?.onboarding_progress) {
      const status: VerificationStatus = {
        bvn: user.onboarding_progress.bvn_verified || false,
        facial: user.onboarding_progress.face_verified || false,
        withdrawal_pin: user.onboarding_progress.has_withdrawal_pin || false
      };
      setVerificationStatus(status);

      // Auto-set current step
      if (!status.bvn) {
        setCurrentStep('bvn');
      } else if (!status.facial) {
        setCurrentStep('facial');
      } else if (!status.withdrawal_pin) {
        setCurrentStep('withdrawal_pin');
      }
    }
  }, [isOpen, user]);

  const handleCompleteVerification = () => {
    setShowCompleteVerificationModal(true);
  };

  const handleStepClick = (step: VerificationStep) => {
    if (isStepClickable(step)) {
      setCurrentStep(step);
      console.log(`Starting verification for step: ${step}`);
    }
  };

  const isStepClickable = (step: VerificationStep): boolean => {
    if (!verificationStatus) return false;
    if (verificationStatus[step]) return false;

    if (step === 'bvn') return true;
    if (step === 'facial') return verificationStatus.bvn;
    if (step === 'withdrawal_pin') return verificationStatus.bvn && verificationStatus.facial;

    return false;
  };

  const getStepIndicator = (step: VerificationStep) => {
    if (!verificationStatus) return null;

    const isCompleted = verificationStatus[step];
    const isClickable = isStepClickable(step);
    const isCurrent = currentStep === step;

    if (isCompleted) {
      return (
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
          <Check size={14} className="text-white" />
        </div>
      );
    }

    if (isCurrent && isClickable) {
      return (
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white"></div>
        </div>
      );
    }

    if (isClickable) {
      return (
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
          <X size={14} className="text-white" />
        </div>
      );
    }

    return (
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
        <X size={14} className="text-white" />
      </div>
    );
  };

  const getStepContainerStyles = (step: VerificationStep): string => {
    if (!verificationStatus) return "ml-4 flex-1 bg-slate-800 border border-slate-700 rounded-lg p-4";

    const isCompleted = verificationStatus[step];
    const isClickable = isStepClickable(step);
    const isCurrent = currentStep === step;

    let baseClasses = "ml-4 flex-1 rounded-lg p-4 transition-all duration-200";

    if (isCompleted) return `${baseClasses} bg-green-900/20 border border-green-500/30`;
    if (isCurrent && isClickable) return `${baseClasses} bg-blue-900/20 border border-blue-500/50 shadow-lg`;
    if (isClickable) return `${baseClasses} bg-slate-800 border border-slate-700 cursor-pointer hover:border-slate-600 hover:bg-slate-700/50`;

    return `${baseClasses} bg-slate-900/50 border border-slate-800 opacity-60 cursor-not-allowed`;
  };

  const getStepStatusText = (step: VerificationStep): string => {
    if (!verificationStatus) return '';

    const isCompleted = verificationStatus[step];
    const isClickable = isStepClickable(step);
    const isCurrent = currentStep === step;

    if (isCompleted) return 'Completed';
    if (isCurrent && isClickable) return 'Current';
    if (isClickable) return step === 'withdrawal_pin' ? 'Required' : 'Available';
    return 'Locked';
  };

  const getStepStatusColor = (step: VerificationStep): string => {
    if (!verificationStatus) return 'text-slate-400';

    const isCompleted = verificationStatus[step];
    const isClickable = isStepClickable(step);
    const isCurrent = currentStep === step;

    if (isCompleted) return 'text-green-400';
    if (isCurrent && isClickable) return 'text-blue-400';
    if (isClickable) return step === 'withdrawal_pin' ? 'text-red-400' : 'text-slate-400';
    return 'text-slate-500';
  };

  const completedSteps = verificationStatus ? Object.values(verificationStatus).filter(Boolean).length : 0;
  const totalSteps = 3;
  const isAllComplete = completedSteps === totalSteps;

  const steps: { key: VerificationStep; label: string }[] = [
    { key: BVN_STEP, label: 'BVN Verification' },
    { key: FACIAL_STEP, label: 'Facial Verification' },
    { key: WITHDRAWAL_PIN_STEP, label: 'Withdrawal Pin' }
  ];

  if (!isOpen) return null;

  return (
    <>
      <Dialog open={isOpen}>
        <DialogContent className="bg-[#0A0B1A] border-[#4649E5] rounded-[1rem] border-[0.5px] p-0 max-w-md w-full mx-4">
          <DialogBody className="p-6 py-[2.625rem]">
            {/* Header */}
            <div className="flex items-start justify-between pb-4">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Account Verification</h2>
                <p className="text-slate-400 text-sm">
                  Complete your account verification ({completedSteps}/{totalSteps} steps completed)
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-700 mb-6"></div>

            {/* Content */}
            <div>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="relative">
                  {/* Vertical connecting line */}
                  <div className="absolute left-3 top-9 bottom-9 w-px bg-slate-600"></div>

                  <div className="space-y-4">
                    {steps.map(({ key, label }) => (
                      <div key={key} className="flex items-center relative">
                        {getStepIndicator(key)}
                        <div
                          onClick={() => handleStepClick(key)}
                          className={getStepContainerStyles(key)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-white font-medium text-sm">{label}</span>
                            <span className={`text-xs ${getStepStatusColor(key)}`}>
                              {getStepStatusText(key)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-6">
              <button
                onClick={handleCompleteVerification}
                // disabled={!isAllComplete || loading}
               className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${'bg-white text-slate-900 hover:bg-slate-100'} `}
              >
                Complete Verification
                {/* {isAllComplete ? 'Complete Verification' : `Complete Verification (${completedSteps}/${totalSteps})`} */}
              </button>
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>

      {showCompleteVerificationModal && (
        <CompleteVerificationModal
          email={user?.email as string}
          phoneNumber={user?.phone_number as string}
          isOpen={showCompleteVerificationModal}
          currentStep={currentStep}
          onClose={() => setShowCompleteVerificationModal(false)}
        //   user={user}
        />
      )}
    </>
  );
};
