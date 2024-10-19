import { Router } from "express";
import { register, login } from "../controllers/AuthController.js";

const authRoutes = Router();

authRoutes.post("/resgister", register);
authRoutes.post("/login", login);

export default authRoutes;
