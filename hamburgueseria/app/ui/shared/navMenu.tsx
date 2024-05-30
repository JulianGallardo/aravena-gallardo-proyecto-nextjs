'use client'

import { revalidatePath } from 'next/cache';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { logout } from '@/lib/actions';
import { signOut, useSession } from 'next-auth/react';
import { set } from 'zod';

interface NavMenuProps {
    isTransparent: boolean;
}

const NavMenu: React.FC<NavMenuProps> = ({ isTransparent }) => {
    const [isTop, setIsTop] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const { data: session, status, update } = useSession();
    const [DropdownMenuShow, setDropdownMenuShow] = useState(false);
    const [CartMenuShow, setCartMenuShow] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsTop(window.scrollY === 0);
        };

        let lastScrollTop = 0;

        const handleScrollUp = () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            if (st < lastScrollTop) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleScrollUp);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleScrollUp);
        };
    }, []);

    const handleDropdownToggle = () => {
        if (DropdownMenuShow) {
            setIsClosing(true);
            setTimeout(() => {
                setDropdownMenuShow(false);
                setIsClosing(false);
            }, 500);
        } else {
            setDropdownMenuShow(true);
        }
    };

    const handleDropdownClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setDropdownMenuShow(false);
            setIsClosing(false);
        }, 500);
    };


    const handleCartToggle = () => {
        setCartMenuShow(!CartMenuShow);
    };

    const handleCartClose = () => {
        setCartMenuShow(false);
    };

    const navbarClass = `navbar min-h-20 fixed top-0 left-0 right-0 z-50 ${isTransparent ? '' : 'bg-opacity-100 transition-transform duration-500'} ${isTransparent && isTop ? 'bg-transparent' : isVisible ? 'bg-darkblue transition-transform duration-2500 translate-y-0' : 'hidden translate-y-full'}`;

    return (
        <>
            <div className={navbarClass} id="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost bg-lightgrey btn-circle" onClick={handleDropdownToggle}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="black"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </div>
                        {
                            DropdownMenuShow &&
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-lightgrey dark:text-black rounded-box w-52  ">
                                <li><Link href="/" onClick={handleDropdownClose}>Inicio</Link></li>
                                <li><Link href="/burgers" onClick={handleDropdownClose}>Burgers</Link></li>
                                <li><Link href="/promociones" onClick={handleDropdownClose}>Promos</Link></li>
                                <li><Link href="/club" onClick={handleDropdownClose}>Club Byte</Link></li>
                                <li><Link href="/pedido" onClick={handleDropdownClose}>Encarga tu Byte</Link></li>
                                <li><Link href="/chat" onClick={handleDropdownClose}>ByteAssistant</Link></li>
                                {
                                    !session ?
                                        <>
                                            <li><Link href="/auth/register" onClick={handleDropdownClose}>Registro</Link></li>
                                            <li><Link href="/auth/login" onClick={handleDropdownClose}>Login</Link></li>
                                        </>
                                        :
                                        <>
                                            <li><Link href="/perfil" onClick={handleDropdownClose}>Perfil</Link></li>
                                            <li>
                                                <form className='w-full flex' action={() => { signOut() }}>
                                                    <button className="btn bg-darkblue text-sm w-full text-white hover:bg-lightgrey hover:text-dark" onClick={handleDropdownClose}>
                                                        Sign out
                                                    </button>
                                                </form>
                                            </li>
                                        </>
                                }
                            </ul>

                        }
                        {
                            DropdownMenuShow &&
                            <div className={` h-screen fixed inset-0 bg-darkblue z-10  ${isClosing ? "animate-slide-up" : "animate-slide-down"} md:hidden `}>
                                <button className='btn btn-circle mt-4 ml-2 text-lg bg-transparent border-transparent bg-white ' onClick={handleDropdownToggle}>
                                    X
                                </button>
                                <ul tabIndex={0} className="flex flex-col mt-20 h-screen w-screen p-2 shadow text-white items-center gap-10 text-2xl dark:text-black rounded-box ">
                                    <li><Link href="/" onClick={handleDropdownClose}>Inicio</Link></li>
                                    <li><Link href="/burgers" onClick={handleDropdownClose}>Burgers</Link></li>
                                    <li><Link href="/promociones" onClick={handleDropdownClose}>Promos</Link></li>
                                    <li><Link href="/club" onClick={handleDropdownClose}>Club Byte</Link></li>
                                    <li><Link href="/pedido" onClick={handleDropdownClose}>Encarga tu Byte</Link></li>
                                    <li><Link href="/chat" onClick={handleDropdownClose}>ByteAssistant</Link></li>
                                    {
                                        !session ?
                                            <>
                                                <li><Link href="/auth/register" onClick={handleDropdownClose}>Registro</Link></li>
                                                <li><Link href="/auth/login" onClick={handleDropdownClose}>Login</Link></li>
                                            </>
                                            :
                                            <>
                                                <li><Link href="/perfil" onClick={handleDropdownClose}>Perfil</Link></li>
                                                <li>
                                                    <form className='w-full flex' action={() => { signOut() }}>
                                                        <button className="btn bg-darkblue text-sm w-full text-white hover:bg-lightgrey hover:text-dark" onClick={handleDropdownClose}>
                                                            Sign out
                                                        </button>
                                                    </form>
                                                </li>
                                            </>
                                    }
                                </ul>
                            </div>
                        }

                    </div>
                </div>
                <div className="navbar-center z-10">
                    <Image src="/ByteBurgersLogoVectorizado.svg" alt="logo" width={50} height={100} />
                </div>
                <div className="navbar-end text-black">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost bg-lightgrey btn-circle" onClick={handleCartToggle}>
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="black"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">0</span>
                            </div>
                        </div>
                        {
                            CartMenuShow &&
                            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-lightgrey shadow">
                                <div className="card-body">
                                    <span className="font-bold text-lg">0 Items</span>
                                    <span className="white">Subtotal: $0</span>
                                    <div className="card-actions">
                                        <button className="btn bg-darkblue text-sm w-full text-white hover:bg-lightgrey hover:text-dark" onClick={handleCartClose}>Ver carrito</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavMenu;
