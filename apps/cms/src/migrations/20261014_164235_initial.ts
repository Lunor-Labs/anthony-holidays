import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_journeys_categories" AS ENUM('cultural-heritage', 'luxury', 'wildlife-adventure', 'honeymoon', 'leisure', 'hill-country', 'beach', 'untouched', 'pilgrimage');
  CREATE TYPE "public"."enum_journeys_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__journeys_v_version_categories" AS ENUM('cultural-heritage', 'luxury', 'wildlife-adventure', 'honeymoon', 'leisure', 'hill-country', 'beach', 'untouched', 'pilgrimage');
  CREATE TYPE "public"."enum__journeys_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_special_packages_category" AS ENUM('volunteering', 'hikkaduwa', 'customised', 'budget', 'adventure', 'other');
  CREATE TYPE "public"."enum_special_packages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__special_packages_v_version_category" AS ENUM('volunteering', 'hikkaduwa', 'customised', 'budget', 'adventure', 'other');
  CREATE TYPE "public"."enum__special_packages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum_team_members_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum_journal_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__journal_posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_testimonials_status" AS ENUM('pending', 'published', 'rejected', 'draft');
  CREATE TYPE "public"."enum_inquiries_travel_interests" AS ENUM('culture-heritage', 'wildlife-nature', 'beaches-coastal', 'hill-country-tea', 'adventure-outdoor', 'food-culture', 'private-tailormade');
  CREATE TYPE "public"."enum_inquiries_status" AS ENUM('new', 'contacted', 'confirmed', 'planning', 'closed');
  CREATE TYPE "public"."enum_inquiries_preferred_contact" AS ENUM('email', 'whatsapp', 'phone');
  CREATE TYPE "public"."enum_inquiries_accommodation_preference" AS ENUM('luxury-boutique', 'eco-lodges', 'heritage-villas', 'mid-range', 'mix', 'no-preference');
  CREATE TYPE "public"."enum_inquiries_budget_currency" AS ENUM('USD', 'GBP', 'EUR', 'AUD', 'CAD');
  CREATE TYPE "public"."enum_inquiries_travel_pace" AS ENUM('relaxed', 'balanced', 'active');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar,
  	"last_name" varchar,
  	"role" "enum_users_role" DEFAULT 'admin',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar
  );
  
  CREATE TABLE "journeys_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "journeys_categories" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_journeys_categories",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "journeys_itinerary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" numeric,
  	"title" varchar,
  	"description" jsonb,
  	"locations" varchar,
  	"accommodation" varchar,
  	"meals" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "journeys_inclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "journeys_exclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "journeys_included_sites" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "journeys_optional_sites" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "journeys_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "journeys" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"status" "enum_journeys_status" DEFAULT 'draft',
  	"featured" boolean DEFAULT false,
  	"cover_image_id" integer,
  	"excerpt" varchar,
  	"description" jsonb,
  	"duration_days" numeric,
  	"duration_nights" numeric,
  	"travel_info" jsonb,
  	"accommodation_details" varchar,
  	"transport_details" varchar,
  	"guide_details" varchar,
  	"insurance_info" varchar,
  	"visa_info" varchar,
  	"air_ticket_info" varchar,
  	"pricing_show_price" boolean DEFAULT false,
  	"pricing_price_from" numeric,
  	"pricing_currency" varchar DEFAULT 'USD',
  	"pricing_pricing_note" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_journeys_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "journeys_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "journeys_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"journeys_id" integer
  );
  
  CREATE TABLE "_journeys_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_journeys_v_version_categories" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__journeys_v_version_categories",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_journeys_v_version_itinerary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"day" numeric,
  	"title" varchar,
  	"description" jsonb,
  	"locations" varchar,
  	"accommodation" varchar,
  	"meals" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_journeys_v_version_inclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_journeys_v_version_exclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_journeys_v_version_included_sites" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_journeys_v_version_optional_sites" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_journeys_v_version_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_journeys_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_status" "enum__journeys_v_version_status" DEFAULT 'draft',
  	"version_featured" boolean DEFAULT false,
  	"version_cover_image_id" integer,
  	"version_excerpt" varchar,
  	"version_description" jsonb,
  	"version_duration_days" numeric,
  	"version_duration_nights" numeric,
  	"version_travel_info" jsonb,
  	"version_accommodation_details" varchar,
  	"version_transport_details" varchar,
  	"version_guide_details" varchar,
  	"version_insurance_info" varchar,
  	"version_visa_info" varchar,
  	"version_air_ticket_info" varchar,
  	"version_pricing_show_price" boolean DEFAULT false,
  	"version_pricing_price_from" numeric,
  	"version_pricing_currency" varchar DEFAULT 'USD',
  	"version_pricing_pricing_note" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__journeys_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_journeys_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_journeys_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"journeys_id" integer
  );
  
  CREATE TABLE "special_packages_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "special_packages_activities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "special_packages_itinerary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" numeric,
  	"title" varchar,
  	"description" jsonb
  );
  
  CREATE TABLE "special_packages_inclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "special_packages_exclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "special_packages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"category" "enum_special_packages_category",
  	"status" "enum_special_packages_status" DEFAULT 'draft',
  	"featured" boolean DEFAULT false,
  	"cover_image_id" integer,
  	"excerpt" varchar,
  	"description" jsonb,
  	"duration_days" numeric,
  	"duration_nights" numeric,
  	"conditions" jsonb,
  	"pricing_show_price" boolean DEFAULT false,
  	"pricing_price_from" numeric,
  	"pricing_currency" varchar DEFAULT 'USD',
  	"pricing_pricing_note" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_special_packages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_special_packages_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_special_packages_v_version_activities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_special_packages_v_version_itinerary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"day" numeric,
  	"title" varchar,
  	"description" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_special_packages_v_version_inclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_special_packages_v_version_exclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_special_packages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_category" "enum__special_packages_v_version_category",
  	"version_status" "enum__special_packages_v_version_status" DEFAULT 'draft',
  	"version_featured" boolean DEFAULT false,
  	"version_cover_image_id" integer,
  	"version_excerpt" varchar,
  	"version_description" jsonb,
  	"version_duration_days" numeric,
  	"version_duration_nights" numeric,
  	"version_conditions" jsonb,
  	"version_pricing_show_price" boolean DEFAULT false,
  	"version_pricing_price_from" numeric,
  	"version_pricing_currency" varchar DEFAULT 'USD',
  	"version_pricing_pricing_note" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__special_packages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "services_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"status" "enum_services_status" DEFAULT 'published' NOT NULL,
  	"display_order" numeric DEFAULT 0,
  	"short_description" varchar NOT NULL,
  	"description" jsonb NOT NULL,
  	"image_id" integer,
  	"icon_name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_members_credentials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar NOT NULL
  );
  
  CREATE TABLE "team_members_specialties" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"area" varchar NOT NULL
  );
  
  CREATE TABLE "team_members_languages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" varchar NOT NULL
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"is_founder" boolean DEFAULT false,
  	"status" "enum_team_members_status" DEFAULT 'published' NOT NULL,
  	"display_order" numeric DEFAULT 0,
  	"photo_id" integer,
  	"bio" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "journal_posts_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE "journal_posts_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "journal_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"status" "enum_journal_posts_status" DEFAULT 'draft',
  	"published_at" timestamp(3) with time zone,
  	"author" varchar DEFAULT 'Anthony Holidays',
  	"cover_image_id" integer,
  	"excerpt" varchar,
  	"content" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_journal_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "journal_posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"journal_posts_id" integer,
  	"journeys_id" integer
  );
  
  CREATE TABLE "_journal_posts_v_version_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_journal_posts_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_journal_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_status" "enum__journal_posts_v_version_status" DEFAULT 'draft',
  	"version_published_at" timestamp(3) with time zone,
  	"version_author" varchar DEFAULT 'Anthony Holidays',
  	"version_cover_image_id" integer,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__journal_posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_journal_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"journal_posts_id" integer,
  	"journeys_id" integer
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"guest_name" varchar NOT NULL,
  	"status" "enum_testimonials_status" DEFAULT 'pending' NOT NULL,
  	"featured" boolean DEFAULT false,
  	"country" varchar,
  	"review_text" varchar NOT NULL,
  	"rating" numeric,
  	"tour_name" varchar,
  	"journey_id" integer,
  	"travel_date" timestamp(3) with time zone,
  	"submitted_at" timestamp(3) with time zone,
  	"photo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "inquiries_preferred_destinations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"destination" varchar NOT NULL
  );
  
  CREATE TABLE "inquiries_travel_interests" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_inquiries_travel_interests",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "inquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_inquiries_status" DEFAULT 'new' NOT NULL,
  	"internal_notes" varchar,
  	"full_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"country" varchar NOT NULL,
  	"phone" varchar,
  	"preferred_contact" "enum_inquiries_preferred_contact",
  	"arrival_date" timestamp(3) with time zone,
  	"departure_date" timestamp(3) with time zone,
  	"number_of_adults" numeric,
  	"number_of_travellers" numeric,
  	"number_of_children" numeric DEFAULT 0,
  	"accommodation_preference" "enum_inquiries_accommodation_preference",
  	"budget_per_person" numeric,
  	"budget_currency" "enum_inquiries_budget_currency" DEFAULT 'USD',
  	"travel_pace" "enum_inquiries_travel_pace",
  	"selected_journey_id" integer,
  	"selected_special_package_id" integer,
  	"message" varchar,
  	"special_requests" varchar,
  	"additional_info" varchar,
  	"privacy_consent" boolean DEFAULT false NOT NULL,
  	"submitted_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"journeys_id" integer,
  	"special_packages_id" integer,
  	"services_id" integer,
  	"team_members_id" integer,
  	"journal_posts_id" integer,
  	"testimonials_id" integer,
  	"inquiries_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar DEFAULT 'Anthony Holidays',
  	"tagline" varchar DEFAULT 'Authentic Sri Lanka, Expert-Led Journeys',
  	"logo_id" integer,
  	"logo_text" varchar DEFAULT 'Anthony Holidays',
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"contact_whatsapp_number" varchar,
  	"contact_address" varchar,
  	"contact_google_maps_embed_url" varchar,
  	"social_links_facebook" varchar,
  	"social_links_instagram" varchar,
  	"social_links_twitter" varchar,
  	"social_links_youtube" varchar,
  	"social_links_tripadvisor" varchar,
  	"enquiry_notification_email" varchar,
  	"seo_default_title" varchar DEFAULT 'Anthony Holidays - Expert-Led Sri Lanka Journeys',
  	"seo_default_description" varchar DEFAULT 'Discover Sri Lanka with Anthony Holidays - led by licensed national tourist guide lecturers. Tailor-made journeys, private tours, and authentic travel experiences.',
  	"seo_default_og_image_id" integer,
  	"seo_google_site_verification" varchar,
  	"seo_google_analytics_id" varchar,
  	"footer_text" varchar DEFAULT 'Anthony Holidays is a Sri Lankan destination management company led by licensed national tourist guide lecturers. We create authentic, personalised journeys across the island.',
  	"registration_info" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_gallery" ADD CONSTRAINT "journeys_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journeys_gallery" ADD CONSTRAINT "journeys_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_categories" ADD CONSTRAINT "journeys_categories_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_itinerary" ADD CONSTRAINT "journeys_itinerary_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journeys_itinerary" ADD CONSTRAINT "journeys_itinerary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_inclusions" ADD CONSTRAINT "journeys_inclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_exclusions" ADD CONSTRAINT "journeys_exclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_included_sites" ADD CONSTRAINT "journeys_included_sites_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_optional_sites" ADD CONSTRAINT "journeys_optional_sites_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_faqs" ADD CONSTRAINT "journeys_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys" ADD CONSTRAINT "journeys_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journeys" ADD CONSTRAINT "journeys_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journeys_texts" ADD CONSTRAINT "journeys_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_rels" ADD CONSTRAINT "journeys_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_rels" ADD CONSTRAINT "journeys_rels_journeys_fk" FOREIGN KEY ("journeys_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_journeys_v_version_gallery" ADD CONSTRAINT "_journeys_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_journeys_v_version_gallery" ADD CONSTRAINT "_journeys_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_journeys_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_journeys_v_version_categories" ADD CONSTRAINT "_journeys_v_version_categories_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_journeys_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_journeys_v_version_itinerary" ADD CONSTRAINT "_journeys_v_version_itinerary_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_journeys_v_version_itinerary" ADD CONSTRAINT "_journeys_v_version_itinerary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_journeys_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_journeys_v_version_inclusions" ADD CONSTRAINT "_journeys_v_version_inclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_journeys_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_journeys_v_version_exclusions" ADD CONSTRAINT "_journeys_v_version_exclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_journeys_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_journeys_v_version_included_sites" ADD CONSTRAINT "_journeys_v_version_included_sites_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_journeys_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_journeys_v_version_optional_sites" ADD CONSTRAINT "_journeys_v_version_optional_sites_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_journeys_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_journeys_v_version_faqs" ADD CONSTRAINT "_journeys_v_version_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_journeys_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_journeys_v" ADD CONSTRAINT "_journeys_v_parent_id_journeys_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."journeys"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_journeys_v" ADD CONSTRAINT "_journeys_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_journeys_v" ADD CONSTRAINT "_journeys_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_journeys_v_texts" ADD CONSTRAINT "_journeys_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_journeys_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_journeys_v_rels" ADD CONSTRAINT "_journeys_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_journeys_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_journeys_v_rels" ADD CONSTRAINT "_journeys_v_rels_journeys_fk" FOREIGN KEY ("journeys_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "special_packages_gallery" ADD CONSTRAINT "special_packages_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "special_packages_gallery" ADD CONSTRAINT "special_packages_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."special_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "special_packages_activities" ADD CONSTRAINT "special_packages_activities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."special_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "special_packages_itinerary" ADD CONSTRAINT "special_packages_itinerary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."special_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "special_packages_inclusions" ADD CONSTRAINT "special_packages_inclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."special_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "special_packages_exclusions" ADD CONSTRAINT "special_packages_exclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."special_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "special_packages" ADD CONSTRAINT "special_packages_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "special_packages" ADD CONSTRAINT "special_packages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_special_packages_v_version_gallery" ADD CONSTRAINT "_special_packages_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_special_packages_v_version_gallery" ADD CONSTRAINT "_special_packages_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_special_packages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_special_packages_v_version_activities" ADD CONSTRAINT "_special_packages_v_version_activities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_special_packages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_special_packages_v_version_itinerary" ADD CONSTRAINT "_special_packages_v_version_itinerary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_special_packages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_special_packages_v_version_inclusions" ADD CONSTRAINT "_special_packages_v_version_inclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_special_packages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_special_packages_v_version_exclusions" ADD CONSTRAINT "_special_packages_v_version_exclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_special_packages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_special_packages_v" ADD CONSTRAINT "_special_packages_v_parent_id_special_packages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."special_packages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_special_packages_v" ADD CONSTRAINT "_special_packages_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_special_packages_v" ADD CONSTRAINT "_special_packages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_highlights" ADD CONSTRAINT "services_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members_credentials" ADD CONSTRAINT "team_members_credentials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members_specialties" ADD CONSTRAINT "team_members_specialties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members_languages" ADD CONSTRAINT "team_members_languages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journal_posts_categories" ADD CONSTRAINT "journal_posts_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journal_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journal_posts_tags" ADD CONSTRAINT "journal_posts_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journal_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journal_posts" ADD CONSTRAINT "journal_posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journal_posts" ADD CONSTRAINT "journal_posts_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journal_posts_rels" ADD CONSTRAINT "journal_posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."journal_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journal_posts_rels" ADD CONSTRAINT "journal_posts_rels_journal_posts_fk" FOREIGN KEY ("journal_posts_id") REFERENCES "public"."journal_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journal_posts_rels" ADD CONSTRAINT "journal_posts_rels_journeys_fk" FOREIGN KEY ("journeys_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_journal_posts_v_version_categories" ADD CONSTRAINT "_journal_posts_v_version_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_journal_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_journal_posts_v_version_tags" ADD CONSTRAINT "_journal_posts_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_journal_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_journal_posts_v" ADD CONSTRAINT "_journal_posts_v_parent_id_journal_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."journal_posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_journal_posts_v" ADD CONSTRAINT "_journal_posts_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_journal_posts_v" ADD CONSTRAINT "_journal_posts_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_journal_posts_v_rels" ADD CONSTRAINT "_journal_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_journal_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_journal_posts_v_rels" ADD CONSTRAINT "_journal_posts_v_rels_journal_posts_fk" FOREIGN KEY ("journal_posts_id") REFERENCES "public"."journal_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_journal_posts_v_rels" ADD CONSTRAINT "_journal_posts_v_rels_journeys_fk" FOREIGN KEY ("journeys_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_journey_id_journeys_id_fk" FOREIGN KEY ("journey_id") REFERENCES "public"."journeys"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "inquiries_preferred_destinations" ADD CONSTRAINT "inquiries_preferred_destinations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "inquiries_travel_interests" ADD CONSTRAINT "inquiries_travel_interests_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_selected_journey_id_journeys_id_fk" FOREIGN KEY ("selected_journey_id") REFERENCES "public"."journeys"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_selected_special_package_id_special_packages_id_fk" FOREIGN KEY ("selected_special_package_id") REFERENCES "public"."special_packages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_journeys_fk" FOREIGN KEY ("journeys_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_special_packages_fk" FOREIGN KEY ("special_packages_id") REFERENCES "public"."special_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_journal_posts_fk" FOREIGN KEY ("journal_posts_id") REFERENCES "public"."journal_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_inquiries_fk" FOREIGN KEY ("inquiries_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_default_og_image_id_media_id_fk" FOREIGN KEY ("seo_default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "journeys_gallery_order_idx" ON "journeys_gallery" USING btree ("_order");
  CREATE INDEX "journeys_gallery_parent_id_idx" ON "journeys_gallery" USING btree ("_parent_id");
  CREATE INDEX "journeys_gallery_image_idx" ON "journeys_gallery" USING btree ("image_id");
  CREATE INDEX "journeys_categories_order_idx" ON "journeys_categories" USING btree ("order");
  CREATE INDEX "journeys_categories_parent_idx" ON "journeys_categories" USING btree ("parent_id");
  CREATE INDEX "journeys_itinerary_order_idx" ON "journeys_itinerary" USING btree ("_order");
  CREATE INDEX "journeys_itinerary_parent_id_idx" ON "journeys_itinerary" USING btree ("_parent_id");
  CREATE INDEX "journeys_itinerary_image_idx" ON "journeys_itinerary" USING btree ("image_id");
  CREATE INDEX "journeys_inclusions_order_idx" ON "journeys_inclusions" USING btree ("_order");
  CREATE INDEX "journeys_inclusions_parent_id_idx" ON "journeys_inclusions" USING btree ("_parent_id");
  CREATE INDEX "journeys_exclusions_order_idx" ON "journeys_exclusions" USING btree ("_order");
  CREATE INDEX "journeys_exclusions_parent_id_idx" ON "journeys_exclusions" USING btree ("_parent_id");
  CREATE INDEX "journeys_included_sites_order_idx" ON "journeys_included_sites" USING btree ("_order");
  CREATE INDEX "journeys_included_sites_parent_id_idx" ON "journeys_included_sites" USING btree ("_parent_id");
  CREATE INDEX "journeys_optional_sites_order_idx" ON "journeys_optional_sites" USING btree ("_order");
  CREATE INDEX "journeys_optional_sites_parent_id_idx" ON "journeys_optional_sites" USING btree ("_parent_id");
  CREATE INDEX "journeys_faqs_order_idx" ON "journeys_faqs" USING btree ("_order");
  CREATE INDEX "journeys_faqs_parent_id_idx" ON "journeys_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "journeys_slug_idx" ON "journeys" USING btree ("slug");
  CREATE INDEX "journeys_cover_image_idx" ON "journeys" USING btree ("cover_image_id");
  CREATE INDEX "journeys_seo_seo_og_image_idx" ON "journeys" USING btree ("seo_og_image_id");
  CREATE INDEX "journeys_updated_at_idx" ON "journeys" USING btree ("updated_at");
  CREATE INDEX "journeys_created_at_idx" ON "journeys" USING btree ("created_at");
  CREATE INDEX "journeys__status_idx" ON "journeys" USING btree ("_status");
  CREATE INDEX "journeys_texts_order_parent" ON "journeys_texts" USING btree ("order","parent_id");
  CREATE INDEX "journeys_rels_order_idx" ON "journeys_rels" USING btree ("order");
  CREATE INDEX "journeys_rels_parent_idx" ON "journeys_rels" USING btree ("parent_id");
  CREATE INDEX "journeys_rels_path_idx" ON "journeys_rels" USING btree ("path");
  CREATE INDEX "journeys_rels_journeys_id_idx" ON "journeys_rels" USING btree ("journeys_id");
  CREATE INDEX "_journeys_v_version_gallery_order_idx" ON "_journeys_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_journeys_v_version_gallery_parent_id_idx" ON "_journeys_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_journeys_v_version_gallery_image_idx" ON "_journeys_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_journeys_v_version_categories_order_idx" ON "_journeys_v_version_categories" USING btree ("order");
  CREATE INDEX "_journeys_v_version_categories_parent_idx" ON "_journeys_v_version_categories" USING btree ("parent_id");
  CREATE INDEX "_journeys_v_version_itinerary_order_idx" ON "_journeys_v_version_itinerary" USING btree ("_order");
  CREATE INDEX "_journeys_v_version_itinerary_parent_id_idx" ON "_journeys_v_version_itinerary" USING btree ("_parent_id");
  CREATE INDEX "_journeys_v_version_itinerary_image_idx" ON "_journeys_v_version_itinerary" USING btree ("image_id");
  CREATE INDEX "_journeys_v_version_inclusions_order_idx" ON "_journeys_v_version_inclusions" USING btree ("_order");
  CREATE INDEX "_journeys_v_version_inclusions_parent_id_idx" ON "_journeys_v_version_inclusions" USING btree ("_parent_id");
  CREATE INDEX "_journeys_v_version_exclusions_order_idx" ON "_journeys_v_version_exclusions" USING btree ("_order");
  CREATE INDEX "_journeys_v_version_exclusions_parent_id_idx" ON "_journeys_v_version_exclusions" USING btree ("_parent_id");
  CREATE INDEX "_journeys_v_version_included_sites_order_idx" ON "_journeys_v_version_included_sites" USING btree ("_order");
  CREATE INDEX "_journeys_v_version_included_sites_parent_id_idx" ON "_journeys_v_version_included_sites" USING btree ("_parent_id");
  CREATE INDEX "_journeys_v_version_optional_sites_order_idx" ON "_journeys_v_version_optional_sites" USING btree ("_order");
  CREATE INDEX "_journeys_v_version_optional_sites_parent_id_idx" ON "_journeys_v_version_optional_sites" USING btree ("_parent_id");
  CREATE INDEX "_journeys_v_version_faqs_order_idx" ON "_journeys_v_version_faqs" USING btree ("_order");
  CREATE INDEX "_journeys_v_version_faqs_parent_id_idx" ON "_journeys_v_version_faqs" USING btree ("_parent_id");
  CREATE INDEX "_journeys_v_parent_idx" ON "_journeys_v" USING btree ("parent_id");
  CREATE INDEX "_journeys_v_version_version_slug_idx" ON "_journeys_v" USING btree ("version_slug");
  CREATE INDEX "_journeys_v_version_version_cover_image_idx" ON "_journeys_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_journeys_v_version_seo_version_seo_og_image_idx" ON "_journeys_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_journeys_v_version_version_updated_at_idx" ON "_journeys_v" USING btree ("version_updated_at");
  CREATE INDEX "_journeys_v_version_version_created_at_idx" ON "_journeys_v" USING btree ("version_created_at");
  CREATE INDEX "_journeys_v_version_version__status_idx" ON "_journeys_v" USING btree ("version__status");
  CREATE INDEX "_journeys_v_created_at_idx" ON "_journeys_v" USING btree ("created_at");
  CREATE INDEX "_journeys_v_updated_at_idx" ON "_journeys_v" USING btree ("updated_at");
  CREATE INDEX "_journeys_v_latest_idx" ON "_journeys_v" USING btree ("latest");
  CREATE INDEX "_journeys_v_autosave_idx" ON "_journeys_v" USING btree ("autosave");
  CREATE INDEX "_journeys_v_texts_order_parent" ON "_journeys_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_journeys_v_rels_order_idx" ON "_journeys_v_rels" USING btree ("order");
  CREATE INDEX "_journeys_v_rels_parent_idx" ON "_journeys_v_rels" USING btree ("parent_id");
  CREATE INDEX "_journeys_v_rels_path_idx" ON "_journeys_v_rels" USING btree ("path");
  CREATE INDEX "_journeys_v_rels_journeys_id_idx" ON "_journeys_v_rels" USING btree ("journeys_id");
  CREATE INDEX "special_packages_gallery_order_idx" ON "special_packages_gallery" USING btree ("_order");
  CREATE INDEX "special_packages_gallery_parent_id_idx" ON "special_packages_gallery" USING btree ("_parent_id");
  CREATE INDEX "special_packages_gallery_image_idx" ON "special_packages_gallery" USING btree ("image_id");
  CREATE INDEX "special_packages_activities_order_idx" ON "special_packages_activities" USING btree ("_order");
  CREATE INDEX "special_packages_activities_parent_id_idx" ON "special_packages_activities" USING btree ("_parent_id");
  CREATE INDEX "special_packages_itinerary_order_idx" ON "special_packages_itinerary" USING btree ("_order");
  CREATE INDEX "special_packages_itinerary_parent_id_idx" ON "special_packages_itinerary" USING btree ("_parent_id");
  CREATE INDEX "special_packages_inclusions_order_idx" ON "special_packages_inclusions" USING btree ("_order");
  CREATE INDEX "special_packages_inclusions_parent_id_idx" ON "special_packages_inclusions" USING btree ("_parent_id");
  CREATE INDEX "special_packages_exclusions_order_idx" ON "special_packages_exclusions" USING btree ("_order");
  CREATE INDEX "special_packages_exclusions_parent_id_idx" ON "special_packages_exclusions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "special_packages_slug_idx" ON "special_packages" USING btree ("slug");
  CREATE INDEX "special_packages_cover_image_idx" ON "special_packages" USING btree ("cover_image_id");
  CREATE INDEX "special_packages_seo_seo_og_image_idx" ON "special_packages" USING btree ("seo_og_image_id");
  CREATE INDEX "special_packages_updated_at_idx" ON "special_packages" USING btree ("updated_at");
  CREATE INDEX "special_packages_created_at_idx" ON "special_packages" USING btree ("created_at");
  CREATE INDEX "special_packages__status_idx" ON "special_packages" USING btree ("_status");
  CREATE INDEX "_special_packages_v_version_gallery_order_idx" ON "_special_packages_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_special_packages_v_version_gallery_parent_id_idx" ON "_special_packages_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_special_packages_v_version_gallery_image_idx" ON "_special_packages_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_special_packages_v_version_activities_order_idx" ON "_special_packages_v_version_activities" USING btree ("_order");
  CREATE INDEX "_special_packages_v_version_activities_parent_id_idx" ON "_special_packages_v_version_activities" USING btree ("_parent_id");
  CREATE INDEX "_special_packages_v_version_itinerary_order_idx" ON "_special_packages_v_version_itinerary" USING btree ("_order");
  CREATE INDEX "_special_packages_v_version_itinerary_parent_id_idx" ON "_special_packages_v_version_itinerary" USING btree ("_parent_id");
  CREATE INDEX "_special_packages_v_version_inclusions_order_idx" ON "_special_packages_v_version_inclusions" USING btree ("_order");
  CREATE INDEX "_special_packages_v_version_inclusions_parent_id_idx" ON "_special_packages_v_version_inclusions" USING btree ("_parent_id");
  CREATE INDEX "_special_packages_v_version_exclusions_order_idx" ON "_special_packages_v_version_exclusions" USING btree ("_order");
  CREATE INDEX "_special_packages_v_version_exclusions_parent_id_idx" ON "_special_packages_v_version_exclusions" USING btree ("_parent_id");
  CREATE INDEX "_special_packages_v_parent_idx" ON "_special_packages_v" USING btree ("parent_id");
  CREATE INDEX "_special_packages_v_version_version_slug_idx" ON "_special_packages_v" USING btree ("version_slug");
  CREATE INDEX "_special_packages_v_version_version_cover_image_idx" ON "_special_packages_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_special_packages_v_version_seo_version_seo_og_image_idx" ON "_special_packages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_special_packages_v_version_version_updated_at_idx" ON "_special_packages_v" USING btree ("version_updated_at");
  CREATE INDEX "_special_packages_v_version_version_created_at_idx" ON "_special_packages_v" USING btree ("version_created_at");
  CREATE INDEX "_special_packages_v_version_version__status_idx" ON "_special_packages_v" USING btree ("version__status");
  CREATE INDEX "_special_packages_v_created_at_idx" ON "_special_packages_v" USING btree ("created_at");
  CREATE INDEX "_special_packages_v_updated_at_idx" ON "_special_packages_v" USING btree ("updated_at");
  CREATE INDEX "_special_packages_v_latest_idx" ON "_special_packages_v" USING btree ("latest");
  CREATE INDEX "_special_packages_v_autosave_idx" ON "_special_packages_v" USING btree ("autosave");
  CREATE INDEX "services_highlights_order_idx" ON "services_highlights" USING btree ("_order");
  CREATE INDEX "services_highlights_parent_id_idx" ON "services_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_image_idx" ON "services" USING btree ("image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "team_members_credentials_order_idx" ON "team_members_credentials" USING btree ("_order");
  CREATE INDEX "team_members_credentials_parent_id_idx" ON "team_members_credentials" USING btree ("_parent_id");
  CREATE INDEX "team_members_specialties_order_idx" ON "team_members_specialties" USING btree ("_order");
  CREATE INDEX "team_members_specialties_parent_id_idx" ON "team_members_specialties" USING btree ("_parent_id");
  CREATE INDEX "team_members_languages_order_idx" ON "team_members_languages" USING btree ("_order");
  CREATE INDEX "team_members_languages_parent_id_idx" ON "team_members_languages" USING btree ("_parent_id");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE INDEX "journal_posts_categories_order_idx" ON "journal_posts_categories" USING btree ("_order");
  CREATE INDEX "journal_posts_categories_parent_id_idx" ON "journal_posts_categories" USING btree ("_parent_id");
  CREATE INDEX "journal_posts_tags_order_idx" ON "journal_posts_tags" USING btree ("_order");
  CREATE INDEX "journal_posts_tags_parent_id_idx" ON "journal_posts_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "journal_posts_slug_idx" ON "journal_posts" USING btree ("slug");
  CREATE INDEX "journal_posts_cover_image_idx" ON "journal_posts" USING btree ("cover_image_id");
  CREATE INDEX "journal_posts_seo_seo_og_image_idx" ON "journal_posts" USING btree ("seo_og_image_id");
  CREATE INDEX "journal_posts_updated_at_idx" ON "journal_posts" USING btree ("updated_at");
  CREATE INDEX "journal_posts_created_at_idx" ON "journal_posts" USING btree ("created_at");
  CREATE INDEX "journal_posts__status_idx" ON "journal_posts" USING btree ("_status");
  CREATE INDEX "journal_posts_rels_order_idx" ON "journal_posts_rels" USING btree ("order");
  CREATE INDEX "journal_posts_rels_parent_idx" ON "journal_posts_rels" USING btree ("parent_id");
  CREATE INDEX "journal_posts_rels_path_idx" ON "journal_posts_rels" USING btree ("path");
  CREATE INDEX "journal_posts_rels_journal_posts_id_idx" ON "journal_posts_rels" USING btree ("journal_posts_id");
  CREATE INDEX "journal_posts_rels_journeys_id_idx" ON "journal_posts_rels" USING btree ("journeys_id");
  CREATE INDEX "_journal_posts_v_version_categories_order_idx" ON "_journal_posts_v_version_categories" USING btree ("_order");
  CREATE INDEX "_journal_posts_v_version_categories_parent_id_idx" ON "_journal_posts_v_version_categories" USING btree ("_parent_id");
  CREATE INDEX "_journal_posts_v_version_tags_order_idx" ON "_journal_posts_v_version_tags" USING btree ("_order");
  CREATE INDEX "_journal_posts_v_version_tags_parent_id_idx" ON "_journal_posts_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_journal_posts_v_parent_idx" ON "_journal_posts_v" USING btree ("parent_id");
  CREATE INDEX "_journal_posts_v_version_version_slug_idx" ON "_journal_posts_v" USING btree ("version_slug");
  CREATE INDEX "_journal_posts_v_version_version_cover_image_idx" ON "_journal_posts_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_journal_posts_v_version_seo_version_seo_og_image_idx" ON "_journal_posts_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_journal_posts_v_version_version_updated_at_idx" ON "_journal_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_journal_posts_v_version_version_created_at_idx" ON "_journal_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_journal_posts_v_version_version__status_idx" ON "_journal_posts_v" USING btree ("version__status");
  CREATE INDEX "_journal_posts_v_created_at_idx" ON "_journal_posts_v" USING btree ("created_at");
  CREATE INDEX "_journal_posts_v_updated_at_idx" ON "_journal_posts_v" USING btree ("updated_at");
  CREATE INDEX "_journal_posts_v_latest_idx" ON "_journal_posts_v" USING btree ("latest");
  CREATE INDEX "_journal_posts_v_autosave_idx" ON "_journal_posts_v" USING btree ("autosave");
  CREATE INDEX "_journal_posts_v_rels_order_idx" ON "_journal_posts_v_rels" USING btree ("order");
  CREATE INDEX "_journal_posts_v_rels_parent_idx" ON "_journal_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_journal_posts_v_rels_path_idx" ON "_journal_posts_v_rels" USING btree ("path");
  CREATE INDEX "_journal_posts_v_rels_journal_posts_id_idx" ON "_journal_posts_v_rels" USING btree ("journal_posts_id");
  CREATE INDEX "_journal_posts_v_rels_journeys_id_idx" ON "_journal_posts_v_rels" USING btree ("journeys_id");
  CREATE INDEX "testimonials_journey_idx" ON "testimonials" USING btree ("journey_id");
  CREATE INDEX "testimonials_photo_idx" ON "testimonials" USING btree ("photo_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "inquiries_preferred_destinations_order_idx" ON "inquiries_preferred_destinations" USING btree ("_order");
  CREATE INDEX "inquiries_preferred_destinations_parent_id_idx" ON "inquiries_preferred_destinations" USING btree ("_parent_id");
  CREATE INDEX "inquiries_travel_interests_order_idx" ON "inquiries_travel_interests" USING btree ("order");
  CREATE INDEX "inquiries_travel_interests_parent_idx" ON "inquiries_travel_interests" USING btree ("parent_id");
  CREATE INDEX "inquiries_selected_journey_idx" ON "inquiries" USING btree ("selected_journey_id");
  CREATE INDEX "inquiries_selected_special_package_idx" ON "inquiries" USING btree ("selected_special_package_id");
  CREATE INDEX "inquiries_updated_at_idx" ON "inquiries" USING btree ("updated_at");
  CREATE INDEX "inquiries_created_at_idx" ON "inquiries" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_journeys_id_idx" ON "payload_locked_documents_rels" USING btree ("journeys_id");
  CREATE INDEX "payload_locked_documents_rels_special_packages_id_idx" ON "payload_locked_documents_rels" USING btree ("special_packages_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_journal_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("journal_posts_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_inquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("inquiries_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_seo_seo_default_og_image_idx" ON "site_settings" USING btree ("seo_default_og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "journeys_gallery" CASCADE;
  DROP TABLE "journeys_categories" CASCADE;
  DROP TABLE "journeys_itinerary" CASCADE;
  DROP TABLE "journeys_inclusions" CASCADE;
  DROP TABLE "journeys_exclusions" CASCADE;
  DROP TABLE "journeys_included_sites" CASCADE;
  DROP TABLE "journeys_optional_sites" CASCADE;
  DROP TABLE "journeys_faqs" CASCADE;
  DROP TABLE "journeys" CASCADE;
  DROP TABLE "journeys_texts" CASCADE;
  DROP TABLE "journeys_rels" CASCADE;
  DROP TABLE "_journeys_v_version_gallery" CASCADE;
  DROP TABLE "_journeys_v_version_categories" CASCADE;
  DROP TABLE "_journeys_v_version_itinerary" CASCADE;
  DROP TABLE "_journeys_v_version_inclusions" CASCADE;
  DROP TABLE "_journeys_v_version_exclusions" CASCADE;
  DROP TABLE "_journeys_v_version_included_sites" CASCADE;
  DROP TABLE "_journeys_v_version_optional_sites" CASCADE;
  DROP TABLE "_journeys_v_version_faqs" CASCADE;
  DROP TABLE "_journeys_v" CASCADE;
  DROP TABLE "_journeys_v_texts" CASCADE;
  DROP TABLE "_journeys_v_rels" CASCADE;
  DROP TABLE "special_packages_gallery" CASCADE;
  DROP TABLE "special_packages_activities" CASCADE;
  DROP TABLE "special_packages_itinerary" CASCADE;
  DROP TABLE "special_packages_inclusions" CASCADE;
  DROP TABLE "special_packages_exclusions" CASCADE;
  DROP TABLE "special_packages" CASCADE;
  DROP TABLE "_special_packages_v_version_gallery" CASCADE;
  DROP TABLE "_special_packages_v_version_activities" CASCADE;
  DROP TABLE "_special_packages_v_version_itinerary" CASCADE;
  DROP TABLE "_special_packages_v_version_inclusions" CASCADE;
  DROP TABLE "_special_packages_v_version_exclusions" CASCADE;
  DROP TABLE "_special_packages_v" CASCADE;
  DROP TABLE "services_highlights" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "team_members_credentials" CASCADE;
  DROP TABLE "team_members_specialties" CASCADE;
  DROP TABLE "team_members_languages" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "journal_posts_categories" CASCADE;
  DROP TABLE "journal_posts_tags" CASCADE;
  DROP TABLE "journal_posts" CASCADE;
  DROP TABLE "journal_posts_rels" CASCADE;
  DROP TABLE "_journal_posts_v_version_categories" CASCADE;
  DROP TABLE "_journal_posts_v_version_tags" CASCADE;
  DROP TABLE "_journal_posts_v" CASCADE;
  DROP TABLE "_journal_posts_v_rels" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "inquiries_preferred_destinations" CASCADE;
  DROP TABLE "inquiries_travel_interests" CASCADE;
  DROP TABLE "inquiries" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_journeys_categories";
  DROP TYPE "public"."enum_journeys_status";
  DROP TYPE "public"."enum__journeys_v_version_categories";
  DROP TYPE "public"."enum__journeys_v_version_status";
  DROP TYPE "public"."enum_special_packages_category";
  DROP TYPE "public"."enum_special_packages_status";
  DROP TYPE "public"."enum__special_packages_v_version_category";
  DROP TYPE "public"."enum__special_packages_v_version_status";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum_team_members_status";
  DROP TYPE "public"."enum_journal_posts_status";
  DROP TYPE "public"."enum__journal_posts_v_version_status";
  DROP TYPE "public"."enum_testimonials_status";
  DROP TYPE "public"."enum_inquiries_travel_interests";
  DROP TYPE "public"."enum_inquiries_status";
  DROP TYPE "public"."enum_inquiries_preferred_contact";
  DROP TYPE "public"."enum_inquiries_accommodation_preference";
  DROP TYPE "public"."enum_inquiries_budget_currency";
  DROP TYPE "public"."enum_inquiries_travel_pace";`)
}
