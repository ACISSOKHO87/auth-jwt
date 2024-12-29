import { Router } from "express";
import {
    signin,
    signup,
    signout,
    currentUser,
} from "../controllers/user.controllers";
import { extractUserFromToken } from "../config/jwt.config";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/current", extractUserFromToken, currentUser);
router.delete("/signout", signout);

export default router;
