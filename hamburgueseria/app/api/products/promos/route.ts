import { ProductService } from '@/prisma/services/productService';
import { NextRequest, NextResponse } from "next/server";
const productService = new ProductService();



export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const productId = searchParams.get('productId');
    if (productId) {
        {
            const promos = await productService.getPromoById(Number(productId));
            if (!promos) {
                return NextResponse.json({
                    status: 404,
                    body: {
                        message: 'Promo not found'
                    }
                });
            }
            return NextResponse.json({
                status: 200,
                body: promos
            });
        }
        
    } else {
        const promos = await productService.getAllPromos();
        if (!promos) {
            return NextResponse.json({
                status: 404,
                body: {
                    message: 'Promos not found'
                }
            });
        }
        return NextResponse.json({
            status: 200,
            body: promos
        });
    }
}

