import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface signup {
  email: string;

}
const requestPasswordReset = async({email}:signup)=>{
const response = await adminAxios.post(`/api/main/password-reset-request/`,{
    email,
},{
    headers:{
        Authorization:undefined
    }
})
return response.data 
}

export  const useRequestPasswordReset = ()=>{
   return useMutation({
        mutationFn:requestPasswordReset
    })
}