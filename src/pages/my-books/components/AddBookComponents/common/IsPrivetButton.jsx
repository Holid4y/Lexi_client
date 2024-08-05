import React from "react";

function IsPrivetButton() {
    const handleToggle = (event) => {
        const isChecked = event.target.checked;
        // Здесь вы можете обработать изменение состояния чекбокса
        console.log(isChecked ? "Книга приватная" : "Книга публичная");
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
                Приватная книга / текст
            </label>
        </div>
    );
}

export default IsPrivetButton;
