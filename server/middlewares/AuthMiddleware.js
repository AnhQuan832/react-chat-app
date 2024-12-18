import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).send("Unauthorized");
      } else {
        next();
      }
    });
  } else {
    return res.status(401).send("Unauthorized");
  }
};
