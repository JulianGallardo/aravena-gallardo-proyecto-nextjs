import React from 'react';
import Card from '../shared/card';

const MainMenu: React.FC = () => {
    return (
        <div>
            <div className="card-container">
                <Card title="Card 1" photoSrc="path/to/photo1.jpg" button={{ link: '/1', className: '', text: '1' }} />
                <Card title="Card 2" photoSrc="path/to/photo2.jpg" button={{ link: '/2', className: '', text: '2' }} />
                <Card title="Card 3" photoSrc="path/to/photo3.jpg" button={{ link: '/3', className: '', text: '3' }} />
                <Card title="Card 4" photoSrc="path/to/photo4.jpg" button={{ link: '/4', className: '', text: '4' }} />
            </div>
        </div>
    );
};

export default MainMenu;