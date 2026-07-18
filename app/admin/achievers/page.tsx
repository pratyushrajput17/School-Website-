"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Trash2,
  Edit3,
  Award,
  X,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";

interface Achiever {
  id: string;
  studentName: string;
  className: string;
  percentage: number;
  academicSession: number;
  rank: number;
  photoUrl: string | null;
  achievementTitle: string;
  isPublished: boolean;
  createdBy: string;
  createdAt: string;
}

function formatSession(year: number) {
  return `${year}-${String(year + 1).slice(-2)}`;
}

function getGrade(percentage: number) {
  if (percentage >= 90) return { label: "A+", color: "text-emerald-600" };
  if (percentage >= 75) return { label: "A", color: "text-blue-600" };
  if (percentage >= 60) return { label: "B+", color: "text-amber-600" };
  return { label: "B", color: "text-gray-600" };
}

export default function AdminAchieversPage() {
  const router = useRouter();
  const [achievers, setAchievers] = useState<Achiever[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sessionFilter, setSessionFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sessions, setSessions] = useState<number[]>([]);
  const [classes, setClasses] = useState<string[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchAchievers = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (sessionFilter) params.set("academicSession", sessionFilter);
      if (classFilter) params.set("className", classFilter);
      params.set("admin", "true");

      const res = await fetch(`/api/achievers?${params}`);
      if (!res.ok) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setAchievers(data.achievers);
      setSessions(data.sessions || []);
      setClasses(data.classes || []);
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  }, [search, sessionFilter, classFilter, router]);

  useEffect(() => {
    fetchAchievers();
  }, [fetchAchievers]);

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/achievers/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAchievers((prev) => prev.filter((a) => a.id !== id));
      }
    } catch {
      /* silent */
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  }

  async function handleTogglePublish(id: string, current: boolean) {
    setTogglingId(id);
    try {
      const formData = new FormData();
      formData.append("isPublished", String(!current));

      const res = await fetch(`/api/achievers/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        setAchievers((prev) =>
          prev.map((a) =>
            a.id === id ? { ...a, isPublished: !current } : a
          )
        );
      }
    } catch {
      /* silent */
    } finally {
      setTogglingId(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Manage Achievers
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Add and manage academic achievers
          </p>
        </div>
        <Link
          href="/admin/achievers/create"
          className="inline-flex items-center gap-2 bg-[#FF9933] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e8892e] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Achiever
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, class, or achievement..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
              />
            </div>
            <div className="relative">
              <select
                value={sessionFilter}
                onChange={(e) => setSessionFilter(e.target.value)}
                className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Sessions</option>
                {sessions.map((s) => (
                  <option key={s} value={s}>
                    {formatSession(s)}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="w-full sm:w-36 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Classes</option>
                {classes.map((c) => (
                  <option key={c} value={c}>
                    Class {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#1B3A5C] border-t-transparent mx-auto" />
          </div>
        ) : achievers.length === 0 ? (
          <div className="p-12 text-center">
            <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No achievers found
            </h3>
            <p className="text-gray-500 text-sm">
              {search || sessionFilter || classFilter
                ? "Try a different search or filter"
                : "Add your first achiever to get started"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {achievers.map((achiever) => {
              const grade = getGrade(achiever.percentage);
              return (
                <div
                  key={achiever.id}
                  className="group relative rounded-xl border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-saffron-light flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {achiever.photoUrl ? (
                        <img
                          src={achiever.photoUrl}
                          alt={achiever.studentName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <GraduationCap className="w-7 h-7 text-saffron-dark" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-medium text-gray-900 truncate">
                            {achiever.studentName}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Class {achiever.className}
                          </p>
                        </div>
                        <span className={`text-lg font-bold ${grade.color}`}>
                          {grade.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span>{achiever.percentage}%</span>
                        {achiever.rank > 0 && (
                          <span>Rank #{achiever.rank}</span>
                        )}
                        <span>{formatSession(achiever.academicSession)}</span>
                      </div>
                      {achiever.achievementTitle && (
                        <p className="text-xs text-saffron mt-1 truncate">
                          {achiever.achievementTitle}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        {achiever.isPublished ? (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Published
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 flex items-center gap-1">
                            <XCircle className="w-3 h-3" />
                            Draft
                          </span>
                        )}
                        {achiever.createdBy && (
                          <span className="text-[11px] text-gray-400">
                            by {achiever.createdBy}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() =>
                          handleTogglePublish(achiever.id, achiever.isPublished)
                        }
                        disabled={togglingId === achiever.id}
                        className={`p-1.5 rounded-lg transition-colors ${
                          togglingId === achiever.id
                            ? "opacity-50 cursor-not-allowed"
                            : achiever.isPublished
                            ? "text-green-600 hover:bg-green-50"
                            : "text-gray-400 hover:bg-gray-100"
                        }`}
                        title={achiever.isPublished ? "Unpublish" : "Publish"}
                      >
                        {togglingId === achiever.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : achiever.isPublished ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <Link
                        href={`/admin/achievers/edit/${achiever.id}`}
                        className="p-1.5 text-gray-400 hover:text-[#FF9933] hover:bg-amber-50 rounded-lg"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => setDeleteId(achiever.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Achiever
              </h3>
              <button
                onClick={() => setDeleteId(null)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this achiever?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
