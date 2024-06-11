'use client';
import React from 'react';
import { Category } from '@/prisma/generated/client';

interface categoriesProps {
    categories: string[];
}

const Categorias: React.FC<categoriesProps> = ({ categories }) => {

    function scrollToCategory(category: string): void {
        const categoryElement = document.getElementById(category);
        if (categoryElement) {
            categoryElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className="flex flex-grow flex-col pt-20 md:mx-36">
            <h2 className="text-2xl font-bold m-8 md:mx-0 ">Categorías</h2>
            <div className="flex flex-col gap-5  justify-center items-center md:flex-row md:justify-between">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className="bg-white w-2/3 hover:bg-hoveredButton dark:bg-darkblue font-bold py-2 px-4 rounded-md shadow-md transition-colors duration-200 ease-in-out text-sm  md:text-lg md:w-full  "
                        onClick={() => scrollToCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Categorias;