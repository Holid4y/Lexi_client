import React from 'react';

import SVG from '../Icons/SVG';

const Header = ({ title }) => {
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="container sticky-top mb-3">
            <div className="mt-2">
                <nav className="navbar dark-nav px-3 position-relative">
                    <button className='btn btn-sm d-flex align-items-center ps-0' onClick={handleGoBack}>
                        <SVG name="arrow_left" />
                    </button>
                    <span className="navbar-brand position-absolute top-50 start-50 translate-middle">
                        {title}
                    </span>
                </nav>
            </div>
        </div>
    );
};

export default Header;
