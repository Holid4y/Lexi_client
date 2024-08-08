import React from 'react';

import SVG from '../Icons/SVG';

const Header = ({ title }) => {
    return (
        <div className="container mb-3">
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-2">
                <div className='col'>
                    <button className='btn btn-sm btn-outline-secondary w-100'>Выученные</button>
                </div>
                <div className='col'>
                    <button className='btn btn-sm btn-outline-secondary w-100'>По дате</button>
                </div>
                <div className='col'>
                    <button className='btn btn-sm btn-outline-secondary w-100'>По уровню</button>
                </div>
            </div>
        </div>
    );
};

export default Header;
