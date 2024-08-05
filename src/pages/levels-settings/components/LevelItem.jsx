import React from "react";
import { useDispatch, useSelector } from "react-redux";

import SVG from "../../../common/components/Icons/SVG";

function LevelItem({ level, index, handleIncrementLevel, handleDecrementLevel, handleDeleteLevel }) {

    const { levels } = useSelector((state) => state.user);

    return (
        <div className="mb-2">
            <label htmlFor={`lvl${index}`} className="form-label">
                Уровень {index + 1} {levels && levels[index] == level ? null : "*"}
            </label>
            <div className="input-group mb-3">
                <input type="number" className="form-control py-2-5 fw-bolder ps-3" id={`lvl${index}`} value={level} readOnly/>
                <button className="btn btn-plus-minus" onClick={() => handleIncrementLevel(index)} type="button">
                    <SVG name={"plus"} />
                </button>
                <button className="btn btn-plus-minus rounded-end" onClick={() => handleDecrementLevel(index)} type="button">
                    <SVG name={"minus"} />
                </button>
                {index >= 4 && (
                    <div className="ms-2 w-55px">
                        <button className="btn btn-secondary w-100 h-100" onClick={() => handleDeleteLevel(index)} type="button">
                            <SVG name={"trash"} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LevelItem;
