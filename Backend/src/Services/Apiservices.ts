import { Api } from "../Entity/Cd";
import { AppDataSource } from "../data-source";
import { NextFunction } from "express";

const ApiRepo = AppDataSource.getRepository(Api);

export const GetAPIData = async () => {
  const data = await ApiRepo.find();
  return data;
};

export const UpdateApiData = async (
  id: number,
  name: string,
  full_name: string,
  created_at: string,
  updated_at: string,
  pushed_at: string,
  language: string,
  next: NextFunction
) => {
  const ApiData = await ApiRepo.findOneBy({ id });
  if (!ApiData) {
    const error: any = new Error("User not found");
    error.status = 404;
    return next(error);
  }

  const updatedData = {
    ...ApiData,
    name: name || ApiData.name,
    full_name: full_name || ApiData.full_name,
    created_at: created_at || ApiData.created_at,
    updated_at: updated_at || ApiData.updated_at,
    pushed_at: pushed_at || ApiData.pushed_at,
    language: language || ApiData.language,
  };

  await ApiRepo.save(updatedData); 
  return updatedData;
};

export const DeleteApiData = async (id: number) => {
  const result = await ApiRepo.delete({ id });

  if (result.affected === 0) {
    throw new Error("No record found to delete");
  }

  return { message: "API data deleted successfully" };
};