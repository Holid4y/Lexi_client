import React from "react";
import { useSelector } from "react-redux";
import Audio from "../../../common/components/Audio/Audio";

function WordCard({ localType, text, en_text, is_view_transctiption }) {
    const { training, round } = useSelector((state) => state.trainingRound);

    const word = training[round].word;

    function getLevel() {
        return training[round].training.lvl;
    }
    const ViewTranscription = <span>[{word.transcription}]</span>

    return (
        <div className="my-5">
            <div className="card statistic py-5">
                <h4 className="text-center">{text}</h4>
                <span className="text-center p-0 text-warning">{word.form}</span>
                <div className="word_transcription p-0 m-0">
                    {is_view_transctiption ? ViewTranscription : null}
                </div>
                <div className="card-left-bottom-lg">
                    <Audio word={en_text} />
                </div>
                <div className="card-left-lg">
                    <div className="card_block_lvl">
                        <p className="card_block_lvl_span">
                            <b>{`${training && getLevel()} lvl`}</b>
                        </p>
                    </div>
                    <div>
                        <span className="ps-2">{word.part_of_speech}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WordCard;
