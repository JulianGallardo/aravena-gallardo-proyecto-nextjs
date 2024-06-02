/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Burger` table. All the data in the column will be lost.
  - You are about to drop the `PromoBurger` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PromoBurger" DROP CONSTRAINT "PromoBurger_burgerId_fkey";

-- DropForeignKey
ALTER TABLE "PromoBurger" DROP CONSTRAINT "PromoBurger_promoId_fkey";

-- AlterTable
ALTER TABLE "Burger" DROP COLUMN "imageUrl";

-- DropTable
DROP TABLE "PromoBurger";

-- CreateTable
CREATE TABLE "BurgerOnPromo" (
    "id" SERIAL NOT NULL,
    "promoId" INTEGER NOT NULL,
    "burgerId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "newPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BurgerOnPromo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BurgerOnPromo_promoId_burgerId_key" ON "BurgerOnPromo"("promoId", "burgerId");

-- AddForeignKey
ALTER TABLE "BurgerOnPromo" ADD CONSTRAINT "BurgerOnPromo_promoId_fkey" FOREIGN KEY ("promoId") REFERENCES "Promo"("promoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BurgerOnPromo" ADD CONSTRAINT "BurgerOnPromo_burgerId_fkey" FOREIGN KEY ("burgerId") REFERENCES "Burger"("burgerId") ON DELETE RESTRICT ON UPDATE CASCADE;
