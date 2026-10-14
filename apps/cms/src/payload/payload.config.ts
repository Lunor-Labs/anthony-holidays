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

const payloadSecret = process.env.PAYLOAD_SECRET;
if (!payloadSecret) {
  if (isProduction) {
    throw new Error(
      "CRITICAL SECURITY ERROR: PAYLOAD_SECRET is not defined. A cryptographically secure secret (32+ characters) is strictly required in production."
    );
  }
  console.warn(
    "⚠️ SECURITY WARNING: PAYLOAD_SECRET is not set in .env. Generate a secure 32+ character key for your environment."
  );
} else if (payloadSecret.length < 32 && isProduction) {
  throw new Error(
    "CRITICAL SECURITY ERROR: PAYLOAD_SECRET must be at least 32 characters long."
  );
}

const databaseUri = process.env.DATABASE_URI;
if (!databaseUri) {
  throw new Error(
    "CRITICAL CONFIGURATION ERROR: DATABASE_URI is missing. Please define DATABASE_URI in your .env file."
  );
}

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
  secret: payloadSecret || "dev-only-secret-do-not-use-in-production-min-32chars!",
  typescript: {
    outputFile: path.resolve(dirname, "../payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri,
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
