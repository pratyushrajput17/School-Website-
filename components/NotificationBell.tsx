"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";

export default function NotificationBell({
  role,
}: {
  role: "parent" | "teacher" | "admin";
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadCount() {
      try {
        const res = await fetch(`/api/${role}/notifications/unread-count`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) setCount(typeof data.count === "number" ? data.count : 0);
      } catch {
        /* silent */
      }
    }

    loadCount();
    const interval = setInterval(loadCount, 30000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [role]);

  return (
    <Link
      href={`/${role}/notifications`}
      className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors"
      aria-label={`Notifications${count > 0 ? ` (${count} unread)` : ""}`}
    >
      <Bell className="w-5 h-5 text-gray-600" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FF9933] text-white text-[10px] font-bold flex items-center justify-center">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
