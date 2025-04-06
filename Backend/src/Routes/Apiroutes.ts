import { Router } from "express";
import { ApiController } from "../Controllers/Authcontrollers";
import axios from "axios";
import { Request, Response } from "express";
import { v4 } from "uuid";
import { stringify } from "querystring";
import { PostData } from "../Seeders/Apiseeder";



export const router = Router();
const APIcontrol = new ApiController();

router.get("/getapi", APIcontrol.GetApiData);
router.put("/updateapi/:id", APIcontrol.UpdateApiData);
router.delete("/deleteapi/:id", APIcontrol.DeleteApiData);

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const query = {
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
    state: v4(),
  };
  const tokenUrl = `https://github.com/login/oauth/authorize?${stringify(
    query
  )}`;
  res.redirect(tokenUrl);
});
router.get("/callback", async (req: Request, res: Response): Promise<void> => {
  const response = await axios({
    url: "https://github.com/login/oauth/access_token",
    data: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: req.query.code,
      redirect_uri: process.env.REDIRECT_URI,
    },
  });
  const token = response.data.split("=")[1].split("&")[0];
  console.log(token, " the original token");
  await PostData(token);
  res.redirect("http://localhost:2900");
});
export default router;


