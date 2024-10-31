import { Router } from "express";
import { getContacts } from "../controllers/ContactController.js";

const contactRoutes = Router();

contactRoutes.get("/search", getContacts);

export default contactRoutes;
