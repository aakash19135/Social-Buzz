import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import Notification from "../models/Notification.js";

export const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

   const user = await User.create({
  name,
  username,
  email,
  password: hashedPassword,
});

const token = generateToken(user._id);
const { password:
    userPassword, ...userData } = 
    user._doc;

res.status(201).json({
  message: "User registered successfully",
  token,
  user: userData,
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request:", email);

    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const token = generateToken(user._id);

    const { password: userPassword, ...userData } = user._doc;

    res.status(200).json({
      message: "Login successful",
      token,
      user: userData,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (currentUser._id.toString() === userToFollow._id.toString()) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    if (currentUser.following.includes(userToFollow._id)) {
      return res.status(400).json({
        message: "Already following",
      });
    }

    currentUser.following.push(userToFollow._id);
    userToFollow.followers.push(currentUser._id);

    await currentUser.save();
    await userToFollow.save();
    await Notification.create({
  sender: currentUser._id,
  receiver: userToFollow._id,
  type: "follow",
});

    res.status(200).json({
      message: "User followed successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const unfollowUser = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToUnfollow) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== userToUnfollow._id.toString()
    );

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== currentUser._id.toString()
    );

    await currentUser.save();
    await userToUnfollow.save();

    res.status(200).json({
      message: "User unfollowed successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};