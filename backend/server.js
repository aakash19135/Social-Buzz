import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { initSocket } from "./socket/socket.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

await connectDB();

const app = express();
import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://social-buzz-eta.vercel.app"],
    methods: ["GET", "POST"]
  }
});
initSocket(io);

app.use(cors({
  origin:["http://localhost:5173", "https://social-buzz-eta.vercel.app"],
  credentials:true,
}))

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running...");
});
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});