import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Sentences from "./page-components/Sentences";

const Pages = ({ page }) => {

    const { pages, slice_length } = useSelector((state) => state.book);

    function remainder(num, sliceLength) {
        return num % sliceLength;
    }

    const getPage = (pages, pageIndex) => {
        return pages[remainder(pageIndex - 1, slice_length)];
    };

    

    function formatText(text) {
        if (!text) {
            return null;
        }
        // Разбиваем текст на предложения
        const sentences = text.trim().match(/[^\.!\?]+[\.!\?]+["'”)]?|.+$/g);
        if (!sentences) {
            return null;
        }
        const filteredSentences = sentences.filter(Boolean);

        // Оборачиваем каждое предложение в тег
        const formattedSentences = filteredSentences.map((sentences, index) => {
            return (
                <Sentences sentences={sentences} index={index} key={index}/> 
            );
        });

        // Возвращаем массив JSX-элементов
        return formattedSentences;
    }

    function renderParagraphs() {
        if (pages != null) {
            const currentPage = getPage(pages, page);
            if (currentPage) {
                return currentPage.map((line, index) => (
                    <p className={"paragraph"} key={index}>
                        {formatText(line)}
                    </p>
                ));
            } else {
                return <p>Страница или книга не найдена</p>;
            }
        }
    }

    return (
        <div>
            <main className="container px-4">
                <div className="book-text-read">{pages && renderParagraphs()}</div>
            </main>
        </div>
    );
};

export default Pages;
