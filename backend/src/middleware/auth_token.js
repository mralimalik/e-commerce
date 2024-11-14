import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  console.log("Requesting from token",)

  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("Requesting from token",token)
  if (!token) return res.status(401).json({ error: "Access token required" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    console.log("auth user" , req.user)
    next();
  });
};

export default authenticateToken;
