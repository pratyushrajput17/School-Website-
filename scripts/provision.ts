/**
 * Production Database Provisioning Script
 *
 * Usage:
 *   DATABASE_URL="postgresql://..." npx tsx scripts/provision.ts
 *
 * This script:
 *   1. Pushes the Prisma schema to the database
 *   2. Seeds admin user, notices, and events
 */

import { execSync } from "child_process";

async function main() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    console.error("❌ DATABASE_URL environment variable is required");
    console.error("   Usage: DATABASE_URL=\"postgresql://...\" npx tsx scripts/provision.ts");
    process.exit(1);
  }

  console.log("🚀 Starting production database provisioning...\n");

  // Step 1: Push schema
  console.log("📦 Pushing Prisma schema...");
  try {
    execSync(`DATABASE_URL="${url}" npx prisma db push`, {
      stdio: "inherit",
      env: { ...process.env, DATABASE_URL: url },
    });
    console.log("✅ Schema pushed successfully\n");
  } catch {
    console.error("❌ Failed to push schema");
    process.exit(1);
  }

  // Step 2: Run seed
  console.log("🌱 Seeding database...");
  try {
    execSync(`DATABASE_URL="${url}" npx tsx prisma/seed.ts`, {
      stdio: "inherit",
      env: { ...process.env, DATABASE_URL: url },
    });
    console.log("✅ Database seeded successfully\n");
  } catch {
    console.error("❌ Failed to seed database");
    process.exit(1);
  }

  console.log("🎉 Production database is ready!");
  console.log("   Admin email: rajputpratyush33@gmail.com");
  console.log("   Admin password: [as set in seed script]");
  console.log("\n📌 Next steps:");
  console.log("   1. Add DATABASE_URL to Vercel environment variables");
  console.log("   2. Add JWT_SECRET to Vercel environment variables");
  console.log("   3. Redeploy on Vercel");
}

main();
