import { adminAxios } from "@/lib/axios";
import { useMutation, useQuery } from "react-query";
interface prop{
    pin:string,
    email:string,
    phone_number:string
}

const setWidthrawalPin = async({phone_number,email, pin}:prop)=>{

const response = await adminAxios.post(`/api/main/set-withdrawal-pin/`,{
    phone_number,pin,email
},{
    headers:{
        Authorization:undefined
    }
})
return response.data
}

export  const useSetWidthrawalPin = ()=>{
   return useMutation({
        mutationFn:setWidthrawalPin
    })
}