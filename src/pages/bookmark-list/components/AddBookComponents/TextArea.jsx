import React from "react";
import { useDispatch } from "react-redux";
import { setTextArea } from "../../../../common/reducers/addBookModalSlice";

function TextArea() {
    const dispatch = useDispatch();

    function onTextChange(value) {
        // Диспатчим экшен для обновления текста в textarea
        dispatch(setTextArea(value));
    }

    return (
        <div className="text-center">
            <textarea
                className="form-control w-100"
                placeholder="Once upon a time there was a dear little girl..."
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={(e) => onTextChange(e.target.value)}
            ></textarea>
        </div>
    );
}

export default TextArea;
