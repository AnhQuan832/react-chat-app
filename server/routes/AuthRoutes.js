import { Router } from "express";
import { register, login, getUserInfo } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const authRoutes = Router();

authRoutes.post("/resgister", register);
authRoutes.post("/login", login);
authRoutes.get("/user-info", verifyToken, getUserInfo);

export default authRoutes;
