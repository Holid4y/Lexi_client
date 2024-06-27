import React, { useState, useEffect } from "react";

function Search({ onSearch }) {
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        if (typeof onSearch === "function") {
            onSearch(searchValue);
        }
    }, [searchValue, onSearch]);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className="container sticky-top mb-3 pt-2">
            <nav className="navbar dark-nav px-3">
                <form className="w-75" role="search">
                    <input
                        className="search w-100"
                        type="search"
                        placeholder="Поиск"
                        aria-label="Search"
                        value={searchValue}
                        onChange={handleInputChange}
                    />
                </form>
            </nav>
        </div>
    );
}

export default Search;
