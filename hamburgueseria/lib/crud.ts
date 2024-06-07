"use server";

import { Burger, Category } from '@/prisma/generated/client';
import { Prisma } from '@/prisma/generated/client';
import { ProductService } from '@/prisma/services/productService';

interface BurgerData {
  name: string;
  imageUrl: string;
  description: string;
  category: string;
  stock: number;
  price: number;
}


const productService = new ProductService();

export async function fetchBurgerById(id: number) {
  return await productService.getBurgerById(id);
}

export async function fetchPromoById(id: number) {
  return await productService.getPromoById(id);
}

export async function createBurger(form: FormData) {
  const burger:BurgerData = {
    name: form.get('name') as string,
    description: form.get('description') as string,
    category: form.get('category') as Category,
    stock: Number(form.get('stock')),
    price: Number(form.get('price')),
    imageUrl: form.get('imageUrl') as string,
  };
  return await productService.createBurger(burger);
}