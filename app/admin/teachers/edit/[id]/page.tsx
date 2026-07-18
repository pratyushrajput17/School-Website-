"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

const SUBJECTS = [
  "Hindi",
  "English",
  "Mathematics",
  "Science",
  "Social Science",
  "Sanskrit",
  "Computer Science",
  "Physical Education",
  "Art & Craft",
  "Music",
];

const CLASS_OPTIONS = [
  "Nursery",
  "KG",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

export default function EditTeacherPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [employeeId, setEmployeeId] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [assignedClasses, setAssignedClasses] = useState<string[]>([]);
  const [joiningDate, setJoiningDate] = useState("");
  const [qualification, setQualification] = useState("");
  const [address, setAddress] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [status, setStatus] = useState("Active");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchTeacher() {
      try {
        const res = await fetch(`/api/teachers/${id}`);
        if (!res.ok) {
          if (res.status === 404) setNotFound(true);
          else router.push("/admin/teachers");
          return;
        }
        const data = await res.json();
        const t = data.teacher;
        setEmployeeId(t.employeeId);
        setTeacherName(t.teacherName);
        setEmail(t.email);
        setPhone(t.phone);
        setSubject(t.subject);
        setAssignedClasses(
          t.assignedClasses ? t.assignedClasses.split(",").map((c: string) => c.trim()).filter(Boolean) : []
        );
        setJoiningDate(t.joiningDate.split("T")[0]);
        setQualification(t.qualification);
        setAddress(t.address);
        setPhotoUrl(t.photoUrl || "");
        setStatus(t.status);
      } catch {
        router.push("/admin/teachers");
      } finally {
        setLoading(false);
      }
    }
    fetchTeacher();
  }, [id, router]);

  function toggleClass(c: string) {
    setAssignedClasses((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (
      !employeeId.trim() ||
      !teacherName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !subject ||
      !joiningDate ||
      !qualification.trim() ||
      !address.trim()
    ) {
      setError("All required fields must be filled");
      return;
    }

    if (!/^\d{10}$/.test(phone.replace(/\s/g, ""))) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/teachers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId: employeeId.trim(),
          teacherName: teacherName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          subject,
          assignedClasses: assignedClasses.join(","),
          joiningDate,
          qualification: qualification.trim(),
          address: address.trim(),
          photoUrl: photoUrl.trim() || undefined,
          status,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to update teacher");
        return;
      }

      router.push("/admin/teachers");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#1B3A5C] border-t-transparent" />
      </div>
    );
  }

  if (notFound) {
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

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/teachers"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Teachers
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Teacher</h1>
        <p className="text-gray-500 text-sm mt-1">
          Update teacher information
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-gray-200 p-6 space-y-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="employeeId"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Employee ID <span className="text-red-500">*</span>
            </label>
            <input
              id="employeeId"
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="teacherName"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Teacher Name <span className="text-red-500">*</span>
          </label>
          <input
            id="teacherName"
            type="text"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              maxLength={10}
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, ""))
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Subject <span className="text-red-500">*</span>
            </label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
            >
              <option value="">Select Subject</option>
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="joiningDate"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Joining Date <span className="text-red-500">*</span>
            </label>
            <input
              id="joiningDate"
              type="date"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="qualification"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Qualification <span className="text-red-500">*</span>
          </label>
          <input
            id="qualification"
            type="text"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assigned Classes
          </label>
          <div className="flex flex-wrap gap-2">
            {CLASS_OPTIONS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleClass(c)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  assignedClasses.includes(c)
                    ? "bg-[#FF9933] text-white border-[#FF9933]"
                    : "bg-white text-gray-600 border-gray-300 hover:border-[#FF9933]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="photoUrl"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Photo URL
            </label>
            <input
              id="photoUrl"
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#FF9933] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#e8892e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <Link
            href="/admin/teachers"
            className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
