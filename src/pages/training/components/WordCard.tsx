import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

import Audio from "../../../common/components/Audio/Audio";

import { Recognize, Reproduce } from "../common/training";

interface WordCardProps {
    trainingObj: Recognize | Reproduce
}

const WordCard: React.FC<WordCardProps> = ({ trainingObj }) => {
    const { isViewResult } = useSelector((state: RootState) => state.trainingRound);

    const word = trainingObj.getCurrentRound().word;
    const lvl = trainingObj.getCurrentRound().training.lvl;

    function getViewTranscription() {
        if (trainingObj instanceof Recognize) {
            return <span>[{word.transcription}]</span>; 
        } else if (trainingObj instanceof Reproduce) {
            return null
        }
        return null
    }


    return (
        <div className="my-5">
            <div className="card statistic py-5">
                <h4 className="text-center">{trainingObj.getWordView(isViewResult)}</h4>
                {/* FIXME */}
                {/* <span className="text-center p-0 text-warning">{word.form}</span> */}
                <div className="word_transcription p-0 m-0">
                    {getViewTranscription()}
                </div>
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
