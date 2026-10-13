import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { seoFields } from '../fields/seo'

export const JournalPosts: CollectionConfig = {
  slug: 'journal-posts',
  labels: {
    singular: 'Blog Article',
    plural: 'Blog Articles',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'author', 'publishedAt', 'status'],
    description: 'Articles, insights, and travel guides published on /blog.',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        status: { equals: 'published' },
      }
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Article Title',
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
      name: 'publishedAt',
      type: 'date',
      label: 'Publication Date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'author',
      type: 'text',
      label: 'Author Name',
      defaultValue: 'Anthony Holidays',
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
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Excerpt',
      admin: {
        description: 'Short summary shown on listing cards.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Article Content',
    },
    {
      name: 'categories',
      type: 'array',
      label: 'Categories',
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
          label: 'Category',
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
          label: 'Tag',
        },
      ],
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'journal-posts',
      hasMany: true,
      label: 'Related Articles',
      filterOptions: ({ id }) => ({
        id: { not_equals: id },
        status: { equals: 'published' },
      }),
    },
    {
      name: 'relatedJourneys',
      type: 'relationship',
      relationTo: 'journeys',
      hasMany: true,
      label: 'Related Journeys',
      filterOptions: {
        status: { equals: 'published' },
      },
    },
    ...seoFields(),
  ],
}
