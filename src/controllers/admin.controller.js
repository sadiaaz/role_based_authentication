import db from "../config/db.js";

export const adminDashboard = async (req, res) => {
  res.json({
    message: "Welcome Admin",
    adminId: req.user.id,
  });
};

export const getAllUsers = async (req, res) => {
  const [users] = await db.execute(
    `SELECT users.id, users.name, users.email, roles.name AS role
     FROM users
     JOIN roles ON users.role_id = roles.id`
  );

  res.json(users);
};

export const blockUser = async (req, res) => {
  const { userId } = req.params;

  await db.execute(
    "UPDATE users SET is_blocked = TRUE WHERE id = ?",
    [userId]
  );

  res.json({ message: "User blocked successfully" });
};
