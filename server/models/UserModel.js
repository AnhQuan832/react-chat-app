import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  name: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    default:
      "https://placehold.co/100x100?text=U&fontsize=32&bg=009688&fg=ffffff",
    required: false,
  },
});

userSchema.pre("save", async function (next) {
  //   if (!this.isModified("password")) {
  //     next();
  //   }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);

export default User;
