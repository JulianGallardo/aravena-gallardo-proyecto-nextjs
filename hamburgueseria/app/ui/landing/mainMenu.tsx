import React from 'react';
import ButtonCard from '../shared/buttonCard';

const MainMenu: React.FC = () => {
    return (
        <div>
            <div className="card-container">
                <ButtonCard title="Burgers" photoSrc='/landingCard1.png' button={{ link: '/burgers', className: '', text: 'Ver burgers' }} />
                <ButtonCard title="Promos" photoSrc="/landingCard2.png" button={{ link: '/promociones', className: '', text: 'Ver promos' }} />
                <ButtonCard title="Club" photoSrc="/landingCard3.png" button={{ link: '/club', className: '', text: 'Ver más' }} />
                <ButtonCard title="Encarga" photoSrc="/landingCard4.png" button={{ link: '/pedido', className: '', text: 'Pedir ahora' }} />
            </div>
        </div>
    );
};

export default MainMenu;