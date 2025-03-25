"use server";
import { PrismaClient } from "@prisma/client";

// Get latest products
export async function getLatestProducts() {
  const prisma = new PrismaClient();
  const products = await prisma.product.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
}
