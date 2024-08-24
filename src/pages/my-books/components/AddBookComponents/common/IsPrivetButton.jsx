import React from "react";
import { useDispatch } from "react-redux";
import { setIsPrivet } from "../../../../../common/reducers/addBookModalSlice";

function IsPrivetButton() {
    const dispatch = useDispatch();

    const handleToggle = (event) => {
        const isChecked = event.target.checked;
        dispatch(setIsPrivet(isChecked))
        // Здесь вы можете обработать изменение состояния чекбокса
        console.log(isChecked ? true : false);
    };

    return (
        <div className="form-check form-switch mt-3">
            <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onChange={handleToggle}
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                Отображать только у меня
            </label>
        </div>
    );
}

export default IsPrivetButton;
