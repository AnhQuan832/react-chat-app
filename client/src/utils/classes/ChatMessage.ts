export class ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
}

export class ChatMate {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
}
