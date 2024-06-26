import React from "react";
import { useDispatch } from "react-redux";
import { fetchWordGet, toggleWordBlock } from "../../../common/reducers/wordSlice";

function Block({ word }) {
    const dispatch = useDispatch();

    function handleBlockClick(pk) {
        dispatch(toggleWordBlock());
        dispatch(fetchWordGet(pk));
        // чистить state
    }

    return (
        <div className="col" role="button" onClick={() => handleBlockClick(word.pk)}>
            <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                <h4 className="text-center">{word.text}</h4>
                <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                    <span className="d-block">[{word.transcription}]</span>
                    {/* <span className="d-block">{word.part_of_speech}</span> */}
                </div>
            </div>
        </div>

    );
}

export default Block;
