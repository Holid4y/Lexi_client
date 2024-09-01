import React from "react";
import { useSelector } from "react-redux";
import Audio from "../../../common/components/Audio/Audio";

import { Recognize, Reproduse } from "../common/training";

interface WordCardProps {
    trainingObj: Recognize | Reproduse;
}

const WordCard: React.FC<WordCardProps> = ({ trainingObj }) => {

    const currentRound = trainingObj.getCurrentRound()
    const word = currentRound.word
    const lvl = currentRound.training.lvl

    const ViewTranscription = word.transcription != '' && <div className="word_transcription p-0 m-0">
        <span>[{word.transcription}]</span>
    </div>

    return (
        <div className="my-5">
            <div className="card statistic py-5">
                <h4 className="text-center">{word.text}</h4>

                {/* FIXME */}
                {/* <span className="text-center p-0 text-warning">{word.form}</span> */}

                {trainingObj instanceof Recognize && ViewTranscription}

                <div className="card-left-bottom-lg">
                    <Audio word={word.text} />
                </div>
                <div className="card-left-lg">
                    <div className="card_block_lvl">
                        <p className="card_block_lvl_span">
                            <b>{`${lvl} lvl`}</b>
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
