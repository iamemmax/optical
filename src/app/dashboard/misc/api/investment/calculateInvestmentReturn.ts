import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

export interface AssetListProps {
  amount: string;
  asset_id: number;
}

// Define a type for the API's expected response
export interface CalculateRoiResponse {
 asset_name: string;
  asset_id: number;
  amount: string;
  roi: number;
}

export const calculateRoi = async ({
  amount,
  asset_id
}: AssetListProps): Promise<CalculateRoiResponse> => {
  const { data } = await adminAxios.post<CalculateRoiResponse>(
    `/api/investment/calculate_return_on_investment`,
    { amount, asset_id }
  );
  return data;
};

export const useCalculateRoi = () =>
  useMutation({
    mutationFn: calculateRoi,
    onError: (error) => {
      console.error("ROI calculation failed:", error);
    }
  });
