import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


interface notificationProp {
  id: number;
  created_at: string;
  updated_at: string;
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

export const getNotificationSetting = async ():Promise<notificationProp> => {
  const { data } = await adminAxios.get<notificationProp>(`/api/main/user_notifications/`);
  return data as notificationProp;
};

export const useGetNotificationSetting = () =>
  useQuery({
    queryKey:['fetch-notification-settings'], 
    queryFn:getNotificationSetting,
  });
