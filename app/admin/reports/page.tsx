"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FileBarChart,
  Users,
  GraduationCap,
  ClipboardCheck,
  BookOpen,
  Download,
  Search,
  Loader2,
  Calendar,
  TrendingUp,
  Award,
  School,
  FileSpreadsheet,
} from "lucide-react";

interface Student {
  id: string;
  admissionNumber: string;
  studentName: string;
  fatherName: string;
  mobileNumber: string;
  className: string;
  section: string;
  status: string;
}

interface Teacher {
  id: string;
  employeeId: string;
  teacherName: string;
  phone: string;
  subject: string;
  status: string;
}

interface AttendanceRow {
  className: string;
  total: number;
  present: number;
  absent: number;
  percentage: number;
}

interface HomeworkItem {
  id: string;
  title: string;
  subject: string;
  className: string;
  section: string;
  teacherName: string;
  assignedDate: string;
  dueDate: string;
}

const CLASSES = Array.from({ length: 12 }, (_, i) => String(i + 1));
const TABS = ["Students", "Teachers", "Attendance", "Homework"] as const;
type Tab = (typeof TABS)[number];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Students");
  const [loading, setLoading] = useState(true);

  const [students, setStudents] = useState<Student[]>([]);
  const [studentClassFilter, setStudentClassFilter] = useState("");

  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [attendance, setAttendance] = useState<AttendanceRow[]>([]);
  const [attendanceDays, setAttendanceDays] = useState(30);
  const [todayCount, setTodayCount] = useState(0);
  const [monthlyAvg, setMonthlyAvg] = useState(0);

  const [homework, setHomework] = useState<HomeworkItem[]>([]);
  const [homeworkMonthTotal, setHomeworkMonthTotal] = useState(0);

  const [summary, setSummary] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalExams: 0,
    attendanceRate: 0,
  });

  const [exporting, setExporting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [studentsRes, teachersRes, attendanceRes, homeworkRes] =
        await Promise.all([
          fetch(`/api/students?status=Active`),
          fetch(`/api/teachers`),
          fetch(`/api/reports/attendance?days=${attendanceDays}`),
          fetch(`/api/reports/homework`),
        ]);

      if (studentsRes.ok) {
        const d = await studentsRes.json();
        const list: Student[] = d.students || [];
        setStudents(list);
        setSummary((p) => ({ ...p, totalStudents: list.length }));
      }
      if (teachersRes.ok) {
        const d = await teachersRes.json();
        const list: Teacher[] = d.teachers || [];
        setTeachers(list);
        setSummary((p) => ({ ...p, totalTeachers: list.length }));
      }
      if (attendanceRes.ok) {
        const d = await attendanceRes.json();
        setAttendance(d.rows || []);
        setTodayCount(d.todayCount || 0);
        setMonthlyAvg(d.monthlyAverage || 0);
        setSummary((p) => ({
          ...p,
          attendanceRate: d.monthlyAverage || 0,
        }));
      }
      if (homeworkRes.ok) {
        const d = await homeworkRes.json();
        setHomework(d.homework || []);
        setHomeworkMonthTotal(d.monthTotal || 0);
      }
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  }, [attendanceDays]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function downloadCSV(filename: string, headers: string[], rows: string[][]) {
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleExportStudents() {
    setExporting(true);
    try {
      const res = await fetch("/api/students/export");
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "students-report.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      /* silent */
    } finally {
      setExporting(false);
    }
  }

  async function handleExportTeachers() {
    setExporting(true);
    try {
      const res = await fetch("/api/teachers/export");
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "teachers-report.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      /* silent */
    } finally {
      setExporting(false);
    }
  }

  function handleExportAttendance() {
    const headers = [
      "Class",
      "Total Students",
      "Present",
      "Absent",
      "Percentage",
    ];
    const rows = attendance.map((r) => [
      r.className,
      String(r.total),
      String(r.present),
      String(r.absent),
      `${r.percentage.toFixed(1)}%`,
    ]);
    downloadCSV("attendance-report.csv", headers, rows);
  }

  function handleExportHomework() {
    const headers = [
      "Title",
      "Subject",
      "Class",
      "Section",
      "Teacher",
      "Assigned",
      "Due",
    ];
    const rows = homework.map((h) => [
      h.title,
      h.subject,
      h.className,
      h.section,
      h.teacherName,
      h.assignedDate,
      h.dueDate,
    ]);
    downloadCSV("homework-report.csv", headers, rows);
  }

  const filteredStudents = studentClassFilter
    ? students.filter((s) => s.className === studentClassFilter)
    : students;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#1B3A5C] rounded-lg p-2">
          <FileBarChart className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports Center</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            View summaries and export data
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 rounded-lg p-2">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Students</p>
              <p className="text-xl font-bold text-gray-900">
                {summary.totalStudents}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-50 rounded-lg p-2">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Teachers</p>
              <p className="text-xl font-bold text-gray-900">
                {summary.totalTeachers}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 rounded-lg p-2">
              <ClipboardCheck className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Exams</p>
              <p className="text-xl font-bold text-gray-900">
                {summary.totalExams}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#FF9933]/10 rounded-lg p-2">
              <TrendingUp className="w-5 h-5 text-[#FF9933]" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Attendance Rate</p>
              <p className="text-xl font-bold text-gray-900">
                {summary.attendanceRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-100 px-4">
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-[#FF9933] text-[#FF9933]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          {loading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 border-4 border-[#1B3A5C] border-t-transparent animate-spin mx-auto" />
            </div>
          ) : (
            <>
              {/* Students Tab */}
              {activeTab === "Students" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <select
                        value={studentClassFilter}
                        onChange={(e) => setStudentClassFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white"
                      >
                        <option value="">All Classes</option>
                        {CLASSES.map((c) => (
                          <option key={c} value={c}>
                            Class {c}
                          </option>
                        ))}
                      </select>
                      <span className="text-sm text-gray-500">
                        {filteredStudents.length} students
                      </span>
                    </div>
                    <button
                      onClick={handleExportStudents}
                      disabled={exporting}
                      className="inline-flex items-center gap-2 bg-[#FF9933] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e8892e] transition-colors disabled:opacity-50"
                    >
                      {exporting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                      Export CSV
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Name
                          </th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Admission No
                          </th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Class
                          </th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Section
                          </th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Father Name
                          </th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Mobile
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {filteredStudents.length === 0 ? (
                          <tr>
                            <td
                              colSpan={6}
                              className="px-4 py-12 text-center text-gray-500 text-sm"
                            >
                              No students found
                            </td>
                          </tr>
                        ) : (
                          filteredStudents.map((s) => (
                            <tr key={s.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {s.studentName}
                              </td>
                              <td className="px-4 py-3 text-sm font-mono text-gray-700">
                                {s.admissionNumber}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                                {s.className}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-700">
                                {s.section}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {s.fatherName}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {s.mobileNumber}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Teachers Tab */}
              {activeTab === "Teachers" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">
                      {teachers.length} teachers
                    </span>
                    <button
                      onClick={handleExportTeachers}
                      disabled={exporting}
                      className="inline-flex items-center gap-2 bg-[#FF9933] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e8892e] transition-colors disabled:opacity-50"
                    >
                      {exporting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                      Export CSV
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Name
                          </th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Employee ID
                          </th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Subject
                          </th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Phone
                          </th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {teachers.length === 0 ? (
                          <tr>
                            <td
                              colSpan={5}
                              className="px-4 py-12 text-center text-gray-500 text-sm"
                            >
                              No teachers found
                            </td>
                          </tr>
                        ) : (
                          teachers.map((t) => (
                            <tr key={t.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {t.teacherName}
                              </td>
                              <td className="px-4 py-3 text-sm font-mono text-gray-700">
                                {t.employeeId}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                                {t.subject}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {t.phone}
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                                    t.status === "Active"
                                      ? "bg-emerald-100 text-emerald-700"
                                      : "bg-gray-100 text-gray-600"
                                  }`}
                                >
                                  {t.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Attendance Tab */}
              {activeTab === "Attendance" && (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-xs text-blue-600 font-medium mb-1">
                        Today&apos;s Attendance
                      </p>
                      <p className="text-2xl font-bold text-blue-900">
                        {todayCount}
                      </p>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-4">
                      <p className="text-xs text-emerald-600 font-medium mb-1">
                        Monthly Average
                      </p>
                      <p className="text-2xl font-bold text-emerald-900">
                        {monthlyAvg.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <select
                        value={attendanceDays}
                        onChange={(e) => setAttendanceDays(Number(e.target.value))}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white"
                      >
                        <option value={7}>Last 7 days</option>
                        <option value={30}>Last 30 days</option>
                        <option value={60}>Last 60 days</option>
                        <option value={90}>Last 90 days</option>
                      </select>
                    </div>
                    <button
                      onClick={handleExportAttendance}
                      className="inline-flex items-center gap-2 bg-[#FF9933] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e8892e] transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Export CSV
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Class
                          </th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Total Students
                          </th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Present
                          </th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Absent
                          </th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Percentage
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {attendance.length === 0 ? (
                          <tr>
                            <td
                              colSpan={5}
                              className="px-4 py-12 text-center text-gray-500 text-sm"
                            >
                              No attendance data found
                            </td>
                          </tr>
                        ) : (
                          attendance.map((a) => (
                            <tr key={a.className} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                Class {a.className}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-700">
                                {a.total}
                              </td>
                              <td className="px-4 py-3 text-sm text-emerald-600 font-medium">
                                {a.present}
                              </td>
                              <td className="px-4 py-3 text-sm text-red-600 font-medium">
                                {a.absent}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-20 bg-gray-200 rounded-full h-2">
                                    <div
                                      className={`h-2 rounded-full ${
                                        a.percentage >= 75
                                          ? "bg-emerald-500"
                                          : a.percentage >= 50
                                          ? "bg-amber-500"
                                          : "bg-red-500"
                                      }`}
                                      style={{
                                        width: `${Math.min(a.percentage, 100)}%`,
                                      }}
                                    />
                                  </div>
                                  <span className="text-sm font-medium text-gray-700">
                                    {a.percentage.toFixed(1)}%
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Homework Tab */}
              {activeTab === "Homework" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">
                      {homeworkMonthTotal} homework assigned this month
                    </span>
                    <button
                      onClick={handleExportHomework}
                      className="inline-flex items-center gap-2 bg-[#FF9933] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e8892e] transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Export CSV
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Title
                          </th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Subject
                          </th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Class
                          </th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Section
                          </th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Teacher
                          </th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Due Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {homework.length === 0 ? (
                          <tr>
                            <td
                              colSpan={6}
                              className="px-4 py-12 text-center text-gray-500 text-sm"
                            >
                              No homework found
                            </td>
                          </tr>
                        ) : (
                          homework.map((h) => (
                            <tr key={h.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {h.title}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-700">
                                {h.subject}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                                {h.className}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-700">
                                {h.section}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {h.teacherName}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {h.dueDate}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
