import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

export interface AssetListProps {
  title: string;
  investment_type: string;
  asset: string;
  amount: number;
  duration: string;
  payment_method: string;
}

// Define a type for the API's expected response
export interface CalculateRoiResponse {
 asset_name: string;
  asset_id: number;
  amount: string;
  roi: number;
}

export const addInvestment = async ({
  amount,asset,duration,investment_type,payment_method,title
}: AssetListProps): Promise<CalculateRoiResponse> => {
  const { data } = await adminAxios.post<CalculateRoiResponse>(
    `/api/investment/add_investment`,
    { amount,asset,duration,investment_type,payment_method,title }
  );
  return data;
};

export const useAddInvestment = () =>
  useMutation({
    mutationFn: addInvestment,
    onError: (error) => {
      console.error("ROI calculation failed:", error);
    }
  });
