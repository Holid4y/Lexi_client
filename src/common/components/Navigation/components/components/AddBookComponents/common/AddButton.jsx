import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookPost, setError } from "../../../../../../reducers/bookRetrieveSlice";
import { throwState, setTextArea, setFile } from "../../../../../../reducers/addBookModalSlice";
import { unshiftBooksList } from "../../../../../../reducers/booksSlice";
import { useNotification } from "../../../../../../components/Notification/NotificationContext";
import Loading from "../../../../../../components/Treatment/Loading";
import { host, books } from "../../../../../../../../public/urls";

function AddButton({ file }) { // Получаем file через пропсы
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
        if (file && authorName && title) {
            setIsDisabled(false);
        } else if (textArea && authorName && title) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [textArea, file, authorName, title]);


    async function fetchFormData() {
        const url = new URL(host + books);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", authorName);
        formData.append("book", file);
        formData.append("is_privet", isPrivet);
    
        const accessToken = localStorage.getItem("access");
        if (!accessToken) {
            console.warn(`Отсутствует accessToken. Запрос на ${url}`);
        }
    
        const auth = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: { ...auth },
            body: formData,
        });

        return(response);
    }

    const onSubmit = async () => {
        setLoading(true);
        
        try {
            let response;
    
            if (file) {
                // Ждем завершения fetchFormData и получения ответа
                response = await fetchFormData();
            } else {
                console.log("Написан текст");
                const data = {
                    title: title,
                    author: authorName,
                    book: textArea,
                    is_privet: isPrivet,
                };
    
                // Ждем завершения dispatch и получения ответа
                response = await dispatch(fetchBookPost(data)).unwrap();
            }
    
            // Передаем ответ в handleResponse для дальнейшей обработки
            handleResponse(response);
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
            setLoading(false);
        }
    };

    const handleResponse = async (response) => {
        setLoading(false);
    
        // Если это ответ от fetch API
        if (response instanceof Response) {
            try {
                if (response.ok) {
                    const data = await response.json();
                    dispatch(unshiftBooksList(data.book));  // Передаем книгу в список

                    addNotification(`Книга "${title}" добавлена`);
                    resetForm();
                    closeModals();
                } else {
                    const errorData = await response.json();
                    console.error('Ошибка:', errorData);
                    addNotification('Ошибка при добавлении книги');
                    closeModals();
                }
            } catch (error) {
                console.error("Ошибка обработки ответа:", error);
                addNotification('Ошибка при обработке ответа от сервера');
            }
        } else {
            // Если это данные, полученные через dispatch
            if (response) {
                dispatch(unshiftBooksList(response.book));  // Передаем книгу в список

                addNotification(`Книга "${title}" добавлена`);
                resetForm();
                closeModals();
            } else {
                addNotification('Ошибка при добавлении книги');
            }
        }
    };

    const resetForm = () => {
        dispatch(throwState());  // Сбрасываем основные поля
        dispatch(setTextArea(""));  // Очищаем textarea
        dispatch(setFile(null));  // Очищаем файл
    };

    const closeModals = () => {
        const modals = document.querySelectorAll(".modal");
        modals.forEach((modal) => {
            const bootstrapModal = window.bootstrap.Modal.getInstance(modal);
            if (bootstrapModal) {
                bootstrapModal.hide();
            }
        });
    };

    return (
        <>
            {loading ? <Loading /> : (
                <button
                    className="btn btn-lg btn-primary mt-4 w-100"
                    type="button"
                    onClick={onSubmit}
                    disabled={isDisabled}
                >
                    Добавить
                </button>
            )}
            {error && (
                <p className="mt-3 text-danger fw-bold">
                    {typeof error === 'string' ? error : error.details || 'Неизвестная ошибка'}
                </p>
            )}
        </>
    );
}

export default AddButton;
