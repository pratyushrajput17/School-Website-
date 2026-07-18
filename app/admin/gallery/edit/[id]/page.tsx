"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2, Upload, X } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  "Campus Life",
  "Classroom Activities",
  "Academic Activities",
  "Annual Function",
  "Cultural Programs",
  "Sports Activities",
  "Independence Day",
  "Republic Day",
  "Other",
];

export default function EditGalleryImagePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchImage() {
      try {
        const res = await fetch(`/api/gallery/${id}`);
        if (!res.ok) {
          if (res.status === 404) setNotFound(true);
          else router.push("/admin/gallery");
          return;
        }
        const data = await res.json();
        const img = data.image;
        setTitle(img.title);
        setCategory(img.category);
        setExistingImage(img.imageUrl);
        setPreview(img.imageUrl);
      } catch {
        router.push("/admin/gallery");
      } finally {
        setLoading(false);
      }
    }
    fetchImage();
  }, [id, router]);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }

    setError("");
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  function clearFile() {
    setFile(null);
    setPreview(existingImage);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!category) {
      setError("Category is required");
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("category", category);
      if (file) formData.append("image", file);

      const res = await fetch(`/api/gallery/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to update image");
        return;
      }

      router.push("/admin/gallery");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#1B3A5C] border-t-transparent" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-900">Image not found</h2>
        <p className="text-gray-500 mt-2">
          The image you are looking for does not exist.
        </p>
        <Link
          href="/admin/gallery"
          className="inline-block mt-4 text-[#FF9933] hover:underline"
        >
          Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/gallery"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gallery
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Image</h1>
        <p className="text-gray-500 text-sm mt-1">Update image details</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-gray-200 p-6 space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Image
          </label>

          <div className="relative">
            <img
              src={preview || existingImage}
              alt="Preview"
              className="w-full aspect-[16/9] object-cover rounded-lg border border-gray-200"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:bg-gray-100"
            >
              <Upload className="w-4 h-4 text-gray-600" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Click the upload button to replace the image. Leave unchanged to
            keep the current image.
          </p>
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#FF9933] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#e8892e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <Link
            href="/admin/gallery"
            className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
