"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Plus,
  Search,
  Trash2,
  Edit3,
  X,
  Loader2,
  Calendar,
  BookText,
  CheckCircle2,
  Globe,
  Eye,
} from "lucide-react";
import Link from "next/link";

const EXAM_TYPES = ["Unit Test", "Quarterly", "Half Yearly", "Annual Exam"];

interface Exam {
  id: string;
  examName: string;
  academicSession: number;
  examType: string;
  startDate: string;
  endDate: string;
  isPublished: boolean;
  resultCount: number;
  createdAt: string;
  updatedAt: string;
}

const examTypeColors: Record<string, string> = {
  "Unit Test": "bg-cyan-100 text-cyan-700",
  Quarterly: "bg-violet-100 text-violet-700",
  "Half Yearly": "bg-amber-100 text-amber-700",
  "Annual Exam": "bg-rose-100 text-rose-700",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getExamStatus(exam: Exam) {
  const now = new Date();
  const start = new Date(exam.startDate);
  const end = new Date(exam.endDate);
  if (now < start) return "Upcoming";
  if (now > end) return "Completed";
  return "Ongoing";
}

const statusColors: Record<string, string> = {
  Upcoming: "bg-blue-100 text-blue-700",
  Ongoing: "bg-green-100 text-green-700",
  Completed: "bg-gray-100 text-gray-600",
};

interface ExamForm {
  examName: string;
  academicSession: string;
  examType: string;
  startDate: string;
  endDate: string;
}

const emptyForm: ExamForm = {
  examName: "",
  academicSession: "2026",
  examType: "",
  startDate: "",
  endDate: "",
};

export default function AdminExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sessionFilter, setSessionFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [form, setForm] = useState<ExamForm>(emptyForm);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const fetchExams = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (sessionFilter) params.set("academicSession", sessionFilter);
      if (typeFilter) params.set("examType", typeFilter);

      const res = await fetch(`/api/exams?${params}`);
      if (!res.ok) return;
      const data = await res.json();
      setExams(data.exams || []);
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  }, [sessionFilter, typeFilter]);

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  const filteredExams = useMemo(() => {
    if (!search) return exams;
    const q = search.toLowerCase();
    return exams.filter((e) => e.examName.toLowerCase().includes(q));
  }, [exams, search]);

  const uniqueSessions = [
    ...new Set(exams.map((e) => e.academicSession)),
  ].sort((a, b) => b - a);

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/exams/${id}`, { method: "DELETE" });
      if (res.ok) {
        setExams((prev) => prev.filter((e) => e.id !== id));
      }
    } catch {
      /* silent */
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  }

  async function handleTogglePublish(id: string, current: boolean) {
    setTogglingId(id);
    try {
      const res = await fetch(`/api/exams/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !current }),
      });
      if (res.ok) {
        setExams((prev) =>
          prev.map((e) =>
            e.id === id ? { ...e, isPublished: !current } : e
          )
        );
      }
    } catch {
      /* silent */
    } finally {
      setTogglingId(null);
    }
  }

  function openCreate() {
    setEditingExam(null);
    setForm(emptyForm);
    setFormErrors({});
    setFormOpen(true);
  }

  function openEdit(exam: Exam) {
    setEditingExam(exam);
    setForm({
      examName: exam.examName,
      academicSession: String(exam.academicSession),
      examType: exam.examType,
      startDate: exam.startDate.split("T")[0],
      endDate: exam.endDate.split("T")[0],
    });
    setFormErrors({});
    setFormOpen(true);
  }

  function validateForm() {
    const errors: Record<string, string> = {};
    if (!form.examName.trim()) errors.examName = "Exam name is required";
    if (!form.academicSession) errors.academicSession = "Session is required";
    if (!form.examType) errors.examType = "Exam type is required";
    if (!form.startDate) errors.startDate = "Start date is required";
    if (!form.endDate) errors.endDate = "End date is required";
    if (form.startDate && form.endDate && form.startDate > form.endDate) {
      errors.endDate = "End date must be after start date";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSave() {
    if (!validateForm()) return;
    setSaving(true);
    try {
      const body = {
        examName: form.examName.trim(),
        academicSession: Number(form.academicSession),
        examType: form.examType,
        startDate: form.startDate,
        endDate: form.endDate,
      };

      const url = editingExam
        ? `/api/exams/${editingExam.id}`
        : "/api/exams";
      const method = editingExam ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        const saved = data.exam || data;
        if (editingExam) {
          setExams((prev) =>
            prev.map((e) =>
              e.id === editingExam.id ? { ...e, ...saved } : e
            )
          );
        } else {
          setExams((prev) => [saved, ...prev]);
        }
        setFormOpen(false);
      }
    } catch {
      /* silent */
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Exams</h1>
          <p className="text-gray-500 text-sm mt-1">
            Create and manage exams, enter results, and view rankings
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-[#FF9933] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e8892e] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Exam
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search exams..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
              />
            </div>
            <div className="relative">
              <select
                value={sessionFilter}
                onChange={(e) => setSessionFilter(e.target.value)}
                className="w-full sm:w-36 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Sessions</option>
                {uniqueSessions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
                {uniqueSessions.length === 0 && (
                  <>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </>
                )}
              </select>
            </div>
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full sm:w-44 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Types</option>
                {EXAM_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#1B3A5C] border-t-transparent mx-auto" />
          </div>
        ) : filteredExams.length === 0 ? (
          <div className="p-12 text-center">
            <BookText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No exams found
            </h3>
            <p className="text-gray-500 text-sm">
              {search || sessionFilter || typeFilter
                ? "Try a different search or filter"
                : "Create your first exam to get started"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Exam Name
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Session
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Type
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Start Date
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    End Date
                  </th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Results
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Status
                  </th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredExams.map((exam) => {
                  const status = getExamStatus(exam);
                  return (
                    <tr
                      key={exam.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/exams/${exam.id}`}
                          className="text-sm font-medium text-[#1B3A5C] hover:underline"
                        >
                          {exam.examName}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 font-mono">
                        {exam.academicSession}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            examTypeColors[exam.examType] ||
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {exam.examType}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          {formatDate(exam.startDate)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          {formatDate(exam.endDate)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm font-medium text-gray-700">
                          {exam.resultCount || 0}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                            statusColors[status]
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() =>
                              handleTogglePublish(exam.id, exam.isPublished)
                            }
                            disabled={togglingId === exam.id}
                            className={`p-1.5 rounded-lg transition-colors ${
                              togglingId === exam.id
                                ? "opacity-50 cursor-not-allowed"
                                : exam.isPublished
                                ? "text-green-600 hover:bg-green-50"
                                : "text-gray-400 hover:bg-gray-100"
                            }`}
                            title={
                              exam.isPublished ? "Unpublish" : "Publish"
                            }
                          >
                            {togglingId === exam.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : exam.isPublished ? (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : (
                              <Globe className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <Link
                            href={`/admin/exams/${exam.id}`}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => openEdit(exam)}
                            className="p-1.5 text-gray-400 hover:text-[#FF9933] hover:bg-amber-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteId(exam.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Exam
              </h3>
              <button
                onClick={() => setDeleteId(null)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this exam? All associated results
              will also be removed. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {formOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingExam ? "Edit Exam" : "Create Exam"}
              </h3>
              <button
                onClick={() => setFormOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exam Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.examName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, examName: e.target.value }))
                  }
                  placeholder="e.g. Half Yearly Examination 2026"
                  className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent ${
                    formErrors.examName ? "border-red-400" : "border-gray-300"
                  }`}
                />
                {formErrors.examName && (
                  <p className="text-xs text-red-500 mt-1">
                    {formErrors.examName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Academic Session <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="2020"
                    max="2030"
                    value={form.academicSession}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        academicSession: e.target.value,
                      }))
                    }
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent ${
                      formErrors.academicSession
                        ? "border-red-400"
                        : "border-gray-300"
                    }`}
                  />
                  {formErrors.academicSession && (
                    <p className="text-xs text-red-500 mt-1">
                      {formErrors.academicSession}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exam Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.examType}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, examType: e.target.value }))
                    }
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white ${
                      formErrors.examType ? "border-red-400" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Type</option>
                    {EXAM_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {formErrors.examType && (
                    <p className="text-xs text-red-500 mt-1">
                      {formErrors.examType}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, startDate: e.target.value }))
                    }
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent ${
                      formErrors.startDate
                        ? "border-red-400"
                        : "border-gray-300"
                    }`}
                  />
                  {formErrors.startDate && (
                    <p className="text-xs text-red-500 mt-1">
                      {formErrors.startDate}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, endDate: e.target.value }))
                    }
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent ${
                      formErrors.endDate ? "border-red-400" : "border-gray-300"
                    }`}
                  />
                  {formErrors.endDate && (
                    <p className="text-xs text-red-500 mt-1">
                      {formErrors.endDate}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => setFormOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#FF9933] hover:bg-[#e8892e] rounded-lg transition-colors disabled:opacity-50"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingExam ? "Save Changes" : "Create Exam"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
