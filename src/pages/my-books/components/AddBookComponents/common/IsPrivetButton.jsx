import React from "react";

function IsPrivetButton() {
    const handleToggle = (event) => {
        const isChecked = event.target.checked;
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
