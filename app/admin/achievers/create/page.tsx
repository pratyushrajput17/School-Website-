"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Upload, X } from "lucide-react";
import Link from "next/link";

export default function CreateAchieverPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [percentage, setPercentage] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

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
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
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

    const yr = parseInt(year, 10);
    if (isNaN(yr) || yr < 2000 || yr > 2100) {
      setError("Invalid academic year");
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("className", className.trim());
      formData.append("percentage", pct.toString());
      formData.append("year", yr.toString());
      if (file) formData.append("photo", file);

      const res = await fetch("/api/achievers", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create achiever");
        return;
      }

      router.push("/admin/achievers");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const currentYear = new Date().getFullYear();

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
        <h1 className="text-2xl font-bold text-gray-900">Add Achiever</h1>
        <p className="text-gray-500 text-sm mt-1">
          Add a new academic achiever
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

          {preview ? (
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={clearFile}
                className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
              >
                <X className="w-3 h-3 text-gray-600" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-full cursor-pointer hover:border-[#FF9933] bg-gray-50 transition-colors">
              <Upload className="w-6 h-6 text-gray-400" />
              <span className="text-xs text-gray-400 mt-1">Upload Photo</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          )}
          <p className="text-xs text-gray-400 mt-1">
            Optional. Max 2MB.
          </p>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Student Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Priya Sharma"
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
              placeholder="e.g. X"
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
              placeholder="e.g. 95.5"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Session <span className="text-red-500">*</span>
            </label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
            >
              {[0, 1, 2, 3, 4].map((offset) => {
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
            {saving ? "Saving..." : "Save Achiever"}
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
