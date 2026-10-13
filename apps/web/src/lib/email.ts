import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "noreply@anthonyholidays.com";
const NOTIFICATION_EMAIL =
  process.env.ENQUIRY_NOTIFICATION_EMAIL || "info@anthonyholidays.com";

export interface EnquiryEmailData {
  fullName: string;
  email: string;
  country: string;
  phone?: string;
  preferredContact?: string;
  arrivalDate?: string;
  departureDate?: string;
  numberOfTravellers?: number;
  numberOfChildren?: number;
  preferredDestinations?: string[];
  travelInterests?: string[];
  accommodationPreference?: string;
  budgetPerPerson?: number;
  budgetCurrency?: string;
  travelPace?: string;
  selectedJourneyTitle?: string;
  specialRequests?: string;
  additionalInfo?: string;
}

const BRAND_PALETTE = {
  primary: "#1C3A2E",
  secondary: "#C9A84C",
  cream: "#F7F3EC",
  border: "#EDE8DF",
  textMuted: "#8A8070",
  textCharcoal: "#1A1A1A",
  white: "#FFFFFF",
};

export async function sendEnquiryNotification(
  data: EnquiryEmailData,
): Promise<void> {
  const subject = `New Enquiry from ${data.fullName} - Anthony Holidays`;

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: ${BRAND_PALETTE.cream}; padding: 40px;">
      <div style="background: ${BRAND_PALETTE.primary}; color: ${BRAND_PALETTE.cream}; padding: 24px; text-align: center; margin-bottom: 32px;">
        <h1 style="font-family: Georgia, serif; font-size: 24px; margin: 0; letter-spacing: 1px;">ANTHONY HOLIDAYS</h1>
        <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.8;">New Travel Enquiry</p>
      </div>
      
      <div style="background: ${BRAND_PALETTE.white}; padding: 32px; border-left: 3px solid ${BRAND_PALETTE.secondary};">
        <h2 style="color: ${BRAND_PALETTE.primary}; font-size: 20px; margin-top: 0;">Contact Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: ${BRAND_PALETTE.textMuted}; width: 200px;">Name</td><td style="padding: 6px 0; font-weight: bold;">${data.fullName}</td></tr>
          <tr><td style="padding: 6px 0; color: ${BRAND_PALETTE.textMuted};">Email</td><td style="padding: 6px 0;"><a href="mailto:${data.email}" style="color: ${BRAND_PALETTE.primary};">${data.email}</a></td></tr>
          <tr><td style="padding: 6px 0; color: ${BRAND_PALETTE.textMuted};">Country</td><td style="padding: 6px 0;">${data.country}</td></tr>
          ${data.phone ? `<tr><td style="padding: 6px 0; color: ${BRAND_PALETTE.textMuted};">Phone / WhatsApp</td><td style="padding: 6px 0;">${data.phone}</td></tr>` : ""}
          ${data.preferredContact ? `<tr><td style="padding: 6px 0; color: ${BRAND_PALETTE.textMuted};">Preferred Contact</td><td style="padding: 6px 0;">${data.preferredContact}</td></tr>` : ""}
        </table>
      </div>
      
      <div style="background: ${BRAND_PALETTE.white}; padding: 32px; margin-top: 16px; border-left: 3px solid ${BRAND_PALETTE.secondary};">
        <h2 style="color: ${BRAND_PALETTE.primary}; font-size: 20px; margin-top: 0;">Trip Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          ${data.arrivalDate ? `<tr><td style="padding: 6px 0; color: ${BRAND_PALETTE.textMuted}; width: 200px;">Arrival Date</td><td style="padding: 6px 0;">${data.arrivalDate}</td></tr>` : ""}
          ${data.departureDate ? `<tr><td style="padding: 6px 0; color: ${BRAND_PALETTE.textMuted};">Departure Date</td><td style="padding: 6px 0;">${data.departureDate}</td></tr>` : ""}
          ${data.numberOfTravellers ? `<tr><td style="padding: 6px 0; color: ${BRAND_PALETTE.textMuted};">Travellers</td><td style="padding: 6px 0;">${data.numberOfTravellers} adults${data.numberOfChildren ? `, ${data.numberOfChildren} children` : ""}</td></tr>` : ""}
          ${data.travelInterests?.length ? `<tr><td style="padding: 6px 0; color: ${BRAND_PALETTE.textMuted};">Interests</td><td style="padding: 6px 0;">${data.travelInterests.join(", ")}</td></tr>` : ""}
          ${data.accommodationPreference ? `<tr><td style="padding: 6px 0; color: ${BRAND_PALETTE.textMuted};">Accommodation</td><td style="padding: 6px 0;">${data.accommodationPreference}</td></tr>` : ""}
          ${data.budgetPerPerson ? `<tr><td style="padding: 6px 0; color: ${BRAND_PALETTE.textMuted};">Budget per Person</td><td style="padding: 6px 0;">${data.budgetCurrency || "USD"} ${data.budgetPerPerson.toLocaleString()}</td></tr>` : ""}
          ${data.travelPace ? `<tr><td style="padding: 6px 0; color: ${BRAND_PALETTE.textMuted};">Travel Pace</td><td style="padding: 6px 0;">${data.travelPace}</td></tr>` : ""}
          ${data.selectedJourneyTitle ? `<tr><td style="padding: 6px 0; color: ${BRAND_PALETTE.textMuted};">Selected Journey</td><td style="padding: 6px 0; font-weight: bold;">${data.selectedJourneyTitle}</td></tr>` : ""}
        </table>
        
        ${
          data.preferredDestinations?.length
            ? `
        <p style="color: ${BRAND_PALETTE.textMuted}; margin: 16px 0 6px;">Preferred Destinations</p>
        <p style="margin: 0;">${data.preferredDestinations.join(", ")}</p>
        `
            : ""
        }
        
        ${
          data.specialRequests
            ? `
        <p style="color: ${BRAND_PALETTE.textMuted}; margin: 16px 0 6px;">Special Requests</p>
        <p style="margin: 0; white-space: pre-wrap;">${data.specialRequests}</p>
        `
            : ""
        }
        
        ${
          data.additionalInfo
            ? `
        <p style="color: ${BRAND_PALETTE.textMuted}; margin: 16px 0 6px;">Additional Information</p>
        <p style="margin: 0; white-space: pre-wrap;">${data.additionalInfo}</p>
        `
            : ""
        }
      </div>
      
      <div style="text-align: center; margin-top: 32px; color: ${BRAND_PALETTE.textMuted}; font-size: 12px;">
        <p>Submitted via Anthony Holidays website</p>
      </div>
    </div>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: NOTIFICATION_EMAIL,
    subject,
    html,
    replyTo: data.email,
  });
}

export async function sendEnquiryConfirmation(
  data: EnquiryEmailData,
): Promise<void> {
  const subject = `We've received your enquiry - Anthony Holidays`;

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: ${BRAND_PALETTE.cream}; padding: 40px;">
      <div style="background: ${BRAND_PALETTE.primary}; color: ${BRAND_PALETTE.cream}; padding: 24px; text-align: center; margin-bottom: 32px;">
        <h1 style="font-family: Georgia, serif; font-size: 24px; margin: 0; letter-spacing: 1px;">ANTHONY HOLIDAYS</h1>
        <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.8;">Authentic Sri Lanka, Expert-Led Journeys</p>
      </div>
      
      <div style="background: ${BRAND_PALETTE.white}; padding: 32px;">
        <h2 style="color: ${BRAND_PALETTE.primary}; font-size: 22px; margin-top: 0;">Thank you, ${data.fullName}</h2>
        <p style="color: ${BRAND_PALETTE.textCharcoal}; line-height: 1.7;">We have received your travel enquiry and we're delighted by your interest in exploring Sri Lanka with Anthony Holidays.</p>
        <p style="color: ${BRAND_PALETTE.textCharcoal}; line-height: 1.7;">Our team will carefully review your requirements and get back to you within 24–48 hours with a personalised response.</p>
        
        <div style="background: ${BRAND_PALETTE.cream}; padding: 20px; margin: 24px 0; border-left: 3px solid ${BRAND_PALETTE.secondary};">
          <p style="margin: 0; font-style: italic; color: ${BRAND_PALETTE.primary};">"Sri Lanka is an island of extraordinary diversity - from ancient ruins to misty highlands, from golden beaches to rich wildlife. We look forward to helping you discover its magic."</p>
          <p style="margin: 12px 0 0; color: ${BRAND_PALETTE.textMuted}; font-size: 14px;">- Anthony Holidays Team</p>
        </div>
        
        <p style="color: ${BRAND_PALETTE.textCharcoal}; line-height: 1.7;">In the meantime, if you have any urgent questions, you are welcome to reach us via WhatsApp or email.</p>
        
        <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid ${BRAND_PALETTE.border};">
          <p style="color: ${BRAND_PALETTE.textMuted}; font-size: 14px; margin: 0;">Anthony Holidays</p>
          <p style="color: ${BRAND_PALETTE.textMuted}; font-size: 14px; margin: 4px 0;">Official Destination Management Company</p>
        </div>
      </div>
    </div>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject,
    html,
  });
}
