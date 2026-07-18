import { prisma } from "./prisma";

export interface GalleryData {
  title: string;
  image: string;
  category: string;
}

export async function getGalleryImages(options?: {
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
    ];
  }

  const images = await prisma.gallery.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: options?.limit,
  });

  return images.map((img) => ({
    ...img,
    createdAt: img.createdAt.toISOString(),
  }));
}

export async function getGalleryImageById(id: string) {
  const image = await prisma.gallery.findUnique({ where: { id } });
  if (!image) return null;
  return {
    ...image,
    createdAt: image.createdAt.toISOString(),
  };
}

export async function createGalleryImage(data: GalleryData) {
  const image = await prisma.gallery.create({ data });
  return {
    ...image,
    createdAt: image.createdAt.toISOString(),
  };
}

export async function updateGalleryImage(id: string, data: GalleryData) {
  const image = await prisma.gallery.update({
    where: { id },
    data,
  });
  return {
    ...image,
    createdAt: image.createdAt.toISOString(),
  };
}

export async function deleteGalleryImage(id: string) {
  await prisma.gallery.delete({ where: { id } });
}

export async function getGalleryCount() {
  return prisma.gallery.count();
}
