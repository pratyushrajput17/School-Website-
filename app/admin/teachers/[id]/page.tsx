"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Edit3,
  Trash2,
  Loader2,
  Calendar,
  Phone,
  MapPin,
  BookOpen,
  Mail,
  GraduationCap,
  X,
} from "lucide-react";

interface TeacherDetail {
  id: string;
  employeeId: string;
  teacherName: string;
  email: string;
  phone: string;
  subject: string;
  assignedClasses: string;
  joiningDate: string;
  qualification: string;
  address: string;
  photoUrl: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TeacherDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [teacher, setTeacher] = useState<TeacherDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchTeacher() {
      try {
        const res = await fetch(`/api/teachers/${id}`);
        if (!res.ok) {
          if (res.status === 404) setNotFound(true);
          return;
        }
        const data = await res.json();
        setTeacher(data.teacher);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchTeacher();
  }, [id]);

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/teachers/${id}`, { method: "DELETE" });
      if (res.ok) router.push("/admin/teachers");
    } catch {
      /* silent */
    } finally {
      setDeleting(false);
      setDeleteModal(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#1B3A5C] border-t-transparent" />
      </div>
    );
  }

  if (notFound || !teacher) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-900">
          Teacher not found
        </h2>
        <p className="text-gray-500 mt-2">
          The teacher you are looking for does not exist.
        </p>
        <Link
          href="/admin/teachers"
          className="inline-block mt-4 text-[#FF9933] hover:underline"
        >
          Back to Teachers
        </Link>
      </div>
    );
  }

  const infoRows = [
    { label: "Employee ID", value: teacher.employeeId, icon: GraduationCap },
    { label: "Full Name", value: teacher.teacherName, icon: BookOpen },
    { label: "Email", value: teacher.email, icon: Mail },
    { label: "Phone", value: teacher.phone, icon: Phone },
    { label: "Subject", value: teacher.subject, icon: BookOpen },
    {
      label: "Assigned Classes",
      value: teacher.assignedClasses
        ? teacher.assignedClasses
            .split(",")
            .map((c) => c.trim())
            .join(", ")
        : "None",
      icon: GraduationCap,
    },
    {
      label: "Joining Date",
      value: formatDate(teacher.joiningDate),
      icon: Calendar,
    },
    { label: "Qualification", value: teacher.qualification, icon: GraduationCap },
    { label: "Address", value: teacher.address, icon: MapPin },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/admin/teachers"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Teachers
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {teacher.teacherName}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Teacher Profile • {teacher.employeeId}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/teachers/edit/${teacher.id}`}
            className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </Link>
          <button
            onClick={() => setDeleteModal(true)}
            className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start gap-6 mb-8 pb-6 border-b border-gray-100">
          {teacher.photoUrl ? (
            <img
              src={teacher.photoUrl}
              alt={teacher.teacherName}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-saffron-light flex items-center justify-center text-2xl font-bold text-saffron-dark">
              {teacher.teacherName.charAt(0)}
            </div>
          )}
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">
                {teacher.teacherName}
              </h2>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  teacher.status === "Active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {teacher.status}
              </span>
            </div>
            <p className="text-muted-foreground text-sm mt-1">
              {teacher.subject} Teacher • {teacher.qualification}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {infoRows.map((row) => {
            const Icon = row.icon;
            return (
              <div key={row.label} className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-saffron-light flex-shrink-0">
                  <Icon className="w-4 h-4 text-saffron-dark" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {row.label}
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">
                    {row.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-xs text-gray-400">
          <p>Created: {formatDate(teacher.createdAt)}</p>
          <p>Last Updated: {formatDate(teacher.updatedAt)}</p>
        </div>
      </div>

      {deleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Teacher
              </h3>
              <button
                onClick={() => setDeleteModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <strong>{teacher.teacherName}</strong>? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
