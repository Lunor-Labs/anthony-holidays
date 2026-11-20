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
import { migrations } from "../migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const isProduction = process.env.NODE_ENV === "production";

const sanitizeOrigin = (url?: string): string =>
  url ? url.trim().replace(/\/+$/, "") : "";

const frontendUrl = sanitizeOrigin(process.env.FRONTEND_URL);
const backendUrl = sanitizeOrigin(process.env.BACKEND_URL);
const allowedOrigins = [frontendUrl, backendUrl].filter(Boolean);

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
          type: "image/svg+xml",
          url: "/icon.svg",
        },
        {
          rel: "icon",
          type: "image/x-icon",
          url: "/favicon.ico",
        },
      ],
    },
    components: {
      graphics: {
        Logo: "@/components/admin/Logo#Logo",
        Icon: "@/components/admin/Icon#Icon",
      },
      actions: ["@/components/admin/ViewFrontendButton#ViewFrontendButton"],
      afterNavLinks: ["@/components/admin/ViewFrontendNav#ViewFrontendNav"],
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
  serverURL: backendUrl || undefined,
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
    prodMigrations: migrations,
  }),
  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },
  cors: allowedOrigins,
  csrf: allowedOrigins,
});
