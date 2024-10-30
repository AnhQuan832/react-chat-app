import { useAppSelector } from "@/app/hook";
import { HOST } from "@/utils/constant";
import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef<ReturnType<typeof io> | null>(null);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: {
          userId: user.id,
        },
      });

      const handleReceiveMessage = (message) => {
        console.log("Received message: ", message);
      };

      socket.current.on("receive-message", handleReceiveMessage);
      return () => {
        socket.current.disconnect();
      };
    }
  }, [user]);
  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
