import { ProductService } from '@/prisma/services/productService';
import { Burger } from '@/prisma/generated/client';
import { NextRequest, NextResponse } from "next/server";
const productService = new ProductService();



export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const productId = searchParams.get('productId');
    if (productId) {
        {
            const burger = await productService.getBurgerById(Number(productId));
            return NextResponse.json({
                status: 200,
                body: burger
            });
            //cambiar cuando usemos bdd
        }
        
    } else {
        const burgers = await productService.getAllBurgers();
        return NextResponse.json({
            status: 200,
            body: burgers
        });
    }
}
/*
export async function POST(req: NextRequest) {
    const data = req.text;
    const newBurger = await productService.createBurger(data);
    return NextResponse.json({
        status: 201,
        body: newBurger
    });
}

export async function PUT(req: NextRequest) {
    const updatedBurger = await productService.updateBurger(Number(req.body.productId), req.body.data);
    return NextResponse.json({
        status: 200,
        body: updatedBurger
    });
  }*/

export async function DELETE(req: NextRequest) {
    await productService.deleteBurger(Number(req.nextUrl.searchParams.get('productId')));
    return NextResponse.json({
        status: 204,
        body: {}
    });
}

