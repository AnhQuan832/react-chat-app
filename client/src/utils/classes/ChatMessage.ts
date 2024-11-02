export class ChatMessage {
  sender: string;
  recipient: string;
  messageType: MessageType;
  content: string;
  fileUrl?: string;
  timestamp: number;
}

export class ChatMate {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
}

export enum MessageType {
  Text = "text",
  File = "file",
}
