import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMyBooks } from "../../../../reducers/booksSlice";

import Choices from "./AddBookComponents/ChoicesModal/Choices";

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
