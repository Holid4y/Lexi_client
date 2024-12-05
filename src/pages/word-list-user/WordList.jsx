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



  // компонент wordList должен отвечать только за отображения списка слов
  // тут ты его нагружаешь большим кол-во state, которые никак не относятся 
  // к данномо компоненту.
  // это нарушение solid, а именно буквы S
  // посмотри видосики про принцып solid

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

    // не нужно перегружать useEffect таким большим кол-во prors`ов
    // он нужен только для того, чтобы подтянуть с бека words при первой загрузке и при переключении страниц. вот его преыдущие зависимости [dispatch, currentPage]
    // от зависимости dispatch можно отказаться и у нас останется только currentPage
    // но тут появится след. просблема, когда будут выставленны фильтры, допустим
    // на order=lvl_sum и мы нажмем "применить фильтр" будет все кулл, и выдаст результат, допустим, на 30 страниц, но если мы переключим стр. на следующую, то фильтр сброситься.

    // лучшим решением, как я считаю, это переложить всю отведственность за формирование параметров запроса на функцию fetchVocabulary
    // если это сделать, то ни WordList, не Filter не Search дело не будет до того, как там все работает, просто передай нужный параметр и все.
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
        // vocabularyPath можно было импортировать в SearchFilter а не тут
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
      {loading & words == null ? (
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
