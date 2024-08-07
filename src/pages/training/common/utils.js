import { fetchTraining } from "../../../common/reducers/training/trainingSlice";
import { fetchHome } from "../../../common/reducers/homeSlice";

import { clearScore, clearRound } from "../../../common/reducers/training/trainingRoundSlice";

import { fetchTrainingPatch } from "../../../common/reducers/training/trainingSlice";

import { setAnswer, addScore, setIsViewResult, setIsCorrect, throwOneRoundState, setIsEnd, nextRound } from "../../../common/reducers/training/trainingRoundSlice";

export function getTrainig(dispatch, isEnd, patchLoading, localType, ) {
    // Проверяем, что выполняются следующие условия:
    // 1. Во время рендара, isEnd должен быть false, чтобы не сбросить счет и не обновить state
    // 2. Переменная patchLoading имеет значение false (falsy значение)
    // это нужно для того, чтобы сделать fetchTraining с самыми свежими данными
    // так как patchLoading обновляет бд

    if (!isEnd & !patchLoading) {
        dispatch(clearScore());
        dispatch(clearRound());
        dispatch(throwOneRoundState())

        dispatch(fetchTraining(localType));  
    }
}


export function getLeargingWord(dispatch, learning_words) {

    // learning_words нужны для того чтобы обработать их отсудствие и отобразить noWordPage
    if (!learning_words) {
        dispatch(fetchHome());
    }
}


export function cleanAnswer(text){
    return text.trim().toLowerCase()
}


// Функция для проверки ответа
function checkAnswer(dispatch, answerWord, currentTraining, round) {
    const cleanWord = cleanAnswer(answerWord);
    const resultBool = currentTraining[round].word.text == cleanWord;
    dispatch(setIsCorrect(resultBool));
    return resultBool;
}

function checkRound(is_correct, dispatch, round, currentTraining) {
    if (is_correct) {
        // прибавляем балл за правельный ответ
        dispatch(addScore());
        dispatch(setIsViewResult(true));
        // Это позволяет добавить задержку перед переключением на следующий раунд
        const correctTime = 1000;
        const wrongTime = 0;

        const timeCallDown = is_correct ? correctTime : wrongTime;

        setTimeout(() => performRoundSwitch(dispatch, round, currentTraining), timeCallDown);
    } else {
        dispatch(setIsViewResult(true));
    }
}


export function handleFinalAnswer(answer, localType, currentTraining, round, dispatch) {
    if ((answer !== null) & (answer !== "")) {
        const is_correct = checkAnswer(dispatch, answer, currentTraining, round);
        const data = {
            type: localType,
            pk: currentTraining[round].training.pk,
            is_correct: is_correct,
        };


        dispatch(fetchTrainingPatch(data)); // отбовляет бд

        dispatch(setAnswer(null)); // Сбрасываем выбранный вариант для следующего раунда
        checkRound(is_correct, dispatch, round, currentTraining);
    } else {
        // Если ничего не выбрано, можно вывести предупреждение или сделать кнопку неактивной
    }
}

export function performRoundSwitch(dispatch, round, currentTraining) {
    if (round + 1 === currentTraining.length) {
        dispatch(setIsEnd(true)); // отображаем страницу окончания
    } else {
        dispatch(nextRound()); // отображает следующий раунд
    }
    dispatch(throwOneRoundState()) // просле переключения раунда, очищаем state
}