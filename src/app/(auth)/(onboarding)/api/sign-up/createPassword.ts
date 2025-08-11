import { adminAxios } from "@/lib/axios";
import { UserSignupDetailsValue } from "../../components/signup/UserSignupDetails";
import { useMutation } from "react-query";

interface signup {
  email: string;
  password: string;
  password_2: string;
}
const createPassword = async({email,password, password_2}:signup)=>{
const response = await adminAxios.post(`/api/main/set-user-password/`,{
    email,
    password, password_2
},{
    headers:{
        Authorization:undefined
    }
})
return response.data 
}

export  const useCreatePassword = ()=>{
   return useMutation({
        mutationFn:createPassword
    })
}