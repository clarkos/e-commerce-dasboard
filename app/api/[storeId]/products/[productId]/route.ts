import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      }
    })

    return NextResponse.json(product);

  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string, productId: string} }
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

    if (!params.productId) {
      new NextResponse("Product ID Id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId!
      }
    })

    if (!storeByUserId) {
      new NextResponse("Unauthorized", { status: 403 })
    }

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
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
          deleteMany: {}
        }
      }
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string}) => image )
            ]
          }
        }
      }
    })

    return NextResponse.json(product);

  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string, productId: string } }
) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId!
      }
    })

    if (!storeByUserId) {
      new NextResponse("Unauthorized", { status: 403 })
    }

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      }
    })

    return NextResponse.json(product);

  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

