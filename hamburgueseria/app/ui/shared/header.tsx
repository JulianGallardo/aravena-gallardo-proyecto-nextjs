import React from 'react';
import NavMenu from './navMenu';

const Header: React.FC = () => {
    return (
        <header>
            <img src="logo.png" alt="Logo" />
            <NavMenu />
        </header>
    );
};

export default Header;