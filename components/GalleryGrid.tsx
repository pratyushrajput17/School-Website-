"use client";

import { useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

interface Group {
  category: string;
  items: GalleryImage[];
}

interface GalleryGridProps {
  grouped: Group[];
  images: GalleryImage[];
}

export default function GalleryGrid({ grouped, images }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null
    );
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  }, [images.length]);

  if (grouped.length === 0) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => openLightbox(i)}
            className="group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/[0.02] transition-all duration-300 hover:-translate-y-1 hover:shadow-md text-left"
          >
            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={img.imageUrl}
                alt={img.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
              <h3 className="text-sm font-semibold text-white">{img.title}</h3>
            </div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-16">
        {grouped.map(({ category, items }) => {
          const categoryStartIndex = images.findIndex(
            (img) => img.id === items[0].id
          );

          return (
            <div key={category}>
              <h2 className="text-2xl font-bold text-deep-blue mb-6">
                {category}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((img, localIdx) => {
                  const globalIdx = images.findIndex((i) => i.id === img.id);
                  return (
                    <button
                      key={img.id}
                      onClick={() => openLightbox(globalIdx)}
                      className="group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/[0.02] transition-all duration-300 hover:-translate-y-1 hover:shadow-md text-left"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                        <img
                          src={img.imageUrl}
                          alt={img.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
                        <h3 className="text-sm font-semibold text-white">
                          {img.title}
                        </h3>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-10"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex].imageUrl}
              alt={images[lightboxIndex].title}
              className="max-h-[85vh] max-w-[85vw] rounded-lg object-contain"
            />
            <p className="text-white text-center mt-3 text-sm font-medium">
              {images[lightboxIndex].title}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-10"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </>
  );
}
