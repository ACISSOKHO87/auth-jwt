import { Router } from "express";
import {
    signin,
    signup,
    signout,
    currentUser,
} from "../controllers/user.controllers";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/current", currentUser);
router.delete("/signout", signout);

export default router;
