import { Response, Request, NextFunction } from "express";
import {
  UpdateApiData,
  DeleteApiData,
  GetAPIData,
} from "../Services/Apiservices";


export class ApiController {
  async GetApiData(req: Request, res: Response, next: NextFunction) {
    try {
      const get = await GetAPIData();
      res.json(get);
    } catch (error) {
      next(error);
    }
  }

  async UpdateApiData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.body) {
        res.status(400).json({ error: "Request body is missing" });
        return;
      }

      const {
        name,
        full_name,
        created_at,
        updated_at,
        pushed_at,
        language,
      } = req.body || {}; 
      const id = parseInt(req.params.id, 10); 

      if (!id) {
        res.status(400).json({ error: "Invalid ID provided" });
        return;
      }

      const NewApiData = await UpdateApiData(
        id,
        name,
        full_name,
        created_at,
        updated_at,
        pushed_at,
        language,
        next
      );
      res.json(NewApiData);
    } catch (error) {
      next(error);
    }
  }

  async DeleteApiData(req: Request, res: Response, next: NextFunction) {
    try {
      await DeleteApiData(parseInt(req.params.id, 10));
      res.json({ message: "api deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}


// authcontroller