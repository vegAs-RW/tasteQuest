import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
    if (err) {
      return res.status(403).json({ message: "invalid Token" });
    }
    req.userId = data.id;
    console.log("middleware");
    next();
  });
};
