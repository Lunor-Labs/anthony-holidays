import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getPayloadClient } from "@/lib/payload";
import { checkRateLimit } from "@/lib/rate-limit";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const COMPANY_EMAIL =
  process.env.COMPANY_EMAIL || "inquiries@anthonyholidays.com";

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

    // 4. Save to PostgreSQL via Payload CMS
    let savedInquiryId: string | number | null = null;
    try {
      const payload = await getPayloadClient();

      const created = await payload.create({
        collection: "inquiries",
        data: {
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
        },
      });

      savedInquiryId = created.id;
    } catch (dbErr) {
      console.error("Payload CMS inquiry persistence error:", dbErr);
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

    // 6. Resend Email Dispatch
    if (resend) {
      try {
        // Notification to Company
        await resend.emails.send({
          from: "Anthony Holidays <notifications@anthonyholidays.com>",
          to: COMPANY_EMAIL,
          subject: `✨ New Journey Enquiry: ${fullName} (${country})`,
          text: inquirySummary,
        });

        // Automatic Confirmation to Guest
        await resend.emails.send({
          from: "Anthony Holidays <concierge@anthonyholidays.com>",
          to: email,
          subject: "Ayubowan - We have received your Sri Lanka journey enquiry",
          text: `Dear ${fullName},\n\nThank you for reaching out to Anthony Holidays.\n\nWe have received your enquiry for ${adultsCount} adult(s)${kidsCount > 0 ? ` and ${kidsCount} child(ren)` : ""} arriving around ${arrivalDate || "your requested dates"}.\n\nA Licensed National Tourist Guide Lecturer from our team is reviewing your requirements and will get back to you within 24 hours with a thoughtful, tailor-made proposal.\n\nIf you prefer to chat with us immediately on WhatsApp, feel free to message our concierge at +94 77 123 4567.\n\nWarmest regards from Sri Lanka,\nAnthony Holidays Team`,
        });
      } catch (emailErr) {
        console.warn(
          "Resend email dispatch error (check credentials):",
          emailErr,
        );
      }
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
