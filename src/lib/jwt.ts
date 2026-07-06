import jwt from "jsonwebtoken";

export const signAccessToken = (payload: object) =>
  jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: "15m" });

export const signRefreshToken = (payload: object) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });

export const verifyToken = (token: string, tokenType: string) => {
  if (tokenType === "ACCESS") {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
  } else {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
  }
};
