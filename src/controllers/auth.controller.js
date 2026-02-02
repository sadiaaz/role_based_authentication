import { findUserByEmail, createUser } from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { signToken } from "../utils/jwt.js";
import db from "../config/db.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await hashPassword(password);

  // default role = user
  const [[role]] = await db.execute(
    "SELECT id FROM roles WHERE name = 'user'"
  );

  await createUser(name, email, hashed, role.id);

  res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (user.is_blocked) {
    return res.status(403).json({ message: "User is blocked" });
  }

  const match = await comparePassword(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken({
    id: user.id,
    role: user.role,
  });

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
    },
  });
};
