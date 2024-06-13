import React, { Suspense } from "react";
import TablaPedidos from "@/app/ui/perfil/tablaPedidos";
import { fetchPaginationOrders } from "@/lib/pagination";

export default async function PedidosPaginacion({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const { paginatedOrders, totalPages } = await fetchPaginationOrders(currentPage);


  return (
    <div className="flex flex-col gap-5 ">
      <h1 className="text-2xl font-bold text-dark dark:text-lightgrey">Pedidos</h1>
      <div className="flex flex-col justify-center gap-5 items-center ">
        <Suspense key={query+currentPage} fallback={<div>Cargando...</div>}>
          <TablaPedidos totalPages={totalPages} />
        </Suspense>
      </div>
    </div>
  );
};
