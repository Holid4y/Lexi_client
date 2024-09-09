import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVocabulary } from "../../common/reducers/vocabularySlice";
import Block from "./components/Block";
import SearchFilter from "../../common/components/Headers/SearchFilter";
import Filter from "../../common/components/Headers/Filter";
import Loading from "../../common/components/Treatment/Loading";
import PaginationButton from "../../common/components/Pagination/PagePagination";

import { vocabulary as vocabularyPath } from "../../../public/urls";

function WordList() {
  const dispatch = useDispatch();
  const { words, loading } = useSelector((state) => state.vocabulary);
  const [currentPage, setCurrentPage] = useState(1);

  // Состояния для сортировки, фильтров и поиска
  const [order, setOrder] = useState("date_added");
  const [direction, setDirection] = useState("DESC");
  const [filter, setFilter] = useState(null);
  const [value, setValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams({
      page: currentPage,
      order,
      direction,
      ...(filter && value ? { filter, value } : {}),
      ...(searchQuery ? { search: searchQuery } : {}),
    });

    const queryString = queryParams.toString(); // формируем строку параметров
    dispatch(fetchVocabulary(`?${queryString}`)); // используем корректный запрос
  }, [dispatch, currentPage, order, direction, filter, value, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query); // Обновляем query при поиске
    setCurrentPage(1); // Сбрасываем страницу на первую
  };

  const handleClearSearch = () => {
    setSearchQuery(""); // Очищаем строку поиска
    setCurrentPage(1); // Сбрасываем страницу на первую
  };

  const PaginationButtonView = words?.page_count > 1 && (
    <PaginationButton
      currentPage={currentPage}
      pageCount={words?.page_count}
      setCurrentPage={setCurrentPage}
    />
  );

  return (
    <div className="align-items-center">
      <SearchFilter
        title="Все слова"
        endpoint={vocabularyPath}
        onSearch={handleSearch}
        onClear={handleClearSearch}
      />
      <Filter
        setOrder={setOrder}
        setDirection={setDirection}
        setFilter={setFilter}
        setValue={setValue}
      />
      {loading ? (
        <Loading />
      ) : (
        <main className="container pb-5 mb-3">
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-4 g-4 mb-5">
            {words && words.results && words.results.length > 0 ? (
              words.results.map((item, index) => (
                <Block item={item} key={index} />
              ))
            ) : (
              <div className="col-12 w-100">
                <div className="card py-3 px-2">
                  <div className="text-center">
                    <h4 className="fw-bold mt-3 text-body-emphasis">
                      У вас пока что нет добавленных слов 😔
                    </h4>
                  </div>
                </div>
              </div>
            )}
          </div>
          {PaginationButtonView}
        </main>
      )}
    </div>
  );
}

export default WordList;
