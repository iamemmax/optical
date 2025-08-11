import { adminAxios } from "@/lib/axios";
import { useMutation, useQuery } from "react-query";
import { UserSignupBvnDetailsValue } from "../../components/signup/UserBvnDetails";

interface prop{
    email:string;
    image_capture:string
}

const imageCapture = async({email,image_capture}:prop)=>{
const response = await adminAxios.post(`/api/main/user-face-capture/`,{
    email, image_capture
},{
    headers:{
        Authorization:undefined
    }
})
return response.data
}

export  const useImageCapture = ()=>{
   return useMutation({
        mutationFn:imageCapture
    })
}