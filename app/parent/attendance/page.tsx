"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ClipboardCheck, Loader2, TrendingUp, CalendarDays } from "lucide-react";

export default function ParentAttendancePage() {
  const router = useRouter();
  const [data, setData] = useState<{
    total: number; present: number; absent: number; late: number;
    halfDay: number; leave: number; percentage: number;
    monthly: Record<string, { present: number; absent: number; total: number }>;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/parent/attendance")
      .then((r) => { if (!r.ok) { router.push("/parent/login"); return null; } return r.json(); })
      .then((d) => { if (d) setData(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#1B3A5C]" /></div>;
  if (!data) return <div className="text-center py-20"><p className="text-gray-500">No attendance data found.</p></div>;

  const statCards = [
    { label: "Present Days", value: data.present, color: "text-emerald-600 bg-emerald-50" },
    { label: "Absent Days", value: data.absent, color: "text-red-600 bg-red-50" },
    { label: "Late Arrivals", value: data.late, color: "text-amber-600 bg-amber-50" },
    { label: "Half Days", value: data.halfDay, color: "text-orange-600 bg-orange-50" },
    { label: "Leave", value: data.leave, color: "text-blue-600 bg-blue-50" },
    { label: "Total Days", value: data.total, color: "text-gray-600 bg-gray-50" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
        <p className="text-gray-500 text-sm mt-1">View your child&apos;s attendance records</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-emerald-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Overall Attendance</p>
            <p className="text-4xl font-bold text-gray-900">{data.percentage}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {statCards.map((s) => (
          <div key={s.label} className={`${s.color} rounded-xl border p-4 text-center`}>
            <p className="text-xs font-medium uppercase tracking-wider">{s.label}</p>
            <p className="text-2xl font-bold mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {Object.keys(data.monthly).length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-[#1B3A5C]" /> Monthly Summary
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Month</th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Present</th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Absent</th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Total</th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {Object.entries(data.monthly).reverse().map(([month, val]) => (
                  <tr key={month} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{month}</td>
                    <td className="px-4 py-3 text-center text-sm text-emerald-600 font-medium">{val.present}</td>
                    <td className="px-4 py-3 text-center text-sm text-red-600 font-medium">{val.absent}</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-700">{val.total}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                        {val.total > 0 ? Math.round((val.present / val.total) * 100) : 0}%
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
  );
}
