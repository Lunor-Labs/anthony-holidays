import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  labels: {
    singular: 'Team Member',
    plural: 'Team Members',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'role', 'isFounder', 'displayOrder', 'status'],
    description: 'Founder and professional guide team profiles.',
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
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Professional Role / Title',
      admin: {
        description: 'e.g. Founder & National Tourist Guide Lecturer, Senior Wildlife Specialist',
      },
    },
    {
      name: 'isFounder',
      type: 'checkbox',
      label: 'Founder Profile',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Check if this is the company founder (featured prominently).',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'published',
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
      name: 'displayOrder',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first.',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Photo',
    },
    {
      name: 'credentials',
      type: 'array',
      label: 'Credentials & Official Licences',
      fields: [
        {
          name: 'badge',
          type: 'text',
          required: true,
          label: 'Licence or Certification',
        },
      ],
    },
    {
      name: 'bio',
      type: 'richText',
      label: 'Biography & Experience',
      required: true,
    },
    {
      name: 'specialties',
      type: 'array',
      label: 'Specialist Areas',
      fields: [
        {
          name: 'area',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'languages',
      type: 'array',
      label: 'Languages Spoken',
      fields: [
        {
          name: 'language',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
