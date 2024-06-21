"use client"

import PedidosCard from "@/app/ui/perfil/pedidosCard";
import { fetchPaginationOrders } from "@/lib/pagination";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname, useSearchParams } from 'next/navigation';


export default async function TablePedidos(
  {
    totalPages,
    session
  }:{
    totalPages: number,
    session: Session
  }) {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const orders = await fetchPaginationOrders(currentPage, session.user.clientId);


  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center w-full">
      <div className="flex flex-col gap-5 md:grid grid-cols-2">
        {
          orders.paginatedOrders.map((order) => (
            <PedidosCard products={[]} key={order.orderId} {...order} />
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
