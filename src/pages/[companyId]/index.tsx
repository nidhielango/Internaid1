import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import { Company, companyState } from '../../atoms/companiesAtom';
import { firestore } from '../../firebase/clientApp';
import safeJsonStringify from 'safe-json-stringify';
import Header from '../../components/Company/Header';
import PageContent from '../../components/Layout/PageContent';
import CreatePost from '../../components/Company/CreatePost';
import Posts from '../../components/Posts/Posts';
import { useSetRecoilState } from 'recoil';
import About from '../../components/Company/About';
import CompanyNotFound from '../../components/Company/CompanyNotFound';

type CompanyProps = {
    companyData: Company;
};

const CompanyPage:React.FC<CompanyProps> = ({companyData}) => {
    
    const setCompanyStateValue = useSetRecoilState(companyState);

    if (!companyData) {
        return <CompanyNotFound/>
    } 

    useEffect(()=>{
        setCompanyStateValue((prev)=> ({
            ...prev,
            currentCompany: companyData,
        }));
    },[companyData]);

    return (
        <>
            <Header companyData={companyData}/>
            <PageContent>
                <>
                    <CreatePost />
                    <Posts companyData={companyData}/>
                </>
                <>
                    <About companyData={companyData}/>
                </>
            </PageContent>
        </>
    )

}


export async function getServerSideProps(context: GetServerSidePropsContext){
    // gets company data and passes it to client
    try {
        const companyDocumentReference = doc(firestore, "companies", context.query.companyId as string) 
        const companyDocument = await getDoc(companyDocumentReference)
    
        return {
            props: {
                companyData: companyDocument.exists() ? JSON.parse(safeJsonStringify({id:companyDocument.id, ...companyDocument.data()}))
                : ""
            }
        }
    
    } catch (error){
        console.log("getServerSideProps error", error)
    }

}

export default CompanyPage;