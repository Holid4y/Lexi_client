import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVocabulary } from "../../common/reducers/vocabularySlice";
import Block from "./components/Block";
import Headers from "../../common/components/Headers/Header";
import Loading from "../../common/components/Treatment/Loading";
import PaginationButton from "../../common/components/Pagination/PagePagination";

function WordList() {
  const dispatch = useDispatch();
  const { words, loading } = useSelector((state) => state.vocabulary);
  const [currentPage, setCurrentPage] = useState(1);

  console.log(words)

  useEffect(() => {
    dispatch(fetchVocabulary(currentPage));
  }, [dispatch, currentPage]);

  const Header = <Headers title="Все слова" />;
  const LoadingView = <Loading />;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="align-items-center">
      {Header}
      {loading ? (
        LoadingView
      ) : (
        <main className="container pb-5">
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3 mb-5">
            {words && words.results && words.results.length > 0 ? (
              words.results.map((word, index) => (
                <div key={index} className="col">
                  <Block pk={word.pk} word={word.word} />
                </div>
              ))
            ) : (
              <div>No words found.</div>
            )}
          </div>
          <PaginationButton currentPage={currentPage} pageCount={words ? Math.ceil(words.count / 10) : 1} onPageChange={handlePageChange} setIsNext={(isNext) => {}}/>
        </main>
      )}
    </div>
  );
}

export default WordList;
