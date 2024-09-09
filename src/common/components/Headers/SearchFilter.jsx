import { useState } from "react";
import SVG from "../Icons/SVG";
import PropTypes from 'prop-types';

function SearchFilter({ title, onSearch, onClear, endpoint }) {
    const [searchValue, setSearchValue] = useState("");
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    // тут все очень плохо, так как +- полностью списанный компонент Search
    // как я в гс говорил, эта иконка фильтрации, это как исключени, которе проверяет, если endpoint == vocabulary то отображай ее
    // но я ща посмотрел, что компонент Search не пердназначен для того, чтобы в нем были еще параметры, но уверен, что немного переписать Search было бы правильней, чем делать копию
    // копии это очень плохо, в будщем можно с умас сойти от того, что у тебя будет 2, а то и больше "похожих" компонента, и если появится таска, допустим, пускать солют, когда пользователь нажимает на кнопу "найти" в поисковике, то тебе прийдется менять это функционал в двух и более местах... это очень трудно
  
    const fetchData = () => {
      if (searchValue) {
        onSearch(searchValue.trim()); // Передаем значение поиска родителю
      } else if (typeof onClear === "function") {
        onClear(); // Очищаем результаты поиска
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
      onClear(); // Очищаем поиск
    };
  
    const handleGoBack = () => {
      window.history.back();
    };
  
    const handleSubmit = (e) => {
      e.preventDefault(); // Предотвратить отправку формы по умолчанию
      fetchData(); // Запустить поиск
    };
  
    return (
      <div className="container sticky-top mb-3 mt-2">
        <div className="row gx-2">
          <div className="col-10 col-lg-11">
            <nav className="navbar dark-nav px-3 w-100">
              <div className="d-flex align-items-center w-100 justify-content-between">
                {!isSearchVisible && (
                  <>
                    <button
                      className="btn btn-sm d-flex align-items-center px-2 ps-0 filter-btn"
                      onClick={handleGoBack}
                    >
                      <SVG name="arrow_left" />
                    </button>
                    <span className="navbar-brand main-nav mx-2">{title}</span>
                    <button
                      className="btn btn-sm d-flex align-items-center px-0 filter-btn"
                      onClick={handleSearchClick}
                    >
                      <SVG name="search" />
                    </button>
                  </>
                )}
                {isSearchVisible && (
                  <div className="w-100 d-flex align-items-center">
                    <form
                      className="search-form w-100 d-flex"
                      role="search"
                      onSubmit={handleSubmit}
                    >
                      <input
                        className="search w-100"
                        type="search"
                        placeholder="Поиск"
                        aria-label="Search"
                        value={searchValue}
                        onChange={handleInputChange}
                      />
                      <button type="submit" className="visually-hidden">
                        Поиск
                      </button>
                    </form>
                    <button
                      className="btn btn-sm d-flex align-items-center px-0 filter-btn ms-2"
                      onClick={handleBackClick}
                    >
                      <SVG name="arrow_left" />
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
          <div className="col-2 col-lg-1">
            <button
              className="btn dark-nav w-100"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              <SVG name="filter" />
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  SearchFilter.propTypes = {
    title: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    onClear: PropTypes.func,
    endpoint: PropTypes.string.isRequired,
  };
  
  export default SearchFilter;
  