import { prisma } from "./prisma";

export interface EventData {
  title: string;
  description: string;
  eventDate: string;
  category: string;
  image?: string;
}

export async function getEvents(options?: {
  category?: string;
  search?: string;
  limit?: number;
}) {
  const where: Record<string, unknown> = {};

  if (options?.category) {
    where.category = options.category;
  }

  if (options?.search) {
    where.OR = [
      { title: { contains: options.search, mode: "insensitive" } },
      { description: { contains: options.search, mode: "insensitive" } },
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
  }));
}

export async function getEventById(id: string) {
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) return null;
  return {
    ...event,
    eventDate: event.eventDate.toISOString(),
    createdAt: event.createdAt.toISOString(),
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
    },
  });
  return {
    ...event,
    eventDate: event.eventDate.toISOString(),
    createdAt: event.createdAt.toISOString(),
  };
}

export async function updateEvent(id: string, data: EventData) {
  const event = await prisma.event.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      eventDate: new Date(data.eventDate),
      category: data.category,
      image: data.image || null,
    },
  });
  return {
    ...event,
    eventDate: event.eventDate.toISOString(),
    createdAt: event.createdAt.toISOString(),
  };
}

export async function deleteEvent(id: string) {
  await prisma.event.delete({ where: { id } });
}

export async function getEventCount() {
  return prisma.event.count();
}
