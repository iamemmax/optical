
export interface User {
  name: string;
  email: string;
  user_data: string | undefined;
  bvn_first_name: string;
}


export type AuthState = {
  isAuthenticated: boolean;
  user: UserDataTypes | null;
  isLoading: boolean;
};

export type AuthAction =
  | { type: "LOGIN"; payload: UserDataTypes }
  | { type: "LOGOUT" }
  | { type: "STOP_LOADING" };

export type AuthDispatch = React.Dispatch<AuthAction> | null;

export type LoginDto = {
  phone_number: string;
  password: string;
};

export type LoginOtpDto = {
  phone_number: string;
  otp: string;
  referal_code: string | null;
};

export interface LoginResponse {
  status: string;
  message: string;
  tokens: {
    refresh: string;
    access: string;
  };
  contestant_details: {
    name: string;
    contestant_id: number;
    contestant_attr: string;
  };
}

export interface UserDataTypes {
    id: number;
  full_name: string;
  email: string;
  phone_number: string;
  is_active: boolean;
  is_staff: boolean;
  bvn_verified: boolean;
  referral_link: string;
  referral_code: string;
  bvn_number: null;
}



  interface Profileimageobject {
    img_id: string;
    img_url: string;
}

interface Hospitals {
  lga: string;
  state: string;
  hospital: string;
  provider_id: string;
}


