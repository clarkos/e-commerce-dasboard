import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST( 
    req: Request,
    { params }: { params: { storeId: string }} 
  ) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;
    
    if ( !userId ) {
      new NextResponse("Unauthenticated", { status: 401 })
    };
    
    if ( !name ) {
      new NextResponse("Name is required", { status: 400 })
    };
    
    if ( !value ) {
      new NextResponse("Value is required", { status: 400 })
    };

    if ( !params.storeId ) {
      new NextResponse("Store ID is required", { status: 400 })
    };

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId!
      }
    })

    if (!storeByUserId) {
      new NextResponse("Unauthorized", { status: 403 })
    }
    
    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId
      }
    });
    return NextResponse.json(color);

  } catch (error) {
    console.log('[COLORS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET( 
  req: Request,
  { params }: { params: { storeId: string }} 
) {
try {
  
  if ( !params.storeId ) {
    new NextResponse("Store ID is required", { status: 400 })
  };

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId
    }
  });
  return NextResponse.json(colors);

} catch (error) {
  console.log('[COLORS_GET]', error);
  return new NextResponse("Internal error", { status: 500 });
}
}