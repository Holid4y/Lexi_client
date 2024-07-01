import React from "react";
import { useSelector } from "react-redux";

function WordCard({ localType, text }) {
    const { training, round } = useSelector((state) => state.trainingRound);




    function getLevel() {
        // в зависимости от localType ключ lvl меняется на `localType_lvl` 
        return training[round][`${localType}_lvl`];
    }

    return (
        <div className="card statistic mb-5 pt-4">
            <h4 className="text-center p-2">{text}</h4>
            <span className="fs-6 ms-1">L{training && getLevel()}</span>
        </div>
    );
}

export default WordCard;
