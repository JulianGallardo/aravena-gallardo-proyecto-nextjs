import React from 'react';
import Header from '../shared/header';
import Footer from '../shared/footer';
import ScrollPhoto from './scrollPhoto';
import MainMenu from './mainMenu';

const LandingPage: React.FC = () => {
    return (
        <div className='bg-lightgrey overflow-x-hidden'>
            <ScrollPhoto />
            <MainMenu />
        </div>
    );
};

export default LandingPage;
