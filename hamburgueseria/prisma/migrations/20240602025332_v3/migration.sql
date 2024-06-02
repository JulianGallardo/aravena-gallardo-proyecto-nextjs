/*
  Warnings:

  - You are about to drop the column `price` on the `ProductsOnOrder` table. All the data in the column will be lost.
  - You are about to drop the `ExtrasOnBurgers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExtrasOnBurgers" DROP CONSTRAINT "ExtrasOnBurgers_burgerId_fkey";

-- DropForeignKey
ALTER TABLE "ExtrasOnBurgers" DROP CONSTRAINT "ExtrasOnBurgers_extraId_fkey";

-- AlterTable
ALTER TABLE "Burger" ADD COLUMN     "imageUrl" TEXT NOT NULL DEFAULT 'https://s7d1.scene7.com/is/image/mcdonalds/Header_BigMacCombo_v1_832x472:nutrition-calculator-tile?wid=472&hei=472&dpr=off';

-- AlterTable
ALTER TABLE "ProductsOnOrder" DROP COLUMN "price";

-- AlterTable
ALTER TABLE "Promo" ADD COLUMN     "imageUrl" TEXT NOT NULL DEFAULT 'https://cache-mcd-ecommerce.appmcdonalds.com/images/AR/DLV_48040_v9.png';

-- DropTable
DROP TABLE "ExtrasOnBurgers";

-- CreateTable
CREATE TABLE "ExtraOnBurger" (
    "id" SERIAL NOT NULL,
    "extraId" INTEGER NOT NULL,
    "burgerId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "ExtraOnBurger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExtraOnBurger_extraId_burgerId_key" ON "ExtraOnBurger"("extraId", "burgerId");

-- AddForeignKey
ALTER TABLE "ExtraOnBurger" ADD CONSTRAINT "ExtraOnBurger_extraId_fkey" FOREIGN KEY ("extraId") REFERENCES "Extra"("extraId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraOnBurger" ADD CONSTRAINT "ExtraOnBurger_burgerId_fkey" FOREIGN KEY ("burgerId") REFERENCES "Burger"("burgerId") ON DELETE RESTRICT ON UPDATE CASCADE;
