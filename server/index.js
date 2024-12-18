import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose, { set } from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import setupSocket from "./socket.js";
import contactRoutes from "./routes/ContactRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const database = process.env.DATABASE_URL;

app.use(
  cors({
    origin: [process.env.ORIGIN],
    credentials: true,
    method: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

setupSocket(server);

mongoose
  .connect(database)
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err));
