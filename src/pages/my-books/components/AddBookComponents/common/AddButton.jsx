import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchBookPost, setError } from "../../../../../common/reducers/bookRetrieveSlice";
import { unshiftBooksList } from "../../../../../common/reducers/booksSlice";

import Notification from "../../../../../common/components/Notification/Notification";
import Loading from "../../../../../common/components/Treatment/Loading";

function AddButton() {
    const dispatch = useDispatch();

    const { textArea, authorName, title } = useSelector((state) => state.addBookModal);
    const { error } = useSelector((state) => state.book);

    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState([]); // Массив для хранения всех уведомлений
    const [visibleNotifications, setVisibleNotifications] = useState([]); // Массив для отображаемых уведомлений

    useEffect(() => {
        dispatch(setError(null));
    }, [authorName, title]);

    useEffect(() => {
        if (notifications.length > 0 && visibleNotifications.length < 3) {
            const nextNotification = notifications[0];
            setVisibleNotifications((prevVisible) => [
                ...prevVisible,
                { ...nextNotification, position: prevVisible.length }
            ]);
            setNotifications((prev) => prev.slice(1));
        }
    }, [notifications, visibleNotifications]);

    useEffect(() => {
        if (visibleNotifications.length > 3) {
            setVisibleNotifications((prevVisible) => prevVisible.slice(1));
        }
    }, [visibleNotifications]);

    const addNotification = (message, timeout = 2000) => {
        const id = Date.now();
        setNotifications((prevNotifications) => [
            ...prevNotifications,
            { id, message, timeout },
        ]);
    };

    const removeNotification = (id) => {
        setVisibleNotifications((prevVisible) => {
            const filteredNotifications = prevVisible.filter(notification => notification.id !== id);
            return filteredNotifications.map((notification, index) => ({
                ...notification,
                position: index
            }));
        });
    };

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
                addNotification(`Книга "${title}" добавлена`, 2000);
            }
        });
    };

    return (
        <>
            {error && <div className="alert alert-success">{error.details}</div>}
            <button
                type="button"
                className="btn btn-lg btn-primary mt-4 w-100"
                onClick={() => onSubmit()}
                disabled={loading}
            >
                {loading ? <Loading /> : "Добавить"}
            </button>
            
            {visibleNotifications.map((notification) => (
                <Notification
                    key={notification.id}
                    message={notification.message}
                    timeout={notification.timeout}
                    onClose={() => removeNotification(notification.id)}
                    position={notification.position} 
                />
            ))}
        </>
    );
}

export default AddButton;
