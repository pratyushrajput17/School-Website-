"use client";

export default function AdminGalleryPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Gallery</h1>
          <p className="text-gray-500 text-sm mt-1">
            Upload and manage gallery images
          </p>
        </div>
        <button
          disabled
          className="bg-[#FF9933] text-white px-4 py-2 rounded-lg text-sm font-medium opacity-50 cursor-not-allowed"
          title="Coming soon"
        >
          Add Image
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Gallery Management</h3>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          This section will allow you to upload and manage gallery images. Feature coming soon.
        </p>
      </div>
    </div>
  );
}
