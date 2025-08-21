
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
  referral_link: null;
  referral_code: null;
  bvn_number: null;
  wallet_details: Walletdetails;
  onboarding_stage: string;
  profile_image: null;
  account_security_perc: number;
}

interface Walletdetails {
  main_balance: number;
  naira_wallet_balance_balance: number;
  dollar_wallet_balance_balance: number;
  earnings_wallet_balance_balance: number;
  account_number: string;
  account_name: string;
  bank_name: string;
}