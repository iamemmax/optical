import React, { useState, useEffect } from "react";
import { Button, ErrorModal, Switch } from "@/components/core";
import { useGetNotificationSetting } from "@/app/dashboard/misc/api/settings/notification/fetchNotificationSeetings";
import { SmallSpinner } from "@/icons/core";
import { useUpdateNotification } from "@/app/dashboard/misc/api/settings/notification/updateNotification";
import toast from "react-hot-toast";
import { useErrorModalState } from "@/hooks";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useQueryClient } from "react-query";

const Notification = () => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const { data: notificationData, isLoading } = useGetNotificationSetting();
  const { mutate: handleUpdateNotification, isLoading: isUpdating } =
    useUpdateNotification();
  const [notificationSettings, setNotificationSettings] = useState([
    {
      title: "Email Notifications",
      description:
        "Opticraft can send you email notifications for any new direct messages.",
      isEnabled: false, // Initialize with default values
      subSettings: [
        {
          id: "news-updates",
          label: "News and Update Settings",
          description:
            "The latest news about the latest features and investments update settings",
          isChecked: false,
        },
        {
          id: "newsletter",
          label: "Newsletter",
          description: "Articles on latest trading investment and market news",
          isChecked: false,
        },
      ],
    },
    {
      title: "Account Updates",
      description:
        "Opticraft can send you push notifications for your profile and security alerts",
      isEnabled: true,
      subSettings: [
        {
          id: "profile-changes",
          label: "Profile Changes",
          description: "Get notifications about your profile changes",
          isChecked: false,
        },
        {
          id: "security-alerts",
          label: "Security Alerts",
          description:
            "Get notifications about change of password and transaction pin",
          isChecked: false,
        },
      ],
    },
    {
      title: "Transaction Alerts",
      description:
        "Opticraft can send you push notifications for any new direct messages.",
      isEnabled: true,
      subSettings: [
        {
          id: "deposit-alerts",
          label: "Deposit Alerts",
          description: "Get notifications about your deposits",
          isChecked: false,
        },
        {
          id: "withdrawal-alerts",
          label: "Withdrawal Alerts",
          description: "Get notifications about your withdrawals",
          isChecked: false,
        },
      ],
    },
    {
      title: "Trading Signals",
      description:
        "Opticraft can send you push notifications about new trading signals and market trends",
      isEnabled: true,
      subSettings: [
        {
          id: "trading-signals",
          label: "Trading Signals",
          description: "Get notifications about new trading signals",
          isChecked: false,
        },
        {
          id: "market-trends",
          label: "Market Trends",
          description: "Get notifications about new market trends",
          isChecked: false,
        },
      ],
    },
    {
      title: "System Notifications",
      description:
        "Opticraft can send you push notifications about platform maintenance or upgrade",
      isEnabled: true,
      subSettings: [
        {
          id: "maintenance",
          label: "Maintenance",
          description: "Get notifications about platform maintenance",
          isChecked: false,
        },
        {
          id: "upgrades",
          label: "Upgrades",
          description: "Get notifications about platform upgrades",
          isChecked: false,
        },
      ],
    },
  ]);

  // Update state when API data is loaded
  useEffect(() => {
    if (notificationData) {
      setNotificationSettings((prev) =>
        prev?.map((setting, index) => {
          // Update each section based on the API data
          if (index === 0) {
            // Email Notifications
            return {
              ...setting,
              isEnabled: notificationData.email_subscribed || false,
              subSettings: setting.subSettings.map((sub) => {
                if (sub.id === "news-updates") {
                  return {
                    ...sub,
                    isChecked:
                      notificationData.news_and_updates_subscribed || false,
                  };
                }
                if (sub.id === "newsletter") {
                  return {
                    ...sub,
                    isChecked: notificationData.newsletter_subscribed || false,
                  };
                }
                return sub;
              }),
            };
          }
          if (index === 1) {
            // Account Updates
            return {
              ...setting,
              subSettings: setting.subSettings.map((sub) => {
                if (sub.id === "profile-changes") {
                  return {
                    ...sub,
                    isChecked:
                      notificationData.profile_update_notification_subscribed ||
                      false,
                  };
                }
                if (sub.id === "security-alerts") {
                  return {
                    ...sub,
                    isChecked:
                      notificationData.security_alerts_subscribed || false,
                  };
                }
                return sub;
              }),
            };
          }
          if (index === 2) {
            // Transaction Alerts
            return {
              ...setting,
              subSettings: setting.subSettings.map((sub) => {
                if (sub.id === "deposit-alerts") {
                  return {
                    ...sub,
                    isChecked:
                      notificationData.deposit_alerts_subscribed || false,
                  };
                }
                if (sub.id === "withdrawal-alerts") {
                  return {
                    ...sub,
                    isChecked:
                      notificationData.withdrawal_alerts_subscribed || false,
                  };
                }
                return sub;
              }),
            };
          }
          if (index === 3) {
            // Trading Signals
            return {
              ...setting,
              subSettings: setting.subSettings.map((sub) => {
                if (sub.id === "trading-signals") {
                  return {
                    ...sub,
                    isChecked:
                      notificationData.trading_signals_alerts_subscribed ||
                      false,
                  };
                }
                if (sub.id === "market-trends") {
                  return {
                    ...sub,
                    isChecked:
                      notificationData.market_trends_alerts_subscribed || false,
                  };
                }
                return sub;
              }),
            };
          }
          if (index === 4) {
            // System Notifications
            return {
              ...setting,
              subSettings: setting.subSettings.map((sub) => {
                if (sub.id === "maintenance" || sub.id === "upgrades") {
                  return {
                    ...sub,
                    isChecked:
                      notificationData.system_upgrade_alerts_subscribed ||
                      false,
                  };
                }
                return sub;
              }),
            };
          }
          return setting;
        })
      );
    }
  }, [notificationData]); // Re-run when notificationData changes

  const handleMainToggle = (index: number) => {
    setNotificationSettings((prev) =>
      prev.map((setting, i) =>
        i === index ? { ...setting, isEnabled: !setting.isEnabled } : setting
      )
    );
  };

  const handleSubSettingToggle = (mainIndex: number, subIndex: number) => {
    setNotificationSettings((prev) =>
      prev.map((setting, i) =>
        i === mainIndex
          ? {
              ...setting,
              subSettings: setting.subSettings.map((subSetting, j) =>
                j === subIndex
                  ? { ...subSetting, isChecked: !subSetting.isChecked }
                  : subSetting
              ),
            }
          : setting
      )
    );
  };

    const queryClient = useQueryClient();

  const handleSaveChanges = async () => {
    // Convert current state to backend format
    const payload = {
      id: notificationData?.id,
      email_subscribed: notificationSettings[0].isEnabled,
      news_and_updates_subscribed:
        notificationSettings[0].subSettings.find((s) => s.id === "news-updates")
          ?.isChecked || false,
      newsletter_subscribed:
        notificationSettings[0].subSettings.find((s) => s.id === "newsletter")
          ?.isChecked || false,
      profile_update_notification_subscribed:
        notificationSettings[1].subSettings.find(
          (s) => s.id === "profile-changes"
        )?.isChecked || false,
      security_alerts_subscribed:
        notificationSettings[1].subSettings.find(
          (s) => s.id === "security-alerts"
        )?.isChecked || false,
      deposit_alerts_subscribed:
        notificationSettings[2].subSettings.find(
          (s) => s.id === "deposit-alerts"
        )?.isChecked || false,
      withdrawal_alerts_subscribed:
        notificationSettings[2].subSettings.find(
          (s) => s.id === "withdrawal-alerts"
        )?.isChecked || false,
      trading_signals_alerts_subscribed:
        notificationSettings[3].subSettings.find(
          (s) => s.id === "trading-signals"
        )?.isChecked || false,
      market_trends_alerts_subscribed:
        notificationSettings[3].subSettings.find(
          (s) => s.id === "market-trends"
        )?.isChecked || false,
      maintenance_alerts_subscribed:
        notificationSettings[4].subSettings.find((s) => s.id === "maintenance")
          ?.isChecked || false,
      system_upgrade_alerts_subscribed:
        notificationSettings[4].subSettings.find((s) => s.id === "upgrades")
          ?.isChecked || false,
      daily_email_subscribed: notificationData?.daily_email_subscribed || false,
      weekly_email_subscribed:
        notificationData?.weekly_email_subscribed || false,
      monthly_email_subscribed:
        notificationData?.monthly_email_subscribed || false,
      product_updates_subscribed:
        notificationData?.product_updates_subscribed || false,
      event_invitations_subscribed:
        notificationData?.event_invitations_subscribed || false,
      sms_subscribed: notificationData?.sms_subscribed || false,
    };

    handleUpdateNotification(
      { payload },
      {
        onSuccess: () => {
              queryClient.invalidateQueries(["fetch-notification-settings"]);

          toast.success("Notification updated successfully");
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
  };

  return (
    <div className="w-full mx-auto rounded-xl p-8">
      <div className="mb-6">
        <h1 className="text-xl font-verdana font-medium text-white mb-1">
          Notifications
        </h1>
        <p className="text-sm text-white/70">
          Get notified what's happening right now, you can turn off at any time.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <SmallSpinner color="white" />
        </div>
      ) : (
        <div className="space-y-6">
          {notificationSettings?.map((section, index) => (
            <div key={index} className="border-y border-white/10 py-[1.625rem]">
              <div className="grid lg:grid-cols-[1fr_2fr]  2xl:grid-cols-[1fr_3fr] max-md: grid-cols-1 gap-8 lg:gap-10 2xl:gap-[12.5rem]">
                <div className="text-white">
                  <h2 className="text-sm font-verdana font-bold text-white">
                    {section?.title}
                  </h2>
                  <p className="text-sm font-outfit font-normal text-white/70">
                    {section?.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={section.isEnabled}
                      onCheckedChange={() => handleMainToggle(index)}
                      className="data-[state=checked]:bg-blue-600"
                    />
                    <span className="text-sm text-white/70">
                      {section.isEnabled ? "On" : "Off"}
                    </span>
                  </div>

                  {section.subSettings?.map((subSetting, subIndex) => (
                    <div
                      key={subSetting.id}
                      className={`flex items-start gap-11 md:gap-12 ${!section.isEnabled ? "opacity-50" : ""}`}
                    >
                      <div className="relative mt-1">
                        <input
                          type="checkbox"
                          checked={subSetting.isChecked && section.isEnabled}
                          onChange={() =>
                            handleSubSettingToggle(index, subIndex)
                          }
                          disabled={!section.isEnabled}
                          className="mt-1 h-[1.2188rem] w-[1.2188rem] rounded border-white bg-transparent 
                               checked:bg-white checked:border-white
                               focus:ring-0 focus:ring-offset-0"
                          // className="peer h-[1.2188rem] w-[1.2188rem] cursor-pointer appearance-none rounded border-2 border-white/40 bg-transparent transition-all duration-200 checked:border-white checked:bg-blue focus:ring-2 focus:ring-blue focus:ring-offset-0 disabled:cursor-not-allowed"
                        />
                        {/* Custom checkmark */}
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-[#2B3AA6] opacity-0 peer-checked:opacity-100 transition-opacity duration-200">
                          <svg
                            className="h-3 w-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor={subSetting.id}
                          className="cursor-pointer"
                        >
                          <h3 className="text-white text-sm font-verdana font-bold">
                            {subSetting.label}
                          </h3>
                          <p className="text-sm text-white/80 font-outfit mt-1">
                            {subSetting.description}
                          </p>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-start gap-4 mt-8">
            <Button
              className="px-6 py-2 rounded-lg border border-white/20 text-white 
                         hover:bg-white/5 transition-colors text-sm"
              variant={"outlined"}
            >
              Cancel
            </Button>
            <Button
              className="px-6 py-2 rounded-lg flex justify-center items-center gap-x-4 bg-white text-[#2B3AA6] 
                         hover:bg-blue-700 transition-colors text-sm"
              onClick={handleSaveChanges}
            >
              Save Changes {isUpdating && <SmallSpinner color="blue" />}
            </Button>
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
    </div>
  );
};

export default Notification;
