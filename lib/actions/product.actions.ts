'use server';
import { prisma } from '@/db/prisma';
import { convertToPlainObject, formatError } from '../utils';
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from '../constants';
import { revalidatePath } from 'next/cache';
import {
  insertProductSchema,
  updateProductSchema,
  updateProductQuantitySchema,
} from '../validators';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

// Get latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  });

  return convertToPlainObject(data);
}

// Get single product by it's slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}

// Get single product by it's ID
export async function getProductById(productId: string) {
  const data = await prisma.product.findFirst({
    where: { id: productId },
  });

  return convertToPlainObject(data);
}

// Get all products
export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
  price,
  rating,
  sort,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
  price?: string;
  rating?: string;
  sort?: string;
}) {
  // Query filter
  const queryFilter: Prisma.ProductWhereInput =
    query && query !== 'all'
      ? {
          name: {
            contains: query,
            mode: 'insensitive',
          } as Prisma.StringFilter,
        }
      : {};

  // Category filter
  const categoryFilter = category && category !== 'all' ? { category } : {};

  // Price filter
  const priceFilter: Prisma.ProductWhereInput =
    price && price !== 'all'
      ? {
          price: {
            gte: Number(price.split('-')[0]),
            lte: Number(price.split('-')[1]),
          },
        }
      : {};

  // Rating filter
  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            gte: Number(rating),
          },
        }
      : {};

  const data = await prisma.product.findMany({
    where: {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    },
    orderBy:
      sort === 'lowest'
        ? { price: 'asc' }
        : sort === 'highest'
          ? { price: 'desc' }
          : sort === 'rating'
            ? { rating: 'desc' }
            : { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });

  const dataCount = await prisma.product.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

// Delete a product
export async function deleteProduct(id: string) {
  try {
    const productExists = await prisma.product.findFirst({
      where: { id },
    });

    if (!productExists) throw new Error('Product not found');

    await prisma.product.delete({ where: { id } });

    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Product deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Create a product
export async function createProduct(data: z.infer<typeof insertProductSchema>) {
  try {
    const product = insertProductSchema.parse(data);
    await prisma.product.create({ data: product });

    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Product created successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update a product
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    const product = updateProductSchema.parse(data);
    const productExists = await prisma.product.findFirst({
      where: { id: product.id },
    });

    if (!productExists) throw new Error('Product not found');

    await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Product updated successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Get all categories
export async function getAllCategories() {
  const data = await prisma.product.groupBy({
    by: ['category'],
    _count: true,
  });

  return data;
}

// Get featured products
export async function getFeaturedProducts() {
  const data = await prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: 'desc' },
    take: 4,
  });

  return convertToPlainObject(data);
}

// update the product stock  from PDF parsing
async function findProductBySimilarName(productName: string) {
  // First try exact match
  let product = await prisma.product.findFirst({
    where: {
      name: {
        equals: productName,
        mode: 'insensitive',
      },
    },
  });

  if (product) return product;

  // If no exact match, try partial match
  product = await prisma.product.findFirst({
    where: {
      name: {
        contains: productName,
        mode: 'insensitive',
      },
    },
  });

  if (product) return product;

  // Try matching individual words from the product name
  const words = productName.split(' ').filter((word) => word.length > 2);
  for (const word of words) {
    product = await prisma.product.findFirst({
      where: {
        name: {
          contains: word,
          mode: 'insensitive',
        },
      },
    });
    if (product) return product;
  }

  return null;
}

export async function updateProductQuantities(
  extractedProducts: Array<{ productName: string; quantity: number }>
) {
  const results = [];

  try {
    for (const extractedProduct of extractedProducts) {
      try {
        // 1. Find the product with name similar to the product in the returned object
        const existingProduct = await findProductBySimilarName(
          extractedProduct.productName
        );

        if (!existingProduct) {
          results.push({
            productName: extractedProduct.productName,
            success: false,
            message: `Product '${extractedProduct.productName}' not found in database`,
          });
          continue;
        }

        // 2. Get the current quantity (stock)
        const currentStock = existingProduct.stock || 0;

        // 3. Update the quantity to be the sum of the existing and the new one
        const newStock = currentStock + extractedProduct.quantity;

        // Validate the update data
        const updateData = updateProductQuantitySchema.parse({
          id: existingProduct.id,
          stock: newStock,
        });

        // Update the product
        await prisma.product.update({
          where: { id: updateData.id },
          data: { stock: updateData.stock },
        });

        results.push({
          productName: extractedProduct.productName,
          matchedProduct: existingProduct.name,
          previousStock: currentStock,
          addedQuantity: extractedProduct.quantity,
          newStock: newStock,
          success: true,
          message: `Successfully updated '${existingProduct.name}' stock from ${currentStock} to ${newStock}`,
        });
      } catch (error) {
        results.push({
          productName: extractedProduct.productName,
          success: false,
          message: `Error updating product: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
      }
    }

    // Revalidate the products page after all updates
    revalidatePath('/admin/products');

    const successCount = results.filter((r) => r.success).length;
    const totalCount = results.length;

    return {
      success: successCount > 0,
      message: `Updated ${successCount} out of ${totalCount} products successfully`,
      results: results,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to update product quantities: ${error instanceof Error ? error.message : 'Unknown error'}`,
      results: results,
    };
  }
}

// Function to be called from your invoice processing endpoint
export async function processInvoiceAndUpdateStock(
  extractedProducts: Array<{ productName: string; quantity: number }>
) {
  if (!extractedProducts || extractedProducts.length === 0) {
    return {
      success: false,
      message: 'No products found in invoice',
    };
  }

  return await updateProductQuantities(extractedProducts);
}
