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

    // ─── WebP auto-conversion ─────────────────────────────────────────────────
    // Every uploaded image (JPEG, PNG, AVIF, WebP) is re-encoded to WebP.
    // quality=82 is the visually-lossless sweet spot: ~60-70% smaller than JPEG.
    // SVGs are skipped automatically (sharp cannot process vector formats).
    formatOptions: {
      format: 'webp',
      options: {
        quality: 82,     // 0-100  — 80-85 is ideal for quality vs file-size
        effort: 4,       // 0-6   — encoding effort (4 = balanced speed/compression)
        lossless: false, // lossy WebP produces far smaller files with no visible loss
      },
    },

    // ─── Responsive sizes (also output as WebP via formatOptions) ─────────────
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        withoutEnlargement: true, // never upscale a small original
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

    // ─── Accepted source formats ──────────────────────────────────────────────
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
