import { NextRequest } from "next/server";
import { verifyRefreshToken, signAccessToken } from "@/lib/jwt";
import { createSuccessResponse, CommonErrors } from "@/lib/api-response";
import { withErrorHandling } from "@/lib/error-handler";
import { JWTPayload } from "@/types/auth";

async function refreshHandler(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    return CommonErrors.Unauthorized("No refresh token provided");
  }

  const decoded = verifyRefreshToken(refreshToken) as JWTPayload;

  const payload = {
    id: decoded.id,
    email: decoded.email,
    name: decoded.name,
  };

  const newAccessToken = signAccessToken(payload);

  const res = createSuccessResponse({
    message: "Token refreshed successfully",
  });

  res.cookies.set("access_token", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60, // 15 minutes
  });

  return res;
}

export const POST = withErrorHandling(refreshHandler, "Token Refresh");
