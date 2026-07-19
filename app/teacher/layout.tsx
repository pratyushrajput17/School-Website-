"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  ClipboardCheck,
  BookText,
  LogOut,
  Menu,
  X,
  ChevronDown,
  GraduationCap,
} from "lucide-react";
import NextImage from "next/image";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [teacherName, setTeacherName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/teacher/me");
        if (!res.ok) {
          router.push("/teacher/login");
          return;
        }
        const data = await res.json();
        setTeacherName(data.teacher.teacherName);
      } catch {
        router.push("/teacher/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  const sidebarLinks = [
    { href: "/teacher/attendance", label: "Mark Attendance", icon: ClipboardCheck },
    { href: "/teacher/homework", label: "Homework", icon: BookText },
    { href: "/teacher/results", label: "Results Entry", icon: ClipboardCheck },
  ];

  async function handleLogout() {
    await fetch("/api/auth/teacher/logout", { method: "POST" });
    router.push("/teacher/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#1B3A5C] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1B3A5C] text-white transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-auto`}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <NextImage
                src="/school-logo.png"
                alt="Adarsh High School Logo"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-contain"
              />
              <div>
                <h2 className="font-semibold text-sm">Teacher Portal</h2>
                <p className="text-xs text-white/60">Attendance System</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-white/15 text-white font-medium"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white w-full transition-colors"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <div className="flex items-center gap-3 ml-auto">
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-700 leading-tight">
                    {teacherName || "Teacher"}
                  </p>
                  <p className="text-xs text-gray-400">Teacher</p>
                </div>
                <div className="w-8 h-8 bg-[#FF9933] rounded-full flex items-center justify-center text-white text-sm font-medium">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
