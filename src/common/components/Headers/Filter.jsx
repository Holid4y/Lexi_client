import React from 'react';

import SVG from '../Icons/SVG';

const Header = ({ title }) => {
    return (
        <div className="container mb-3">
            <div className="row row-cols-3 row-cols-sm-3 row-cols-md-6 row-cols-lg-6 g-2">
                <div className='col'>
                    <button className='btn btn-sm btn-input-style w-100 h-100'>Выученные</button>
                </div>
                <div className='col'>
                    <button className='btn btn-sm btn-input-style w-100 h-100'>По дате</button>
                </div>
                <div className='col'>
                    <button className='btn btn-sm btn-input-style w-100 h-100'>По уровню</button>
                </div>
                <div className='col'>
                    <button className='btn btn-sm btn-input-style w-100 h-100'>По уровню</button>
                </div>
                <div className='col'>
                    <button className='btn btn-sm btn-input-style w-100 h-100'>По уровню</button>
                </div>
                <div className='col'>
                    <button className='btn btn-sm btn-input-style w-100 h-100'><SVG name="settings" /></button>
                </div>
            </div>
        </div>
    );
};

export default Header;
