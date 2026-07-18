"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, Trash2, X, UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";

interface SchoolClass {
  id: string;
  className: string;
}

interface Section {
  id: string;
  sectionName: string;
}

interface Teacher {
  id: string;
  teacherName: string;
}

interface ClassTeacher {
  id: string;
  classId: string;
  sectionId: string;
  teacherId: string;
  class: { className: string };
  section: { sectionName: string };
  teacher: { teacherName: string };
}

export default function ClassTeachersPage() {
  const router = useRouter();
  const [assignments, setAssignments] = useState<ClassTeacher[]>([]);
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const fetchAll = useCallback(async () => {
    try {
      const [aRes, cRes, sRes, tRes] = await Promise.all([
        fetch("/api/class-teachers"),
        fetch("/api/classes"),
        fetch("/api/sections"),
        fetch("/api/teachers"),
      ]);
      if (!aRes.ok || !cRes.ok) { router.push("/login"); return; }
      const aData = await aRes.json();
      const cData = await cRes.json();
      const sData = await sRes.json();
      const tData = await tRes.json();
      setAssignments(aData.assignments || []);
      setClasses(cData.classes || []);
      setSections(sData.sections || []);
      setTeachers(tData.teachers || []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!classId || !sectionId || !teacherId) {
      setError("Please select all fields");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/class-teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classId, sectionId, teacherId }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create assignment");
        return;
      }
      setClassId("");
      setSectionId("");
      setTeacherId("");
      fetchAll();
    } catch {
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/class-teachers/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAssignments((prev) => prev.filter((a) => a.id !== id));
      }
    } catch {
      // silent
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Class Teachers</h1>
        <p className="text-gray-500 text-sm mt-1">Assign teachers as class teachers to class-section combinations</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">New Assignment</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <select value={classId} onChange={(e) => setClassId(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white">
              <option value="">Select Class</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>{c.className}</option>
              ))}
            </select>
            <select value={sectionId} onChange={(e) => setSectionId(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white">
              <option value="">Select Section</option>
              {sections.map((s) => (
                <option key={s.id} value={s.id}>{s.sectionName}</option>
              ))}
            </select>
            <select value={teacherId} onChange={(e) => setTeacherId(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent appearance-none bg-white">
              <option value="">Select Teacher</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>{t.teacherName}</option>
              ))}
            </select>
            <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 bg-[#FF9933] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e8892e] transition-colors disabled:opacity-50">
              {saving ? "Saving..." : "Assign"}
            </button>
          </form>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#1B3A5C]" />
          </div>
        ) : assignments.length === 0 ? (
          <div className="text-center py-12">
            <UserCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No class teachers assigned</h3>
            <p className="text-gray-500 text-sm">Use the form above to assign a class teacher.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Class</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Section</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Teacher</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {assignments.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Class {a.class.className}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Section {a.section.sectionName}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{a.teacher.teacherName}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => setDeleteId(a.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Remove Class Teacher</h3>
              <button onClick={() => setDeleteId(null)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <p className="text-sm text-gray-600 mb-6">Are you sure? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} disabled={deleting} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50">
                {deleting ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
