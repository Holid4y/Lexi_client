import React, { useState } from "react";

function Hint({ text }) {
    // --- логика отображения подсказок
    const [isOpen, setIsOpen] = useState(false);

    function shuffleText(text) {
        return text
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");
    }

    return (
        <div className="mb-4">
            <button type="text" className={isOpen ? "form-control py-2" : "form-control py-2 disabled placeholder"} onClick={() => setIsOpen(true)} disabled={isOpen}>
                <h1>{shuffleText(text)}</h1>
            </button>
            <small className="">Если затрудняетесь ответить, нажмите на блок с подсказкой</small>
        </div>
    );
}

export default Hint;
