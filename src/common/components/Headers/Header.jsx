import React from 'react';

const Header = ({ title }) => {
    return (
        <div className="container sticky-top mb-3 pt-2">
            <nav className="navbar dark-nav px-3">
                <span className="navbar-brand">{title}</span>
            </nav>
        </div>
    );
};

export default Header;
