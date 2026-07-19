"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Loader2,
  Save,
  CheckCircle2,
  X,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
} from "lucide-react";

interface Exam {
  id: string;
  examName: string;
  examType: string;
  session: string;
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

interface ResultEntry {
  studentId: string;
  marksObtained: number;
  maxMarks: number;
  grade: string;
  remarks: string;
}

function calculateGrade(marks: number, maxMarks: number): string {
  if (maxMarks <= 0) return "F";
  const pct = (marks / maxMarks) * 100;
  if (pct >= 90) return "A+";
  if (pct >= 75) return "A";
  if (pct >= 60) return "B";
  if (pct >= 45) return "C";
  if (pct >= 33) return "D";
  return "F";
}

export default function TeacherResultsPage() {
  const router = useRouter();
  const [teacherInfo, setTeacherInfo] = useState<{
    id: string;
    assignedClasses: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [exams, setExams] = useState<Exam[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const [students, setStudents] = useState<Student[]>([]);
  const [results, setResults] = useState<Record<string, ResultEntry>>({});
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [bulkMaxMarks, setBulkMaxMarks] = useState("100");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

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

  useEffect(() => {
    fetch("/api/exams")
      .then((r) => r.json())
      .then((data) => setExams(data.exams || data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch("/api/subjects")
      .then((r) => r.json())
      .then((data) => setSubjects(data.subjects || data || []))
      .catch(() => {});
  }, []);

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

      const initial: Record<string, ResultEntry> = {};
      for (const s of studentList) {
        initial[s.id] = {
          studentId: s.id,
          marksObtained: 0,
          maxMarks: 100,
          grade: "F",
          remarks: "",
        };
      }
      setResults(initial);
    } catch {
      /* silent */
    } finally {
      setStudentsLoading(false);
    }
  }, [selectedClass, selectedSection]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  function updateMarks(studentId: string, field: "marksObtained" | "maxMarks", value: number) {
    setResults((prev) => {
      const entry = prev[studentId] || {
        studentId,
        marksObtained: 0,
        maxMarks: 100,
        grade: "F",
        remarks: "",
      };
      const updated = { ...entry, [field]: value };
      updated.grade = calculateGrade(updated.marksObtained, updated.maxMarks);
      return { ...prev, [studentId]: updated };
    });
  }

  function updateRemarks(studentId: string, remarks: string) {
    setResults((prev) => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || {
          studentId,
          marksObtained: 0,
          maxMarks: 100,
          grade: "F",
          remarks: "",
        }),
        remarks,
      },
    }));
  }

  function applyBulkMaxMarks() {
    const val = parseInt(bulkMaxMarks, 10);
    if (isNaN(val) || val <= 0) return;
    setResults((prev) => {
      const updated = { ...prev };
      for (const key of Object.keys(updated)) {
        updated[key] = {
          ...updated[key],
          maxMarks: val,
          grade: calculateGrade(updated[key].marksObtained, val),
        };
      }
      return updated;
    });
  }

  async function handleSave() {
    if (!selectedExam || !selectedClass || !selectedSection || !selectedSubject) {
      setMessage({ type: "error", text: "Please select exam, class, section, and subject." });
      return;
    }
    setSaving(true);
    setMessage(null);

    const records = Object.values(results).filter((r) => r.marksObtained > 0 || r.maxMarks > 0);
    if (records.length === 0) {
      setMessage({ type: "error", text: "No marks entered to save." });
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/results/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examId: selectedExam,
          subjectId: selectedSubject,
          className: selectedClass,
          section: selectedSection,
          records: records.map((r) => ({
            studentId: r.studentId,
            marksObtained: r.marksObtained,
            maxMarks: r.maxMarks,
            grade: r.grade,
            remarks: r.remarks,
          })),
        }),
      });

      if (res.ok) {
        setMessage({
          type: "success",
          text: `Results saved successfully for ${records.length} student(s).`,
        });
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "Failed to save results." });
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

  const GRADE_COLORS: Record<string, string> = {
    "A+": "bg-emerald-100 text-emerald-700",
    A: "bg-green-100 text-green-700",
    B: "bg-blue-100 text-blue-700",
    C: "bg-amber-100 text-amber-700",
    D: "bg-orange-100 text-orange-700",
    F: "bg-red-100 text-red-700",
  };

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
        <h1 className="text-2xl font-bold text-gray-900">Enter Results</h1>
        <p className="text-gray-500 text-sm mt-1">
          Select exam, class, subject and enter student marks
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-end flex-wrap">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Exam</label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white min-w-[160px]"
            >
              <option value="">Select Exam</option>
              {exams.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.examName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Class</label>
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
            <label className="block text-xs font-medium text-gray-500 mb-1">Section</label>
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
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white min-w-[160px]"
            >
              <option value="">Select Subject</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.subjectName}
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
                <div className="flex gap-1 items-center">
                  <input
                    type="number"
                    value={bulkMaxMarks}
                    onChange={(e) => setBulkMaxMarks(e.target.value)}
                    className="w-16 px-2 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#FF9933] text-center"
                    min="1"
                    placeholder="Max"
                  />
                  <button
                    onClick={applyBulkMaxMarks}
                    className="px-2 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Apply to All
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
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Marks Obtained
                  </th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Max Marks
                  </th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Grade
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredStudents.map((student, idx) => {
                  const entry = results[student.id];
                  const grade = entry?.grade || "F";
                  const gradeColor = GRADE_COLORS[grade] || "bg-gray-100 text-gray-600";

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
                        <input
                          type="number"
                          value={entry?.marksObtained ?? 0}
                          onChange={(e) =>
                            updateMarks(student.id, "marksObtained", parseFloat(e.target.value) || 0)
                          }
                          min="0"
                          className="w-20 px-2 py-1 border border-gray-200 rounded text-xs text-center focus:outline-none focus:ring-1 focus:ring-[#FF9933] focus:border-transparent"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={entry?.maxMarks ?? 100}
                          onChange={(e) =>
                            updateMarks(student.id, "maxMarks", parseFloat(e.target.value) || 100)
                          }
                          min="1"
                          className="w-20 px-2 py-1 border border-gray-200 rounded text-xs text-center focus:outline-none focus:ring-1 focus:ring-[#FF9933] focus:border-transparent"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${gradeColor}`}
                        >
                          {grade}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          placeholder="Optional..."
                          value={entry?.remarks || ""}
                          onChange={(e) => updateRemarks(student.id, e.target.value)}
                          className="w-28 px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#FF9933] focus:border-transparent"
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

          <div className="p-4 border-t border-gray-100 flex items-center justify-end">
            <button
              onClick={handleSave}
              disabled={saving || !selectedExam || !selectedSubject}
              className="inline-flex items-center gap-2 px-5 py-2 bg-[#FF9933] text-white rounded-lg text-sm font-medium hover:bg-[#e8892e] transition-colors disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? "Saving..." : "Save All Results"}
            </button>
          </div>
        </div>
      )}

      {!selectedClass && !selectedSection && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <ClipboardCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">Select Class & Section</h3>
          <p className="text-gray-500 text-sm">
            Choose exam, class, section and subject above to start entering results
          </p>
        </div>
      )}

      {message && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg text-sm font-medium z-50 ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === "success" ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <X className="w-4 h-4" />
            )}
            {message.text}
          </div>
        </div>
      )}
    </div>
  );
}
