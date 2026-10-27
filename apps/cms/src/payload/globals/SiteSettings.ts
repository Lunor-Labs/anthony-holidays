import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    group: "Administration",
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: "companyName",
      type: "text",
      label: "Company Name",
      defaultValue: "Anthony Holidays",
    },
    {
      name: "tagline",
      type: "text",
      label: "Site Tagline",
      defaultValue: "Authentic Sri Lanka, Expert-Led Journeys",
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      label: "Logo",
    },
    {
      name: "logoText",
      type: "text",
      label: "Logo Text (if no image)",
      defaultValue: "Anthony Holidays",
    },
    {
      name: "contact",
      type: "group",
      label: "Contact Information",
      fields: [
        {
          name: "email",
          type: "email",
          label: "Contact Email",
          // PLACEHOLDER: Replace with actual client email
        },
        {
          name: "phone",
          type: "text",
          label: "Phone Number",
          // PLACEHOLDER: Replace with actual phone number
        },
        {
          name: "whatsappNumber",
          type: "text",
          label: "WhatsApp Number",
          admin: {
            description:
              "Format: country code + number, no + or spaces (e.g. 94771234567)",
          },
          // PLACEHOLDER: Replace with actual WhatsApp number
        },
        {
          name: "address",
          type: "textarea",
          label: "Business Address",
          // PLACEHOLDER: Replace with actual address
        },
        {
          name: "googleMapsEmbedUrl",
          type: "text",
          label: "Google Maps Embed URL",
          admin: {
            description: "Embed iframe src URL for the office location or Sri Lanka destination pin. Leave empty to use default Sri Lanka map placeholder.",
          },
        },
      ],
    },
    {
      name: "socialLinks",
      type: "group",
      label: "Social Media Links",
      fields: [
        {
          name: "facebook",
          type: "text",
          label: "Facebook URL",
          defaultValue: "https://www.facebook.com/profile.php?id=61595480729179&mibextid=wwXIfr",
        },
        {
          name: "instagram",
          type: "text",
          label: "Instagram URL",
          defaultValue: "https://www.instagram.com/anthonyholidays?xtok=eHJpbjlpbXV6ajhr&utm_source=qr",
        },
        {
          name: "tiktok",
          type: "text",
          label: "TikTok URL",
          defaultValue: "https://www.tiktok.com/@anthony.holidays?_r=1&_t=ZS-9AtbNBLoa3g",
        },
        {
          name: "youtube",
          type: "text",
          label: "YouTube URL",
          defaultValue: "https://youtube.com/@anthonyholidays?si=tm5qd-em3zdhROQJ",
        },
        {
          name: "twitter",
          type: "text",
          label: "X / Twitter URL",
        },
        {
          name: "tripadvisor",
          type: "text",
          label: "TripAdvisor URL",
        },
      ],
    },
    {
      name: "enquiryNotificationEmail",
      type: "email",
      label: "Enquiry Notification Email",
      admin: {
        description: "Email address that receives new enquiry notifications.",
      },
    },
    {
      name: "seo",
      type: "group",
      label: "Default SEO Settings",
      fields: [
        {
          name: "defaultTitle",
          type: "text",
          label: "Default Page Title",
          defaultValue: "Anthony Holidays - Expert-Led Sri Lanka Journeys",
        },
        {
          name: "defaultDescription",
          type: "textarea",
          label: "Default Meta Description",
          defaultValue:
            "Discover Sri Lanka with Anthony Holidays - led by licensed national tourist guide lecturers. Tailor-made journeys, private tours, and authentic travel experiences.",
        },
        {
          name: "defaultOgImage",
          type: "upload",
          relationTo: "media",
          label: "Default Social Sharing Image",
        },
        {
          name: "googleSiteVerification",
          type: "text",
          label: "Google Site Verification Code",
        },
        {
          name: "googleAnalyticsId",
          type: "text",
          label: "Google Analytics 4 Measurement ID",
          admin: {
            description: "Format: G-XXXXXXXXXX. Enter when client provides Google Analytics 4 access.",
          },
        },
      ],
    },
    {
      name: "footerText",
      type: "textarea",
      label: "Footer About Text",
      defaultValue:
        "Anthony Holidays is a Sri Lankan destination management company led by licensed national tourist guide lecturers. We create authentic, personalised journeys across the island.",
    },
    {
      name: "registrationInfo",
      type: "text",
      label: "Registration / Licence Information",
      admin: {
        description:
          "PLACEHOLDER: Enter Sri Lanka Tourism Authority registration number when available.",
      },
    },
  ],
};
