import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Journeys } from "./collections/Journeys";
import { SpecialPackages } from "./collections/SpecialPackages";
import { Services } from "./collections/Services";
import { TeamMembers } from "./collections/TeamMembers";
import { JournalPosts } from "./collections/JournalPosts";
import { Testimonials } from "./collections/Testimonials";
import { Inquiries } from "./collections/Inquiries";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: "- Anthony Holidays Admin",
      icons: [
        {
          rel: "icon",
          type: "image/x-icon",
          url: "/favicon.ico",
        },
      ],
    },
  },
  collections: [
    Users,
    Media,
    Journeys,
    SpecialPackages,
    Services,
    TeamMembers,
    JournalPosts,
    Testimonials,
    Inquiries,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor({}),
  secret:
    process.env.PAYLOAD_SECRET || "fallback-secret-min-32-chars-change-in-prod",
  typescript: {
    outputFile: path.resolve(dirname, "../payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    push: process.env.NODE_ENV === "development",
  }),
  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },
  cors: [process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"].filter(
    Boolean,
  ),
  csrf: [process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"].filter(
    Boolean,
  ),
});
