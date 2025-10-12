import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


interface refferalTable {
    data: referalTableProp[];
}

export interface referalTableProp {
    name: string;
    email: string;
    date: string;
    reward_earned: number;
    status: string;
}

export const fetchReferralTable = async (status?: string) => {
    let myStatus
    if (status === "") {
        myStatus = ""
    } else {
        myStatus = `?status=${status}`
    }
    const { data } = await adminAxios.get(`api/main/referrals_list/${myStatus}`);
    return data as refferalTable
};

export const useFetchReferralTable = (status: string) =>
    useQuery({
        queryKey: ['fetch-refferal-Table-list', status],
        queryFn: () => fetchReferralTable(status),
    });
