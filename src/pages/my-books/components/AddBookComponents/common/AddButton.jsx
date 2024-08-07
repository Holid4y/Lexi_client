import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchBookPost, setError } from "../../../../../common/reducers/bookRetrieveSlice";
import { unshiftBooksList } from "../../../../../common/reducers/booksSlice";

import InformationNotification from "../../../../../common/components/Notification/InformationNotification";

import Loading from "../../../../../common/components/Treatment/Loading";

function AddButton() {
    const dispatch = useDispatch();

    const { type, textArea, file, authorName, title, isPrivet } = useSelector((state) => state.addBookModal);
    const { error } = useSelector((state) => state.book);

    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null)
    
    useEffect(() => {
        dispatch(setError(null))
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
                dispatch(unshiftBooksList(response.payload))
                setNotification(InformationNotificationView)
            } 
        });
    };

    const InformationNotificationView = <InformationNotification 
    message={`Книга ${title} создана`}
    onClose={() => setNotification(null)} 
    timeout={2000}
    />;

    return (
        <>
            {error && <div className="alert alert-success">{error.details}</div>}
            <button type="button" className="btn btn-lg btn-primary mt-4 w-100" onClick={() => onSubmit()} disabled={loading}>
                {loading ? <Loading /> : "Добавить"}
            </button>
            {notification}
        </>
    );
}

export default AddButton;
