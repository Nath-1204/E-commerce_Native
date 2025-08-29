import jwt from "jsonwebtoken";
import User from "../models/User.js";

// const response = await fetch(`http://localhost:3000/api/books`, {
//   method: "POST",
//   body: JSON.stringify({
//     title,
//     caption
//   }),
//   headers: { Authorization: `Bearer ${token}` },
// });

const protectRoute = async (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }


  try {
    // get token
    const token = authHeader.replace("Bearer ", "") ;
    if (!token) return res.status(401).json({ message: "No authentication token, access denied" });

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);

    // find user
    /* const userId = decoded.userId || decoded.id || decoded._id;
    const user = await User.findById(userId.toString()).select("-password"); */
    // ...existing code...
    // find user
    let userId = decoded.userId || decoded.id || decoded._id;
    if (typeof userId === "object" && userId !== null) {
      // Si c'est un Buffer ou un objet, convertis-le proprement
      if (userId.toHexString) {
        userId = userId.toHexString();
      } else if (userId.toString) {
        userId = userId.toString();
      } else if (userId.data) {
        // Cas Buffer
        userId = Buffer.from(userId.data).toString("hex");
      } else {
        return res.status(401).json({ message: "Invalid user ID in token" });
      }
    }
    const user = await User.findById(userId).select("-password");

    console.log("User found:", user);
    if (!user) return res.status(401).json({ message: "Token is not valid" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default protectRoute;
