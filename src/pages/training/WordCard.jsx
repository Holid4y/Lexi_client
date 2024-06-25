import React from "react";
import { useDispatch, useSelector } from "react-redux";

function WordCard() {
    const dispatch = useDispatch();
    const { training, round } = useSelector((state) => state.training);

    return (
        <div className="card statistic mb-5 pt-4">
            <h4 className="text-center p-2">{training && training[round].word.text}</h4>
            <span className="fs-6 ms-1">L{training && training[round].recognize_lvl}</span>
        </div>
    );
}

export default WordCard;