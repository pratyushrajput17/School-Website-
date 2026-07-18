"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Trash2,
  Edit3,
  X,
  Download,
  BookOpen,
  Calendar,
  Loader2,
} from "lucide-react";

interface HomeworkItem {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  classId: string;
  sectionId: string;
  dueDate: string;
  attachmentUrl: string | null;
  createdAt: string;
  subject: { subjectName: string };
  class: { className: string };
  section: { sectionName: string };
  teacher: { teacherName: string };
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function isOverdue(dueDate: string) {
  return new Date(dueDate) < new Date();
}

export default function AdminHomeworkPage() {
  const router = useRouter();
  const [homework, setHomework] = useState<HomeworkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [exporting, setExporting] = useState(false);

  const fetchHomework = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);

      const res = await fetch(`/api/homework?${params}`);
      if (!res.ok) { router.push("/login"); return; }
      const data = await res.json();
      setHomework(data.homework);
    } catch { /* silent */ }
    finally { setLoading(false); }
  }, [search, router]);

  useEffect(() => { fetchHomework(); }, [fetchHomework]);

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/homework/${id}`, { method: "DELETE" });
      if (res.ok) setHomework((prev) => prev.filter((h) => h.id !== id));
    } catch { /* silent */ }
    finally { setDeleting(false); setDeleteId(null); }
  }

  async function handleExport() {
    setExporting(true);
    try {
      const res = await fetch(`/api/homework/export`);
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "homework-export.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch { /* silent */ }
    finally { setExporting(false); }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Homework</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage homework assignments across classes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            disabled={exporting}
            className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {exporting ? "Exporting..." : "Export CSV"}
          </button>
          <Link
            href="/admin/homework/create"
            className="inline-flex items-center gap-2 bg-[#FF9933] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e8892e] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Homework
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#1B3A5C] border-t-transparent mx-auto" />
          </div>
        ) : homework.length === 0 ? (
          <div className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No homework found</h3>
            <p className="text-gray-500 text-sm">
              {search ? "Try a different search" : "Assign your first homework to get started"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Title</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Subject</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Class</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Teacher</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Due Date</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {homework.map((h) => (
                  <tr key={h.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">{h.title}</p>
                      <p className="text-xs text-gray-400 line-clamp-1">{h.description}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{h.subject?.subjectName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      Class {h.class?.className} - {h.section?.sectionName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{h.teacher?.teacherName}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                        isOverdue(h.dueDate) ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                      }`}>
                        <Calendar className="w-3 h-3" />
                        {formatDate(h.dueDate)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/homework/edit/${h.id}`}
                          className="p-1.5 text-gray-400 hover:text-[#FF9933] hover:bg-amber-50 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(h.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delete Homework</h3>
              <button onClick={() => setDeleteId(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">Are you sure? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50">
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
