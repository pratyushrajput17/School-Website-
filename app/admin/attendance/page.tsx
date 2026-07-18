"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Calendar,
  Search,
  Download,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Minus,
  AlertCircle,
} from "lucide-react";

interface AttendanceRecord {
  id: string;
  studentId: string;
  teacherId: string;
  className: string;
  section: string;
  attendanceDate: string;
  status: string;
  remarks: string;
  student: { studentName: string; admissionNumber: string } | null;
}

interface AttendanceStats {
  total: number;
  present: number;
  absent: number;
  late: number;
  halfDay: number;
  leave: number;
  percentage: number;
}

const STATUS_ICONS: Record<string, { icon: typeof CheckCircle2; color: string }> = {
  Present: { icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
  Absent: { icon: XCircle, color: "text-red-600 bg-red-50" },
  Late: { icon: Clock, color: "text-amber-600 bg-amber-50" },
  "Half Day": { icon: Minus, color: "text-orange-600 bg-orange-50" },
  Leave: { icon: AlertCircle, color: "text-purple-600 bg-purple-50" },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminAttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [stats, setStats] = useState<AttendanceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [classes, setClasses] = useState<string[]>([]);
  const [sections, setSections] = useState<string[]>([]);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetch("/api/students?limit=1")
      .then((r) => r.json())
      .catch(() => ({}));
    fetchClasses();
    fetchSections();
  }, []);

  async function fetchClasses() {
    try {
      const res = await fetch("/api/students?limit=1");
      const data = await res.json();
      if (data.classes) setClasses(data.classes);
    } catch {}
  }

  async function fetchSections() {
    try {
      const res = await fetch("/api/students?limit=1");
      const data = await res.json();
      if (data.sections) setSections(data.sections);
    } catch {}
  }

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (date) params.set("date", date);
      if (className) params.set("className", className);
      if (section) params.set("section", section);
      if (statusFilter) params.set("status", statusFilter);

      const [recordsRes, statsRes] = await Promise.all([
        fetch(`/api/attendance?${params}`),
        fetch(`/api/attendance/stats?${params}`),
      ]);

      if (recordsRes.ok) {
        const data = await recordsRes.json();
        setRecords(data.records);
      }
      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.stats);
      }
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  }, [date, className, section, statusFilter]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  async function handleExport() {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      if (date) params.set("startDate", date);
      if (date) params.set("endDate", date);
      if (className) params.set("className", className);
      if (section) params.set("section", section);
      if (statusFilter) params.set("status", statusFilter);

      const res = await fetch(`/api/attendance/export?${params}`);
      if (!res.ok) return;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `attendance-${date || "all"}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      /* silent */
    } finally {
      setExporting(false);
    }
  }

  const filteredRecords = search
    ? records.filter(
        (r) =>
          r.student?.studentName.toLowerCase().includes(search.toLowerCase()) ||
          r.student?.admissionNumber.toLowerCase().includes(search.toLowerCase())
      )
    : records;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-500 text-sm mt-1">
            View and manage student attendance records
          </p>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {exporting ? "Exporting..." : "Export CSV"}
        </button>
      </div>

      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Total</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl border border-green-200 p-4 text-center">
            <p className="text-xs text-green-600 uppercase tracking-wider">Present</p>
            <p className="text-2xl font-bold text-green-700 mt-1">{stats.present}</p>
          </div>
          <div className="bg-white rounded-xl border border-red-200 p-4 text-center">
            <p className="text-xs text-red-600 uppercase tracking-wider">Absent</p>
            <p className="text-2xl font-bold text-red-700 mt-1">{stats.absent}</p>
          </div>
          <div className="bg-white rounded-xl border border-amber-200 p-4 text-center">
            <p className="text-xs text-amber-600 uppercase tracking-wider">Late</p>
            <p className="text-2xl font-bold text-amber-700 mt-1">{stats.late}</p>
          </div>
          <div className="bg-white rounded-xl border border-orange-200 p-4 text-center">
            <p className="text-xs text-orange-600 uppercase tracking-wider">Half Day</p>
            <p className="text-2xl font-bold text-orange-700 mt-1">{stats.halfDay}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wider">% Present</p>
            <p className={`text-2xl font-bold mt-1 ${
              stats.percentage >= 75 ? "text-emerald-600" : "text-red-600"
            }`}>
              {stats.percentage}%
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
              />
            </div>
            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Classes</option>
              {["Nursery", "KG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(
                (c) => (
                  <option key={c} value={c}>
                    Class {c}
                  </option>
                )
              )}
            </select>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Sections</option>
              {["A", "B", "C"].map((s) => (
                <option key={s} value={s}>
                  Section {s}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
              <option value="Half Day">Half Day</option>
              <option value="Leave">Leave</option>
            </select>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by student name or admission number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#1B3A5C] border-t-transparent mx-auto" />
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No attendance records found
            </h3>
            <p className="text-gray-500 text-sm">
              {date
                ? "No attendance has been marked for this date"
                : "Select a date and filters to view attendance"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Student
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Admission No.
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Class / Section
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Date
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Status
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredRecords.map((record) => {
                  const statusInfo = STATUS_ICONS[record.status] || STATUS_ICONS["Present"];
                  const StatusIcon = statusInfo.icon;
                  return (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {record.student?.studentName || "Unknown"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 font-mono">
                        {record.student?.admissionNumber || "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        Class {record.className} - {record.section}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {formatDate(record.attendanceDate)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${statusInfo.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {record.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">
                        {record.remarks || "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
