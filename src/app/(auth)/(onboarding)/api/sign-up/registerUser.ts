import { adminAxios } from "@/lib/axios";
import { UserSignupDetailsValue } from "../../components/signup/UserSignupDetails";
import { useMutation } from "react-query";

interface signup {
  first_name: string;
  last_name: string;
  email: string;
  passsword:string,
  password_2?:string
}
const registerUser = async({email,full_name,phone_number,referall_code,password}:UserSignupDetailsValue)=>{
const response = await adminAxios.post(`/api/main/signup/`,{
    email,
    full_name,phone_number,referall_code,password
},{
    headers:{
        Authorization:undefined
    }
})
return response.data as signup
}

export  const useRegisterUser = ()=>{
   return useMutation({
        mutationFn:registerUser
    })
}