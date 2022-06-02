import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { Company } from '../../atoms/companiesAtom';
import { firestore } from '../../firebase/clientApp';
import safeJsonStringify from 'safe-json-stringify';
import CommunityNotFound from '../../components/Company/CompanyNotFound';

type CompanyProps = {
    companyData: Company;
};

const CompanyPage:React.FC<CompanyProps> = ({companyData}) => {
    
    if (!companyData) {
        return <CommunityNotFound/>
    } return <div>{companyData.id} </div>

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