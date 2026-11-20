import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { seoFields } from '../fields/seo'

export const Journeys: CollectionConfig = {
  slug: 'journeys',
  labels: {
    singular: 'Tour Package',
    plural: 'Tour Packages',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'duration', 'status', 'featured', 'updatedAt'],
    description: 'Tour packages and travel itineraries published on /tours.',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { status: { equals: 'published' } }
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Tour Title',
    },
    ...slugField(),
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'draft',
      required: true,
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured on Homepage',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Cover Image',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Short Description',
      admin: {
        description: 'Brief description shown on listing cards (max 200 characters).',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Full Description',
      required: true,
    },
    {
      name: 'duration',
      type: 'group',
      label: 'Duration',
      fields: [
        {
          name: 'days',
          type: 'number',
          required: true,
          label: 'Days',
          min: 1,
        },
        {
          name: 'nights',
          type: 'number',
          required: true,
          label: 'Nights',
          min: 0,
        },
      ],
    },
    {
      name: 'destinations',
      type: 'text',
      hasMany: true,
      label: 'Destinations / Cities Visited',
      admin: {
        description: 'Enter names of visited destinations (e.g., Sigiriya, Kandy, Nuwara Eliya, Galle).',
      },
    },
    {
      name: 'categories',
      type: 'select',
      hasMany: true,
      label: 'Travel Styles & Themes',
      options: [
        { label: 'Cultural & Heritage Tours', value: 'cultural-heritage' },
        { label: 'Luxury Tours', value: 'luxury' },
        { label: 'Wildlife & Adventure Tours', value: 'wildlife-adventure' },
        { label: 'Romantic & Honeymoon Tours', value: 'honeymoon' },
        { label: 'Leisure Tours', value: 'leisure' },
        { label: 'Hill Country Tours', value: 'hill-country' },
        { label: 'Beach Tours', value: 'beach' },
        { label: 'Untouched', value: 'untouched' },
        { label: 'Pilgrimage Tours', value: 'pilgrimage' },
      ],
      admin: {
        description: 'Select travel style categories defined by Anthony Holidays.',
      },
    },
    {
      name: 'itinerary',
      type: 'array',
      label: 'Day-by-Day Itinerary',
      fields: [
        {
          name: 'day',
          type: 'number',
          required: true,
          label: 'Day Number',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Day Title',
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Day Description',
        },
        {
          name: 'locations',
          type: 'text',
          label: 'Locations Visited',
        },
        {
          name: 'accommodation',
          type: 'text',
          label: 'Accommodation',
        },
        {
          name: 'meals',
          type: 'text',
          label: 'Meals Included',
          admin: {
            description: 'e.g. Breakfast, Lunch, Dinner',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Day Image',
        },
      ],
    },
    {
      name: 'inclusions',
      type: 'array',
      label: 'What Is Included',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          label: 'Included Item',
        },
      ],
    },
    {
      name: 'exclusions',
      type: 'array',
      label: 'What Is Not Included',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          label: 'Excluded Item',
        },
      ],
    },
    {
      name: 'travelInfo',
      type: 'richText',
      label: 'Important Travel Information',
      admin: {
        description: 'Visa requirements, health advisories, packing tips, etc.',
      },
    },
    {
      name: 'accommodationDetails',
      type: 'textarea',
      label: 'Accommodation Details',
      admin: {
        description: 'Hotel categories, boutique properties, or specific accommodation arrangements.',
      },
    },
    {
      name: 'includedSites',
      type: 'array',
      label: 'Included Sites & Monuments',
      admin: {
        description: 'Sites where entrance or guided access is included in the package.',
      },
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'optionalSites',
      type: 'array',
      label: 'Optional Sites & Excursions',
      admin: {
        description: 'Recommended optional sites available at guest discretion.',
      },
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'transportDetails',
      type: 'text',
      label: 'Transport Arrangements',
      admin: {
        description: 'e.g. "Private air-conditioned luxury vehicle with dedicated English-speaking chauffeur guide"',
      },
    },
    {
      name: 'guideDetails',
      type: 'text',
      label: 'Guide or Driver Details',
      admin: {
        description: 'e.g. "Licensed National Tourist Guide Lecturer throughout the journey"',
      },
    },
    {
      name: 'insuranceInfo',
      type: 'text',
      label: 'Insurance Information',
      admin: {
        description: 'Travel insurance advisory (clearly states if excluded/recommended).',
      },
    },
    {
      name: 'visaInfo',
      type: 'text',
      label: 'Visa Information',
      admin: {
        description: 'Sri Lanka ETA visa requirements & instructions.',
      },
    },
    {
      name: 'airTicketInfo',
      type: 'text',
      label: 'Air-Ticket Information',
      admin: {
        description: 'International flights advisory (e.g. excluded, please book flights to Colombo CMB).',
      },
    },
    {
      name: 'pricing',
      type: 'group',
      label: 'Pricing (Optional)',
      admin: {
        description: 'Leave empty if not displaying prices publicly.',
      },
      fields: [
        {
          name: 'showPrice',
          type: 'checkbox',
          label: 'Show Starting Price',
          defaultValue: false,
        },
        {
          name: 'priceFrom',
          type: 'number',
          label: 'Starting Price (per person)',
          min: 0,
        },
        {
          name: 'currency',
          type: 'text',
          label: 'Currency',
          defaultValue: 'USD',
        },
        {
          name: 'pricingNote',
          type: 'text',
          label: 'Pricing Note',
          admin: {
            description: 'e.g. "per person, based on double occupancy"',
          },
        },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'Frequently Asked Questions',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Question',
        },
        {
          name: 'answer',
          type: 'richText',
          label: 'Answer',
        },
      ],
    },
    {
      name: 'relatedJourneys',
      type: 'relationship',
      relationTo: 'journeys',
      hasMany: true,
      label: 'Related Journeys',
      filterOptions: ({ id }) => ({
        id: { not_equals: id },
        status: { equals: 'published' },
      }),
    },
    ...seoFields(),
  ],
}
