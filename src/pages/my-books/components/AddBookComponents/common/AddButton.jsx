import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchBookPost } from "../../../../../common/reducers/bookRetrieveSlice";

import Loading from "../../../../../common/components/Treatment/Loading";

function AddButton() {
    const dispatch = useDispatch();

    const { type, textArea, file, authorName, title, isPrivet } = useSelector((state) => state.addBookModal);
    const { error } = useSelector((state) => state.book);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

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
                // to do
                // updateMyBookList(response.payload) обнавить список книг
                // throwState()
                // sendMessege(ok)
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
