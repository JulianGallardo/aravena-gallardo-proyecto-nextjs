'use client'

import React, { useEffect, useState } from 'react';
import ButtonCard from '../shared/buttonCard';

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
        <div>
            <div className={`card-container ${isMobile ? 'mobile' : 'desktop'}`}>
                {isMobile ? (
                    <>
                        <ButtonCard title="Burgers" photoSrc='/landingCard1.png' button={{ link: '/burgers', className: '', text: 'Ver burgers' }} />
                        <ButtonCard title="Promos" photoSrc="/landingCard2.png" button={{ link: '/promociones', className: '', text: 'Ver promos' }} />
                        <ButtonCard title="Club" photoSrc="/landingCard3.png" button={{ link: '/club', className: '', text: 'Ver más' }} />
                        <ButtonCard title="Encarga" photoSrc="/landingCard4.png" button={{ link: '/pedido', className: '', text: 'Pedir ahora' }} />
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid-item">
                                <ButtonCard title="Burgers" photoSrc='/landingCard1.png' button={{ link: '/burgers', className: '', text: 'Ver burgers' }} />
                            </div>
                            <div className="grid-item">
                                <ButtonCard title="Promos" photoSrc="/landingCard2.png" button={{ link: '/promociones', className: '', text: 'Ver promos' }} />
                            </div>
                            <div className="grid-item">
                                <ButtonCard title="Club" photoSrc="/landingCard3.png" button={{ link: '/club', className: '', text: 'Ver más' }} />
                            </div>
                            <div className="grid-item">
                                <ButtonCard title="Encarga" photoSrc="/landingCard4.png" button={{ link: '/pedido', className: '', text: 'Pedir ahora' }} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MainMenu;

