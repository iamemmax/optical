import { adminAxios } from "@/lib/axios";
import { useMutation, useQuery } from "react-query";
import { UserSignupBvnDetailsValue } from "../../components/signup/UserBvnDetails";

interface prop{
    email:string;
    bvn_number:string
}

const requestBvnVerification = async({bvn_number,email}:prop)=>{
const response = await adminAxios.post(`/api/main/request-bvn-otp/?user_email=${email}`,{
    bvn_number
},{
    headers:{
        Authorization:undefined
    }
})
return response.data
}

export  const useRequestBvnVerification = ()=>{
   return useMutation({
        mutationFn:requestBvnVerification
    })
}