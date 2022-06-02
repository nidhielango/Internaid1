
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