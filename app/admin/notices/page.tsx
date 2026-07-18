"use client";

export default function AdminNoticesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Notices</h1>
          <p className="text-gray-500 text-sm mt-1">
            Create and manage school notices
          </p>
        </div>
        <button
          disabled
          className="bg-[#FF9933] text-white px-4 py-2 rounded-lg text-sm font-medium opacity-50 cursor-not-allowed"
          title="Coming soon"
        >
          Add Notice
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Notice Management</h3>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          This section will allow you to add, edit, and delete school notices. Feature coming soon.
        </p>
      </div>
    </div>
  );
}
