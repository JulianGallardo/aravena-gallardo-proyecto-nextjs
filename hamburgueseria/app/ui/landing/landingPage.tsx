import React from 'react';
import Header from '../shared/header';
import Footer from '../shared/footer';
import ScrollPhoto from './scrollPhoto';
import MainMenu from './mainMenu';

const LandingPage: React.FC = () => {
    return (
        <div>
            <Header />
            <ScrollPhoto />
            <MainMenu />
            <Footer />
        </div>
    );
};

export default LandingPage;
