-- DropForeignKey
ALTER TABLE "BurgerOnPromo" DROP CONSTRAINT "BurgerOnPromo_burgerId_fkey";

-- DropForeignKey
ALTER TABLE "BurgerOnPromo" DROP CONSTRAINT "BurgerOnPromo_promoId_fkey";

-- AddForeignKey
ALTER TABLE "BurgerOnPromo" ADD CONSTRAINT "BurgerOnPromo_promoId_fkey" FOREIGN KEY ("promoId") REFERENCES "Promo"("promoId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BurgerOnPromo" ADD CONSTRAINT "BurgerOnPromo_burgerId_fkey" FOREIGN KEY ("burgerId") REFERENCES "Burger"("burgerId") ON DELETE CASCADE ON UPDATE CASCADE;
