import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import {router} from "../src/Routes/Apiroutes"


const app = express();
app.use(express.json());
app.use(cors());

AppDataSource.initialize().then(()=>{
    console.log("Connected to database");

    app.use("/auth", router); 

    app.listen(4000,()=>{
        console.log("Server is running on port 4000");
    });

});