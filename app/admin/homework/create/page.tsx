"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";

const SUBJECTS = [
  "Hindi", "English", "Mathematics", "Science", "Social Science",
  "Sanskrit", "Computer Science", "Physical Education", "Art & Craft", "Music",
];

const CLASS_OPTIONS = ["Nursery", "KG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const SECTION_OPTIONS = ["A", "B", "C"];

export default function CreateHomeworkPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = !!params.id;
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetch(`/api/homework/${id}`)
        .then((r) => r.json())
        .then((data) => {
          if (!data.homework) { setNotFound(true); return; }
          const h = data.homework;
          setTitle(h.title);
          setDescription(h.description);
          setSubject(h.subject);
          setClassName(h.className);
          setSection(h.section);
          setDueDate(h.dueDate.split("T")[0]);
          setAttachmentUrl(h.attachmentUrl || "");
        })
        .catch(() => router.push("/admin/homework"))
        .finally(() => setLoading(false));
    }
  }, [isEdit, id, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!title.trim() || !description.trim() || !subject || !className || !section || !dueDate) {
      setError("All required fields must be filled");
      return;
    }

    setSaving(true);
    try {
      const url = isEdit ? `/api/homework/${id}` : "/api/homework";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          subject, className, section, dueDate,
          attachmentUrl: attachmentUrl.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save homework");
        return;
      }

      router.push("/admin/homework");
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
        <h2 className="text-xl font-bold text-gray-900">Homework not found</h2>
        <Link href="/admin/homework" className="inline-block mt-4 text-[#FF9933] hover:underline">
          Back to Homework
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/homework" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3">
          <ArrowLeft className="w-4 h-4" />
          Back to Homework
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Edit Homework" : "Add Homework"}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {isEdit ? "Update homework assignment" : "Create a new homework assignment"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Chapter 5: Algebra Practice"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4} value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the homework assignment in detail..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent resize-y"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Subject <span className="text-red-500">*</span>
            </label>
            <select
              value={subject} onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white"
            >
              <option value="">Select Subject</option>
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Class <span className="text-red-500">*</span>
            </label>
            <select
              value={className} onChange={(e) => setClassName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white"
            >
              <option value="">Select Class</option>
              {CLASS_OPTIONS.map((c) => (
                <option key={c} value={c}>Class {c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Section <span className="text-red-500">*</span>
            </label>
            <select
              value={section} onChange={(e) => setSection(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white"
            >
              <option value="">Select Section</option>
              {SECTION_OPTIONS.map((s) => (
                <option key={s} value={s}>Section {s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Attachment URL
            </label>
            <input
              type="text" value={attachmentUrl} onChange={(e) => setAttachmentUrl(e.target.value)}
              placeholder="Link to PDF or document"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg border border-red-200">{error}</div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit" disabled={saving}
            className="inline-flex items-center gap-2 bg-[#FF9933] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#e8892e] transition-colors disabled:opacity-50"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? "Saving..." : isEdit ? "Save Changes" : "Save Homework"}
          </button>
          <Link href="/admin/homework" className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
