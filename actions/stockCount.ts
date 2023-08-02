import prismadb from "@/lib/prismadb";

export default async function getstockCount(storeId: string) {
  const stockCount = await prismadb.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return stockCount;
}