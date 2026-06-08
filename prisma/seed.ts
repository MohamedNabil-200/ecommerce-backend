import "dotenv/config";

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { readFile } from "fs/promises";
import { join } from "path";

import type { DbJsonData } from "../src/types/index.ts";
import { title } from "process";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const dbJsonPath = join(process.cwd(), "db.json");

  const fileContent = await readFile(dbJsonPath, "utf-8");

  const data: DbJsonData = JSON.parse(fileContent);

  if (!Array.isArray(data.categories)) {
    throw new Error("Invalid db.json: 'categories' must be an array");
  }

  if (!Array.isArray(data.products)) {
    throw new Error("Invalid db.json: 'products' must be an array");
  }

  for (const category of data.categories) {
    if (!category.title) {
      throw new Error("Category title is required");
    }

    if (!category.prefix) {
      throw new Error(`Category ${category.title} is missing prefix`);
    }

    if (!category.img) {
      throw new Error(`Category ${category.title} is missing img`);
    }
  }

  for (const product of data.products) {
    if (!product.title) {
      throw new Error("Product title is required");
    }

    if (typeof product.max !== "number") {
      throw new Error(`Product ${product.title} has an invalid stock`);
    }

    if (typeof product.price !== "number") {
      throw new Error(`Product ${product.title} has an invalid price`);
    }

    if (!product.cat_prefix) {
      throw new Error(`Missing Category for ${product.title}`);
    }

    if (!product.img) {
      throw new Error(`Product ${product.title} is missing img`);
    }
  }

  const categorySlugs = new Set(
    data.categories.map((category) => category.prefix),
  );

  for (const product of data.products) {
    if (!categorySlugs.has(product.cat_prefix)) {
      throw new Error(
        `Category '${product.cat_prefix}' not found for product '${product.title}'`,
      );
    }
  }

  const categoriesToCreate = data.categories.map((category) => ({
    name: category.title,
    slug: category.prefix,
    imageUrl: category.img,
  }));

  await prisma.$transaction(async (tx) => {
    await tx.product.deleteMany();

    await tx.category.deleteMany();

    await tx.category.createMany({
      data: categoriesToCreate,
    });

    const createdCategories = await tx.category.findMany();

    const categoryMap = new Map(
      createdCategories.map((category) => [category.slug, category.id]),
    );

    const categoriesCount = await tx.category.count();
    console.log(`inserted Categories: ${categoriesCount}`);

    const productsToCreate = data.products.map((product) => {
      const categoryId = categoryMap.get(product.cat_prefix);

      if (!categoryId) {
        throw new Error(`Category '${product.cat_prefix}' not found`);
      }

      return {
        title: product.title,
        price: product.price,
        stock: product.max,
        imageUrl: product.img,
        categoryId,
        isActive: true,
      };
    });

    await tx.product.createMany({
      data: productsToCreate,
    });

    const productsCount = await tx.product.count();
    console.log(`Inserted Products: ${productsCount}`);
  });
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
