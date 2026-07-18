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
  GraduationCap,
  User,
  X,
} from "lucide-react";

interface StudentDetail {
  id: string;
  admissionNumber: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  mobileNumber: string;
  alternateMobile: string;
  dateOfBirth: string;
  gender: string;
  className: string;
  section: string;
  address: string;
  status: string;
  admissionDate: string;
  photoUrl: string | null;
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

function calculateAge(dob: string) {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export default function StudentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const res = await fetch(`/api/students/${id}`);
        if (!res.ok) {
          if (res.status === 404) setNotFound(true);
          return;
        }
        const data = await res.json();
        setStudent(data.student);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchStudent();
  }, [id]);

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
      if (res.ok) router.push("/admin/students");
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

  if (notFound || !student) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-900">
          Student not found
        </h2>
        <p className="text-gray-500 mt-2">
          The student you are looking for does not exist.
        </p>
        <Link
          href="/admin/students"
          className="inline-block mt-4 text-[#FF9933] hover:underline"
        >
          Back to Students
        </Link>
      </div>
    );
  }

  const infoRows = [
    {
      label: "Admission Number",
      value: student.admissionNumber,
      icon: GraduationCap,
    },
    { label: "Full Name", value: student.studentName, icon: User },
    { label: "Gender", value: student.gender || "N/A", icon: User },
    {
      label: "Date of Birth",
      value: `${formatDate(student.dateOfBirth)} (Age: ${calculateAge(student.dateOfBirth)})`,
      icon: Calendar,
    },
    { label: "Class", value: `Class ${student.className}`, icon: GraduationCap },
    { label: "Section", value: student.section, icon: GraduationCap },
    { label: "Father Name", value: student.fatherName, icon: User },
    { label: "Mother Name", value: student.motherName, icon: User },
    {
      label: "Mobile Number",
      value: student.mobileNumber,
      icon: Phone,
    },
    ...(student.alternateMobile
      ? [
          {
            label: "Alternate Mobile",
            value: student.alternateMobile,
            icon: Phone,
          },
        ]
      : []),
    {
      label: "Address",
      value: student.address,
      icon: MapPin,
    },
    {
      label: "Admission Date",
      value: formatDate(student.admissionDate),
      icon: Calendar,
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/admin/students"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Students
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {student.studentName}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Student Profile • {student.admissionNumber}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/students/edit/${student.id}`}
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
          {student.photoUrl ? (
            <img
              src={student.photoUrl}
              alt={student.studentName}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-saffron-light flex items-center justify-center text-2xl font-bold text-saffron-dark">
              {student.studentName.charAt(0)}
            </div>
          )}
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">
                {student.studentName}
              </h2>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  student.status === "Active"
                    ? "bg-emerald-100 text-emerald-700"
                    : student.status === "Transferred"
                    ? "bg-blue-100 text-blue-700"
                    : student.status === "Inactive"
                    ? "bg-gray-100 text-gray-600"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {student.status}
              </span>
            </div>
            <p className="text-muted-foreground text-sm mt-1">
              Class {student.className} • Section {student.section}
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
          <p>Created: {formatDate(student.createdAt)}</p>
          <p>Last Updated: {formatDate(student.updatedAt)}</p>
        </div>
      </div>

      {deleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Student
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
              <strong>{student.studentName}</strong>? This action cannot be
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
