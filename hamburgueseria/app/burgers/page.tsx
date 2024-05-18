import React from 'react';
import Header from '../ui/shared/header';
import Footer from '../ui/shared/footer';
import Card from '../ui/shared/burgerInfoCard';
const Page: React.FC = () => {
    const menu = [
        { name: 'Cheeseburger', photoSrc: '', description: 'burger 1', price: 9.99 },
        { name: 'Bacon Burger', photoSrc: '', description: 'burger 2', price: 10.99 },
        { name: 'Veggie Burger', photoSrc: '', description: 'burger 3', price: 8.99 },
    ];

    return (
        <div>
            <Header isTransparent = {false} />
            <h1>Burgers</h1>
            <ul>
                {menu.map((burger, index) => (
                    <li key={index}>
                        <Card key={index} title={burger.name} description={burger.description} photoSrc={burger.photoSrc} price={burger.price} />
                    </li>
                ))}
            </ul>
            <Footer />
        </div>
    );
};

export default Page;