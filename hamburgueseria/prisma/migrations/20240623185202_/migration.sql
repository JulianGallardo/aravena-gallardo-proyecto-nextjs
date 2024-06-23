/*
  Warnings:

  - You are about to drop the column `orderId` on the `ExtraOnOrder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId,extraId]` on the table `ExtraOnOrder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId,productId,id]` on the table `ProductsOnOrder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `ExtraOnOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExtraOnOrder" DROP CONSTRAINT "ExtraOnOrder_orderId_id_fkey";

-- DropIndex
DROP INDEX "ExtraOnOrder_orderId_extraId_key";

-- DropIndex
DROP INDEX "ProductsOnOrder_orderId_productId_key";

-- AlterTable
ALTER TABLE "ExtraOnOrder" DROP COLUMN "orderId",
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductsOnOrder" ALTER COLUMN "quantity" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "ExtraOnOrder_productId_extraId_key" ON "ExtraOnOrder"("productId", "extraId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductsOnOrder_orderId_productId_id_key" ON "ProductsOnOrder"("orderId", "productId", "id");

-- AddForeignKey
ALTER TABLE "ExtraOnOrder" ADD CONSTRAINT "ExtraOnOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "ProductsOnOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
