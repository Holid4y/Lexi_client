import React from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../../../common/reducers/addBookModalSlice"; 

function NameBookInput() {
    const dispatch = useDispatch();

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
        />
    );
}

export default NameBookInput;
