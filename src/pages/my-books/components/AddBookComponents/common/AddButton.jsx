import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookPost, setError } from "../../../../../common/reducers/bookRetrieveSlice";
import { unshiftBooksList } from "../../../../../common/reducers/booksSlice";
import { useNotification } from "../../../../../common/components/Notification/NotificationContext";
import Loading from "../../../../../common/components/Treatment/Loading";

function AddButton() {
    const dispatch = useDispatch();
    const { addNotification } = useNotification();
    
    const { textArea, authorName, title } = useSelector((state) => state.addBookModal);
    const { error } = useSelector((state) => state.book);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(setError(null));
    }, [authorName, title]);

    const onSubmit = () => {
        const data = {
            title: title,
            author: authorName,
            book: textArea,
        };
        setLoading(true);

        dispatch(fetchBookPost(data)).then((response) => {
            if (response.meta.requestStatus === "fulfilled") {
                setLoading(false);
                dispatch(unshiftBooksList(response.payload));
                addNotification(`Книга "${title}" добавлена`);

                // Закрываем модальное окно
                const modalElement = document.getElementById('AddBookModal');
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                if (modalInstance) {
                    modalInstance.hide();
                }
                
                // Если есть подмодальные окна, также их закрываем
                const subModals = ['AddBookModalFile', 'AddBookModalText', 'AddBookModalVideo'];
                subModals.forEach(id => {
                    const subModalElement = document.getElementById(id);
                    const subModalInstance = bootstrap.Modal.getInstance(subModalElement);
                    if (subModalInstance) {
                        subModalInstance.hide();
                    }
                });
            }
        });
    };

    return (
        <>
            {error && <div className="alert alert-success">{error.details}</div>}
            <button type="button" className="btn btn-lg btn-primary mt-4 w-100" onClick={() => onSubmit()} disabled={loading}>
                {loading ? <Loading /> : "Добавить"}
            </button>
        </>
    );
}

export default AddButton;
