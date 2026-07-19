import { SignJWT, jwtVerify, type JWTPayload } from "jose";

// Helper to convert string secrets to the required Uint8Array format
const getSecret = (secret: string) => new TextEncoder().encode(secret);

export const signAccessToken = async (payload: JWTPayload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(getSecret(process.env.JWT_ACCESS_SECRET!));
};

export const signRefreshToken = async (payload: JWTPayload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret(process.env.JWT_REFRESH_SECRET!));
};

export const verifyToken = async (
  token: string,
  tokenType: "ACCESS" | "REFRESH",
) => {
  const secretString =
    tokenType === "ACCESS"
      ? process.env.JWT_ACCESS_SECRET!
      : process.env.JWT_REFRESH_SECRET!;

  // jwtVerify throws an error if the token is invalid or expired
  const { payload } = await jwtVerify(token, getSecret(secretString));

  return payload;
};
