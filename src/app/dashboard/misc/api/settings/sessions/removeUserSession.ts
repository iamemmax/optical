import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface userSessionProp {
 session_id: number[]
}

export const removeUserSessionSetting = async ({session_id}: userSessionProp) => {
  // Format the array as JSON string for the URL parameter
  const sessionIdsParam = JSON.stringify(session_id);
  const { data } = await adminAxios.delete(`/api/main/remove_user_session/?session_ids=${sessionIdsParam}`);
  return data;
};

export const useRemoveUserSessionSetting = () =>
  useMutation({
    mutationFn: (sessionData: userSessionProp) => removeUserSessionSetting(sessionData),
  });