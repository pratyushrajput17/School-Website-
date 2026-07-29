"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  MessageSquare,
  User,
  Phone,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Flag,
} from "lucide-react";

interface EnquiryDetail {
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
  resolvedAt: string | null;
  resolvedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

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

function getTimeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

export default function EnquiryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [enquiry, setEnquiry] = useState<EnquiryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEnquiry();
  }, [id]);

  async function fetchEnquiry() {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`);
      if (!res.ok) {
        if (res.status === 404) setNotFound(true);
        return;
      }
      const data = await res.json();
      setEnquiry(data.enquiry);
      if (!data.enquiry.readAt) {
        await fetch(`/api/admin/enquiries/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ markRead: true }),
        });
        setEnquiry((prev) => prev ? { ...prev, readAt: new Date().toISOString() } : prev);
      }
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }

  async function updateField(field: string, value: string | boolean) {
    setUpdating(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to update");
        return;
      }
      const data = await res.json();
      setEnquiry(data.enquiry);
    } catch {
      setError("Something went wrong");
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#1B3A5C] border-t-transparent" />
      </div>
    );
  }

  if (notFound || !enquiry) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-900">Enquiry not found</h2>
        <Link href="/admin/enquiries" className="inline-block mt-4 text-[#FF9933] hover:underline">
          Back to Enquiries
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/enquiries"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Enquiries
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Enquiry Details</h1>
        <p className="text-gray-500 text-sm mt-1">
          Submitted {getTimeAgo(enquiry.createdAt)} on {formatDate(enquiry.createdAt)}
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="text-sm font-medium text-gray-900">{enquiry.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <a
                    href={`mailto:${enquiry.email}?subject=Re: ${encodeURIComponent(enquiry.subject)}`}
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    {enquiry.email}
                  </a>
                </div>
              </div>
              {enquiry.mobile && (
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Mobile</p>
                    <p className="text-sm font-medium text-gray-900">{enquiry.mobile}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Enquiry Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Enquiry Type</p>
                <p className="text-sm font-medium text-gray-900">{enquiry.enquiryType}</p>
              </div>
              {enquiry.studentName && (
                <div>
                  <p className="text-xs text-gray-500">Student Name</p>
                  <p className="text-sm font-medium text-gray-900">{enquiry.studentName}</p>
                </div>
              )}
              {enquiry.classInterested && (
                <div>
                  <p className="text-xs text-gray-500">Class Interested In</p>
                  <p className="text-sm font-medium text-gray-900">{enquiry.classInterested}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Subject
            </h2>
            <p className="text-base font-medium text-gray-900">{enquiry.subject}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Message
            </h2>
            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {enquiry.message}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Status
            </h2>
            <div className="space-y-3">
              {["NEW", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((status) => (
                <button
                  key={status}
                  onClick={() => updateField("status", status)}
                  disabled={updating || enquiry.status === status}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    enquiry.status === status
                      ? status === "NEW"
                        ? "bg-amber-100 text-amber-700 ring-1 ring-amber-300"
                        : status === "IN_PROGRESS"
                        ? "bg-blue-100 text-blue-700 ring-1 ring-blue-300"
                        : status === "RESOLVED"
                        ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300"
                        : "bg-gray-100 text-gray-700 ring-1 ring-gray-300"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {status === "NEW" && <span className="flex items-center gap-2"><AlertCircle className="w-4 h-4" />New</span>}
                  {status === "IN_PROGRESS" && <span className="flex items-center gap-2"><Loader2 className="w-4 h-4" />In Progress</span>}
                  {status === "RESOLVED" && <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />Resolved</span>}
                  {status === "CLOSED" && <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />Closed</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Priority
            </h2>
            <div className="space-y-2">
              {["NORMAL", "IMPORTANT"].map((priority) => (
                <button
                  key={priority}
                  onClick={() => updateField("priority", priority)}
                  disabled={updating || enquiry.priority === priority}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    enquiry.priority === priority
                      ? priority === "IMPORTANT"
                        ? "bg-red-100 text-red-700 ring-1 ring-red-300"
                        : "bg-gray-100 text-gray-700 ring-1 ring-gray-300"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Flag className="w-4 h-4" />
                    {priority === "IMPORTANT" ? "Important" : "Normal"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Actions
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => updateField("markRead", true)}
                disabled={updating || !!enquiry.readAt}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                Mark as Read
              </button>
              <button
                onClick={() => updateField("markUnread", true)}
                disabled={updating || !enquiry.readAt}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                Mark as Unread
              </button>
              <a
                href={`mailto:${enquiry.email}?subject=Re: ${encodeURIComponent(enquiry.subject)}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-[#FF9933]/10 text-[#FF9933] hover:bg-[#FF9933]/20 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Reply by Email
              </a>
            </div>
          </div>

          {enquiry.resolvedAt && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                Resolution Info
              </h2>
              <p className="text-xs text-gray-500">Resolved on {formatDate(enquiry.resolvedAt)}</p>
              {enquiry.resolvedBy && (
                <p className="text-xs text-gray-500 mt-1">By: {enquiry.resolvedBy}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
