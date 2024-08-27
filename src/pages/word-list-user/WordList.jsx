import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVocabulary } from "../../common/reducers/vocabularySlice";
import Block from "./components/Block";
import Search from "../../common/components/Headers/Search";
import Filter from "../../common/components/Headers/Filter";
import Loading from "../../common/components/Treatment/Loading";
import PaginationButton from "../../common/components/Pagination/PagePagination";

import { vocabulary as vocabularyPath } from "../../../public/urls";

function WordList() {
  const dispatch = useDispatch();
  const { words, loading } = useSelector((state) => state.vocabulary);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(fetchVocabulary(currentPage));
  }, [dispatch, currentPage]);

  const handleSearchResults = (results) => {
      if (Array.isArray(results) && results.length > 0) {
          setSearchResults(results);
      } else if (results && results.results && Array.isArray(results.results)) {
          setSearchResults(results.results);
      } else {
          setSearchResults([]);
      }
  };

  const handleClearSearch = () => {
      setSearchResults([]); // Очистить результаты поиска
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
      <Search title="Все слова" endpoint={vocabularyPath} onSearch={handleSearchResults} onClear={handleClearSearch} />
      <Filter />
      {loading ? (
        <Loading />
      ) : (
        <main className="container pb-5 mb-3">
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-4 g-4 mb-5">
            {searchResults.length > 0 ? (
                searchResults.map((item, index) => (
                    <Block item={item} key={index} />
                ))
            ) : words && words.results && words.results.length > 0 ? (
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