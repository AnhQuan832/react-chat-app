import { Server } from "socket.io";

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`Connected: ${userId}`);
    } else {
      console.log("No userId");
    }

    socket.on("send-message", (data) => {
      onSendMessage(data);
    });

    socket.on("disconnect", () => {
      onDisconnect(socket);
    });
  });

  const onDisconnect = (socket) => {
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const onSendMessage = async (data) => {
    const { senderId, recipientId, message } = data;
    const recipientSocketId = userSocketMap.get(recipientId);

    const createdMessage = await Message.create(message);
    const messageData = await Message.findById(createdMessage._id)
      .populate("sender", "id email name image")
      .populate("recipient", "id email name image");

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("receive-message", message);
    }
  };
};

export default setupSocket;
