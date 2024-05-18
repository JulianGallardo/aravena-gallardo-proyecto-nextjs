import React from 'react';
import NavMenu from './navMenu';

interface HeaderProps {
    isTransparent: boolean;
  }

const Header: React.FC<HeaderProps> = ({ isTransparent }) => {
    return (
        <header>
            <NavMenu isTransparent={isTransparent} />
        </header>
    );
};

export default Header;