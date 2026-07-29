import { prisma } from "./prisma";

export interface CreateEnquiryData {
  name: string;
  email: string;
  mobile?: string;
  enquiryType: string;
  studentName?: string;
  classInterested?: string;
  subject: string;
  message: string;
}

export interface EnquiryFilters {
  search?: string;
  status?: string;
  enquiryType?: string;
  priority?: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
}

export async function createEnquiry(data: CreateEnquiryData) {
  return prisma.enquiry.create({
    data: {
      name: data.name,
      email: data.email,
      mobile: data.mobile || "",
      enquiryType: data.enquiryType,
      studentName: data.studentName || "",
      classInterested: data.classInterested || "",
      subject: data.subject,
      message: data.message,
      status: "NEW",
      priority: "NORMAL",
    },
  });
}

export async function getEnquiries(filters: EnquiryFilters = {}) {
  const where: Record<string, unknown> = {};

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { email: { contains: filters.search, mode: "insensitive" } },
      { subject: { contains: filters.search, mode: "insensitive" } },
      { studentName: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  if (filters.status) where.status = filters.status;
  if (filters.enquiryType) where.enquiryType = filters.enquiryType;
  if (filters.priority) where.priority = filters.priority;

  if (filters.dateFrom || filters.dateTo) {
    const createdAt: Record<string, Date> = {};
    if (filters.dateFrom) createdAt.gte = new Date(filters.dateFrom);
    if (filters.dateTo) createdAt.lte = new Date(filters.dateTo + "T23:59:59.999Z");
    where.createdAt = createdAt;
  }

  const [enquiries, total] = await Promise.all([
    prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: filters.limit || 50,
    }),
    prisma.enquiry.count({ where }),
  ]);

  return { enquiries, total };
}

export async function getEnquiryById(id: string) {
  return prisma.enquiry.findUnique({ where: { id } });
}

export async function updateEnquiry(
  id: string,
  data: {
    status?: string;
    priority?: string;
    readAt?: Date | null;
    resolvedAt?: Date | null;
    resolvedBy?: string | null;
  }
) {
  return prisma.enquiry.update({ where: { id }, data });
}

export async function getEnquiryStats() {
  const [newCount, unreadCount, inProgressCount, todayCount] =
    await Promise.all([
      prisma.enquiry.count({ where: { status: "NEW" } }),
      prisma.enquiry.count({ where: { readAt: null } }),
      prisma.enquiry.count({ where: { status: "IN_PROGRESS" } }),
      prisma.enquiry.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
    ]);

  return { newCount, unreadCount, inProgressCount, todayCount };
}

export async function getRecentEnquiries(limit = 5) {
  return prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}
