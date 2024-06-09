import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.niddleware.js";

const router = Router()

router.route("/register").post(
  upload.fields([
    {
      name:"avatar",
      maxCount:1
    },{
      name:"avatar",
      maxCount:1
    },
  ]),
  registerUser)


Router


export default router