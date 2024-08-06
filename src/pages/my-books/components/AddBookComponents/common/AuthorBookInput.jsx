import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthorName } from "../../../../../common/reducers/addBookModalSlice";

function AuthorBookInput() {
    const dispatch = useDispatch();

    const { authorName } = useSelector((state) => state.addBookModal);

    function onTextChange(value) {
        dispatch(setAuthorName(value));
    }


    return (
        <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Автор книги"
            onChange={(e) => onTextChange(e.target.value)}
            value={authorName}
        />
    );
}

export default AuthorBookInput;
