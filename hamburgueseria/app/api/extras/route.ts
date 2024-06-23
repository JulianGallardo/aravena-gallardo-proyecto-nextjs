import { ProductService } from "@/prisma/services/productService";
import { NextRequest, NextResponse } from "next/server";

const productService = new ProductService();

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const extraId = searchParams.get("extraId");
    if (extraId) {
      {
        const extras = await productService.getExtraById(
          Number(extraId)
        );
        if (!extras) {
          return NextResponse.json({
            status: 404,
            body: { message: "Extra not found" },
          });
        }

        return NextResponse.json({
          status: 200,
          body: extras,
        });
      }
    } else {
      const extras = await productService.getAllExtras();
      
      if (!extras) {
        return NextResponse.json({
          status: 404,
          body: { message: "No extras found" },
        });
      }
      
      return NextResponse.json({
        status: 200,
        body: extras,
      });

    }
}
