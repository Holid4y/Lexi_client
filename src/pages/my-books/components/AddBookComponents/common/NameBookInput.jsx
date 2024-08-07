import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../../../../common/reducers/addBookModalSlice"; 

function NameBookInput() {
    const dispatch = useDispatch();

    const { title } = useSelector((state) => state.addBookModal);

    function onTextChange(value) {
        dispatch(setTitle(value));
    }


    return (
        <input
            className="form-control form-control-lg" 
            type="text" 
            placeholder="Название книги" 
            style={{ marginBottom: "10px" }} 
            onChange={(e) => onTextChange(e.target.value)} 
            value={title}

        />
    );
}

export default NameBookInput;