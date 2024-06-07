import React from "react";
import { useSelector } from "react-redux";

const Pages = ({ page }) => {
  const { pages, loading, error } = useSelector((state) => state.book);

  // принимает число и возвращает остаток от деления
//   function remainder(num) {
//     console.log(num)
//     return num % 1;
//   }
  
//   console.log(remainder(1)); // 1
//   console.log(remainder(5)); // 5
//   console.log(remainder(11)); // 1
//   console.log(remainder(17)); // 7
//   console.log(remainder(45)); // 5
//   console.log(remainder(125)); // 5
//   console.log(remainder(106)); // 6
//   console.log(remainder(289)); // 9

console.log(11 % 10)
  // Одна страница из массива книги
  const getPage = (pages, pageIndex) => {
    // if (pages) {
    //   console.log(pages, pageIndex);
    //   const remainderPage = remainder(pageIndex)
    //   console.log(pages, remainderPage);
    //   const currentPage = pages[pageIndex - 1];
    //   return currentPage;
    // }
    return [];
  };

  // Создание JSX элементов <p> для каждой строки
  const paragraphs = pages && getPage(pages, page).map((line, index) => (
    <p key={index}>{line}</p>
  ));

  return (
    <div>
      <main className="container px-4">
        <div className="book-text-read">{paragraphs}</div>
        <div className="justify-content-center d-flex">
          {/* {renderPagination()} */}
        </div>
      </main>
    </div>
  );
};

export default Pages;
