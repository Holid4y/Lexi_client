import React, { useState, useEffect } from "react";
import SVG from "../Icons/SVG";

function Search({ title, onSearch }) {
    const [searchValue, setSearchValue] = useState("");
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    useEffect(() => {
        if (typeof onSearch === "function") {
            onSearch(searchValue);
        }
    }, [searchValue, onSearch]);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearchClick = () => {
        setIsSearchVisible(true);
    };

    const handleBackClick = () => {
        setIsSearchVisible(false);
        setSearchValue(""); // Очистить поле поиска при возврате
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="container sticky-top mb-3 pt-2">
            <nav className="navbar dark-nav px-3 position-relative">
                {!isSearchVisible && (
                    <>
                        <button className="btn btn-sm d-flex align-items-center px-0" onClick={handleGoBack}>
                            <SVG name="arrow_left" />
                            <span className="ps-2">Назад</span>
                        </button>
                        <span className="navbar-brand position-absolute top-50 start-50 translate-middle">
                            {title}
                        </span>
                        <button className="btn btn-sm d-flex align-items-center px-0" onClick={handleSearchClick}>
                            <SVG name="search" />
                        </button>
                    </>
                )}
                {isSearchVisible && (
                    <div className="w-100 d-flex">
                        <form className="search-form w-100" role="search">
                            <input
                                className="search w-100"
                                type="search"
                                placeholder="Поиск"
                                aria-label="Search"
                                value={searchValue}
                                onChange={handleInputChange}
                            />
                        </form>
                        <button className="btn btn-sm d-flex align-items-center px-0" onClick={handleBackClick}>
                            <SVG name="arrow_left" />
                        </button>
                    </div>
                )}
            </nav>
        </div>
    );
}

export default Search;
