import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./Member";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    author: string;

    @Column()
    title: string;

    @Column()
    in_date: Date;

    @Column()
    status: string

    @Column({nullable: true})
    rent_from: Date

    @ManyToOne(type => Member, member => member.items)
    member: Member;
}