// 使用动态导入来避开 Turbopack 的兼容性问题
let prisma: any;

async function getPrisma() {
  if (!prisma) {
    const { PrismaClient } = await import('@prisma/client');
    prisma = new PrismaClient();
  }
  return prisma;
}

export default getPrisma;