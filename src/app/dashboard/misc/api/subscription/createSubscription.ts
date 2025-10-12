import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface subscriptionPlanProp {
  plan_type: string;
  duration: string;
}
// Define a type for the API's expected response


export const createSubscription = async ({
duration,plan_type
}: subscriptionPlanProp) => {
  const { data } = await adminAxios.post(
    `/api/accounts/create-subscription-plan/`,
    { duration, plan_type }
  );
  return data;
};

export const useCreateSubscription = () =>
  useMutation({
    mutationFn: createSubscription,
    onError: (error) => {
      console.error("ROI calculation failed:", error);
    }
  });
