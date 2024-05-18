'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NavMenu: React.FC = () => {
    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setIsTop(true);
            } else {
                setIsTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navbarClass = `navbar bg-headerFooter fixed top-0 left-0 right-0 z-50 ${isTop ? 'bg-transparent' : ''}`;

    return (
        <>
            <div className={navbarClass}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost bg-mainBackground btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="black"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-mainBackground rounded-box w-52">
                            <li><Link href="/">Inicio</Link></li>
                            <li><Link href="/perfil">Perfil</Link></li>
                            <li><Link href="/burgers">Burgers</Link></li>
                            <li><Link href="/promos">Promos</Link></li>
                            <li><Link href="/club">Club Byte</Link></li>
                            <li><Link href="/pedido">Encarga tu Byte</Link></li>

                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <Image src="/ByteBurgersLogoVectorizado.svg" alt="logo" width={50} height={100} />
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost bg-mainBackground btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="black"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">0</span>
                            </div>
                        </div>
                        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-mainBackground shadow">
                            <div className="card-body">
                                <span className="font-bold text-lg">0 Items</span>
                                <span className="text">Subtotal: $0</span>
                                <div className="card-actions">
                                    <button className="bg-headerFooter text-white btn btn-block">Ver carrito</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

            export default NavMenu;