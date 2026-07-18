import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  compareParentPassword,
  generateParentToken,
  setParentAuthCookie,
} from "@/lib/parent-auth";

export async function POST(request: Request) {
  try {
    const { mobileNumber, password } = await request.json();

    if (!mobileNumber || !password) {
      return NextResponse.json(
        { error: "Mobile number and password are required" },
        { status: 400 }
      );
    }

    const parent = await prisma.parent.findUnique({ where: { mobileNumber } });

    if (!parent) {
      return NextResponse.json(
        { error: "Invalid mobile number or password" },
        { status: 401 }
      );
    }

    const isValid = await compareParentPassword(password, parent.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid mobile number or password" },
        { status: 401 }
      );
    }

    if (parent.status === "Inactive") {
      return NextResponse.json(
        { error: "Account deactivated. Contact admin." },
        { status: 403 }
      );
    }

    const token = generateParentToken({
      id: parent.id,
      mobileNumber: parent.mobileNumber,
      fatherName: parent.fatherName,
      studentId: parent.studentId,
    });

    await setParentAuthCookie(token);

    return NextResponse.json({
      success: true,
      parent: {
        id: parent.id,
        fatherName: parent.fatherName,
        motherName: parent.motherName,
        mobileNumber: parent.mobileNumber,
        studentId: parent.studentId,
      },
    });
  } catch (error) {
    console.error("Parent login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
