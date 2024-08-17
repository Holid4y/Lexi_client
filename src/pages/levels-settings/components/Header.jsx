// Header.js
import React from "react";
import SVG from "../../../common/components/Icons/SVG";

function Header({ putLoading, hasChanges, handleSave }) {
    const handleGoBack = () => {
        window.history.back();
    };
    
    return (
        <div className="container sticky-top mb-4">
            <div className="d-none d-lg-block mt-2">
                <nav className="navbar dark-nav">
                    <div className="container-fluid px-1">
                        <button className='btn btn-sm d-flex align-items-center ps-0' onClick={handleGoBack}>
                            <SVG name="arrow_left" />
                        </button>
                        <span className="navbar-brand position-absolute top-50 start-50 translate-middle">Настройки уровней</span>
                        {putLoading ? (
                            <button className="btn mx-0 text-success">
                                <span className="visually-hidden">Загрузка...</span>
                            </button>
                        ) : hasChanges ? (
                            <button className="btn mx-0 text-success" onClick={handleSave}>
                                Сохранить
                            </button>
                        ) : null}
                    </div>
                </nav>
            </div>
            <div className="d-block d-lg-none">
                <div className="dark-nav-blur"></div>
                <nav className="navbar dark-nav-mobile px-3 position-relative">
                    <button className='btn btn-sm d-flex align-items-center px-2 ps-0' onClick={handleGoBack}>
                        <SVG name="arrow_left" />
                        {/* <span className='ps-2'>Назад</span> */}
                    </button>
                    <span className="navbar-brand position-absolute top-50 start-50 translate-middle">
                        Настройки уровней
                    </span>
                </nav>
            </div>
        </div>
    );
}

export default Header;
