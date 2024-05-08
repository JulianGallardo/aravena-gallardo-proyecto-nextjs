'use client'

import React, { useState } from 'react';
import Link from 'next/link';

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
                            <Link href="/">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href="/perfil">
                                Perfil
                            </Link>
                        </li>
                        <li>
                            <Link href="/burgers">
                                Burgers
                            </Link>
                        </li>
                        <li>
                            <Link href="/promociones">
                                Promos
                            </Link>
                        </li>
                        <li>
                            <Link href="/club">
                                Club
                            </Link>
                        </li>
                        <li>
                            <Link href="/pedido">
                                Encarga
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
};

export default NavMenu;