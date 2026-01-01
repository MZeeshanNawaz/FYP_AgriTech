import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../repositories/user.repository";
import { JWT_SECRET, JWT_EXPIRE } from "../config/jwt";

export const registerUser = async (data: any) => {
  const existing = await findUserByEmail(data.email);
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(data.password, 10);
  return createUser({ ...data, password: hashed });
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE
  });

  return { token, user };
};
