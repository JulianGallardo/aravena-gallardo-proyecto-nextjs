-- DropForeignKey
ALTER TABLE "ExtraOnOrder" DROP CONSTRAINT "ExtraOnOrder_orderId_extraId_fkey";

-- AddForeignKey
ALTER TABLE "ExtraOnOrder" ADD CONSTRAINT "ExtraOnOrder_orderId_id_fkey" FOREIGN KEY ("orderId", "id") REFERENCES "ProductsOnOrder"("orderId", "productId") ON DELETE CASCADE ON UPDATE CASCADE;
