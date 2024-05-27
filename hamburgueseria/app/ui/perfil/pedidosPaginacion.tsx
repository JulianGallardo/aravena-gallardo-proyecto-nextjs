import React from "react";
import TablaPedidos from "@/app/ui/perfil/tablaPedidos";
import Search from "@/app/ui/perfil/search";

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


  return (
    <div className="flex flex-col gap-5">

      <h1 className="text-2xl font-bold text-dark dark:text-lightgrey">Pedidos</h1>
      <Search placeholder="Buscar por numero de orden" />
      <div className="flex flex-col justify-center gap-5 md:grid grid-cols-2 ">



      </div>
    </div>
  );
};
