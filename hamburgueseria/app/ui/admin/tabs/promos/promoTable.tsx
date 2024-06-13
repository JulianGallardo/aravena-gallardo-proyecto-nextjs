"use client"

import Link from "next/link";
import { usePathname, useSearchParams } from 'next/navigation';
import { fetchPaginatedPromosByName } from "@/lib/pagination";
import { useEffect, useState } from "react";
import PromoItem from "./promoItem";
import { PromoExtendida } from "@/lib/definitions";

interface FetchPromo {
  paginatedOrders: PromoExtendida[]
  totalPages: number
}


export default function PromoTable(
  {
    totalPages
  }:{
    totalPages: number,
  }) {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const [promos, setPromos] = useState<FetchPromo>({ paginatedOrders: [], totalPages: 0 });
  const query = searchParams.toString();


  useEffect(() => {
    const fetchPromos =  () => {
        fetchPaginatedPromosByName(query,currentPage).then((data) => {setPromos(data)  }).catch((error) => { console.error(error) });
    };

    fetchPromos();

  }, [currentPage,query]);


  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center w-full">
      <div className="flex flex-col gap-5 md:grid grid-cols-2">
        {
          promos.paginatedOrders.map((promo) => (
            <PromoItem key={promo.promoId} promo={promo} />
          ))
        }
      </div>
      <div className="flex flex-row gap-3 justify-center items-center">
        {
          Array.from({ length: promos.totalPages }).map((_, index) => (
            <Link key={index} href={createPageURL(index + 1)} scroll={false} className="btn bg-darkblue w-1/5 text-white hover:bg-lightgrey hover:text-dark">
              {index + 1}
            </Link>
          ))
        }
    </div>
  </div>
  );
}
