import { z } from "zod";
import { formatNumberWithDecimals } from "./utils";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimals(Number(value))),
    "Price must have exactly 2 decimal places"
  );

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
  price: currency,
});

// schema for signing users in
export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// schema for signing users up
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters").max(255),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// cart schemas
export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  qty: z.number().int().nonnegative("Qunatity must be a positive number"),
  image: z.string().min(1, "Image is required"),
  price: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, "Session cart id is required"),
  userId: z.string().optional().nullable(),
});
