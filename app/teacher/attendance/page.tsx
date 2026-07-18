"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Minus,
  AlertCircle,
  Save,
  Loader2,
  Search,
} from "lucide-react";

interface Student {
  id: string;
  studentName: string;
  admissionNumber: string;
  className: string;
  section: string;
}

interface AttendanceEntry {
  studentId: string;
  status: string;
  remarks: string;
}

const STATUS_OPTIONS = ["Present", "Absent", "Late", "Half Day", "Leave"] as const;

const STATUS_BADGES: Record<string, { bg: string; text: string; icon: typeof CheckCircle2 }> = {
  Present: { bg: "bg-emerald-100", text: "text-emerald-700", icon: CheckCircle2 },
  Absent: { bg: "bg-red-100", text: "text-red-700", icon: XCircle },
  Late: { bg: "bg-amber-100", text: "text-amber-700", icon: Clock },
  "Half Day": { bg: "bg-orange-100", text: "text-orange-700", icon: Minus },
  Leave: { bg: "bg-purple-100", text: "text-purple-700", icon: AlertCircle },
};

export default function TeacherAttendancePage() {
  const router = useRouter();
  const [teacherInfo, setTeacherInfo] = useState<{
    id: string;
    assignedClasses: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Record<string, AttendanceEntry>>({});
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [existingRecords, setExistingRecords] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");
  const [bulkStatus, setBulkStatus] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const assignedClasses = teacherInfo?.assignedClasses
    ? teacherInfo.assignedClasses.split(",").map((c) => c.trim())
    : [];

  useEffect(() => {
    fetch("/api/auth/teacher/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.teacher) {
          setTeacherInfo({
            id: data.teacher.id,
            assignedClasses: data.teacher.assignedClasses,
          });
        }
      })
      .catch(() => router.push("/teacher/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const fetchStudents = useCallback(async () => {
    if (!selectedClass || !selectedSection) return;
    setStudentsLoading(true);
    try {
      const params = new URLSearchParams({
        className: selectedClass,
        section: selectedSection,
        status: "Active",
      });
      const res = await fetch(`/api/students?${params}`);
      const data = await res.json();
      const studentList = data.students || [];

      setStudents(studentList);

      const attParams = new URLSearchParams({
        date,
        className: selectedClass,
        section: selectedSection,
      });
      const attRes = await fetch(`/api/attendance?${attParams}`);
      const attData = await attRes.json();
      const existing: Record<string, string> = {};
      const attMap: Record<string, AttendanceEntry> = {};

      for (const record of attData.records || []) {
        existing[record.studentId] = record.status;
        attMap[record.studentId] = {
          studentId: record.studentId,
          status: record.status,
          remarks: record.remarks,
        };
      }

      setExistingRecords(existing);
      setAttendance(attMap);
    } catch {
      /* silent */
    } finally {
      setStudentsLoading(false);
    }
  }, [selectedClass, selectedSection, date]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  function setStudentStatus(studentId: string, status: string) {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: {
        studentId,
        status,
        remarks: prev[studentId]?.remarks || "",
      },
    }));
  }

  function setStudentRemarks(studentId: string, remarks: string) {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: {
        studentId,
        status: prev[studentId]?.status || "Present",
        remarks,
      },
    }));
  }

  function applyBulkStatus() {
    if (!bulkStatus) return;
    const newAttendance = { ...attendance };
    for (const student of students) {
      newAttendance[student.id] = {
        studentId: student.id,
        status: bulkStatus,
        remarks: newAttendance[student.id]?.remarks || "",
      };
    }
    setAttendance(newAttendance);
  }

  function markAllPresent() {
    const newAttendance: Record<string, AttendanceEntry> = {};
    for (const student of students) {
      newAttendance[student.id] = {
        studentId: student.id,
        status: "Present",
        remarks: "",
      };
    }
    setAttendance(newAttendance);
  }

  async function handleSave() {
    if (!selectedClass || !selectedSection) return;
    setSaving(true);
    setMessage(null);

    const records = Object.values(attendance);
    if (records.length === 0) {
      setMessage({ type: "error", text: "No attendance records to save." });
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          className: selectedClass,
          section: selectedSection,
          attendanceDate: date,
          records: records.map((r) => ({
            studentId: r.studentId,
            status: r.status,
            remarks: r.remarks,
          })),
        }),
      });

      if (res.ok) {
        setMessage({
          type: "success",
          text: `Attendance saved successfully for ${records.length} student(s).`,
        });
        fetchStudents();
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "Failed to save attendance." });
      }
    } catch {
      setMessage({ type: "error", text: "Something went wrong." });
    } finally {
      setSaving(false);
    }
  }

  const filteredStudents = search
    ? students.filter(
        (s) =>
          s.studentName.toLowerCase().includes(search.toLowerCase()) ||
          s.admissionNumber.toLowerCase().includes(search.toLowerCase())
      )
    : students;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#1B3A5C] border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mark Attendance</h1>
        <p className="text-gray-500 text-sm mt-1">
          Select class and section to mark daily attendance
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white min-w-[140px]"
            >
              <option value="">Select Class</option>
              {assignedClasses.map((c) => (
                <option key={c} value={c}>
                  Class {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white min-w-[140px]"
            >
              <option value="">Select Section</option>
              {["A", "B", "C"].map((s) => (
                <option key={s} value={s}>
                  Section {s}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={fetchStudents}
            disabled={!selectedClass || !selectedSection || studentsLoading}
            className="px-4 py-2 bg-[#1B3A5C] text-white rounded-lg text-sm font-medium hover:bg-[#152d4a] transition-colors disabled:opacity-50"
          >
            {studentsLoading ? "Loading..." : "Load Students"}
          </button>
        </div>
      </div>

      {selectedClass && selectedSection && students.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="font-semibold text-gray-900">
                  Class {selectedClass} - Section {selectedSection}
                </h2>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {students.length} students
                </span>
                {Object.keys(existingRecords).length > 0 && (
                  <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    {Object.keys(existingRecords).length} already marked
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-48 pl-9 pr-4 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
                  />
                </div>
                <div className="flex gap-1">
                  <select
                    value={bulkStatus}
                    onChange={(e) => setBulkStatus(e.target.value)}
                    className="px-2 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white"
                  >
                    <option value="">Bulk action</option>
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        Mark all {s}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={applyBulkStatus}
                    disabled={!bulkStatus}
                    className="px-2 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 w-8">
                    #
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Student Name
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Admission No.
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
                {filteredStudents.map((student, idx) => {
                  const entry = attendance[student.id];
                  const status = entry?.status || "";
                  const statusBadge = STATUS_BADGES[status];
                  const StatusIcon = statusBadge?.icon || CheckCircle2;

                  return (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-400">{idx + 1}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {student.studentName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 font-mono">
                        {student.admissionNumber}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5 flex-wrap">
                          {STATUS_OPTIONS.map((opt) => {
                            const badge = STATUS_BADGES[opt];
                            const isActive = status === opt;
                            return (
                              <button
                                key={opt}
                                onClick={() => setStudentStatus(student.id, opt)}
                                className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full transition-all ${
                                  isActive
                                    ? `${badge.bg} ${badge.text} ring-2 ring-offset-1 ring-gray-400`
                                    : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                }`}
                              >
                                <badge.icon className="w-3 h-3" />
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          placeholder="Optional remarks..."
                          value={entry?.remarks || ""}
                          onChange={(e) => setStudentRemarks(student.id, e.target.value)}
                          className="w-32 px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#FF9933] focus:border-transparent"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="p-8 text-center text-gray-500 text-sm">
              {search ? "No students match your search." : "No students found in this class/section."}
            </div>
          )}

          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex gap-3 text-sm">
              {STATUS_OPTIONS.map((opt) => {
                const count = Object.values(attendance).filter((a) => a.status === opt).length;
                if (count === 0) return null;
                const badge = STATUS_BADGES[opt];
                return (
                  <span key={opt} className={`text-xs font-medium ${badge.text}`}>
                    {opt}: {count}
                  </span>
                );
              })}
              {Object.keys(attendance).length > 0 && (
                <span className="text-xs text-gray-500">
                  Total: {Object.keys(attendance).length}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={markAllPresent}
                className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                All Present
              </button>
              <button
                onClick={handleSave}
                disabled={saving || Object.keys(attendance).length === 0}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FF9933] text-white rounded-lg text-sm font-medium hover:bg-[#e8892e] transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? "Saving..." : "Save Attendance"}
              </button>
            </div>
          </div>
        </div>
      )}

      {!selectedClass && !selectedSection && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <ClipboardCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            Select Class & Section
          </h3>
          <p className="text-gray-500 text-sm">
            Choose a class and section above to start marking attendance
          </p>
        </div>
      )}

      {message && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg text-sm font-medium ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
