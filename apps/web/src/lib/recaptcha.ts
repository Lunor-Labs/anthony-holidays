/**
 * Google reCAPTCHA v3 - server-side token verification helper.
 * Call verifyRecaptcha(token, action) from any API route handler.
 */

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || "";
const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

export interface RecaptchaVerifyResult {
  success: boolean;
  score?: number;
  action?: string;
  errorCodes?: string[];
}

/**
 * Verifies a Google reCAPTCHA v3 token submitted from the client.
 * Returns { success: true, score } if valid and score >= threshold (default 0.5),
 * or { success: false, errorCodes } otherwise.
 */
export async function verifyRecaptcha(
  token: string | null | undefined,
  expectedAction?: string,
  minScore: number = 0.5,
): Promise<RecaptchaVerifyResult> {
  if (!RECAPTCHA_SECRET_KEY) {
    console.warn(
      "[reCAPTCHA] RECAPTCHA_SECRET_KEY is not set - skipping verification.",
    );
    return { success: true, score: 1.0 };
  }

  if (!token) {
    return { success: false, errorCodes: ["missing-input-response"] };
  }

  try {
    const res = await fetch(RECAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      }).toString(),
      cache: "no-store",
    });

    const data = (await res.json()) as {
      success: boolean;
      score?: number;
      action?: string;
      challenge_ts?: string;
      hostname?: string;
      "error-codes"?: string[];
    };

    if (!data.success) {
      console.warn("[reCAPTCHA] Verification failed:", data["error-codes"]);
      return { success: false, errorCodes: data["error-codes"] ?? [] };
    }

    const score = data.score ?? 0;
    if (score < minScore) {
      console.warn(
        `[reCAPTCHA] Score (${score}) below threshold (${minScore}) for action: ${data.action}`,
      );
      return {
        success: false,
        score,
        action: data.action,
        errorCodes: ["low-score"],
      };
    }

    if (expectedAction && data.action && data.action !== expectedAction) {
      console.warn(
        `[reCAPTCHA] Action mismatch: expected "${expectedAction}", got "${data.action}"`,
      );
    }

    return { success: true, score, action: data.action };
  } catch (err) {
    console.error("[reCAPTCHA] Network error during verification:", err);
    return { success: false, errorCodes: ["network-error"] };
  }
}
