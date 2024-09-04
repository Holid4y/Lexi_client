import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../../../../../reducers/addBookModalSlice"; 

function NameBookInput({ maxLength = 50 }) {
    const dispatch = useDispatch();
    const { title } = useSelector((state) => state.addBookModal);
    const [inputLength, setInputLength] = useState(title.length || 0);

    function onTextChange(value) {
        setInputLength(value.length);
        dispatch(setTitle(value));
    }

    return (
        <div className="name-book-input-container">
            <input
                className={`form-control form-control-lg py-3 ${
                    inputLength === maxLength ? "maxLengthAnimation" : ""
                }`}
                type="text"
                placeholder="Название книги"
                style={{ marginBottom: "10px" }}
                onChange={(e) => onTextChange(e.target.value)}
                value={title}
                maxLength={maxLength}
            />
            <div className="input-length-indicator">
                {inputLength} / {maxLength}
            </div>
        </div>
    );
}

export default NameBookInput;
