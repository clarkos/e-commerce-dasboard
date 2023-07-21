import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { 
      name, 
      images,
      price, 
      sizeId, 
      colorId, 
      categoryId, 
      isFeatured, 
      isArchived 
    } = body;

    if (!userId) {
      new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      new NextResponse("Name is required", { status: 400 });
    }
    
    if (!images || !images.length) {
      new NextResponse("images are required", { status: 400 });
    }
    
    if (!price) {
      new NextResponse("price is required", { status: 400 });
    }
    
    if (!sizeId) {
      new NextResponse("size Id is required", { status: 400 });
    }
    
    if (!colorId) {
      new NextResponse("color Id is required", { status: 400 });
    }
    
    if (!categoryId) {
      new NextResponse("category Id is required", { status: 400 });
    }
    
    if (!params.storeId) {
      new NextResponse("Store ID is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId!,
      },
    });

    if (!storeByUserId) {
      new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        sizeId,
        colorId,
        categoryId,
        isFeatured,
        isArchived,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string}) => image )
            ]
          }
        }
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId) {
      new NextResponse("Store ID is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
