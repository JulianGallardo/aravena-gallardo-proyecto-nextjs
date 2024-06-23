-- CreateTable
CREATE TABLE "ExtraOnOrder" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "extraId" INTEGER NOT NULL,
    "burgerId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "ExtraOnOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExtraOnOrder_orderId_extraId_burgerId_key" ON "ExtraOnOrder"("orderId", "extraId", "burgerId");

-- AddForeignKey
ALTER TABLE "ExtraOnOrder" ADD CONSTRAINT "ExtraOnOrder_extraId_fkey" FOREIGN KEY ("extraId") REFERENCES "Extra"("extraId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraOnOrder" ADD CONSTRAINT "ExtraOnOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraOnOrder" ADD CONSTRAINT "ExtraOnOrder_burgerId_fkey" FOREIGN KEY ("burgerId") REFERENCES "Burger"("burgerId") ON DELETE CASCADE ON UPDATE CASCADE;
