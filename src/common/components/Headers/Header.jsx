import React from 'react';

import SVG from '../Icons/SVG';

const Header = ({ title, svgName }) => {
    return (
        <div className="container sticky-top mb-3 pt-2">
            <nav className="navbar dark-nav px-3">
                <span className="navbar-brand">{title}</span>
                <SVG name={svgName} />
            </nav>
        </div>
    );
};

export default Header;
