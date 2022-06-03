
import { Timestamp } from "firebase/firestore";
import {atom} from "recoil"

export interface Company {
    id: string;
    creatorId: string;
    numberOfMembers: number;
    privacyType: "public" | "restrictied" | "private";
    createdAt?: Timestamp;
    imageURL?: string;
} 

export interface CompanySnippet {
    companyId: string;
    isModerator?: boolean;
    imageURL?: string;
  }
  
  interface CompanyState {
    [key: string]:
      | CompanySnippet[]
      | { [key: string]: Company}
      | Company
      | boolean
      | undefined;
    mySnippets: CompanySnippet[];
    initSnippetsFetched: boolean;
    visitedCommunities: {
      [key: string]: Company;
    };
    currentCommunity: Company;
  }
  
  export const defaultCompany: Company = {
    id: "",
    creatorId: "",
    numberOfMembers: 0,
    privacyType: "public",
  };
  
  export const defaultCompanyState: CompanyState = {
    mySnippets: [],
    initSnippetsFetched: false,
    visitedCommunities: {},
    currentCommunity: defaultCompany,
  };
  
  export const companyState = atom<CompanyState>({
    key: "companyState",
    default: defaultCompanyState,
  });