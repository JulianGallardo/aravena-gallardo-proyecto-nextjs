"use client"

import BurgerItem from "./burgerItem";
import Link from "next/link";
import { Burger } from "@/prisma/generated/client";
import { usePathname, useSearchParams } from 'next/navigation';
import { fetchPaginationBurgers } from "@/lib/pagination";
import { useEffect, useState } from "react";

interface FetchBurger {
  paginatedOrders: Burger[],
  totalPages: number
}

export default function BurgerTable(
  {
    totalPages
  }:{
    totalPages: number
  }) {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const [burgers, setBurgers] = useState<FetchBurger>({ paginatedOrders: [], totalPages: 0 });

  useEffect(() => {
    const fetchBurgers =  () => {
      fetchPaginationBurgers(currentPage).then((data) => { setBurgers(data) }).catch((error) => { console.error(error) });
    };

    fetchBurgers();

  }, [currentPage]);


  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center w-full">
      <div className="flex flex-col gap-5 md:grid grid-cols-2">
        {
          burgers.paginatedOrders.map((burger:Burger) => (
            <BurgerItem
              key={burger.burgerId}
              burger={burger}
            />
          ))
            
        }
      </div>
      <div className="flex flex-row gap-3 justify-center items-center">
        {
          Array.from({ length: totalPages }).map((_, index) => (
            <Link key={index} href={createPageURL(index + 1)} scroll={false} className="btn bg-darkblue w-1/5 text-white hover:bg-lightgrey hover:text-dark">
              {index + 1}
            </Link>
          ))
        }
    </div>
  </div>
  );
}
