import express from "express";
import {
  createPost,
  getPosts,
  likePost,
  addComment,
  getPostComments,
  repostPost,
} from "../controllers/postController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", authMiddleware, getPosts);
router.put("/like/:id", authMiddleware, likePost);
router.post("/comments/:id", authMiddleware, addComment);
router.post("/repost/:id", authMiddleware, repostPost);
router.get("/comments/:id", authMiddleware, getPostComments);
export default router;