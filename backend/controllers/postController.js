import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import { getIO, getReceiverSocketId } from "../socket/socket.js";

export const createPost = async (req, res) => {
  try {
    const { text, image } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Post text is required",
      });
    }

    const hashtags = text.match(/#\w+/g) || [];

    const post = await Post.create({
      user: req.user._id,
      text,
      image: image || "",
      hashtags,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name username profilePic")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const likePost = async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(typeof req.params.id);
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const alreadyLiked = post.likes.includes(req.user._id);

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    if (post.user.toString() !== req.user._id.toString()) {
  console.log("Creating notification...");

const notification = await
 Notification.create({
    sender: req.user._id,
    receiver: post.user,
    type: "like",
    post: post._id,
});

const populatedNotification = await Notification.findById(notification._id)
  .populate("sender", "name username profilePic")
  .populate("post", "text");

  console.log("Receiver user id:",
    post.user.toString()
  )

const receiverSocketId = getReceiverSocketId(post.user.toString());
console.log("Receiver socket id:", receiverSocketId);

if (receiverSocketId) {
  getIO()
    .to(receiverSocketId)
    .emit("newNotification", populatedNotification);
}

console.log(notification);
}

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      user: req.user._id,
      text,
    });

    await post.save();
    if (post.user.toString() !== req.user._id.toString()) {
  await Notification.create({
    sender: req.user._id,
    receiver: post.user,
    type: "comment",
    post: post._id,
  });
  const io = getIO();
  io.emit("newNotification", {
    type: "comment",
    sender: req.user._id,
    receiver: post.user,
    post: post._id,
  });
}
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getPostComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("comments.user", "name username profilePic");

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(post.comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const repostPost = async (req, res) => {
  try {
    const originalPost = await Post.findById(req.params.id);

    if (!originalPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const repost = await Post.create({
      user: req.user._id,
      text: originalPost.text,
      image: originalPost.image,
      hashtags: originalPost.hashtags,
      repostOf: originalPost._id,
    });

    res.status(201).json(repost);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};