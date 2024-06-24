import React, { useState } from "react";
import Navigation from "../../../common/components/Navigation";

function shuffleText(text) {
    return text
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
}

function Reproduce() {
    const [buttonClasses, setButtonClasses] = useState("form-control py-2 disabled placeholder");
    const [buttonText, setButtonText] = useState("white");
    const [isClicked, setIsClicked] = useState(false);

    const handleButtonClick = () => {
        setButtonClasses("form-control py-2");
        setButtonText(shuffleText(buttonText));
        setIsClicked(true);
    };

    return (
        <div className="align-items-center">
            <p className="text-center my-3 mb-4">
                <b className="fs-2">3</b> <small className="mx-2 pt-1">из</small> <b className="fs-2">8</b>
            </p>

            <main className="container">
                <div className="card statistic mb-5 pt-4 mx-4">
                    <h4 className="text-center p-2">Белый</h4>
                    <span className="fs-6 ms-1">L4</span>
                </div>

                <div className="px-5 mb-4">
                    <div className="mb-4">
                        <h3 className="text-center mb-3">Напишите ответ</h3>
                        <input type="text" className="form-control py-2-5 mb-2" />
                    </div>

                    <div className="mb-4">
                        <button type="text" className={buttonClasses} onClick={handleButtonClick} disabled={isClicked}>
                            <h1>{buttonText}</h1>
                        </button>
                        <small className="">Если затрудняетесь ответить, нажмите на блок с подсказкой</small>
                    </div>
                </div>
                <div className="d-flex justify-content-center my-4">
                    <button type="text" className="btn btn-primary save-btn py-2 w-50">
                        <span>
                            <b>Ответить</b>
                        </span>
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Reproduce;
