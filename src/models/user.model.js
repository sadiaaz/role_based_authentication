import db from "../config/db.js";

export const findUserByEmail = async (email) => {
  const [rows] = await db.execute(
    `SELECT users.id, users.name, users.email, users.password, 
            users.is_blocked, roles.name AS role
     FROM users
     JOIN roles ON users.role_id = roles.id
     WHERE users.email = ?`,
    [email]
  );

  return rows[0];
};

export const createUser = async (name, email, password, roleId) => {
  await db.execute(
    "INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)",
    [name, email, password, roleId]
  );
};
