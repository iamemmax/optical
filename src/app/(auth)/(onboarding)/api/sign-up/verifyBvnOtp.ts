import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface prop{
    email:string;
    otp:string
}

const verifyBvnVerification = async({email,otp}:prop)=>{
const response = await adminAxios.post(`/api/main/verify-bvn-otp/`,{
    email, otp
},{
    headers:{
        Authorization:undefined
    }
})
return response.data
}

export  const useVerifyBvnVerification = ()=>{
   return useMutation({
        mutationFn:verifyBvnVerification
    })
}