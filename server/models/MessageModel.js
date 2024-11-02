import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [false, "Sender is required"],
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [false, "Receiver is required"],
  },
  messageType: {
    type: String,
    enum: ["text", "file"],
    required: [false, "Message type is required"],
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
    type: Number,
    default: () => Date.now(),
  },
});

const Message = mongoose.model("message", messageSchema);

export default Message;
