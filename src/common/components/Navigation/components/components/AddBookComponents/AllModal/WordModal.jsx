import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTextArea } from "../../../../../../reducers/addBookModalSlice";

function WordModal() {
    const dispatch = useDispatch();
    const { textArea } = useSelector((state) => state.addBookModal);

    function onTextChange(value) {
        // Диспатчим экшен для обновления текста в textarea
        dispatch(setTextArea(value));
    }

    return (
        <>
            <p>Слово-слово. бла-бла-бла</p>
            <div className="text-center">
                <input
                    className="form-control form-control-lg py-3"
                    placeholder="Hello..."
                    id="exampleFormControlTextarea1"
                    rows="3"
                    onChange={(e) => onTextChange(e.target.value)}
                    value={textArea}
                ></input>
            </div>
        </>
    );
}

export default WordModal;
