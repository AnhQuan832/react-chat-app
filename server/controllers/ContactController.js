import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const getContacts = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).send("Unauthorized");
    }

    const currentUser = jwt.decode(token, process.env.JWT_SECRET);
    if (!currentUser) {
      return res.status(401).send("Unauthorized");
    }
    const { id } = currentUser;
    const { keySearch } = req.query;
    const query = keySearch
      ? {
          _id: { $ne: [id] },
          name: { $regex: keySearch, $options: "i" },
        }
      : { _id: { $ne: [id] } };
    const users = await User.find(query);
    const contacts = users.map(({ _id, email, name, image }) => ({
      id: _id,
      email,
      name,
      image,
    }));
    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

export const getContactById = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).send("Unauthorized");
    }

    const currentUser = jwt.decode(token, process.env.JWT_SECRET);
    if (!currentUser) {
      return res.status(401).send("Unauthorized");
    }
    const { id } = currentUser;
    const { contactId } = req.params;
    const user = await User.findById(contactId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const contact = {
      id: user._id,
      email: user.email,
      name: user.name,
      image: user.image,
    };
    return res.status(200).json(contact);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};
