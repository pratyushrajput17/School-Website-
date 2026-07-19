import { prisma } from "./prisma";

export interface SessionData {
  name: string;
  startYear: number;
  endYear: number;
  isActive?: boolean;
}

export async function getSessions() {
  const sessions = await prisma.academicSession.findMany({ orderBy: { startYear: "desc" } });
  return sessions.map((s) => ({ ...s, createdAt: s.createdAt.toISOString(), updatedAt: s.updatedAt.toISOString() }));
}

export async function getActiveSession() {
  const session = await prisma.academicSession.findFirst({ where: { isActive: true } });
  if (!session) return null;
  return { ...session, createdAt: session.createdAt.toISOString(), updatedAt: session.updatedAt.toISOString() };
}

export async function createSession(data: SessionData) {
  const existingActive = await prisma.academicSession.findFirst({ where: { isActive: true } });
  const session = await prisma.academicSession.create({ data });
  if (!existingActive) {
    await prisma.academicSession.update({ where: { id: session.id }, data: { isActive: true } });
  }
  return { ...session, createdAt: session.createdAt.toISOString(), updatedAt: session.updatedAt.toISOString() };
}

export async function switchActiveSession(sessionId: string) {
  await prisma.academicSession.updateMany({ data: { isActive: false } });
  const session = await prisma.academicSession.update({ where: { id: sessionId }, data: { isActive: true } });
  return { ...session, createdAt: session.createdAt.toISOString(), updatedAt: session.updatedAt.toISOString() };
}

export async function deleteSession(id: string) {
  await prisma.academicSession.delete({ where: { id } });
}
