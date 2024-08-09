import React, { useState } from "react";

import { useDispatch } from "react-redux";

import SVG from "../../../common/components/Icons/SVG";
import { fetchBookDelete } from "../../../common/reducers/bookRetrieveSlice";
import { deleteBookByIndex } from "../../../common/reducers/booksSlice";

import ActionNotification from "../../../common/components/Notification/ActionNotification";
import InformationNotification from "../../../common/components/Notification/InformationNotification";
import Notification from "../../../common/components/Notification/Notification";

const Trash = ({ book, index, setNotification }) => {
    const dispatch = useDispatch();

    

    function handleDelete() {
        setNotification(ActionNotificationView);
    }

    function performDelete() {
        dispatch(fetchBookDelete(book.pk));
        dispatch(deleteBookByIndex(index));
        setNotification(InformationNotificationView);
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

    // const InformationNotificationView = <InformationNotification message={`Книга Удалена`} onClose={() => setNotification(null)}  timeout={2000} nameNotification="Удаление книги" />;
    const InformationNotificationView = <Notification message={`Книга ${book.title} удалена`} onClose={() => setNotification(null)}  timeout={2000} position="0"/>

    const ActionNotificationView = (
        <ActionNotification
            nameNotification="Удаление книги"
            message={`Вы уверены что хотите удалить книгу ${book.title}`}
            onClose={() => setNotification(null)}
            onConfirm={() => {
                setNotification(null);
                performDelete();
            }}
            onCancel={() => {
                setNotification(null);
            }}
        />
    );

    return (
        <>
            <button class="dropdown-item text-danger" onClick={() => handleDelete()}><SVG name="trash" /> Удалить</button>
        </>
    );
};

export default Trash;
