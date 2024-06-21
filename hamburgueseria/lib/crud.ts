"use server";

import { Burger, Category } from '@/prisma/generated/client';
import { Prisma } from '@/prisma/generated/client';
import { ProductService } from '@/prisma/services/productService';
import { BurgerDataForm, PromoDataForm } from './definitions';
import { revalidatePath } from 'next/cache';




const productService = new ProductService();

export async function fetchBurgerById(id: number) {
  return await productService.getBurgerById(id);
}

export async function fetchPromoById(id: number) {
  return await productService.getPromoById(id);
}

export async function fetchAllBurgers() {
  return await productService.getAllBurgers();
}

export async function fetchAllPromos() {
  return await productService.getAllPromos();
}

export async function createBurger(form: FormData) {
  const burger: BurgerDataForm = {
    name: form.get('name') as string,
    description: form.get('description') as string,
    category: form.get('category') as Category,
    stock: Number(form.get('stock')),
    price: Number(form.get('price')),
  };
  return await productService.createBurger(burger);
}


export async function updateBurger(id: number, data: FormData) {
  const burger: BurgerDataForm = {
    name: data.get('name') as string,
    description: data.get('description') as string,
    category: data.get('category') as Category,
    stock: Number(data.get('stock')),
    price: Number(data.get('price')),
  };
  return await productService.updateBurger(id, burger);
}


export async function deleteBurger(id: number) {
  return await productService.deleteBurger(id);
}

export async function createPromo(form: FormData) {

  console.log(form.get('burgers'));

  const promo: PromoDataForm = {
    name: form.get('name') as string,
    description: form.get('description') as string,
    price: Number(form.get('price')),
    category: Category.PROMO,
    burgers: JSON.parse(form.get('burgers') as string).map((b: any) => ({
      burger: Number(b.burger),
      quantity: Number(b.quantity),
      newPrice: Number(b.newPrice)
    }))
  };

  return await productService.createPromo(promo);
}



export async function updatePromo(id: number, data: FormData) {
  const promo: Prisma.PromoUpdateInput = {
    name: data.get('name') as string,
    description: data.get('description') as string,
    price: Number(data.get('price')),
  };
  const burgers = JSON.parse(data.get('burgers') as string).map((b: any) => ({
    burgerId: Number(b.burger.burgerId),
    quantity: Number(b.quantity),
    newPrice: Number(b.newPrice)
  })
  );

  return await productService.updatePromo(id, promo, burgers);
}


export async function deletePromo(id: number) {
  revalidatePath('/admin/promos');
  return await productService.deletePromo(id);
}


export async function fetchAllExtras() {
  return await productService.getAllExtras();
} 

export async function updateExtra(id:number,data:Prisma.ExtraUpdateInput) {
  const extra= await productService.updateExtra(id,data);
  revalidatePath('/admin/extras');
  return extra;
}

export async function deleteExtra(id:number) {
  await productService.deleteExtra(id);
  revalidatePath('/admin/extras');
}

export async function createExtra(data:Prisma.ExtraCreateInput) {
  const extra = await productService.createExtra(data);
  revalidatePath('/admin/extras');
  return extra;
}

export async function fetchExtraById(id:number) {
  return await productService.getExtraById(id);
}