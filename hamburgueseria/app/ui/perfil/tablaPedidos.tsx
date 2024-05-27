import { fetchFilteredOrderById } from "@/lib/pagination";
import PedidosCard from "@/app/ui/perfil/pedidosCard";


export default async function TablePedidos(
    {
        query,
        currentPage,
      }: {
        query: string;
        currentPage: number;
      }) {
        const ordenes = await fetchFilteredOrderById(query, currentPage);

        return (
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    {ordenes.paginatedOrders.map((order:any) => (
                        <div key={order.id} className="flex flex-col gap-2">
                            <PedidosCard {...order} />
                        </div>
                    ))}
                    </div>
            </div>
        );
      }
