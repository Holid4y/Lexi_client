import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTextArea } from "../../../../../../reducers/addBookModalSlice";
import Loading from "../../../../../Treatment/Loading";

import { fetchWordPost, toggleWordBlock, cleanStateWord } from "../../../../../../reducers/wordSlice"

function WordModal() {
    const dispatch = useDispatch();
    const { textArea } = useSelector((state) => state.addBookModal);
    const [loading, setLoading] = useState(false);

    function onTextChange(value) {
        // Диспатчим экшен для обновления текста в textarea
        dispatch(setTextArea(value));
    }

    const handleWordSerch = (word) => {
        dispatch(fetchWordPost(word));
        dispatch(cleanStateWord());
        dispatch(toggleWordBlock());
    };

    const isEnglishText = (text) => {
        const englishRegex = /^[a-zA-Z\s]*$/; // Проверяет, что текст содержит только латиницу и пробелы
        return englishRegex.test(text);
    };

    const onSubmit = async () => {
        setLoading(true);

        const inputElement = document.getElementById("text_word_EN");

        if (isEnglishText(textArea)) {
           // Закрытие модалки с вводом слова
            const currentModal = document.getElementById("AddBookModalWord");
            if (currentModal) {
                currentModal.classList.remove("show");
                currentModal.style.display = "none";
                document.body.classList.remove("modal-open");
                document.querySelector(".modal-backdrop").remove();
            }
            
            handleWordSerch(textArea)
        } else {
            // Если текст не на английском, добавляем класс анимации
            inputElement.classList.add("textENAnimation");

            // Удаляем класс после завершения анимации
            setTimeout(() => {
                inputElement.classList.remove("textENAnimation");
            }, 500);
        }

        setLoading(false)
    };

    return (
        <>
            <p>Можете найти и добавить интересующее вас слово.</p>
            <div className="text-center">
                <input
                    className="form-control form-control-lg py-3"
                    placeholder="Hello..."
                    id="text_word_EN"
                    rows="3"
                    onChange={(e) => onTextChange(e.target.value)}
                    value={textArea}
                ></input>
            </div>
            <>
                {loading ? <Loading /> : (
                    <button
                        className="btn btn-lg btn-primary mt-4 w-100"
                        type="button"
                        onClick={onSubmit}
                        disabled={textArea ? false : true}
                    >
                        Найти
                    </button>
                )}
            </>
        </>
    );
}

export default WordModal;
