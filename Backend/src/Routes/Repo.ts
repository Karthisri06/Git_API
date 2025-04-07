

import express from "express";
import { AppDataSource } from "../data-source";
import { Api } from "../Entity/Cd";

export const router = express.Router();

router.get("/repos", async (req, res) => {
  try {
    const repoRepo = AppDataSource.getRepository(Api);
    const repos = await repoRepo.find();
    res.status(200).json(repos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch repos", error: err });
  }
});

export default router;
