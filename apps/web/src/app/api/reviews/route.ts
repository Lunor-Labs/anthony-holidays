import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { getReviews } from "@/lib/payload-data";

const PAYLOAD_URL =
  process.env.PAYLOAD_API_URL ||
  process.env.NEXT_PUBLIC_PAYLOAD_URL ||
  "http://localhost:3001";

export async function GET() {
  try {
    const reviews = await getReviews();
    return NextResponse.json({ docs: reviews });
  } catch {
    return NextResponse.json({ docs: [] });
  }
}

export async function POST(req: Request) {
  try {
    // 1. Rate limiting by IP
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown-ip";

    const rateLimit = checkRateLimit(`review-${clientIp}`, 3, 60 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "You have submitted multiple reviews recently. Please wait before submitting another.",
        },
        { status: 429 },
      );
    }

    const data = await req.json();

    // 2. Bot protection via Honeypot
    if (data.website_trap || data.honeypot || data.bot_field) {
      return NextResponse.json({
        success: true,
        message: "Thank you for your review!",
      });
    }

    // 3. Validation
    const { guestName, country, rating, reviewText, tourName } = data;

    if (!guestName || typeof guestName !== "string" || guestName.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your name or preferred display alias." },
        { status: 400 },
      );
    }

    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return NextResponse.json(
        { error: "Please provide a valid rating between 1 and 5 stars." },
        { status: 400 },
      );
    }

    if (!reviewText || typeof reviewText !== "string" || reviewText.trim().length < 10) {
      return NextResponse.json(
        { error: "Please share a brief comment about your experience (minimum 10 characters)." },
        { status: 400 },
      );
    }

    // 4. Save to Payload CMS with status 'pending' (Awaiting Admin Moderation) via REST API
    let reviewId: string | number | null = null;
    try {
      const response = await fetch(`${PAYLOAD_URL}/api/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: guestName.trim(),
          country: country ? country.trim() : undefined,
          rating: Math.round(numericRating),
          reviewText: reviewText.trim(),
          tourName: tourName ? tourName.trim() : undefined,
          status: "pending", // CRITICAL: Never publish immediately; requires admin review
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const json = await response.json();
        reviewId = json.doc?.id || json.id || null;
      }
    } catch (err) {
      console.warn("Failed to forward review to Payload backend:", err);
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you! Your review has been submitted for moderation and will appear on the site once approved by our team.",
      reviewId,
    });
  } catch (error) {
    console.error("Review submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit review. Please try again later." },
      { status: 500 },
    );
  }
}
