import { ProductService } from "@/prisma/services/productService";
import { NextRequest, NextResponse } from "next/server";
const productService = new ProductService();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const productId = searchParams.get("productId");
  if (productId) {
    {
      const burger = await productService.getBurgerById(Number(productId));
      return NextResponse.json({
        status: 200,
        body: burger,
      });
    }
  } else {
    const burgers = await productService.getAllBurgers();
    return NextResponse.json({
      status: 200,
      body: burgers,
    });
  }
}
