let io;

const users = {};

export const initSocket = (socketIO) => {
  io = socketIO;

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("registerUser", (userId) => {
      users[userId] = socket.id;
      console.log(users);
      console.log("Registered User:", userId);
      console.log("Users map:", users);
      console.log("registeredUser event received:", userId);
    });

    socket.on("disconnect", () => {
      for (const userId in users) {
        if (users[userId] === socket.id) {
          delete users[userId];
          break;
        }
      }

      console.log("User Disconnected:", socket.id);
    });
  });
};

export const getIO = () => io;

export const getReceiverSocketId = (userId) => {
  return users[userId];
};