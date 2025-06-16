"use server";

import aj from "@/lib/arcjet";

export async function protectedAction() {
  try {
    // Just pass the request - let Arcjet handle fingerprinting
    const decision = await aj.protect({}, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          success: false,
          error: "Rate limit exceeded! Wait a minute before trying again."
        };
      }
      return {
        success: false,
        error: "Request blocked"
      };
    }

    return {
      success: true,
      message: "✅ Request allowed!"
    };

  } catch (error) {
    return {
      success: false,
      error: `Error: ${error.message}`
    };
  }
}
