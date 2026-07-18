"use client";

import { useState, useEffect } from "react";
import { Bell, Loader2, Calendar, AlertTriangle, Info } from "lucide-react";

interface Notice {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
}

function getCategoryIcon(category: string) {
  const cat = category.toLowerCase();
  if (cat.includes("holiday") || cat.includes("holiday")) return { icon: Calendar, color: "text-green-500 bg-green-50" };
  if (cat.includes("exam") || cat.includes("test")) return { icon: AlertTriangle, color: "text-red-500 bg-red-50" };
  return { icon: Info, color: "text-blue-500 bg-blue-50" };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function ParentNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notices?limit=50")
      .then((r) => r.json())
      .then((d) => setNotices(d.notices || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const importantNotices = notices.filter((n) => {
    const cat = n.category.toLowerCase();
    return cat.includes("exam") || cat.includes("holiday") || cat.includes("important");
  });
  const latestNotices = notices.filter((n) => !importantNotices.find((i) => i.id === n.id));

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#1B3A5C]" /></div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notices</h1>
        <p className="text-gray-500 text-sm mt-1">School notices and announcements</p>
      </div>

      {importantNotices.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" /> Important Notices
          </h2>
          <div className="space-y-3">
            {importantNotices.map((n) => {
              const { icon: Icon, color } = getCategoryIcon(n.category);
              return (
                <div key={n.id} className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${color} flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900">{n.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{n.description}</p>
                      <p className="text-xs text-gray-400 mt-2">{formatDate(n.createdAt)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#1B3A5C]" /> Latest Notices
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {latestNotices.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No notices yet.</p>
            </div>
          ) : (
            latestNotices.map((n) => (
              <div key={n.id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900">{n.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 whitespace-pre-line line-clamp-2">{n.description}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{formatDate(n.createdAt)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
