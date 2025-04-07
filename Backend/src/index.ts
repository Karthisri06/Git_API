import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { router as authRouter } from "../src/Routes/Apiroutes";
import repoRouter from "../src/Routes/Repo"; 

const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize().then(() => {
  console.log("Connected to database");

  // app.get("/test",(_req,res) => {
  //   console.log('testq');
  //   res.sendStatus(200)
  // })

  app.use("/auth", authRouter);
  app.use("/auth", repoRouter); 
 
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
