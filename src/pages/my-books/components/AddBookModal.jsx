import React, { useState, useEffect } from "react";

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
    const [isCorrectUpload, setIsCorrectUpload] = useState(null);

    const handleClose = () => {
        setIsCorrectUpload(null);
        if (isCorrectUpload) {
            dispatch(fetchMyBooks());
        }
    };

    // Функция для очистки всех полей ввода и файлов
    const clearFields = () => {
        console.log("Очистка полей")
    };

    useEffect(() => {
        const modalElement = document.getElementById('AddBookModal');
        const handleModalClose = () => {
            console.log("Модальное окно закрыто");
            clearFields();
        };
        modalElement.addEventListener('hidden.bs.modal', handleModalClose);
        return () => {
            modalElement.removeEventListener('hidden.bs.modal', handleModalClose);
        };
    }, []);

    return (
        <div className="modal fade" id="AddBookModal" aria-labelledby="AddBookModalLabel" tabIndex="-1">
            <div className="modal-dialog" role="document">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-body p-5">
                        <h2 className="fw-bold mb-5">Выберите вариант</h2>
                        <Choices />
                        <button type="button" className="btn btn-lg btn-primary mt-5 w-100" data-bs-dismiss="modal" onClick={handleClose}>
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBookModal;
