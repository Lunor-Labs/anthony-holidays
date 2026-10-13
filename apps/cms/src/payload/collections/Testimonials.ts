import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  admin: {
    useAsTitle: 'guestName',
    group: 'Content',
    defaultColumns: ['guestName', 'country', 'rating', 'featured', 'status'],
    description: 'Guest testimonials and reviews.',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { status: { equals: 'published' } }
    },
    create: () => true, // Public can submit for moderation
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'guestName',
      type: 'text',
      required: true,
      label: 'Guest Name or Display Name',
      admin: {
        description: 'Use first name only or approved alias if guest prefers privacy.',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Moderation Status',
      defaultValue: 'pending',
      required: true,
      options: [
        { label: 'Pending Moderation', value: 'pending' },
        { label: 'Approved & Published', value: 'published' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Draft', value: 'draft' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Only reviews set to "Approved & Published" appear on the public website.',
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
      name: 'country',
      type: 'text',
      label: 'Country of Origin',
      admin: {
        description: 'Only include if guest has approved sharing their country.',
      },
    },
    {
      name: 'reviewText',
      type: 'textarea',
      required: true,
      label: 'Review Text',
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Rating',
      min: 1,
      max: 5,
      admin: {
        description: 'Verified rating out of 5. Only include verified ratings.',
      },
    },
    {
      name: 'tourName',
      type: 'text',
      label: 'Tour / Package Name',
      admin: {
        description: 'Name of the tour or package taken (if not selecting from the relation below).',
      },
    },
    {
      name: 'journey',
      type: 'relationship',
      relationTo: 'journeys',
      label: 'Journey Taken',
      admin: {
        description: 'Associate this testimonial with a specific journey.',
      },
    },
    {
      name: 'travelDate',
      type: 'date',
      label: 'Travel Date',
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
        },
      },
    },
    {
      name: 'submittedAt',
      type: 'date',
      label: 'Submission Timestamp',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Guest Photo (Optional)',
      admin: {
        description: 'Only upload if guest has explicitly approved use of their photo.',
      },
    },
  ],
}
