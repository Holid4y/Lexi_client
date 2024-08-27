import React from "react";
import { useDispatch } from "react-redux";
import { fetchWordGet, toggleWordBlock, setReletedPk } from "../../../common/reducers/wordSlice";

function Block({ item }) {
    const dispatch = useDispatch();

    function handleBlockClick(wordPk) {
        dispatch(toggleWordBlock());
        dispatch(fetchWordGet(wordPk));
        dispatch(setReletedPk(wordPk))
    }

    function getRoundLevel() {
        return Math.round(item.lvl_sum);
    }

    const cardClass = `card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative
    ${item.is_many ? 'main-card' : ''}`;

    return (
        <div className="col animated-card-scale position-relative">
            <div role="button" onClick={() => handleBlockClick(item.word_id)} className="position-relative h-100">
                {item.is_many && <div className="card statistic-block-many"></div>}
                <div className={cardClass}>
                    <h4 className="text-center pb-0 mb-0">{item.word_text}</h4>
                    <span className="text-center p-0 text-warning">{item.word_form}</span>
                    <div className="word_transcription p-0 m-0">
                        <span>[{item.word_transcription}]</span>
                    </div>
                    <div className="card-left">
                        <div className="card_block_lvl">
                            <p className="card_block_lvl_span">
                                <b>{`${getRoundLevel()} lvl`}</b>
                            </p>
                        </div>
                        <div>
                            <span className="ps-2">{item.part_of_speech}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Block;
