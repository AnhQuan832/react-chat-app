import { Router } from "express";
import {
  getContacts,
  getContactById,
  getMessages,
} from "../controllers/ContactController.js";

const contactRoutes = Router();

contactRoutes.get("/search", getContacts);
contactRoutes.get("/:contactId", getContactById);
contactRoutes.get("/messages/:contactId", getMessages);

export default contactRoutes;
