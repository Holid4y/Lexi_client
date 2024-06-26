import React, { useState, useEffect } from "react";

function Hint({ text }) {
    // --- логика отображения подсказок
    const [isOpen, setIsOpen] = useState(false);
    const [hint, setHint] = useState(null)
    
    useEffect(() => {
        setIsOpen(false)
    }, []);


    function shuffleText(text) {
        return text
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");
    }

    function handleClick() {
        console.log('click')
        setIsOpen(true)
        setHint(shuffleText(text))
    }

    return (
        <div className="mb-4">
            <button type="text" className={isOpen ? "form-control py-2" : "form-control py-2 disabled placeholder"} onClick={() => handleClick()} disabled={isOpen}>
                <h1>{hint ? hint : 'жопа'}</h1>
            </button>
            <small className="">Если затрудняетесь ответить, нажмите на блок с подсказкой</small>
        </div>
    );
}

export default Hint;
