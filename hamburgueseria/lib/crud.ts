"use server";

import { ProductService } from '@/prisma/services/productService';

const productService = new ProductService();

export async function fetchBurgerById(id: number) {
  return await productService.getBurgerById(id);
}

export async function fetchPromoById(id: number) {
  return await productService.getPromoById(id);
}