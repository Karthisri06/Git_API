import { Router } from "express";
import { ApiController } from "../Controllers/Authcontrollers";
import axios from "axios";
import { Request, Response } from "express";
import { v4 } from "uuid";
import { stringify } from "querystring";
import { PostData } from "../Controllers/Auth";
import { AppDataSource } from "../data-source";
import { Api } from "../Entity/Cd";



export const router = Router();
const APIcontrol = new ApiController();

router.get("/repos", APIcontrol.GetApiData);
router.put("/repos/:id", APIcontrol.UpdateApiData);
router.delete("/repos/:id", APIcontrol.DeleteApiData);


// router.get("/ping", (req, res) => {
//   res.send("pong");
// });


router.get("/check", async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("/check route hit");
    const query = {
      client_id: process.env.CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URI,
      state: v4(),
    };

    const tokenUrl = `https://github.com/login/oauth/authorize?${stringify(query)}`;
    console.log("Redirecting to:", tokenUrl);
    res.redirect(tokenUrl);
  } catch (err) {
    console.error("Error in /check:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/callback", async (req: Request, res: Response): Promise<void> => {
  const response = await axios({
    url: "https://github.com/login/oauth/access_token",
    method:"post",
    headers: {
      Accept: "application/json",
    },
    data: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: req.query.code,
      redirect_uri: process.env.REDIRECT_URI,
    },
  });
  const token = response.data.access_token;
  console.log(token, " Access token");
  await PostData(token);
  res.redirect("http://localhost:5173");
  
});

// router.get("/repos", async (req, res) => {
//   try {
//     const repoRepo = AppDataSource.getRepository(Api);
//     const repos = await repoRepo.find();
//     res.status(200).json(repos);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch repos", error: err });
//   }
// });
export default router;


// {
//   "name":"cd1",
//   "full_name":"crystal",
//   "created_at":"14-05-2021",
//   "updated_at":"14-06-2021",
//   "pushed_at":"14-07-2021",
//   "language":"shell",
//   "id":"45152187"
// }