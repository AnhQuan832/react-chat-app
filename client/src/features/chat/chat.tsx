import React, { useState } from "react";
import {} from "@/components/ui/avatar";
import {
  PaperPlaneIcon,
  HamburgerMenuIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import { useAppSelector } from "@/app/hook";
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

import { ChatMessage, ChatMate } from "@/utils/classes/index";

const chatMates: ChatMate[] = [
  {
    id: "1",
    name: "Alice",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hey, how are you?",
  },
  {
    id: "2",
    name: "Bob",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Did you see the game last night?",
  },
  {
    id: "3",
    name: "Charlie",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Meeting at 3 PM",
  },
  {
    id: "4",
    name: "Diana",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for your help!",
  },
  {
    id: "5",
    name: "Ethan",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Lets grab lunch sometime",
  },
];

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    senderId: "1",
    content: "Hey, how are you?",
    timestamp: new Date("2023-05-01T10:00:00"),
  },
  {
    id: "2",
    senderId: "me",
    content: "Im doing great, thanks! How about you?",
    timestamp: new Date("2023-05-01T10:05:00"),
  },
  {
    id: "3",
    senderId: "1",
    content: "Im good too. Did you finish the project?",
    timestamp: new Date("2023-05-01T10:10:00"),
  },
  {
    id: "4",
    senderId: "me",
    content: "Yes, I just submitted it. How about yours?",
    timestamp: new Date("2023-05-01T10:15:00"),
  },
];

export const Chat = () => {
  const { user } = useAppSelector((state) => state.user);
  const [selectedChatMate, setSelectedChatMate] = useState<ChatMate | null>(
    null
  );
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const message: ChatMessage = {
        id: Date.now().toString(),
        senderId: "me",
        content: newMessage,
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleLogout = () => {};

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
          {chatMates.map((chatMate) => (
            <div
              key={chatMate.id}
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
          ))}
        </ScrollArea>
      </div>

      {/* Chat Space */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
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

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.senderId === "me" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.senderId === "me"
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

        {/* Message Input */}
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
