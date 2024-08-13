import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthorName } from "../../../../../common/reducers/addBookModalSlice";

function AuthorBookInput({ maxLength = 50 }) {
    const dispatch = useDispatch();
    const { authorName } = useSelector((state) => state.addBookModal);
    const [inputLength, setInputLength] = useState(authorName.length || 0);

    function onTextChange(value) {
        setInputLength(value.length);
        dispatch(setAuthorName(value));
    }

    return (
        <div className="author-book-input-container">
            <input
                className={`form-control form-control-lg py-3 ${
                    inputLength === maxLength ? "maxLengthAnimation" : ""
                }`}
                type="text"
                placeholder="Автор книги"
                onChange={(e) => onTextChange(e.target.value)}
                value={authorName}
                maxLength={maxLength}
            />
            <div className="input-length-indicator">
                {inputLength} / {maxLength}
            </div>
        </div>
    );
}

export default AuthorBookInput;
