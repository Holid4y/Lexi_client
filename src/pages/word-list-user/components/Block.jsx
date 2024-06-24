import React from "react";

import { useDispatch, useSelector } from "react-redux";

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
            <div className="card statistic-block pt-3">
                <h4 className="text-center p-3 pb-1">{word.text}</h4>
                <p>
                    <span className="text-start">[{word.transcription}]</span>
                    <span className="text-end">{word.part_of_speech}</span>
                </p>
            </div>
        </div>
    );
}

export default Block;
