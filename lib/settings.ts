import { prisma } from "./prisma";

export async function getSetting(key: string): Promise<string | null> {
  const setting = await prisma.systemSetting.findUnique({ where: { key } });
  return setting?.value ?? null;
}

export async function getAllSettings(): Promise<Record<string, string>> {
  const settings = await prisma.systemSetting.findMany();
  const map: Record<string, string> = {};
  for (const s of settings) map[s.key] = s.value;
  return map;
}

export async function setSetting(key: string, value: string) {
  await prisma.systemSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
}

export async function setSettings(entries: Record<string, string>) {
  for (const [key, value] of Object.entries(entries)) {
    await setSetting(key, value);
  }
}
