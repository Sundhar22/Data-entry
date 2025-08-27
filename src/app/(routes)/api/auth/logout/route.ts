import { createSuccessResponse } from "@/lib/api-response";
import { withErrorHandling } from "@/lib/error-handler";

async function logoutHandler() {
  const res = createSuccessResponse({
    message: "Logged out successfully",
  });

  res.cookies.set("access_token", "", { maxAge: 0 });
  res.cookies.set("refresh_token", "", { maxAge: 0 });

  return res;
}

export const POST = withErrorHandling(logoutHandler, "Logout");
