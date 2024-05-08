import React from 'react';
import Card from '../shared/card';

const MainMenu: React.FC = () => {
    return (
        <div>
            <div className="card-container">
                <Card title="Burgers" photoSrc="path/to/photo1.jpg" button={{ link: '/burgers', className: '', text: 'Ver burgers' }} />
                <Card title="Promos" photoSrc="path/to/photo2.jpg" button={{ link: '/promociones', className: '', text: 'Ver promos' }} />
                <Card title="Club" photoSrc="path/to/photo3.jpg" button={{ link: '/club', className: '', text: 'Ver más' }} />
                <Card title="Encarga" photoSrc="path/to/photo4.jpg" button={{ link: '/pedido', className: '', text: 'Pedir ahora' }} />
            </div>
        </div>
    );
};

export default MainMenu;