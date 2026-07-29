"use client";

import { useState } from "react";
import { Send, User, Phone, Mail, MessageSquare, BookOpen, GraduationCap, CheckCircle2 } from "lucide-react";

const enquiryTypes = [
  "General Inquiry",
  "Admission Inquiry",
  "Academic Inquiry",
  "Fee Inquiry",
  "Transfer/Withdrawal",
  "Other",
];

const classOptions = [
  "Nursery",
  "KG",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    enquiryType: "",
    studentName: "",
    classInterested: "",
    subject: "",
    message: "",
    _website: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        enquiryType: "",
        studentName: "",
        classInterested: "",
        subject: "",
        message: "",
        _website: "",
      });
    } catch {
      setError("Unable to send message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="mt-6 text-lg font-bold text-gray-900">Thank You!</h3>
        <p className="mt-2 text-sm text-gray-500">
          We have received your message and will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="relative">
        <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name *"
          required
          className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FF9933] focus:outline-none focus:ring-2 focus:ring-[#FF9933]/20"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address *"
            required
            className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FF9933] focus:outline-none focus:ring-2 focus:ring-[#FF9933]/20"
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number *"
            required
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit mobile number"
            className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FF9933] focus:outline-none focus:ring-2 focus:ring-[#FF9933]/20"
          />
        </div>
      </div>

      <div className="relative">
        <select
          name="enquiryType"
          value={formData.enquiryType}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-gray-200 bg-white py-3.5 px-4 text-sm text-gray-900 focus:border-[#FF9933] focus:outline-none focus:ring-2 focus:ring-[#FF9933]/20 appearance-none"
        >
          <option value="">Select Enquiry Type *</option>
          {enquiryTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="relative">
          <GraduationCap className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="Student Name (if applicable)"
            className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FF9933] focus:outline-none focus:ring-2 focus:ring-[#FF9933]/20"
          />
        </div>
        <div className="relative">
          <BookOpen className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <select
            name="classInterested"
            value={formData.classInterested}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 focus:border-[#FF9933] focus:outline-none focus:ring-2 focus:ring-[#FF9933]/20 appearance-none"
          >
            <option value="">Class Interested In</option>
            {classOptions.map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject *"
          required
          className="w-full rounded-xl border border-gray-200 bg-white py-3.5 px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FF9933] focus:outline-none focus:ring-2 focus:ring-[#FF9933]/20"
        />
      </div>

      <div className="relative">
        <MessageSquare className="absolute left-4 top-5 h-4 w-4 text-gray-400" />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="Your Message *"
          required
          className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FF9933] focus:outline-none focus:ring-2 focus:ring-[#FF9933]/20 resize-none"
        />
      </div>

      {/* Honeypot - hidden from users */}
      <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
        <input
          type="text"
          name="_website"
          value={formData._website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-lg border border-red-200">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 rounded-full bg-[#1B3A5C] px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#1B3A5C]/90 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
