import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchBookPost } from "../../../../../common/reducers/bookRetrieveSlice";

function AddButton() {
    const dispatch = useDispatch();

    const { type, textArea, file, authorName, title, isPrivet } = useSelector((state) => state.addBookModal);
    const { loading } = useSelector((state) => state.book);

    const onSubmit = () => {
        const data = {
            title: title,
            author: authorName,
            book: textArea,
        };

        dispatch(fetchBookPost(data))
    };


    return (
        <button type="button" className="btn btn-lg btn-primary mt-4 w-100" onClick={() => onSubmit()} disabled={loading}>
            Добавить
        </button>
    );
}

export default AddButton;
