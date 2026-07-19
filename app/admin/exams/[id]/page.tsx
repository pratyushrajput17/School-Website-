"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Calendar,
  Search,
  Download,
  Loader2,
  CheckCircle2,
  X,
  Save,
  Trophy,
  Users,
  BookOpen,
  Star,
  ArrowLeft,
  TrendingUp,
  Award,
  Medal,
} from "lucide-react";
import Link from "next/link";

interface Exam {
  id: string;
  examName: string;
  academicSession: number;
  examType: string;
  startDate: string;
  endDate: string;
  isPublished: boolean;
  resultCount: number;
}

interface Subject {
  id: string;
  subjectName: string;
  subjectCode: string;
}

interface Student {
  id: string;
  studentName: string;
  admissionNumber: string;
  className: string;
  section: string;
}

interface Result {
  id: string;
  studentId: string;
  examId: string;
  subjectId: string;
  marksObtained: number;
  maximumMarks: number;
  grade: string;
  student: Student;
  subject: Subject;
}

interface RankingEntry {
  rank: number;
  studentId: string;
  studentName: string;
  admissionNumber: string;
  className: string;
  section: string;
  totalObtained: number;
  totalMax: number;
  percentage: number;
  grade: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function calcGrade(pct: number) {
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 70) return "B+";
  if (pct >= 60) return "B";
  if (pct >= 50) return "C";
  if (pct >= 33) return "D";
  return "F";
}

function calcPercentage(obtained: number, total: number) {
  if (total === 0) return 0;
  return Math.round((obtained / total) * 10000) / 100;
}

const RANK_BADGES = [
  {
    bg: "bg-gradient-to-br from-yellow-400 to-amber-500",
    ring: "ring-yellow-300",
    icon: Trophy,
    label: "1st",
  },
  {
    bg: "bg-gradient-to-br from-gray-300 to-gray-400",
    ring: "ring-gray-200",
    icon: Medal,
    label: "2nd",
  },
  {
    bg: "bg-gradient-to-br from-amber-600 to-orange-700",
    ring: "ring-amber-200",
    icon: Award,
    label: "3rd",
  },
];

const CLASSES = ["Nursery", "KG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const SECTIONS = ["A", "B", "C"];

export default function AdminExamDetailPage() {
  const router = useRouter();
  const params = useParams();
  const examId = params.id as string;

  const [exam, setExam] = useState<Exam | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [rankingsData, setRankingsData] = useState<{
    school: RankingEntry[];
    classWise: Record<string, RankingEntry[]>;
    toppers: RankingEntry[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"results" | "rankings">("results");

  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [search, setSearch] = useState("");

  const [bulkMode, setBulkMode] = useState(false);
  const [bulkMarks, setBulkMarks] = useState<
    Record<string, Record<string, string>>
  >({});
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [rankingsTab, setRankingsTab] = useState<"top" | "class" | "school">(
    "top"
  );
  const [classRankFilter, setClassRankFilter] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [examRes, subjectsRes] = await Promise.all([
          fetch(`/api/exams/${examId}`),
          fetch("/api/subjects"),
        ]);

        if (examRes.ok) {
          const data = await examRes.json();
          setExam(data.exam || data);
        }
        if (subjectsRes.ok) {
          const data = await subjectsRes.json();
          setSubjects(data.subjects || data || []);
        }
      } catch {
        /* silent */
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [examId]);

  const fetchStudents = useCallback(async () => {
    try {
      const p = new URLSearchParams({ status: "Active" });
      if (classFilter) p.set("className", classFilter);
      if (sectionFilter) p.set("section", sectionFilter);
      const res = await fetch(`/api/students?${p}`);
      if (res.ok) {
        const data = await res.json();
        setStudents(data.students || []);
      }
    } catch {
      /* silent */
    }
  }, [classFilter, sectionFilter]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const fetchResults = useCallback(async () => {
    try {
      const p = new URLSearchParams({ examId });
      const res = await fetch(`/api/results?${p}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results || []);
      }
    } catch {
      /* silent */
    }
  }, [examId]);

  useEffect(() => {
    if (activeTab === "results") fetchResults();
  }, [activeTab, fetchResults]);

  const fetchRankings = useCallback(async () => {
    try {
      const p = new URLSearchParams({ examId });
      const res = await fetch(`/api/results/rankings?${p}`);
      if (res.ok) {
        const data = await res.json();
        setRankingsData(data);
      }
    } catch {
      /* silent */
    }
  }, [examId]);

  useEffect(() => {
    if (activeTab === "rankings") fetchRankings();
  }, [activeTab, fetchRankings]);

  const filteredResults = useMemo(() => {
    let filtered = results;
    if (classFilter) {
      filtered = filtered.filter((r) => r.student?.className === classFilter);
    }
    if (sectionFilter) {
      filtered = filtered.filter((r) => r.student?.section === sectionFilter);
    }
    if (subjectFilter) {
      filtered = filtered.filter((r) => r.subjectId === subjectFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.student?.studentName?.toLowerCase().includes(q) ||
          r.student?.admissionNumber?.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [results, classFilter, sectionFilter, subjectFilter, search]);

  const filteredSubjects = useMemo(() => {
    if (subjectFilter) return subjects.filter((s) => s.id === subjectFilter);
    return subjects;
  }, [subjects, subjectFilter]);

  const studentGrid = useMemo(() => {
    const map: Record<
      string,
      {
        student: Student;
        marks: Record<string, { obtained: number; total: number }>;
      }
    > = {};

    for (const r of filteredResults) {
      if (!r.student) continue;
      if (!map[r.studentId]) {
        map[r.studentId] = {
          student: r.student,
          marks: {},
        };
      }
      if (r.subject) {
        map[r.studentId].marks[r.subjectId] = {
          obtained: r.marksObtained,
          total: r.maximumMarks,
        };
      }
    }

    return Object.values(map).map((entry) => {
      let totalObtained = 0;
      let totalMax = 0;
      for (const m of Object.values(entry.marks)) {
        totalObtained += m.obtained;
        totalMax += m.total;
      }
      const pct = calcPercentage(totalObtained, totalMax);
      return {
        ...entry,
        totalObtained,
        totalMax,
        percentage: pct,
        grade: calcGrade(pct),
      };
    });
  }, [filteredResults]);

  function initBulkMode() {
    const marks: Record<string, Record<string, string>> = {};
    for (const entry of studentGrid) {
      marks[entry.student.id] = {};
      for (const sub of filteredSubjects) {
        const existing = entry.marks[sub.id];
        marks[entry.student.id][sub.id] = existing
          ? String(existing.obtained)
          : "";
      }
    }
    setBulkMarks(marks);
    setBulkMode(true);
  }

  function updateBulkMark(
    studentId: string,
    subjectId: string,
    value: string
  ) {
    setBulkMarks((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], [subjectId]: value },
    }));
  }

  async function saveBulkMarks() {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const records: Array<{
        studentId: string;
        examId: string;
        subjectId: string;
        marksObtained: number;
        maximumMarks: number;
      }> = [];

      for (const [studentId, subjectMarks] of Object.entries(bulkMarks)) {
        for (const [subjectId, marksStr] of Object.entries(subjectMarks)) {
          if (marksStr === "") continue;
          const obtained = Number(marksStr);
          if (isNaN(obtained)) continue;

          const existing = results.find(
            (r) =>
              r.studentId === studentId &&
              r.subjectId === subjectId &&
              r.examId === examId
          );
          const total = existing?.maximumMarks || 100;

          records.push({
            studentId,
            examId,
            subjectId,
            marksObtained: obtained,
            maximumMarks: total,
          });
        }
      }

      const res = await fetch("/api/results/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ records }),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setBulkMode(false);
        fetchResults();
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch {
      /* silent */
    } finally {
      setSaving(false);
    }
  }

  function exportCSV() {
    const headers = [
      "Student Name",
      "Admission No",
      "Class",
      "Section",
      ...filteredSubjects.map((s) => s.subjectName),
      "Total",
      "Max Total",
      "Percentage",
      "Grade",
    ];

    const rows = studentGrid.map((entry) => [
      entry.student.studentName,
      entry.student.admissionNumber,
      entry.student.className,
      entry.student.section,
      ...filteredSubjects.map((s) => {
        const m = entry.marks[s.id];
        return m ? String(m.obtained) : "";
      }),
      String(entry.totalObtained),
      String(entry.totalMax),
      `${entry.percentage}%`,
      entry.grade,
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `results-${exam?.examName || examId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filteredRankings = useMemo(() => {
    if (!rankingsData) return [];
    if (rankingsTab === "top") return rankingsData.toppers;
    if (rankingsTab === "class" && classRankFilter) {
      return rankingsData.classWise[classRankFilter] || [];
    }
    return rankingsData.school;
  }, [rankingsData, rankingsTab, classRankFilter]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#1B3A5C]" />
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Exam not found</p>
        <Link
          href="/admin/exams"
          className="text-[#FF9933] hover:underline mt-2 inline-block"
        >
          Back to Exams
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/exams"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#1B3A5C] transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Exams
        </Link>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {exam.examName}
              </h1>
              <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(exam.startDate)} – {formatDate(exam.endDate)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  Session {exam.academicSession}
                </span>
                <span className="inline-flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {exam.examType}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {exam.isPublished ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Published
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-500">
                  Draft
                </span>
              )}
              {activeTab === "results" && (
                <>
                  {!bulkMode ? (
                    <button
                      onClick={initBulkMode}
                      className="inline-flex items-center gap-2 bg-[#1B3A5C] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#15304a] transition-colors"
                    >
                      Enter Marks
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={saveBulkMarks}
                        disabled={saving}
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        {saving ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        {saving ? "Saving..." : "Save Marks"}
                      </button>
                      <button
                        onClick={() => setBulkMode(false)}
                        className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </>
                  )}
                </>
              )}
              <button
                onClick={exportCSV}
                className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex items-center gap-2 text-sm text-green-700">
          <CheckCircle2 className="w-4 h-4" />
          Marks saved successfully!
        </div>
      )}

      <div className="flex gap-1 mb-4 bg-gray-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveTab("results")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "results"
              ? "bg-white text-[#1B3A5C] shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            Results
          </span>
        </button>
        <button
          onClick={() => setActiveTab("rankings")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "rankings"
              ? "bg-white text-[#1B3A5C] shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <span className="inline-flex items-center gap-1.5">
            <Trophy className="w-4 h-4" />
            Rankings
          </span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        {activeTab === "results" && (
          <div className="p-4 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Classes</option>
                {CLASSES.map((c) => (
                  <option key={c} value={c}>
                    Class {c}
                  </option>
                ))}
              </select>
              <select
                value={sectionFilter}
                onChange={(e) => setSectionFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Sections</option>
                {SECTIONS.map((s) => (
                  <option key={s} value={s}>
                    Section {s}
                  </option>
                ))}
              </select>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Subjects</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.subjectName}
                  </option>
                ))}
              </select>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or admission no..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "results" ? (
          <>
            {studentGrid.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No results found
                </h3>
                <p className="text-gray-500 text-sm">
                  {classFilter || sectionFilter || subjectFilter || search
                    ? "Try a different filter"
                    : "Click 'Enter Marks' to start adding results"}
                </p>
              </div>
            ) : bulkMode ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 sticky left-0 bg-gray-50 z-10">
                        Student
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                        Adm. No
                      </th>
                      {filteredSubjects.map((sub) => (
                        <th
                          key={sub.id}
                          className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3"
                        >
                          <div>{sub.subjectName}</div>
                          <div className="font-normal text-gray-400 normal-case">
                            / 100
                          </div>
                        </th>
                      ))}
                      <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3">
                        Total
                      </th>
                      <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3">
                        %
                      </th>
                      <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3">
                        Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {studentGrid.map((entry) => {
                      let liveTotal = 0;
                      for (const sub of filteredSubjects) {
                        const val = bulkMarks[entry.student.id]?.[sub.id];
                        if (val !== undefined && val !== "") {
                          liveTotal += Number(val) || 0;
                        }
                      }
                      const liveMax = filteredSubjects.length * 100;
                      const livePct = calcPercentage(liveTotal, liveMax);

                      return (
                        <tr
                          key={entry.student.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-2 text-sm font-medium text-gray-900 sticky left-0 bg-white z-10">
                            {entry.student.studentName}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-500 font-mono">
                            {entry.student.admissionNumber}
                          </td>
                          {filteredSubjects.map((sub) => (
                            <td key={sub.id} className="px-1 py-2">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={
                                  bulkMarks[entry.student.id]?.[sub.id] ?? ""
                                }
                                onChange={(e) =>
                                  updateBulkMark(
                                    entry.student.id,
                                    sub.id,
                                    e.target.value
                                  )
                                }
                                className="w-16 px-2 py-1.5 border border-gray-300 rounded text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
                              />
                            </td>
                          ))}
                          <td className="px-3 py-2 text-sm font-semibold text-gray-900 text-center">
                            {liveTotal}
                          </td>
                          <td className="px-3 py-2 text-sm text-center">
                            <span
                              className={`font-semibold ${
                                livePct >= 60
                                  ? "text-green-600"
                                  : livePct >= 33
                                  ? "text-amber-600"
                                  : "text-red-600"
                              }`}
                            >
                              {livePct}%
                            </span>
                          </td>
                          <td className="px-3 py-2 text-center">
                            <span
                              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                calcGrade(livePct) === "F"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-[#1B3A5C]/10 text-[#1B3A5C]"
                              }`}
                            >
                              {calcGrade(livePct)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                        #
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                        Student Name
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                        Admission No
                      </th>
                      {filteredSubjects.map((sub) => (
                        <th
                          key={sub.id}
                          className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3"
                        >
                          {sub.subjectName}
                        </th>
                      ))}
                      <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3">
                        Total
                      </th>
                      <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3">
                        Percentage
                      </th>
                      <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3">
                        Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {studentGrid.map((entry, idx) => (
                      <tr
                        key={entry.student.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm text-gray-400">
                          {idx + 1}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {entry.student.studentName}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 font-mono">
                          {entry.student.admissionNumber}
                        </td>
                        {filteredSubjects.map((sub) => {
                          const m = entry.marks[sub.id];
                          return (
                            <td
                              key={sub.id}
                              className="px-3 py-3 text-sm text-center text-gray-700"
                            >
                              {m ? (
                                <span>
                                  {m.obtained}
                                  <span className="text-gray-400">
                                    /{m.total}
                                  </span>
                                </span>
                              ) : (
                                <span className="text-gray-300">—</span>
                              )}
                            </td>
                          );
                        })}
                        <td className="px-3 py-3 text-sm font-semibold text-center text-gray-900">
                          {entry.totalObtained}
                          <span className="text-gray-400 font-normal">
                            /{entry.totalMax}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-sm text-center">
                          <span
                            className={`font-semibold ${
                              entry.percentage >= 60
                                ? "text-green-600"
                                : entry.percentage >= 33
                                ? "text-amber-600"
                                : "text-red-600"
                            }`}
                          >
                            {entry.percentage}%
                          </span>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                              entry.grade === "F"
                                ? "bg-red-100 text-red-700"
                                : entry.grade === "A+"
                                ? "bg-green-100 text-green-700"
                                : "bg-[#1B3A5C]/10 text-[#1B3A5C]"
                            }`}
                          >
                            {entry.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex gap-2 items-center p-4 border-b border-gray-100">
              <div className="flex gap-1 bg-gray-50 rounded-lg p-1">
                <button
                  onClick={() => {
                    setRankingsTab("top");
                    setClassRankFilter("");
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    rankingsTab === "top"
                      ? "bg-white text-[#FF9933] shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Top 3 Toppers
                </button>
                <button
                  onClick={() => setRankingsTab("class")}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    rankingsTab === "class"
                      ? "bg-white text-[#FF9933] shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Class-wise
                </button>
                <button
                  onClick={() => {
                    setRankingsTab("school");
                    setClassRankFilter("");
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    rankingsTab === "school"
                      ? "bg-white text-[#FF9933] shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  School-wide
                </button>
              </div>

              {rankingsTab === "class" && (
                <select
                  value={classRankFilter}
                  onChange={(e) => setClassRankFilter(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white"
                >
                  <option value="">Select Class</option>
                  {rankingsData?.classWise &&
                    Object.keys(rankingsData.classWise).sort().map((cls) => (
                      <option key={cls} value={cls}>
                        Class {cls}
                      </option>
                    ))}
                </select>
              )}
            </div>

            {!rankingsData ? (
              <div className="p-12 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#1B3A5C] mx-auto" />
              </div>
            ) : filteredRankings.length === 0 ? (
              <div className="p-12 text-center">
                <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No rankings available
                </h3>
                <p className="text-gray-500 text-sm">
                  {rankingsTab === "class" && !classRankFilter
                    ? "Select a class to view rankings"
                    : "Enter marks in the Results tab to generate rankings"}
                </p>
              </div>
            ) : rankingsTab === "top" ? (
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  {filteredRankings.map((r, idx) => {
                    const badge = RANK_BADGES[idx] || RANK_BADGES[2];
                    const Icon = badge.icon;
                    return (
                      <div
                        key={r.studentId}
                        className={`relative bg-white rounded-2xl border-2 border-gray-100 p-6 text-center ${
                          idx === 0 ? "sm:-mt-4 sm:mb-4" : ""
                        }`}
                      >
                        <div
                          className={`w-16 h-16 rounded-full ${badge.bg} ring-4 ${badge.ring} flex items-center justify-center mx-auto mb-4`}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          {badge.label} Rank
                        </span>
                        <h4 className="text-lg font-bold text-gray-900 mt-1">
                          {r.studentName}
                        </h4>
                        <p className="text-sm text-gray-500 mt-0.5">
                          Class {r.className} – {r.section}
                        </p>
                        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-gray-400">Marks</p>
                            <p className="text-sm font-bold text-gray-900">
                              {r.totalObtained}/{r.totalMax}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Percentage</p>
                            <p className="text-sm font-bold text-[#FF9933]">
                              {r.percentage}%
                            </p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full ${
                              r.grade === "A+"
                                ? "bg-green-100 text-green-700"
                                : r.grade === "F"
                                ? "bg-red-100 text-red-700"
                                : "bg-[#1B3A5C]/10 text-[#1B3A5C]"
                            }`}
                          >
                            Grade: {r.grade}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                        Rank
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                        Student Name
                      </th>
                      {rankingsTab === "school" && (
                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                          Class
                        </th>
                      )}
                      <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3">
                        Marks
                      </th>
                      <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3">
                        Percentage
                      </th>
                      <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3">
                        Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredRankings.map((r) => (
                      <tr
                        key={r.studentId}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                              r.rank === 1
                                ? "bg-yellow-100 text-yellow-700"
                                : r.rank === 2
                                ? "bg-gray-100 text-gray-600"
                                : r.rank === 3
                                ? "bg-amber-100 text-amber-700"
                                : "bg-gray-50 text-gray-500"
                            }`}
                          >
                            {r.rank}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">
                            {r.studentName}
                          </p>
                          <p className="text-xs text-gray-400 font-mono">
                            {r.admissionNumber}
                          </p>
                        </td>
                        {rankingsTab === "school" && (
                          <td className="px-4 py-3 text-sm text-gray-600">
                            Class {r.className} – {r.section}
                          </td>
                        )}
                        <td className="px-3 py-3 text-sm text-center font-medium text-gray-900">
                          {r.totalObtained}/{r.totalMax}
                        </td>
                        <td className="px-3 py-3 text-sm text-center">
                          <span
                            className={`font-semibold ${
                              r.percentage >= 60
                                ? "text-green-600"
                                : r.percentage >= 33
                                ? "text-amber-600"
                                : "text-red-600"
                            }`}
                          >
                            {r.percentage}%
                          </span>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                              r.grade === "A+"
                                ? "bg-green-100 text-green-700"
                                : r.grade === "F"
                                ? "bg-red-100 text-red-700"
                                : "bg-[#1B3A5C]/10 text-[#1B3A5C]"
                            }`}
                          >
                            {r.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
