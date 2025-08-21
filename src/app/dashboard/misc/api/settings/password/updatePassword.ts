import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface signup {
  new_password: string;
 old_password: string;
}
const updatePassword = async({new_password,old_password}:signup)=>{
const response = await adminAxios.post(`/api/main/update_user_password/`,{
   old_password,new_password})
return response.data 
}

export  const useUpdatePassword = ()=>{
   return useMutation({
        mutationFn:updatePassword
    })
}