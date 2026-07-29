"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  Calendar,
  Image,
  Award,
  Users,
  ArrowRight,
  Shield,
  BookOpen,
  ClipboardCheck,
  BookText,
  Layers,
  Columns,
  BookMarked,
  UserCheck,
  BookCheck,
  UserRound,
  MessageSquare,
  Inbox,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";

interface Stats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalSections: number;
  boysCount: number;
  girlsCount: number;
  totalNotices: number;
  totalEvents: number;
  studentsPerClass: { class: string; count: number }[];
  teachersPerSubject: { subject: string; count: number }[];
}

interface AdminInfo {
  id: string;
  email: string;
  name: string;
  role: string;
}

const navigationCards = [
  {
    href: "/admin/students",
    label: "Students",
    description: "Manage student records, attendance, and performance",
    icon: Users,
    color: "bg-blue-600",
  },
  {
    href: "/admin/teachers",
    label: "Teachers",
    description: "Manage teacher profiles and assignments",
    icon: UserCheck,
    color: "bg-green-600",
  },
  {
    href: "/admin/classes",
    label: "Classes",
    description: "Class and section management",
    icon: BookOpen,
    color: "bg-purple-600",
  },
  {
    href: "/admin/notices",
    label: "Notices",
    description: "Create and manage school notices",
    icon: Bell,
    color: "bg-orange-600",
  },
  {
    href: "/admin/events",
    label: "Events",
    description: "Manage school events and activities",
    icon: Calendar,
    color: "bg-red-600",
  },
  {
    href: "/admin/gallery",
    label: "Gallery",
    description: "Upload and organize school photos",
    icon: Image,
    color: "bg-pink-600",
  },
  {
    href: "/admin/achievers",
    label: "Achievers",
    description: "Recognize student achievements",
    icon: Award,
    color: "bg-yellow-600",
  },
  {
    href: "/admin/exams",
    label: "Exams",
    description: "Exam schedules and results",
    icon: BookText,
    color: "bg-indigo-600",
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [admin, setAdmin] = useState<AdminInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, meRes] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/auth/me"),
        ]);
        if (statsRes.ok) {
          const data = await statsRes.json();
          setStats(data.stats);
        }
        if (meRes.ok) {
          const data = await meRes.json();
          setAdmin(data.admin);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1B3A5C] border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {admin?.name || "Admin"}
        </h1>
        <p className="text-gray-500 mt-1">
          Here&apos;s an overview of your school
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">Total Students</p>
          <p className="text-2xl font-bold text-gray-900">
            {stats?.totalStudents || 0}
          </p>
          <div className="flex gap-3 mt-2 text-xs text-gray-500">
            <span>Boys: {stats?.boysCount || 0}</span>
            <span>Girls: {stats?.girlsCount || 0}</span>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">Teachers</p>
          <p className="text-2xl font-bold text-gray-900">
            {stats?.totalTeachers || 0}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">Classes</p>
          <p className="text-2xl font-bold text-gray-900">
            {stats?.totalClasses || 0}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {stats?.totalSections || 0} sections
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">Notices & Events</p>
          <p className="text-2xl font-bold text-gray-900">
            {stats?.totalNotices || 0}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {stats?.totalEvents || 0} upcoming events
          </p>
        </div>
      </div>

      {admin?.role === "super_admin" && (
        <EnquiriesWidgetComponent />
      )}

      {stats?.teachersPerSubject && stats.teachersPerSubject.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Teachers By Subject
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {stats.teachersPerSubject.map((item) => (
              <div
                key={item.subject}
                className="bg-white rounded-lg border border-gray-200 p-3"
              >
                <p className="text-xs text-gray-500">{item.subject}</p>
                <p className="text-lg font-bold text-gray-900">{item.count}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats?.studentsPerClass && stats.studentsPerClass.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Students By Class
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {stats.studentsPerClass.map((item) => (
              <div
                key={item.class}
                className="bg-white rounded-lg border border-gray-200 p-3"
              >
                <p className="text-xs text-gray-500">{item.class}</p>
                <p className="text-lg font-bold text-gray-900">{item.count}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {navigationCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start gap-4">
                <div className={`${card.color} p-3 rounded-lg flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900">{card.label}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {card.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#FF9933] transition-colors flex-shrink-0 mt-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function EnquiriesWidgetComponent() {
  const [stats, setStats] = useState({ new: 0, inProgress: 0, resolved: 0, total: 0, unreadCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/enquiries?limit=1")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => {
        if (d?.stats) setStats(d.stats);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mb-8 p-6 bg-white rounded-xl border border-gray-200">
        <div className="animate-pulse flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-lg" />
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Enquiries</h2>
        <Link
          href="/admin/enquiries"
          className="text-sm text-[#FF9933] hover:underline font-medium"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-amber-600 mb-1">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">New</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.new}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Loader2 className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Resolved</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <Inbox className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Unread</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.unreadCount}</p>
        </div>
      </div>
    </div>
  );
}
