import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

export interface NotificationUpdateProps {
  payload: {
   email_subscribed: boolean;
  sms_subscribed: boolean;
  daily_email_subscribed: boolean;
  weekly_email_subscribed: boolean;
  monthly_email_subscribed: boolean;
  news_and_updates_subscribed: boolean;
  newsletter_subscribed: boolean;
  product_updates_subscribed: boolean;
  event_invitations_subscribed: boolean;
  profile_update_notification_subscribed: boolean;
  security_alerts_subscribed: boolean;
  deposit_alerts_subscribed: boolean;
  withdrawal_alerts_subscribed: boolean;
  trading_signals_alerts_subscribed: boolean;
  market_trends_alerts_subscribed: boolean;
  maintenance_alerts_subscribed: boolean;
  system_upgrade_alerts_subscribed: boolean;
  }
}

export const updateNotification = async ({ payload }: NotificationUpdateProps) => {
  const { data } = await adminAxios.patch(
    `/api/main/user_notifications/`,
    payload // Send the entire payload object
  );
  return data;
};

export const useUpdateNotification = () =>
  useMutation({
    mutationFn: updateNotification,
    onSuccess: (data) => {
      console.log("Notification settings updated successfully:", data);
    },
    onError: (error) => {
      console.error("Notification update failed:", error);
    }
  });