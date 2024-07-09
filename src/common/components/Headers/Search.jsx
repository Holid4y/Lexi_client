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
                <div className="col-9 col-sm-10 col-md-10-5  col-lg-11">
                    <nav className="navbar dark-nav px-3">
                        <form className="w-100" role="search">
                            <input className="search w-100" type="search" placeholder="Поиск" aria-label="Search" value={searchValue} onChange={handleInputChange} />
                        </form>
                    </nav>
                </div>
                <div className="col-3 col-sm-2 col-md-1-5  col-lg-1">
                    <button className="card-btn bg-card-dark h-100 w-100">
                        <SVG name="filter" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Search;
