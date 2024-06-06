import React, { Suspense } from "react";
import { fetchPaginationBurgers } from "@/lib/pagination";
import BurgerTable from "@/app/ui/admin/tabs/burger/burgerTable";

export default async function BurgerPagination({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const { paginatedOrders, totalPages } = await fetchPaginationBurgers(currentPage);

  return (
    <div className="flex flex-col gap-5 mt-24 mx-4">
      <h1 className="text-2xl font-bold text-dark dark:text-lightgrey">Burgers</h1>
      <div className="flex flex-col justify-center gap-5 items-center ">
        <Suspense key={query+currentPage} fallback={<div>Cargando...</div>}>
          <BurgerTable totalPages={totalPages} />
        </Suspense>
      </div>
    </div>
  );

};
