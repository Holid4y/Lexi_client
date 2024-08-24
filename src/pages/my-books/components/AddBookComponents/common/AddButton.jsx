import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookPost, setError } from "../../../../../common/reducers/bookRetrieveSlice";
import { unshiftBooksList } from "../../../../../common/reducers/booksSlice";
import { useNotification } from "../../../../../common/components/Notification/NotificationContext";
import Loading from "../../../../../common/components/Treatment/Loading";

function AddButton({ selectedFile }) {
    const dispatch = useDispatch();
    const { addNotification } = useNotification();

    const { textArea, authorName, title, isPrivet } = useSelector((state) => state.addBookModal);
    const { error } = useSelector((state) => state.book);

    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        dispatch(setError(null));
    }, [authorName, title]);

    useEffect(() => {
        // Разделение логики в зависимости от выбранного файла
        if (selectedFile && authorName && title) {
            setIsDisabled(false);
        } else if (textArea && authorName && title) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [textArea, selectedFile, authorName, title]);

    const onSubmit = () => {
        setLoading(true);

        if (selectedFile) {
            console.log("Выбран файл");
            const formData = new FormData();
            formData.append("title", title);
            formData.append("author", authorName);
            formData.append("book", selectedFile);
            formData.append("is_privet", isPrivet);

            dispatch(fetchBookPost(formData)).then((response) => {
                handleResponse(response);
            });
        } else {
            console.log("Написан текст");
            const data = {
                title: title,
                author: authorName,
                book: textArea,
                is_privet: isPrivet,
            };

            dispatch(fetchBookPost(data)).then((response) => {
                handleResponse(response);
            });
        }
    };

    const handleResponse = (response) => {
        setLoading(false);
        if (response.meta.requestStatus === "fulfilled") {
            if (response.payload.status === 201) {
                dispatch(unshiftBooksList(response.payload.book));
                addNotification(`Книга "${title}" добавлена`);
                closeModals();
            }
        }
    };

    const closeModals = () => {
        const modalElement = document.getElementById("AddBookModal");
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }

        const subModals = ["AddBookModalFile", "AddBookModalText", "AddBookModalVideo"];
        subModals.forEach((id) => {
            const subModalElement = document.getElementById(id);
            const subModalInstance = bootstrap.Modal.getInstance(subModalElement);
            if (subModalInstance) {
                subModalInstance.hide();
            }
        });
    };

    return (
        <>
            {error && <div className="alert alert-success">{error.details}</div>}
            <button type="button" className="btn btn-lg btn-primary mt-4 w-100" onClick={onSubmit} disabled={loading || isDisabled}>
                {loading ? <Loading /> : "Добавить"}
            </button>
        </>
    );
}

export default AddButton;
