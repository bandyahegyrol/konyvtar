import "reflect-metadata"
import { DataSource } from "typeorm"
import { Item } from "./entity/Item"
import { Member } from "./entity/Member"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "konyvtar",
    password: "konyvtar",
    database: "konyvtar",
    synchronize: true,
    logging: false,
    entities: [Item, Member],
    migrations: [],
    subscribers: [],
})
