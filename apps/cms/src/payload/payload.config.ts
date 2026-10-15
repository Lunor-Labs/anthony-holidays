import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";
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

const isProduction = process.env.NODE_ENV === "production";


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
  serverURL:
    process.env.BACKEND_URL ||
    (!isProduction ? "http://localhost:3001" : undefined),
  globals: [SiteSettings],
  editor: lexicalEditor({}),
  sharp,
  secret:
    process.env.PAYLOAD_SECRET || "fallback-secret-min-32-chars-change-in-prod",
  typescript: {
    outputFile: path.resolve(dirname, "../payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    push: !isProduction,
  }),
  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },
  cors: [
    process.env.FRONTEND_URL,
    !isProduction ? "http://localhost:3000" : null,
    !isProduction ? "http://127.0.0.1:3000" : null,
  ].filter(Boolean) as string[],
  csrf: [
    process.env.FRONTEND_URL,
    !isProduction ? "http://localhost:3000" : null,
    !isProduction ? "http://127.0.0.1:3000" : null,
  ].filter(Boolean) as string[],
});
