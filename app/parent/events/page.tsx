"use client";

import { useState, useEffect } from "react";
import { Calendar, Loader2, Image } from "lucide-react";
import NextImage from "next/image";

interface Event {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  image: string | null;
  category: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function ParentEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events?limit=50")
      .then((r) => r.json())
      .then((d) => setEvents(d.events || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.eventDate) >= now).sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
  const past = events.filter((e) => new Date(e.eventDate) < now).sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#1B3A5C]" /></div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <p className="text-gray-500 text-sm mt-1">School events and activities</p>
      </div>

      {upcoming.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-500" /> Upcoming Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcoming.map((e) => (
              <div key={e.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {e.image && (
                  <NextImage src={e.image} alt={e.title} width={400} height={200} className="w-full h-40 object-cover" />
                )}
                <div className="p-4">
                  <span className="inline-flex text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-100 text-green-700 mb-2">{e.category}</span>
                  <h3 className="font-medium text-gray-900">{e.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{e.description}</p>
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {formatDate(e.eventDate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" /> Past Events
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {past.map((e) => (
              <div key={e.id} className="p-4 hover:bg-gray-50 transition-colors flex items-start gap-4">
                {e.image && (
                  <NextImage src={e.image} alt={e.title} width={64} height={48} className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900">{e.title}</h3>
                  <p className="text-xs text-gray-500">{formatDate(e.eventDate)}</p>
                </div>
                <span className="inline-flex text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{e.category}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
