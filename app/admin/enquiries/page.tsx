"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Eye,
  Loader2,
  MessageSquare,
  Mail,
  Filter,
  ChevronDown,
} from "lucide-react";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  mobile: string;
  enquiryType: string;
  studentName: string;
  classInterested: string;
  subject: string;
  message: string;
  status: string;
  priority: string;
  readAt: string | null;
  createdAt: string;
}

interface Stats {
  newCount: number;
  unreadCount: number;
  inProgressCount: number;
  todayCount: number;
}

const ENQUIRY_TYPES = [
  "Admission Enquiry",
  "Academic Enquiry",
  "Existing Student",
  "Transfer / TC Enquiry",
  "Transport Enquiry",
  "General Enquiry",
  "Other",
];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminEnquiriesPage() {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const fetchEnquiries = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter) params.set("status", statusFilter);
      if (typeFilter) params.set("enquiryType", typeFilter);
      if (priorityFilter) params.set("priority", priorityFilter);

      if (dateFilter === "today") {
        params.set("dateFrom", new Date().toISOString().split("T")[0]);
      } else if (dateFilter === "7days") {
        const d = new Date();
        d.setDate(d.getDate() - 7);
        params.set("dateFrom", d.toISOString().split("T")[0]);
      } else if (dateFilter === "30days") {
        const d = new Date();
        d.setDate(d.getDate() - 30);
        params.set("dateFrom", d.toISOString().split("T")[0]);
      }

      const res = await fetch(`/api/admin/enquiries?${params}`);
      if (!res.ok) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setEnquiries(data.enquiries);
      setTotal(data.total);
      setStats(data.stats);
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, typeFilter, priorityFilter, dateFilter, router]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage contact enquiries submitted through the website
          </p>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-2xl font-bold text-amber-600">{stats.newCount}</p>
            <p className="text-xs text-gray-500 mt-0.5">New</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-2xl font-bold text-blue-600">{stats.todayCount}</p>
            <p className="text-xs text-gray-500 mt-0.5">Today</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-2xl font-bold text-purple-600">{stats.inProgressCount}</p>
            <p className="text-xs text-gray-500 mt-0.5">In Progress</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-2xl font-bold text-gray-900">{total}</p>
            <p className="text-xs text-gray-500 mt-0.5">Total</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, subject, or student name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm transition-colors ${
                showFilters
                  ? "bg-[#FF9933] text-white border-[#FF9933]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>
          </div>

          {showFilters && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white"
                >
                  <option value="">All Status</option>
                  <option value="NEW">New</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                </select>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white"
                >
                  <option value="">All Types</option>
                  {ENQUIRY_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white"
                >
                  <option value="">All Priority</option>
                  <option value="NORMAL">Normal</option>
                  <option value="IMPORTANT">Important</option>
                </select>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white"
                >
                  <option value="">All Time</option>
                  <option value="today">Today</option>
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#1B3A5C] border-t-transparent mx-auto" />
          </div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No enquiries found
            </h3>
            <p className="text-gray-500 text-sm">
              {search || statusFilter || typeFilter || priorityFilter || dateFilter
                ? "Try different filters"
                : "No enquiries have been submitted yet"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Date</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Name</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Type</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Subject</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Email</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Priority</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {enquiries.map((enq) => (
                  <tr
                    key={enq.id}
                    className={`hover:bg-gray-50 transition-colors ${!enq.readAt ? "bg-amber-50/50" : ""}`}
                  >
                    <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                      {formatDate(enq.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${!enq.readAt ? "text-gray-900" : "text-gray-700"}`}>
                          {enq.name}
                        </span>
                        {!enq.readAt && (
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{enq.enquiryType}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-[200px] truncate">{enq.subject}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{enq.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        enq.status === "NEW"
                          ? "bg-amber-100 text-amber-700"
                          : enq.status === "IN_PROGRESS"
                          ? "bg-blue-100 text-blue-700"
                          : enq.status === "RESOLVED"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {enq.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        enq.priority === "IMPORTANT"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {enq.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/enquiries/${enq.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
