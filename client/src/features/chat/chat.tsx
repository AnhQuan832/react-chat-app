import React, { useEffect, useState } from "react";
import {} from "@/components/ui/avatar";
import {
  PaperPlaneIcon,
  HamburgerMenuIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import { useAppSelector, useAppDispatch } from "@/app/hook";
import {
  Button,
  Input,
  ScrollArea,
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/index";

import { ChatMessage } from "@/utils/classes/index";
import { logout } from "@/utils/slices/userSlice";
import { MessageType } from "@/utils/classes/ChatMessage";
import { getContacts, selectChatMate } from "@/utils/slices/messageSlice";
import { useSocket } from "@/context/SocketContext";

export const Chat = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { listContacts, selectedChatMate } = useAppSelector(
    (state) => state.contact
  );
  const [messages] = useState<ChatMessage[]>();
  const [newMessage, setNewMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      const message: ChatMessage = {
        sender: user.id,
        recipient: selectedChatMate.id,
        messageType: MessageType.Text,
        content: newMessage,
        timestamp: new Date(),
        fileUrl: undefined,
      };
      socket.emit("sendMessage", message);
      setNewMessage("");
    }
  };

  const handleLogout = async () => {
    await dispatch(logout());
  };

  const setSelectedChatMate = (chatMate) => {
    dispatch(selectChatMate(chatMate));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white w-64 border-r ${
          isSidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="p-4 border-b">
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <h2 className="text-xl font-bold">{user.name}</h2>
          </div>
          {/* <h2 className="text-xl font-bold">Chats</h2> */}
        </div>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          {listContacts && listContacts.length > 0 ? (
            listContacts.map((chatMate, index) => (
              <div
                key={chatMate.id || index}
                className={`p-4 hover:bg-gray-100 cursor-pointer ${
                  selectedChatMate?.id === chatMate.id ? "bg-gray-100" : ""
                }`}
                onClick={() => setSelectedChatMate(chatMate)}
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={chatMate.avatar} alt={chatMate.name} />
                    <AvatarFallback>{chatMate.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{chatMate.name}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {chatMate.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="p-4 text-gray-500">No contacts available</p>
          )}
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? (
                <Cross1Icon className="h-6 w-6" />
              ) : (
                <HamburgerMenuIcon className="h-6 w-6" />
              )}
            </Button>
            {selectedChatMate && (
              <>
                <Avatar>
                  <AvatarImage
                    src={selectedChatMate.avatar}
                    alt={selectedChatMate.name}
                  />
                  <AvatarFallback>
                    {selectedChatMate.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{selectedChatMate.name}</h2>
              </>
            )}
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          {(messages || []).map((message) => (
            <div
              key={message.timestamp.getTime()}
              className={`mb-4 ${
                message.sender === "me" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.sender === "me"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {message.content}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))}
        </ScrollArea>

        <div className="bg-white p-4 border-t">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>
              <PaperPlaneIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
