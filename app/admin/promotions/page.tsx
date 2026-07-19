"use client";

import { useState, useEffect } from "react";
import {
  ArrowUpWideNarrow,
  GraduationCap,
  History,
  Search,
  Loader2,
  CheckCircle2,
  X,
  AlertTriangle,
  ArrowRight,
  Undo2,
  Calendar,
  Users,
  Eye,
} from "lucide-react";

const CLASSES = Array.from({ length: 12 }, (_, i) => String(i + 1));

interface PreviewStudent {
  id: string;
  studentName: string;
  admissionNumber: string;
  fromClass: string;
  toClass: string;
}

interface PromotionHistory {
  id: string;
  date: string;
  fromClass: string;
  toClass: string;
  studentCount: number;
  academicSession: string;
}

interface AdminInfo {
  name: string;
}

export default function PromotionsPage() {
  const [activeTab, setActiveTab] = useState<"promote" | "history">("promote");
  const [adminName, setAdminName] = useState("");

  const [fromClass, setFromClass] = useState("");
  const [toClass, setToClass] = useState("");
  const [academicSession, setAcademicSession] = useState(
    String(new Date().getFullYear())
  );

  const [previewData, setPreviewData] = useState<PreviewStudent[]>([]);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewDone, setPreviewDone] = useState(false);

  const [executing, setExecuting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [revertId, setRevertId] = useState<string | null>(null);

  const [history, setHistory] = useState<PromotionHistory[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setAdminName(d.admin?.name || ""))
      .catch(() => {});
  }, []);

  async function handlePreview() {
    if (!fromClass || !toClass || fromClass === toClass) return;
    setPreviewLoading(true);
    setPreviewDone(false);
    setPreviewData([]);
    try {
      const res = await fetch("/api/promotions/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromClass, toClass, academicSession }),
      });
      if (res.ok) {
        const d = await res.json();
        setPreviewData(d.students || []);
        setPreviewDone(true);
      }
    } catch {
      /* silent */
    } finally {
      setPreviewLoading(false);
    }
  }

  async function handleExecute() {
    setExecuting(true);
    try {
      const res = await fetch("/api/promotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromClass, toClass, academicSession }),
      });
      if (res.ok) {
        const d = await res.json();
        setSuccessMsg(
          `Successfully promoted ${previewData.length} students from Class ${fromClass} to Class ${toClass}`
        );
        setPreviewDone(false);
        setPreviewData([]);
        setShowConfirm(false);
      }
    } catch {
      /* silent */
    } finally {
      setExecuting(false);
    }
  }

  async function fetchHistory() {
    setHistoryLoading(true);
    try {
      const res = await fetch("/api/promotions");
      if (res.ok) {
        const d = await res.json();
        setHistory(d.promotions || []);
      }
    } catch {
      /* silent */
    } finally {
      setHistoryLoading(false);
    }
  }

  useEffect(() => {
    if (activeTab === "history") fetchHistory();
  }, [activeTab]);

  async function handleRevert(id: string) {
    setRevertId(null);
    try {
      const res = await fetch(`/api/promotions/${id}/revert`, {
        method: "POST",
      });
      if (res.ok) {
        setHistory((prev) => prev.filter((h) => h.id !== id));
        setSuccessMsg("Promotion reverted successfully");
      }
    } catch {
      /* silent */
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#1B3A5C] rounded-lg p-2">
          <ArrowUpWideNarrow className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Student Promotion
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {adminName ? `Logged in as ${adminName}` : "Manage student promotions"}
          </p>
        </div>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <p className="text-sm text-emerald-700 flex-1">{successMsg}</p>
          <button
            onClick={() => setSuccessMsg("")}
            className="text-emerald-600 hover:text-emerald-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-100 px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("promote")}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "promote"
                  ? "border-[#FF9933] text-[#FF9933]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Promote Students
              </span>
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "history"
                  ? "border-[#FF9933] text-[#FF9933]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="flex items-center gap-2">
                <History className="w-4 h-4" />
                Promotion History
              </span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Promote Students Tab */}
          {activeTab === "promote" && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    From Class
                  </label>
                  <select
                    value={fromClass}
                    onChange={(e) => {
                      setFromClass(e.target.value);
                      setPreviewDone(false);
                      setPreviewData([]);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white"
                  >
                    <option value="">Select Class</option>
                    {CLASSES.map((c) => (
                      <option key={c} value={c}>
                        Class {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    To Class
                  </label>
                  <select
                    value={toClass}
                    onChange={(e) => {
                      setToClass(e.target.value);
                      setPreviewDone(false);
                      setPreviewData([]);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white"
                  >
                    <option value="">Select Class</option>
                    {CLASSES.map((c) => (
                      <option key={c} value={c}>
                        Class {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Academic Session
                  </label>
                  <input
                    type="text"
                    value={academicSession}
                    onChange={(e) => setAcademicSession(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                    placeholder="e.g. 2026"
                  />
                </div>
              </div>

              {fromClass && toClass && fromClass === toClass && (
                <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <p className="text-sm text-amber-700">
                    From Class and To Class cannot be the same
                  </p>
                </div>
              )}

              <div className="flex gap-3 mb-6">
                <button
                  onClick={handlePreview}
                  disabled={
                    !fromClass ||
                    !toClass ||
                    fromClass === toClass ||
                    previewLoading
                  }
                  className="inline-flex items-center gap-2 bg-[#1B3A5C] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#152d4a] transition-colors disabled:opacity-50"
                >
                  {previewLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                  Preview
                </button>

                {previewDone && (
                  <button
                    onClick={() => setShowConfirm(true)}
                    disabled={previewData.length === 0}
                    className="inline-flex items-center gap-2 bg-[#FF9933] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e8892e] transition-colors disabled:opacity-50"
                  >
                    <ArrowUpWideNarrow className="w-4 h-4" />
                    Execute Promotion
                  </button>
                )}
              </div>

              {previewDone && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {previewData.length} students will be promoted
                    </span>
                  </div>
                  <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Student Name
                          </th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Admission No
                          </th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                            Promotion
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {previewData.map((s) => (
                          <tr key={s.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              {s.studentName}
                            </td>
                            <td className="px-4 py-3 text-sm font-mono text-gray-700">
                              {s.admissionNumber}
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center gap-2 text-sm">
                                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium">
                                  Class {s.fromClass}
                                </span>
                                <ArrowRight className="w-4 h-4 text-[#FF9933]" />
                                <span className="bg-[#FF9933]/10 text-[#FF9933] px-2 py-0.5 rounded font-medium">
                                  Class {s.toClass}
                                </span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Promotion History Tab */}
          {activeTab === "history" && (
            <div>
              {historyLoading ? (
                <div className="p-12 text-center">
                  <Loader2 className="w-8 h-8 border-4 border-[#1B3A5C] border-t-transparent animate-spin mx-auto" />
                </div>
              ) : history.length === 0 ? (
                <div className="p-12 text-center">
                  <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No promotion history
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Promotions will appear here once executed
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                          Date
                        </th>
                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                          From Class
                        </th>
                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                          To Class
                        </th>
                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                          Students
                        </th>
                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                          Session
                        </th>
                        <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {history.map((h) => (
                        <tr key={h.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {new Date(h.date).toLocaleDateString("en-IN")}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-700">
                            Class {h.fromClass}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-700">
                            Class {h.toClass}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {h.studentCount}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {h.academicSession}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => setRevertId(h.id)}
                              className="inline-flex items-center gap-1.5 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              <Undo2 className="w-3.5 h-3.5" />
                              Revert
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Confirm Promotion Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 rounded-full p-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Confirm Promotion
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure? This will move{" "}
              <strong>{previewData.length}</strong> students from{" "}
              <strong>Class {fromClass}</strong> to{" "}
              <strong>Class {toClass}</strong> for the {academicSession} academic
              session.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleExecute}
                disabled={executing}
                className="px-4 py-2 text-sm font-medium text-white bg-[#FF9933] hover:bg-[#e8892e] rounded-lg transition-colors disabled:opacity-50 inline-flex items-center gap-2"
              >
                {executing && <Loader2 className="w-4 h-4 animate-spin" />}
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Revert Confirmation Modal */}
      {revertId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 rounded-full p-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Revert Promotion
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to revert this promotion? This will move
              students back to their original class.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setRevertId(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRevert(revertId)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <Undo2 className="w-4 h-4" />
                Revert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
