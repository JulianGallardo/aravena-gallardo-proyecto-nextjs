import React from "react";
import PedidosCard from "./pedidosCard";
import { usePathname, useSearchParams } from "next/navigation";

const PedidosPaginacion = () => {


  return (
    <div className="flex flex-col justify-center gap-5 md:grid grid-cols-2 ">

        <PedidosCard />
        <PedidosCard />
        <PedidosCard />
        <PedidosCard />
        <PedidosCard />


    </div>
  );
};

export default PedidosPaginacion;