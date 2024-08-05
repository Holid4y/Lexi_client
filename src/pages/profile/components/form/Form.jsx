import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import FormTheme from "./FormTheme";
import LinkLvl from "./LinkLvl";
import CounterInput from "./CounterInput";

const Form = ({ setHasChanges, setDataToSave }) => {
    const dispatch = useDispatch();

    const { theme, number_of_false_set, count_word_in_round, time_to_view_result } = useSelector((state) => state.user);
    
    const [themeState, setThemeState] = useState("");
    const [falseSetLevel, setFalseSetLevel] = useState();
    const [countWordInRoundState, setCountWordInRoundState] = useState();
    const [timeToViewResultState, setTimeToViewResultState] = useState();

    // заполняем state когда он появится в redux
    useEffect(() => {
        if (theme){
            setThemeState(theme);
        }
        
    }, [theme]);

    useEffect(() => {
        if (number_of_false_set) {
            setFalseSetLevel(number_of_false_set);
            setCountWordInRoundState(count_word_in_round);
            setTimeToViewResultState(time_to_view_result);
        }
    }, [number_of_false_set, count_word_in_round, time_to_view_result]);

    
    
    function checkHasChanges() {
        if (number_of_false_set !== undefined & falseSetLevel !== undefined) {
            return falseSetLevel !== number_of_false_set || countWordInRoundState !== count_word_in_round || timeToViewResultState !== time_to_view_result || themeState !== theme;
        } 
        return false
    }
    useEffect(() => {
        setHasChanges(checkHasChanges())
        setDataToSave(getData())
    }, [themeState, falseSetLevel, countWordInRoundState, timeToViewResultState]);

    function getData() {
        const data = {
            theme: themeState,
            number_of_false_set: falseSetLevel,
            count_word_in_round: countWordInRoundState,
            time_to_view_result: timeToViewResultState,
        };
        return data
    }

    const handleThemeChange = (event) => {
        const value = event.target.value;
        setThemeState(value);
        localStorage.setItem("theme", value);
        document.documentElement.setAttribute("data-bs-theme", value);
    };

    const handleIncrementLevel = () => {
        if (falseSetLevel < 5) {
            setFalseSetLevel(falseSetLevel + 1);
        }
    };

    const handleDecrementLevel = () => {
        if (falseSetLevel > 2) {
            setFalseSetLevel(falseSetLevel - 1);
        }
    };

    const handleIncrementCountWordInRound = () => {
        if (countWordInRoundState < 25) {
            setCountWordInRoundState(countWordInRoundState + 1);
        }
    };

    const handleDecrementCountWordInRound = () => {
        if (countWordInRoundState > 5) {
            setCountWordInRoundState(countWordInRoundState - 1);
        }
    };

    const handleIncrementTimeToViewResultState = () => {
        if (timeToViewResultState < 5000) {
            setTimeToViewResultState(timeToViewResultState + 100);
        }
    };

    const handleDecrementTimeToViewResultState = () => {
        if (timeToViewResultState > 0) {
            setTimeToViewResultState(timeToViewResultState - 100);
        }
    };

    const FormFalset = (
        <CounterInput
            localState={falseSetLevel}
            state={number_of_false_set}
            handleIncrement={handleIncrementLevel}
            handleDecrement={handleDecrementLevel}
            label={"Кол-во ложных вариантов"}
        />
    );

    const FormCountWordInRound = (
        <CounterInput
            localState={countWordInRoundState}
            state={count_word_in_round}
            handleIncrement={handleIncrementCountWordInRound}
            handleDecrement={handleDecrementCountWordInRound}
            label={"Кол-во слов в раунде"}
        />
    );
    const FormTimeToViewResult = (
        <CounterInput
            localState={timeToViewResultState}
            state={time_to_view_result}
            handleIncrement={handleIncrementTimeToViewResultState}
            handleDecrement={handleDecrementTimeToViewResultState}
            label={"Время отображения результата ответа"}
        />
    );

    return (
        <div className="tab-pane fade show active my-4" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
            <FormTheme themeState={themeState} theme={theme} handleThemeChange={handleThemeChange} />
            <LinkLvl />
            {FormFalset}
            {FormCountWordInRound}
            {FormTimeToViewResult}
        </div>
    );
};

export default Form;
