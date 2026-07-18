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
} from "lucide-react";

interface Stats {
  notices: number;
  events: number;
  gallery: number;
  achievers: number;
  students: number;
  activeStudents?: number;
  studentsPerClass?: { className: string; count: number }[];
  teachers: number;
  activeTeachers?: number;
  teachersPerSubject?: { subject: string; count: number }[];
  homework?: number;
  attendance?: {
    total: number;
    present: number;
    absent: number;
    late: number;
    halfDay: number;
    leave: number;
    percentage: number;
  };
}

interface AdminInfo {
  name: string;
  role: string;
}

interface StatCard {
  label: string;
  value: number;
  icon: typeof Bell;
  color: string;
  href: string;
}

const navigationCards = [
  {
    label: "Manage Students",
    description: "Add, edit, or manage student records",
    icon: Users,
    href: "/admin/students",
    color: "bg-cyan-500",
  },
  {
    label: "Manage Notices",
    description: "Add, edit, or remove notices",
    icon: Bell,
    href: "/admin/notices",
    color: "bg-blue-500",
  },
  {
    label: "Manage Events",
    description: "Add, edit, or remove events",
    icon: Calendar,
    href: "/admin/events",
    color: "bg-green-500",
  },
  {
    label: "Manage Gallery",
    description: "Add, edit, or remove gallery images",
    icon: Image,
    href: "/admin/gallery",
    color: "bg-purple-500",
  },
  {
    label: "Manage Achievers",
    description: "Add, edit, or remove achievers",
    icon: Award,
    href: "/admin/achievers",
    color: "bg-amber-500",
  },
  {
    label: "Manage Teachers",
    description: "Add, edit, or manage teacher records",
    icon: BookOpen,
    href: "/admin/teachers",
    color: "bg-indigo-500",
  },
  {
    label: "View Attendance",
    description: "View and export daily attendance records",
    icon: ClipboardCheck,
    href: "/admin/attendance",
    color: "bg-emerald-500",
  },
  {
    label: "Manage Homework",
    description: "Assign and manage homework across classes",
    icon: BookText,
    href: "/admin/homework",
    color: "bg-violet-500",
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
      } catch {
        /* silent fail */
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const statCards: StatCard[] = [
    { label: "Total Students", value: stats?.students ?? 0, icon: Users, color: "bg-cyan-500", href: "/admin/students" },
    { label: "Active Students", value: stats?.activeStudents ?? 0, icon: Users, color: "bg-emerald-500", href: "/admin/students?status=Active" },
    { label: "Total Teachers", value: stats?.teachers ?? 0, icon: BookOpen, color: "bg-indigo-500", href: "/admin/teachers" },
    { label: "Active Teachers", value: stats?.activeTeachers ?? 0, icon: BookOpen, color: "bg-teal-500", href: "/admin/teachers?status=Active" },
    { label: "Today Present", value: stats?.attendance?.present ?? 0, icon: ClipboardCheck, color: "bg-emerald-500", href: "/admin/attendance" },
    { label: "Today Absent", value: stats?.attendance?.absent ?? 0, icon: ClipboardCheck, color: "bg-red-500", href: "/admin/attendance?status=Absent" },
    { label: "Total Homework", value: stats?.homework ?? 0, icon: BookText, color: "bg-violet-500", href: "/admin/homework" },
    { label: "Total Notices", value: stats?.notices ?? 0, icon: Bell, color: "bg-blue-500", href: "/admin/notices" },
    { label: "Total Events", value: stats?.events ?? 0, icon: Calendar, color: "bg-green-500", href: "/admin/events" },
    { label: "Gallery Images", value: stats?.gallery ?? 0, icon: Image, color: "bg-purple-500", href: "/admin/gallery" },
    { label: "Academic Achievers", value: stats?.achievers ?? 0, icon: Award, color: "bg-amber-500", href: "/admin/achievers" },
  ];

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome to Adarsh High School Admin Panel
          </p>
        </div>
        {admin && (
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5">
            <Shield className={`w-4 h-4 ${admin.role === "super_admin" ? "text-purple-600" : "text-blue-600"}`} />
            <span className={`text-xs font-semibold uppercase tracking-wider ${
              admin.role === "super_admin" ? "text-purple-700" : "text-blue-700"
            }`}>
              {admin.role.replace("_", " ")}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {loading ? (
                      <span className="inline-block w-8 h-8 bg-gray-200 rounded animate-pulse" />
                    ) : (
                      card.value
                    )}
                  </p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {stats?.teachersPerSubject && stats.teachersPerSubject.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Teachers By Subject
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {stats.teachersPerSubject.map((item) => (
              <div
                key={item.subject}
                className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md transition-shadow"
              >
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  {item.subject}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {item.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats?.studentsPerClass && stats.studentsPerClass.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Students Per Class
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {stats.studentsPerClass.map((item) => (
              <Link
                key={item.className}
                href={`/admin/students?className=${item.className}`}
                className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md transition-shadow"
              >
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Class {item.className}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {item.count}
                </p>
              </Link>
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
