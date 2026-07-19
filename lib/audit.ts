import { prisma } from "./prisma";

export async function createAuditLog(data: {
  action: string;
  entity: string;
  entityId?: string;
  adminId?: string;
  adminName?: string;
  details?: string;
  ipAddress?: string;
}) {
  await prisma.auditLog.create({ data });
}

export async function getAuditLogs(options?: {
  entity?: string;
  action?: string;
  limit?: number;
  offset?: number;
}) {
  const where: Record<string, unknown> = {};
  if (options?.entity) where.entity = options.entity;
  if (options?.action) where.action = options.action;

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: options?.limit ?? 100,
      skip: options?.offset ?? 0,
    }),
    prisma.auditLog.count({ where }),
  ]);

  return {
    logs: logs.map((l) => ({ ...l, createdAt: l.createdAt.toISOString() })),
    total,
  };
}

export async function getAuditStats() {
  const [total, byEntity] = await Promise.all([
    prisma.auditLog.count(),
    prisma.auditLog.groupBy({ by: ["entity"], _count: true, orderBy: { _count: { entity: "desc" } } }),
  ]);
  return { total, byEntity: byEntity.map((e) => ({ entity: e.entity, count: e._count })) };
}

export async function clearAuditLogs() {
  await prisma.auditLog.deleteMany({});
}
