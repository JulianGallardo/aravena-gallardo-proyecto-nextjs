import React from 'react';
import Logo from './logo';

const Contact = () => {
    return (
        <div>
            <h3>Contacto</h3>
            <h5>Brandsen 805</h5>
            <h5>Bahía Blanca, Buenos Aires, Argentina</h5>
            <h5>Teléfono: +54 9 291 4123456</h5>

        </div>
    );
};

const SocialMedia = () => {
    return (
        <div>
            <h3>Seguinos</h3>
            {/* agregar links ficticios a redes sociales, 
            puede ser a la pag principal de cada red social */}
        </div>
    );
};


const Footer = () => {
    return (
        <footer>
            <Logo />
            <Contact />
            <SocialMedia />
        </footer>
    );
};

export default Footer;