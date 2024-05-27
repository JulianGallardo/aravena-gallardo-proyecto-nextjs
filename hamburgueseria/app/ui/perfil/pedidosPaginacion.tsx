import React from "react";
import PedidosCard from "@/app/ui/perfil/pedidosCard";

const PedidosPaginacion = () => {


  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-lightgrey">Pedidos</h1>
      <div className="flex flex-col justify-center gap-5 md:grid grid-cols-2 ">

        <PedidosCard />
        <PedidosCard />
        <PedidosCard />
        <PedidosCard />


      </div>
    </div>
  );
};

export default PedidosPaginacion;