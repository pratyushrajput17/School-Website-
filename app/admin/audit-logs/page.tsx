"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ScrollText,
  Search,
  Filter,
  Loader2,
  Trash2,
  ChevronDown,
  ChevronRight,
  Calendar,
  Shield,
  UserCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

interface AuditLog {
  id: string;
  adminName: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  createdAt: string;
}

interface LogStats {
  total: number;
  byEntity: Record<string, number>;
}

const ENTITY_TYPES = [
  "All",
  "Student",
  "Teacher",
  "Attendance",
  "Result",
  "Admin",
];
const ACTION_TYPES = ["All", "CREATE", "UPDATE", "DELETE"];

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<LogStats>({ total: 0, byEntity: {} });

  const [entityFilter, setEntityFilter] = useState("All");
  const [actionFilter, setActionFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [page, setPage] = useState(0);
  const limit = 25;
  const [hasMore, setHasMore] = useState(true);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const fetchLogs = useCallback(
    async (reset = false) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (entityFilter !== "All") params.set("entity", entityFilter);
        if (actionFilter !== "All") params.set("action", actionFilter);
        if (startDate) params.set("startDate", startDate);
        if (endDate) params.set("endDate", endDate);
        params.set("limit", String(limit));
        params.set("offset", String(reset ? 0 : page * limit));

        const res = await fetch(`/api/audit-logs?${params}`);
        if (res.ok) {
          const d = await res.json();
          const list: AuditLog[] = d.logs || [];
          if (reset) {
            setLogs(list);
            setPage(0);
          } else {
            setLogs((prev) => [...prev, ...list]);
          }
          setHasMore(list.length === limit);
          setStats(d.stats || { total: 0, byEntity: {} });
        }
      } catch {
        /* silent */
      } finally {
        setLoading(false);
      }
    },
    [entityFilter, actionFilter, startDate, endDate, page]
  );

  useEffect(() => {
    fetchLogs(true);
  }, [entityFilter, actionFilter, startDate, endDate, fetchLogs]);

  function handleFilterChange() {
    setPage(0);
    fetchLogs(true);
  }

  async function handleClearLogs() {
    setClearing(true);
    try {
      const res = await fetch("/api/audit-logs", { method: "DELETE" });
      if (res.ok) {
        setLogs([]);
        setStats({ total: 0, byEntity: {} });
        setShowClearConfirm(false);
      }
    } catch {
      /* silent */
    } finally {
      setClearing(false);
    }
  }

  function getActionColor(action: string) {
    switch (action) {
      case "CREATE":
        return "bg-emerald-100 text-emerald-700";
      case "UPDATE":
        return "bg-blue-100 text-blue-700";
      case "DELETE":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#1B3A5C] rounded-lg p-2">
            <ScrollText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Track all admin actions in the system
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchLogs(true)}
            className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={() => setShowClearConfirm(true)}
            className="inline-flex items-center gap-2 bg-white border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear Logs
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Total Logs</p>
          <p className="text-xl font-bold text-gray-900">{stats.total}</p>
        </div>
        {Object.entries(stats.byEntity).map(([entity, count]) => (
          <div key={entity} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">{entity}</p>
            <p className="text-xl font-bold text-gray-900">{count as number}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={entityFilter}
              onChange={(e) => setEntityFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white"
            >
              {ENTITY_TYPES.map((e) => (
                <option key={e} value={e}>
                  {e === "All" ? "All Entities" : e}
                </option>
              ))}
            </select>
          </div>
          <div className="relative flex-1">
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] appearance-none bg-white"
            >
              {ACTION_TYPES.map((a) => (
                <option key={a} value={a}>
                  {a === "All" ? "All Actions" : a}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
              placeholder="Start Date"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
              placeholder="End Date"
            />
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        {loading && logs.length === 0 ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 border-4 border-[#1B3A5C] border-t-transparent animate-spin mx-auto" />
          </div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center">
            <ScrollText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No logs found
            </h3>
            <p className="text-gray-500 text-sm">
              Try changing your filters or check back later
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="w-8 px-4 py-3" />
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Date/Time
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Admin
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Action
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Entity
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Entity ID
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {logs.map((log) => (
                  <>
                    <tr
                      key={log.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() =>
                        setExpandedId(expandedId === log.id ? null : log.id)
                      }
                    >
                      <td className="px-4 py-3">
                        {expandedId === log.id ? (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          {new Date(log.createdAt).toLocaleString("en-IN")}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <UserCircle className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {log.adminName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-full ${getActionColor(
                            log.action
                          )}`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                        {log.entity}
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-500">
                        {log.entityId?.slice(0, 8)}...
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-[200px] truncate">
                        {log.details || "-"}
                      </td>
                    </tr>
                    {expandedId === log.id && (
                      <tr key={`${log.id}-expanded`}>
                        <td colSpan={7} className="px-8 py-4 bg-gray-50">
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                              Full Details (JSON)
                            </p>
                            <pre className="bg-white border border-gray-200 rounded-lg p-3 text-xs text-gray-700 overflow-x-auto max-h-60">
                              {log.details
                                ? JSON.stringify(
                                    JSON.parse(log.details),
                                    null,
                                    2
                                  )
                                : "No details available"}
                            </pre>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {logs.length > 0 && (
          <div className="border-t border-gray-100 p-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {logs.length} of {stats.total} logs
            </p>
            {hasMore && (
              <button
                onClick={() => {
                  setPage((p) => p + 1);
                  fetchLogs(false);
                }}
                disabled={loading}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#FF9933] hover:text-[#e8892e] transition-colors"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Load More"
                )}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Clear Logs Confirmation */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 rounded-full p-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Clear Audit Logs
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to clear all audit logs? This action cannot
              be undone. Only super admins can perform this action.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearLogs}
                disabled={clearing}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 inline-flex items-center gap-2"
              >
                {clearing && <Loader2 className="w-4 h-4 animate-spin" />}
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
