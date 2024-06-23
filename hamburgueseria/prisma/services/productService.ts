
import { ProductRepository } from '../repositories/productRepository';
import { ExtraRepository } from '../repositories/extraRepository';
import { Prisma, Burger, Promo, Extra } from '@/prisma/generated/client';
import { BurgerDataForm, PromoDataForm, PromoExtendida } from '@/lib/definitions';


const productRepository = new ProductRepository();
const extraRepository = new ExtraRepository();

export class ProductService {
  async createBurger(data:BurgerDataForm ): Promise<Burger> {
    return productRepository.createBurger(data);
  }

  async createPromo(
    data:PromoDataForm
  ): Promise<Promo> {
    return productRepository.createPromo(data);
  }

  async getAllBurgers(): Promise<Burger[]> {
    return productRepository.findAllBurgers();
  }

  async getAllBurgersActive(): Promise<Burger[]> {
    return productRepository.findAllBurgersActive();
  }

  async getAllPromos(): Promise<PromoExtendida[]> {
    return productRepository.findAllPromos();
  }

  async getAllPromosActive(): Promise<PromoExtendida[]> {
    return productRepository.getAllPromosActive();
  }

  async getBurgerById(burgerId: number): Promise<Burger | null> {
    return productRepository.findBurgerById(burgerId);
  }

  async getPromoById(promoId: number): Promise<PromoExtendida | null> {
    return productRepository.findPromoById(promoId);
  }


  async updateBurger(burgerId: number, data: Prisma.BurgerUpdateInput): Promise<Burger> {
    return productRepository.updateBurger(burgerId, data);
  }

  async updatePromo(
    promoId: number,
    data: Prisma.PromoUpdateInput,
    burgers: { burgerId: number; quantity: number; newPrice: number }[]
  ): Promise<Promo> {
    return productRepository.updatePromo(promoId, data, burgers);
  }

  async deleteBurger(burgerId: number): Promise<void> {
    return productRepository.deleteBurger(burgerId);
  }

  async deletePromo(promoId: number): Promise<void> {
    return productRepository.deletePromo(promoId);
  }

  //Extra
  async createExtra(data: Prisma.ExtraCreateInput): Promise<Extra> {
    return extraRepository.createExtra(data);
  }

  async getAllExtras(): Promise<Extra[]> {
    return extraRepository.findAllExtras();
  }

  async getAllExtrasActive(): Promise<Extra[]> {  
    return extraRepository.findAllExtrasActive();
  }

  async getExtraById(extraId: number): Promise<Extra | null> {
    return extraRepository.findExtraById(extraId);
  }

  async getExtraByBurgerId(burgerId: number): Promise<Extra[]> {
    return extraRepository.getExtrasByBurgerId(burgerId);
  }

  async updateExtra(
    extraId: number,
    data: Prisma.ExtraUpdateInput
  ): Promise<Extra> {
    return extraRepository.updateExtra(extraId, data);
  }

  async deleteExtra(extraId: number): Promise<void> {
    return extraRepository.deleteExtra(extraId);
  }

}
