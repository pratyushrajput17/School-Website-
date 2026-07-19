"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Download,
  Printer,
  FileText,
  Award,
  TrendingUp,
  BookOpen,
} from "lucide-react";

interface SubjectResult {
  subjectName: string;
  marksObtained: number;
  maxMarks: number;
  percentage: number;
  grade: string;
}

interface ExamResult {
  examName: string;
  examType: string;
  session: string;
  subjects: SubjectResult[];
  totalMarks: number;
  totalMaxMarks: number;
  overallPercentage: number;
  overallGrade: string;
}

const GRADE_COLORS: Record<string, string> = {
  "A+": "bg-emerald-100 text-emerald-700",
  A: "bg-green-100 text-green-700",
  B: "bg-blue-100 text-blue-700",
  C: "bg-amber-100 text-amber-700",
  D: "bg-orange-100 text-orange-700",
  F: "bg-red-100 text-red-700",
};

const PRINT_STYLES = `
  @media print {
    body * { visibility: hidden; }
    .print-area, .print-area * { visibility: visible; }
    .print-area {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding: 20px;
      background: white;
    }
    .no-print { display: none !important; }
    .print-break { page-break-before: always; }
  }
`;

export default function ParentResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<ExamResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState("");
  const [className, setClassName] = useState("");

  useEffect(() => {
    fetch("/api/auth/parent/me")
      .then((r) => {
        if (!r.ok) {
          router.push("/parent/login");
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (!data) return;
        const studentId = data.student?.id || data.studentId;
        setStudentName(data.student?.studentName || data.studentName || "");
        setClassName(
          data.student?.className
            ? `${data.student.className} - ${data.student.section}`
            : data.className || ""
        );
        if (studentId) {
          return fetch(`/api/results/report-card/${studentId}`);
        }
        return null;
      })
      .then((r) => {
        if (!r) return;
        return r.json();
      })
      .then((d) => {
        if (d) setResults(d.results || d || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#1B3A5C] border-t-transparent" />
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Results</h1>
          <p className="text-gray-500 text-sm mt-1">View exam results and report cards</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No results available</h3>
          <p className="text-gray-500 text-sm">
            Results will appear here once published by the school.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: PRINT_STYLES }} />

      <div className="mb-6 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Results</h1>
            <p className="text-gray-500 text-sm mt-1">
              {studentName && <span className="font-medium text-gray-700">{studentName}</span>}
              {className && <span className="text-gray-400"> &middot; {className}</span>}
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B3A5C] text-white rounded-lg text-sm font-medium hover:bg-[#152d4a] transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Report Card
          </button>
        </div>
      </div>

      <div className="print-area space-y-6">
        {results.map((exam, examIdx) => {
          const gradeColor = GRADE_COLORS[exam.overallGrade] || "bg-gray-100 text-gray-600";

          return (
            <div
              key={examIdx}
              className={`bg-white rounded-xl border border-gray-200 overflow-hidden ${examIdx > 0 ? "print-break" : ""}`}
            >
              <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-[#1B3A5C] to-[#24507a]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-bold text-white">{exam.examName}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      {exam.examType && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/20 text-white/90">
                          {exam.examType}
                        </span>
                      )}
                      {exam.session && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/20 text-white/90">
                          {exam.session}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs text-white/70">Overall</p>
                      <p className="text-2xl font-bold text-white">{exam.overallPercentage}%</p>
                    </div>
                    <span
                      className={`inline-flex items-center text-sm font-bold px-3 py-1 rounded-full ${gradeColor}`}
                    >
                      {exam.overallGrade}
                    </span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                        Subject
                      </th>
                      <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                        Marks Obtained
                      </th>
                      <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                        Max Marks
                      </th>
                      <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                        Percentage
                      </th>
                      <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                        Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {exam.subjects.map((sub, subIdx) => {
                      const subGradeColor = GRADE_COLORS[sub.grade] || "bg-gray-100 text-gray-600";
                      return (
                        <tr key={subIdx} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3 text-sm font-medium text-gray-900">
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-gray-400" />
                              {sub.subjectName}
                            </div>
                          </td>
                          <td className="px-5 py-3 text-center text-sm font-semibold text-gray-900">
                            {sub.marksObtained}
                          </td>
                          <td className="px-5 py-3 text-center text-sm text-gray-600">
                            {sub.maxMarks}
                          </td>
                          <td className="px-5 py-3 text-center">
                            <span
                              className={`inline-flex text-xs font-semibold px-2 py-0.5 rounded-full ${
                                sub.percentage >= 60
                                  ? "bg-emerald-100 text-emerald-700"
                                  : sub.percentage >= 33
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {sub.percentage}%
                            </span>
                          </td>
                          <td className="px-5 py-3 text-center">
                            <span
                              className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${subGradeColor}`}
                            >
                              {sub.grade}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-200 bg-gray-50">
                      <td className="px-5 py-3 text-sm font-bold text-gray-900">Total</td>
                      <td className="px-5 py-3 text-center text-sm font-bold text-gray-900">
                        {exam.totalMarks}
                      </td>
                      <td className="px-5 py-3 text-center text-sm font-bold text-gray-600">
                        {exam.totalMaxMarks}
                      </td>
                      <td className="px-5 py-3 text-center">
                        <span className="inline-flex text-xs font-bold px-2 py-0.5 rounded-full bg-[#1B3A5C] text-white">
                          {exam.overallPercentage}%
                        </span>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <span
                          className={`inline-flex items-center text-xs font-bold px-2.5 py-0.5 rounded-full ${gradeColor}`}
                        >
                          {exam.overallGrade}
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4 text-[#1B3A5C]" />
                    <span>
                      Overall: <strong>{exam.overallPercentage}%</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Award className="w-4 h-4 text-[#FF9933]" />
                    <span>
                      Grade: <strong>{exam.overallGrade}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
