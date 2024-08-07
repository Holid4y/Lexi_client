import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVocabulary } from "../../common/reducers/vocabularySlice";
import Block from "./components/Block";
import Headers from "../../common/components/Headers/Header";
import Filter from "../../common/components/Headers/Filter";
import Loading from "../../common/components/Treatment/Loading";
import PaginationButton from "../../common/components/Pagination/PagePagination";

function WordList() {
  const dispatch = useDispatch();
  const { words, loading } = useSelector((state) => state.vocabulary);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    dispatch(fetchVocabulary(currentPage));
  }, [dispatch, currentPage]);

  console.log(words)

  const PaginationButtonView = words?.page_count > 1 && <PaginationButton currentPage={currentPage} pageCount={words?.page_count} setCurrentPage={setCurrentPage} />


  return (
    <div className="align-items-center">
      <Headers title="Все слова"/>
      <Filter />
      {loading ? (
        <Loading />
      ) : (
        <main className="container pb-5">
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4 mb-5 my-2">
            {words && words.results && words.results.length > 0 ? (
              words.results.map((item, index) => (
                  <Block item={item} key={index}/>
              ))
            ) : (
              <div className="col-12 w-100">
                  <div className="card py-3 px-2">
                      <div className="text-center">
                          <h4 className="fw-bold mt-3 text-body-emphasis">У вас пока что нет добавленных слов 😔</h4>
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
