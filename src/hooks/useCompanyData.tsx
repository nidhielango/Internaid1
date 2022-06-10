import { collection, doc, getDoc, getDocs, increment, writeBatch } from 'firebase/firestore';
import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useRecoilState, useSetRecoilState} from "recoil";
import { authModalState } from '../atoms/authModalAtom';
import {Company, CompanySnippet, companyState} from "../atoms/companiesAtom";
import { auth, firestore } from '../firebase/clientApp';

const useCompanyData= () => {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [companyStateValue, setCompanyStateValue] = useRecoilState(companyState);
    const onJoinOrLeaveCompany = (companyData: Company, isJoined: boolean) => {
    const setAuthModalState = useSetRecoilState(authModalState);

    const getCompanyData = async (companyId:string) => {
        try {
            const companyDocReference = doc(firestore, 'companies', companyId as string);
            const companyDoc = await getDoc(companyDocReference);

            setCompanyStateValue((prev) => ({
                ...prev,
                currentCompany:{id:companyDoc.id, ...companyDoc.data()} as Company,
            }));
        } catch (error:any) {
            console.log('getCompanyData error', error);
        };
    }

    useEffect(()=> {
        const {companyId} = router.query;

        if (companyId && !companyStateValue.currentCompany){
            getCompanyData(companyId as string);
        }

    }, [router.query, companyStateValue.currentCompany]);

    if (!user) {
        // open modal
        setAuthModalState({open:true, view: "login"});
        return;
    }

    if (isJoined) {
        leaveCompany(companyData.id);
        return;
    }
    joinCompany(companyData);
}
    
    
    const joinCompany = async (companyData:Company) => {
        // batch write 
        try {

            const batch = writeBatch(firestore);

            // creating a new company snippet
            const newSnippet: CompanySnippet = {
                companyId: companyData.id,
                imageURL: companyData.imageURL || "",
            }
            batch.set(doc(firestore, `users/${user?.uid}/companySnippets`, companyData.id), 
            newSnippet);
            
            // updating the number of members (+1)
            batch.update(doc(firestore, "companies", companyData.id), {
                numberOfMembers: increment(1),
            })

            await batch.commit();

             // updating recoil state 
            setCompanyStateValue(prev => ({
                ...prev,
                mySnippets: [...prev.mySnippets, newSnippet],
            }))


        } catch (error: any){
            console.log('joinCompany error', error);
            setError(error.message);
        }
        setLoading(false);

    };
    

    const leaveCompany = async (companyId:string) => {
        // batch write 

        try {
            const batch = writeBatch(firestore);

            // deleting the company snippet from user
            batch.delete(doc(firestore, `users/${user?.uid}/companySnippets`, companyId))
            
            // updating the number of members (-1)
            batch.update(doc(firestore, "companies", companyId), {
                numberOfMembers: increment(-1),
            })

            await batch.commit();

            // update recoil state
            setCompanyStateValue(prev => ({
                ...prev,
                mySnippets: prev.mySnippets.filter(item => item.companyId !== companyId)
            }))

        } catch (error: any) {
            console.log("leaveCompany error", error.message)
            setError(error.message);
        }
        setLoading(false);

    };

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
        } catch(error:any) {
            console.log("getMySnippets error", error);
            setError(error.message)
        }
        setLoading(false);
    }
    

    useEffect(()=> {
        if (!user){
            setCompanyStateValue((prev) => ({
                ...prev,
                mySnippets: [],
            }))
            return;
        };
        getMySnippets();
    }, [user]);

   
    return {
        companyStateValue,
        onJoinOrLeaveCompany,
        loading,
        setLoading,
        error,
    };
}
export default useCompanyData;