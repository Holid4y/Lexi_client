import { useState } from "react";
import SVG from "../Icons/SVG";
import PropTypes from 'prop-types';
import { host } from "../../../../public/urls";

function Search({ title, onSearch, onClear, endpoint }) {
    const [searchValue, setSearchValue] = useState("");
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const fetchData = async () => {
        if (searchValue) {
            try {
                const fullUrl = host + endpoint;

                const params = new URLSearchParams({
                    search: searchValue.trim(), // Добавляем параметр search
                });

                // Обновляем URL с параметрами
                const fullUrlWithParams = `${fullUrl}?${params.toString()}`;

                const accessToken = localStorage.getItem("access");

                const headers = {
                    "Content-Type": "application/json",
                };

                if (accessToken) {
                    headers["Authorization"] = `Bearer ${accessToken}`;
                } else {
                    console.warn("Отсутствует accessToken. Запрос на", fullUrl);
                }
                console.log(fullUrlWithParams)
                const response = await fetch(fullUrlWithParams, {
                    method: "GET",
                    headers: headers
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
        <div className="container sticky-top mb-3">
            <div className="d-none d-lg-block mt-2">
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
            <div className="d-block d-lg-none">
                <div className="dark-nav-blur"></div>
                <nav className="navbar dark-nav-mobile px-3 position-relative mx-0">
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
            
        </div>
    );
}

Search.propTypes = {
    title: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    onClear: PropTypes.func,
    endpoint: PropTypes.string.isRequired,
};

export default Search;
