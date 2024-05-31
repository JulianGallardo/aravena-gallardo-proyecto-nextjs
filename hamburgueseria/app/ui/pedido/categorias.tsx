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
        <div className="flex flex-grow flex-col pt-20">
            <h2 className="text-2xl font-bold m-8">Categorías</h2>
            <div className="scroll-container flex space-x-2 overflow-x-auto justify-center items-center">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className="bg-white hover:bg-hoveredButton dark:bg-darkblue font-bold py-2 px-4 rounded-md shadow-md transition-colors duration-200 ease-in-out text-lg max-sm:ml-20"
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