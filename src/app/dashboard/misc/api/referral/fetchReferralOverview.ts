import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";

interface referralProp {
    referral_link: string;
    referral_code: string;
    referral_wallet: Referralwallet;
    total_referrals: Totalreferrals;
    verified_signups: Totalreferrals;
    first_time_deeposits: Totalreferrals;
}

interface Totalreferrals {
    count: number;
    percent_change: number;
    change: string;
    period: string;
}

interface Referralwallet {
    amount: number;
    percent_change: number;
    change: string;
    period: string;
}


export const fetchReferralOverview = async (filter: string) => {
    let myFilter
    if (filter === "" || filter === null) {
        myFilter = `?filter=${filter}`
    } else {
        myFilter = ""
    }
    const { data } = await adminAxios.get(`api/main/referrals_overview/${myFilter}`);
    return data as referralProp
};

export const useFetchReferralOverview = (filter: string) =>
    useQuery({
        queryKey: ['fetch-refferal-overview-list', filter],
        queryFn: () => fetchReferralOverview(filter),
    });
