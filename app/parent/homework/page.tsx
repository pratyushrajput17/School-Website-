"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookText, Calendar, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";

interface HomeworkItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  attachmentUrl: string | null;
  subject: { subjectName: string };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function isOverdue(dueDate: string) {
  return new Date(dueDate) < new Date();
}

export default function ParentHomeworkPage() {
  const router = useRouter();
  const [homework, setHomework] = useState<HomeworkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/parent/homework")
      .then((r) => { if (!r.ok) { router.push("/parent/login"); return null; } return r.json(); })
      .then((d) => { if (d) setHomework(d.homework); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#1B3A5C]" /></div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Homework</h1>
        <p className="text-gray-500 text-sm mt-1">View homework assignments for your child&apos;s class</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        {homework.length === 0 ? (
          <div className="text-center py-12">
            <BookText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No homework assigned</h3>
            <p className="text-gray-500 text-sm">Check back later for new assignments.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {homework.map((h) => (
              <div key={h.id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900">{h.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{h.subject?.subjectName}</p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{h.description}</p>
                    {h.attachmentUrl && (
                      <a href={h.attachmentUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#FF9933] hover:underline mt-2">
                        <ExternalLink className="w-3 h-3" /> View Attachment
                      </a>
                    )}
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                      isOverdue(h.dueDate) ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      <Calendar className="w-3 h-3" />
                      {formatDate(h.dueDate)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
