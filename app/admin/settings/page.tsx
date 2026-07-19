"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Save,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  X,
  School,
  MapPin,
  Phone,
  Mail,
  User,
  Globe,
  CalendarDays,
  BadgeCheck,
  AlertCircle,
} from "lucide-react";

interface AcademicSession {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  isActive: boolean;
}

interface SchoolSettings {
  schoolName: string;
  address: string;
  phoneNumbers: string;
  email: string;
  principalName: string;
  city: string;
  pincode: string;
}

const DEFAULT_SETTINGS: SchoolSettings = {
  schoolName: "Adarsh High School",
  address: "Gadarwara Road, Sainkheda",
  phoneNumbers: "9893652202, 9993606232, 9993794981",
  email: "adresh2111@gmail.com",
  principalName: "",
  city: "Sainkheda",
  pincode: "484661",
};

export default function SettingsPage() {
  const [sessions, setSessions] = useState<AcademicSession[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);

  const [showSessionModal, setShowSessionModal] = useState(false);
  const [newSession, setNewSession] = useState({
    name: "",
    startYear: new Date().getFullYear(),
    endYear: new Date().getFullYear() + 1,
  });
  const [savingSession, setSavingSession] = useState(false);
  const [deletingSessionId, setDeletingSessionId] = useState<string | null>(
    null
  );

  const [settings, setSettings] = useState<SchoolSettings>(DEFAULT_SETTINGS);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    fetchSessions();
    fetchSettings();
  }, []);

  async function fetchSessions() {
    setSessionsLoading(true);
    try {
      const res = await fetch("/api/sessions");
      if (res.ok) {
        const d = await res.json();
        setSessions(d.sessions || []);
      }
    } catch {
      /* silent */
    } finally {
      setSessionsLoading(false);
    }
  }

  async function fetchSettings() {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const d = await res.json();
        if (d.settings) {
          setSettings({
            schoolName: d.settings.schoolName || DEFAULT_SETTINGS.schoolName,
            address: d.settings.address || DEFAULT_SETTINGS.address,
            phoneNumbers:
              d.settings.phoneNumbers || DEFAULT_SETTINGS.phoneNumbers,
            email: d.settings.email || DEFAULT_SETTINGS.email,
            principalName:
              d.settings.principalName || DEFAULT_SETTINGS.principalName,
            city: d.settings.city || DEFAULT_SETTINGS.city,
            pincode: d.settings.pincode || DEFAULT_SETTINGS.pincode,
          });
        }
      }
    } catch {
      /* silent */
    }
  }

  async function handleCreateSession() {
    setSavingSession(true);
    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSession),
      });
      if (res.ok) {
        fetchSessions();
        setShowSessionModal(false);
        setNewSession({
          name: "",
          startYear: new Date().getFullYear(),
          endYear: new Date().getFullYear() + 1,
        });
      }
    } catch {
      /* silent */
    } finally {
      setSavingSession(false);
    }
  }

  async function handleSetActive(id: string) {
    try {
      const res = await fetch("/api/sessions/active", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchSessions();
    } catch {
      /* silent */
    }
  }

  async function handleDeleteSession(id: string) {
    setDeletingSessionId(id);
    try {
      const res = await fetch(`/api/sessions/${id}`, { method: "DELETE" });
      if (res.ok) fetchSessions();
    } catch {
      /* silent */
    } finally {
      setDeletingSessionId(null);
    }
  }

  async function handleSaveSettings() {
    setSavingSettings(true);
    setSettingsSaved(false);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSettingsSaved(true);
        setTimeout(() => setSettingsSaved(false), 3000);
      }
    } catch {
      /* silent */
    } finally {
      setSavingSettings(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#1B3A5C] rounded-lg p-2">
          <Settings className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Manage academic sessions and school information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Academic Sessions */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-[#1B3A5C]" />
              <h2 className="font-semibold text-gray-900">Academic Sessions</h2>
            </div>
            <button
              onClick={() => setShowSessionModal(true)}
              className="inline-flex items-center gap-1.5 bg-[#FF9933] text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[#e8892e] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Session
            </button>
          </div>
          <div className="p-5">
            {sessionsLoading ? (
              <div className="p-8 text-center">
                <Loader2 className="w-6 h-6 border-2 border-[#1B3A5C] border-t-transparent animate-spin mx-auto" />
              </div>
            ) : sessions.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                No sessions found. Add one to get started.
              </div>
            ) : (
              <div className="space-y-3">
                {sessions.map((s) => (
                  <div
                    key={s.id}
                    className={`border rounded-lg p-4 flex items-center justify-between ${
                      s.isActive
                        ? "border-emerald-300 bg-emerald-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 text-sm">
                          {s.name}
                        </span>
                        {s.isActive && (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                            <BadgeCheck className="w-3 h-3" />
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {s.startYear} – {s.endYear}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!s.isActive && (
                        <button
                          onClick={() => handleSetActive(s.id)}
                          className="text-sm text-[#1B3A5C] hover:bg-[#1B3A5C]/10 px-3 py-1.5 rounded-lg transition-colors font-medium"
                        >
                          Set Active
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteSession(s.id)}
                        disabled={deletingSessionId === s.id}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deletingSessionId === s.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* School Information */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <School className="w-5 h-5 text-[#1B3A5C]" />
              <h2 className="font-semibold text-gray-900">School Information</h2>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                <School className="w-3.5 h-3.5 text-gray-400" />
                School Name
              </label>
              <input
                type="text"
                value={settings.schoolName}
                onChange={(e) =>
                  setSettings((p) => ({ ...p, schoolName: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                Address
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) =>
                  setSettings((p) => ({ ...p, address: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                  <Globe className="w-3.5 h-3.5 text-gray-400" />
                  City
                </label>
                <input
                  type="text"
                  value={settings.city}
                  onChange={(e) =>
                    setSettings((p) => ({ ...p, city: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  Pincode
                </label>
                <input
                  type="text"
                  value={settings.pincode}
                  onChange={(e) =>
                    setSettings((p) => ({ ...p, pincode: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                />
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                Phone Numbers (comma separated)
              </label>
              <input
                type="text"
                value={settings.phoneNumbers}
                onChange={(e) =>
                  setSettings((p) => ({ ...p, phoneNumbers: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings((p) => ({ ...p, email: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                <User className="w-3.5 h-3.5 text-gray-400" />
                Principal Name
              </label>
              <input
                type="text"
                value={settings.principalName}
                onChange={(e) =>
                  setSettings((p) => ({ ...p, principalName: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
              />
            </div>
            <div className="pt-2">
              <button
                onClick={handleSaveSettings}
                disabled={savingSettings}
                className="inline-flex items-center gap-2 bg-[#1B3A5C] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#152d4a] transition-colors disabled:opacity-50"
              >
                {savingSettings ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : settingsSaved ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {settingsSaved ? "Saved!" : "Save Settings"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Session Modal */}
      {showSessionModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Add Academic Session
              </h3>
              <button
                onClick={() => setShowSessionModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session Name
                </label>
                <input
                  type="text"
                  value={newSession.name}
                  onChange={(e) =>
                    setNewSession((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="e.g. 2026-2027"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Year
                  </label>
                  <input
                    type="number"
                    value={newSession.startYear}
                    onChange={(e) =>
                      setNewSession((p) => ({
                        ...p,
                        startYear: Number(e.target.value),
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Year
                  </label>
                  <input
                    type="number"
                    value={newSession.endYear}
                    onChange={(e) =>
                      setNewSession((p) => ({
                        ...p,
                        endYear: Number(e.target.value),
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={() => setShowSessionModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSession}
                disabled={!newSession.name || savingSession}
                className="px-4 py-2 text-sm font-medium text-white bg-[#FF9933] hover:bg-[#e8892e] rounded-lg transition-colors disabled:opacity-50 inline-flex items-center gap-2"
              >
                {savingSession && <Loader2 className="w-4 h-4 animate-spin" />}
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
