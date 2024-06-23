import { ProductService } from "@/prisma/services/productService";
import { NextRequest, NextResponse } from "next/server";

const productService = new ProductService();

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const extraId = searchParams.get("extraId");
    if (extraId) {
      {
        const extras = await productService.getExtraById(
          Number(extraId)
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
