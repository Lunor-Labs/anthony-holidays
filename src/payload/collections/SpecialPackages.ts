import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { seoFields } from '../fields/seo'

export const SpecialPackages: CollectionConfig = {
  slug: 'special-packages',
  labels: {
    singular: 'Special Package',
    plural: 'Special Packages',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'category', 'status', 'featured', 'updatedAt'],
    description: 'Specialised travel packages including volunteering, regional immersions, budget, and adventure.',
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
      label: 'Package Title',
    },
    ...slugField(),
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Special Package Category',
      options: [
        { label: 'Volunteering Experience', value: 'volunteering' },
        { label: 'Hikkaduwa-Based Tourism', value: 'hikkaduwa' },
        { label: 'Customised Tour', value: 'customised' },
        { label: 'Budget-Based Tour', value: 'budget' },
        { label: 'Adventure Tour', value: 'adventure' },
        { label: 'Other Special Package', value: 'other' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
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
      label: 'Featured Package',
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
      label: 'Photo Gallery',
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
      label: 'Summary / Excerpt',
      admin: {
        description: 'Short overview displayed on package cards (max 250 characters).',
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
          label: 'Nights',
          min: 0,
        },
      ],
    },
    {
      name: 'activities',
      type: 'array',
      label: 'Key Activities & Experiences',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Activity Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Activity Description',
        },
      ],
    },
    {
      name: 'itinerary',
      type: 'array',
      label: 'Day-by-Day or Stage Itinerary',
      fields: [
        {
          name: 'day',
          type: 'number',
          required: true,
          label: 'Day / Stage Number',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Stage Title',
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Stage Description',
        },
      ],
    },
    {
      name: 'conditions',
      type: 'richText',
      label: 'Relevant Conditions & Requirements',
      admin: {
        description: 'Health requirements, minimum age, physical fitness, equipment needed, or volunteering code of conduct.',
      },
    },
    {
      name: 'inclusions',
      type: 'array',
      label: 'Included Services',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'exclusions',
      type: 'array',
      label: 'Excluded Services / Optional Extras',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      label: 'Pricing (Optional)',
      fields: [
        {
          name: 'showPrice',
          type: 'checkbox',
          label: 'Show Price Publicly',
          defaultValue: false,
        },
        {
          name: 'priceFrom',
          type: 'number',
          label: 'Price From',
          min: 0,
        },
        {
          name: 'currency',
          type: 'text',
          label: 'Currency (e.g. USD, EUR, GBP)',
          defaultValue: 'USD',
        },
        {
          name: 'pricingNote',
          type: 'text',
          label: 'Pricing Note (e.g. per person, double sharing)',
        },
      ],
    },
    ...seoFields(),
  ],
}
