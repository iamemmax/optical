import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

export interface AssetListProps {
  investment_id: string;
 
}

// Define a type for the API's expected response
export interface CalculateRoiResponse {
 asset_name: string;
  asset_id: number;
  amount: string;
  roi: number;
}

export const addReInvestment = async ({
  investment_id
}: AssetListProps) => {
  const { data } = await adminAxios.post<CalculateRoiResponse>(
    `/api/investment/create_reinvestment`,
    { investment_id }
  );
  return data;
};

export const useReInvestment = () =>
  useMutation({
    mutationFn: addReInvestment,
    onError: (error) => {
      console.error("ROI calculation failed:", error);
    }
  });
