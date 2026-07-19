"use client";

import Link from "next/link";
import { Home, ShieldAlert } from "lucide-react";

export default function Forbidden() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 md:p-12">
          <div className="mb-6">
            <Link href="/">
              <img
                src="/logo.png"
                alt="Adarsh High School"
                className="h-20 mx-auto"
              />
            </Link>
          </div>

          <div className="flex justify-center mb-4">
            <div className="bg-orange-50 rounded-full p-4">
              <ShieldAlert className="w-10 h-10 text-[#FF9933]" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            You don&apos;t have permission to access this page. If you believe
            this is a mistake, please contact the school administration.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/admin"
              className="inline-flex items-center justify-center gap-2 bg-[#1B3A5C] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#152d4a] transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#FF9933] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#e8892e] transition-colors"
            >
              <Home className="w-4 h-4" />
              Go to Homepage
            </Link>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Adarsh High School, Sainkheda, MP
        </p>
      </div>
    </div>
  );
}
