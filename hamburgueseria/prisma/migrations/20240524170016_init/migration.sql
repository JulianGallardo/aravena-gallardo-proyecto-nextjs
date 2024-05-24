-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('EFECTIVO', 'TARJETA_CREDITO', 'TARJETA_DEBITO', 'MERCADO_PAGO');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('SIMPLE', 'DOBLE', 'TRIPLE', 'PROMO');

-- CreateTable
CREATE TABLE "Client" (
    "clientId" SERIAL NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("clientId")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cellphone" TEXT,
    "address" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Guest" (
    "guestId" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "visitDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("guestId")
);

-- CreateTable
CREATE TABLE "Order" (
    "orderId" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "Product" (
    "productId" SERIAL NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Burger" (
    "burgerId" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "stock" INTEGER NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Burger_pkey" PRIMARY KEY ("burgerId")
);

-- CreateTable
CREATE TABLE "Promo" (
    "promoId" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "category" "Category" NOT NULL DEFAULT 'PROMO',
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Promo_pkey" PRIMARY KEY ("promoId")
);

-- CreateTable
CREATE TABLE "Extra" (
    "extraId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "maxQuantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Extra_pkey" PRIMARY KEY ("extraId")
);

-- CreateTable
CREATE TABLE "PromoBurger" (
    "id" SERIAL NOT NULL,
    "promoId" INTEGER NOT NULL,
    "burgerId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "newPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PromoBurger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrderToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BurgerExtras" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clientId_key" ON "User"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Guest_clientId_key" ON "Guest"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Burger_productId_key" ON "Burger"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Promo_productId_key" ON "Promo"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "PromoBurger_promoId_burgerId_key" ON "PromoBurger"("promoId", "burgerId");

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToProduct_AB_unique" ON "_OrderToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToProduct_B_index" ON "_OrderToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BurgerExtras_AB_unique" ON "_BurgerExtras"("A", "B");

-- CreateIndex
CREATE INDEX "_BurgerExtras_B_index" ON "_BurgerExtras"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Burger" ADD CONSTRAINT "Burger_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promo" ADD CONSTRAINT "Promo_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromoBurger" ADD CONSTRAINT "PromoBurger_promoId_fkey" FOREIGN KEY ("promoId") REFERENCES "Promo"("promoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromoBurger" ADD CONSTRAINT "PromoBurger_burgerId_fkey" FOREIGN KEY ("burgerId") REFERENCES "Burger"("burgerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToProduct" ADD CONSTRAINT "_OrderToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToProduct" ADD CONSTRAINT "_OrderToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BurgerExtras" ADD CONSTRAINT "_BurgerExtras_A_fkey" FOREIGN KEY ("A") REFERENCES "Burger"("burgerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BurgerExtras" ADD CONSTRAINT "_BurgerExtras_B_fkey" FOREIGN KEY ("B") REFERENCES "Extra"("extraId") ON DELETE CASCADE ON UPDATE CASCADE;
