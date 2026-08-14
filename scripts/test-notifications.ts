/**
 * Notification System Smoke Test
 *
 * Exercises the notification service against the configured database
 * (local dev DB unless schoolwebsite_DATABASE_URL/DATABASE_URL is overridden).
 *
 * Run:  npx tsx scripts/test-notifications.ts
 *
 * The test creates temporary records and removes them afterwards.
 * It never resets the database or deletes production data.
 */

import { prisma } from "../lib/prisma";
import {
  createNotifications,
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  sendContentNotification,
  sendHomeworkNotification,
} from "../lib/notifications";

let passed = 0;
let failed = 0;

function assert(condition: boolean, label: string) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${label}`);
  } else {
    failed++;
    console.error(`  ✗ ${label}`);
  }
}

async function main() {
  const stamp = Date.now().toString().slice(-8);
  const className = `Test${stamp}`;
  const sectionName = `T${stamp.slice(0, 4)}`;
  const subjectName = `TestSubject${stamp}`;
  const otherClass = `TestOther${stamp}`;
  const otherSection = `TO${stamp.slice(0, 4)}`;

  let classA: { id: string } | undefined;
  let sectionA: { id: string } | undefined;
  let classB: { id: string } | undefined;
  let sectionB: { id: string } | undefined;
  let subject: { id: string } | undefined;
  let teacher: { id: string; teacherName: string } | undefined;
  let studentA: { id: string } | undefined;
  let studentB: { id: string } | undefined;
  let studentC: { id: string } | undefined;
  let parentA: { id: string } | undefined;
  let parentB: { id: string } | undefined;
  let parentC: { id: string } | undefined;

  try {
    console.log("Seeding test records...");

    classA = await prisma.schoolClass.create({ data: { className } });
    sectionA = await prisma.section.create({ data: { sectionName } });
    classB = await prisma.schoolClass.create({ data: { className: otherClass } });
    sectionB = await prisma.section.create({ data: { sectionName: otherSection } });
    subject = await prisma.subject.create({
      data: { subjectName, subjectCode: `TS${stamp}` },
    });
    teacher = await prisma.teacher.create({
      data: {
        employeeId: `EMP${stamp}`,
        teacherName: `Test Teacher ${stamp}`,
        email: `teacher${stamp}@test.local`,
        phone: `90000${stamp.slice(0, 5)}`,
        subject: subjectName,
        joiningDate: new Date("2020-01-01"),
        qualification: "M.Sc.",
        address: "Test",
      },
    });

    const studentData = {
      admissionNumber: "",
      studentName: "",
      fatherName: "Test Father",
      motherName: "Test Mother",
      mobileNumber: "",
      address: "Test Address",
      dateOfBirth: new Date("2010-01-01"),
      admissionDate: new Date("2021-04-01"),
      status: "Active",
    };

    studentA = await prisma.student.create({
      data: {
        ...studentData,
        admissionNumber: `ADM${stamp}A`,
        studentName: `Student A ${stamp}`,
        mobileNumber: `91000${stamp.slice(0, 5)}`,
        className,
        section: sectionName,
      },
    });
    studentB = await prisma.student.create({
      data: {
        ...studentData,
        admissionNumber: `ADM${stamp}B`,
        studentName: `Student B ${stamp}`,
        mobileNumber: `91100${stamp.slice(0, 5)}`,
        className,
        section: sectionName,
      },
    });
    studentC = await prisma.student.create({
      data: {
        ...studentData,
        admissionNumber: `ADM${stamp}C`,
        studentName: `Student C ${stamp}`,
        mobileNumber: `91200${stamp.slice(0, 5)}`,
        className: otherClass,
        section: otherSection,
      },
    });

    parentA = await prisma.parent.create({
      data: {
        fatherName: `Parent A ${stamp}`,
        motherName: `Mother A ${stamp}`,
        mobileNumber: `91300${stamp.slice(0, 5)}`,
        password: "test-hash",
        studentId: studentA.id,
      },
    });
    parentB = await prisma.parent.create({
      data: {
        fatherName: `Parent B ${stamp}`,
        motherName: `Mother B ${stamp}`,
        mobileNumber: `91400${stamp.slice(0, 5)}`,
        password: "test-hash",
        studentId: studentB.id,
      },
    });
    parentC = await prisma.parent.create({
      data: {
        fatherName: `Parent C ${stamp}`,
        motherName: `Mother C ${stamp}`,
        mobileNumber: `91500${stamp.slice(0, 5)}`,
        password: "test-hash",
        studentId: studentC.id,
      },
    });

    console.log("Seeded. Running notification tests...\n");

    // --- 1. Bulk create + list + unread count ---
    console.log("Bulk create / list / unread count");
    const created = await createNotifications([
      {
        type: "NOTICE",
        title: "Test Notice",
        message: "A test notice",
        parentId: parentA.id,
        sentBy: "Test Admin",
      },
      {
        type: "NOTICE",
        title: "Test Notice",
        message: "A test notice",
        parentId: parentB.id,
        sentBy: "Test Admin",
      },
    ]);
    assert(created === 2, "createNotifications bulk-created 2 rows in one call");

    const listA = await getNotifications({ parentId: parentA.id });
    assert(listA.length === 1, "parent A sees only its own notification");
    const listB = await getNotifications({ parentId: parentB.id });
    assert(listB.length === 1, "parent B sees only its own notification");

    const unreadA = await getUnreadCount({ parentId: parentA.id });
    assert(unreadA === 1, "parent A has 1 unread");

    // --- 2. Data isolation on mark-as-read ---
    console.log("Data isolation");
    const wrongOwner = await markAsRead(listA[0].id, { parentId: parentB.id });
    assert(wrongOwner === false, "parent B cannot mark parent A's notification read");
    const stillUnread = await getUnreadCount({ parentId: parentA.id });
    assert(stillUnread === 1, "notification stays unread after rejected attempt");

    const rightOwner = await markAsRead(listA[0].id, { parentId: parentA.id });
    assert(rightOwner === true, "parent A can mark its own notification read");
    const afterRead = await getUnreadCount({ parentId: parentA.id });
    assert(afterRead === 0, "unread count drops to 0 after read");

    // --- 3. Admin notice → parents + teachers ---
    console.log("Admin notice targeting (parents + teachers)");
    const sentNotice = await sendContentNotification({
      type: "NOTICE",
      title: "Official Notice",
      message: "Parent meeting on Friday",
      sentBy: "Admin (admin)",
      entityType: "NOTICE",
      entityId: "notice-test-1",
      audience: { notifyParents: true, notifyTeachers: true },
      parentIds: [parentA.id, parentB.id],
    });
    assert(sentNotice === 3, `notice delivered to 2 parents + 1 teacher (got ${sentNotice})`);

    const teacherNotifications = await getNotifications({ teacherId: teacher.id });
    assert(teacherNotifications.length === 1, "teacher received the notice notification");

    // --- 4. Homework → only relevant class/section parents ---
    console.log("Homework class/section targeting");
    const homeworkSent = await sendHomeworkNotification({
      title: "Homework: Chapter 5",
      message: "Solve exercises 1-10",
      sentBy: `${teacher.teacherName} (Teacher)`,
      entityId: "hw-test-1",
      className,
      sectionName,
      classId: classA.id,
      sectionId: sectionA.id,
    });
    assert(homeworkSent === 2, `homework delivered to 2 parents of class ${className}-${sectionName}`);

    const parentCNotifs = await getNotifications({ parentId: parentC.id });
    assert(
      parentCNotifs.every((n) => n.entityType !== "HOMEWORK"),
      "parent C (different class) received no homework notification"
    );

    // --- 5. Mark all read ---
    console.log("Mark all read");
    const before = await getUnreadCount({ parentId: parentB.id });
    const marked = await markAllAsRead({ parentId: parentB.id });
    assert(marked === before, "markAllAsRead cleared all of parent B's unread");
    const afterAll = await getUnreadCount({ parentId: parentB.id });
    assert(afterAll === 0, "parent B unread count is 0 after mark-all");

    console.log(`\n✅ ${passed} passed, ${failed} failed`);
  } catch (error) {
    console.error("Test error:", error);
    failed++;
    console.log(`\n❌ ${passed} passed, ${failed} failed`);
  } finally {
    console.log("Cleaning up test records...");

    const parentIds = [parentA?.id, parentB?.id, parentC?.id].filter((id): id is string => Boolean(id));
    const teacherIds = [teacher?.id].filter((id): id is string => Boolean(id));
    const studentIds = [studentA?.id, studentB?.id, studentC?.id].filter((id): id is string => Boolean(id));
    const sectionIds = [sectionA?.id, sectionB?.id].filter((id): id is string => Boolean(id));
    const classIds = [classA?.id, classB?.id].filter((id): id is string => Boolean(id));

    await prisma.notification.deleteMany({
      where: {
        OR: [
          ...(parentIds.length ? [{ parentId: { in: parentIds } }] : []),
          ...(teacherIds.length ? [{ teacherId: { in: teacherIds } }] : []),
        ],
      },
    }).catch(() => {});
    await prisma.parent.deleteMany({
      where: { id: { in: parentIds } },
    }).catch(() => {});
    await prisma.student.deleteMany({
      where: { id: { in: studentIds } },
    }).catch(() => {});
    await prisma.teacher.deleteMany({ where: { id: { in: teacherIds } } }).catch(() => {});
    await prisma.subject.deleteMany({ where: { id: { in: subject ? [subject.id] : [] } } }).catch(() => {});
    await prisma.section.deleteMany({ where: { id: { in: sectionIds } } }).catch(() => {});
    await prisma.schoolClass.deleteMany({ where: { id: { in: classIds } } }).catch(() => {});

    await prisma.$disconnect();
  }

  process.exit(failed > 0 ? 1 : 0);
}

main();
