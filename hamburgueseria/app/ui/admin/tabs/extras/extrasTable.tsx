"use client"

import Link from "next/link";
import { Extra } from "@/prisma/generated/client";
import { usePathname, useSearchParams } from 'next/navigation';
import { fetchPaginationExtrasByName } from "@/lib/pagination";
import { useEffect, useState } from "react";
import ExtraItem from "./extraItem";
import { fetchExtraById } from "@/lib/crud";

interface FetchExtra {
  paginatedOrders: Extra[]
  totalPages: number
}


export default function ExtrasTable(
  {
    totalPages
  }: {
    totalPages: number,
  }) {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const [extras, setExtras] = useState<FetchExtra>({ paginatedOrders: [], totalPages: 0 });
  const query = searchParams.toString();
  const itemsPerPage = 8;


  useEffect(() => {
    const fetchExtras = async () => {
      try {
        const data = await fetchPaginationExtrasByName(query, currentPage, itemsPerPage);
        setExtras(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExtras();

  }, [currentPage, query]);

  const refresh = async () => {
    try {
      const data = await fetchPaginationExtrasByName(query, currentPage, itemsPerPage);
      setExtras(data);
    } catch (error) {
      console.error(error);
    }   
  }

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center w-full">
      <div className="flex flex-col gap-5 md:grid md:grid-cols-2 lg:grid-cols-4">
        {
          extras.paginatedOrders.map((extra) => (
            <ExtraItem key={extra.extraId} extra={extra} refresh={refresh} />
          ))
        }
      </div>
      <div className="flex flex-row gap-3 justify-center items-center">
        {
          Array.from({ length: extras.totalPages }).map((_, index) => (
            <Link key={index} href={createPageURL(index + 1)} scroll={false} className="btn bg-darkblue w-1/5 text-white hover:bg-lightgrey hover:text-dark">
              {index + 1}
            </Link>
          ))
        }
      </div>
    </div>
  );
}
