import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { ON_PalyVideo } from "../controllers/autoEvent.controller.js";


const router=Router();

router.use(verifyJWT);

router.route('/onPlayViedo').post(ON_PalyVideo)

export default router