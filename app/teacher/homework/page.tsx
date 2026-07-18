"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Trash2,
  Edit3,
  X,
  BookOpen,
  Calendar,
  Loader2,
  CheckCircle2,
} from "lucide-react";

interface Subject {
  id: string;
  subjectName: string;
}

interface SchoolClass {
  id: string;
  className: string;
}

interface Section {
  id: string;
  sectionName: string;
}

interface HomeworkItem {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  classId: string;
  sectionId: string;
  teacherId: string;
  dueDate: string;
  attachmentUrl: string | null;
  status: string;
  createdAt: string;
  subject: { subjectName: string };
  class: { className: string };
  section: { sectionName: string };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function isOverdue(dueDate: string) {
  return new Date(dueDate) < new Date();
}

export default function TeacherHomeworkPage() {
  const router = useRouter();
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [homework, setHomework] = useState<HomeworkItem[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/teacher/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.teacher) {
          setTeacherId(data.teacher.id);
        } else {
          router.push("/teacher/login");
        }
      })
      .catch(() => router.push("/teacher/login"));
  }, [router]);

  const fetchHomework = useCallback(async () => {
    if (!teacherId) return;
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (classFilter) params.set("classId", classFilter);
      if (subjectFilter) params.set("subjectId", subjectFilter);
      params.set("teacherId", teacherId);

      const res = await fetch(`/api/homework?${params}`);
      const data = await res.json();
      setHomework(data.homework || []);
    } catch { /* silent */ }
    finally { setLoading(false); }
  }, [search, classFilter, subjectFilter, teacherId]);

  useEffect(() => { fetchHomework(); }, [fetchHomework]);

  useEffect(() => {
    Promise.all([
      fetch("/api/subjects").then((r) => r.json()),
      fetch("/api/classes").then((r) => r.json()),
      fetch("/api/sections").then((r) => r.json()),
    ]).then(([subData, clsData, secData]) => {
      setSubjects(subData.subjects || []);
      setClasses(clsData.classes || []);
      setSections(secData.sections || []);
    }).catch(() => {});
  }, []);

  function resetForm() {
    setTitle(""); setDescription(""); setSubjectId("");
    setClassId(""); setSectionId(""); setDueDate("");
    setAttachmentUrl(""); setError(""); setEditId(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim() || !description.trim() || !subjectId || !classId || !sectionId || !dueDate) {
      setError("All required fields must be filled");
      return;
    }

    setSaving(true);
    try {
      const isEdit = !!editId;
      const url = isEdit ? `/api/homework/${editId}` : "/api/homework";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(), description: description.trim(),
          subjectId, classId, sectionId, dueDate,
          attachmentUrl: attachmentUrl.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save homework");
        return;
      }

      setSuccess(isEdit ? "Homework updated!" : "Homework assigned!");
      resetForm();
      setShowCreate(false);
      fetchHomework();
    } catch {
      setError("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/homework/${id}`, { method: "DELETE" });
      if (res.ok) setHomework((prev) => prev.filter((h) => h.id !== id));
    } catch { /* silent */ }
    finally { setDeleting(false); setDeleteId(null); }
  }

  function startEdit(h: HomeworkItem) {
    setTitle(h.title); setDescription(h.description);
    setSubjectId(h.subjectId); setClassId(h.classId);
    setSectionId(h.sectionId);
    setDueDate(h.dueDate.split("T")[0]);
    setAttachmentUrl(h.attachmentUrl || "");
    setEditId(h.id);
    setShowCreate(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Homework</h1>
          <p className="text-gray-500 text-sm mt-1">
            Create and manage homework for your assigned classes
          </p>
        </div>
        <button
          onClick={() => { setShowCreate(!showCreate); setError(""); setSuccess(""); if (!showCreate) resetForm(); }}
          className="inline-flex items-center gap-2 bg-[#FF9933] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e8892e] transition-colors"
        >
          <Plus className="w-4 h-4" />
          {showCreate ? "Cancel" : "New Homework"}
        </button>
      </div>

      {success && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {success}
        </div>
      )}

      {showCreate && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editId ? "Edit Homework" : "New Homework"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Chapter 5: Algebra Practice"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the homework..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent resize-y" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white">
                  <option value="">Select</option>
                  {subjects.map((s) => (<option key={s.id} value={s.id}>{s.subjectName}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
                <select value={classId} onChange={(e) => setClassId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white">
                  <option value="">Select</option>
                  {classes.map((c) => (<option key={c.id} value={c.id}>Class {c.className}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section *</label>
                <select value={sectionId} onChange={(e) => setSectionId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white">
                  <option value="">Select</option>
                  {sections.map((s) => (<option key={s.id} value={s.id}>Section {s.sectionName}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date *</label>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attachment URL</label>
              <input type="text" value={attachmentUrl} onChange={(e) => setAttachmentUrl(e.target.value)}
                placeholder="Link to PDF or document (optional)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent" />
            </div>
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg border border-red-200">{error}</div>
            )}
            <button type="submit" disabled={saving}
              className="inline-flex items-center gap-2 bg-[#FF9933] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#e8892e] disabled:opacity-50">
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {saving ? "Saving..." : editId ? "Update Homework" : "Publish Homework"}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search homework..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent" />
            </div>
            <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white">
              <option value="">All Classes</option>
              {classes.map((c) => (<option key={c.id} value={c.id}>Class {c.className}</option>))}
            </select>
            <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white">
              <option value="">All Subjects</option>
              {subjects.map((s) => (<option key={s.id} value={s.id}>{s.subjectName}</option>))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#1B3A5C] border-t-transparent mx-auto" />
          </div>
        ) : homework.length === 0 ? (
          <div className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No homework yet</h3>
            <p className="text-gray-500 text-sm">Click &quot;New Homework&quot; to assign one.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Title</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Subject</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Class</th>
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
                    <td className="px-4 py-3 text-sm text-gray-600">Class {h.class?.className} - {h.section?.sectionName}</td>
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
                        <button onClick={() => startEdit(h)}
                          className="p-1.5 text-gray-400 hover:text-[#FF9933] hover:bg-amber-50 rounded-lg">
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setDeleteId(h.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
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
            <p className="text-sm text-gray-600 mb-6">Are you sure? This cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-50">
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
