import React, { Suspense } from "react";
import { fetchPaginationBurgers } from "@/lib/pagination";
import Link from "next/link";
import ExtrasTable from "@/app/ui/admin/tabs/extras/extrasTable";
import SearchByName from "@/app/ui/admin/search";

export default async function ExtrasPagination({
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
        <div className="flex flex-col gap-5 my-24 mx-10 h-full">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold">Admin</h1>
                <div className="flex flex-col  gap-5 w-full">
                    <div className="flex flex-row-reverse items-center gap-4 justify-center md:justify-normal">
                        <Link href="/admin/promos" className="btn rounded-md bg-yellow-400 text-white">
                            Promos
                        </Link>
                        <Link href="/admin/burgers" className="btn rounded-md bg-yellow-400 text-white">
                            Burgers
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-5">
                <h2 className="text-2xl font-bold mb-4">Extras</h2>
                <div className="flex items-center gap-4">
                    <SearchByName placeholder="Buscar un extra" />
                </div>
                <Link href="/admin/extras/new">
                    <button className="btn bg-green-400 text-white p-2 rounded-lg">Agregar Nuevo</button>
                </Link>
            </div>
            <div className="flex flex-col justify-center gap-5 items-center ">
                <Suspense key={query + currentPage} fallback={<div>Cargando...</div>}>
                    <ExtrasTable totalPages={totalPages} />
                </Suspense>
            </div>
        </div>
    );

};
