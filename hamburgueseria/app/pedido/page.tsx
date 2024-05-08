import React from 'react';
import Header from '../ui/shared/header';
import Footer from '../ui/shared/footer';
import Categorias from '../ui/pedido/categorias';

const categories = ['Simple', 'Doble', 'Bebidas', 'Postres'];

const Page: React.FC = () => {
    return (
        <div>
            <Header />
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
            <Footer />
        </div>
    );
};

export default Page;