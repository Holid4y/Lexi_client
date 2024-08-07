import React from 'react';

import SVG from '../Icons/SVG';

const Header = ({ title }) => {
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="container sticky-top mb-3 pt-2">
            <nav className="navbar dark-nav px-3 position-relative">
                <button className='btn btn-sm d-flex align-items-center px-0' onClick={handleGoBack}>
                    <SVG name="arrow_left" />
                    <span className='ps-2'>Назад</span>
                </button>
                <span className="navbar-brand position-absolute top-50 start-50 translate-middle">
                    {title}
                </span>
            </nav>
        </div>
    );
};

export default Header;
