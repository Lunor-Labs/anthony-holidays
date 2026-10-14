import type { CollectionConfig } from "payload";

export const Inquiries: CollectionConfig = {
  slug: "inquiries",
  labels: {
    singular: "Inquiry",
    plural: "Inquiries",
  },
  admin: {
    useAsTitle: "fullName",
    group: "Administration",
    defaultColumns: ["fullName", "email", "arrivalDate", "status", "createdAt"],
    description: "Travel enquiries submitted through the website.",
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true, // Public can submit
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    // Status management
    {
      name: "status",
      type: "select",
      label: "Enquiry Status",
      defaultValue: "new",
      required: true,
      access: {
        create: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
      },
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Confirmed", value: "confirmed" },
        { label: "Planning", value: "planning" },
        { label: "Closed", value: "closed" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "internalNotes",
      type: "textarea",
      label: "Internal Notes",
      access: {
        create: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
      },
      admin: {
        position: "sidebar",
        description: "Private notes visible only to the team.",
      },
    },
    // Step 1: Traveller details
    {
      name: "fullName",
      type: "text",
      required: true,
      label: "Full Name",
    },
    {
      name: "email",
      type: "email",
      required: true,
      label: "Email Address",
    },
    {
      name: "country",
      type: "text",
      required: true,
      label: "Country of Residence",
    },
    {
      name: "phone",
      type: "text",
      label: "Phone / WhatsApp Number",
    },
    {
      name: "preferredContact",
      type: "select",
      label: "Preferred Contact Method",
      options: [
        { label: "Email", value: "email" },
        { label: "WhatsApp", value: "whatsapp" },
        { label: "Phone Call", value: "phone" },
      ],
    },
    // Step 2: Trip preferences
    {
      name: "arrivalDate",
      type: "date",
      label: "Arrival Date",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "departureDate",
      type: "date",
      label: "Departure Date",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "numberOfAdults",
      type: "number",
      label: "Number of Adults",
      min: 1,
      admin: {
        description: "Number of adult travellers (12+ years).",
      },
    },
    {
      name: "numberOfTravellers",
      type: "number",
      label: "Total Travellers",
      min: 1,
    },
    {
      name: "numberOfChildren",
      type: "number",
      label: "Number of Children",
      defaultValue: 0,
      min: 0,
    },
    {
      name: "preferredDestinations",
      type: "array",
      label: "Preferred Destinations",
      fields: [
        {
          name: "destination",
          type: "text",
          required: true,
          label: "Destination",
        },
      ],
    },
    {
      name: "travelInterests",
      type: "select",
      label: "Travel Interests",
      hasMany: true,
      options: [
        { label: "Culture & Heritage", value: "culture-heritage" },
        { label: "Wildlife & Nature", value: "wildlife-nature" },
        { label: "Beaches & Coastal", value: "beaches-coastal" },
        { label: "Hill Country & Tea", value: "hill-country-tea" },
        { label: "Adventure & Outdoor", value: "adventure-outdoor" },
        { label: "Food & Local Culture", value: "food-culture" },
        { label: "Private & Tailor-made", value: "private-tailormade" },
      ],
    },
    {
      name: "accommodationPreference",
      type: "select",
      label: "Accommodation Preference",
      options: [
        { label: "Luxury Boutique Hotels", value: "luxury-boutique" },
        { label: "Eco Lodges", value: "eco-lodges" },
        { label: "Heritage Villas", value: "heritage-villas" },
        { label: "Mid-range Hotels", value: "mid-range" },
        { label: "Mix of Styles", value: "mix" },
        { label: "No Preference", value: "no-preference" },
      ],
    },
    {
      name: "budgetPerPerson",
      type: "number",
      label: "Approximate Budget Per Person",
      min: 0,
    },
    {
      name: "budgetCurrency",
      type: "select",
      label: "Budget Currency",
      defaultValue: "USD",
      options: [
        { label: "USD ($)", value: "USD" },
        { label: "GBP (£)", value: "GBP" },
        { label: "EUR (€)", value: "EUR" },
        { label: "AUD ($)", value: "AUD" },
        { label: "CAD ($)", value: "CAD" },
      ],
    },
    {
      name: "travelPace",
      type: "select",
      label: "Preferred Travel Pace",
      options: [
        { label: "Relaxed - time to breathe", value: "relaxed" },
        { label: "Balanced - see a lot, not rushed", value: "balanced" },
        { label: "Active - packed days, maximum coverage", value: "active" },
      ],
    },
    // Step 3: Custom requirements
    {
      name: "selectedJourney",
      type: "relationship",
      relationTo: "journeys",
      label: "Selected Journey (if any)",
      admin: {
        description: "If the enquiry is about a specific journey.",
      },
    },
    {
      name: "selectedSpecialPackage",
      type: "relationship",
      relationTo: "special-packages",
      label: "Selected Special Package (if any)",
      admin: {
        description: "If the enquiry is about a specific special package.",
      },
    },
    {
      name: "message",
      type: "textarea",
      label: "Message / Special Requirements",
      admin: {
        description: "Primary message or bespoke requests from the traveller.",
      },
    },
    {
      name: "specialRequests",
      type: "textarea",
      label: "Special Requests (Dietary, Accessibility, etc.)",
    },
    {
      name: "additionalInfo",
      type: "textarea",
      label: "Additional Information",
    },
    // Consent
    {
      name: "privacyConsent",
      type: "checkbox",
      required: true,
      label: "Privacy Policy Consent",
      admin: {
        description: "Traveller agreed to the privacy policy.",
      },
    },
    {
      name: "submittedAt",
      type: "date",
      label: "Submission Date",
      access: {
        create: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
      },
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation, req }) => {
        if (operation === "create") {
          data.submittedAt = new Date().toISOString();
          // Security: Unauthenticated public submissions cannot set status or internal notes
          if (!req.user) {
            data.status = "new";
            delete data.internalNotes;
          }
        }
        return data;
      },
    ],
  },
};
