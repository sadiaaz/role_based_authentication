import db from "../config/db.js";

export const blockMiddleware = async (req, res, next) => {
  const [[user]] = await db.execute(
    "SELECT is_blocked FROM users WHERE id = ?",
    [req.user.id]
  );

  if (user?.is_blocked) {
    return res.status(403).json({ message: "Account is blocked" });
  }

  next();
};
