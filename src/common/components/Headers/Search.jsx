import React, { useState, useEffect } from "react";
import SVG from "../Icons/SVG";

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
            <div className="row g-3">
                <div className="col-10-5">
                    <nav className="navbar dark-nav px-3">
                        <form className="w-100" role="search">
                            <input className="search w-100" type="search" placeholder="Поиск" aria-label="Search" value={searchValue} onChange={handleInputChange} />
                        </form>
                    </nav>
                </div>
                <div className="col-1-5">
                    <button className="card-btn bg-card-dark h-100 w-100">
                        <SVG name="filter" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Search;
