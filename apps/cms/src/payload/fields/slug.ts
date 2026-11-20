import type { Field } from 'payload'

export const slugField = (): Field[] => [
  {
    name: 'slug',
    type: 'text',
    required: true,
    label: 'URL Slug',
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
      description: 'URL-friendly identifier. Auto-generate from title.',
    },
    hooks: {
      beforeValidate: [
        ({ value, siblingData }) => {
          if (!value && siblingData?.title) {
            return siblingData.title
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
              .trim()
          }
          return value
        },
      ],
    },
  },
]
