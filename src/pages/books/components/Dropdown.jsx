import React, { useState } from "react";

import { useDispatch } from "react-redux";

import SVG from "../../../common/components/Icons/SVG";
import { fetchBookDelete } from "../../../common/reducers/bookRetrieveSlice";
import { deleteBookByIndex } from "../../../common/reducers/booksSlice";

import ActionNotification from "../../../common/components/Notification/ActionNotification";
import InformationNotification from "../../../common/components/Notification/InformationNotification";

const Trash = ({ book, index }) => {
    const dispatch = useDispatch();

    const [notification, setNotification] = useState(null);

    function handleDelete() {
        setNotification(ActionNotificationView);
    }

    function performDelete() {
        dispatch(fetchBookDelete(book.pk));
        dispatch(deleteBookByIndex(index));
        setNotification(InformationNotificationView)
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

    const InformationNotificationView = <InformationNotification message="Книга удалена" onClose={() => setNotification(null)} timeout={2000}/>;

    const ActionNotificationView = (
        <ActionNotification
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
            {/* <span className="position-absolute translate-middle mark" onClick={() => handleDelete()}>
                <SVG name="trash" />
            </span>
            {notification} */}
            <div>
                <button class="position-absolute translate-middle mark_settings btn" data-bs-toggle="dropdown" aria-expanded="false">
                    <SVG name="dot_settings" />
                </button>
                <ul class="dropdown-menu text-small shadow p-2">
                    <li><button class="dropdown-item">Редактировать</button></li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><button class="dropdown-item text-danger" data-bs-toggle="modal" data-bs-target="#modalSheet"><SVG name="trash" /> Удалить</button></li>
                </ul>
            </div>
            <div class="modal fade" id="modalSheet" tabindex="-1" aria-labelledby="modalSheetLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content rounded-4 shadow">
                    <div class="modal-header border-bottom-0">
                        <h1 class="modal-title fs-5">Удаление книги</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body py-0 text-start">
                        <p>После удаления книги <b>{book.title}</b> вы не сможете её востановить</p>
                    </div>
                    <div class="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
                        <button type="button" class="btn btn-lg btn-primary" onClick={() => handleDelete()}>Удалить</button>
                        {notification}
                        <button type="button" class="btn btn-lg btn-secondary" data-bs-dismiss="modal">Оставить</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Trash;
