"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
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

          <h1 className="text-7xl font-bold text-[#1B3A5C] mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#1B3A5C] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#152d4a] transition-colors"
            >
              <Home className="w-4 h-4" />
              Go to Homepage
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 bg-[#FF9933] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#e8892e] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Adarsh High School, Sainkheda, MP
        </p>
      </div>
    </div>
  );
}
