import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./Item";

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    pid: string;

    @Column()
    address: string;

    @Column({default: false})
    deleted: boolean

    @OneToMany(type => Item, item => item.member, {
        eager: true,
        cascade: true
    })
    items: Item[];
}