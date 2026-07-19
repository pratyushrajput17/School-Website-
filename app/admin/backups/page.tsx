"use client";

import { useState } from "react";
import {
  Database,
  Download,
  Users,
  GraduationCap,
  ClipboardCheck,
  FileSpreadsheet,
  CheckCircle2,
  Loader2,
  Server,
  FileJson,
} from "lucide-react";

interface ExportCard {
  type: string;
  title: string;
  description: string;
  icon: React.ElementType;
  format: string;
}

const EXPORT_CARDS: ExportCard[] = [
  {
    type: "students",
    title: "Export Students",
    description: "Download all student records as a CSV file",
    icon: Users,
    format: "CSV",
  },
  {
    type: "teachers",
    title: "Export Teachers",
    description: "Download all teacher records as a CSV file",
    icon: GraduationCap,
    format: "CSV",
  },
  {
    type: "attendance",
    title: "Export Attendance",
    description: "Download attendance records as a CSV file",
    icon: ClipboardCheck,
    format: "CSV",
  },
  {
    type: "results",
    title: "Export Results",
    description: "Download exam results as a CSV file",
    icon: FileSpreadsheet,
    format: "CSV",
  },
  {
    type: "school-data",
    title: "Export Complete School Data",
    description: "Download all school data as a JSON file",
    icon: Server,
    format: "JSON",
  },
];

export default function BackupsPage() {
  const [exportingType, setExportingType] = useState<string | null>(null);
  const [lastExport, setLastExport] = useState<string | null>(null);

  function handleExport(type: string) {
    setExportingType(type);
    setTimeout(() => {
      window.open(`/api/backups?type=${type}`, "_blank");
      const card = EXPORT_CARDS.find((c) => c.type === type);
      setLastExport(
        `${card?.title || type} exported successfully at ${new Date().toLocaleTimeString("en-IN")}`
      );
      setExportingType(null);
    }, 300);
  }

  function handleExportAll() {
    setExportingType("all");
    setTimeout(() => {
      window.open("/api/backups?type=all", "_blank");
      setLastExport(
        `Complete school data exported successfully at ${new Date().toLocaleTimeString("en-IN")}`
      );
      setExportingType(null);
    }, 300);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#1B3A5C] rounded-lg p-2">
          <Database className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Database Backup</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Export and download school data
          </p>
        </div>
      </div>

      {/* Last Export Message */}
      {lastExport && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <p className="text-sm text-emerald-700 flex-1">{lastExport}</p>
          <button
            onClick={() => setLastExport(null)}
            className="text-emerald-600 hover:text-emerald-800 text-sm"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Export Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {EXPORT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.type}
              className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#1B3A5C]/10 rounded-lg p-3">
                  <Icon className="w-6 h-6 text-[#1B3A5C]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{card.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {card.description}
                  </p>
                </div>
              </div>
              <div className="mt-auto">
                <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded mb-3">
                  {card.format}
                </span>
                <button
                  onClick={() => handleExport(card.type)}
                  disabled={exportingType !== null}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#FF9933] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#e8892e] transition-colors disabled:opacity-50"
                >
                  {exportingType === card.type ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  Export
                </button>
              </div>
            </div>
          );
        })}

        {/* Complete Export Card */}
        <div className="bg-[#1B3A5C] rounded-xl p-6 flex flex-col text-white">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-white/20 rounded-lg p-3">
              <FileJson className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Export Everything</h3>
              <p className="text-sm text-white/70 mt-1">
                Download all school data in a single JSON file
              </p>
            </div>
          </div>
          <div className="mt-auto">
            <span className="inline-block bg-white/20 text-white text-xs font-medium px-2 py-1 rounded mb-3">
              JSON
            </span>
            <button
              onClick={handleExportAll}
              disabled={exportingType !== null}
              className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#1B3A5C] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {exportingType === "all" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Export Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
