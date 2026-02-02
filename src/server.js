import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js"; // note the file name
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON body
app.use(express.json());

// Mount routes
app.use("/api/auth", authRoutes); // <-- now /register is under /api/auth
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
