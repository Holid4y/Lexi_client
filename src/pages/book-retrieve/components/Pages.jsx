import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Pages = ({ page }) => {
  const { pages, loading, error } = useSelector((state) => state.book);

  // принимает число и возвращает остаток от деления
  function remainder(num) {
    return num % 10;
  }
  const getPage = (pages, pageIndex) => {
    return pages[remainder(pageIndex - 1)];
  };

  // Создание JSX элементов <p> для каждой строки
  function renderParagraphs() {

    if (pages) {
      return getPage(pages, page).map((line, index) => (
        <p key={index}>{line}</p>
      ));
    }
  }

  

  return (
    <div>
      <main className="container px-4">
        <div className="book-text-read">{renderParagraphs()}</div>
        
      </main>
    </div>
  );
};

export default Pages;
