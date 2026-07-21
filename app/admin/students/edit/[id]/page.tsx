"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2, Upload, X } from "lucide-react";
import Link from "next/link";

const CLASSES = Array.from({ length: 12 }, (_, i) => String(i + 1));
const SECTIONS = ["A", "B", "C"];

export default function EditStudentPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [admissionNumber, setAdmissionNumber] = useState("");
  const [scholarNumber, setScholarNumber] = useState("");
  const [category, setCategory] = useState("General");
  const [caste, setCaste] = useState("");
  const [penNumber, setPenNumber] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [alternateMobile, setAlternateMobile] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [status, setStatus] = useState("Active");
  const [admissionDate, setAdmissionDate] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [existingPhotoUrl, setExistingPhotoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const res = await fetch(`/api/students/${id}`);
        if (!res.ok) {
          if (res.status === 404) setNotFound(true);
          else router.push("/admin/students");
          return;
        }
        const data = await res.json();
        const s = data.student;
        setAdmissionNumber(s.admissionNumber);
        setScholarNumber(s.scholarNumber || "");
        setCategory(s.category || "General");
        setCaste(s.caste || "");
        setPenNumber(s.penNumber || "");
        setAadhaarNumber(s.aadhaarNumber || "");
        setWhatsappNumber(s.whatsappNumber || "");
        setStudentName(s.studentName);
        setFatherName(s.fatherName);
        setMotherName(s.motherName);
        setMobileNumber(s.mobileNumber);
        setAlternateMobile(s.alternateMobile || "");
        setDateOfBirth(s.dateOfBirth.split("T")[0]);
        setGender(s.gender || "");
        setAddress(s.address);
        setClassName(s.className);
        setSection(s.section);
        setStatus(s.status);
        setAdmissionDate(s.admissionDate.split("T")[0]);
        setExistingPhotoUrl(s.photoUrl || null);
        if (s.photoUrl) setPhotoPreview(s.photoUrl);
      } catch {
        router.push("/admin/students");
      } finally {
        setLoading(false);
      }
    }
    fetchStudent();
  }, [id, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (
      !admissionNumber.trim() ||
      !studentName.trim() ||
      !fatherName.trim() ||
      !motherName.trim() ||
      !mobileNumber.trim() ||
      !dateOfBirth ||
      !address.trim() ||
      !className ||
      !section ||
      !admissionDate
    ) {
      setError("All required fields must be filled");
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber.replace(/\s/g, ""))) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("admissionNumber", admissionNumber.trim());
      formData.append("scholarNumber", scholarNumber.trim());
      formData.append("category", category);
      formData.append("caste", caste.trim());
      formData.append("penNumber", penNumber.trim());
      formData.append("aadhaarNumber", aadhaarNumber.trim());
      formData.append("whatsappNumber", whatsappNumber.trim());
      formData.append("studentName", studentName.trim());
      formData.append("fatherName", fatherName.trim());
      formData.append("motherName", motherName.trim());
      formData.append("mobileNumber", mobileNumber.trim());
      formData.append("alternateMobile", alternateMobile.trim());
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("gender", gender);
      formData.append("className", className);
      formData.append("section", section);
      formData.append("address", address.trim());
      formData.append("status", status);
      formData.append("admissionDate", admissionDate);
      if (photoFile) {
        formData.append("photo", photoFile);
      }
      formData.append("keepExistingPhoto", String(!photoFile && !!existingPhotoUrl));

      const res = await fetch(`/api/students/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to update student");
        return;
      }

      router.push("/admin/students");
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

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/students"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Students
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Student</h1>
        <p className="text-gray-500 text-sm mt-1">
          Update student information
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-gray-200 p-6 space-y-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="admissionNumber"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Admission Number <span className="text-red-500">*</span>
            </label>
            <input
              id="admissionNumber"
              type="text"
              value={admissionNumber}
              onChange={(e) => setAdmissionNumber(e.target.value)}
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
              <option value="Transferred">Transferred</option>
              <option value="Left">Left</option>
            </select>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
            Academic & Identity Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label
                htmlFor="scholarNumber"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Scholar Number
              </label>
              <input
                id="scholarNumber"
                type="text"
                value={scholarNumber}
                onChange={(e) => setScholarNumber(e.target.value)}
                placeholder="Optional"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
              >
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="caste"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Caste
              </label>
              <input
                id="caste"
                type="text"
                value={caste}
                onChange={(e) => setCaste(e.target.value)}
                placeholder="Optional"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
            <div>
              <label
                htmlFor="penNumber"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                PEN Number
              </label>
              <input
                id="penNumber"
                type="text"
                value={penNumber}
                onChange={(e) => setPenNumber(e.target.value)}
                placeholder="Optional"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="aadhaarNumber"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Aadhaar Number
              </label>
              <input
                id="aadhaarNumber"
                type="text"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value)}
                placeholder="Optional"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="whatsappNumber"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                WhatsApp Number
              </label>
              <input
                id="whatsappNumber"
                type="tel"
                maxLength={10}
                value={whatsappNumber}
                onChange={(e) =>
                  setWhatsappNumber(e.target.value.replace(/\D/g, ""))
                }
                placeholder="Optional"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
            Personal Details
          </h3>
        </div>

        <div>
          <label
            htmlFor="studentName"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Student Name <span className="text-red-500">*</span>
          </label>
          <input
            id="studentName"
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="fatherName"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Father Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fatherName"
              type="text"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="motherName"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Mother Name <span className="text-red-500">*</span>
            </label>
            <input
              id="motherName"
              type="text"
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              id="mobileNumber"
              type="tel"
              maxLength={10}
              value={mobileNumber}
              onChange={(e) =>
                setMobileNumber(e.target.value.replace(/\D/g, ""))
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="alternateMobile"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Alternate Mobile
            </label>
            <input
              id="alternateMobile"
              type="tel"
              maxLength={10}
              value={alternateMobile}
              onChange={(e) =>
                setAlternateMobile(e.target.value.replace(/\D/g, ""))
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
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
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent resize-y"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <div>
            <label
              htmlFor="className"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Class <span className="text-red-500">*</span>
            </label>
            <select
              id="className"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
            >
              <option value="">Select</option>
              {CLASSES.map((c) => (
                <option key={c} value={c}>
                  Class {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="section"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Section <span className="text-red-500">*</span>
            </label>
            <select
              id="section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white"
            >
              <option value="">Select</option>
              {SECTIONS.map((s) => (
                <option key={s} value={s}>
                  Section {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="admissionDate"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Admission Date <span className="text-red-500">*</span>
            </label>
            <input
              id="admissionDate"
              type="date"
              value={admissionDate}
              onChange={(e) => setAdmissionDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Photo
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-[#FF9933] transition-colors"
            >
              {photoPreview ? (
                <div className="relative">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhotoFile(null);
                      setPhotoPreview(existingPhotoUrl);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Click to upload student photo
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Optional · JPG/PNG up to 2MB
                  </p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (!file.type.startsWith("image/")) {
                  setError("Please select an image file");
                  return;
                }
                if (file.size > 2 * 1024 * 1024) {
                  setError("Photo must be less than 2MB");
                  return;
                }
                setError("");
                setPhotoFile(file);
                setPhotoPreview(URL.createObjectURL(file));
              }}
              className="hidden"
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
            href="/admin/students"
            className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
