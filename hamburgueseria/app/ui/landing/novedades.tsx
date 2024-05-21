import React from "react";
import NewsCarousel from "./newsCarousel";

export default function novedades() {
    return (
        <div className="flex-col bg-lightgrey p-4 rounded-lg justify-items-center">
            <h1 className="text-dark text-5xl font-bold">Novedades</h1>
            <NewsCarousel />
        </div>
    )

}