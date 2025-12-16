import { Prisma } from "@/generated/prisma/client";
import { prisma } from "./prisma";

interface GetProductsFromDbProps {
  take: number;
  skip: number;
}

export const getAllProductsFromDB = async (
  where: Prisma.ProductWhereInput,
  params: GetProductsFromDbProps
) => {
  try {
    return await prisma.product.findMany({
      where,
      include: {
        tags: { include: { tag: true } },
        variants: true,
        category: true,
      },
      take: params.take,
      skip: params.skip,
    });
  } catch {
    throw new Error("Failed to fetch products");
  }
};

export const getProductsCountFromDB = async (
  where: Prisma.ProductWhereInput
) => {
  try {
    return await prisma.product.count({ where });
  } catch {
    throw new Error("Failed to count products");
  }
};
