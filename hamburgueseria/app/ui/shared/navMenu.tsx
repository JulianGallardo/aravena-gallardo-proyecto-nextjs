'use client'

import React, { useState } from 'react';


const NavMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button onClick={toggleMenu}>Navegacion</button>
            {isOpen && (
                <nav>
                    <ul>
                        <li>
                            <a href="/">Inicio</a>
                        </li>
                        <li>
                            <a href="/about">Perfil</a>
                        </li>
                        <li>
                            <a href="/products">Burgers</a>
                        </li>
                        <li>
                            <a href="/services">Promos</a>
                        </li>
                        <li>
                            <a href="/contact">Club</a>
                        </li>
                        <li>
                            <a href="/contact">Encarga</a>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
};

export default NavMenu;