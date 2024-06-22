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
  function getWord(word) {
    console.log(word)
  }


  function addSpanTags(text) {
    let words = text.split(/\s+/);
    let result = [];
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        let punctuation = word.match(/[^a-zA-Z0-9]+$/);
        let wordWithoutPunctuation = word.replace(/[^a-zA-Z0-9]+$/, '');

        if (wordWithoutPunctuation) {
            result.push(<span key={i} onClick={() => getWord(wordWithoutPunctuation)}>{wordWithoutPunctuation}</span>);
        }

        if (punctuation) {
            result.push(punctuation[0]);
        }

        result.push(' ');
    }

    return result.slice(0, -1); // Удаляем последний пробел
}



  // Создание JSX элементов <p> для каждой строки
  function renderParagraphs() {
    if (pages) {
      const currentPage = getPage(pages, page);
      if (currentPage) {
        return currentPage.map((line, index) => (
          <p key={index}>{addSpanTags(line)}</p>
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
