import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendEnquiryNotification, sendEnquiryThankYou } from "@/lib/email";
import { BACKEND_URL } from "@/lib/payload-data";

const PAYLOAD_URL = BACKEND_URL;

export async function POST(req: Request) {
  try {
    // 1. Rate limiting by IP
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown-ip";

    const rateLimit = checkRateLimit(`enquiry-${clientIp}`, 5, 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error:
            "Too many enquiries submitted. Please wait a minute before trying again.",
        },
        { status: 429 },
      );
    }

    const data = await req.json();

    // 2. Bot protection via Honeypot
    if (data.website_trap || data.honeypot || data.bot_field) {
      // Silently accept bot submission without persisting or sending emails
      return NextResponse.json({
        success: true,
        message: "Enquiry received successfully.",
      });
    }

    // 3. Server-side Validation
    const {
      fullName,
      email,
      phone,
      country,
      numberOfAdults,
      travellerCount,
      numberOfChildren,
      arrivalDate,
      departureDate,
      message,
      specialRequests,
      privacyConsent,
      selectedTour,
      selectedSpecialPackage,
    } = data;

    if (
      !fullName ||
      typeof fullName !== "string" ||
      fullName.trim().length < 2
    ) {
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 6) {
      return NextResponse.json(
        { error: "Please provide a valid phone or WhatsApp number." },
        { status: 400 },
      );
    }

    if (!country || typeof country !== "string") {
      return NextResponse.json(
        { error: "Please select or enter your country of residence." },
        { status: 400 },
      );
    }

    if (!privacyConsent) {
      return NextResponse.json(
        { error: "You must accept the privacy policy to submit an enquiry." },
        { status: 400 },
      );
    }

    const adultsCount = Number(numberOfAdults || travellerCount || 2);
    const kidsCount = Number(numberOfChildren || 0);

    // 4. Save to Payload CMS via REST API
    let savedInquiryId: string | number | null = null;
    try {
      const response = await fetch(`${PAYLOAD_URL}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          country: country.trim(),
          numberOfAdults: adultsCount,
          numberOfTravellers: adultsCount + kidsCount,
          numberOfChildren: kidsCount,
          arrivalDate: arrivalDate
            ? new Date(arrivalDate).toISOString()
            : undefined,
          departureDate: departureDate
            ? new Date(departureDate).toISOString()
            : undefined,
          message: message || specialRequests || "Custom inquiry",
          specialRequests: specialRequests || "",
          additionalInfo: `Selected Tour / Package: ${selectedTour || selectedSpecialPackage || "Custom Planning"} | Adults: ${adultsCount} | Children: ${kidsCount}`,
          privacyConsent: true,
          status: "new",
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        savedInquiryId = result.doc?.id || result.id || null;
      }
    } catch (dbErr) {
      console.warn("Payload CMS REST inquiry persistence error:", dbErr);
    }

    // 5. Format notification summaries
    const inquirySummary = `
New Journey Enquiry received on Anthony Holidays:
--------------------------------------------------
Lead Traveller: ${fullName}
Email: ${email}
Phone / WhatsApp: ${phone}
Country: ${country}

Travel Dates:
- Arrival: ${arrivalDate || "Flexible"}
- Departure: ${departureDate || "Flexible"}

Party Size:
- Adults: ${adultsCount}
- Children: ${kidsCount}

Selected Tour / Package:
- ${selectedTour || selectedSpecialPackage || "Custom Sri Lanka Journey"}

Message / Special Requirements:
${message || specialRequests || "None provided"}

Status: New
Submission Timestamp: ${new Date().toUTCString()}
Record ID: ${savedInquiryId || "Pending DB"}
`;

    // 6. Email Dispatch (Admin Notification + Guest Thank-You Confirmation)
    const enquiryPayload = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      country: country.trim(),
      numberOfAdults: adultsCount,
      numberOfChildren: kidsCount,
      travellerCount: adultsCount + kidsCount,
      arrivalDate,
      departureDate,
      selectedTour,
      selectedSpecialPackage,
      interests: data.interests,
      destinations: data.destinations,
      pace: data.pace,
      budgetTier: data.budgetTier,
      specialRequests: specialRequests || message,
      message,
      contactPreference: data.contactPreference,
    };

    try {
      // Send both guest thank-you and admin notification in parallel
      await Promise.allSettled([
        sendEnquiryThankYou(enquiryPayload),
        sendEnquiryNotification(enquiryPayload),
      ]);
    } catch (emailErr) {
      console.warn("Email dispatch error:", emailErr);
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you! Your enquiry has been received. Our licensed guide team will be in touch shortly.",
      inquiryId: savedInquiryId,
    });
  } catch (error) {
    console.error("Enquiry processing error:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred. Please contact us directly via WhatsApp.",
      },
      { status: 500 },
    );
  }
}
