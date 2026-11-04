
import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "../configs/env";


export const AppDataSource = new DataSource({
  type: "mysql",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,

entities: ["backend/src/**/*.entity{.ts,.js}"],
migrations: ["backend/src/databases/migrations/*.ts"],

  synchronize: false,
  logging: false,
});
