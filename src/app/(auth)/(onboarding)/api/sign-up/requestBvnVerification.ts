import { adminAxios } from "@/lib/axios";
import { useMutation, useQuery } from "react-query";
import { UserSignupBvnDetailsValue } from "../../components/signup/UserBvnDetails";


const requestBvnVerification = async({bvn_number}:UserSignupBvnDetailsValue)=>{
const response = await adminAxios.post(`/api/main/request-bvn-otp/`,{
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