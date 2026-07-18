"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  Calendar,
  Image,
  Award,
  ArrowRight,
} from "lucide-react";

interface Stats {
  notices: number;
  events: number;
  gallery: number;
  achievers: number;
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
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data.stats);
        }
      } catch {
        /* silent fail */
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards: StatCard[] = [
    { label: "Total Notices", value: stats?.notices ?? 0, icon: Bell, color: "bg-blue-500", href: "/admin/notices" },
    { label: "Total Events", value: stats?.events ?? 0, icon: Calendar, color: "bg-green-500", href: "/admin/events" },
    { label: "Gallery Images", value: stats?.gallery ?? 0, icon: Image, color: "bg-purple-500", href: "/admin/gallery" },
    { label: "Academic Achievers", value: stats?.achievers ?? 0, icon: Award, color: "bg-amber-500", href: "/admin/achievers" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome to Adarsh High School Admin Panel
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
