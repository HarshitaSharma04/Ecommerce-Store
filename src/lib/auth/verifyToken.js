import jwt from "jsonwebtoken";

export function getUserIdFromToken(req) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    return decoded.id;
  } catch (error) {
    console.error("Invalid token:", error.message);
    return null;
  }
}
