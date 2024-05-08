'use client';
import React from 'react';

interface CategoriasProps {
    categories: string[];
}

const Categorias: React.FC<CategoriasProps> = ({ categories }) => {

    function scrollToCategory(category: string): void {
        const categoryElement = document.getElementById(category);
        if (categoryElement) {
            categoryElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className="categories">
            <h2>Categorias</h2>
            <div className="scroll-container">
                {categories.map((category, index) => (
                    <button key={index} className={`${category}`} onClick={() => scrollToCategory(category)}>
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Categorias;