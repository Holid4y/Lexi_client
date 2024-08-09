import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTextArea } from "../../../../../common/reducers/addBookModalSlice";

function TextModal() {
    const dispatch = useDispatch();
    const { textArea } = useSelector((state) => state.addBookModal);

    function onTextChange(value) {
        // Диспатчим экшен для обновления текста в textarea
        dispatch(setTextArea(value));
    }

    return (
        <>
            <p>Вставьте текст или напишите его сами</p>
            <div className="text-center">
                <textarea
                    className="form-control w-100"
                    placeholder="Once upon a time there was a dear little girl..."
                    id="exampleFormControlTextarea1"
                    rows="3"
                    onChange={(e) => onTextChange(e.target.value)}
                    value={textArea}
                ></textarea>
            </div>
        </>
    );
}

export default TextModal;
