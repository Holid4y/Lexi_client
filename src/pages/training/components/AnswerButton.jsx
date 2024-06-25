import React from "react";
import { useSelector } from "react-redux";

function AnswerButton({ handleFinalAnswer, selectedAnswer }) {
    return (
        <div className="d-flex justify-content-center my-4" onClick={handleFinalAnswer}>
            <button type="text" className={`btn btn-primary save-btn py-2 w-50 ${selectedAnswer === null ? "disabled" : ""}`}>
                <span>
                    <b>Ответить</b>
                </span>
            </button>
        </div>
    );
}

export default AnswerButton;
