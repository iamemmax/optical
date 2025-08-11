import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";
import { UserDataTypes } from "../misc/types";

export const getAuthenticatedUser = async () => {
  const { data } = await adminAxios.get(`/api/main/user_details/`);
  return data as UserDataTypes;
};

export const useUser = () =>
  useQuery('user-details', getAuthenticatedUser, { cacheTime: 1000 * 60 * 5 });
