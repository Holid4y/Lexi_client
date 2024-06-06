// Поиск
import React from "react";


function Search() {
  
  return (
    <div className="container sticky-top mb-4 pt-2">
        <nav className="navbar dark-nav p-2">
          <form className="d-flex w-100" role="search">
            <input
              className="form-control w-100"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </nav>
      </div>
  )
}

export default Search;
