import dotenv from "dotenv";

dotenv.config();

export const JWT_KEY = process.env.JWT || "jwt@secret";
export const MONGO_DB_CONNECTION_STRING =
  process.env.MONGO_DB_CONNECTION_STRING || "mongodb://localhost:27017/usersDB";
