import { useAuth } from "@/contexts/authentication";
import { adminAxios, setAxiosDefaultToken } from "@/lib/axios";
import { useMutation } from "react-query";
import { tokenStorage } from "../misc/utils";
import { AxiosResponse } from "axios";
import { LoginDetailsValue } from "../(pages)/login/page";
import { getAuthenticatedUser } from "./getUserDetails";


interface TokenResponse {
  refresh: string;
  access: string;
}



const login = (loginDto: LoginDetailsValue): Promise<AxiosResponse<TokenResponse>> =>
  adminAxios.post("/api/main/login/", loginDto);

export const useLogin = () => {
  const { authDispatch } = useAuth();

  return useMutation("login", login, {
    onSuccess: async (response) => {
      const { data } = response;
      const token = data?.access;
      
      if (!token) {
        console.error("No token received in login response");
        return;
      }
      
      
      // Store the token
      tokenStorage.setToken(token);
      // Set the token for future requests
      setAxiosDefaultToken(token, adminAxios);
     const user = await getAuthenticatedUser();


      
      if (authDispatch) {
        authDispatch({ type: 'LOGIN', payload: user });

        authDispatch({ type: 'STOP_LOADING' });
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      authDispatch?.({ type: "STOP_LOADING" });
    }
  });
  };
