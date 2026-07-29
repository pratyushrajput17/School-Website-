import { NextResponse } from "next/server";
import { createEnquiry } from "@/lib/enquiries";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_PER_WINDOW = 3;
const ipMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipMap.get(ip);
  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > MAX_PER_WINDOW;
}

const VALID_ENQUIRY_TYPES = [
  "Admission Enquiry",
  "Academic Enquiry",
  "Existing Student",
  "Transfer / TC Enquiry",
  "Transport Enquiry",
  "General Enquiry",
  "Other",
];

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    const honeypot = body._website;
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const enquiryType = (body.enquiryType || "").trim();
    const subject = (body.subject || "").trim();
    const message = (body.message || "").trim();

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Full name is required (min 2 characters)" },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      );
    }

    if (!enquiryType || !VALID_ENQUIRY_TYPES.includes(enquiryType)) {
      return NextResponse.json(
        { error: "Please select a valid enquiry type" },
        { status: 400 }
      );
    }

    if (!subject || subject.length < 3) {
      return NextResponse.json(
        { error: "Subject is required (min 3 characters)" },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Message is required (min 10 characters)" },
        { status: 400 }
      );
    }

    const mobile = (body.mobile || "").trim();
    if (mobile && !/^\d{10}$/.test(mobile.replace(/\D/g, ""))) {
      return NextResponse.json(
        { error: "Mobile number must be 10 digits" },
        { status: 400 }
      );
    }

    const enquiry = await createEnquiry({
      name,
      email,
      mobile: mobile.replace(/\D/g, ""),
      enquiryType,
      studentName: (body.studentName || "").trim(),
      classInterested: (body.classInterested || "").trim(),
      subject,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you. Your enquiry has been submitted successfully. The school team will contact you if required.",
        id: enquiry.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/enquiries error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
