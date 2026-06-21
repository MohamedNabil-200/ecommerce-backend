import { userRepository } from "./user.repository";
import { AppError } from "../../utils/app-error";

const getProfile = async (id: number) => {
  const user = await userRepository.findById(id);

  if (!user) {
    throw new AppError("User Not Found", 404);
  }

  const { password, ...safeUser } = user;

  return safeUser;
};

export const userService = {
  getProfile,
};
