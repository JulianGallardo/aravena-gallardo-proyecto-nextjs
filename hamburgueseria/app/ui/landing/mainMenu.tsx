import React from 'react';
import ButtonCard from '../shared/buttonCard';

const MainMenu: React.FC = () => {
    return (
        <div>
            <div className="card-container">
                <ButtonCard title="Burgers" photoSrc="path/to/photo1.jpg" button={{ link: '/burgers', className: '', text: 'Ver burgers' }} />
                <ButtonCard title="Promos" photoSrc="path/to/photo2.jpg" button={{ link: '/promociones', className: '', text: 'Ver promos' }} />
                <ButtonCard title="Club" photoSrc="path/to/photo3.jpg" button={{ link: '/club', className: '', text: 'Ver más' }} />
                <ButtonCard title="Encarga" photoSrc="path/to/photo4.jpg" button={{ link: '/pedido', className: '', text: 'Pedir ahora' }} />
            </div>
        </div>
    );
};

export default MainMenu;