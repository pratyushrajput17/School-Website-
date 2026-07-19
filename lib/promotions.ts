import { prisma } from "./prisma";

export async function getPromotions() {
  const promotions = await prisma.promotion.findMany({ orderBy: { createdAt: "desc" } });
  return promotions.map((p) => ({ ...p, createdAt: p.createdAt.toISOString() }));
}

export async function getPromotionById(id: string) {
  const p = await prisma.promotion.findUnique({ where: { id } });
  if (!p) return null;
  return { ...p, createdAt: p.createdAt.toISOString() };
}

export async function previewPromotion(fromClass: string, academicSession: number) {
  const students = await prisma.student.findMany({
    where: { className: fromClass, status: "Active" },
    orderBy: { studentName: "asc" },
  });
  return { count: students.length, students };
}

export async function executePromotion(fromClass: string, toClass: string, academicSession: number, adminName: string) {
  const students = await prisma.student.findMany({
    where: { className: fromClass, status: "Active" },
  });

  const studentIds = students.map((s) => s.id);

  const [promotion] = await prisma.$transaction([
    prisma.promotion.create({
      data: {
        fromClass,
        toClass,
        academicSession,
        studentCount: students.length,
        details: JSON.stringify(studentIds),
        createdBy: adminName,
      },
    }),
    ...students.map((student) =>
      prisma.student.update({
        where: { id: student.id },
        data: { className: toClass, section: "" },
      })
    ),
  ]);

  return { ...promotion, createdAt: promotion.createdAt.toISOString(), promotedCount: students.length };
}

export async function revertPromotion(id: string) {
  const promotion = await prisma.promotion.findUnique({ where: { id } });
  if (!promotion) return null;
  const studentIds: string[] = JSON.parse(promotion.details || "[]");
  await prisma.$transaction([
    ...studentIds.map((studentId) =>
      prisma.student.update({
        where: { id: studentId },
        data: { className: promotion.fromClass },
      })
    ),
    prisma.promotion.delete({ where: { id } }),
  ]);
  return { revertedCount: studentIds.length };
}

export async function getPromotableClasses() {
  const classes = await prisma.schoolClass.findMany({
    where: { status: "Active" },
    orderBy: { className: "asc" },
  });
  return classes.map((c) => c.className);
}
