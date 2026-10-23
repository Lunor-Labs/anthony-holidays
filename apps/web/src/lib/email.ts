/**
 * Transactional Email Service for Anthony Holidays
 * Uses Resend REST API directly (no SDK) for reliable delivery in Next.js.
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "noreply@team.anthonyholidays.com";

const FROM_NAME =
  process.env.RESEND_FROM_NAME || "Anthony Holidays";

function getCompanyEmails(): string[] {
  const raw =
    process.env.COMPANY_EMAIL ||
    process.env.ENQUIRY_NOTIFICATION_EMAIL ||
    "anthonyholidaysdmc@gmail.com,info@anthonyholidays.com";
  const list = raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.length > 0 ? list : ["anthonyholidaysdmc@gmail.com", "info@anthonyholidays.com"];
}

const COMPANY_EMAIL =
  getCompanyEmails()[0] || "anthonyholidaysdmc@gmail.com";

const WHATSAPP_NUMBER =
  process.env.PUBLIC_WHATSAPP_NUMBER || "94703247929";

const BRAND = {
  primary: "#1C3A2E",      // Forest Green
  secondary: "#C9A84C",    // Ceylon Gold
  dark: "#12251D",         // Deep Forest
  cream: "#F7F3EC",        // Sand / Cream background
  creamCard: "#FAF7F2",    // Subtle card bg
  border: "#E7DFD3",       // Elegant border
  textDark: "#1F2937",     // Charcoal body text
  textMuted: "#6B7280",    // Secondary text
  white: "#FFFFFF",
};

export interface SendEmailOptions {
  to: string;
  toName?: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  replyToName?: string;
}

/**
 * Universal email dispatcher — calls Resend REST API directly via fetch.
 * Avoids the Resend SDK's internal fetch wrapper which can conflict with
 */
export async function sendEmail(opts: SendEmailOptions): Promise<{ success: boolean; error?: string }> {
  if (!RESEND_API_KEY) {
    console.warn("No email service configured: RESEND_API_KEY is missing.");
    return { success: false, error: "No email provider configured" };
  }

  const payload: Record<string, unknown> = {
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: [opts.to],
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
  };

  if (opts.replyTo) {
    payload.reply_to = opts.replyToName
      ? `${opts.replyToName} <${opts.replyTo}>`
      : opts.replyTo;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (res.ok) {
      return { success: true };
    }

    const errorBody = await res.text();
    console.error(`Resend API error (status ${res.status}):`, errorBody);
    return { success: false, error: `Resend ${res.status}: ${errorBody}` };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error("Resend fetch error:", errMsg);
    return { success: false, error: errMsg };
  }
}

export interface EnquiryData {
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  arrivalDate?: string;
  departureDate?: string;
  numberOfAdults?: number;
  numberOfChildren?: number;
  travellerCount?: number;
  selectedTour?: string;
  selectedSpecialPackage?: string;
  interests?: string[];
  destinations?: string[];
  pace?: string;
  budgetTier?: string;
  specialRequests?: string;
  message?: string;
  contactPreference?: string;
}

/**
 * 1. Thank-You / Confirmation email sent to the guest who submitted an enquiry
 */
export async function sendEnquiryThankYou(data: EnquiryData): Promise<{ success: boolean; error?: string }> {
  const adults = Number(data.numberOfAdults || data.travellerCount || 2);
  const children = Number(data.numberOfChildren || 0);
  const tourName = data.selectedTour || data.selectedSpecialPackage || "Custom Tailor-Made Journey";

  const subject = `Ayubowan ${data.fullName} - Your Sri Lanka Journey Enquiry (Anthony Holidays)`;

  const plainText = `
Ayubowan ${data.fullName},

Thank you for contacting Anthony Holidays. We are thrilled by your interest in exploring Sri Lanka with us.

Your Journey Details:
- Tour / Experience: ${tourName}
- Party Size: ${adults} Adult(s)${children > 0 ? `, ${children} Child(ren)` : ""}
- Travel Dates: ${data.arrivalDate || "Flexible"} to ${data.departureDate || "Flexible"}
- Preferred Contact: ${data.contactPreference || "WhatsApp"} (${data.phone || data.email})
${data.interests?.length ? `- Interests: ${data.interests.join(", ")}\n` : ""}${data.destinations?.length ? `- Destinations: ${data.destinations.join(", ")}\n` : ""}${data.specialRequests ? `- Special Requests: ${data.specialRequests}\n` : ""}

What Happens Next:
An SLTDA Licensed National Tourist Guide Lecturer from our executive team is reviewing your requirements. We will prepare a personalized itinerary proposal and get back to you within 24 hours.

Need immediate assistance?
- WhatsApp Concierge: +${WHATSAPP_NUMBER}
- Email: ${COMPANY_EMAIL}
- Website: https://anthonyholidays.com

Warmest regards from Sri Lanka,
Anthony Holidays Team
Official Destination Management Company (DMC)
`.trim();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${BRAND.cream}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: ${BRAND.textDark}; line-height: 1.6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: ${BRAND.cream}; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: ${BRAND.white}; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06); border: 1px solid ${BRAND.border};">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: ${BRAND.primary}; background: linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.dark} 100%); padding: 36px 32px; text-align: center; border-bottom: 3px solid ${BRAND.secondary};">
              <span style="display: inline-block; font-family: Georgia, serif; font-size: 24px; font-weight: 700; letter-spacing: 2px; color: ${BRAND.secondary}; text-transform: uppercase;">
                ANTHONY HOLIDAYS
              </span>
              <p style="margin: 8px 0 0; color: ${BRAND.cream}; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; opacity: 0.9;">
                Authentic Sri Lanka · Expert-Led Journeys
              </p>
            </td>
          </tr>

          <!-- Welcome & Greeting -->
          <tr>
            <td style="padding: 36px 32px 20px;">
              <span style="display: inline-block; background-color: ${BRAND.cream}; color: ${BRAND.primary}; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 12px; border-radius: 2px; margin-bottom: 12px;">
                Enquiry Confirmation
              </span>
              <h1 style="font-family: Georgia, serif; font-size: 24px; color: ${BRAND.primary}; margin: 0 0 16px; font-weight: 600;">
                Ayubowan, ${data.fullName}
              </h1>
              <p style="font-size: 15px; color: ${BRAND.textDark}; margin: 0 0 16px; line-height: 1.7;">
                Thank you for entrusting your Sri Lanka journey aspirations to <strong>Anthony Holidays</strong>. We have successfully received your travel enquiry and are delighted to assist in curating an extraordinary experience.
              </p>
            </td>
          </tr>

          <!-- Summary Card -->
          <tr>
            <td style="padding: 0 32px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: ${BRAND.creamCard}; border-left: 3px solid ${BRAND.secondary}; border-radius: 0 4px 4px 0; padding: 20px 24px;">
                <tr>
                  <td colspan="2" style="padding-bottom: 12px;">
                    <strong style="color: ${BRAND.primary}; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
                      Your Journey Overview
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: ${BRAND.textMuted}; font-size: 14px; width: 40%;">Requested Tour:</td>
                  <td style="padding: 6px 0; color: ${BRAND.textDark}; font-weight: 600; font-size: 14px;">${tourName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: ${BRAND.textMuted}; font-size: 14px;">Party Size:</td>
                  <td style="padding: 6px 0; color: ${BRAND.textDark}; font-size: 14px;">
                    ${adults} Adult(s)${children > 0 ? `, ${children} Child(ren)` : ""}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: ${BRAND.textMuted}; font-size: 14px;">Dates:</td>
                  <td style="padding: 6px 0; color: ${BRAND.textDark}; font-size: 14px;">
                    ${data.arrivalDate || "Flexible"} to ${data.departureDate || "Flexible"}
                  </td>
                </tr>
                ${
                  data.country
                    ? `<tr><td style="padding: 6px 0; color: ${BRAND.textMuted}; font-size: 14px;">Country of Residence:</td><td style="padding: 6px 0; color: ${BRAND.textDark}; font-size: 14px;">${data.country}</td></tr>`
                    : ""
                }
                ${
                  data.interests?.length
                    ? `<tr><td style="padding: 6px 0; color: ${BRAND.textMuted}; font-size: 14px;">Interests:</td><td style="padding: 6px 0; color: ${BRAND.textDark}; font-size: 14px;">${data.interests.join(", ")}</td></tr>`
                    : ""
                }
                ${
                  data.pace
                    ? `<tr><td style="padding: 6px 0; color: ${BRAND.textMuted}; font-size: 14px;">Travel Pace:</td><td style="padding: 6px 0; color: ${BRAND.textDark}; font-size: 14px;">${data.pace}</td></tr>`
                    : ""
                }
                ${
                  data.budgetTier
                    ? `<tr><td style="padding: 6px 0; color: ${BRAND.textMuted}; font-size: 14px;">Style / Budget:</td><td style="padding: 6px 0; color: ${BRAND.textDark}; font-size: 14px;">${data.budgetTier}</td></tr>`
                    : ""
                }
                ${
                  data.specialRequests
                    ? `<tr><td style="padding: 6px 0; color: ${BRAND.textMuted}; font-size: 14px; vertical-align: top;">Notes:</td><td style="padding: 6px 0; color: ${BRAND.textDark}; font-size: 14px;">${data.specialRequests}</td></tr>`
                    : ""
                }
              </table>
            </td>
          </tr>

          <!-- Next Steps -->
          <tr>
            <td style="padding: 0 32px 28px;">
              <h3 style="font-family: Georgia, serif; font-size: 17px; color: ${BRAND.primary}; margin: 0 0 12px;">
                What Happens Next?
              </h3>
              <p style="font-size: 14px; color: ${BRAND.textDark}; margin: 0 0 12px; line-height: 1.7;">
                1. <strong>Expert Evaluation:</strong> An SLTDA Licensed National Tourist Guide Lecturer is reviewing your preferences.
              </p>
              <p style="font-size: 14px; color: ${BRAND.textDark}; margin: 0 0 12px; line-height: 1.7;">
                2. <strong>Bespoke Proposal:</strong> We will prepare a personalized itinerary with hand-picked boutique stays and private chauffeurs within <strong>24 hours</strong>.
              </p>
              <p style="font-size: 14px; color: ${BRAND.textDark}; margin: 0 0 20px; line-height: 1.7;">
                3. <strong>Seamless Refinement:</strong> We will fine-tune every detail with you until it matches your dream escape.
              </p>

              <!-- CTA WhatsApp -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 20px auto 0;">
                <tr>
                  <td align="center" style="background-color: ${BRAND.primary}; border-radius: 4px;">
                    <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Anthony Holidays, I have submitted an enquiry for ${data.fullName}.`)}" target="_blank" style="display: inline-block; padding: 14px 28px; font-size: 14px; color: ${BRAND.white}; text-decoration: none; font-weight: 600; letter-spacing: 0.5px;">
                      Chat Directly on WhatsApp &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: ${BRAND.dark}; color: #9CA3AF; padding: 28px 32px; font-size: 12px; text-align: center; border-top: 1px solid ${BRAND.border};">
              <p style="color: ${BRAND.secondary}; font-weight: 600; font-size: 13px; margin: 0 0 6px;">
                Anthony Holidays (Pvt) Ltd
              </p>
              <p style="margin: 0 0 6px; color: #D1D5DB;">
                Licensed National Tourist Guide Lecturers & Destination Specialists
              </p>
              <p style="margin: 0 0 12px; color: #9CA3AF;">
                Sri Lanka Tourism Development Authority (SLTDA) Certified
              </p>
              <p style="margin: 0; color: #6B7280;">
                Email: <a href="mailto:${COMPANY_EMAIL}" style="color: ${BRAND.secondary}; text-decoration: none;">${COMPANY_EMAIL}</a> · 
                WhatsApp: +${WHATSAPP_NUMBER} · 
                <a href="https://anthonyholidays.com" style="color: ${BRAND.secondary}; text-decoration: none;">anthonyholidays.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  return sendEmail({
    to: data.email,
    toName: data.fullName,
    subject,
    html,
    text: plainText,
    replyTo: COMPANY_EMAIL,
    replyToName: "Anthony Holidays Concierge",
  });
}

/**
 * 2. Admin notification sent to COMPANY_EMAIL when a new enquiry arrives
 */
export async function sendEnquiryNotification(data: EnquiryData): Promise<{ success: boolean; error?: string }> {
  const adults = Number(data.numberOfAdults || data.travellerCount || 2);
  const children = Number(data.numberOfChildren || 0);
  const tourName = data.selectedTour || data.selectedSpecialPackage || "Custom Journey Planning";

  const subject = `✨ New Journey Enquiry: ${data.fullName} (${data.country || "Intl Guest"})`;

  const plainText = `
New Journey Enquiry received on Anthony Holidays:
==================================================
Guest: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Country: ${data.country || "Not provided"}
Preferred Contact: ${data.contactPreference || "WhatsApp"}

Travel Plan:
- Selected Tour / Package: ${tourName}
- Party: ${adults} Adults, ${children} Children
- Dates: ${data.arrivalDate || "Flexible"} - ${data.departureDate || "Flexible"}
- Travel Pace: ${data.pace || "Not specified"}
- Budget Style: ${data.budgetTier || "Not specified"}

Interests:
${data.interests?.length ? data.interests.join(", ") : "None specified"}

Destinations:
${data.destinations?.length ? data.destinations.join(", ") : "None specified"}

Special Requests / Message:
${data.specialRequests || data.message || "None provided"}

Submission Time: ${new Date().toUTCString()}
`.trim();

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background: ${BRAND.cream}; padding: 24px; color: ${BRAND.textDark};">
  <div style="max-width: 600px; margin: 0 auto; background: ${BRAND.white}; border-radius: 4px; overflow: hidden; border: 1px solid ${BRAND.border};">
    <div style="background: ${BRAND.primary}; color: ${BRAND.white}; padding: 20px 24px;">
      <h2 style="margin: 0; color: ${BRAND.secondary}; font-family: Georgia, serif;">✨ New Website Enquiry</h2>
      <p style="margin: 4px 0 0; font-size: 14px; opacity: 0.9;">Lead: <strong>${data.fullName}</strong> (${data.country || "Global"})</p>
    </div>
    <div style="padding: 24px;">
      <h3 style="color: ${BRAND.primary}; margin-top: 0; font-size: 16px; border-bottom: 2px solid ${BRAND.cream}; padding-bottom: 6px;">Guest Contact</h3>
      <p style="margin: 6px 0;"><strong>Name:</strong> ${data.fullName}</p>
      <p style="margin: 6px 0;"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      <p style="margin: 6px 0;"><strong>Phone / WhatsApp:</strong> <a href="https://wa.me/${(data.phone || "").replace(/[^0-9]/g, "")}">${data.phone || "N/A"}</a></p>
      <p style="margin: 6px 0;"><strong>Country:</strong> ${data.country || "N/A"}</p>
      <p style="margin: 6px 0;"><strong>Preferred Contact:</strong> ${data.contactPreference || "WhatsApp"}</p>

      <h3 style="color: ${BRAND.primary}; margin: 20px 0 10px; font-size: 16px; border-bottom: 2px solid ${BRAND.cream}; padding-bottom: 6px;">Journey Specifications</h3>
      <p style="margin: 6px 0;"><strong>Tour / Experience:</strong> ${tourName}</p>
      <p style="margin: 6px 0;"><strong>Dates:</strong> ${data.arrivalDate || "Flexible"} &rarr; ${data.departureDate || "Flexible"}</p>
      <p style="margin: 6px 0;"><strong>Party:</strong> ${adults} Adults${children > 0 ? `, ${children} Children` : ""}</p>
      <p style="margin: 6px 0;"><strong>Pace:</strong> ${data.pace || "N/A"}</p>
      <p style="margin: 6px 0;"><strong>Budget:</strong> ${data.budgetTier || "N/A"}</p>

      ${
        data.interests?.length
          ? `<p style="margin: 6px 0;"><strong>Interests:</strong> ${data.interests.join(", ")}</p>`
          : ""
      }
      ${
        data.destinations?.length
          ? `<p style="margin: 6px 0;"><strong>Destinations:</strong> ${data.destinations.join(", ")}</p>`
          : ""
      }

      <h3 style="color: ${BRAND.primary}; margin: 20px 0 10px; font-size: 16px; border-bottom: 2px solid ${BRAND.cream}; padding-bottom: 6px;">Special Notes & Message</h3>
      <div style="background: ${BRAND.creamCard}; padding: 12px 16px; border-left: 3px solid ${BRAND.secondary}; font-size: 14px; white-space: pre-wrap;">
        ${data.specialRequests || data.message || "No special notes provided."}
      </div>

      <div style="margin-top: 24px; text-align: center;">
        <a href="mailto:${data.email}" style="display: inline-block; background: ${BRAND.primary}; color: ${BRAND.white}; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 14px;">
          Reply to ${data.fullName}
        </a>
      </div>
    </div>
  </div>
</body>
</html>
`.trim();

  const recipients = getCompanyEmails();
  const dispatches = await Promise.allSettled(
    recipients.map((targetEmail) =>
      sendEmail({
        to: targetEmail,
        toName: "Anthony Holidays Reservations",
        subject,
        html,
        text: plainText,
        replyTo: data.email,
        replyToName: data.fullName,
      })
    )
  );

  const hasSuccess = dispatches.some(
    (d) => d.status === "fulfilled" && d.value.success
  );
  return { success: hasSuccess };
}

/**
 * 3. Thank-You email sent to a visitor submitting the Contact Us form
 */
export async function sendContactThankYou(data: { name: string; email: string; subject?: string; message?: string }): Promise<{ success: boolean; error?: string }> {
  const subject = `Thank you for contacting Anthony Holidays, ${data.name}`;

  const plainText = `
Ayubowan ${data.name},

Thank you for reaching out to Anthony Holidays.

We have received your message regarding: "${data.subject || "General Enquiry"}".

Our team is reviewing your message and will respond promptly within 24 hours.

If your inquiry is urgent or you prefer to chat with us immediately, feel free to reach our concierge on WhatsApp at +${WHATSAPP_NUMBER}.

Warmest regards from Sri Lanka,
Anthony Holidays Team
Official Destination Management Company
https://anthonyholidays.com
`.trim();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background-color: ${BRAND.cream}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: ${BRAND.textDark}; line-height: 1.6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: ${BRAND.white}; border-radius: 4px; overflow: hidden; border: 1px solid ${BRAND.border};">
          <tr>
            <td style="background-color: ${BRAND.primary}; background: linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.dark} 100%); padding: 36px 32px; text-align: center; border-bottom: 3px solid ${BRAND.secondary};">
              <span style="font-family: Georgia, serif; font-size: 24px; font-weight: 700; letter-spacing: 2px; color: ${BRAND.secondary}; text-transform: uppercase;">
                ANTHONY HOLIDAYS
              </span>
              <p style="margin: 8px 0 0; color: ${BRAND.cream}; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; opacity: 0.9;">
                Authentic Sri Lanka · Expert-Led Journeys
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 36px 32px;">
              <h1 style="font-family: Georgia, serif; font-size: 22px; color: ${BRAND.primary}; margin: 0 0 16px;">
                Ayubowan, ${data.name}
              </h1>
              <p style="font-size: 15px; margin: 0 0 16px;">
                Thank you for getting in touch with Anthony Holidays. We have received your inquiry${data.subject ? ` regarding <em>"${data.subject}"</em>` : ""}.
              </p>
              <p style="font-size: 15px; margin: 0 0 20px;">
                One of our destination specialists will review your note and get back to you within <strong>24 hours</strong>.
              </p>

              <div style="background-color: ${BRAND.creamCard}; border-left: 3px solid ${BRAND.secondary}; padding: 16px 20px; margin: 24px 0; border-radius: 0 4px 4px 0;">
                <p style="margin: 0; font-size: 13px; color: ${BRAND.textMuted}; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Your Message</p>
                <p style="margin: 8px 0 0; font-size: 14px; color: ${BRAND.textDark}; white-space: pre-wrap;">${data.message || "Message received."}</p>
              </div>

              <p style="font-size: 14px; color: ${BRAND.textMuted}; margin: 24px 0 20px;">
                Have an urgent question or need immediate advice? Our concierge is available directly on WhatsApp:
              </p>

              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td align="center" style="background-color: ${BRAND.primary}; border-radius: 4px;">
                    <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" style="display: inline-block; padding: 12px 24px; font-size: 14px; color: ${BRAND.white}; text-decoration: none; font-weight: 600;">
                      Chat on WhatsApp &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color: ${BRAND.dark}; color: #9CA3AF; padding: 24px 32px; font-size: 12px; text-align: center; border-top: 1px solid ${BRAND.border};">
              <p style="color: ${BRAND.secondary}; font-weight: 600; font-size: 13px; margin: 0 0 4px;">
                Anthony Holidays (Pvt) Ltd
              </p>
              <p style="margin: 0; color: #6B7280;">
                Email: <a href="mailto:${COMPANY_EMAIL}" style="color: ${BRAND.secondary}; text-decoration: none;">${COMPANY_EMAIL}</a> · 
                <a href="https://anthonyholidays.com" style="color: ${BRAND.secondary}; text-decoration: none;">anthonyholidays.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  return sendEmail({
    to: data.email,
    toName: data.name,
    subject,
    html,
    text: plainText,
    replyTo: COMPANY_EMAIL,
    replyToName: "Anthony Holidays Concierge",
  });
}

/**
 * 4. Admin notification sent to COMPANY_EMAIL for contact form submissions
 */
export async function sendContactNotification(data: { name: string; email: string; subject?: string; message: string }): Promise<{ success: boolean; error?: string }> {
  const subject = `📩 New Contact Form Message: ${data.name} - ${data.subject || "General Note"}`;

  const plainText = `
New Contact Message on Anthony Holidays:
=========================================
Sender: ${data.name}
Email: ${data.email}
Subject: ${data.subject || "Not provided"}

Message:
${data.message}

Timestamp: ${new Date().toUTCString()}
`.trim();

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background: ${BRAND.cream}; padding: 24px; color: ${BRAND.textDark};">
  <div style="max-width: 600px; margin: 0 auto; background: ${BRAND.white}; border-radius: 4px; overflow: hidden; border: 1px solid ${BRAND.border};">
    <div style="background: ${BRAND.primary}; color: ${BRAND.white}; padding: 20px 24px;">
      <h2 style="margin: 0; color: ${BRAND.secondary}; font-family: Georgia, serif;">📩 New Contact Message</h2>
      <p style="margin: 4px 0 0; font-size: 14px; opacity: 0.9;">From: <strong>${data.name}</strong> (${data.email})</p>
    </div>
    <div style="padding: 24px;">
      <p style="margin: 6px 0;"><strong>Subject:</strong> ${data.subject || "General Enquiry"}</p>
      <p style="margin: 6px 0;"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      
      <h3 style="color: ${BRAND.primary}; margin: 20px 0 10px; font-size: 15px;">Message Content:</h3>
      <div style="background: ${BRAND.creamCard}; padding: 16px; border-left: 3px solid ${BRAND.secondary}; font-size: 14px; white-space: pre-wrap;">
        ${data.message}
      </div>

      <div style="margin-top: 24px; text-align: center;">
        <a href="mailto:${data.email}?subject=${encodeURIComponent(`Re: ${data.subject || "Your enquiry with Anthony Holidays"}`)}" style="display: inline-block; background: ${BRAND.primary}; color: ${BRAND.white}; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 14px;">
          Reply to ${data.name}
        </a>
      </div>
    </div>
  </div>
</body>
</html>
`.trim();

  const recipients = getCompanyEmails();
  const dispatches = await Promise.allSettled(
    recipients.map((targetEmail) =>
      sendEmail({
        to: targetEmail,
        toName: "Anthony Holidays Inquiries",
        subject,
        html,
        text: plainText,
        replyTo: data.email,
        replyToName: data.name,
      })
    )
  );

  const hasSuccess = dispatches.some(
    (d) => d.status === "fulfilled" && d.value.success
  );
  return { success: hasSuccess };
}
