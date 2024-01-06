import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, getUserChannelProfile, getWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserAvatar, updateUsercoverImage } from "../controllers/user.controllers.js";
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
router.route("/change-password").post(verifyJWt,changeCurrentPassword)
router.route("/current-user").get(verifyJWt,getCurrentUser)
router.route("/update-account").patch(verifyJWt,updateAccountDetails)
router.route("/avatar").patch(verifyJWt,upload.single("avatar"),updateUserAvatar)
router.route("/cover-image").patch(verifyJWt,upload.single("coverImage"),updateUsercoverImage)
router.route("/c/:username").get(verifyJWt,getUserChannelProfile)
router.route("/history").get(verifyJWt,getWatchHistory)

export default router