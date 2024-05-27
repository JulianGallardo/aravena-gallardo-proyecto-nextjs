import { NextApiRequest } from "next";
import { ProductService } from '../../../../prisma/services/productService';
import { Burger } from '../../../../prisma/generated/client';
import { NextResponse } from "next/server";
const productService = new ProductService();

const burgersPlaceholder: Burger[] = [
  {
    burgerId: 1,
    productId: 1,
    name: "Classic Burger",
    category: "SIMPLE",
    description: "A delicious classic beef burger",
    stock: 100,
    price: 9.99
  },
  {
    burgerId: 2,
    productId: 2,
    name: "Chicken Burger",
    category: "SIMPLE",
    description: "A tasty chicken burger",
    stock: 100,
    price: 8.99
  },
  {
    burgerId: 3,
    productId: 3,	
    name: "Veggie Burger",
    category: "SIMPLE",
    description: "A flavorful vegetarian burger",
    stock: 0,
    price: 7.99
  }
];

export async function GET(req: NextApiRequest) {
    if (req.query && req.query.productId) {
        const burger = await productService.getBurgerById(Number(req.query.productId));
        return NextResponse.json({
            status: 200,
            body: burger
        });
    } else {
        //const burgers = await productService.getAllBurgers();
        return NextResponse.json({
            status: 200,
            body: burgersPlaceholder
        });
    }
}

export async function POST(req: NextApiRequest) {
    const { data } = req.body;
    const newBurger = await productService.createBurger(data);
    return NextResponse.json({
        status: 201,
        body: newBurger
    });
}

export async function PUT(req: NextApiRequest) {
    const updatedBurger = await productService.updateBurger(Number(req.body.productId), req.body.data);
    return NextResponse.json({
        status: 200,
        body: updatedBurger
    });
  }

export async function DELETE(req: NextApiRequest) {
    await productService.deleteBurger(Number(req.body.productId));
    return NextResponse.json({
        status: 204,
        body: {}
    });
}

