-- DropForeignKey
ALTER TABLE "ExtraOnBurger" DROP CONSTRAINT "ExtraOnBurger_burgerId_fkey";

-- DropForeignKey
ALTER TABLE "ExtraOnBurger" DROP CONSTRAINT "ExtraOnBurger_extraId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnOrder" DROP CONSTRAINT "ProductsOnOrder_orderId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnOrder" DROP CONSTRAINT "ProductsOnOrder_productId_fkey";

-- DropForeignKey
ALTER TABLE "Promo" DROP CONSTRAINT "Promo_productId_fkey";

-- AddForeignKey
ALTER TABLE "Promo" ADD CONSTRAINT "Promo_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraOnBurger" ADD CONSTRAINT "ExtraOnBurger_extraId_fkey" FOREIGN KEY ("extraId") REFERENCES "Extra"("extraId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraOnBurger" ADD CONSTRAINT "ExtraOnBurger_burgerId_fkey" FOREIGN KEY ("burgerId") REFERENCES "Burger"("burgerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnOrder" ADD CONSTRAINT "ProductsOnOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnOrder" ADD CONSTRAINT "ProductsOnOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;
