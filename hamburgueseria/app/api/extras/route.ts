import { ProductService } from "@/prisma/services/productService";
import { NextRequest, NextResponse } from "next/server";

const productService = new ProductService();

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const burgerId = searchParams.get("burgerId");
    if (burgerId) {
      {
        const extras = await productService.getExtraByBurgerId(
          Number(burgerId)
        );
        return NextResponse.json({
          status: 200,
          body: extras,
        });
      }
    } else {
      const extras = await productService.getAllExtras();
      return NextResponse.json({
        status: 200,
        body: extras,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      body: error.message,
    });
  }
}
