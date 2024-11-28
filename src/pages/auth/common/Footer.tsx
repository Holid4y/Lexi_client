import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="mt-auto text-white-50">
            <p>
                developed by {' '}
                <br />
                <a href="https://github.com/pasha-danilevich" className="text-white">
                    Pasha Danilevich
                </a> and{' '}
                <a href="https://github.com/Holid4y" className="text-white">
                    Holid4y
                </a>
            </p>
        </footer>
    );
};

export default Footer;