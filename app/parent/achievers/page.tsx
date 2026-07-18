"use client";

import { useState, useEffect } from "react";
import { Award, Loader2, Trophy } from "lucide-react";
import NextImage from "next/image";

interface Achiever {
  id: string;
  studentName: string;
  className: string;
  percentage: number;
  academicSession: number;
  rank: number;
  photoUrl: string | null;
  achievementTitle: string;
}

export default function ParentAchieversPage() {
  const [achievers, setAchievers] = useState<Achiever[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/achievers?limit=50")
      .then((r) => r.json())
      .then((d) => setAchievers(d.achievers || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#1B3A5C]" /></div>;

  const groupedByYear = achievers.reduce<Record<string, Achiever[]>>((acc, a) => {
    const key = String(a.academicSession);
    if (!acc[key]) acc[key] = [];
    acc[key].push(a);
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Academic Achievers</h1>
        <p className="text-gray-500 text-sm mt-1">Students who excelled in academics</p>
      </div>

      {Object.keys(groupedByYear).length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 text-center py-12">
          <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No achievers found</h3>
          <p className="text-gray-500 text-sm">Check back later.</p>
        </div>
      ) : (
        Object.entries(groupedByYear).sort(([a], [b]) => Number(b) - Number(a)).map(([year, items]) => (
          <div key={year} className="mb-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" /> Session {year}-{Number(year) + 1}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((a) => (
                <div key={a.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-full bg-[#1B3A5C] flex items-center justify-center text-white font-bold text-lg overflow-hidden flex-shrink-0">
                    {a.photoUrl ? (
                      <NextImage src={a.photoUrl} alt={a.studentName} width={56} height={56} className="w-full h-full object-cover" />
                    ) : (
                      a.studentName.charAt(0)
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900">{a.studentName}</h3>
                    <p className="text-xs text-gray-500">Class {a.className}</p>
                    {a.achievementTitle && (
                      <p className="text-xs text-amber-600 font-medium">{a.achievementTitle}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                        {a.percentage}%
                      </span>
                      {a.rank > 0 && (
                        <span className="inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                          Rank #{a.rank}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
