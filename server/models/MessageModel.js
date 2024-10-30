import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Sender is required"],
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Receiver is required"],
  },
  messageType: {
    type: String,
    enum: ["text", "file"],
    required: [true, "Message type is required"],
  },
  content: {
    type: String,
    required: function () {
      return this.messageType === "text";
    },
  },
  fileUrl: {
    type: String,
    required: function () {
      return this.messageType === "file";
    },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("message", messageSchema);

export default Message;
