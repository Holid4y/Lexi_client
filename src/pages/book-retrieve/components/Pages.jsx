import React from "react";
import { useSelector } from "react-redux";

const Pages = ({ page }) => {
  const { pages } = useSelector((state) => state.book);
  // принимает число и возвращает остаток от деления
  function remainder(num) {
    return num % 50;
  }
  const getPage = (pages, pageIndex) => {
    return pages[remainder(pageIndex - 1)];
  };

  // Создание JSX элементов <p> для каждой строки
  function renderParagraphs() {
    if (pages) {
      const currentPage = getPage(pages, page);
      if (currentPage) {
        return currentPage.map((line, index) => (
          <p key={index}>{line}</p>
        ));
      } else {
        return <p>Страница или книга не найдена</p>;
      }
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
