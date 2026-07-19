"use client";

import Link from "next/link";
import { LayoutDashboard, AlertTriangle } from "lucide-react";

export default function AdminNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 md:p-12">
          <div className="flex justify-center mb-4">
            <div className="bg-[#1B3A5C]/10 rounded-full p-4">
              <AlertTriangle className="w-10 h-10 text-[#1B3A5C]" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>

          <Link
            href="/admin"
            className="inline-flex items-center justify-center gap-2 bg-[#1B3A5C] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#152d4a] transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Adarsh High School Admin Panel
        </p>
      </div>
    </div>
  );
}
