import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useRecoilState} from "recoil";
import {Company, CompanySnippet, companyState} from "../atoms/companiesAtom";
import { auth, firestore } from '../firebase/clientApp';

const useCompanyData= () => {
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [companyStateValue, setCompanyStateValue] = useRecoilState(companyState);
    const onJoinOrLeaveCompany = (companyData: Company, isJoined: boolean) => {
        if (isJoined) {
            leaveCompany(companyData.id);
            return;
        }
        joinCompany(companyData);
    }
    const joinCompany = (companyData:Company) => {};
    const leaveCompany = (companyId:string) => {};

    const getMySnippets = async() => {
        setLoading(true);
        try {
            // get users snippets
            const snippetDocs = await getDocs(collection(firestore,`users/${user?.uid}/companySnippets` ));
            const snippets = snippetDocs.docs.map(doc => ({...doc.data()}));
            
            setCompanyStateValue(prev => ({
                ...prev,
                mySnippets: snippets as CompanySnippet[],
            }))
            
            console.log("snippets", snippets);
        } catch(error) {
            console.log("getMySnippets error", error);
        }
        setLoading(false);
    }

    

    useEffect(()=> {
        if (!user) return;
        getMySnippets();
    }, [user]);

    return {
        companyStateValue,
        onJoinOrLeaveCompany,
        loading,
    };
}
export default useCompanyData;