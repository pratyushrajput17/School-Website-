import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { hashTeacherPassword } from "@/lib/teacher-auth";

export const runtime = "nodejs";

async function seedAdmin() {
  const existing = await prisma.admin.findFirst();
  if (existing) return { skipped: true };
  const hashed = await hashPassword("Adarsh2111");
  await prisma.admin.create({
    data: {
      name: "Super Admin",
      email: "rajputpratyush33@gmail.com",
      password: hashed,
      role: "super_admin",
    },
  });
  return { skipped: false };
}

async function seedNotices() {
  const existing = await prisma.notice.count();
  if (existing > 0) return { skipped: true, count: existing };
  const notices = [
    { title: "Admissions Open for Session 2026-27", description: "Applications are now open for Nursery to Class 9.", category: "Admissions", isPublished: true, createdBy: "Super Admin" },
    { title: "Parent-Teacher Meeting", description: "First PTM of the session will be held in the school auditorium.", category: "Academic", isPublished: true, createdBy: "Super Admin" },
    { title: "Winter Break Notice", description: "School will remain closed from 25 Dec to 5 Jan.", category: "Holiday", isPublished: true, createdBy: "Super Admin" },
    { title: "Half-Yearly Examination Schedule", description: "Exams for Classes I-X begin from 1 October.", category: "Examination", isPublished: true, createdBy: "Super Admin" },
    { title: "Annual Sports Day", description: "Sports Day on 20 November. Report to class teachers for practice.", category: "Events", isPublished: true, createdBy: "Super Admin" },
    { title: "Republic Day Celebration", description: "Celebration on 26 January. Formal uniform required.", category: "Events", isPublished: true, createdBy: "Super Admin" },
  ];
  for (const n of notices) await prisma.notice.create({ data: n });
  return { skipped: false, count: notices.length };
}

async function seedEvents() {
  const existing = await prisma.event.count();
  if (existing > 0) return { skipped: true, count: existing };
  const events = [
    { title: "Annual Day Celebration", description: "Students presented cultural performances.", eventDate: new Date("2025-12-15"), category: "Annual Function" },
    { title: "Independence Day", description: "Flag hoisting, patriotic songs, speeches.", eventDate: new Date("2025-08-15"), category: "National Celebrations" },
    { title: "Republic Day", description: "Flag hoisting and cultural program.", eventDate: new Date("2026-01-26"), category: "National Celebrations" },
    { title: "Annual Sports Meet", description: "Athletics, team games, track events.", eventDate: new Date("2025-11-20"), category: "Sports Activities" },
    { title: "Science Exhibition", description: "Working models and projects on scientific concepts.", eventDate: new Date("2025-02-28"), category: "Academic Activities" },
    { title: "Teachers' Day", description: "Students organised a special assembly to honour teachers.", eventDate: new Date("2025-09-05"), category: "General Events" },
  ];
  for (const e of events) await prisma.event.create({ data: e });
  return { skipped: false, count: events.length };
}

async function seedSession() {
  const existing = await prisma.academicSession.findFirst();
  if (existing) return { skipped: true };
  await prisma.academicSession.create({ data: { name: "2026-27", startYear: 2026, endYear: 2027, isActive: true } });
  return { skipped: false };
}

async function seedSettings() {
  const defaults: Record<string, string> = {
    schoolName: "Adarsh High School",
    address: "Gadarwara Road, Sainkheda, MP 484661",
    phoneNumbers: "9893652202, 9993606232, 9993794981",
    email: "adresh2111@gmail.com",
    principalName: "",
    city: "Sainkheda",
    pincode: "484661",
  };
  const results: Record<string, string> = {};
  for (const [key, value] of Object.entries(defaults)) {
    const existing = await prisma.systemSetting.findUnique({ where: { key } });
    if (!existing) {
      await prisma.systemSetting.create({ data: { key, value } });
      results[key] = "created";
    } else {
      results[key] = "exists";
    }
  }
  return results;
}

export async function POST() {
  try {
    const admin = await seedAdmin();
    const notices = await seedNotices();
    const events = await seedEvents();
    const session = await seedSession();
    const settings = await seedSettings();

    return NextResponse.json({ seeded: true, admin, notices, events, session, settings });
  } catch (error) {
    console.error("Setup error:", error);
    const detail = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: "Setup failed", detail }, { status: 500 });
  }
}
