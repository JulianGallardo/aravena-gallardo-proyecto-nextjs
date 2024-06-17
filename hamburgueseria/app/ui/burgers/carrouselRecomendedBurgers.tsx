'use client';

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Burger, Promo } from '@/prisma/generated/client';
import Link from 'next/link';
import { PromoExtendida } from '@/lib/definitions';

interface CarouselProps {
    recommendedBurgers: {
        burger: Burger;
        cloudinaryImageUrl: string;
    }[];
    recommendedPromos: {
        promo: PromoExtendida;
        cloudinaryImageUrl: string;
    }[];
}

const Carousel = ({ recommendedBurgers,recommendedPromos }: CarouselProps) => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots:false
                }
            }
        ]
    };

    return (
        <div className="w-full p-8">
            <h2 className="text-2xl font-bold  mb-8">Hamburguesas y Promociones Recomendadas</h2>
            <Slider {...settings}>
                {recommendedBurgers.map((burger, index) => (
                    <Link href={(burger.burger.category != "PROMO")?`/burgers/${burger.burger.burgerId}`:`/burgers/promos/${burger.burger.productId}`} key={index}>
                        <div key={index} className="px-4">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full ">
                                <Image
                                    src={burger.cloudinaryImageUrl}
                                    alt={burger.burger.name}
                                    width={400}
                                    height={300}
                                    className="object-cover w-full h-48  "
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{burger.burger.name}</h3>
                                    <p className="text-gray-800 font-bold">{burger.burger.category}</p>
                                    <p className="text-gray-800 font-bold">${burger.burger.price}</p>
                                    
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
                {recommendedPromos.map((promo, index) => (
                    <Link href={`/burgers/promos/${promo.promo.promoId}`} key={index}>
                        <div key={index} className="px-4">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full ">
                                <Image
                                    src={promo.cloudinaryImageUrl}
                                    alt={promo.promo.name}
                                    width={400}
                                    height={300}
                                    className="object-cover w-full h-48  "
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{promo.promo.name}</h3>
                                    <p className="text-gray-800 font-bold">{promo.promo.category}</p>
                                    <p className="text-gray-800 font-bold">${promo.promo.price}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
