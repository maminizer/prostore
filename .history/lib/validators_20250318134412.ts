import { z } from "zod";
import { formatNumberWithDecimals } from "./utils";


const currency = z
    .string()
    .refine(
      (value) =>
        /^\d+(\.\d{2})?$/.test(formatNumberWithDecimals(Number(value))),
      "Price must have exactly 2 decimal places"
    ),
// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(255),
  slug: z.string().min(3, "Slug must be at least 3 characters").max(255),
  category: z
    .string()
    .min(3, "Category must be at least 3 characters")
    .max(255),
  brand: z.string().min(3, "Brand must be at least 3 characters").max(255),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(255),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must be at least 1 image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: 
});
