"use client"
import React, { useState, useEffect } from 'react'
import { Button, ErrorModal } from '@/components/core'
import { useGetNotificationSetting } from '@/app/dashboard/misc/api/settings/notification/fetchNotificationSeetings'
import { useUpdateNotification } from '@/app/dashboard/misc/api/settings/notification/updateNotification'
import toast from 'react-hot-toast'
import { useErrorModalState } from '@/hooks'
import { formatAxiosErrorMessage } from '@/utils'
import { AxiosError } from 'axios'
import { useQueryClient } from 'react-query'

const Preference = () => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  
  const { data: notificationData, isLoading } = useGetNotificationSetting()
  const { mutate: handleUpdateNotification, isLoading: isUpdating } = useUpdateNotification()
  
  const [contentPreferences, setContentPreferences] = useState([
    {
      title: "Content Preferences",
      description: "Select what type of content you want to get from Opticraft.",
      subSettings: [
        {
          id: "newsletters",
          label: "Newsletters", 
          description: "Get trading and investment articles via our newsletters",
          isChecked: false
        },
        {
          id: "product-updates",
          label: "Product Updates",
          description: "The latest news about the latest features and investments update.",
          isChecked: false
        },
        {
          id: "event-invitations",
          label: "Event Invitations", 
          description: "The latest news about our events and lot more...",
          isChecked: false
        }
      ]
    },
    {
      title: "Email Frequency",
      description: "Select the number of times you want to get emails from Opticraft.",
      subSettings: [
        {
          id: "daily",
          label: "Daily",
          description: "Get emails daily",
          isChecked: false
        },
        {
          id: "weekly", 
          label: "Weekly",
          description: "Get emails weekly",
          isChecked: false
        },
        {
          id: "monthly",
          label: "Monthly", 
          description: "Get emails monthly",
          isChecked: false
        }
      ]
    },
    {
      title: "Communication Channels",
      description: "Select your preferred channel of communication.",
      subSettings: [
        {
          id: "email",
          label: "Email",
          description: "Get updates via email", 
          isChecked: false
        },
        {
          id: "sms",
          label: "SMS",
          description: "Get updates via SMS",
          isChecked: false
        }
      ]
    }
  ]);

  // Update state when API data is loaded
  useEffect(() => {
    if (notificationData) {
      setContentPreferences(prev => prev.map((setting, index) => {
        if (index === 0) { // Content Preferences
          return {
            ...setting,
            subSettings: setting.subSettings.map(sub => {
              if (sub.id === "newsletters") {
                return { ...sub, isChecked: notificationData.newsletter_subscribed || false }
              }
              if (sub.id === "product-updates") {
                return { ...sub, isChecked: notificationData.product_updates_subscribed || false }
              }
              if (sub.id === "event-invitations") {
                return { ...sub, isChecked: notificationData.event_invitations_subscribed || false }
              }
              return sub;
            })
          }
        }
        if (index === 1) { // Email Frequency
          return {
            ...setting,
            subSettings: setting.subSettings.map(sub => {
              if (sub.id === "daily") {
                return { ...sub, isChecked: notificationData.daily_email_subscribed || false }
              }
              if (sub.id === "weekly") {
                return { ...sub, isChecked: notificationData.weekly_email_subscribed || false }
              }
              if (sub.id === "monthly") {
                return { ...sub, isChecked: notificationData.monthly_email_subscribed || false }
              }
              return sub;
            })
          }
        }
        if (index === 2) { // Communication Channels
          return {
            ...setting,
            subSettings: setting.subSettings.map(sub => {
              if (sub.id === "email") {
                return { ...sub, isChecked: notificationData.email_subscribed || false }
              }
              if (sub.id === "sms") {
                return { ...sub, isChecked: notificationData.sms_subscribed || false }
              }
              return sub;
            })
          }
        }
        return setting;
      }))
    }
  }, [notificationData]);

  const handleSubSettingToggle = (mainIndex: number, subIndex: number) => {
    setContentPreferences(prev => prev.map((setting, i) => 
      i === mainIndex ? {
        ...setting,
        subSettings: setting.subSettings.map((subSetting, j) => 
          j === subIndex ? { ...subSetting, isChecked: !subSetting.isChecked } : subSetting
        )
      } : setting
    ));
  };
    const queryClient = useQueryClient();

  const handleSaveChanges = async () => {
    // Convert current state to backend format
    const payload = {
      // Content Preferences
      newsletter_subscribed: contentPreferences[0]?.subSettings.find(s => s.id === "newsletters")?.isChecked || false,
      product_updates_subscribed: contentPreferences[0]?.subSettings.find(s => s.id === "product-updates")?.isChecked || false,
      event_invitations_subscribed: contentPreferences[0]?.subSettings.find(s => s.id === "event-invitations")?.isChecked || false,
      
      // Email Frequency
      daily_email_subscribed: contentPreferences[1]?.subSettings.find(s => s.id === "daily")?.isChecked || false,
      weekly_email_subscribed: contentPreferences[1]?.subSettings.find(s => s.id === "weekly")?.isChecked || false,
      monthly_email_subscribed: contentPreferences[1]?.subSettings.find(s => s.id === "monthly")?.isChecked || false,
      
      // Communication Channels
      email_subscribed: contentPreferences[2]?.subSettings.find(s => s.id === "email")?.isChecked || false,
      sms_subscribed: contentPreferences[2]?.subSettings.find(s => s.id === "sms")?.isChecked || false,
      
      // Keep existing values for fields not in this component
      news_and_updates_subscribed: notificationData?.news_and_updates_subscribed || false,
      profile_update_notification_subscribed: notificationData?.profile_update_notification_subscribed || false,
      security_alerts_subscribed: notificationData?.security_alerts_subscribed || false,
      deposit_alerts_subscribed: notificationData?.deposit_alerts_subscribed || false,
      withdrawal_alerts_subscribed: notificationData?.withdrawal_alerts_subscribed || false,
      trading_signals_alerts_subscribed: notificationData?.trading_signals_alerts_subscribed || false,
      market_trends_alerts_subscribed: notificationData?.market_trends_alerts_subscribed || false,
      maintenance_alerts_subscribed: notificationData?.maintenance_alerts_subscribed || false,
      system_upgrade_alerts_subscribed: notificationData?.system_upgrade_alerts_subscribed || false,
    };

    handleUpdateNotification({ payload }, {
      onSuccess: () => {
              queryClient.invalidateQueries(["fetch-notification-settings"]);

        toast.success("Notification preferences updated successfully")
      },
      onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(String(errorMessage));
      },
    })
  };

  if (isLoading) {
    return (
      <div className="w-full mx-auto rounded-xl p-8">
        <div className="text-white">Loading notification settings...</div>
      </div>
    );
  }

  return (
    <div className='w-full mx-auto rounded-xl p-8'>
      <div className="flex justify-between 2xl:max-w-[1400px] items-start mb-6">
        <div>
          <h1 className="text-xl font-verdana font-medium text-white mb-1">
            Preferences
          </h1>
          <p className="text-sm text-white/70">
            Manage your notification preferences and communication settings
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {contentPreferences?.map((section, index) => (
          <div key={index} className="border-y border-white/10 py-[1.625rem]">
            <div className="grid lg:grid-cols-[1fr_2fr] 2xl:grid-cols-[1fr_3.5fr] max-md:grid-cols-1 gap-8 lg:gap-10 2xl:gap-[15.5rem]">
              <div className="text-white">
                <h2 className='text-sm font-verdana font-bold text-white'>{section?.title}</h2>
                <p className='text-sm font-outfit font-normal text-white/70'>{section?.description}</p>
              </div>

              <div className="space-y-6">
                {section.subSettings?.map((subSetting, subIndex) => (
                  <div key={subSetting.id} className="flex items-start gap-11 md:gap-12">
                    <input
                      type="checkbox"
                      checked={subSetting.isChecked}
                      onChange={() => handleSubSettingToggle(index, subIndex)}
                      className="mt-1 h-[1.2188rem] w-[1.2188rem] rounded border-white bg-transparent 
                               checked:bg-white checked:border-white
                               focus:ring-0 focus:ring-offset-0"
                    />
                    <div className="flex-1">
                      <h3 className="text-white text-sm font-verdana font-bold">{subSetting.label}</h3>
                      <p className="text-sm text-white/80 font-outfit mt-1">{subSetting.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-start gap-4 mt-8">
        <Button 
          className="px-6 py-2 rounded-lg border border-white/20 text-white 
                   hover:bg-white/5 transition-colors text-sm" 
          variant={"outlined"}
        >
          Cancel
        </Button>
        <Button 
          className="px-6 py-2 rounded-lg bg-white text-[#2B3AA6] 
                   hover:bg-blue-700 transition-colors text-sm"
          onClick={handleSaveChanges}
          disabled={isUpdating}
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>
      </div>
      
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
  )
}

export default Preference