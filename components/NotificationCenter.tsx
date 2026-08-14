"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  BookText,
  Calendar,
  Info,
  AlertTriangle,
  CheckCheck,
  Loader2,
} from "lucide-react";

export type NotificationRole = "parent" | "teacher" | "admin";

export interface NotificationItem {
  id: string;
  type: string;
  title: string;
  message: string;
  parentId: string | null;
  teacherId: string | null;
  adminId: string | null;
  entityType: string | null;
  entityId: string | null;
  sentBy: string;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
}

function normalizeType(type: string) {
  const map: Record<string, string> = {
    homework: "HOMEWORK",
    attendance_alert: "GENERAL",
    holiday: "NOTICE",
    exam: "EVENT",
    notice: "NOTICE",
    event: "EVENT",
    general: "GENERAL",
  };
  const upper = type.toUpperCase();
  return map[type.toLowerCase()] || upper;
}

function getIcon(type: string) {
  switch (normalizeType(type)) {
    case "NOTICE":
      return { icon: Bell, color: "bg-blue-50 text-blue-600" };
    case "HOMEWORK":
      return { icon: BookText, color: "bg-violet-50 text-violet-600" };
    case "EVENT":
      return { icon: Calendar, color: "bg-green-50 text-green-600" };
    case "GENERAL":
      return { icon: Info, color: "bg-amber-50 text-amber-600" };
    default:
      return { icon: AlertTriangle, color: "bg-gray-50 text-gray-600" };
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getTargetHref(role: NotificationRole, entityType: string | null) {
  const t = normalizeType(entityType || "");
  switch (role) {
    case "parent":
      if (t === "NOTICE") return "/parent/notices";
      if (t === "EVENT") return "/parent/events";
      if (t === "HOMEWORK") return "/parent/homework";
      return null;
    case "teacher":
      if (t === "HOMEWORK") return "/teacher/homework";
      if (t === "NOTICE") return "/notices";
      if (t === "EVENT") return "/events";
      return null;
    case "admin":
      if (t === "NOTICE") return "/admin/notices";
      if (t === "EVENT") return "/admin/events";
      if (t === "HOMEWORK") return "/admin/homework";
      return null;
  }
}

const TYPE_LABELS: Record<string, string> = {
  NOTICE: "Notice",
  HOMEWORK: "Homework",
  EVENT: "Event",
  GENERAL: "General",
};

export default function NotificationCenter({
  role,
}: {
  role: NotificationRole;
}) {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [acting, setActing] = useState(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch(`/api/${role}/notifications`, {
        cache: "no-store",
      });
      if (res.status === 401) {
        router.push(`/${role}/login`);
        return;
      }
      if (!res.ok) return;
      const data = await res.json();
      setNotifications(data.notifications || []);
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  }, [role, router]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  async function handleClick(n: NotificationItem) {
    if (!n.isRead) {
      setNotifications((prev) =>
        prev.map((x) =>
          x.id === n.id ? { ...x, isRead: true, readAt: new Date().toISOString() } : x
        )
      );
      try {
        await fetch(`/api/${role}/notifications`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: n.id }),
        });
      } catch {
        /* silent */
      }
    }
    const href = getTargetHref(role, n.entityType);
    if (href) {
      router.push(href);
    }
  }

  async function markAllRead() {
    setActing(true);
    try {
      const res = await fetch(`/api/${role}/notifications`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true }),
      });
      if (res.ok) {
        setNotifications((prev) =>
          prev.map((x) =>
            x.isRead ? x : { ...x, isRead: true, readAt: new Date().toISOString() }
          )
        );
      }
    } catch {
      /* silent */
    } finally {
      setActing(false);
    }
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const visible = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    if (filter === "read") return n.isRead;
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#1B3A5C]" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 text-sm mt-1">
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
              : "You're all caught up"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            disabled={acting}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#FF9933] hover:text-[#e8892e] disabled:opacity-50"
          >
            {acting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCheck className="w-4 h-4" />
            )}
            Mark All Read
          </button>
        )}
      </div>

      <div className="flex gap-1 mb-4 border-b border-gray-100">
        {(["all", "unread", "read"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium capitalize rounded-t-lg transition-colors border-b-2 ${
              filter === f
                ? "text-[#1B3A5C] border-[#1B3A5C]"
                : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
          >
            {f}
            {f === "unread" && unreadCount > 0 && (
              <span className="ml-1.5 text-[11px] bg-[#FF9933] text-white rounded-full px-1.5 py-0.5">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {visible.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No notifications
            </h3>
            <p className="text-gray-500 text-sm">Nothing here yet.</p>
          </div>
        ) : (
          visible.map((n) => {
            const { icon: Icon, color } = getIcon(n.type);
            const href = getTargetHref(role, n.entityType);
            const label = TYPE_LABELS[normalizeType(n.type)] || n.type;
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => handleClick(n)}
                className={`w-full text-left p-4 transition-colors ${
                  !n.isRead ? "bg-blue-50/40" : "hover:bg-gray-50"
                } ${href ? "cursor-pointer" : "cursor-default"}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${color} flex-shrink-0`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className={`text-sm ${
                          !n.isRead ? "font-semibold" : "font-medium"
                        } text-gray-900`}
                      >
                        {n.title}
                      </h3>
                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-[#FF9933] flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                      {n.message}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span
                        className={`text-[10px] font-medium uppercase tracking-wide px-1.5 py-0.5 rounded ${
                          !n.isRead
                            ? "bg-[#1B3A5C]/10 text-[#1B3A5C]"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {label}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatDate(n.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
