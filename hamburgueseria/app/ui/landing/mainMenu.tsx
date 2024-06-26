'use client'

import React, { useEffect, useState } from 'react';
import ButtonCard from '../shared/buttonCard';
import HeroCard from '../shared/heroCard';

const MainMenu: React.FC = () => {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            handleResize();

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return (
        <div className='flex flex-col items-center m-auto'>
            <div className={`card-container ${isMobile ? 'mobile' : 'desktop'}`}>
                {isMobile ? (
                    <>  
                    <div className="flex flex-col md:flex-row items-center justify-center">
                        <div className="items-center justify-center">
                            <ButtonCard title="Burgers" photoSrc='/landingCard1.png' width={300} height={300} button={{ link: '/burgers', className: '', text: 'Ver burgers' }} />
                            <ButtonCard title="Promos" photoSrc="/landingCard2.png" width={300} height={300} button={{ link: '/burgers/#PROMO', className: '', text: 'Ver promos' }} />
                        </div>
                        <div className="flex items-center justify-center">
                            <HeroCard title="Tenemos un nuevo integrante!" body="Chatea con nuestro nuevo asistente virtual, te da recomendaciones y te ayuda a elegir si estas en dudad entre que Byte elegir!" photoSrc="/ByteBurgersLogo.png" buttonText='Ver más' link='/chat' />
                        </div>
                        <div className="items-center justify-center">
                            <ButtonCard title="Club" photoSrc="/landingCard3.png" width={300} height={300} button={{ link: '/club', className: '', text: 'Ver más' }} />
                            <ButtonCard title="Encarga" photoSrc="/landingCard4.png" width={300} height={300} button={{ link: '/pedido', className: '', text: 'Pedir ahora' }} />
                        </div>
                    </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-column-2 items-center justify-center">
                            <div className="m-x-0 w-auto h-auto ">
                                <ButtonCard title="Burgers" photoSrc='/landingCard1.png' width={800} height={400} button={{ link: '/burgers', className: '', text: 'Ver burgers' }} />
                            </div>
                            <div className="m-x-0 w-auto h-auto">
                                <ButtonCard title="Promos" photoSrc="/landingCard2.png" width={410} height={400} button={{ link: '/burgers/#PROMO', className: '', text: 'Ver promos' }} />
                            </div>
                        </div>
                        
                        <div className="flex  items-center justify-center">
                            <HeroCard title="Tenemos un nuevo integrante!" body="Chatea con nuestro nuevo asistente virtual, te da recomendaciones y te ayuda a elegir si estas en dudad entre que Byte elegir!" photoSrc="/ByteBurgersLogo.png" buttonText='Ver más' link='/chat' />
                        </div>

                        <div className="flex flex-column-2 items-center justify-center">
                            <div className="m-x-0 w-auto h-auto">
                                <ButtonCard title="Club" photoSrc="/landingCard3.png" width={500} height={500} button={{ link: '/club', className: '', text: 'Ver más' }} />
                            </div>
                            <div className="m-x-0 w-auto h-auto">
                                <ButtonCard title="Encargá" photoSrc="/landingCard4.png" width={580} height={500} button={{ link: '/burgers', className: '', text: 'Pedir ahora' }} />
                            </div>
                        </div>                  
                    </>
                )}
            </div>
        </div>
    );
};

export default MainMenu;

