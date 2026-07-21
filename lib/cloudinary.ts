import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(
  file: File,
  folder: string,
  options: { width?: number; height?: number } = {}
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [
          {
            width: options.width || 1200,
            height: options.height || 900,
            crop: "limit",
            quality: "auto",
          },
        ],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
}

export async function uploadImage(file: File): Promise<string> {
  return uploadToCloudinary(file, "adarsh-high-school/gallery", {
    width: 1200,
    height: 900,
  });
}

export async function uploadPhoto(file: File): Promise<string> {
  return uploadToCloudinary(file, "adarsh-high-school/achievers", {
    width: 400,
    height: 500,
  });
}

export async function uploadStudentPhoto(file: File): Promise<string> {
  return uploadToCloudinary(file, "adarsh-high-school/students", {
    width: 400,
    height: 500,
  });
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export function getPublicIdFromUrl(url: string): string | null {
  const matches = url.match(
    /\/v\d+\/(.+?)\.(jpg|jpeg|png|gif|webp|avif)$/
  );
  return matches ? matches[1] : null;
}
