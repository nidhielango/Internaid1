import React from 'react';
import {useRecoilState} from "recoil";
import {Company, companyState} from "../atoms/companiesAtom";


const useCompanyData= () => {
    
    const [companyStateValue, setCompanyStateValue] = useRecoilState(companyState);
    const onJoinOrLeaveCommunity = (companyData: Company, isJoined: boolean) => {
        if (isJoined) {
            leaveCompany(companyData.id);
            return;
        }
        joinCompany(companyData);
    }
    const joinCompany = (companyData:Company) => {};
    const leaveCompany = (companyId:string) => {};

    return {
        companyStateValue,
        onJoinOrLeaveCommunity
    };
}
export default useCompanyData;