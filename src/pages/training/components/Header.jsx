import React from "react";
import { useSelector } from "react-redux";

function Header() {
    const { training, round } = useSelector((state) => state.trainingRound);
    return (
        <p className="text-center my-3 mb-4">
            <b className="fs-2">{round + 1}</b> <small className="mx-2 pt-1">из</small> <b className="fs-2">{training.length}</b>
        </p>
    );
}

export default Header;
