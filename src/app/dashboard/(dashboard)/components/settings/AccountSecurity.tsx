"use client"
import React, { useState } from 'react'
import { Button, ErrorModal, Modal } from '@/components/core'
import EyeIcon from '@/app/icons/EyeIcon'
import { toast } from 'sonner'
import ChromeIcon from '@/app/icons/broswer/ChromeIcon'
import PercentageChart from '@/components/core/PercentageChart'
import FirefoxIcon from '@/app/icons/broswer/FirefoxIcon'
import OperaIcon from '@/app/icons/broswer/OperaIcon'
import EdgeIcon from '@/app/icons/broswer/EdgeIcon'
import PhoenixIcon from '@/app/icons/broswer/PhoenixIcon'
import CloseIcon from '@/app/icons/CloseIcon'
import { useGetUserSessionSetting } from '@/app/dashboard/misc/api/settings/sessions/getUserSession'
import { InfoIcon } from 'lucide-react'
import { useRemoveUserSessionSetting } from '@/app/dashboard/misc/api/settings/sessions/removeUserSession'
import { SmallSpinner } from '@/icons/core'
import { useErrorModalState } from '@/hooks'
import { formatAxiosErrorMessage } from '@/utils'
import { AxiosError } from 'axios'
import { createPasswordSchema, UpdatePasswordSchema } from '@/app/schema/SignupValidation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdatePassword } from '@/app/dashboard/misc/api/settings/password/updatePassword'
import { useQueryClient } from 'react-query'
import { useUser } from '@/app/(auth)/(onboarding)/api/getUserDetails'
import UserWidthdrawalOtpVerification from './withdraw/WithdrawalOtp'

export type UserUpdatePasswordDetailsValue = z.infer<typeof UpdatePasswordSchema>;


const AccountSecurity = () => {
   const {
      isErrorModalOpen,
      setErrorModalState,
      openErrorModalWithMessage,
      errorModalMessage,
    } = useErrorModalState();
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [dismisedBanner, setDismisedBanner] = useState(false)
  const [showWidthrawalModal, setShowWidthrawalModal] = useState(false)
const user = useUser()

// password
  const {
    control,
    handleSubmit,
    register,
  trigger,
    formState: { errors, isValid },
  } = useForm<UserUpdatePasswordDetailsValue>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      old_password:"",
      new_password: "",
      password_2: "",
    },
    mode: "onChange",
  });
  const {mutate:handleCreatePassword, isLoading:isUpdating}=useUpdatePassword()
 const onSubmit = async ({ new_password, old_password }: UserUpdatePasswordDetailsValue) => {
  await trigger() 
  if (isValid) {
      // onNext(3)
      handleCreatePassword(
        {
        
          old_password,
          new_password,
        },
        {
          onSuccess: () => {
          toast.success("Password Updated Successfully")
          },
          onError: (error) => {
            const errorMessage = formatAxiosErrorMessage(error as AxiosError);
            openErrorModalWithMessage(String(errorMessage));
          },
        }
      );
    }
  };

  // sessions
  const queryClient = useQueryClient();
  const {data:sessions}=useGetUserSessionSetting()
  const {mutate:removeUserSessions, isLoading}=useRemoveUserSessionSetting()
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmationType, setConfirmationType] = useState<'single' | 'all' | null>(null);
  const [sessionToRemove, setSessionToRemove] = useState<any>(null);

  const handleRemoveClick = (sessionId: number) => {
    const session = sessions?.data?.find(s => s.session_id === sessionId);
    setSessionToRemove(session);
    setConfirmationType('single');
    setShowConfirmModal(true);
  };

  const handleRemoveAllClick = () => {
    const otherSessions = sessions?.data?.filter(session => !session?.is_active);
    if (otherSessions && otherSessions.length > 0) {
      setConfirmationType('all');
      setShowConfirmModal(true);
    } else {
      toast.info('No other sessions to remove');
    }
  };

  const handleConfirmAction = () => {
    if (confirmationType === 'single' && sessionToRemove) {
      // Remove single session
      removeUserSessions({ session_id: [sessionToRemove.session_id] }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["fetch-user-session-settings"]);
          toast.success(`"${sessionToRemove.platform}" removed successfully`);
          closeModal();
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
                   openErrorModalWithMessage(String(errorMessage));
          closeModal();
        }
      });
    } else if (confirmationType === 'all') {
      // Remove all other sessions
      const otherSessions = sessions?.data?.filter(session => !session?.is_active);
      
      if (otherSessions && otherSessions.length > 0) {
        const sessionIdsToRemove = otherSessions.map(session => session.session_id);
        
        removeUserSessions({ session_id: sessionIdsToRemove }, {
          onSuccess: () => {
              queryClient.invalidateQueries(["fetch-user-session-settings"]);
            toast.success(`${sessionIdsToRemove?.length} sessions removed successfully`);
            closeModal();
          },
          onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
                   openErrorModalWithMessage(String(errorMessage));
            closeModal();
          }
        });
      }
    }
  };

  const closeModal = () => {
    setShowConfirmModal(false);
    setConfirmationType(null);
    setSessionToRemove(null);
  };
  
  const getBrowserIcon = (browser: string) => {
    const browserName = browser.toLowerCase();
    
    if (browserName?.startsWith('chrome')) {
      return <ChromeIcon width={80} height={30}/>;
    } else if (browserName.startsWith('firefox')) {
      return <FirefoxIcon width={80} height={30}/>;
    } else if (browserName.startsWith('opera')) {
      return <OperaIcon width={80} height={30}/>;
    } else if (browserName.startsWith('edge')) {
      return <EdgeIcon width={80} height={30}/>; 
    } else if (browserName.startsWith('phoenix')) {
      return <PhoenixIcon width={80} height={30}/>;
    }
    
    // Default to Chrome icon if browser is not recognized
    return <ChromeIcon width={80} height={30}/>;
  };
  
  const currentSession = sessions?.data?.find(session => session?.is_active);
  const otherSessions = sessions?.data?.filter(session => !session?.is_active);
  
  return (
    <div className='w-full mx-auto '>
      {/* Security Alert Banner */}
      {!dismisedBanner && <div className="bg-[#0B1739] w-full border-l-[10px] border-[#4453DD] mb-4 md:mb-6 rounded-[1.25rem] py-4 lg:py-[1.75rem]">
        <div className="w-full 2xl:max-w-[1400px] px-4 lg:px-[2.625rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
          <div className="flex items-center gap-2 lg:gap-3">
            <div >
              <PercentageChart 
                percentage={user?.data?.account_security_perc as number}
                size={60}
                mobileSize={24}
                className="w-full h-full"
              />
            </div>
            <div>
              <h3 className="text-white font-bold font-verdana text-base lg:text-lg">Your account security is {user?.data?.account_security_perc}%</h3>
              <p className="text-xs lg:text-sm font-outfit text-white/80">Please review your account security settings regularly and update your password</p>
            </div>
          </div>
          <Button 
            variant="outlined" 
            className="text-white/70 border-white/60 text-sm lg:text-base w-full md:w-auto"
            onClick={()=>setDismisedBanner(true)}
          >
            Dismiss
          </Button>
        </div>
      </div>}

      <div className="bg-[#090E2980] rounded-[1.25rem] p-4 md:p-[2.625rem] max-h-[80vh]">
        {/* Security Section Header */}
        <div className="max-h-[70vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-6 max-w-[1400px]">
          <div>
            <h1 className="text-lg md:text-xl font-verdana font-medium text-white mb-1">Security</h1>
            <p className="text-sm text-white/70">Update your password for security reasons</p>
          </div>
          <Button variant="outlined" className="text-white/70 border-white w-full md:w-auto" onClick={()=>setShowWidthrawalModal(true)}>
            Forgot Withdrawal Pin?
          </Button>
        </div>

        {/* Password Change Form */}
        <div className=" border-y-[0.5px] border-[#696969] py-6 border-opacity-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12 max-w-[1400px]">
            <div>
              <label className="block text-white mb-2">Old Password</label>
          <div
            className={` ${errors?.old_password ? "border border-red-700" : "border-[0.3px] border-[#696969]"} flex items-center relative w-full pr-10 md:pr-16  !bg-white/10 rounded-lg h-[3.5rem] `}
          >
                <input
                {...register("old_password")}
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Enter your old password"
                  className="outline-none w-full bg-transparent rounded-lg px-4 py-3 text-white border border-none"
                />
                <button
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <EyeIcon />
                </button>
              </div>
              <p className="text-red-700 text-xs mt-1">
                  {errors?.old_password?.message}
                </p>
            </div>

            <div>
              <label className="block text-white mb-2">New Password</label>
            <div
            className={` ${errors?.new_password ? "border border-red-700" : "border-[0.3px] border-[#696969]"} flex items-center relative w-full pr-10 md:pr-16  !bg-white/10 rounded-lg h-[3.5rem] `}
          >
                <input
                {...register("new_password")}
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  className="outline-none w-full bg-transparent rounded-lg px-4 py-3 text-white border border-none"
                />
                <button
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <EyeIcon />
                </button>
              </div>
              <p className="text-xs text-white/50 mt-1">Must be at least 8 characters long - uppercase, lowercase, number, special characters (@*!_)</p>
              <p className="text-red-700 text-xs mt-1">
                  {errors?.new_password?.message}
                </p>
              
            </div>

            <div>
              <label className="block text-white mb-2">Confirm New Password</label>
              <div
            className={`${errors?.password_2 ? "border border-red-700" : "border-[0.3px] border-[#696969]"} flex items-center relative w-full pr-10 md:pr-16  !bg-white/10 rounded-lg h-[3.5rem] `}
          >
                <input
                {...register("password_2")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter confirm password"
                  className="outline-none w-full bg-transparent rounded-lg px-4 py-3 text-white border border-none"
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <EyeIcon />
                </button>
              </div>
              <p className="text-red-700 text-xs mt-1">
                  {errors?.password_2?.message}
                </p>
            </div>
          </div>
        </div>

        {/* Sessions Section */}
        <div className="mb-6 py-6 border-opacity-50">
          <div className=" border-b-[0.5px] border-[#696969] py-6 border-opacity-50">
            <div className="max-w-[1400px] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-4">
              <div className=''>
                <h2 className="text-lg font-medium text-white">Sessions</h2>
                <p className="text-sm text-white/70">Browsers and devices you've logged into Opticraft</p>
              </div>
              <Button
                variant="outlined"
                className="text-white/70 w-full md:w-auto rounded-lg border-[#1C2850] hover:bg-[#1C2850] transition-colors"
                onClick={handleRemoveAllClick}
              >
                Remove all other sessions
              </Button>
            </div>
          </div>

          <div className="space-y-4 max-w-[1400px]">
            {/* Current Session */}
            {currentSession && (
              <div key={currentSession?.session_id}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 py-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center relative h-10 w-10 bg-white rounded-full p-1 justify-center">
                      {getBrowserIcon(currentSession?.platform)}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{currentSession?.platform}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-white/70">
                        <span className="w-2 h-2 rounded-full bg-[#4453DD]" />
                        <span>{currentSession?.is_active&&"Current Session"}</span>
                        <span className="w-2 h-2 rounded-full bg-[#696969]" />
                        <span>{currentSession.location}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outlined"
                    className="text-white/70 border-[#1C2850] hover:bg-[#1C2850] transition-colors rounded-lg w-full md:w-auto"
                    disabled={true}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )}

            {/* Other Sessions */}
            {otherSessions && otherSessions?.length > 0 && (
              <p className='font-verdana font-bold text-white text-base mt-8 mb-6'>
                {otherSessions?.length} Other Sessions
              </p>
            )}
            
            {otherSessions && otherSessions.map((session) => (
              <div key={session.session_id}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center relative h-10 w-10 bg-white rounded-full p-1 justify-center">
                      {getBrowserIcon(session.platform)}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{session.platform}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-white/70">
                        <span>Last logged in {session.last_logged}</span>
                        <span className="w-2 h-2 rounded-full bg-[#696969]" />
                        <span>{session.location}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outlined"
                    className="text-white/70 border-[#1C2850] hover:bg-[#1C2850] transition-colors rounded-lg w-full md:w-auto"
                    onClick={() => handleRemoveClick(session.session_id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col    md:flex-row justify-start gap-4 max-h-[10vh] mt-8">
          <Button variant="outlined" className="px-6 py-3 text-white border-white w-full md:w-auto">
            Cancel
          </Button>
          <Button className="px-6 py-3 flex justify-center items-center gap-x-2 bg-white text-[#2B3AA6] w-full md:w-auto"
          onClick={handleSubmit(onSubmit)}
          type='submit'
          >
            Save Changes {isUpdating&& <SmallSpinner color='#fff'/>}
          </Button>
        </div>
        </div>

      </div>

      {/* Single Confirmation Modal for Both Actions */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#090E29] border-l-[10px] border-[#4453DD] rounded-[20px] p-6 max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <InfoIcon className="text-[#4453DD]" />
              <h3 className="text-white font-medium text-lg">
                {confirmationType === 'single' ? 'Remove Session' : 'Remove All Other Sessions'}
              </h3>
            </div>
            
            <p className="text-white/70 mb-6">
              {confirmationType === 'single' 
                ? `Are you sure you want to remove "${sessionToRemove?.platform}" session? This action cannot be undone.`
                : `Are you sure you want to remove all ${otherSessions?.length} other sessions? This will log you out from all other devices and browsers.`
              }
            </p>
            
            <div className="flex gap-4">
              <Button 
                variant="outlined"
                className="flex-1 text-white/70 border-white/20"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-red-600 flex justify-center items-center gap-x-2 text-white hover:bg-red-700"
                onClick={handleConfirmAction}
              >
                {confirmationType === 'single' ? 'Remove' : 'Remove All'} {isLoading&& <SmallSpinner color='#fff'/>}
              </Button>
            </div>
          </div>
        </div>
      )}

      <ErrorModal
              isErrorModalOpen={isErrorModalOpen}
              setErrorModalState={() => {
                setErrorModalState(false);
              }}
              subheading={
                errorModalMessage || "Please check your inputs and try again."
              }
            ></ErrorModal>

            {
              showWidthrawalModal && <UserWidthdrawalOtpVerification isOpen={showWidthrawalModal} onClose={()=>setShowWidthrawalModal(false)} email={user?.data?.email??""}/>
            }
    </div>
  )
}

export default AccountSecurity