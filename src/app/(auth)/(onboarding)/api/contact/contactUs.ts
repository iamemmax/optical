import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface prop {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
const contactus = async({email,first_name, last_name,phone,message,subject}:prop)=>{
const response = await adminAxios.post(`/api/main/make-enquiries/`,{
    email,
    phone,message,first_name,last_name,subject

},{
    headers:{
        Authorization:undefined
    }
})
return response.data as prop
}

export  const useContactUs = ()=>{
   return useMutation({
        mutationFn:contactus
    })
}