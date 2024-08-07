import React, { useState } from "react";

import { useDispatch } from "react-redux";

import SVG from "../../../common/components/Icons/SVG";
import { fetchBookDelete } from "../../../common/reducers/bookRetrieveSlice";
import { deleteBookByIndex } from "../../../common/reducers/booksSlice";

import ActionNotification from "../../../common/components/Notification/ActionNotification";

const Trash = ({ book, index }) => {
    const dispatch = useDispatch();

    const [notification, setNotification] = useState(null);

    function handleDelete() {
        setNotification(NotificationView);
    }

    function performDelete() {
        dispatch(fetchBookDelete(book.pk));
        dispatch(deleteBookByIndex(index))

        if (isBookRecently(book.slug)) {
            throwRecentlyBook();
        }
    }

    function throwRecentlyBook() {
        localStorage.removeItem("recentlyBook");
    }
    function isBookRecently(slug) {
        const recentlyBook = localStorage.getItem("recentlyBook");

        if (recentlyBook) {
            const recentlyBookData = JSON.parse(recentlyBook);

            if (recentlyBookData.slug) {
                return recentlyBookData.slug === slug;
            }
        }

        return false;
    }


    const NotificationView = (
        <ActionNotification
            message="Вы уверены что хотите удалить книгу?"
            onClose={() => setNotification(null)}
            onConfirm={() => {
                console.log("Подтверждено");
                performDelete();
                setNotification(null);
            }}
            onCancel={() => {
                console.log("Отменено");
                setNotification(null);
            }}
        />
    );

    return (
        <>
            <span className="position-absolute translate-middle mark" onClick={() => handleDelete()}>
                <SVG name="trash" />
            </span>
            {notification}
        </>
    );
};

export default Trash;