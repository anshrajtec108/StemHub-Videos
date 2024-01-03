import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.middlewares.js"
import { verifyJWt } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/register").post(
    upload.fields([
        { 
            name: "avatar",
             maxCount: 1 
        }, 
        {
            name:"coverImage",
            maxCount:1   
        }
    ]),
    registerUser)

router.route("/login").post(loginUser)

//secured router

router.route("/logout").post(verifyJWt , logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
export default router