/*
  Warnings:

  - You are about to drop the column `burgerId` on the `ExtraOnOrder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId,extraId]` on the table `ExtraOnOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ExtraOnOrder" DROP CONSTRAINT "ExtraOnOrder_burgerId_fkey";

-- DropForeignKey
ALTER TABLE "ExtraOnOrder" DROP CONSTRAINT "ExtraOnOrder_orderId_fkey";

-- DropIndex
DROP INDEX "ExtraOnOrder_orderId_extraId_burgerId_key";

-- AlterTable
ALTER TABLE "ExtraOnOrder" DROP COLUMN "burgerId";

-- CreateIndex
CREATE UNIQUE INDEX "ExtraOnOrder_orderId_extraId_key" ON "ExtraOnOrder"("orderId", "extraId");

-- AddForeignKey
ALTER TABLE "ExtraOnOrder" ADD CONSTRAINT "ExtraOnOrder_orderId_extraId_fkey" FOREIGN KEY ("orderId", "extraId") REFERENCES "ProductsOnOrder"("orderId", "productId") ON DELETE CASCADE ON UPDATE CASCADE;
