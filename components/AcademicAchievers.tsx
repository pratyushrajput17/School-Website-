import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { getAchievers } from "@/lib/achievers";

function formatSession(year: number) {
  return `${year}-${String(year + 1).slice(-2)}`;
}

function getGrade(percentage: number) {
  if (percentage >= 90) return { label: "A+", color: "text-emerald-600 bg-emerald-50" };
  if (percentage >= 75) return { label: "A", color: "text-blue-600 bg-blue-50" };
  if (percentage >= 60) return { label: "B+", color: "text-amber-600 bg-amber-50" };
  return { label: "B", color: "text-gray-600 bg-gray-50" };
}

export default async function AcademicAchievers() {
  const achievers = await getAchievers({
    limit: 3,
    publishedOnly: true,
  }).catch(() => []);

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">Academic Excellence</span>
          <h2 className="heading-xl mt-6">Academic Achievers</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our students strive for academic excellence through a well-structured curriculum and dedicated guidance.
          </p>
        </div>

        {achievers.length > 0 && (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {achievers.map((achiever) => {
              const grade = getGrade(achiever.percentage);
              return (
                <div
                  key={achiever.id}
                  className="group rounded-2xl border border-deep-blue/10 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/20 hover:shadow-md"
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-saffron-light overflow-hidden">
                    {achiever.photoUrl ? (
                      <img
                        src={achiever.photoUrl}
                        alt={achiever.studentName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <GraduationCap className="h-10 w-10 text-saffron-dark" />
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-deep-blue">
                    {achiever.studentName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Class {achiever.className}
                  </p>
                  {achiever.achievementTitle && (
                    <p className="mt-1 text-xs font-medium text-saffron">
                      {achiever.achievementTitle}
                    </p>
                  )}
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <span
                      className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${grade.color}`}
                    >
                      {grade.label}
                    </span>
                    <span className="text-lg font-bold text-saffron">
                      {achiever.percentage}%
                    </span>
                  </div>
                  {achiever.rank > 0 && (
                    <p className="mt-1 text-xs text-deep-blue font-semibold">
                      Rank #{achiever.rank}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-muted-foreground">
                    Session {formatSession(achiever.academicSession)}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/achievers"
            className="inline-flex items-center gap-2 rounded-full bg-deep-blue px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-deep-blue-light"
          >
            View All Achievers
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
