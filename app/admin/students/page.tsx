"use client";

import { useState, useEffect, useCallback } from "react";
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
  Filter,
} from "lucide-react";

interface Student {
  id: string;
  admissionNumber: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  mobileNumber: string;
  className: string;
  section: string;
  dateOfBirth: string;
  address: string;
  status: string;
  admissionDate: string;
  createdAt: string;
}

const CLASSES = Array.from({ length: 12 }, (_, i) => String(i + 1));

const SECTIONS = ["A", "B", "C"];

export default function AdminStudentsPage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportClass, setExportClass] = useState("");
  const [exporting, setExporting] = useState(false);

  const fetchStudents = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (classFilter) params.set("className", classFilter);
      if (sectionFilter) params.set("section", sectionFilter);

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
  }, [search, classFilter, sectionFilter, router]);

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
      if (!all && exportClass) params.set("className", exportClass);

      const res = await fetch(`/api/students/export?${params}`);
      if (!res.ok) return;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = all ? "students-all.csv" : `students-class-${exportClass}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      /* silent */
    } finally {
      setExporting(false);
      setExportOpen(false);
    }
  }

  function formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
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
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    Class Wise
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={exportClass}
                      onChange={(e) => setExportClass(e.target.value)}
                      className="flex-1 px-2 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white"
                    >
                      <option value="">Select Class</option>
                      {CLASSES.map((c) => (
                        <option key={c} value={c}>
                          Class {c}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleExport(false)}
                      disabled={exporting || !exportClass}
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

      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, admission no, father name, or mobile..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="w-full sm:w-32 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
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
              {search || classFilter || sectionFilter
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
                    <td className="px-4 py-3 text-sm font-mono text-gray-700">
                      {student.admissionNumber}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/students/edit/${student.id}`}
                        className="text-sm font-medium text-gray-900 hover:text-[#FF9933]"
                      >
                        {student.studentName}
                      </Link>
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
