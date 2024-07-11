import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHintIsOpen } from "../../../../common/reducers/training/trainingRoundSlice";

function Hint({ text }) {
    const dispatch = useDispatch();
    const { hintIsOpen } = useSelector((state) => state.trainingRound);
    const { round, answer } = useSelector((state) => state.trainingRound);

    const [hintText, setHintText] = useState(null);



    function letterToSpan(word, answer) {

        if (answer === null) {
            answer = "";
        }
 
        return word.split("").map((letter, index) => {
            const className = answer.includes(letter)  ? "highlight-letter" : "";

            return (
                <span key={index} className={className}>
                    {letter}
                </span>
            );
        });
    }
    // renderLetterToSpan:
    // принимает hintTextListTuple[(h, true), (e, false), (l, true), (l, false), (o, false)]
    // for letter in hintTextListTuple:

        // const className = letter[1]  ? "highlight-letter" : "";
        // <span key={index} className={className}>
        //      {letter}
        // </span>
    // checkIncludes {
    // 
    // }
    function checkIncludes(word, answer) {
        // last_answer_letter
        // for letter in word:
        //      
    }
    useEffect(() => {
        // checkIncludes(hintText, answer)
    }, [answer]);

    function shuffleText(text) {
        let shuffledText = text
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");

        if (shuffledText === text) {
            // If the shuffled text is the same as the original, shuffle it again
            shuffledText = shuffleText(text);
        }

        return shuffledText;
    }

    useEffect(() => {
        dispatch(setHintIsOpen(false));
        setHintText(null);
    }, [round]);

    function handleClick() {
        setHintText(shuffleText(text));
        dispatch(setHintIsOpen(true));
    }
    // {hintIsOpen ? "form-control p-0 py-2 position-relative h-65" : "form-control p-0 py-2 disabled placeholder position-relative h-65"}
    const CloseHint = (
        <button type="text" className="form-control p-0 py-2 disabled placeholder position-relative h-65" onClick={() => handleClick()}>
            <small className="small-text-hint top-50 start-50 translate-middle w-100 text-center ps-3">Нажмите, если затрудняетесь ответить</small>
        </button>
    );
    const OpenHint = (
        <button type="text" className="form-control p-0 py-2 position-relative h-65">
            <h1 className="p-0 m-0">{hintText ? letterToSpan(hintText, answer) : ""}</h1>
        </button>
    );

    return <div className="mb-4">{hintIsOpen ? OpenHint : CloseHint}</div>;
}

export default Hint;
