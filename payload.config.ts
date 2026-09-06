import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Leads } from "./collections/Leads";
import { Solutions } from "./collections/Solutions";
import { Projects } from "./collections/Projects";
import { Testimonials } from "./collections/Testimonials";
import { Faqs } from "./collections/Faqs";
import { Products } from "./collections/Products";
import { Pages } from "./collections/Pages";
import { Site } from "./globals/Site";
import { Home } from "./globals/Home";
import { Contact } from "./globals/Contact";
import { seed } from "./lib/seed";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " — Sunlife Traders LLP",
      icons: {
        icon: "/images/brand/mark.png",
        apple: "/images/brand/mark.png",
      },
    },
  },
  collections: [Users, Media, Leads, Solutions, Projects, Products, Pages, Testimonials, Faqs],
  globals: [Site, Home, Contact],
  editor: lexicalEditor(),
  graphQL: {
    disable: true,
  },
  secret: process.env.PAYLOAD_SECRET || "solaris-dev-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "file:./payload.sqlite",
    },
    busyTimeout: 8000,
    push: true,
  }),
  sharp,
  async onInit(payload) {
    try {
      await seed(payload);
    } catch (error) {
      payload.logger.error({ err: error }, "Seed failed");
    }
  },
});
