import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedNotices = [
  {
    title: "Admissions Open for Session 2026-27",
    description:
      "Applications are now open for Nursery to Class 9 for the upcoming academic session. Visit the school office or contact us for more details.",
    category: "Admissions",
  },
  {
    title: "Parent-Teacher Meeting",
    description:
      "The first Parent-Teacher Meeting of the session will be held in the school auditorium. Parents are requested to attend and discuss their child's progress.",
    category: "Academic",
  },
  {
    title: "Winter Break Notice",
    description:
      "School will remain closed for winter break from 25 December to 5 January. Regular classes will resume on 6 January.",
    category: "Holiday",
  },
  {
    title: "Half-Yearly Examination Schedule",
    description:
      "Half-yearly examinations for Classes I-X will begin from 1 October. Detailed schedule has been shared with students in class.",
    category: "Examination",
  },
  {
    title: "Annual Sports Day",
    description:
      "Annual Sports Day will be held on 20 November. Students participating in events should report to their class teachers for practice schedules.",
    category: "Events",
  },
  {
    title: "Republic Day Celebration",
    description:
      "Republic Day will be celebrated in the school premises on 26 January. All students are expected to attend in formal uniform.",
    category: "Events",
  },
];

async function main() {
  console.log("Seeding notices...");

  for (const notice of seedNotices) {
    await prisma.notice.create({ data: notice });
  }

  console.log(`Seeded ${seedNotices.length} notices`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
