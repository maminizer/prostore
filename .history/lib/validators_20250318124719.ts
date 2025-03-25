import { z } from "zod";

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(1).max(255),
});
