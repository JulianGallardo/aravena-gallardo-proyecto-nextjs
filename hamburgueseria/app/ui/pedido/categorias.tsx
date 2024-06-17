'use client';
import React, { useEffect } from 'react';

interface categoriesProps {
    categories: string[];
}

const Categorias: React.FC<categoriesProps> = ({ categories }) => {

    useEffect(() => {
        
        if(window != undefined && window.location.hash){
            const category = window.location.hash.replace('#', '');
            scrollToCategory(category);
        }
    }, []);


    


    function scrollToCategory(category: string): void {
        const categoryElement = document.getElementById(category);
        if (categoryElement) {
            categoryElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className="flex flex-grow flex-col w-full pt-5  text-darkblue">
            <h2 className="text-2xl font-bold m-8 md:mx-0 ">Categorías</h2>
            <div className="flex flex-col gap-5  justify-center items-center md:flex-row md:justify-between">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className="text-white w-2/3 hover:bg-hoveredButton bg-darkblue font-bold py-2 px-4 rounded-md shadow-md transition-colors duration-200 ease-in-out text-sm  md:text-lg md:w-full  "
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