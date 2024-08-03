// Header.js
import React from "react";

function Header({ putLoading, hasChanges, handleSave }) {
    return (
        <div className="container sticky-top mb-4 pt-2">
            <nav className="navbar dark-nav">
                <div className="container-fluid px-1">
                    <span className="navbar-brand">Настройки уровней</span>
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
    );
}

export default Header;
