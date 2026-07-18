"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Trash2,
  Edit3,
  Calendar,
  X,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";

const CATEGORIES = [
  "Academic Activities",
  "Cultural Programs",
  "National Celebrations",
  "Parent Meetings",
  "Competitions",
  "General",
];

interface EventItem {
  id: string;
  title: string;
  description: string;
  category: string;
  eventDate: string;
  image: string | null;
  isPublished: boolean;
  createdBy: string;
  updatedAt: string;
  createdAt: string;
}

const categoryColors: Record<string, string> = {
  "Academic Activities": "bg-cyan-100 text-cyan-700",
  "Cultural Programs": "bg-violet-100 text-violet-700",
  "National Celebrations": "bg-orange-100 text-orange-700",
  "Parent Meetings": "bg-blue-100 text-blue-700",
  Competitions: "bg-amber-100 text-amber-700",
  General: "bg-gray-100 text-gray-700",
};

export default function AdminEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (categoryFilter) params.set("category", categoryFilter);
      params.set("admin", "true");

      const res = await fetch(`/api/events?${params}`);
      if (!res.ok) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setEvents(data.events);
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  }, [search, categoryFilter, router]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e.id !== id));
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
      const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !current }),
      });
      if (res.ok) {
        setEvents((prev) =>
          prev.map((e) => (e.id === id ? { ...e, isPublished: !current } : e))
        );
      }
    } catch {
      /* silent */
    } finally {
      setTogglingId(null);
    }
  }

  function formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Events</h1>
          <p className="text-gray-500 text-sm mt-1">
            Create and manage school events
          </p>
        </div>
        <Link
          href="/admin/events/create"
          className="inline-flex items-center gap-2 bg-[#FF9933] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e8892e] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Event
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
              />
            </div>
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full sm:w-44 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
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
        ) : events.length === 0 ? (
          <div className="p-12 text-center">
            <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No events found
            </h3>
            <p className="text-gray-500 text-sm">
              {search || categoryFilter
                ? "Try a different search or filter"
                : "Create your first event to get started"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-4 sm:p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          categoryColors[event.category] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {event.category}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(event.eventDate)}
                      </span>
                      {event.isPublished ? (
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
                    </div>
                    <h3 className="font-medium text-gray-900">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {event.description}
                    </p>
                    {event.createdBy && (
                      <p className="text-xs text-gray-400 mt-1">
                        by {event.createdBy}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() =>
                        handleTogglePublish(event.id, event.isPublished)
                      }
                      disabled={togglingId === event.id}
                      className={`p-2 rounded-lg transition-colors ${
                        togglingId === event.id
                          ? "opacity-50 cursor-not-allowed"
                          : event.isPublished
                          ? "text-green-600 hover:bg-green-50"
                          : "text-gray-400 hover:bg-gray-100"
                      }`}
                      title={
                        event.isPublished ? "Unpublish" : "Publish"
                      }
                    >
                      {togglingId === event.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : event.isPublished ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                    </button>
                    <Link
                      href={`/admin/events/edit/${event.id}`}
                      className="p-2 text-gray-400 hover:text-[#FF9933] hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteId(event.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Event
              </h3>
              <button
                onClick={() => setDeleteId(null)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this event? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
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
