'use client';
import React from 'react';
import { Category } from '@/prisma/generated/client';

interface CategoriasProps {
    categories: string[];
}

const Categorias: React.FC = () => {
    const categories = Object.values(Category);
    function scrollToCategory(category: string): void {
        const categoryElement = document.getElementById(category);
        if (categoryElement) {
            categoryElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className="categories bg-darkblue">
            <h2 className="text-2xl font-bold text-white">Categorias</h2>
            <div className="scroll-container">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className="bg-lightgrey hover:bg-white text-black font-bold py-2 px-4 rounded"
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