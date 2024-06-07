import React, { Suspense } from "react";
import { fetchPaginationBurgers } from "@/lib/pagination";
import BurgerTable from "@/app/ui/admin/tabs/burger/burgerTable";
import BurgerSearch from "@/app/ui/admin/tabs/burger/burgerSearch";
import Link from "next/link";

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
        <div className="flex flex-col gap-5 my-24 mx-10 h-full">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold">Admin</h1>
                <div className="flex flex-col  gap-5 w-full">
                    <div className="flex flex-row-reverse items-center gap-4 justify-center md:justify-start mt-5">
                        <Link href="/admin/promos" className="btn rounded-md bg-yellow text-white font-bold">
                            Promos
                        </Link>
                        <Link href="/admin/extras" className="btn rounded-md bg-yellow text-white font-bold">
                            Extras
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-5">
                <h2 className="text-2xl font-bold mb-4">Burgers</h2>
                <div className="flex items-center gap-4">
                    <BurgerSearch placeholder="Search for a burger" />
                </div>
                <Link href="/admin/burgers/new">
                    <button className="btn bg-green text-white p-2 rounded-md font-bold">Add New</button>
                </Link>
            </div>
            <div className="flex flex-col justify-center gap-5 items-center ">
                <Suspense key={query + currentPage} fallback={<div>Cargando...</div>}>
                    <BurgerTable totalPages={totalPages} />
                </Suspense>
            </div>
        </div>
    );

};
