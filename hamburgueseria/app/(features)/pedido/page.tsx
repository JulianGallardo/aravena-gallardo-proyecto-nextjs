import React from 'react';
import { Header } from '../../ui';
import { Footer } from '../../ui';
import { Categorias } from '../../ui';

const categories = ['Simple', 'Doble', 'Bebidas', 'Postres'];

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