"use client";

export default function AdminEventsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Events</h1>
          <p className="text-gray-500 text-sm mt-1">
            Create and manage school events
          </p>
        </div>
        <button
          disabled
          className="bg-[#FF9933] text-white px-4 py-2 rounded-lg text-sm font-medium opacity-50 cursor-not-allowed"
          title="Coming soon"
        >
          Add Event
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Event Management</h3>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          This section will allow you to add, edit, and delete school events. Feature coming soon.
        </p>
      </div>
    </div>
  );
}
