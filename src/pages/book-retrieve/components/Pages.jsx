import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWordPost, toggleWordBlock, cleanStateWord } from "../../../common/reducers/wordSlice";
import SVG from "../../../common/components/Icons/SVG";

import { fetchGooletrans } from "../../../common/reducers/googletransSlice";

const Pages = ({ page }) => {
    const dispatch = useDispatch();
    const { pages } = useSelector((state) => state.book);

    function remainder(num) {
        return num % 50;
    }

    const getPage = (pages, pageIndex) => {
        return pages[remainder(pageIndex - 1)];
    };

    function handleWordClick(word) {
        dispatch(fetchWordPost(word));
        dispatch(cleanStateWord());
        dispatch(toggleWordBlock());
    }

    function addSpanTags(text) {
        let words = text.split(/\s+/);
        let result = [];
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            let punctuation = word.match(/[^a-zA-Z0-9]+$/);
            let wordWithoutPunctuation = word.replace(/[^a-zA-Z0-9]+$/, "");
            if (wordWithoutPunctuation) {
                result.push(
                    <span className="word-for-text" key={i} onClick={() => handleWordClick(wordWithoutPunctuation)}>
                        {wordWithoutPunctuation}
                    </span>
                );
            }
            if (punctuation) {
                result.push(punctuation[0]);
            }
            result.push(" ");
        }
        return result.slice(0, -1); // Удаляем последний пробел
    }

    function formatText(text) {
        // Разбиваем текст на предложения
        const sentences = text.match(/[^\.!\?]+[\.!\?]+["']?|.+$/g);
        // Оборачиваем каждое предложение в тег
        const formattedSentences = sentences.map((part, index) => {
            return (
                <span className="sentences">
                    {addSpanTags(part)}
                    <div className="translation-button" onClick={() => console.log(part)}>
                        <SVG  name={'translate'}/>
                    </div>
                    
                </span>
            );
        });

        // Возвращаем массив JSX-элементов
        return formattedSentences;
    }

    function renderParagraphs() {
        if (pages) {
            const currentPage = getPage(pages, page);
            if (currentPage) {
                return currentPage.map((line, index) => <p key={index}>{formatText(line)}</p>);
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
