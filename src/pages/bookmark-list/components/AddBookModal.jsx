import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { fetchBookPost } from "../../../common/reducers/bookRetrieveSlice";
import { fetchMyBooks } from "../../../common/reducers/booksSlice";

import Head from "./AddBookComponents/ChoicesModal/Close";
import Choices from "./AddBookComponents/ChoicesModal/Choices";
import FileButton from "./AddBookComponents/FileButton";
import TextArea from "./AddBookComponents/TextArea";
import NameBookInput from "./AddBookComponents/common/NameBookInput";
import AuthorBookInput from "./AddBookComponents/common/AuthorBookInput";
import IsPrivetButton from "./AddBookComponents/common/IsPrivetButton";
import AddButton from "./AddBookComponents/common/AddButton";

const AddBookModal = () => {
    const dispatch = useDispatch();

    const [choice, setChoise] = useState(null);

    const [text, setText] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [bookName, setBookName] = useState("");

    const [isCorrectUpload, setIsCorrectUpload] = useState(null);

    const handleChoiceSelect = (value) => {
        setChoise(value);
    };
    const handleClose = () => {
        setChoise(null);
        setIsCorrectUpload(null);
        if (isCorrectUpload) {
            dispatch(fetchMyBooks());
        }
    };

    function handleSubmit() {
        const data = {
            title: bookName,
            author: authorName,
            book: text,
        };
        dispatch(fetchBookPost(data))
            .then((response) => {
                if (response.meta.requestStatus === "fulfilled") {
                    setIsCorrectUpload(true);
                    setChoise(null);
                } else if (response.meta.requestStatus === "rejected") {
                    console.log("Что-то не верно");
                }
            })
            .catch((error) => {
                console.error("Ошибка при выполнении запроса:", error);
            });
    }

    return (
        <div className="modal fade" id="AddBookModal" aria-hidden="true" aria-labelledby="AddBookModalLabel" tabindex="-1">
            <div className="modal-dialog" role="document">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-body p-5">
                        <h2 class="fw-bold mb-0">Выберите вариант</h2>
                        <Choices onChoiceSelect={handleChoiceSelect} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBookModal;
