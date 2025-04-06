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

// router.get("/check", async (req: Request, res: Response): Promise<void> => {
//   const query = {
//     client_id: process.env.CLIENT_ID,
//     redirect_uri: process.env.REDIRECT_URI,
//     state: v4(),
//   };
//   const tokenUrl = `https://github.com/login/oauth/authorize?${stringify(
//     query
//   )}`;
//   res.redirect(tokenUrl);
// });

router.get("/ping", (req, res) => {
  res.send("pong");
});


router.get("/check", async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("✅ /check route hit");
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

router.post("/callback", async (req: Request, res: Response): Promise<void> => {
  const response = await axios({
    url: "https://github.com/login/oauth/access_token",
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
  const token = response.data.acces_token;
  console.log(token, " the original token");
  await PostData(token);
  res.redirect("http://localhost:2900");
});
export default router;


