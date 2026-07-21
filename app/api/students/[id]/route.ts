import { NextResponse } from "next/server";
import { getStudentById, updateStudent, deleteStudent } from "@/lib/students";
import { uploadStudentPhoto } from "@/lib/cloudinary";
import { getAdminFromRequest, requireAdmin } from "@/lib/api-auth";
import { getTeacherFromRequest } from "@/lib/teacher-auth";
import { createAuditLog } from "@/lib/audit";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const teacher = getTeacherFromRequest(request);
  const admin = getAdminFromRequest(request);
  if (!teacher && !admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const student = await getStudentById(id);

    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ student });
  } catch (error) {
    console.error("GET /api/students/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;

    const existing = await getStudentById(id);
    if (!existing) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const admissionNumber = (formData.get("admissionNumber") as string) || "";
    const studentName = formData.get("studentName") as string | null;
    const fatherName = formData.get("fatherName") as string | null;
    const motherName = formData.get("motherName") as string | null;
    const mobileNumber = formData.get("mobileNumber") as string | null;
    const alternateMobile = (formData.get("alternateMobile") as string) || "";
    const dateOfBirth = formData.get("dateOfBirth") as string | null;
    const gender = (formData.get("gender") as string) || "";
    const className = formData.get("className") as string | null;
    const section = formData.get("section") as string | null;
    const address = formData.get("address") as string | null;
    const status = formData.get("status") as string | null;
    const admissionDate = formData.get("admissionDate") as string | null;
    const scholarNumber = (formData.get("scholarNumber") as string) || "";
    const category = (formData.get("category") as string) || "General";
    const caste = (formData.get("caste") as string) || "";
    const penNumber = (formData.get("penNumber") as string) || "";
    const aadhaarNumber = (formData.get("aadhaarNumber") as string) || "";
    const whatsappNumber = (formData.get("whatsappNumber") as string) || "";
    const photoFile = formData.get("photo") as File | null;
    const keepExistingPhoto = formData.get("keepExistingPhoto") === "true";

    let photoUrl: string | undefined;
    if (photoFile && photoFile.size > 0) {
      photoUrl = await uploadStudentPhoto(photoFile);
    } else if (keepExistingPhoto) {
      photoUrl = existing.photoUrl || undefined;
    }

    const student = await updateStudent(id, {
      admissionNumber,
      studentName: studentName || undefined,
      fatherName: fatherName || undefined,
      motherName: motherName || undefined,
      mobileNumber: mobileNumber || undefined,
      alternateMobile,
      dateOfBirth: dateOfBirth || undefined,
      gender,
      className: className || undefined,
      section: section || undefined,
      address: address || undefined,
      status: status || undefined,
      admissionDate: admissionDate || undefined,
      scholarNumber,
      category,
      caste,
      penNumber,
      aadhaarNumber,
      whatsappNumber,
      photoUrl,
    });

    const admin = getAdminFromRequest(request);
    if (admin) {
      await createAuditLog({
        action: "UPDATE",
        entity: "Student",
        entityId: id,
        adminId: admin.id,
        adminName: admin.name,
        ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
      });
    }

    return NextResponse.json({ student });
  } catch (error: unknown) {
    console.error("PUT /api/students/[id] error:", error);
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "A student with this admission number already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;

    const existing = await getStudentById(id);
    if (!existing) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    await deleteStudent(id);

    const admin = getAdminFromRequest(request);
    if (admin) {
      await createAuditLog({
        action: "DELETE",
        entity: "Student",
        entityId: id,
        adminId: admin.id,
        adminName: admin.name,
        ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/students/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
