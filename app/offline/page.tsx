import Link from "next/link";
import type { Metadata } from "next";
import { WifiOff } from "lucide-react";

export const metadata: Metadata = {
  title: "Offline",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-saffron-light text-saffron-dark">
          <WifiOff className="h-7 w-7" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-deep-blue">You are offline</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Some public pages may be available from your device cache. School ERP features such as admin,
          teacher, parent, attendance, homework, and student records require an internet connection.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-deep-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-deep-blue-light"
        >
          Go to Homepage
        </Link>
      </div>
    </main>
  );
}
