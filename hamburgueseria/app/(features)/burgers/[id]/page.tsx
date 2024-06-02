"use client";

import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import { useCart } from "@/app/hooks/useCart";
import { AddToCartIcon, RemoveFromCartIcon } from "@/app/ui/shared/cartIcons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CartItem } from "@/lib/types";
import { Burger } from "@/prisma/generated/client";
import useFetchImages from "@/app/hooks/useFetchImages";
import { parse } from "node:path/win32";

const BurgerPage: React.FC = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [burgerData, setBurgerData] = useState<CartItem>({
    productId: 0,
    burgerId: 0,
    name: "",
    category: "SIMPLE",
    description: "",
    price: 0,
    quantity: 1,
    stock: 0,
  });

  const parseData = (data: Burger) => {
    const burger = data;
    setBurgerData({
      productId: burger.productId,
      burgerId: burger.burgerId,
      name: burger.name,
      category: burger.category,
      description: burger.description,
      price: burger.price,
      quantity: 1,
      stock: burger.stock,
    });
  };
  const pathnameArray = pathname.split("/");
  const burgerId = pathnameArray[pathnameArray.length - 1];
  const query = burgerId ? `?productId=${burgerId}` : "";
  const url = `/api/products/burgers${query}`;
  const { burgers, imageUrls, error } = useFetchImages(url);
  useEffect(() => {
    if (burgers && burgers.length > 0) {
      console.log(burgers[0]);  
      parseData(burgers[0]);
    }
  }, [burgers]);

  return (
    <div className="flex flex-col h-screen mt-20 items-center ">
      {burgerData && burgerData.name !== "" && (
        <div className="flex flex-col items-center gap-5 ">
          <Image src={imageUrls[0]} alt={burgerData.name} width={300} height={300} />
          <h1>{burgerData.name}</h1>
          <p>{burgerData.description}</p>
          <p>{burgerData.category}</p>
          <p>{burgerData.price}</p>
          <div className="flex flex-row gap-5 justify-center items-center ">
            <button
              className="btn btn-circle bg-green "
              onClick={() => addToCart(burgerData)}
            >
              <AddToCartIcon />
            </button>
            <button
              className="btn btn-circle bg-red"
              onClick={() => removeFromCart(burgerData)}
            >
              <RemoveFromCartIcon />
            </button>
          </div>
        </div>
      )}
      {burgerData && burgerData.name === "" && (
        <div className="flex flex-col items-center gap-5 ">
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default BurgerPage;
