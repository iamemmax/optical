import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";



export interface assetListProps {
  asset_name: string;
  asset_id: number;
}
export const getAssetList = async () => {
  const { data } = await adminAxios.get(`/api/investment/fetch_assets`);
  return data as assetListProps[];
};

export const useGetAssetList = () =>
  useQuery({
    queryKey:['fetch-dashboard-asset-list'], 
    queryFn:getAssetList,
  });
