import React from 'react';

// Contact component
const Contact = () => {
    return (
        <div>
            <h3>Contact</h3>
            {/* Add your contact information here */}
        </div>
    );
};

// Social Media component
const SocialMedia = () => {
    return (
        <div>
            <h3>Social Media</h3>
            {/* Add your social media links here */}
        </div>
    );
};

// Logo component
const Logo = () => {
    return (
        <div>
            {/* Add your logo here */}
        </div>
    );
};

// Footer component
const Footer = () => {
    return (
        <footer>
            <Contact />
            <SocialMedia />
            <Logo />
        </footer>
    );
};

export default Footer;