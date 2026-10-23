/**
 * Cloudflare Turnstile - server-side token verification helper.
 * Call verifyTurnstile(token) from any API route handler.
 */

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || "";
const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export interface TurnstileVerifyResult {
  success: boolean;
  errorCodes?: string[];
}

/**
 * Verifies a Cloudflare Turnstile token submitted from the client.
 * Returns { success: true } if valid, { success: false, errorCodes } otherwise.
 */
export async function verifyTurnstile(
  token: string | null | undefined,
): Promise<TurnstileVerifyResult> {
  if (!TURNSTILE_SECRET_KEY) {
    // If the secret key is not configured, skip verification in dev
    console.warn(
      "[Turnstile] TURNSTILE_SECRET_KEY is not set - skipping verification.",
    );
    return { success: true };
  }

  if (!token) {
    return { success: false, errorCodes: ["missing-input-response"] };
  }

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET_KEY,
        response: token,
      }).toString(),
      cache: "no-store",
    });

    const data = (await res.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };

    if (data.success) {
      return { success: true };
    }

    console.warn("[Turnstile] Verification failed:", data["error-codes"]);
    return { success: false, errorCodes: data["error-codes"] ?? [] };
  } catch (err) {
    console.error("[Turnstile] Network error during verification:", err);
    return { success: false, errorCodes: ["network-error"] };
  }
}
