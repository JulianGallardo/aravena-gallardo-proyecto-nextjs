import { ProductRepository } from '../repositories/productRepository';
import { ExtraRpository } from '../repositories/extraRepository';
import { Prisma, Burger, Promo, Extra, PromoBurger } from '@/prisma/generated/client';
import { PromoExtendida } from '@/lib/definitions';

const productRepository = new ProductRepository();
const extraRepository = new ExtraRpository();

export class ProductService {
  async createBurger(data: Prisma.BurgerCreateInput): Promise<Burger> {
    return productRepository.createBurger(data);
  }

  async createPromo(data: Prisma.PromoCreateInput, burgers: { burgerId: number, quantity: number, newPrice: number }[]): Promise<Promo> {
    return productRepository.createPromo(data, burgers);
  }

  async getAllBurgers(): Promise<Burger[]> {
    return productRepository.findAllBurgers();
  }

  async getAllPromos(): Promise<PromoExtendida[]> {
    return productRepository.findAllPromos();
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

  async updatePromo(promoId: number, data: Prisma.PromoUpdateInput, burgers: { burgerId: number, quantity: number, newPrice: number }[]): Promise<Promo> {
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

  async getExtraById(extraId: number): Promise<Extra | null> {
    return extraRepository.findExtraById(extraId);
  }

  async updateExtra(extraId: number, data: Prisma.ExtraUpdateInput): Promise<Extra> {
    return extraRepository.updateExtra(extraId, data);
  }

  async deleteExtra(extraId: number): Promise<void> {
    return extraRepository.deleteExtra(extraId);
  }

}
