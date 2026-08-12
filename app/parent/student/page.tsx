"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Calendar, MapPin, Phone, Mail, User, GraduationCap, Award, Shield } from "lucide-react";
import NextImage from "next/image";

interface StudentProfile {
  id: string;
  studentName: string;
  admissionNumber: string;
  scholarNumber: string;
  className: string;
  section: string;
  dateOfBirth: string;
  gender: string;
  admissionDate: string;
  fatherName: string;
  motherName: string;
  mobileNumber: string;
  alternateMobile: string;
  address: string;
  photoUrl: string | null;
  category: string;
  penNumber: string;
}

export default function ParentStudentPage() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/parent/me")
      .then((r) => {
        if (!r.ok) {
          router.push("/parent/login");
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (!data) return;
        if (data.student) {
          setStudent(data.student);
        } else if (data.studentId) {
          fetch(`/api/students/${data.studentId}`)
            .then((r) => r.json())
            .then((d) => setStudent(d.student));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#1B3A5C] border-t-transparent" />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No student data found. Contact admin.</p>
      </div>
    );
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#1B3A5C] flex items-center justify-center text-white text-3xl font-bold overflow-hidden flex-shrink-0">
            {student.photoUrl ? (
              <NextImage src={student.photoUrl} alt={student.studentName} width={128} height={128} className="w-full h-full object-cover rounded-full" />
            ) : (
              <span className="text-4xl font-bold">{student.studentName.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{student.studentName}</h1>
            <p className="text-gray-500 mt-1">Class {student.className} - Section {student.section}</p>
            <p className="text-xs text-gray-400 mt-0.5">Admission No: {student.admissionNumber}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#1B3A5C]" /> Academic Information
          </h2>
          <dl className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-2 py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Admission Number</dt>
              <dd className="text-sm font-medium text-gray-900 text-right sm:text-right">{student.admissionNumber}</dd>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2 py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Scholar Number</dt>
              <dd className="text-sm font-medium text-gray-900 text-right sm:text-right">{student.scholarNumber || "N/A"}</dd>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2 py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Class / Section</dt>
              <dd className="text-sm font-medium text-gray-900 text-right sm:text-right">Class {student.className} - Section {student.section}</dd>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2 py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Date of Admission</dt>
              <dd className="text-sm font-medium text-gray-900 text-right sm:text-right">{formatDate(student.admissionDate)}</dd>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2 py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">PEN Number</dt>
              <dd className="text-sm font-medium text-gray-900 text-right sm:text-right">{student.penNumber || "N/A"}</dd>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2 py-2">
              <dt className="text-sm text-gray-500">Category</dt>
              <dd className="text-sm font-medium text-gray-900 text-right sm:text-right">{student.category}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-[#1B3A5C]" /> Personal Information
          </h2>
          <dl className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-2 py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Date of Birth</dt>
              <dd className="text-sm font-medium text-gray-900 text-right sm:text-right">{formatDate(student.dateOfBirth)}</dd>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2 py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Gender</dt>
              <dd className="text-sm font-medium text-gray-900 text-right sm:text-right">{student.gender}</dd>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2 py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Father&apos;s Name</dt>
              <dd className="text-sm font-medium text-gray-900 text-right sm:text-right">{student.fatherName}</dd>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2 py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Mother&apos;s Name</dt>
              <dd className="text-sm font-medium text-gray-900 text-right sm:text-right">{student.motherName}</dd>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2 py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Mobile Number</dt>
              <dd className="text-sm font-medium text-gray-900 text-right sm:text-right">{student.mobileNumber}</dd>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2 py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Alternate Mobile</dt>
              <dd className="text-sm font-medium text-gray-900 text-right sm:text-right">{student.alternateMobile || "N/A"}</dd>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2 py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Address</dt>
              <dd className="text-sm font-medium text-gray-900 text-right sm:text-right">{student.address}</dd>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2 py-2">
              <dt className="text-sm text-gray-500">PEN Number</dt>
              <dd className="text-sm font-medium text-gray-900 text-right sm:text-right">{student.penNumber || "N/A"}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#1B3A5C]" /> Data Privacy
        </h2>
        <p className="text-sm text-gray-600">
          This page displays only information appropriate for parents. Sensitive information such as Aadhaar number,
          caste, and other private identifiers are not displayed here.
        </p>
      </div>
    </div>
  );
}