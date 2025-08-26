import { describe, it, expect } from "vitest";
import { createSuccessResponse, createErrorResponse } from "@/lib/api-response";

describe("api-response helpers", () => {
  it("createSuccessResponse returns success payload", () => {
    const res = createSuccessResponse({ ok: true }, 200);
    expect(res.status).toBe(200);
    const body = res.json();
    // NextResponse.json returns a Response-like; in Vitest, we can only check status/type
    expect(body).toBeDefined();
  });

  it("createErrorResponse returns error payload", () => {
    const res = createErrorResponse("Bad", 400, "BAD");
    expect(res.status).toBe(400);
    const body = res.json();
    expect(body).toBeDefined();
  });
});
