import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: number, role: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is required");
  }

  return jwt.sign(
    {
      sub: userId,
      role,
    },
    secret,
    {
      expiresIn: "1d",
    },
  );
};
