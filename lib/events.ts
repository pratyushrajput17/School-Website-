import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

export interface EventData {
  title: string;
  description: string;
  eventDate: string;
  category: string;
  image?: string;
  isPublished?: boolean;
  createdBy: string;
}

export interface UpdateEventData {
  title?: string;
  description?: string;
  eventDate?: string;
  category?: string;
  image?: string;
  isPublished?: boolean;
  updatedBy: string;
}

export async function getEvents(options?: {
  category?: string;
  search?: string;
  limit?: number;
  publishedOnly?: boolean;
}) {
  const where: Record<string, unknown> = {};

  if (options?.publishedOnly) {
    where.isPublished = true;
  }

  if (options?.category) {
    where.category = options.category;
  }

  if (options?.search) {
    where.OR = [
      { title: { contains: options.search, mode: Prisma.QueryMode.insensitive } },
      { description: { contains: options.search, mode: Prisma.QueryMode.insensitive } },
    ];
  }

  const events = await prisma.event.findMany({
    where,
    orderBy: { eventDate: "desc" },
    take: options?.limit,
  });

  return events.map((e) => ({
    ...e,
    eventDate: e.eventDate.toISOString(),
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }));
}

export async function getEventById(id: string) {
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) return null;
  return {
    ...event,
    eventDate: event.eventDate.toISOString(),
    createdAt: event.createdAt.toISOString(),
    updatedAt: event.updatedAt.toISOString(),
  };
}

export async function createEvent(data: EventData) {
  const event = await prisma.event.create({
    data: {
      title: data.title,
      description: data.description,
      eventDate: new Date(data.eventDate),
      category: data.category,
      image: data.image || null,
      isPublished: data.isPublished ?? false,
      createdBy: data.createdBy,
    },
  });
  return {
    ...event,
    eventDate: event.eventDate.toISOString(),
    createdAt: event.createdAt.toISOString(),
    updatedAt: event.updatedAt.toISOString(),
  };
}

export async function updateEvent(id: string, data: UpdateEventData) {
  const updateData: Record<string, unknown> = {
    updatedBy: data.updatedBy,
  };
  if (data.title !== undefined) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.eventDate !== undefined) updateData.eventDate = new Date(data.eventDate);
  if (data.category !== undefined) updateData.category = data.category;
  if (data.image !== undefined) updateData.image = data.image || null;
  if (data.isPublished !== undefined) updateData.isPublished = data.isPublished;

  const event = await prisma.event.update({
    where: { id },
    data: updateData,
  });
  return {
    ...event,
    eventDate: event.eventDate.toISOString(),
    createdAt: event.createdAt.toISOString(),
    updatedAt: event.updatedAt.toISOString(),
  };
}

export async function deleteEvent(id: string) {
  await prisma.event.delete({ where: { id } });
}

export async function getEventCount() {
  return prisma.event.count();
}
