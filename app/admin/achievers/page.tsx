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
} from "lucide-react";

interface Achiever {
  id: string;
  name: string;
  className: string;
  percentage: number;
  photo: string | null;
  year: number;
  createdAt: string;
}

export default function AdminAchieversPage() {
  const router = useRouter();
  const [achievers, setAchievers] = useState<Achiever[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [years, setYears] = useState<number[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAchievers = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (yearFilter) params.set("year", yearFilter);

      const res = await fetch(`/api/achievers?${params}`);
      if (!res.ok) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setAchievers(data.achievers);
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  }, [search, yearFilter, router]);

  useEffect(() => {
    fetchAchievers();
  }, [fetchAchievers]);

  useEffect(() => {
    async function fetchYears() {
      try {
        const ys = new Set(achievers.map((a) => a.year));
        setYears(Array.from(ys).sort((a, b) => b - a));
      } catch {
        /* silent */
      }
    }
    fetchYears();
  }, [achievers]);

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/achievers/${id}`, { method: "DELETE" });
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

  function getGrade(percentage: number) {
    if (percentage >= 90) return { label: "A+", color: "text-emerald-600" };
    if (percentage >= 75) return { label: "A", color: "text-blue-600" };
    if (percentage >= 60) return { label: "B+", color: "text-amber-600" };
    return { label: "B", color: "text-gray-600" };
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
                placeholder="Search by name or class..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
              />
            </div>
            <div className="relative">
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}-{String(y + 1).slice(-2)}
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
              {search || yearFilter
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
                      {achiever.photo ? (
                        <img
                          src={achiever.photo}
                          alt={achiever.name}
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
                            {achiever.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Class {achiever.className}
                          </p>
                        </div>
                        <span
                          className={`text-lg font-bold ${grade.color}`}
                        >
                          {grade.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span>
                          {achiever.percentage}%
                        </span>
                        <span>
                          {achiever.year}-{String(achiever.year + 1).slice(-2)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
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
