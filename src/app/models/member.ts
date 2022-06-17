import { Item } from "./item";

export interface Member {
    id: number;
    name: string;
    phone: string;
    pid: string;
    address: string;
    items: Item[];
}