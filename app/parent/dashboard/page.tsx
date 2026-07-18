"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User, ClipboardCheck, BookText, Bell, Calendar, Award,
  TrendingUp, AlertCircle, Loader2, ArrowRight,
} from "lucide-react";
import NextImage from "next/image";

interface StudentInfo {
  id: string;
  studentName: string;
  className: string;
  section: string;
  admissionNumber: string;
  photoUrl: string | null;
}

interface AttendanceSummary {
  total: number;
  present: number;
  absent: number;
  percentage: number;
}

interface DashboardData {
  parent: { fatherName: string; motherName: string; mobileNumber: string };
  student: StudentInfo | null;
  attendance: AttendanceSummary | null;
  pendingHomework: number;
  unreadNotifications: number;
  recentNotices: { id: string; title: string; createdAt: string }[];
  upcomingEvents: { id: string; title: string; eventDate: string }[];
}

export default function ParentDashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [meRes, attRes, hwRes, notifRes, notcRes, evtRes] = await Promise.all([
          fetch("/api/auth/parent/me"),
          fetch("/api/parent/attendance"),
          fetch("/api/parent/homework/count"),
          fetch("/api/parent/notifications/unread-count"),
          fetch("/api/notices?limit=3"),
          fetch("/api/events?limit=3"),
        ]);

        if (!meRes.ok) { router.push("/parent/login"); return; }
        const meData = await meRes.json();
        const attData = attRes.ok ? await attRes.json() : null;
        const hwData = hwRes.ok ? await hwRes.json() : { count: 0 };
        const notifData = notifRes.ok ? await notifRes.json() : { count: 0 };
        const notcData = notcRes.ok ? await notcRes.json() : { notices: [] };
        const evtData = evtRes.ok ? await evtRes.json() : { events: [] };

        setData({
          parent: { fatherName: meData.parent.fatherName, motherName: meData.parent?.motherName || "", mobileNumber: meData.parent.mobileNumber },
          student: meData.student,
          attendance: attData ? { total: attData.total, present: attData.present, absent: attData.absent, percentage: attData.percentage } : null,
          pendingHomework: hwData.count,
          unreadNotifications: notifData.count,
          recentNotices: notcData.notices?.slice(0, 3).map((n: { id: string; title: string; createdAt: string }) => ({ id: n.id, title: n.title, createdAt: n.createdAt })) || [],
          upcomingEvents: evtData.events?.slice(0, 3).map((e: { id: string; title: string; eventDate: string }) => ({ id: e.id, title: e.title, eventDate: e.eventDate })) || [],
        });
      } catch { /* silent */ }
      finally { setLoading(false); }
    }
    fetchData();
  }, [router]);

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#1B3A5C]" /></div>;
  }

  if (!data || !data.student) {
    return <div className="text-center py-20"><p className="text-gray-500">No student data found. Contact admin.</p></div>;
  }

  const widgets = [
    { label: "Attendance", value: `${data.attendance?.percentage ?? 0}%`, icon: ClipboardCheck, color: "bg-emerald-500", href: "/parent/attendance" },
    { label: "Pending Homework", value: data.pendingHomework, icon: BookText, color: "bg-violet-500", href: "/parent/homework" },
    { label: "Notifications", value: data.unreadNotifications, icon: Bell, color: "bg-amber-500", href: "/parent/notifications" },
    { label: "Notices", value: data.recentNotices.length, icon: Bell, color: "bg-blue-500", href: "/parent/notices" },
  ];

  return (
    <div>
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-[#1B3A5C] flex items-center justify-center text-white text-2xl font-bold overflow-hidden flex-shrink-0">
            {data.student.photoUrl ? (
              <NextImage src={data.student.photoUrl} alt={data.student.studentName} width={80} height={80} className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-900">{data.student.studentName}</h1>
            <p className="text-sm text-gray-500">Class {data.student.className} - Section {data.student.section}</p>
            <p className="text-xs text-gray-400 mt-0.5">Admission No: {data.student.admissionNumber}</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">{data.attendance?.percentage ?? 0}% Attendance</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {widgets.map((w) => {
          const Icon = w.icon;
          return (
            <Link key={w.label} href={w.href} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{w.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{w.value}</p>
                </div>
                <div className={`${w.color} p-3 rounded-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Recent Notices</h2>
            <Link href="/parent/notices" className="text-xs text-[#FF9933] hover:underline flex items-center gap-1">View All <ArrowRight className="w-3 h-3" /></Link>
          </div>
          {data.recentNotices.length === 0 ? (
            <p className="text-sm text-gray-400">No recent notices</p>
          ) : (
            <div className="space-y-3">
              {data.recentNotices.map((n) => (
                <div key={n.id} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0">
                  <Bell className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-900">{n.title}</p>
                    <p className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Upcoming Events</h2>
            <Link href="/parent/events" className="text-xs text-[#FF9933] hover:underline flex items-center gap-1">View All <ArrowRight className="w-3 h-3" /></Link>
          </div>
          {data.upcomingEvents.length === 0 ? (
            <p className="text-sm text-gray-400">No upcoming events</p>
          ) : (
            <div className="space-y-3">
              {data.upcomingEvents.map((e) => (
                <div key={e.id} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0">
                  <Calendar className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-900">{e.title}</p>
                    <p className="text-xs text-gray-400">{new Date(e.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
