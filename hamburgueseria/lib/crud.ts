"use server";

import { Burger, Category } from '@/prisma/generated/client';
import { Prisma } from '@/prisma/generated/client';
import { ProductService } from '@/prisma/services/productService';
import { BurgerDataForm } from './definitions';




const productService = new ProductService();

export async function fetchBurgerById(id: number) {
  return await productService.getBurgerById(id);
}

export async function fetchPromoById(id: number) {
  return await productService.getPromoById(id);
}

export async function createBurger(form: FormData) {
  const burger:BurgerDataForm = {
    name: form.get('name') as string,
    description: form.get('description') as string,
    category: form.get('category') as Category,
    stock: Number(form.get('stock')),
    price: Number(form.get('price')),
  };
  return await productService.createBurger(burger);
}


export async function updateBurger(id:number,data:FormData) {
  const burger:BurgerDataForm = {
    name: data.get('name') as string,
    description: data.get('description') as string,
    category: data.get('category') as Category,
    stock: Number(data.get('stock')),
    price: Number(data.get('price')),
  };
  return await productService.updateBurger(id,burger);
}


export async function deleteBurger(id:number) {
  return await productService.deleteBurger(id);
}