import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


interface userSeesionProp {
  data: Datum[];
}

interface Datum {
  session_id: number;
  platform: string;
  last_logged: string;
  location: string;
  is_active: boolean;
}

export const getUserSessionSetting = async ():Promise<userSeesionProp> => {
  const { data } = await adminAxios.get<userSeesionProp>(`/api/main/get_user_session/`);
  return data as userSeesionProp;
};

export const useGetUserSessionSetting = () =>
  useQuery({
    queryKey:['fetch-user-session-settings'], 
    queryFn:getUserSessionSetting,
  });
