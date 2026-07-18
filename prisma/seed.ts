import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL environment variable is required");
  process.exit(1);
}
const adapter = new PrismaPg({ connectionString: url });
const prisma = new PrismaClient({ adapter });

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

const seedEvents = [
  {
    title: "Annual Day Celebration",
    description:
      "Students presented cultural performances, music, dance, and drama before parents and distinguished guests.",
    eventDate: new Date("2025-12-15"),
    category: "Annual Function",
  },
  {
    title: "Independence Day Celebration",
    description:
      "Students participated in the flag hoisting ceremony, sang patriotic songs, and presented speeches on the theme of freedom and national unity.",
    eventDate: new Date("2025-08-15"),
    category: "National Celebrations",
  },
  {
    title: "Republic Day Ceremony",
    description:
      "The school celebrated Republic Day with a flag hoisting ceremony, cultural program, and a speech on the Constitution and democratic values.",
    eventDate: new Date("2026-01-26"),
    category: "National Celebrations",
  },
  {
    title: "Annual Sports Meet",
    description:
      "Students competed in athletics, team games, and track events. The sports meet encouraged teamwork, fitness, and school spirit.",
    eventDate: new Date("2025-11-20"),
    category: "Sports Activities",
  },
  {
    title: "Cultural Fest",
    description:
      "Students showcased their talents in music, dance, drama, and traditional art forms.",
    eventDate: new Date("2025-10-10"),
    category: "Cultural Programs",
  },
  {
    title: "Science Exhibition",
    description:
      "Students presented working models and projects on scientific concepts.",
    eventDate: new Date("2025-02-28"),
    category: "Academic Activities",
  },
  {
    title: "Inter-Class Quiz Competition",
    description:
      "Students from different classes participated in a general knowledge and academic quiz.",
    eventDate: new Date("2025-09-05"),
    category: "Competitions",
  },
  {
    title: "Teachers' Day Celebration",
    description:
      "Students organised a special assembly to honour teachers.",
    eventDate: new Date("2025-09-05"),
    category: "General Events",
  },
];

async function main() {
  console.log("Seeding admin...");
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: "rajputpratyush33@gmail.com" },
  });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("Adarsh2111", 12);
    await prisma.admin.create({
      data: {
        name: "Super Admin",
        email: "rajputpratyush33@gmail.com",
        password: hashedPassword,
        role: "super_admin",
      },
    });
    console.log("Admin seeded successfully");
  } else {
    console.log("Admin already exists, skipping");
  }

  console.log("Seeding notices...");
  for (const notice of seedNotices) {
    await prisma.notice.create({ data: notice });
  }
  console.log(`Seeded ${seedNotices.length} notices`);

  console.log("Seeding events...");
  for (const event of seedEvents) {
    await prisma.event.create({ data: event });
  }
  console.log(`Seeded ${seedEvents.length} events`);

  console.log("Seeding gallery...");
  const galleryCount = await prisma.gallery.count();
  console.log(`Gallery has ${galleryCount} existing images (seed uploads via admin UI)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
