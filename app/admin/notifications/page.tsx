"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, Send, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface SchoolClass { id: string; className: string; }
interface Section { id: string; sectionName: string; }

const NOTIFICATION_TYPES = [
  { value: "homework", label: "Homework" },
  { value: "attendance_alert", label: "Attendance Alert" },
  { value: "holiday", label: "Holiday Notice" },
  { value: "exam", label: "Exam Notice" },
  { value: "general", label: "General Announcement" },
];

export default function AdminNotificationsPage() {
  const router = useRouter();
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [type, setType] = useState("general");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sendTo, setSendTo] = useState("all");
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [result, setResult] = useState<{ count: number } | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/classes").then((r) => r.json()),
      fetch("/api/sections").then((r) => r.json()),
    ]).then(([cData, sData]) => {
      setClasses(cData.classes || []);
      setSections(sData.sections || []);
    }).catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setResult(null);

    if (!title.trim() || !message.trim()) {
      setError("Title and message are required");
      return;
    }

    setSaving(true);
    try {
      const body: Record<string, unknown> = { type, title: title.trim(), message: message.trim() };

      if (sendTo === "class" && classId && sectionId) {
        body.classId = classId;
        body.sectionId = sectionId;
      }

      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to send");
        return;
      }

      const data = await res.json();
      setResult({ count: data.count || 1 });
      setSuccess("Notification sent successfully!");
      setTitle("");
      setMessage("");
    } catch {
      setError("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Send Notification</h1>
        <p className="text-gray-500 text-sm mt-1">Send notifications to parents</p>
      </div>

      {success && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {success} {result && <span className="font-medium">({result.count} parent{result.count !== 1 ? "s" : ""})</span>}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Notification Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white">
            {NOTIFICATION_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Title <span className="text-red-500">*</span></label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="Notification title"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Message <span className="text-red-500">*</span></label>
          <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your notification message..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent resize-y" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Send To</label>
          <select value={sendTo} onChange={(e) => setSendTo(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white">
            <option value="all">All Parents</option>
            <option value="class">Specific Class & Section</option>
          </select>
        </div>

        {sendTo === "class" && (
          <div className="grid grid-cols-2 gap-4">
            <select value={classId} onChange={(e) => setClassId(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white">
              <option value="">Select Class</option>
              {classes.map((c) => (<option key={c.id} value={c.id}>Class {c.className}</option>))}
            </select>
            <select value={sectionId} onChange={(e) => setSectionId(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white">
              <option value="">Select Section</option>
              {sections.map((s) => (<option key={s.id} value={s.id}>Section {s.sectionName}</option>))}
            </select>
          </div>
        )}

        {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg border border-red-200">{error}</div>}

        <button type="submit" disabled={saving}
          className="inline-flex items-center gap-2 bg-[#FF9933] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#e8892e] disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {saving ? "Sending..." : "Send Notification"}
        </button>
      </form>
    </div>
  );
}
