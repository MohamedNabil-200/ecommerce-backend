import bcrypt from "bcrypt";

import { authRepository } from "./auth.repository";
import { RegisterInput } from "./auth.validation";
import { AppError } from "../../utils/app-error";
import { LoginInput } from "./login.validation";
import { generateAccessToken } from "../../utils/jwt";

const register = async (data: RegisterInput) => {
  const existingUser = await authRepository.findByEmail(data.email);
  if (existingUser) {
    throw new AppError("Email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const createdUser = await authRepository.create({
    ...data,
    password: hashedPassword,
  });

  const { password, ...safeUser } = createdUser;

  return safeUser;
};

const login = async (data: LoginInput) => {
  const existingUser = await authRepository.findByEmail(data.email);
  if (!existingUser) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    existingUser.password,
  );
  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateAccessToken(existingUser.id, existingUser.role);

  const { password, ...safeUser } = existingUser;

  return {
    token,
    user: safeUser,
  };
};

export const authService = {
  register,
  login,
};
