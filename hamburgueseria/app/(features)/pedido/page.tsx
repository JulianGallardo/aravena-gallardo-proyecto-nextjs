import React from 'react';
import { Categorias } from '../../ui';
import { Category } from '@/prisma/generated/client';

const categories = Object.values(Category) as Category[];

const Page: React.FC = () => {
    return (
        <div>
            <Categorias categories={categories}  /> 
            {categories.map((category, i) => (
                <div id={category} className="category" key={i}>
                    <h2>{category}</h2>
                    <div className="products">
                        {Array(2).fill(null).map((_, j) => (
                            <div className="product" key={j}>
                                <h3>Producto {j}</h3>
                                <p>Descripcion del producto {j}</p>
                                <button>Agregar al carrito</button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Page;