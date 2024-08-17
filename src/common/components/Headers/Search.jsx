import { useState } from "react";
import SVG from "../Icons/SVG";
import PropTypes from 'prop-types';
import { host } from "../../../../public/urls";

function Search({ title, onSearch, onClear, endpoint }) {
    const [searchValue, setSearchValue] = useState("");
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const fetchData = async () => {
        if (searchValue.trim()) {
            try {
                const fullUrl = host + endpoint;
                const accessToken = localStorage.getItem("access");

                const headers = {
                    "Content-Type": "application/json",
                };

                if (accessToken) {
                    headers["Authorization"] = `Bearer ${accessToken}`;
                } else {
                    console.warn("Отсутствует accessToken. Запрос на", fullUrl);
                }

                const response = await fetch(fullUrl, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({ value: searchValue }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (typeof onSearch === "function") {
                    onSearch(data); // Передача данных в компонент родитель
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } else if (typeof onClear === "function") {
            onClear(); // Очистка результатов поиска, если поле поиска пустое
        }
    };

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

    const handleSubmit = (e) => {
        e.preventDefault(); // Предотвратить отправку формы по умолчанию
        fetchData(); // Запустить поиск
    };

    return (
        <div className="container sticky-top mb-3 pt-2">
            <div className='dark-nav-blur'></div>
            <nav className="navbar dark-nav px-3 position-relative mx-0">
                {!isSearchVisible && (
                    <>
                        <button className="btn btn-sm d-flex align-items-center px-2 ps-0" onClick={handleGoBack}>
                            <SVG name="arrow_left" />
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
                        <form className="search-form w-100" role="search" onSubmit={handleSubmit}>
                            <input
                                className="search w-100"
                                type="search"
                                placeholder="Поиск"
                                aria-label="Search"
                                value={searchValue}
                                onChange={handleInputChange}
                            />
                            <button type="submit" className="visually-hidden">Поиск</button> {/* Кнопка для доступности */}
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

Search.propTypes = {
    title: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    onClear: PropTypes.func, // Добавлен onClear
    endpoint: PropTypes.string.isRequired,
};

export default Search;
