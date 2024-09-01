import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHintIsOpen, setHintTextListTuple } from "../../../../common/reducers/training/trainingRoundSlice";
import { Round } from "../../common/round";
import { Reproduce } from "../../common/training";

interface HintProps {
    roundObj: Round;
    trainingObj: Reproduce;
}

const Hint: React.FC<HintProps> = ({ roundObj, trainingObj }) => {
    const dispatch = useDispatch();
    const { hintIsOpen, hintTextListTuple } = useSelector((state: any) => state.trainingRound); 
    const { round, answer } = useSelector((state: any) => state.trainingRound);

    const hintButtonRef = useRef<HTMLButtonElement | null>(null); // Указываем тип для useRef

    // Обработчик, при нажатии на Tab открывается подсказка
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Tab") {
                if (hintButtonRef.current && !hintButtonRef.current.disabled) {
                    hintButtonRef.current.click();
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    function letterToSpan(hintTextListTuple) {

        return hintTextListTuple.map((item, index) => {
            const letter = item[0]
            const isStyled = item[1]
            const className = isStyled  ? "highlight-letter" : "";

            return (
                <span key={index} className={className}>
                    {letter}
                </span>
            );
        });
    }

    function updateHintList(hintTextListTuple, input) {
        let inputList = input.split('');
        let updatedList = JSON.parse(JSON.stringify(hintTextListTuple));
        for (let tuple of updatedList) {
          for (let i = 0; i < inputList.length; i++) {
            if (tuple[0] === inputList[i]) {
              tuple[1] = true;
              inputList.splice(i, 1);
              break;
            }
          }
        }
      
        return updatedList;
      }
    
    useEffect(() => {
        
        if ((hintTextListTuple !== null & hintTextListTuple !== undefined) & (answer !== null & answer !== '')) {
            const lowerAnswer = String(answer).toLowerCase()
            dispatch(setHintTextListTuple(updateHintList(hintTextListTuple, lowerAnswer)))
        }
        
    }, [answer]);

    useEffect(() => {
        dispatch(setHintIsOpen(false));
        dispatch(setHintTextListTuple(null))
    }, [round]);

    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
        return () => {
            tooltipList.forEach(tooltip => tooltip.dispose());
        };
    }, [ ]);

    function wordToListTuple(word) {
        return word.split('').map(letter => [letter, false]);
    }

    function shuffleText(text) {
        let shuffledText = text
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");

        if (shuffledText === text) {
            shuffledText = shuffleText(text);
        }

        return shuffledText;
    }

    function handleClick() {
        const shuffledText = shuffleText(text)
        dispatch(setHintTextListTuple(wordToListTuple(shuffledText)))
        dispatch(setHintIsOpen(true));
    }
    
    const CloseHint = (
        <button 
            ref={hintButtonRef} 
            type="text" 
            className="form-control p-0 py-2 disabled placeholder position-relative h-65" 
            onClick={() => handleClick()}
        >
            <small className="small-text-hint top-50 start-50 translate-middle w-100 text-center ps-3">Нажмите, если затрудняетесь ответить</small>
            <kbd className="press_button d-none d-sm-block">Tab</kbd>
        </button>
    );
    const OpenHint = (
        <button type="text" className="form-control p-0 py-2 position-relative h-65">
            <h1 className="p-0 m-0">{hintTextListTuple ? letterToSpan(hintTextListTuple) : ""}</h1>
        </button>
    );

    return <div className="mb-4">{hintIsOpen ? OpenHint : CloseHint}</div>;
}

export default Hint;
