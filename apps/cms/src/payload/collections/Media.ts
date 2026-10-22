import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  admin: {
    group: 'Content',
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize', 'updatedAt'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
      admin: {
        description: 'Descriptive text for accessibility and SEO.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
    },
  ],
  upload: {
    staticDir: 'public/media',

    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        withoutEnlargement: true,
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
        withoutEnlargement: true,
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
        withoutEnlargement: true,
      },
      {
        name: 'square',
        width: 600,
        height: 600,
        position: 'centre',
        withoutEnlargement: true,
      },
    ],

    adminThumbnail: 'thumbnail',

    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'image/gif',
      'image/svg+xml',
    ],
  },
}
