import { io } from "socket.io-client";

const socket = io("https://social-buzz-upmo.onrender.com/", {
  autoConnect: true,
});

export default socket;