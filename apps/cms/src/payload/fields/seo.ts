import type { Field } from 'payload'

export const seoFields = (): Field[] => [
  {
    name: 'seo',
    type: 'group',
    label: 'SEO & Social Sharing',
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'SEO Title',
        admin: {
          description: 'Overrides page title in search results. Recommended: 50–60 characters.',
        },
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Meta Description',
        admin: {
          description: 'Search result description. Recommended: 150–160 characters.',
        },
      },
      {
        name: 'ogImage',
        type: 'upload',
        relationTo: 'media',
        label: 'Social Sharing Image (Open Graph)',
        admin: {
          description: 'Recommended: 1200×630px. Falls back to cover image.',
        },
      },
      {
        name: 'noIndex',
        type: 'checkbox',
        label: 'Exclude from Search Engines',
        defaultValue: false,
        admin: {
          description: 'Check to prevent this page from appearing in search results.',
        },
      },
    ],
  },
]
