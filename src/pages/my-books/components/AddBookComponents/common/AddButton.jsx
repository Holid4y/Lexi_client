import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookPost, setError } from "../../../../../common/reducers/bookRetrieveSlice";
import { unshiftBooksList } from "../../../../../common/reducers/booksSlice";
import { useNotification } from "../../../../../common/components/Notification/NotificationContext";
import Loading from "../../../../../common/components/Treatment/Loading";

function AddButton() {
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
        // Проверяем, если все поля заполнены
        if (textArea && authorName && title) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [textArea, authorName, title]);

    const onSubmit = () => {
        const data = {
            title: title,
            author: authorName,
            book: textArea,
            is_privet: isPrivet
            // TODO
            // надо передавать is_privet: bool (по умолчанию false)
        };
        setLoading(true);

        dispatch(fetchBookPost(data)).then((response) => {
            if (response.meta.requestStatus === "fulfilled") {
                setLoading(false);

                if (response.payload.status == 201) {
                    dispatch(unshiftBooksList(response.payload.book));
                    addNotification(`Книга "${title}" добавлена`);

                    // Закрываем модальное окно
                    const modalElement = document.getElementById("AddBookModal");
                    const modalInstance = bootstrap.Modal.getInstance(modalElement);
                    if (modalInstance) {
                        modalInstance.hide();
                    }

                    // Если есть подмодальные окна, также их закрываем
                    const subModals = ["AddBookModalFile", "AddBookModalText", "AddBookModalVideo"];
                    subModals.forEach((id) => {
                        const subModalElement = document.getElementById(id);
                        const subModalInstance = bootstrap.Modal.getInstance(subModalElement);
                        if (subModalInstance) {
                            subModalInstance.hide();
                        }
                    });
                } else if (response.payload.status == 401) {
                    // do nothing
                }
            }
        });
    };

    return (
        <>
            {error && <div className="alert alert-success">{error.details}</div>}
            <button type="button" className="btn btn-lg btn-primary mt-4 w-100" onClick={() => onSubmit()} disabled={loading || isDisabled}>
                {loading ? <Loading /> : "Добавить"}
            </button>
        </>
    );
}

export default AddButton;
