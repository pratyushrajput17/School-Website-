import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasource: {
    url: process.env.schoolwebsite_DATABASE_URL!,
  },
  schema: "./prisma/schema.prisma",
});
