import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTextArea } from "../../../../../../reducers/addBookModalSlice";
import Loading from "../../../../../Treatment/Loading";

import { fetchWordPost, toggleWordBlock, cleanStateWord } from "../../../../../../reducers/wordSlice"

function WordModal() {
    const dispatch = useDispatch();
    const { textArea } = useSelector((state) => state.addBookModal);
    const [loading, setLoading] = useState(false);

    function onTextChange(value) {
        // Диспатчим экшен для обновления текста в textarea
        dispatch(setTextArea(value));
    }

    const handleWordSerch = (word) => {
        dispatch(fetchWordPost(word));
        dispatch(cleanStateWord());
        dispatch(toggleWordBlock());
      };

    const onSubmit = async () => {
        setLoading(true);
        handleWordSerch(textArea)
        setLoading(false)
    };

    return (
        <>
            <p>Можете найти и добавить интересующее вас слово.</p>
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
            <>
                {loading ? <Loading /> : (
                    <button
                        className="btn btn-lg btn-primary mt-4 w-100"
                        type="button"
                        onClick={onSubmit}
                        disabled={textArea ? false : true}
                    >
                        Найти
                    </button>
                )}
            </>
        </>
    );
}

export default WordModal;
