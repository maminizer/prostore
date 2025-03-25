import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

async function main() {
  const prisma = new PrismaClient();

  for (const data of sampleData) {
    await prisma.post.create({
      data,
    });
  }
}

main();
