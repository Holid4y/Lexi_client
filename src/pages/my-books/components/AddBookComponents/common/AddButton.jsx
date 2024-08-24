import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookPost, setError } from "../../../../../common/reducers/bookRetrieveSlice";
import { unshiftBooksList } from "../../../../../common/reducers/booksSlice";
import { useNotification } from "../../../../../common/components/Notification/NotificationContext";
import Loading from "../../../../../common/components/Treatment/Loading";

import { host, books } from "../../../../../../public/urls";

function AddButton() {
    const dispatch = useDispatch();
    const { addNotification } = useNotification();

    const { textArea, authorName, title, isPrivet, file } = useSelector((state) => state.addBookModal);
    const { error } = useSelector((state) => state.book);

    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        dispatch(setError(null));
    }, [authorName, title]);

    useEffect(() => {
        // Разделение логики в зависимости от выбранного файла
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
    
        try {
            if (response.ok) {  // Проверка успешного статуса
                const data = await response.json();
                dispatch(unshiftBooksList(data.book));  // Передаем книгу в список
                addNotification(`Книга "${title}" добавлена`);
                closeModals();
            } else {
                // Обработка ошибки
                const errorData = await response.json();
                console.error('Ошибка:', errorData);
                addNotification('Ошибка при добавлении книги');
                closeModals();
            }
        } catch (error) {
            console.error("Ошибка обработки ответа:", error);
            addNotification('Ошибка при обработке ответа от сервера');
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
