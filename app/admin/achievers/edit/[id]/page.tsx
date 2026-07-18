"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2, Upload, X } from "lucide-react";
import Link from "next/link";

export default function EditAchieverPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [studentName, setStudentName] = useState("");
  const [className, setClassName] = useState("");
  const [percentage, setPercentage] = useState("");
  const [academicSession, setAcademicSession] = useState("");
  const [rank, setRank] = useState("");
  const [achievementTitle, setAchievementTitle] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [existingPhoto, setExistingPhoto] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchAchiever() {
      try {
        const res = await fetch(`/api/achievers/${id}`);
        if (!res.ok) {
          if (res.status === 404) setNotFound(true);
          else router.push("/admin/achievers");
          return;
        }
        const data = await res.json();
        const a = data.achiever;
        setStudentName(a.studentName);
        setClassName(a.className);
        setPercentage(a.percentage.toString());
        setAcademicSession(a.academicSession.toString());
        setRank(a.rank > 0 ? a.rank.toString() : "");
        setAchievementTitle(a.achievementTitle || "");
        setIsPublished(a.isPublished ?? false);
        if (a.photoUrl) {
          setExistingPhoto(a.photoUrl);
          setPreview(a.photoUrl);
        }
      } catch {
        router.push("/admin/achievers");
      } finally {
        setLoading(false);
      }
    }
    fetchAchiever();
  }, [id, router]);

  const currentYear = new Date().getFullYear();

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (selected.size > 2 * 1024 * 1024) {
      setError("Photo must be less than 2MB");
      return;
    }

    setError("");
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  function clearFile() {
    setFile(null);
    setPreview(existingPhoto);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!studentName.trim()) {
      setError("Student name is required");
      return;
    }

    if (!className.trim()) {
      setError("Class is required");
      return;
    }

    const pct = parseFloat(percentage);
    if (isNaN(pct) || pct < 0 || pct > 100) {
      setError("Percentage must be between 0 and 100");
      return;
    }

    const yr = parseInt(academicSession, 10);
    if (isNaN(yr) || yr < 2000 || yr > 2100) {
      setError("Invalid academic session");
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("studentName", studentName.trim());
      formData.append("className", className.trim());
      formData.append("percentage", pct.toString());
      formData.append("academicSession", yr.toString());
      if (rank.trim()) formData.append("rank", rank.trim());
      if (achievementTitle.trim())
        formData.append("achievementTitle", achievementTitle.trim());
      formData.append("isPublished", String(isPublished));
      if (file) formData.append("photoUrl", file);

      const res = await fetch(`/api/achievers/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to update achiever");
        return;
      }

      router.push("/admin/achievers");
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
        <h2 className="text-xl font-bold text-gray-900">
          Achiever not found
        </h2>
        <p className="text-gray-500 mt-2">
          The achiever you are looking for does not exist.
        </p>
        <Link
          href="/admin/achievers"
          className="inline-block mt-4 text-[#FF9933] hover:underline"
        >
          Back to Achievers
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/achievers"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Achievers
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Achiever</h1>
        <p className="text-gray-500 text-sm mt-1">
          Update achiever details
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-gray-200 p-6 space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Student Photo
          </label>

          <div className="flex items-start gap-4">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200">
                <img
                  src={preview || existingPhoto || ""}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -top-1 -right-1 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100"
              >
                <Upload className="w-3.5 h-3.5 text-gray-600" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Click the upload icon to replace the photo. Leave unchanged to
              keep current.
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        <div>
          <label
            htmlFor="studentName"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Student Name <span className="text-red-500">*</span>
          </label>
          <input
            id="studentName"
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="className"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Class <span className="text-red-500">*</span>
            </label>
            <input
              id="className"
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="percentage"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Percentage (%) <span className="text-red-500">*</span>
            </label>
            <input
              id="percentage"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="academicSession"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Session <span className="text-red-500">*</span>
            </label>
            <select
              id="academicSession"
              value={academicSession}
              onChange={(e) => setAcademicSession(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
            >
              {[0, 1, 2, 3, 4, 5].map((offset) => {
                const y = currentYear - offset;
                return (
                  <option key={y} value={y}>
                    {y}-{String(y + 1).slice(-2)}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="rank"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Rank
            </label>
            <input
              id="rank"
              type="number"
              min="1"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              placeholder="e.g. 1"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
            />
            <p className="text-xs text-gray-400 mt-1">Optional.</p>
          </div>

          <div>
            <label
              htmlFor="achievementTitle"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Achievement Title
            </label>
            <input
              id="achievementTitle"
              type="text"
              value={achievementTitle}
              onChange={(e) => setAchievementTitle(e.target.value)}
              placeholder="e.g. Class Topper"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
            />
            <p className="text-xs text-gray-400 mt-1">Optional.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#FF9933] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FF9933]" />
          </label>
          <span className="text-sm text-gray-700 font-medium">
            {isPublished ? "Published" : "Draft — not visible to public"}
          </span>
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
            href="/admin/achievers"
            className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
