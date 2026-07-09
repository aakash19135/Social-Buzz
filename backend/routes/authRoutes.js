import express from "express";
import{
    registerUser,
    loginUser,
    getCurrentUser,
    followUser,
    unfollowUser,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getCurrentUser);
router.put("/follow/:id", authMiddleware, followUser);
router.put("/unfollow/:id", authMiddleware, unfollowUser);

export default router;