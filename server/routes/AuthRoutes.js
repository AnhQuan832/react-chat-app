import { Router } from "express";
import { register, login, getUserInfo } from "../controllers/AuthController.js";

const authRoutes = Router();

authRoutes.post("/resgister", register);
authRoutes.post("/login", login);
authRoutes.get("/user-info", getUserInfo);

export default authRoutes;
