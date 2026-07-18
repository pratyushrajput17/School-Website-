"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Bell, Loader2, Calendar, AlertTriangle, Info, CheckCheck } from "lucide-react";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

function getIcon(type: string) {
  switch (type) {
    case "homework": return { icon: Bell, color: "text-violet-500 bg-violet-50" };
    case "attendance_alert": return { icon: AlertTriangle, color: "text-red-500 bg-red-50" };
    case "holiday": return { icon: Calendar, color: "text-green-500 bg-green-50" };
    case "exam": return { icon: AlertTriangle, color: "text-orange-500 bg-orange-50" };
    default: return { icon: Info, color: "text-blue-500 bg-blue-50" };
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function ParentNotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/parent/notifications");
      if (!res.ok) { router.push("/parent/login"); return; }
      const data = await res.json();
      setNotifications(data.notifications || []);
    } catch { /* silent */ }
    finally { setLoading(false); }
  }, [router]);

  useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

  async function markAsRead(id: string) {
    await fetch("/api/parent/notifications", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
  }

  async function markAllRead() {
    const unread = notifications.filter((n) => !n.isRead);
    await Promise.all(unread.map((n) => markAsRead(n.id)));
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#1B3A5C]" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 text-sm mt-1">{unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="inline-flex items-center gap-2 text-sm text-[#FF9933] hover:text-[#e8892e] font-medium">
            <CheckCheck className="w-4 h-4" /> Mark All Read
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications</h3>
            <p className="text-gray-500 text-sm">You&apos;re all caught up!</p>
          </div>
        ) : (
          notifications.map((n) => {
            const { icon: Icon, color } = getIcon(n.type);
            return (
              <div key={n.id}
                onClick={() => !n.isRead && markAsRead(n.id)}
                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${!n.isRead ? "bg-blue-50/50" : ""}`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${color} flex-shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={`text-sm ${!n.isRead ? "font-semibold" : "font-medium"} text-gray-900`}>{n.title}</h3>
                      {!n.isRead && <span className="w-2 h-2 rounded-full bg-[#FF9933] flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(n.createdAt)}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
