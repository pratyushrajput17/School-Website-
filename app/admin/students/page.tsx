"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Trash2,
  Edit3,
  Users,
  X,
  Download,
  ChevronDown,
  Upload,
  Loader2,
  Eye,
  CheckCircle2,
} from "lucide-react";

interface Student {
  id: string;
  admissionNumber: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  mobileNumber: string;
  alternateMobile: string;
  dateOfBirth: string;
  gender: string;
  className: string;
  section: string;
  address: string;
  status: string;
  admissionDate: string;
  photoUrl: string | null;
  createdAt: string;
}

interface ImportResult {
  row: number;
  admissionNumber: string;
  studentName: string;
  status: "created" | "skipped" | "error";
  error?: string;
}

const CLASSES = Array.from({ length: 12 }, (_, i) => String(i + 1));
const SECTIONS = ["A", "B", "C"];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminStudentsPage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportClass, setExportClass] = useState("");
  const [exportSection, setExportSection] = useState("");
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

  const fetchStudents = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (classFilter) params.set("className", classFilter);
      if (sectionFilter) params.set("section", sectionFilter);
      if (statusFilter) params.set("status", statusFilter);

      const res = await fetch(`/api/students?${params}`);
      if (!res.ok) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setStudents(data.students);
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  }, [search, classFilter, sectionFilter, statusFilter, router]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
      if (res.ok) {
        setStudents((prev) => prev.filter((s) => s.id !== id));
      }
    } catch {
      /* silent */
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  }

  async function handleExport(all: boolean) {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      if (!all) {
        if (exportClass) params.set("className", exportClass);
        if (exportSection) params.set("section", exportSection);
      }

      const res = await fetch(`/api/students/export?${params}`);
      if (!res.ok) return;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      let filename = "students-all.csv";
      if (exportClass && exportSection)
        filename = `students-class-${exportClass}-section-${exportSection}.csv`;
      else if (exportClass)
        filename = `students-class-${exportClass}.csv`;
      else if (exportSection)
        filename = `students-section-${exportSection}.csv`;
      a.download = filename;
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

      const res = await fetch("/api/students/import", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setImportSummary({
          total: 0,
          created: 0,
          errors: 1,
          skipped: 0,
        });
        return;
      }

      setImportSummary(data.summary);
      setImportResults(data.results);
      fetchStudents();
    } catch {
      setImportSummary({ total: 0, created: 0, errors: 1, skipped: 0 });
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function downloadSampleCSV() {
    const headers = [
      "admissionNumber",
      "studentName",
      "fatherName",
      "motherName",
      "mobileNumber",
      "alternateMobile",
      "dateOfBirth",
      "gender",
      "className",
      "section",
      "address",
      "admissionDate",
      "status",
    ];
    const sampleRow = [
      "AHS-2026-001",
      "Rahul Kumar",
      "Suresh Kumar",
      "Sunita Devi",
      "9876543210",
      "9876543211",
      "2010-05-15",
      "Male",
      "10",
      "A",
      "123, Main Street, City",
      "2026-04-01",
      "Active",
    ];
    const csv = [headers.join(","), sampleRow.join(",")].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample-students.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Manage Students
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Add, edit, and manage student records
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
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-3">
                <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
                  Export Options
                </p>
                <button
                  onClick={() => handleExport(true)}
                  disabled={exporting}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg disabled:opacity-50"
                >
                  All Students
                </button>
                <div className="mt-2 pt-2 border-t border-gray-100 space-y-2">
                  <label className="text-xs font-medium text-gray-500 block">
                    Filtered Export
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={exportClass}
                      onChange={(e) => setExportClass(e.target.value)}
                      className="flex-1 px-2 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white"
                    >
                      <option value="">All Classes</option>
                      {CLASSES.map((c) => (
                        <option key={c} value={c}>
                          Class {c}
                        </option>
                      ))}
                    </select>
                    <select
                      value={exportSection}
                      onChange={(e) => setExportSection(e.target.value)}
                      className="flex-1 px-2 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white"
                    >
                      <option value="">All Sections</option>
                      {SECTIONS.map((s) => (
                        <option key={s} value={s}>
                          Section {s}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleExport(false)}
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
            href="/admin/students/create"
            className="inline-flex items-center gap-2 bg-[#FF9933] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e8892e] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Student
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
                    <th className="text-left py-1 pr-2">Student</th>
                    <th className="text-left py-1 pr-2">Status</th>
                    <th className="text-left py-1">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {importResults.map((r, idx) => (
                    <tr key={idx} className="border-b border-gray-50">
                      <td className="py-1 pr-2 text-gray-500">{r.row}</td>
                      <td className="py-1 pr-2">
                        {r.studentName || r.admissionNumber}
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
                      <td className="py-1 text-gray-500">
                        {r.error || ""}
                      </td>
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
                placeholder="Search by name, admission no, father, mother, or mobile..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="relative">
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="w-full sm:w-28 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
                >
                  <option value="">All Classes</option>
                  {CLASSES.map((c) => (
                    <option key={c} value={c}>
                      Class {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <select
                  value={sectionFilter}
                  onChange={(e) => setSectionFilter(e.target.value)}
                  className="w-full sm:w-28 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
                >
                  <option value="">All Sections</option>
                  {SECTIONS.map((s) => (
                    <option key={s} value={s}>
                      Section {s}
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
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Transferred">Transferred</option>
                  <option value="Left">Left</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#1B3A5C] border-t-transparent mx-auto" />
          </div>
        ) : students.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No students found
            </h3>
            <p className="text-gray-500 text-sm">
              {search || classFilter || sectionFilter || statusFilter
                ? "Try a different search or filter"
                : "Add your first student to get started"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Photo
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Admission No.
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Student Name
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Father Name
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Mobile
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Class
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Section
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
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      {student.photoUrl ? (
                        <img
                          src={student.photoUrl}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-saffron-light flex items-center justify-center text-xs font-bold text-saffron-dark">
                          {student.studentName.charAt(0)}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-700">
                      {student.admissionNumber}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {student.studentName}
                        </span>
                        {student.gender && (
                          <span className="text-[10px] text-gray-400">
                            ({student.gender})
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {student.fatherName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {student.mobileNumber}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      {student.className}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {student.section}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          student.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : student.status === "Inactive"
                            ? "bg-gray-100 text-gray-600"
                            : student.status === "Transferred"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/students/${student.id}`}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/admin/students/edit/${student.id}`}
                          className="p-1.5 text-gray-400 hover:text-[#FF9933] hover:bg-amber-50 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(student.id)}
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
                Delete Student
              </h3>
              <button
                onClick={() => setDeleteId(null)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this student record? This action
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
