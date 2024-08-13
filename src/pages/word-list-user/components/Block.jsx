import React from "react";
import { useDispatch } from "react-redux";
import { fetchWordGet, toggleWordBlock, setReletedPk } from "../../../common/reducers/wordSlice";

function Block({ item }) {
    const dispatch = useDispatch();

    function handleBlockClick(wordPk) {
        console.log(wordPk)
        dispatch(toggleWordBlock());
        dispatch(fetchWordGet(wordPk));
        dispatch(setReletedPk(wordPk))
    }

    function getAverageLevel(trainingList) {
        if (trainingList.length === 0) {
            return 0; 
        }
        const totalLevel = trainingList.reduce((sum, item) => sum + item.lvl, 0);
        return Math.round(totalLevel / trainingList.length);
    }

    const cardClass = `card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative ${
        item.is_many ? 'statistic-block-many' : ''
    }`;

    return (
        <div className="col animated-card-scale">
            <div role="button" onClick={() => handleBlockClick(item.word.pk)}>
                <div className={cardClass}>
                    <h4 className="text-center pb-0 mb-0">{item.word.text}</h4>
                    <span className="text-center p-0">{item.word.form}</span>
                    <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                        <span className="d-block">[{item.word.transcription}]</span>
                        {/* <span className="d-block">{word.part_of_speech}</span> */}
                    </div>
                    <div className="card_block_lvl">
                        <p className="card_block_lvl_span">
                            {`${getAverageLevel(item.training)} lvl`} 
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Block;
