import { Member } from "./member";

export interface Item {
    id: number;
    type: string;
    author: string;
    title: string;
    in_date: Date;
    status: string
    rent_from: Date | null;
    member: Member | null;
}