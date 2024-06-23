import { ProductService } from "@/prisma/services/productService";
import { NextRequest, NextResponse } from "next/server";
const productService = new ProductService();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const productId = searchParams.get("productId");
  if (productId) {
    {
      const burger = await productService.getBurgerById(Number(productId));
      if (!burger) {
        return NextResponse.json({
          status: 404,
          body: {
            message: "Burger not found",
          },
        });
      }
      return NextResponse.json({
        status: 200,
        body: burger,
      });
    }
  } else {
    const burgers = await productService.getAllBurgers();
    if (!burgers) {
      return NextResponse.json({
        status: 404,
        body: {
          message: "Burgers not found",
        },
      });
    }
    return NextResponse.json({
      status: 200,
      body: burgers,
    });
  }
}
