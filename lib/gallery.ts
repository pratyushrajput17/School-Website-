import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

export interface GalleryData {
  title: string;
  imageUrl: string;
  category: string;
  createdBy: string;
}

export interface UpdateGalleryData {
  title?: string;
  imageUrl?: string;
  category?: string;
  updatedBy: string;
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
      { title: { contains: options.search, mode: Prisma.QueryMode.insensitive } },
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
    updatedAt: img.updatedAt.toISOString(),
  }));
}

export async function getGalleryImageById(id: string) {
  const image = await prisma.gallery.findUnique({ where: { id } });
  if (!image) return null;
  return {
    ...image,
    createdAt: image.createdAt.toISOString(),
    updatedAt: image.updatedAt.toISOString(),
  };
}

export async function createGalleryImage(data: GalleryData) {
  const image = await prisma.gallery.create({
    data: {
      title: data.title,
      imageUrl: data.imageUrl,
      category: data.category,
      createdBy: data.createdBy,
    },
  });
  return {
    ...image,
    createdAt: image.createdAt.toISOString(),
    updatedAt: image.updatedAt.toISOString(),
  };
}

export async function updateGalleryImage(id: string, data: UpdateGalleryData) {
  const updateData: Record<string, unknown> = {
    updatedBy: data.updatedBy,
  };
  if (data.title !== undefined) updateData.title = data.title;
  if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
  if (data.category !== undefined) updateData.category = data.category;

  const image = await prisma.gallery.update({
    where: { id },
    data: updateData,
  });
  return {
    ...image,
    createdAt: image.createdAt.toISOString(),
    updatedAt: image.updatedAt.toISOString(),
  };
}

export async function deleteGalleryImage(id: string) {
  await prisma.gallery.delete({ where: { id } });
}

export async function getGalleryCount() {
  return prisma.gallery.count();
}
