import bcrypt from "bcrypt";

import { authRepository } from "./auth.repository";
import { RegisterInput } from "./auth.validation";
import { AppError } from "../../utils/app-error";

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

export const authService = {
  register,
};
