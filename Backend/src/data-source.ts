import "reflect-metadata";
import { DataSource, Migration } from "typeorm";
import {Api}  from './Entity/Cd';


export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost", 
  port: 3306, 
  username: "root",
  password: "123Test@",
  database: "API",
  synchronize: false, 
  logging: true,
  entities: [Api],
  migrations: [`${process.cwd()}/src/migration/*.ts`],  
//  subscribers: [], 
});

// Establishing connection with the database
export const connectDB = async () => {
  try {
    await AppDataSource.initialize(); // Initialize the DataSource
    console.log("Data Source has been initialized!");
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
  }
};