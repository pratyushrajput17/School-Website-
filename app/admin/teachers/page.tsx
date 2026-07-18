"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Trash2,
  Edit3,
  X,
  Download,
  ChevronDown,
  Upload,
  Loader2,
  Eye,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

interface Teacher {
  id: string;
  employeeId: string;
  teacherName: string;
  email: string;
  phone: string;
  subject: string;
  assignedClasses: string;
  joiningDate: string;
  qualification: string;
  address: string;
  photoUrl: string | null;
  status: string;
  createdAt: string;
}

interface ImportResult {
  row: number;
  employeeId: string;
  teacherName: string;
  status: "created" | "skipped" | "error";
  error?: string;
}

const SUBJECTS = [
  "Hindi",
  "English",
  "Mathematics",
  "Science",
  "Social Science",
  "Sanskrit",
  "Computer Science",
  "Physical Education",
  "Art & Craft",
  "Music",
];

const STATUS_OPTIONS = ["Active", "Inactive"];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminTeachersPage() {
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportSubject, setExportSubject] = useState("");
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importResults, setImportResults] = useState<ImportResult[] | null>(
    null
  );
  const [importSummary, setImportSummary] = useState<{
    total: number;
    created: number;
    errors: number;
    skipped: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchTeachers = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (subjectFilter) params.set("subject", subjectFilter);
      if (statusFilter) params.set("status", statusFilter);

      const res = await fetch(`/api/teachers?${params}`);
      if (!res.ok) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setTeachers(data.teachers);
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  }, [search, subjectFilter, statusFilter, router]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/teachers/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTeachers((prev) => prev.filter((t) => t.id !== id));
      }
    } catch {
      /* silent */
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  }

  async function handleExport() {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      if (exportSubject) params.set("subject", exportSubject);

      const res = await fetch(`/api/teachers/export?${params}`);
      if (!res.ok) return;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = exportSubject
        ? `teachers-subject-${exportSubject.replace(/\s+/g, "-").toLowerCase()}.csv`
        : "teachers-all.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      /* silent */
    } finally {
      setExporting(false);
      setExportOpen(false);
    }
  }

  async function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setImportResults(null);
    setImportSummary(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/teachers/import", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setImportSummary({ total: 0, created: 0, errors: 1, skipped: 0 });
        return;
      }

      setImportSummary(data.summary);
      setImportResults(data.results);
      fetchTeachers();
    } catch {
      setImportSummary({ total: 0, created: 0, errors: 1, skipped: 0 });
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function downloadSampleCSV() {
    const headers = [
      "employeeId",
      "teacherName",
      "email",
      "phone",
      "subject",
      "assignedClasses",
      "joiningDate",
      "qualification",
      "address",
      "status",
    ];
    const sampleRow = [
      "TCH-001",
      "Anita Sharma",
      "anita.sharma@adarshschool.edu",
      "9876543210",
      "Mathematics",
      "9,10,11,12",
      "2020-06-01",
      "M.Sc., B.Ed.",
      "123, Teacher Colony, City",
      "Active",
    ];
    const csv = [headers.join(","), sampleRow.join(",")].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample-teachers.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Manage Teachers
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Add, edit, and manage teacher records
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleImportFile}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={importing}
            className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {importing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            Import CSV
          </button>
          <div className="relative">
            <button
              onClick={() => setExportOpen(!exportOpen)}
              className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {exportOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-3">
                <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
                  Export Options
                </p>
                <button
                  onClick={() => {
                    setExportSubject("");
                    handleExport();
                  }}
                  disabled={exporting}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg disabled:opacity-50"
                >
                  All Teachers
                </button>
                <div className="mt-2 pt-2 border-t border-gray-100 space-y-2">
                  <label className="text-xs font-medium text-gray-500 block">
                    By Subject
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={exportSubject}
                      onChange={(e) => setExportSubject(e.target.value)}
                      className="flex-1 px-2 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white"
                    >
                      <option value="">All Subjects</option>
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleExport}
                      disabled={exporting}
                      className="px-3 py-1.5 text-xs font-medium bg-[#FF9933] text-white rounded-lg hover:bg-[#e8892e] disabled:opacity-50"
                    >
                      {exporting ? "..." : "Go"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link
            href="/admin/teachers/create"
            className="inline-flex items-center gap-2 bg-[#FF9933] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e8892e] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Teacher
          </Link>
        </div>
      </div>

      {importSummary && (
        <div className="mb-6 bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Upload className="w-4 h-4 text-[#FF9933]" />
              Import Results
            </h3>
            <button
              onClick={() => {
                setImportSummary(null);
                setImportResults(null);
              }}
              className="p-1 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="flex gap-4 text-sm">
            <span className="text-gray-600">
              Total: <strong>{importSummary.total}</strong>
            </span>
            <span className="text-green-600">
              Created: <strong>{importSummary.created}</strong>
            </span>
            {importSummary.skipped > 0 && (
              <span className="text-amber-600">
                Skipped: <strong>{importSummary.skipped}</strong>
              </span>
            )}
            {importSummary.errors > 0 && (
              <span className="text-red-600">
                Errors: <strong>{importSummary.errors}</strong>
              </span>
            )}
          </div>
          {importResults && importResults.length > 0 && (
            <div className="mt-3 max-h-40 overflow-y-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-1 pr-2">Row</th>
                    <th className="text-left py-1 pr-2">Teacher</th>
                    <th className="text-left py-1 pr-2">Status</th>
                    <th className="text-left py-1">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {importResults.map((r, idx) => (
                    <tr key={idx} className="border-b border-gray-50">
                      <td className="py-1 pr-2 text-gray-500">{r.row}</td>
                      <td className="py-1 pr-2">
                        {r.teacherName || r.employeeId}
                      </td>
                      <td className="py-1 pr-2">
                        {r.status === "created" ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Created
                          </span>
                        ) : r.status === "skipped" ? (
                          <span className="text-amber-600">Skipped</span>
                        ) : (
                          <span className="text-red-600">Error</span>
                        )}
                      </td>
                      <td className="py-1 text-gray-500">{r.error || ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, employee ID, email, phone, or subject..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
                >
                  <option value="">All Subjects</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full sm:w-28 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
                >
                  <option value="">All Status</option>
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#1B3A5C] border-t-transparent mx-auto" />
          </div>
        ) : teachers.length === 0 ? (
          <div className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No teachers found
            </h3>
            <p className="text-gray-500 text-sm">
              {search || subjectFilter || statusFilter
                ? "Try a different search or filter"
                : "Add your first teacher to get started"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Employee ID
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Teacher Name
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Email / Phone
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Subject
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Classes
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
                {teachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-mono text-gray-700">
                      {teacher.employeeId}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/teachers/${teacher.id}`}
                        className="text-sm font-medium text-gray-900 hover:text-[#FF9933]"
                      >
                        {teacher.teacherName}
                      </Link>
                      <p className="text-xs text-gray-400">
                        {teacher.qualification}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      <p>{teacher.email}</p>
                      <p className="text-xs text-gray-400">
                        {teacher.phone}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">
                      {teacher.subject}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {teacher.assignedClasses
                        ? teacher.assignedClasses
                            .split(",")
                            .map((c) => c.trim())
                            .map((c) => (
                              <span
                                key={c}
                                className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded mr-1 mb-0.5"
                              >
                                {c}
                              </span>
                            ))
                        : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          teacher.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {teacher.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/teachers/${teacher.id}`}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/admin/teachers/edit/${teacher.id}`}
                          className="p-1.5 text-gray-400 hover:text-[#FF9933] hover:bg-amber-50 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(teacher.id)}
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
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Teacher
              </h3>
              <button
                onClick={() => setDeleteId(null)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this teacher record? This action
              cannot be undone.
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

      {exportOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setExportOpen(false)}
        />
      )}
    </div>
  );
}
