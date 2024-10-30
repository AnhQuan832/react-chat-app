import { Router } from "express";
import {
  register,
  login,
  getUserInfo,
  logout,
} from "../controllers/AuthController.js";

const authRoutes = Router();

authRoutes.post("/resgister", register);
authRoutes.post("/login", login);
authRoutes.get("/user-info", getUserInfo);
authRoutes.post("/logout", logout);

export default authRoutes;
