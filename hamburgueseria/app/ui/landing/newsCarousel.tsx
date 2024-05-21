import React from "react";
import { useEffect,useState } from "react";
import HeroCard from "../shared/heroCard";
import Image from "next/image";
import Button from "../shared/button";

function newsCarousel() {
    interface novedades{
        title:string
        description:string
        image:string
    }

    const [array, setArray] = useState<novedades[]>([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        fetch('/newsPlaceHolder.json')
            .then(response => response.json())
            .then(data => setArray(data.novedades));

    }, []);




    return (
        <>
            <div className="carousel carousel-center p-4 space-x-4 rounded-box">
                {
                    array.map((item, index) => {
                        return (
                            <div key={index} className="carousel-item">
                                <HeroCard
                                    title={item.title}
                                    body={item.description}
                                    photoSrc={item.image}
                                    link="#"
                                    buttonText="Leer más"
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
                {
                    array.map((item, index) => {
                        return (
                            <button
                                key={index}
                                className="carousel-indicator button"
                                id={`indicator${index + 1}`}
                                onClick={() => {
                                    setCurrent(index);
                                    const carouselElement = document.querySelector('.carousel');
                                    const carouselItem = carouselElement?.querySelector('.carousel-item');
                                    if (carouselElement && carouselItem) {
                                        carouselElement.scrollTo({
                                            left: index * carouselItem.clientWidth,
                                            behavior: 'smooth'
                                        });
                                    }
                                }}
                            >
                                {index + 1}
                            </button>
                        );
                    })
                }
            </div>

        </>

    );
}
export default newsCarousel;