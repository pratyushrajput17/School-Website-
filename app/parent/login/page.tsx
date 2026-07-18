"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Phone, Lock } from "lucide-react";
import NextImage from "next/image";

export default function ParentLoginPage() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!mobileNumber.trim() || !password.trim()) {
      setError("Mobile number and password are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/parent/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber: mobileNumber.trim(), password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Login failed");
        return;
      }

      router.push("/parent/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <NextImage src="/school-logo.png" alt="Adarsh High School" width={64} height={64} className="w-16 h-16 mx-auto rounded-full object-contain" />
          <h1 className="text-xl font-bold text-gray-900 mt-4">Parent Portal</h1>
          <p className="text-gray-500 text-sm mt-1">Adarsh High School, Sainkheda</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter registered mobile number"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent" />
            </div>
          </div>

          {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg border border-red-200">{error}</div>}

          <button type="submit" disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#FF9933] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#e8892e] transition-colors disabled:opacity-50">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-xs text-gray-400 mt-4">
            <Link href="/login" className="text-[#1B3A5C] hover:underline">Admin Login</Link>
            {" | "}
            <Link href="/teacher/login" className="text-[#1B3A5C] hover:underline">Teacher Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
