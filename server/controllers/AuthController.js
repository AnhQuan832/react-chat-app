import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { compare } from "bcrypt";

const maxAge = 3 * 24 * 60 * 60;
const createToken = (email, id) => {
  return jwt.sign({ email, id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password are required");
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("User already exists");
    }
    user = await User.create({ email, password, name });
    res.cookie("jwt", createToken(user.email, user._id), {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "strict",
      secure: true,
    });
    return res.status(201).json({
      user: {
        email: user.email,
        name: user.name,
        image: user.image,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.status(400).send("Email and Password are required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User does not exist");
    }
    const auth = await compare(password, user.password);
    if (!auth) {
      return res.status(400).send("Invalid Credentials");
    }
    res.cookie("jwt", createToken(user.email, user._id), {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "strict",
      secure: true,
    });
    return res.status(201).json({
      user: {
        email: user.email,
        name: user.name,
        image: user.image,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
