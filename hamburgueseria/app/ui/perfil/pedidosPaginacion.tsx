import React, { Suspense } from "react";
import TablaPedidos from "@/app/ui/perfil/tablaPedidos";
import { fetchPaginationOrders } from "@/lib/pagination";
import { auth } from "@/auth";
import CardSkeleton from "../shared/cardSkeleton";

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
  const session = await auth();
  if (!session) {
    return null;
  }
  else {


    const { paginatedOrders, totalPages } = await fetchPaginationOrders(currentPage, session.user.clientId);


    return (
      <div className="flex flex-col gap-5 mx-2">
        <h1 className="text-2xl font-bold text-dark ">Pedidos</h1>
        <div className="flex flex-col justify-center gap-5 items-center ">
          <Suspense key={query + currentPage} fallback={<TableSkeleton/>}>
            <TablaPedidos totalPages={totalPages} session={session} />
          </Suspense>
        </div>
      </div>
    );
  }
};


function TableSkeleton() {
  return (
    <div className="flex flex-col gap-5 mx-2">
      <div className="flex flex-col md:grid grid-cols-2 justify-center gap-5 items-center ">
        <div className="skeleton w-96 h-96 bg-gray-300"></div>
        <div className="skeleton w-96 h-96 bg-gray-300"></div>
        <div className="skeleton w-96 h-96 bg-gray-300"></div>
        <div className="skeleton w-96 h-96 bg-gray-300"></div>
      </div>
    </div>
  );
}