import { useAppSelector } from "@/app/hook";
import { HOST } from "@/utils/constant";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      const newSocket = io(HOST, {
        withCredentials: true,
        query: {
          userId: user.id,
        },
      });

      newSocket.on("connect", () => {
        console.log("Connected to socket server");
      });

      const handleReceiveMessage = (message) => {
        console.log("Received message: ", message);
      };

      newSocket.on("receiveMessage", handleReceiveMessage);

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
        setSocket(null);
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
