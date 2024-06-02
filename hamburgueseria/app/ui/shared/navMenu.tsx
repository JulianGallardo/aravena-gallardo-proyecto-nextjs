'use client'

import { revalidatePath } from 'next/cache';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { logout } from '@/lib/actions';
import { signOut, useSession } from 'next-auth/react';
import { set } from 'zod';
import CartMenu from './cartMenu';


const NavMenu = () => {
    const [isTop, setIsTop] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const { data: session, status, update } = useSession();
    const [DropdownMenuShow, setDropdownMenuShow] = useState(false);
    const [CartMenuShow, setCartMenuShow] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isTransparent, setIsTransparent] = useState(false);

    const handleResize = () => {
        if (window.innerWidth <= 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.pathname === '/') {
            setIsTransparent(true);
        } else {
            setIsTransparent(false);
        }
    }, [typeof window !== 'undefined' && window.location.pathname]);
        

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
                            DropdownMenuShow && !isMobile &&
                            <div>
                                <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3  p-2 shadow bg-lightgrey dark:text-black rounded-box w-60 ${isClosing ? "animate-slide-up" : "animate-slide-down"}`}>
                                    <li><Link href="/" onClick={handleDropdownClose}>Inicio</Link></li>
                                    <li><Link href="/burgers" onClick={handleDropdownClose}>Burgers</Link></li>
                                    <li><Link href="/club" onClick={handleDropdownClose}>Club Byte</Link></li>
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
                        {
                            DropdownMenuShow && isMobile &&
                            <div className={` h-screen fixed inset-0 bg-darkblue z-10  ${isClosing ? "animate-slide-up" : "animate-slide-down"} `}>
                                <button className='btn btn-circle mt-4 ml-2 text-lg bg-transparent border-transparent bg-white ' onClick={handleDropdownToggle}>
                                    X
                                </button>
                                <ul tabIndex={0} className="flex flex-col mt-20 h-screen w-screen p-2 shadow text-white items-center gap-5 text-2xl  rounded-box z-0">
                                    <li><Link href="/" onClick={handleDropdownClose}>Inicio</Link></li>
                                    <li><Link href="/burgers" onClick={handleDropdownClose}>Burgers</Link></li>
                                    <li><Link href="/club" onClick={handleDropdownClose}>Club Byte</Link></li>
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
                        <CartMenu handleCartClose={handleCartClose} handleCartToggle={handleCartToggle} CartMenuShow={CartMenuShow} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavMenu;
