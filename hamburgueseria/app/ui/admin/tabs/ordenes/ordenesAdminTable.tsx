'use client';

import PedidosCard from "@/app/ui/perfil/pedidosCard";
import { OrdenExtendida } from "@/lib/definitions";
import { fetchPaginationAdminOrdersById } from "@/lib/pagination";
import Link from "next/link";
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";

export default function OrdenesAdminTable({
  totalPages
}: {
  totalPages: number
}) {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const [orders, setOrders] = useState<{ paginatedOrders: OrdenExtendida[], totalPages: number }>({ paginatedOrders: [], totalPages: 0 });

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await fetchPaginationAdminOrdersById(searchParams.toString() || '', currentPage);
      setOrders(orders);
      
    };
    fetchOrders();
  }, [currentPage, searchParams]);



  return (
    <div className="flex flex-col gap-5 justify-center items-center w-full">
      <div className="flex flex-col gap-5 md:grid grid-cols-2">
        {
          orders.paginatedOrders.map((order) => (
            <PedidosCard key={order.orderId} {...order} />
          ))
        }
      </div>
      <div className="flex flex-row gap-3 justify-center items-center">
        {
          Array.from({ length: orders.totalPages }).map((_, index) => (
            <Link key={index} href={createPageURL(index + 1)} scroll={false} className="btn bg-darkblue w-1/5 text-white hover:bg-lightgrey hover:text-dark">
              {index + 1}
            </Link>
          ))
        }
      </div>
    </div>
  );
}
